import {IDot} from "../interfaces/dot.interface";
import {ILine} from "../interfaces/line.interface";
import {Canvas} from "../state/Canvas";
import {GridConfig} from "../state/GridConfig";
import {SelectionState} from "../state/SelectionState";
import {ToolState} from "../state/ToolState";
import {lineLegs, linePoints} from "./line-path";
import {NewEnds, routeWire, styleOf} from "./tools/wire-tool";

// Bending a selected wire by its handles, in Select mode (the board draws them: layers/wires.ts):
// - drag a leg (anywhere along it, or its midpoint dot) to pull a new bend out of it, which
//   follows the pointer from hole to hole;
// - drag a bend to move it; let go of it in line with its neighbours and it's gone;
// - drag an end to move that end to another hole, connecting the wire there instead;
// - double-click a bend to take it out; Straighten (selection-actions.ts) takes them all out.
// select.ts (mouse) and board-touch.ts (fingers) start a drag on a handle, and hover.ts moves it
// with the pointer. The wire changes live while it's dragged; letting go puts the new route
// through routeWire as one undoable step (joining what a moved end lands on), Escape puts the
// wire back. Callers redraw.

export type WireGrip =
  | {kind: "end"; at: "start" | "end"}
  // By index into the wire's `via`.
  | {kind: "bend"; index: number}
  // By index into its legs (lineLegs()).
  | {kind: "leg"; index: number};

// How close a press has to be to a handle, in CSS px: a finger is less exact than a mouse.
const REACH = {mouse: 11, finger: 22};

interface Reshape {
  line: ILine;
  // What's being dragged: never a leg by now, since dragging a leg makes a bend in it.
  grip: Exclude<WireGrip, {kind: "leg"}>;
  // The wire as it was, to put back (history holds it as it was placed).
  original: Pick<ILine, "start" | "end" | "via">;
}

let reshape: Reshape | undefined;

// Drawing px per CSS px of the board as shown.
function drawingPerCssPx(): number {
  const shown = Canvas.c.getBoundingClientRect().width;
  return shown ? Canvas.gridWidth / shown : 1;
}

function distanceToLeg(x: number, y: number, [a, b]: [IDot, IDot]): number {
  const dx = b.x - a.x, dy = b.y - a.y;
  const lengthSq = dx * dx + dy * dy;
  const t = lengthSq ? Math.max(0, Math.min(1, ((x - a.x) * dx + (y - a.y) * dy) / lengthSq)) : 0;
  return Math.hypot(x - (a.x + t * dx), y - (a.y + t * dy));
}

// The selected wire's handle at (x, y) (drawing px), in Select mode: an end or a bend, else the
// nearest leg.
export function wireGripAt(x: number, y: number, finger: boolean): WireGrip | undefined {
  const line = SelectionState.line;
  if (!line || ToolState.active.kind !== "select") return undefined;
  const reach = (finger ? REACH.finger : REACH.mouse) * drawingPerCssPx();
  const near = (dot: IDot) => Math.hypot(dot.x - x, dot.y - y) <= reach;
  if (near(line.start)) return {kind: "end", at: "start"};
  if (near(line.end)) return {kind: "end", at: "end"};
  const bend = (line.via ?? []).findIndex(near);
  if (bend > -1) return {kind: "bend", index: bend};
  let leg: number | undefined;
  let closest = Math.max(reach * 0.8, GridConfig.lineSelectTolerance);
  lineLegs(line).forEach((ends, i) => {
    const distance = distanceToLeg(x, y, ends);
    if (distance <= closest) [leg, closest] = [i, distance];
  });
  return leg === undefined ? undefined : {kind: "leg", index: leg};
}

export function isReshaping(): boolean {
  return !!reshape;
}

// Starts dragging `grip` of the selected wire, with the pointer over hole `at` (a leg's new bend
// starts there).
export function startReshape(grip: WireGrip, at: IDot | undefined) {
  const line = SelectionState.line;
  if (!line) return;
  const original = {start: line.start, end: line.end, via: line.via};
  if (grip.kind === "leg") {
    // The new bend starts where the pointer is, or else on the leg's start (where it's invisible).
    const [legStart] = lineLegs(line)[grip.index];
    line.via = [...(line.via ?? [])];
    line.via.splice(grip.index, 0, at ?? legStart);
    reshape = {line, grip: {kind: "bend", index: grip.index}, original};
    return;
  }
  line.via = line.via ? [...line.via] : undefined;
  reshape = {line, grip, original};
  reshapeTo(at);
}

// Moves what's being dragged to hole `dot`. Returns whether the wire changed.
export function reshapeTo(dot: IDot | undefined): boolean {
  if (!reshape || !dot) return false;
  const {line, grip} = reshape;
  if (grip.kind === "end") {
    if (line[grip.at] === dot) return false;
    line[grip.at] = dot;
    return true;
  }
  const via = line.via ?? [];
  if (via[grip.index] === dot) return false;
  via[grip.index] = dot;
  return true;
}

function putBack({line, original}: Reshape) {
  line.start = original.start;
  line.end = original.end;
  if (original.via) line.via = original.via;
  else delete line.via;
}

export function cancelReshape() {
  if (reshape) putBack(reshape);
  reshape = undefined;
}

// Lets go of what's being dragged: the wire takes its new route, as one undoable step, and stays
// selected (the piece holding the dragged hole, if it was cut).
export function finishReshape() {
  if (!reshape) return;
  const held = reshape;
  reshape = undefined;
  const points = linePoints(held.line);
  putBack(held);
  const same = points.length === linePoints(held.line).length && points.every((dot, i) => dot === linePoints(held.line)[i]);
  if (same) return;
  const grabbed = held.grip.kind === "end" ? (held.grip.at === "start" ? points[0] : points[points.length - 1]) : points[held.grip.index + 1];
  reroute(held.line, points, {start: points[0] !== held.original.start, end: points[points.length - 1] !== held.original.end}, grabbed);
}

// The selected wire with bend `index` taken out.
export function removeBend(line: ILine, index: number) {
  const points = linePoints(line);
  points.splice(index + 1, 1);
  reroute(line, points, {start: false, end: false});
}

// The wire straight from end to end.
export function straightenWire(line: ILine) {
  if (line.via?.length) reroute(line, [line.start, line.end], {start: false, end: false});
}

// `line` taking the route through `points`, selected afterwards: the piece holding `keep`, if
// it's cut into pieces.
function reroute(line: ILine, points: IDot[], newEnds: NewEnds, keep?: IDot) {
  const pieces = routeWire(points, styleOf(line), line, newEnds);
  if (!pieces.length) return;
  const piece = (keep && pieces.find(p => linePoints(p).includes(keep))) || pieces[0];
  SelectionState.current = {kind: "line", line: piece};
}
