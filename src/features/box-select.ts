import {Point} from "../interfaces/point.interface";
import {Selection, SelectionState} from "../state/SelectionState";
import {Box, selectInBox} from "./board-selection";

// A selection box: a drag with Shift held (or with Select more on) in Select mode draws a box,
// and every part and wire whose holes it encloses joins what was selected before, live as the box
// grows. select.ts starts and ends it; the board's redraw shows it (selectionBox()). Nothing here
// redraws.

let box: {from: Point; to: Point; before?: Selection} | undefined;

export function startBox(from: Point) {
  box = {from, to: from, before: SelectionState.current};
}

export function isBoxSelecting(): boolean {
  return box !== undefined;
}

// The box as it is now, corner to corner.
export function selectionBox(): Box | undefined {
  if (!box) return undefined;
  const {from, to} = box;
  return {left: Math.min(from.x, to.x), top: Math.min(from.y, to.y), right: Math.max(from.x, to.x), bottom: Math.max(from.y, to.y)};
}

// The box's far corner follows the pointer, and the selection follows the box.
export function boxTo(to: Point) {
  if (!box) return;
  box.to = to;
  const before = box.before;
  const base = before?.kind === "part" ? {parts: [before.part], lines: []}
    : before?.kind === "line" ? {parts: [], lines: [before.line]}
    : before?.kind === "many" ? {parts: before.parts, lines: before.lines}
    : {parts: [], lines: []};
  selectInBox(selectionBox() as Box, base);
}

// Lets go: what the box holds stays selected.
export function finishBox() {
  box = undefined;
}

// Escape: the selection goes back to what it was before the box.
export function cancelBox() {
  if (!box) return;
  SelectionState.current = box.before;
  box = undefined;
}
