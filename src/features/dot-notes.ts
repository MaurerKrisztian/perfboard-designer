import {IDot} from "../interfaces/dot.interface";
import {DotState} from "../state/DotState";
import {SelectionState} from "../state/SelectionState";
import {askText} from "./ask-dialog";
import {requestRedraw} from "./redraw-request";

// Asks for a pad's note and stores it, redrawing if it changed. Kept free of draw-canvas so the
// note tool, which draw-canvas reaches through the tool registry, doesn't close an import cycle.
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
