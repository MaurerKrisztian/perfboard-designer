import {solderJoints} from "../board-render";
import {ViewState} from "../state/ViewState";
import {onRedraw, redrawCanvas} from "./draw-canvas";
import {getSaveJson} from "./project/save-project";
import {resetInteraction} from "./reset-interaction";
import {onToolPicked} from "./active-tool";

// The solder side view: the board from below, mirrored, with every joint to solder marked (drawn
// by the board renderer, view.solderSide). It's for looking at, so while it's on the board only
// pans and zooms (select.ts, board-touch.ts and hover.ts check ViewState.solderSide). Picking a
// tool turns it off. Downloads show it too.

export function setSolderSide(on: boolean) {
  if (ViewState.solderSide === on) return;
  ViewState.solderSide = on;
  if (on) {
    resetInteraction();
    countJoints();
  }
  redrawCanvas();
}

export function toggleSolderSide() {
  setSolderSide(!ViewState.solderSide);
}

function countJoints() {
  ViewState.solderJointCount = solderJoints(getSaveJson()).length;
}

// Undo still works while it's on, so the count follows the board; picking a tool turns it off.
export function trackSolderSide() {
  onRedraw(() => {
    if (ViewState.solderSide) countJoints();
  });
  onToolPicked(() => setSolderSide(false));
}
