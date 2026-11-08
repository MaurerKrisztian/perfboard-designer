import {reportUsage} from "./analytics";
import {redrawCanvas} from "./draw-canvas";
import {readDescription} from "../project-file/description";
import {DescriptionState} from "../state/DescriptionState";
import {HistoryState} from "../state/HistoryState";

// Changing the open project's description, as its dialog does when it closes: one undoable step,
// saved with the board. Text with nothing in it removes the description.
export function setDescription(text: string) {
  const before = DescriptionState.current;
  const next = readDescription(text);
  if (next === before) return;
  DescriptionState.current = next;
  HistoryState.record({type: "set", kind: "description", from: before, to: next});
  reportUsage({name: "edit_description"});
  redrawCanvas();
}
