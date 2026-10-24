import {HistoryState} from "../../state/HistoryState";
import {LineState} from "../../state/LineState";
import {SelectionState} from "../../state/SelectionState";
import {BoardState} from "../../state/BoardState";
import {RouteTool, ToolState} from "../../state/ToolState";
import {ILine} from "../../interfaces/line.interface";
import {IDot} from "../../interfaces/dot.interface";
import {type Painter, roundedWireLine, SELECTION_COLOR, SOLDER_COLOR, SOLDER_EDGE, SOLDER_PATH_WIDTH} from "../../board-render";
import {connectsAt, cutAtWireEnds, mergeNewWire, splitWiresAt} from "../wire-merge";
import {lineThrough} from "../line-path";
import {drawStartMarker, ToolBehavior} from "./tool";

// What a wire is besides its route: a solder path, or a jumper with its colour and thickness.
export type WireStyle = Pick<ILine, "kind" | "color" | "width" | "side">;

// A new wire from a route tool: a solder path, or a jumper in the active colour and thickness.
export function newWireStyle(tool: RouteTool["kind"]): WireStyle {
  if (tool === "solder") return {kind: "solder"};
  return {color: ToolState.activeWireColor || "#3b82f6", width: ToolState.selectedWireWidth || 4};
}

// The style a wire keeps when it's rerouted.
export function styleOf(line: ILine): WireStyle {
  return line.kind === "solder" ? {kind: "solder"} : {color: line.color, width: line.width, ...(line.side === "bottom" ? {side: "bottom" as const} : {})};
}

// Puts a wire from `start` to `end`, bending at `via`, recorded for undo as one step, and returns
// it (its last piece, if cut): a jumper in the active colour and thickness, or with `tool`
// "solder" a solder path. See routeWire.
export function placeWire(start: IDot, end: IDot, via: IDot[] = [], tool: RouteTool["kind"] = "wire"): ILine {
  const pieces = routeWire([start, ...via, end], newWireStyle(tool));
  return pieces[pieces.length - 1];
}

// Which ends of a routed wire are new: only there does it split the wires it lands on, or carry on
// a wire whose free end it starts from. A reshaped wire's ends that stayed put change nothing.
export interface NewEnds {
  start: boolean;
  end: boolean;
}

// Puts a wire through `points` (its holes in order: start, bends, end) on the board, recorded for
// undo as one step, and returns it: in pieces, from its start, if it was cut. A wire ending on
// another joins it either way round: a wire running over a new end hole is split there, and the
// new wire is cut wherever it runs over another wire's end (a solder path joins every hole it
// covers already, so it's never split or cut). Started or ended at a wire's free end, it carries
// that wire on instead (mergeNewWire). With `replacing` (a wire being reshaped), that wire comes
// off the board in the same step and the new one takes its place in the drawing order. A route
// that starts and ends in one hole places nothing: [] (and `replacing` stays as it was).
export function routeWire(points: IDot[], style: WireStyle, replacing?: ILine, newEnds: NewEnds = {start: true, end: true}): ILine[] {
  const route = points.filter((dot, i) => i === 0 || dot !== points[i - 1]);
  const [start, end] = [route[0], route[route.length - 1]];
  if (route.length < 2 || start === end) return [];

  const removed: ILine[] = [];
  const added: ILine[] = [];
  let at = LineState.lines.length;
  if (replacing) {
    at = LineState.lines.indexOf(replacing);
    if (at > -1) LineState.lines.splice(at, 1);
    removed.push(replacing);
  }
  for (const [dot, isNew] of [[start, newEnds.start], [end, newEnds.end]] as const) {
    if (!isNew) continue;
    const split = splitWiresAt(dot, style.side);
    removed.push(...split.removed);
    added.push(...split.added);
  }
  const {line: mergedLine, absorbed} = mergeNewWire(lineThrough(route, {start, end, ...style}), newEnds);
  const pieces = cutAtWireEnds(mergedLine);
  LineState.lines.splice(Math.max(0, Math.min(at, LineState.lines.length)), 0, ...pieces);
  if (removed.length === 0 && absorbed.length === 0 && pieces.length === 1) {
    HistoryState.record({type: 'add', kind: 'line', line: pieces[0]});
  } else {
    // A half made and gone again within this placement (split again at the other end, or merged
    // straight back in) never existed as far as undo is concerned.
    const gone = [...removed, ...absorbed];
    HistoryState.record({
      type: 'replace', kind: 'line',
      removed: gone.filter(line => !added.includes(line)),
      added: [...added.filter(line => !gone.includes(line)), ...pieces],
    });
  }
  return pieces;
}

