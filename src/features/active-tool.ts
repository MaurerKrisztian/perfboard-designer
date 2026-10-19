import {ActiveTool, ToolState} from "../state/ToolState";
import {redrawCanvas} from "./draw-canvas";
import {updateSelectionStatus} from "./selection-status";

const toolListeners: (() => void)[] = [];

// Runs `listener` whenever a tool is picked (the solder side view turns itself off then).
export function onToolPicked(listener: () => void) {
  toolListeners.push(listener);
}

// Switches what a click on the board does: a toolbar mode, or a placement tool (replacing any
// other). The toolbar and catalog highlights follow (updateSelectionStatus keeps them in sync).
export function setActiveTool(tool: ActiveTool) {
  ToolState.active = tool;
  for (const listener of toolListeners) listener();
  updateSelectionStatus();
  redrawCanvas();
}
