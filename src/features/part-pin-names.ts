import {redrawCanvas} from "./draw-canvas";
import {HistoryState} from "../state/HistoryState";
import {PlacedAdvancedComponent} from "./advanced-components/placed-advanced-component";
import {advancedDefinitionFor, catalogDefinitionFor} from "../parts/custom-parts";
import {advancedPinOffsets} from "../parts/part-geometry";
import {pinNameOverrides, PinNames} from "../parts/pin-names";
import type {Part} from "../interfaces/placed-part.interface";

// A fixed-pin part's own pin names: a JST connector whose pins carry +5V and GND, a header whose
// pins are RS and EN. Only the placed part is renamed (SavedAdvancedComponent.pinDescription), so
// the catalog entry and every other copy of the part keep the names they had.

// The names `part`'s pins currently go by, one per pin in pin order, as the Pin Names dialog edits
// them: a named pin's name, else the definition's own ("1", "COM", "" for one it numbers).
export function partPinNames(part: Part): string[] | undefined {
  if (part.kind !== "advanced-component") return undefined;
  const def = part.getDefinition();
  if (!def) return undefined;
  return advancedPinOffsets(def, part.rows, part.cols).map((_, i) => def.pinLabels?.[i] ?? "");
}

// Sets `part`'s own pin names from one name per pin, as one undoable step. Names left as the
// definition has them aren't stored, and a part with nothing renamed keeps no names at all.
export function setPartPinNames(part: Part, names: readonly string[]) {
  if (part.kind !== "advanced-component") return;
  // Compared with the catalog's own names, never the ones this part has now, so a name typed back
  // to what the part is called by default stops being an override.
  const def = catalogDefinitionFor(part);
  if (!def) return;
  const to = pinNameOverrides(def, names);
  const from = part.pinDescription;
  if (JSON.stringify(to) === JSON.stringify(from)) return;
  applyNames(part, to);
  HistoryState.record({type: "set", kind: "pin-names", part, from, to});
  redrawCanvas();
}

function applyNames(part: PlacedAdvancedComponent, names: PinNames | undefined) {
  if (names) part.pinDescription = names;
  else delete part.pinDescription;
}

// Whether `part` can have its pins renamed: a fixed-pin part whose definition this build knows.
export function canRenamePins(part: Part): part is PlacedAdvancedComponent {
  return part.kind === "advanced-component" && !!advancedDefinitionFor(part);
}