import {IDot} from "../interfaces/dot.interface";
import {DotState} from "../state/DotState";
import {SelectionState} from "../state/SelectionState";
import {askText} from "./ask-dialog";
import {requestRedraw} from "./redraw-request";

// A hole's note ("+9V", "to battery"), shown under it: adding, removing and moving one. Kept free
// of draw-canvas so the note tool, which draw-canvas reaches through the tool registry, doesn't
// close an import cycle: it redraws with requestRedraw().

// Asks for a pad's note and stores it, redrawing if it changed.
export async function addDescriptionToDot(targetDot?: IDot): Promise<void> {
  const dot = targetDot || SelectionState.dot || DotState.hoverDot;
  if (!dot) return;
  const description = await askText({
    title: "Pad note",
    value: dot.description || "",
    placeholder: "e.g. to 9V battery, solder last",
  });
  if (description === null) return;
  dot.description = description.trim() ? description.trim() : undefined;
  SelectionState.clear("dot");
  requestRedraw();
}

// Takes the note off the selected hole.
export function removeNoteFromSelectedHole() {
  const dot = SelectionState.dot;
  if (!dot) return;
  dot.description = null;
  requestRedraw();
}

// Moves the selected hole's note onto the hovered hole. The holes themselves stay put: wires and
// parts are pinned to these dot objects, so replacing them would cut those links.
export function moveNoteToHoveredHole() {
  const from = SelectionState.dot;
  const to = DotState.hoverDot;
  if (!from || !to || from === to) return;
  to.description = from.description;
  from.description = undefined;
  SelectionState.clear("dot");
  requestRedraw();
}
