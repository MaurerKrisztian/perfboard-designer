import {DotState} from "../state/DotState";
import {LineState} from "../state/LineState";
import {HistoryState} from "../state/HistoryState";
import {SelectionState} from "../state/SelectionState";
import {isPlacementTool, ToolState} from "../state/ToolState";
import {cancelDrag} from "./component-drag";
import {cancelBox} from "./box-select";

// Drops the selection (and Select more), any armed placement (wire, IC, component), and a drag or
// selection box in progress. The caller redraws.
export function resetInteraction() {
  cancelDrag();
  cancelBox();
  SelectionState.clear();
  SelectionState.adding = false;
  // Placement tools drop back to Select; a mode (Eraser, Note) stays put.
  if (isPlacementTool(ToolState.active)) ToolState.active = {kind: "select"};
}

// Everything that refers to the board being replaced (load, reset, resize): the interaction
// state above, hover targets, and the undo history.
export function resetForNewBoard() {
  resetInteraction();
  DotState.hoverDot = undefined;
  LineState.hoverLine = undefined;
  HistoryState.clear();
}
