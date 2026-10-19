import {IDot} from "../interfaces/dot.interface";
import {DotState} from "../state/DotState";
import {GridConfig} from "../state/GridConfig";
import {PartState} from "../state/PartState";
import {SelectionState} from "../state/SelectionState";
import {ToolState} from "../state/ToolState";
import {placeWire} from "./tools/wire-tool";

// Drawing a wire by dragging from one hole to another, in Select mode or with the wire tool.
// select.ts (mouse) and board-touch.ts (fingers) start it once a press on a hole begins to move,
// and finish it on the hole under the pointer when it's let go; the board draws it dashed until
// then (draw-canvas.ts). Callers redraw.

let from: IDot | undefined;

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

export function startWireDrag(dot: IDot) {
  from = dot;
}

export function wireDragFrom(): IDot | undefined {
  return from;
}

export function cancelWireDrag() {
  from = undefined;
}

// Ends the drag on `to`: a wire between the two holes, selected, unless it's the hole the drag
// started from (or none). Returns whether a wire was drawn.
export function finishWireDrag(to: IDot | undefined): boolean {
  const start = from;
  from = undefined;
  if (!start || !to || to === start) return false;
  SelectionState.current = {kind: "line", line: placeWire(start, to)};
  // The wire tool's next click starts a new run rather than continuing from somewhere else.
  const tool = ToolState.active;
  if (tool.kind === "wire") tool.start = undefined;
  return true;
}
