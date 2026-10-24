import {RouteTool, ToolState} from "../state/ToolState";
import {SelectionState} from "../state/SelectionState";
import {Utils} from "../utils/utils";
import {setActiveTool} from "./active-tool";
import {redrawCanvas} from "./draw-canvas";
import {pickColor} from "./pick-color";
import {HistoryState} from "../state/HistoryState";
import {LineState} from "../state/LineState";
import type {ILine} from "../interfaces/line.interface";
import type {WireSide} from "../project-file/project-file";

// The wire tool and the solder path tool, and how wires look: the colour and thickness new wires
// get, and the selected wire's.

// Arms the wire (or solder path) tool, or drops it back to Select when it's armed already.
export function toggleRouteTool(kind: RouteTool["kind"]) {
  setActiveTool(ToolState.active.kind === kind ? {kind: "select"} : {kind});
}

// The colour new wires get; the selected wires take it too, unless `applyToSelection` is false
// (a colour still being picked). A solder path has no colour to set.
export function setWireColor(color: string, applyToSelection = true) {
  ToolState.activeWireColor = color;
  if (applyToSelection) {
    for (const line of SelectionState.lines) if (line.kind !== "solder") line.color = color;
  }
  redrawCanvas();
}

// The thickness new wires get; the selected wires take it too. A solder path has no thickness.
export function setWireWidth(width: number) {
  ToolState.selectedWireWidth = width;
  for (const line of SelectionState.lines) if (line.kind !== "solder") line.width = width;
  redrawCanvas();
}

// Moves the selected jumper to the other face of the board (SavedWire.side): same route and
// colour, in its place in the drawing order. One undoable step. A solder path is always on the
// copper side, so it has no face to change.
export function moveSelectedWireToSide(side: WireSide) {
  const line = SelectionState.line;
  if (!line || line.kind === "solder" || (line.side === "bottom") === (side === "bottom")) return;
  const moved: ILine = {...line, side};
  if (side === "top") delete moved.side;
  LineState.lines[LineState.lines.indexOf(line)] = moved;
  HistoryState.record({type: "replace", kind: "line", removed: [line], added: [moved]});
  SelectionState.current = {kind: "line", line: moved};
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
