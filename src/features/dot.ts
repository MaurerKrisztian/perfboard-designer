import {redrawCanvas} from "./draw-canvas";
import {Utils} from "../utils/utils";
import {SelectionState} from "../state/SelectionState";

// Opens the colour picker for the selected wire.
export function changeSelectedColor(){
  const line = SelectionState.line;
  if (!line || line.kind === "solder"){
    return;
  }
  const colorPicker = Utils.getSafeHtmlElement<HTMLInputElement>('colorPicker');
  colorPicker.value = Utils.normalizeColor(line.color, "#a4a0a0");
  colorPicker.oninput = colorPicker.onchange = function() {
    line.color = colorPicker.value;
    redrawCanvas();
  };
  colorPicker.click();
}
