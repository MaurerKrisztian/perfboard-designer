import {AdvancedComponentDefinition} from "./advanced-component-definitions";
import {transposedPinNumber} from "./part-geometry";

// The names a placed part's pins go by, when its maker has named them: "1": "+5V", "2": "GND", as
// SavedAdvancedComponent.pinDescription holds them. They replace the definition's own names (a JST
// connector's numbers, a regulator's IN/OUT), and name the nets those pins are on, exactly as a
// custom part's pin names do. A blank name puts a pin the definition names back to its number.
//
// Kept beside the definition rather than in it: the definition belongs to the catalog (or to a
// custom part's spec), and renaming one placed part must never rename the others.

export type PinNames = Record<number, string>;

// The longest a pin's name may be, as for a custom part's pins.
export const MAX_PIN_NAME_LENGTH = 24;

// `def`'s pin labels with `names` on top, one for each of the placed part's `pins`
// (advancedPinCount): a pin's own name wins, even a blank one. The definition's own labels when
// the part has no names.
export function pinLabelsWith(def: AdvancedComponentDefinition, names: PinNames | undefined, pins: number): string[] | undefined {
  if (!names || !Object.keys(names).length) return def.pinLabels;
  return Array.from({length: pins}, (_, i) => {
    const name = names[i + 1];
    return typeof name === "string" ? name : def.pinLabels?.[i] ?? "";
  });
}

// The names a placed part keeps (in its file and in the editor) of `names`: only for its pins (1
// to `pins`), each trimmed to at most MAX_PIN_NAME_LENGTH characters, and only where it isn't the
// name `def` (its definition without them, catalogDefinitionFor) gives the pin, so a name typed
// back to the catalog's stops being one. A blank name is kept where `def` names the pin: the pin
// is then shown by its number. Without `def` (a part this build doesn't know) they're only
// trimmed, kept for a build that knows it. Undefined when none is left.
export function keptPinNames(
  names: Readonly<Record<string, unknown>> | undefined, def: AdvancedComponentDefinition | undefined, pins: number,
): PinNames | undefined {
  const kept: PinNames = {};
  for (const [key, value] of Object.entries(names ?? {})) {
    const pin = Number(key);
    if (!Number.isInteger(pin) || pin < 1 || pin > pins || typeof value !== "string") continue;
    const name = value.trim().slice(0, MAX_PIN_NAME_LENGTH);
    if (def && name === (def.pinLabels?.[pin - 1] ?? "")) continue;
    kept[pin] = name;
  }
  return Object.keys(kept).length ? kept : undefined;
}

// `names` once their rows × cols pin block is transposed, as the editor turns one: each name moves
// with its pin to the pin's new number.
export function transposedPinNames(names: PinNames, rows: number, cols: number): PinNames {
  return Object.fromEntries(Object.entries(names).map(([pin, name]) => [transposedPinNumber(Number(pin), rows, cols), name]));
}
