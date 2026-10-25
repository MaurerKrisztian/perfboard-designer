import {onRedraw, redrawCanvas} from "./draw-canvas";
import {getSaveJson} from "./project/save-project";
import {onProjectChange} from "./project/current-project";
import {computeNets, Net, NetPin} from "../project-file/nets";
import {GridPos} from "../project-file/grid";
import {ProjectFile, SavedWire} from "../project-file/project-file";
import {RequiredPin, requiredPinKey} from "../project-file/requirements";
import {NetHighlightState} from "../state/NetHighlightState";
import {ProjectState} from "../state/ProjectState";
import {highlightRequirements} from "./requirement-highlight";
import {notifyEditorChanged} from "./editor-events";

// The board's nets (which pins it connects), kept up to date as it changes, and the one lit up on
// the board. Worked out from the project file, the same snapshot autosave writes, by nets.ts, so
// they match what any program reading that file works out. The Nets panel (src/ui/nets/) shows
// them; picking a net, an unconnected pin or wires connecting no pins lights it up
// (NetHighlightState) until it's picked again, and the light follows the net as it's edited.

export interface BoardNets {
  project: ProjectFile;
  nets: Net[];
}

// Every change ends in a redraw, but so does hovering: refresh shortly after the first redraw of a
// stream, and only work the nets out again when the board changed.
const REFRESH_DELAY_MS = 100;
let pendingRefresh: number | undefined;
let lastJson: string | undefined;

let current: BoardNets | undefined;
// The net picked in the panel; undefined while nothing is, or the light shows requirements.
let picked: Net | undefined;

export const pinKey = (pin: NetPin) => `${pin.ref}.${pin.pin}`;
const hole = ([c, r]: GridPos) => `${c},${r}`;
const wireKey = (wire: SavedWire) => `${hole(wire.from)}-${hole(wire.to)}`;

export function boardNets(): BoardNets | undefined {
  return current;
}

export function pickedNet(): Net | undefined {
  return picked;
}

function setPicked(net: Net | undefined) {
  picked = net;
  const wires = current?.project.wires ?? [];
  NetHighlightState.current = net && {pins: net.pins.map(pinKey), holes: net.holes, wires: net.wires.map(i => wires[i])};
}

// Lights `net` up on the board, or puts its light out when it's lit already.
export function toggleNetHighlight(net: Net) {
  setPicked(net === picked ? undefined : net);
  redrawCanvas();
}

// Lights up the board nets that hold these pins (a requirements report's).
export function highlightRequiredPins(pins: RequiredPin[]) {
  if (!current) return;
  highlightRequirements(current.project, pins, current.nets);
  picked = undefined;
  redrawCanvas();
}

const pinsKey = (pins: RequiredPin[]) => pins.map(requiredPinKey).sort().join(" ");

// Which required pins are lit (a key for the set), if the light shows requirements.
export function litRequiredPins(): string | undefined {
  const pins = NetHighlightState.current?.requirements;
  return pins && pinsKey(pins);
}

// Lights up these required pins' board nets, or puts the light out when it shows them already.
export function toggleRequiredPins(pins: RequiredPin[]) {
  if (litRequiredPins() === pinsKey(pins)) {
    setPicked(undefined);
    redrawCanvas();
    return;
  }
  highlightRequiredPins(pins);
}

// After a change, the lit net is the one now holding most of its pins (none if they're all gone),
// or for wires that connected no pins, most of its wires.
function followHighlight() {
  if (!current) return;
  const {project, nets} = current;
  const previous = NetHighlightState.current;
  if (previous?.requirements) {
    picked = undefined;
    highlightRequirements(project, previous.requirements, nets);
    return;
  }
  const pins = new Set(previous?.pins ?? []);
  const wires = new Set(previous?.wires.map(wireKey) ?? []);
  const sharedWith = pins.size
    ? (net: Net) => net.pins.filter(pin => pins.has(pinKey(pin))).length
    : (net: Net) => net.wires.filter(i => wires.has(wireKey(project.wires[i]))).length;
  let best: Net | undefined;
  let bestShared = 0;
  for (const net of nets) {
    const shared = sharedWith(net);
    if (shared > bestShared) [best, bestShared] = [net, shared];
  }
  setPicked(best);
}

function refresh() {
  pendingRefresh = undefined;
  const snapshot = getSaveJson();
  const json = JSON.stringify(snapshot);
  if (json === lastJson) return;
  lastJson = json;
  current = {project: snapshot, nets: computeNets(snapshot).nets};
  if (NetHighlightState.current) {
    followHighlight();
    // The board was drawn with the net as it was before the change.
    redrawCanvas();
  } else {
    notifyEditorChanged();
  }
}

// At startup: keeps the nets in step with the board from then on.
export function trackBoardNets() {
  onRedraw(() => {
    if (pendingRefresh === undefined) pendingRefresh = window.setTimeout(refresh, REFRESH_DELAY_MS);
  });
  // Another project's pins may share the old one's names; don't carry the light over (a rename
  // keeps it).
  let openProjectId = ProjectState.current?.id;
  onProjectChange(() => {
    const changed = ProjectState.current?.id !== openProjectId;
    openProjectId = ProjectState.current?.id;
    if (!changed || !NetHighlightState.current) return;
    setPicked(undefined);
    redrawCanvas();
  });
}
