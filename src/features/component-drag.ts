import {IDot} from "../interfaces/dot.interface";
import {ILine} from "../interfaces/line.interface";
import type {Part} from "../interfaces/placed-part.interface";
import {IChange} from "../interfaces/change.interface";
import {Point} from "../interfaces/point.interface";
import {Canvas} from "../state/Canvas";
import {DragState} from "../state/DragState";
import {HistoryState} from "../state/HistoryState";
import {Selection, SelectionState} from "../state/SelectionState";
import {buildDotIndex, dotPositionKey, findNearestDot} from "./dot-lookup";
import {linePoints, setLinePoints} from "./line-path";

// Moving placed parts by dragging them, hole to hole: one part, or with several things selected,
// every selected part and wire together. One undoable step either way.

export function isDragging(): boolean {
  return DragState.parts.length > 0 || DragState.lines.length > 0;
}

// Parts that can move: those pinned to holes (every placed part is).
export function movableParts(parts: Part[]): Part[] {
  return parts.filter(part => part.getAnchorDots().length);
}

// Picks up `parts` and `lines` at (x, y). `pressed` is the one item of several that was pressed.
export function beginDrag(parts: Part[], lines: ILine[], x: number, y: number, pressed?: Selection) {
  const movable = movableParts(parts);
  if (!movable.length && !lines.length) return;
  const grabDot = findNearestDot(x, y);
  if (!grabDot) return;
  DragState.parts = movable;
  DragState.lines = [...lines];
  DragState.grabDot = grabDot;
  DragState.partOrigins = movable.map(part => part.getAnchorDots());
  DragState.lineOrigins = lines.map(linePoints);
  DragState.dotIndex = buildDotIndex();
  DragState.moved = false;
  DragState.pressed = pressed;
  Canvas.c.style.cursor = 'grabbing';
}

// Moves what's dragged to follow the cursor. Returns whether anything actually changed, so the
// caller only repaints when it has to.
export function updateDrag(x: number, y: number): boolean {
  const {parts, lines, grabDot, dotIndex} = DragState;
  if (!isDragging() || !grabDot || !dotIndex) return false;

  const nearestDot = findNearestDot(x, y);
  if (!nearestDot) return false;
  const deltaX = nearestDot.x - grabDot.x;
  const deltaY = nearestDot.y - grabDot.y;
  if (deltaX === 0 && deltaY === 0) return false;

  // A refused step leaves grabDot where it was, so the drag picks the cursor back up once it's
  // inside the board again.
  if (!shiftItems(parts, lines, deltaX, deltaY, dotIndex)) return false;
  DragState.grabDot = nearestDot;
  DragState.moved = true;
  return true;
}

// Moves `parts` and `lines` by (deltaX, deltaY) drawing pixels, a whole number of holes, onto
// the holes there: a drag's step, or an arrow key's (nudge-selection.ts). Refuses the whole step,
// changing nothing and returning false, if a hole anything covers would fall off the grid.
export function shiftItems(parts: Part[], lines: ILine[], deltaX: number, deltaY: number, dotIndex: Map<string, IDot>): boolean {
  // Holes that are *already* off the grid are exempt: placement never checked that a part fits,
  // so a part placed overhanging an edge would otherwise be impossible to move anywhere at all.
  const isOnGrid = (point: Point) => dotIndex.has(dotPositionKey(point.x, point.y));
  for (const part of parts) {
    for (const position of part.getOccupiedPositions()) {
      if (isOnGrid(position) && !isOnGrid({x: position.x + deltaX, y: position.y + deltaY})) return false;
    }
  }

  // Anchors and wire points have to be the shared DotState.dots objects: save/load re-links by
  // them and the grid drawing compares dots by reference.
  const shifted = (dots: IDot[]): IDot[] | undefined => {
    const moved = dots.map(dot => dotIndex.get(dotPositionKey(dot.x + deltaX, dot.y + deltaY)));
    return moved.every(dot => dot !== undefined) ? moved as IDot[] : undefined;
  };
  const partMoves = parts.map(part => shifted(part.getAnchorDots()));
  const lineMoves = lines.map(line => shifted(linePoints(line)));
  if (partMoves.some(dots => !dots) || lineMoves.some(dots => !dots)) return false;

  parts.forEach((part, i) => part.setAnchorDots(partMoves[i] as IDot[]));
  lines.forEach((line, i) => setLinePoints(line, lineMoves[i] as IDot[]));
  return true;
}

// The history entry for moving `parts` and `lines` from where they were (each part's anchor
// dots, each wire's points) to where they are now: one `move`, or a `batch` of them.
export function moveChange(parts: Part[], partOrigins: IDot[][], lines: ILine[], lineOrigins: IDot[][]): IChange {
  const changes: IChange[] = [
    ...parts.map((part, i): IChange => ({type: 'move', kind: 'part', part, from: partOrigins[i], to: part.getAnchorDots()})),
    ...lines.map((line, i): IChange => ({type: 'move', kind: 'line', line, from: lineOrigins[i], to: linePoints(line)})),
  ];
  return changes.length === 1 ? changes[0] : {type: 'batch', kind: 'batch', changes};
}

function clearDrag() {
  // Only hand the cursor back if a drag actually owned it - endDrag runs on every mouseup, and
  // the board pan sets its own cursor.
  if (isDragging()) {
    Canvas.c.style.cursor = 'crosshair';
  }
  DragState.parts = [];
  DragState.lines = [];
  DragState.grabDot = undefined;
  DragState.partOrigins = [];
  DragState.lineOrigins = [];
  DragState.dotIndex = undefined;
  DragState.moved = false;
  DragState.pressed = undefined;
}

export function endDrag() {
  const {parts, lines, partOrigins, lineOrigins, moved, pressed} = DragState;
  if (moved) {
    HistoryState.record(moveChange(parts, partOrigins, lines, lineOrigins));
  } else if (pressed && isDragging()) {
    SelectionState.current = pressed;
  }
  clearDrag();
}

// Abandon a drag in progress, putting everything back where it was picked up.
export function cancelDrag() {
  if (DragState.moved) {
    DragState.parts.forEach((part, i) => part.setAnchorDots(DragState.partOrigins[i]));
    DragState.lines.forEach((line, i) => setLinePoints(line, DragState.lineOrigins[i]));
  }
  clearDrag();
}
