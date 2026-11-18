import {AdvancedComponentDefinition} from "./advanced-component-definitions";

// The names a placed part's pins go by, when its maker has named them: "1": "+5V", "2": "GND", as
// SavedAdvancedComponent.pinDescription holds them. They replace the definition's own names (a JST
// connector's numbers, a regulator's IN/OUT), and name the nets those pins are on, exactly as a
// custom part's pin names do. A blank name puts a numbered pin's number back.
//
// Kept beside the definition rather than in it: the definition belongs to the catalog (or to a
// custom part's spec), and renaming one placed part must never rename the others.

export type PinNames = Record<number, string>;

const MAX_NAME_LENGTH = 24;

// The pin numbers `names` names, in order, ignoring anything that isn't a pin number at all.
function namedPins(names: PinNames | undefined): (readonly [number, string])[] {
  return Object.entries(names ?? {})
    .map(([pin, label]) => [Number(pin), label] as const)
    .filter(([pin, label]) => Number.isInteger(pin) && pin >= 1 && typeof label === "string");
}

// `def`'s pin labels with `names` on top, in pin order: a pin's own name wins, even a blank one.
// Long enough for every named pin, so a pin block's later pins can be named too. The definition's
// own labels when it has none of its own to override.
export function pinLabelsWith(def: AdvancedComponentDefinition, names?: PinNames): string[] | undefined {
  const entries = namedPins(names);
  if (!entries.length) return def.pinLabels;
  const length = Math.max(def.pinOffsets.length, ...entries.map(([pin]) => pin));
  const labels = [...(def.pinLabels ?? [])];
  while (labels.length < length) labels.push("");
  for (const [pin, label] of entries) labels[pin - 1] = label;
  return labels;
}

// The names that make `def` (the definition as the catalog has it, without this part's own names)
// show `typed` (one per pin, in order), or undefined when they would all be the definition's own:
// only what differs is kept, so a part is named only where it's renamed.
export function pinNameOverrides(def: AdvancedComponentDefinition, typed: readonly string[]): PinNames | undefined {
  const names: PinNames = {};
  typed.forEach((text, i) => {
    const name = text.trim().slice(0, MAX_NAME_LENGTH);
    // A pin beyond the package's own pins stays whatever it was unless it's given a name.
    if (!name && i >= def.pinOffsets.length) return;
    if (name === (def.pinLabels?.[i] ?? "")) return;
    names[i + 1] = name;
  });
  return Object.keys(names).length ? names : undefined;
}