import {SelectionState} from "../../state/SelectionState";
import {isRotatable} from "../../interfaces/placed-part.interface";
import {isLed} from "../../parts/component-definitions";
import {holeName, toGridPos} from "../../project-file/grid";
import {IDot} from "../../interfaces/dot.interface";
import {redrawCanvas} from "../../features/draw-canvas";
import {rotateSelectedIc} from "../../features/ic";
import {setActiveTool} from "../../features/active-tool";
import {changeSelectedColor, moveSelectedWireToSide} from "../../features/wire";
import {addDescriptionToDot} from "../../features/dot-notes";
import {deleteSelection} from "../../features/delete-selection";
import {setSelectedComponentValue} from "../../features/standard-components/standard-component-actions";
import {straightenWire} from "../../features/wire-reshape";
import {hideBoardMenus, showBoardMenu} from "../../features/board-menus";
import type {IconName} from "../components/Icon";

// What can be done to the selected part, wire or pad. The selection bar over the board and the
// context menu offer the same actions, each only where it applies.

export type SelectionAction = "wire" | "solder" | "rotate" | "color" | "straighten" | "to-bottom" | "to-top" | "value" | "note" | "delete";

// How each action shows: its icon, and its labels in the selection bar and the context menu.
export const ACTIONS: Record<SelectionAction, {icon: IconName; label: string; title: string; menuLabel: string; key?: string}> = {
  wire: {icon: "wire", label: "Wire", title: "Start a wire from this pad", menuLabel: "Start Wire Here"},
  solder: {icon: "solder-path", label: "Solder", title: "Start a solder path from this pad", menuLabel: "Start Solder Path Here"},
  rotate: {icon: "rotate", label: "Rotate", title: "Rotate (R)", menuLabel: "Rotate", key: "R"},
  color: {icon: "color", label: "Color", title: "Change color", menuLabel: "Change Color"},
  straighten: {icon: "straighten", label: "Straighten", title: "Take out the wire's bends", menuLabel: "Straighten"},
  "to-bottom": {icon: "to-bottom", label: "To solder side", title: "Move this wire to the solder side", menuLabel: "Move to Solder Side"},
  "to-top": {icon: "to-top", label: "To top", title: "Move this wire to the top", menuLabel: "Move to Top"},
  value: {icon: "value", label: "Value", title: "Set value", menuLabel: "Set Value"},
  note: {icon: "note", label: "Note", title: "Add or edit a note", menuLabel: "Add/Edit Note"},
  delete: {icon: "trash", label: "Delete", title: "Delete (Del)", menuLabel: "Delete", key: "Del"},
};

// The actions that apply to the selection, in the selection bar's order.
export function availableActions(): SelectionAction[] {
  const selection = SelectionState.current;
  if (!selection) return [];
  if (selection.kind === "line") {
    // A solder path has no colour.
    const jumper = selection.line.kind !== "solder";
    const color: SelectionAction[] = jumper ? ["color"] : [];
    const side: SelectionAction[] = jumper ? [selection.line.side === "bottom" ? "to-top" : "to-bottom"] : [];
    return selection.line.via?.length ? [...color, "straighten", ...side, "delete"] : [...color, ...side, "delete"];
  }
  if (selection.kind === "dot") return selection.dot.description ? ["wire", "solder", "note", "delete"] : ["wire", "solder", "note"];
  const {part} = selection;
  const actions: SelectionAction[] = [];
  if (isRotatable(part)) actions.push("rotate");
  if (part.kind === "standard-component" && isLed(part.definitionId)) actions.push("color");
  if (part.kind !== "ic") actions.push("value");
  actions.push("delete");
  return actions;
}

// What's selected, in a few words: "R1 Resistor", "Wire", "Pad C4".
export function selectionLabel(): string {
  const selection = SelectionState.current;
  if (!selection) return "";
  if (selection.kind === "line") return selection.line.kind === "solder" ? "Solder path" : "Wire";
  if (selection.kind === "dot") return `Pad ${holeName(toGridPos(selection.dot))}`;
  const {part} = selection;
  const name = part.kind === "ic" ? part.name : part.getDefinition()?.name;
  return name ? `${part.ref} ${name}` : part.ref;
}

// Runs an action from a button. `startHole` is where a wire starts: the hole the context menu was
// opened on, or else the selected pad. An LED's colours are a small menu of their own, opened
// under the button.
export function runSelectionAction(action: SelectionAction, button: HTMLElement, startHole?: IDot) {
  const part = SelectionState.part;
  if (action === "color" && part?.kind === "standard-component" && isLed(part.definitionId)) {
    const rect = button.getBoundingClientRect();
    showBoardMenu({kind: "led-colors", x: rect.left, y: rect.bottom + 4});
    return;
  }
  hideBoardMenus();
  switch (action) {
    case "wire":
    case "solder": {
      // The tool, with its first hole already picked.
      const hole = startHole ?? SelectionState.dot;
      if (!hole) return;
      SelectionState.clear();
      setActiveTool({kind: action, start: hole});
      return;
    }
    case "rotate":
      return rotateSelectedIc();
    case "color":
      return changeSelectedColor();
    case "straighten":
      if (SelectionState.line) straightenWire(SelectionState.line);
      return redrawCanvas();
    case "to-bottom":
    case "to-top":
      return moveSelectedWireToSide(action === "to-bottom" ? "bottom" : "top");
    case "note":
      if (SelectionState.dot) void addDescriptionToDot();
      return;
    case "value":
      return void setSelectedComponentValue();
    case "delete":
      return deleteSelection();
  }
}

export function deselect() {
  hideBoardMenus();
  SelectionState.clear();
  redrawCanvas();
}
