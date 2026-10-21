import {redrawCanvas, onRedraw} from "./draw-canvas";
import {rotateSelectedIc} from "./ic";
import {contextMenuHole, hideContextMenu, hideLedColorMenu, showLedColorMenu} from "./select";
import {setActiveTool} from "./active-tool";
import {changeSelectedColor} from "./dot";
import {addDescriptionToDot} from "./dot-notes";
import {deleteLine} from "./line";
import {setSelectedComponentValue, setSelectedLedColor} from "./standard-components/standard-component-actions";
import type {LedColor} from "../parts/component-definitions";
import {SelectionState} from "../state/SelectionState";
import {isLed} from "../parts/component-definitions";
import {isRotatable} from "../interfaces/placed-part.interface";
import {holeName, toGridPos} from "../project-file/grid";
import {Utils} from "../utils/utils";
import {updateSelectionStatus} from "./selection-status";
import {straightenWire} from "./wire-reshape";

// What can be done to the selected part, wire or pad: the right-click context menu and the
// selection bar over the board offer the same actions, as buttons with a data-action. Only the
// ones that apply are shown: <body data-sel-actions="rotate value delete"> lists them, and the
// stylesheet hides the rest.

type Action = "wire" | "solder" | "rotate" | "color" | "straighten" | "value" | "note" | "delete";

function availableActions(): Action[] {
  const selection = SelectionState.current;
  if (!selection) return [];
  if (selection.kind === "line") {
    // A solder path has no colour.
    const color: Action[] = selection.line.kind === "solder" ? [] : ["color"];
    return selection.line.via?.length ? [...color, "straighten", "delete"] : [...color, "delete"];
  }
  if (selection.kind === "dot") return selection.dot.description ? ["wire", "solder", "note", "delete"] : ["wire", "solder", "note"];
  const {part} = selection;
  const actions: Action[] = [];
  if (isRotatable(part)) actions.push("rotate");
  if (part.kind === "standard-component" && isLed(part.definitionId)) actions.push("color");
  if (part.kind !== "ic") actions.push("value");
  actions.push("delete");
  return actions;
}

function selectionLabel(): string {
  const selection = SelectionState.current;
  if (!selection) return "";
  if (selection.kind === "line") return selection.line.kind === "solder" ? "Solder path" : "Wire";
  if (selection.kind === "dot") {
    return `Pad ${holeName(toGridPos(selection.dot))}`;
  }
  const {part} = selection;
  const name = part.kind === "ic" ? part.name : part.getDefinition()?.name;
  return name ? `${part.ref} ${name}` : part.ref;
}

function runAction(action: string, e: MouseEvent) {
  const part = SelectionState.part;
  if (action === "color" && part?.kind === "standard-component" && isLed(part.definitionId)) {
    // The LED's colours are a small menu of their own, opened by the button; kept from the window
    // click handler, which closes menus on a click outside them.
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    showLedColorMenu(rect.left, rect.bottom + 4);
    return;
  }
  const fromMenu = !!(e.currentTarget as HTMLElement).closest("#contextMenu");
  hideContextMenu();
  if (action === "wire" || action === "solder") {
    // The wire (or solder path) tool, with its first hole already picked.
    const hole = fromMenu ? contextMenuHole() : SelectionState.dot;
    if (!hole) return;
    SelectionState.clear();
    setActiveTool({kind: action, start: hole});
  } else if (action === "rotate") {
    rotateSelectedIc();
  } else if (action === "color") {
    changeSelectedColor();
  } else if (action === "straighten") {
    if (SelectionState.line) straightenWire(SelectionState.line);
    updateSelectionStatus();
    redrawCanvas();
  } else if (action === "note") {
    if (SelectionState.dot) void addDescriptionToDot();
  } else if (action === "value") {
    void setSelectedComponentValue();
  } else if (action === "delete") {
    deleteLine();
  } else if (action === "deselect") {
    SelectionState.clear();
    updateSelectionStatus();
    redrawCanvas();
  }
}

document.querySelectorAll<HTMLElement>("#contextMenu [data-action], #selectionBar [data-action]").forEach(btn => {
  btn.addEventListener("click", (e) => runAction(btn.dataset.action ?? "", e));
});

document.querySelectorAll<HTMLButtonElement>('#ledColorMenu button[data-led-color]').forEach(btn => {
  btn.addEventListener('click', () => {
    const color = btn.dataset.ledColor as LedColor | "";
    setSelectedLedColor(color ? color : undefined);
    hideLedColorMenu();
  });
});

// Every change of selection ends in a redraw.
const bar = Utils.getSafeHtmlElement("selectionBar");
const barLabel = Utils.getSafeHtmlElement("selectionBarLabel");
let shownActions = "";
let shownLabel = "";
onRedraw(() => {
  const actions = availableActions().join(" ");
  const label = selectionLabel();
  if (actions === shownActions && label === shownLabel) return;
  shownActions = actions;
  shownLabel = label;
  document.body.dataset.selActions = actions;
  barLabel.textContent = label;
  bar.hidden = !SelectionState.current;
});
