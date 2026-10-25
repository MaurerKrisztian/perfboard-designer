import {IDot} from "../../interfaces/dot.interface";
import {GridPos, toGridPos} from "../../project-file/grid";
import {pinName} from "../../project-file/nets";
import {partPins} from "../../project-file/pin-positions";
import {
  createRequirements, includeRequiredComponents, RequiredPin, requiredPinKey, requirementPinName, setRequiredNet,
} from "../../project-file/requirements";
import {HistoryState} from "../../state/HistoryState";
import {PartState} from "../../state/PartState";
import {RequirementsState} from "../../state/RequirementsState";
import {ActiveTool, PickedPin, ToolState} from "../../state/ToolState";
import {getSaveJson} from "../project/save-project";
import {ToolBehavior} from "./tool";

// Picks a required net's pins by clicking them on the board (armed from the Nets panel's Required
// connections): a click adds the pin in that hole, a click on a picked one takes it out, Enter
// saves the net as one undoable step and Escape drops it. The picked pins light up on the board
// (editor-view.ts) and are listed in the panel and the bar over the board while it's armed.

export type RequiredNetTool = Extract<ActiveTool, {kind: "required-net"}>;

const PREVIEW_RADIUS = 16;
const ADD_COLOR = "#e879f9";
const REMOVE_COLOR = "#f87171";

// The placed parts as project-file entries, for the shared pin geometry.
function boardInventory() {
  const parts = PartState.parts;
  return {
    placedIcs: parts.flatMap(part => part.kind === "ic" ? [part.serialize()] : []),
    placedStandardComponents: parts.flatMap(part => part.kind === "standard-component" ? [part.serialize()] : []),
    placedAdvancedComponents: parts.flatMap(part => part.kind === "advanced-component" ? [part.serialize()] : []),
  };
}

// Every pin on the board, as a required net names it, by `requiredPinKey`.
function boardPinsByKey(): Map<string, PickedPin & {at: GridPos}> {
  const inventory = boardInventory();
  const ids = new Map([...inventory.placedIcs, ...inventory.placedStandardComponents, ...inventory.placedAdvancedComponents]
    .map(entry => [entry.ref, entry.instanceId ?? entry.ref]));
  const pins = new Map<string, PickedPin & {at: GridPos}>();
  for (const part of partPins(inventory)) {
    for (const {pin, label, at} of part.pins) {
      const componentId = ids.get(part.ref) as string;
      const name = pinName({ref: part.ref, kind: part.kind, pin, ...(label ? {label} : {}), at});
      pins.set(requiredPinKey({componentId, pin}), {componentId, pin, name, at});
    }
  }
  return pins;
}

// The pin in this hole, if a part has one there.
export function requiredPinAt(dot: IDot): PickedPin | undefined {
  const [col, row] = toGridPos(dot);
  for (const pin of boardPinsByKey().values()) {
    if (pin.at[0] === col && pin.at[1] === row) return pin;
  }
  return undefined;
}

// A saved net's pins, ready to pick from: named and placed as the board has them now.
export function pickedPinsFor(pins: RequiredPin[]): PickedPin[] {
  const onBoard = boardPinsByKey();
  const project = getSaveJson();
  return pins.map(pin => onBoard.get(requiredPinKey(pin)) ?? {...pin, name: requirementPinName(project, pin)});
}

// Saves the picked pins as the net, recording it for undo. A new net of fewer than two pins saves
// nothing; an edited one left with fewer is deleted.
export function saveRequiredNet(tool: RequiredNetTool) {
  const pins = tool.picked.map(({componentId, pin}) => ({componentId, pin}));
  const before = RequirementsState.current;
  if (!before && pins.length < 2) return;
  const project = getSaveJson();
  const base = before ? includeRequiredComponents(before, project) : createRequirements(project);
  const next = setRequiredNet(base, tool.netId, pins);
  if (before && JSON.stringify(next) === JSON.stringify(before)) return;
  RequirementsState.current = next;
  HistoryState.record({type: "set", kind: "requirements", from: before, to: next});
}

const isPicked = (tool: RequiredNetTool, pin: RequiredPin) =>
  tool.picked.some(item => requiredPinKey(item) === requiredPinKey(pin));

export const requiredNetTool: ToolBehavior<RequiredNetTool> = {
  onPointerDown(tool, {hoverDot}) {
    // Swallows every click, so one beside a pin never selects or moves a part instead.
    const pin = hoverDot && requiredPinAt(hoverDot);
    if (!pin) return true;
    const picked = isPicked(tool, pin)
      ? tool.picked.filter(item => requiredPinKey(item) !== requiredPinKey(pin))
      : [...tool.picked, pin];
    ToolState.active = {...tool, picked};
    return true;
  },

  drawPreview(tool, hoverDot, painter) {
    const pin = requiredPinAt(hoverDot);
    if (!pin) return;
    const remove = isPicked(tool, pin);
    const color = remove ? REMOVE_COLOR : ADD_COLOR;
    painter.circle(hoverDot.x, hoverDot.y, PREVIEW_RADIUS, {stroke: {paint: color, width: 2, dash: [4, 3]}});
    painter.text(`${remove ? "−" : "+"} ${pin.name}`, hoverDot.x, hoverDot.y - PREVIEW_RADIUS - 6, {
      font: {family: "sans", size: 11, weight: 700}, color, align: "center",
    });
  },

  statusText(tool) {
    const count = tool.picked.length;
    const what = tool.netId ? "Editing required net" : "New required net";
    return `${what}: ${count} pin${count === 1 ? "" : "s"} [Click the pins it joins • Click one again to take it out • Enter to save • Esc to cancel]`;
  },

  // Enter saves the net and goes back to Select. (No stepBack: Escape drops the tool, and the
  // picked pins with it.)
  finish(tool) {
    saveRequiredNet(tool);
    ToolState.active = {kind: "select"};
    return true;
  },
};
