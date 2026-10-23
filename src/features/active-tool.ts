import {ActiveTool, ToolState} from "../state/ToolState";
import {redrawCanvas} from "./draw-canvas";

const toolListeners: (() => void)[] = [];

// Runs `listener` whenever a tool is picked (the solder side view turns itself off then).
export function onToolPicked(listener: () => void) {
  toolListeners.push(listener);
}

// Switches what a click on the board does: a toolbar mode, or a placement tool (replacing any
// other). The UI's highlights follow ToolState, so the redraw is all they need.
export function setActiveTool(tool: ActiveTool) {
  ToolState.active = tool;
  for (const listener of toolListeners) listener();
  redrawCanvas();
}
