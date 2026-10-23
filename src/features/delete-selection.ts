import {LineState} from "../state/LineState";
import {HistoryState} from "../state/HistoryState";
import {redrawCanvas} from "./draw-canvas";
import {removePart} from "./placed-parts";
import {SelectionState} from "../state/SelectionState";

// Deletes whatever is selected: a placed part, else a wire, else a hole's note.
export function deleteSelection() {
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
