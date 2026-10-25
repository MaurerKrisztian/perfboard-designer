import {askConfirm} from "./ask-dialog";
import {setActiveTool} from "./active-tool";
import {redrawCanvas} from "./draw-canvas";
import {cancelPlacement, finishActiveTool} from "./select";
import {getSaveJson} from "./project/save-project";
import {pickedPinsFor} from "./tools/required-net-tool";
import {CircuitRequirements, createRequirements, forgetRequiredComponent} from "../project-file/requirements";
import {HistoryState} from "../state/HistoryState";
import {RequirementsState} from "../state/RequirementsState";
import {SelectionState} from "../state/SelectionState";
import {ToolState} from "../state/ToolState";

// Editing the open project's required connections (its requirements' nets: which pins the circuit
// should join), as the Nets panel's Required connections does it. They're optional: a project has
// none until a net is added or the board's wiring is copied in. Every change is one undoable step,
// saved with the board. Picking a net's pins is the required-net tool (tools/required-net-tool.ts).

function change(next: CircuitRequirements | undefined) {
  const before = RequirementsState.current;
  if (next === before) return;
  RequirementsState.current = next;
  HistoryState.record({type: "set", kind: "requirements", from: before, to: next});
  redrawCanvas();
}

// Arms the tool to pick a new net's pins, or to change the net `netId`'s (its pins picked already).
export function pickRequiredNet(netId?: string) {
  const net = netId ? RequirementsState.current?.nets.find(n => n.id === netId) : undefined;
  SelectionState.clear();
  setActiveTool({kind: "required-net", ...(net ? {netId: net.id} : {}), picked: net ? pickedPinsFor(net.pins) : []});
}

// Saves the net being picked (as Enter does) or drops it (as Escape does).
export function saveRequiredNet() {
  if (ToolState.active.kind === "required-net") finishActiveTool();
}

export function cancelRequiredNet() {
  if (ToolState.active.kind === "required-net") cancelPlacement();
}

// Starts the required connections from the board's wiring as it is: every net it has now.
export function requireCurrentWiring() {
  change(createRequirements(getSaveJson(), true));
}

export function deleteRequiredNet(netId: string) {
  const current = RequirementsState.current;
  if (current) change({...current, nets: current.nets.filter(net => net.id !== netId)});
}

// Stops requiring a part that's no longer on the board, and its pins.
export function forgetRequiredPart(componentId: string) {
  const current = RequirementsState.current;
  if (current) change(forgetRequiredComponent(current, componentId));
}

export function setRequirementsChecking(on: boolean) {
  const current = RequirementsState.current;
  if (current && current.validate !== on) change({...current, validate: on});
}

// Drops the required connections altogether, after asking.
export async function removeRequirements() {
  if (!RequirementsState.current) return;
  if (!await askConfirm("Remove the required connections?", "The list of nets this board should have goes. The board itself stays as it is, and Undo brings the list back.", "Remove", true)) return;
  change(undefined);
}
