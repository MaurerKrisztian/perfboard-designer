import {redrawCanvas} from "./draw-canvas";
import {Utils} from "../utils/utils";
import {SelectionState} from "../state/SelectionState";

export function setDotColor(color: string){
  if (SelectionState.dot){
    SelectionState.dot.color = color;
    redrawCanvas();
  }
}

// Opens the colour picker for the selected pad or wire.
export function changeSelectedColor(){
  const target = SelectionState.dot ?? SelectionState.line;
  if (!target){
    return;
  }
  const colorPicker = Utils.getSafeHtmlElement<HTMLInputElement>('colorPicker');
  colorPicker.value = Utils.normalizeColor(target.color, "#a4a0a0");
  colorPicker.oninput = colorPicker.onchange = function() {
    target.color = colorPicker.value;
    redrawCanvas();
  };
  colorPicker.click();
}
