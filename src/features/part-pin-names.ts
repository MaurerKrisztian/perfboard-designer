import {redrawCanvas} from "./draw-canvas";
import {HistoryState} from "../state/HistoryState";
import {PlacedAdvancedComponent} from "./advanced-components/placed-advanced-component";
import {catalogDefinitionFor} from "../parts/custom-parts";
import {advancedPinCount} from "../parts/part-geometry";
import {keptPinNames, PinNames} from "../parts/pin-names";
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
  return Array.from({length: advancedPinCount(def, part.rows, part.cols)}, (_, i) => def.pinLabels?.[i] ?? "");
}

// Sets `part`'s own pin names from one name per pin, as one undoable step. Names left as the
// definition has them aren't stored, and a part with nothing renamed keeps no names at all.
export function setPartPinNames(part: Part, names: readonly string[]) {
  if (part.kind !== "advanced-component") return;
  // Compared with the catalog's own names, never the ones this part has now, so a name typed back
  // to what the part is called by default stops being an override. Kept as a saved file keeps
  // them (keptPinNames), so what's set here is what the board has after it's saved and reopened.
  const def = catalogDefinitionFor(part);
  if (!def) return;
  const typed = Object.fromEntries(names.map((name, i) => [i + 1, name]));
  const to = keptPinNames(typed, def, advancedPinCount(def, part.rows, part.cols));
  const from = part.pinDescription;
  if (JSON.stringify(to) === JSON.stringify(from)) return;
  applyPinNames(part, to);
  HistoryState.record({type: "set", kind: "pin-names", part, from, to});
  redrawCanvas();
}

// Gives `part` these names, or none; undo and redo set them back the same way.
export function applyPinNames(part: PlacedAdvancedComponent, names: PinNames | undefined) {
  if (names) part.pinDescription = names;
  else delete part.pinDescription;
}

// Whether `part` can have its pins renamed: a fixed-pin part whose definition this build knows.
export function canRenamePins(part: Part): part is PlacedAdvancedComponent {
  return part.kind === "advanced-component" && !!catalogDefinitionFor(part);
}
