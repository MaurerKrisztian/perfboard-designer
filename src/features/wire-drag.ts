import {IDot} from "../interfaces/dot.interface";
import {DotState} from "../state/DotState";
import {GridConfig} from "../state/GridConfig";
import {PartState} from "../state/PartState";
import {SelectionState} from "../state/SelectionState";
import {ToolState} from "../state/ToolState";
import {placeWire} from "./tools/wire-tool";
import {findDotAt} from "./dot-lookup";
import {requestRedraw} from "./redraw-request";

// Drawing a wire by dragging from one hole to another, in Select mode or with the wire tool.
// select.ts (mouse) and board-touch.ts (fingers) start it once a press on a hole begins to move,
// and finish it on the hole under the pointer when it's let go; the board draws it dashed until
// then (draw-canvas.ts). Callers redraw.
//
// The wire routes itself as an L with one bend: along the way the pointer first moved (across,
// then down; or down, then across), like a cable being pulled, and straight when the two holes
// line up. "/" (or a second finger) flips the L; holding Shift draws it straight, diagonal if need be.

export type WireAxis = "across" | "down";

let from: IDot | undefined;
let firstAxis: WireAxis = "across";
let straight = false;

// A mouse has to land on the hole itself, so a drag from close by still pans the board. A finger
// is less exact: anywhere a hover would pick the hole.
const MOUSE_GRAB_RADIUS = GridConfig.dotRadius + 7;

function isPinHole(dot: IDot): boolean {
  return PartState.parts.some(part => part.getPinPositions().some(pin => pin.x === dot.x && pin.y === dot.y));
}

// The hole a press at (x, y) would drag a wire from, if it would.
export function wireDragStartDot(x: number, y: number, finger: boolean): IDot | undefined {
  const tool = ToolState.active.kind;
  if (tool !== "select" && tool !== "wire") return undefined;
  const dot = DotState.hoverDot;
  if (!dot) return undefined;
  if (!finger && Math.hypot(x - dot.x, y - dot.y) > MOUSE_GRAB_RADIUS) return undefined;
  // In Select mode a part's body is picked up to move it; its pins are wired from.
  if (tool === "select" && PartState.parts.some(part => part.containsPoint(x, y)) && !isPinHole(dot)) return undefined;
  return dot;
}

// The way a move of (dx, dy) went first.
export function axisOf(dx: number, dy: number): WireAxis {
  return Math.abs(dx) >= Math.abs(dy) ? "across" : "down";
}

export function startWireDrag(dot: IDot, axis: WireAxis) {
  from = dot;
  firstAxis = axis;
  straight = false;
}

export function wireDragFrom(): IDot | undefined {
  return from;
}

export function cancelWireDrag() {
  from = undefined;
}

// The L the other way round.
export function flipWireDrag() {
  firstAxis = firstAxis === "across" ? "down" : "across";
}

// Shift held: straight from hole to hole.
export function setWireDragStraight(on: boolean) {
  straight = on;
}

// The holes the dragged wire would run through to `to`: its start, its bend (if it needs one) and
// `to`.
export function wireDragRoute(to: IDot): IDot[] {
  if (!from) return [];
  if (straight || from.x === to.x || from.y === to.y) return [from, to];
  const bend = firstAxis === "across" ? findDotAt(to.x, from.y) : findDotAt(from.x, to.y);
  return bend ? [from, bend, to] : [from, to];
}

// Ends the drag on `to`: a wire along its route, selected, unless `to` is the hole the drag
// started from (or none). Returns whether a wire was drawn.
export function finishWireDrag(to: IDot | undefined): boolean {
  const start = from;
  if (!start || !to || to === start) {
    from = undefined;
    return false;
  }
  const route = wireDragRoute(to);
  from = undefined;
  SelectionState.current = {kind: "line", line: placeWire(start, to, route.slice(1, -1))};
  // The wire tool's next click starts a new run rather than continuing from somewhere else.
  const tool = ToolState.active;
  if (tool.kind === "wire") {
    tool.start = undefined;
    tool.via = [];
  }
  return true;
}

// While a wire is dragged: "/" flips its L, Shift straightens it. Caught before the shortcuts
// (capture phase), since "/" is also the components search.
function onKey(e: KeyboardEvent) {
  if (!from) return;
  if (e.key === "/" && e.type === "keydown") {
    e.preventDefault();
    e.stopImmediatePropagation();
    flipWireDrag();
    requestRedraw();
  } else if (e.key === "Shift") {
    setWireDragStraight(e.type === "keydown");
    requestRedraw();
  }
}
window.addEventListener("keydown", onKey, true);
window.addEventListener("keyup", onKey, true);
