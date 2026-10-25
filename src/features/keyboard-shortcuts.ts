import {ShortcutRegistry} from "./shortcut-keys";
import {changeSelectedColor, toggleRouteTool} from "./wire";
import {rotateSelectedIc} from "./ic";
import {deleteSelection} from "./delete-selection";
import {addDescriptionToDot, moveNoteToHoveredHole, removeNoteFromSelectedHole} from "./dot-notes";
import {toggleSolderSide} from "./solder-view";
import {finishActiveTool, stepBack} from "./select";
import {redo, undo} from "./project/undo-redo";
import {downloadAsImage} from "./project/save-image";
import {canCopy, copySelection, cutSelection, duplicateSelection, hasCopy, pasteClipboard} from "./clipboard";
import {selectEverything} from "./board-selection";
import {setActiveTool} from "./active-tool";
import {ToolState} from "../state/ToolState";
import {ViewState} from "../state/ViewState";

// Text selected on the page (in a panel) is what Ctrl+C copies, not the board's selection.
const pageTextSelected = () => !(window.getSelection()?.isCollapsed ?? true);

// Ctrl+A: every part and wire, in Select mode.
function selectAll() {
  if (ViewState.solderSide) return;
  selectEverything();
  // setActiveTool redraws.
  setActiveTool(ToolState.active.kind === "select" ? ToolState.active : {kind: "select"});
}

// The editor's keyboard shortcuts, in the order the legend lists them. The UI adds the few that
// belong to a control of its own (/ for the components search, F for focus mode).
export function registerEditorShortcuts() {
  const add = (key: string, description: string, event: () => void, modifiers: {ctrl?: boolean; shift?: boolean; when?: () => boolean} = {}) =>
    ShortcutRegistry.add({key, description, event, ...modifiers});
  const onBoard = () => !ViewState.solderSide;

  add("w", "Toggle the wire tool.", () => toggleRouteTool("wire"));
  add("s", "Toggle the solder path tool.", () => toggleRouteTool("solder"));
  add("r", "Rotate the selected part, or the one being placed.", rotateSelectedIc);
  add("Delete", "Delete the selected part, wire or note.", deleteSelection);
  add("c", "Change the selected wire's color.", changeSelectedColor);
  add("d", "Add a note to the selected hole.", () => void addDescriptionToDot());
  add("d", "Remove the selected hole's note.", removeNoteFromSelectedHole, {shift: true});
  add("m", "Move the selected hole's note to the hole under the pointer.", moveNoteToHoveredHole);
  add("b", "Show the solder side (the board from below).", toggleSolderSide);
  add("Enter", "End the wire being drawn at its last bend, or save the required net being picked.", finishActiveTool);
  add("Escape", "Step back: unselect, or cancel what's being placed.", stepBack);
  add("z", "Undo the last change.", undo, {ctrl: true});
  add("y", "Redo the last undo.", redo, {ctrl: true});
  add("a", "Select every part and wire.", selectAll, {ctrl: true});
  add("c", "Copy the selected parts and wires.", copySelection, {ctrl: true, when: () => canCopy() && !pageTextSelected()});
  add("x", "Cut the selected parts and wires.", cutSelection, {ctrl: true, when: () => canCopy() && onBoard() && !pageTextSelected()});
  add("v", "Paste at the pointer.", pasteClipboard, {ctrl: true, when: () => hasCopy() && onBoard()});
  add("d", "Duplicate the selected parts and wires.", duplicateSelection, {ctrl: true, when: () => canCopy() && onBoard()});
  add("p", "Download the board as an image.", () => void downloadAsImage());
}
