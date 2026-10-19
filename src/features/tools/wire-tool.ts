import {HistoryState} from "../../state/HistoryState";
import {LineState} from "../../state/LineState";
import {SelectionState} from "../../state/SelectionState";
import {ActiveTool, ToolState} from "../../state/ToolState";
import {ILine} from "../../interfaces/line.interface";
import {IDot} from "../../interfaces/dot.interface";
import type {Painter} from "../../board-render";
import {cutAtWireEnds, mergeNewWire, splitWiresAt} from "../wire-merge";
import {drawStartMarker, ToolBehavior} from "./tool";

type WireTool = Extract<ActiveTool, {kind: "wire"}>;

// Puts a wire in the active colour and thickness between two holes, recorded for undo as one step,
// and returns it (its last piece, if cut). A wire ending on another joins it either way round: a
// wire passing over either end hole is split there, and the new wire is cut wherever it passes over
// another wire's end. It's merged into a same-colour wire it continues, if any.
export function placeWire(start: IDot, end: IDot): ILine {
  const removed: ILine[] = [];
  const added: ILine[] = [];
  for (const dot of [start, end]) {
    const split = splitWiresAt(dot);
    removed.push(...split.removed);
    added.push(...split.added);
  }
  const newLine: ILine = {
    start,
    end,
    color: ToolState.activeWireColor || "#3b82f6",
    width: ToolState.selectedWireWidth || 4
  };
  // Same-color wires that end up collinear and touching (e.g. a chained run) fold into
  // one wire, unless the shared dot is a pin - that endpoint has to stay splittable.
  const {line: mergedLine, absorbed} = mergeNewWire(newLine);
  const pieces = cutAtWireEnds(mergedLine);
  LineState.lines.push(...pieces);
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
  return pieces[pieces.length - 1];
}

// The wire about to be placed, dashed.
export function drawWirePreview(painter: Painter, start: IDot, end: IDot) {
  painter.group({opacity: 0.55}, () => painter.line([start, end], {
    paint: ToolState.activeWireColor || "#3b82f6", width: ToolState.selectedWireWidth || 4, cap: "round", dash: [6, 4],
  }));
}

// Two-click span that stays armed for repeated placement, chaining each wire into the next.
export const wireTool: ToolBehavior<WireTool> = {
  onPointerDown(tool, {hoverDot}) {
    if (!hoverDot) return false;
    if (!tool.start) {
      tool.start = hoverDot;
      return true;
    }
    if (tool.start === hoverDot) {
      // Clicking the same pad again ends the run without drawing anything.
      tool.start = undefined;
      return true;
    }
    SelectionState.current = {kind: "line", line: placeWire(tool.start, hoverDot)};
    // Chain the run: the end pad becomes the next wire's start, so a series of
    // connections costs one click per wire instead of two.
    tool.start = hoverDot;
    return true;
  },

  drawPreview(tool, hoverDot, painter) {
    const start = tool.start;
    if (!start) {
      drawStartMarker(painter, hoverDot, "Start Wire");
      return;
    }
    if (start === hoverDot) return;
    drawWirePreview(painter, start, hoverDot);
  },

  statusText(tool) {
    return tool.start
      ? `Wiring Run [Click next pad • Same pad or Esc to end run]`
      : `Wire Tool Armed [Click start pad, or drag pad to pad]`;
  },

  // Mid-run, Escape only breaks the chain and leaves the wire tool armed, so ending a run does
  // not cost a re-arm. A second press disarms it.
  stepBack(tool) {
    if (!tool.start) return false;
    tool.start = undefined;
    return true;
  },
};
