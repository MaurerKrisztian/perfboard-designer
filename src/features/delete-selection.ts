import {LineState} from "../state/LineState";
import {HistoryState} from "../state/HistoryState";
import {redrawCanvas} from "./draw-canvas";
import {removePart, takeOffBoard} from "./placed-parts";
import {SelectionState} from "../state/SelectionState";
import {PartState} from "../state/PartState";
import type {Part} from "../interfaces/placed-part.interface";
import type {ILine} from "../interfaces/line.interface";
import type {IChange} from "../interfaces/change.interface";

// Takes these parts and wires off the board as one undoable step, and out of the selection.
// Returns whether anything was on the board to take off. Last on the board first, so undo (which
// replays them backwards, putting each back on top) brings them back in their order.
export function deleteItems(parts: Part[], lines: ILine[]): boolean {
  const changes: IChange[] = [];
  const last = <T>(list: T[]) => (a: T, b: T) => list.indexOf(b) - list.indexOf(a);
  lines = [...lines].sort(last(LineState.lines));
  parts = [...parts].sort(last(PartState.parts));
  for (const line of lines) {
    const index = LineState.lines.indexOf(line);
    if (index < 0) continue;
    LineState.lines.splice(index, 1);
    SelectionState.forget({line});
    changes.push({type: 'remove', kind: 'line', line});
  }
  for (const part of parts) {
    if (takeOffBoard(part)) changes.push({type: 'remove', kind: 'part', part});
  }
  if (!changes.length) return false;
  HistoryState.record(changes.length === 1 ? changes[0] : {type: 'batch', kind: 'batch', changes});
  return true;
}

// Deletes whatever is selected: several parts and wires, a placed part, else a wire, else a
// hole's note.
export function deleteSelection() {
  if (SelectionState.isMany) {
    deleteItems(SelectionState.parts, SelectionState.lines);
    SelectionState.clear();
    redrawCanvas();
    return;
  }
  const part = SelectionState.part;
  if (part && removePart(part)) {
    redrawCanvas();
    return;
  }
  const line = SelectionState.line;
  if (line) {
    const index = LineState.lines.indexOf(line);
    if (index > -1) {
      HistoryState.record({type: 'remove', kind: 'line', line});
      LineState.lines.splice(index, 1);
      SelectionState.clear("line");
      redrawCanvas();
      return;
    }
  }
  if (SelectionState.dot) {
    SelectionState.dot.description = undefined;
    SelectionState.clear("dot");
    redrawCanvas();
  }
}
