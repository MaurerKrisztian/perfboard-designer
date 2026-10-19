import {solderJoints} from "../board-render";
import {ViewState} from "../state/ViewState";
import {Utils} from "../utils/utils";
import {onRedraw, redrawCanvas} from "./draw-canvas";
import {getSaveJson} from "./project/save-project";
import {resetInteraction} from "./reset-interaction";
import {updateSelectionStatus} from "./selection-status";
import {ShortcutRegistry} from "./shortcut-keys";
import {onToolPicked} from "./active-tool";

// The solder side view: the board from below, mirrored, with every joint to solder marked (drawn
// by the board renderer, view.solderSide). It's for looking at, so while it's on the board only
// pans and zooms (select.ts, board-touch.ts and hover.ts check ViewState.solderSide). Picking a
// tool turns it off (active-tool.ts). Downloads show it too.

const button = Utils.getSafeHtmlElement("solderViewBtn");

export function setSolderSide(on: boolean) {
  if (ViewState.solderSide === on) return;
  ViewState.solderSide = on;
  if (on) {
    resetInteraction();
    countJoints();
  }
  document.body.classList.toggle("solder-side", on);
  button.classList.toggle("is-on", on);
  button.setAttribute("aria-pressed", String(on));
  updateSelectionStatus();
  redrawCanvas();
}

function countJoints() {
  ViewState.solderJointCount = solderJoints(getSaveJson()).length;
}

button.addEventListener("click", () => setSolderSide(!ViewState.solderSide));

ShortcutRegistry.add({key: "b", description: "Show the solder side (the board from below).", event: () => setSolderSide(!ViewState.solderSide)});

// Undo still works while it's on, so the count follows the board.
onRedraw(() => {
  if (!ViewState.solderSide) return;
  const before = ViewState.solderJointCount;
  countJoints();
  if (ViewState.solderJointCount !== before) updateSelectionStatus();
});

onToolPicked(() => setSolderSide(false));
