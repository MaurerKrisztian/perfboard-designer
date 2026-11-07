import {GridConfig} from "../state/GridConfig";
import {HistoryState} from "../state/HistoryState";
import {SelectionState} from "../state/SelectionState";
import {ToolState} from "../state/ToolState";
import {ViewState} from "../state/ViewState";
import {isDragging, moveChange, movableParts, shiftItems} from "./component-drag";
import {buildDotIndex} from "./dot-lookup";
import {redrawCanvas} from "./draw-canvas";
import {linePoints} from "./line-path";
import {isReshaping} from "./wire-reshape";

// Moving the selected parts and wires one hole at a time with the arrow keys: the same step as
// dragging them by one hole, so the same rule (nothing goes off the board) and one undoable step.

// Whether an arrow key moves the selection: parts or wires are selected in Select mode, and
// nothing is being dragged or bent. Otherwise the key does what it would (scrolls the page).
export function canNudge(): boolean {
  return ToolState.active.kind === "select" && !ViewState.solderSide && !isDragging() && !isReshaping()
    && movableParts(SelectionState.parts).length + SelectionState.lines.length > 0;
}

// Moves the selection `cols` holes right and `rows` holes down (negative: left, up). Nothing
// moves when any of it would go off the board.
export function nudgeSelection(cols: number, rows: number) {
  if (!canNudge()) return;
  const parts = movableParts(SelectionState.parts);
  const lines = SelectionState.lines;
  const partOrigins = parts.map(part => part.getAnchorDots());
  const lineOrigins = lines.map(linePoints);
  const step = GridConfig.dotSpace;
  if (!shiftItems(parts, lines, cols * step, rows * step, buildDotIndex())) return;
  HistoryState.record(moveChange(parts, partOrigins, lines, lineOrigins));
  redrawCanvas();
}