// The wire about to be placed through `points` (its holes in order), dashed, as the board will
// draw it: a jumper's bends rounded, in the active colour and thickness, or with `tool` "solder" a
// solder path. A ring on the last hole when ending there would connect the wire.
export function drawWirePreview(painter: Painter, points: IDot[], ringEnd = false, tool: RouteTool["kind"] = "wire") {
  painter.group({opacity: 0.55}, () => {
    if (tool === "solder") {
      painter.line(points, {paint: SOLDER_EDGE, width: SOLDER_PATH_WIDTH + 3, cap: "round", join: "round"});
      painter.line(points, {paint: SOLDER_COLOR, width: SOLDER_PATH_WIDTH, cap: "round", join: "round", dash: [6, 4]});
      return;
    }
    painter.line(roundedWireLine(points), {
      paint: ToolState.activeWireColor || "#3b82f6", width: ToolState.selectedWireWidth || 4, cap: "round", join: "round", dash: [6, 4],
    });
  });
  const end = points[points.length - 1];
  if (ringEnd) painter.circle(end.x, end.y, 13, {stroke: {paint: SELECTION_COLOR, width: 2.5}});
}

// The run so far: its start and the holes it bends at.
const route = (tool: RouteTool): IDot[] => tool.start ? [tool.start, ...(tool.via ?? [])] : [];

// Places the wire drawn so far, ending at `end`, and selects it.
function placeRun(tool: RouteTool, end: IDot) {
  if (!tool.start) return;
  SelectionState.current = {kind: "line", line: placeWire(tool.start, end, tool.via ?? [], tool.kind)};
}

// What the status badge calls the wire a route tool makes.
const NAMES: Record<RouteTool["kind"], {tool: string; drawing: string}> = {
  wire: {tool: "Wire", drawing: "Drawing a wire"},
  solder: {tool: "Solder path", drawing: "Drawing a solder path"},
};

// A run of wires (or solder paths), one click per hole. A click on a hole the wire would connect to
// there (a pin, a wire, or a stripboard's strip) ends the wire there, and the next one starts from
// it; any other hole is a bend. Clicking the last hole again (or Enter) ends the wire there instead
// and ends the run; clicking the start again before any bend ends the run without a wire.
const routeTool: ToolBehavior<RouteTool> = {
  onPointerDown(tool, {hoverDot}) {
    if (!hoverDot) return false;
    if (!tool.start) {
      tool.start = hoverDot;
      tool.via = [];
      return true;
    }
    const sofar = route(tool);
    if (hoverDot === sofar[sofar.length - 1]) {
      // The same hole again: the wire ends here, or with no bend yet, the run ends.
      const end = tool.via?.pop();
      if (end) placeRun(tool, end);
      tool.start = undefined;
      tool.via = [];
      return true;
    }
    // A hole the wire already runs through can't be one of its holes again.
    if (sofar.includes(hoverDot)) return true;
    if (connectsAt(hoverDot)) {
      placeRun(tool, hoverDot);
      // Chain the run: the end becomes the next wire's start, so a series of connections costs
      // one click per hole.
      tool.start = hoverDot;
      tool.via = [];
      return true;
    }
    tool.via = [...(tool.via ?? []), hoverDot];
    return true;
  },

  drawPreview(tool, hoverDot, painter) {
    const sofar = route(tool);
    if (!sofar.length) {
      drawStartMarker(painter, hoverDot, tool.kind === "solder" ? "Start Solder Path" : "Start Wire");
      return;
    }
    if (sofar.includes(hoverDot)) {
      // On the last hole: the wire as it would end there.
      if (hoverDot === sofar[sofar.length - 1] && sofar.length > 1) drawWirePreview(painter, sofar, true, tool.kind);
      return;
    }
    drawWirePreview(painter, [...sofar, hoverDot], connectsAt(hoverDot), tool.kind);
  },

  statusText(tool) {
    const names = NAMES[tool.kind];
    if (!tool.start) return `${names.tool} [Click a start pad, or drag pad to pad]`;
    const bends = tool.via?.length ?? 0;
    // On a stripboard every hole but a cut one is on a strip, so a click there connects.
    const bendHint = BoardState.isStripboard ? "Drag pad to pad for an L" : "Click empty holes to bend";
    return bends
      ? `${names.drawing}, ${bends} bend${bends === 1 ? "" : "s"} [Click a pin or wire to connect • Click the last hole again or press Enter to end there • Esc takes back a bend]`
      : `${names.drawing} [Click a pin or wire to connect • ${bendHint} • Click the same pad or press Esc to stop]`;
  },

  // Escape takes back the last bend, then ends the run (leaving the wire tool armed, so ending a
  // run doesn't cost a re-arm). A further press disarms it.
  stepBack(tool) {
    if (tool.via?.length) {
      tool.via = tool.via.slice(0, -1);
      return true;
    }
    if (!tool.start) return false;
    tool.start = undefined;
    return true;
  },

  // Enter ends the wire at its last bend, and the run with it.
  finish(tool) {
    const end = tool.via?.pop();
    if (!end) return false;
    placeRun(tool, end);
    tool.start = undefined;
    tool.via = [];
    return true;
  },
};

export const wireTool: ToolBehavior<Extract<RouteTool, {kind: "wire"}>> = routeTool;
export const solderTool: ToolBehavior<Extract<RouteTool, {kind: "solder"}>> = routeTool;
