import {RouteTool, ToolState} from "../state/ToolState";
import {SelectionState} from "../state/SelectionState";
import {Utils} from "../utils/utils";
import {setActiveTool} from "./active-tool";
import {redrawCanvas} from "./draw-canvas";
import {pickColor} from "./pick-color";

// The wire tool and the solder path tool, and how wires look: the colour and thickness new wires
// get, and the selected wire's.

// Arms the wire (or solder path) tool, or drops it back to Select when it's armed already.
export function toggleRouteTool(kind: RouteTool["kind"]) {
  setActiveTool(ToolState.active.kind === kind ? {kind: "select"} : {kind});
}

// The colour new wires get; the selected wire takes it too, unless `applyToSelection` is false (a
// colour still being picked). A solder path has no colour to set.
export function setWireColor(color: string, applyToSelection = true) {
  ToolState.activeWireColor = color;
  const line = SelectionState.line;
  if (applyToSelection && line && line.kind !== "solder") line.color = color;
  redrawCanvas();
}

// The thickness new wires get; the selected wire takes it too. A solder path has no thickness.
export function setWireWidth(width: number) {
  ToolState.selectedWireWidth = width;
  const line = SelectionState.line;
  if (line && line.kind !== "solder") line.width = width;
  redrawCanvas();
}

// Opens the browser's colour picker for the selected wire (a solder path has no colour).
export function changeSelectedColor() {
  const line = SelectionState.line;
  if (!line || line.kind === "solder") return;
  pickColor(Utils.normalizeColor(line.color, "#a4a0a0"), color => {
    line.color = color;
    redrawCanvas();
  });
}
