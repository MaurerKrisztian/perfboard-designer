import {redrawCanvas} from "./draw-canvas";
import {HistoryState} from "../state/HistoryState";
import {PartState} from "../state/PartState";
import {SelectionState} from "../state/SelectionState";
import type {Part} from "../interfaces/placed-part.interface";
import type {PlacedStandardComponent} from "./standard-components/placed-standard-component";

// Parts in the wrong way round: the Nets panel lists those the supply rails show to be backwards
// (src/project-file/polarity.ts, kept by board-nets.ts), and a polarized two-lead part turns round
// end to end, its leads swapping holes, as one undoable move.

// Whether turning it round changes anything: a two-lead part whose leads differ (an LED, a diode,
// an electrolytic capacitor).
export function canTurnRound(part: Part): part is PlacedStandardComponent {
  return part.kind === "standard-component" && !!part.getDefinition()?.leadLabels;
}

export function turnPartRound(part: PlacedStandardComponent) {
  const from = part.getAnchorDots();
  const to = [from[1], from[0]];
  part.setAnchorDots(to);
  HistoryState.record({type: "move", kind: "part", part, from, to});
  redrawCanvas();
}

export function turnSelectedPartRound() {
  const part = SelectionState.part;
  if (part && canTurnRound(part)) turnPartRound(part);
}

const partByRef = (ref: string) => PartState.parts.find(part => part.ref === ref);

// Selects the part a warning names, so it's in sight with what can be done to it.
export function selectPartByRef(ref: string) {
  const part = partByRef(ref);
  if (!part) return;
  SelectionState.select([part], []);
  redrawCanvas();
}

export function turnPartRoundByRef(ref: string) {
  const part = partByRef(ref);
  if (part && canTurnRound(part)) turnPartRound(part);
}
