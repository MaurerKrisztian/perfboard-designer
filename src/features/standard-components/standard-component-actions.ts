import {redrawCanvas} from "../draw-canvas";
import {ComponentUnit, isLed} from "../../parts/component-definitions";
import {formatComponentValue, parseComponentValue} from "../../parts/component-value";
import {SelectionState} from "../../state/SelectionState";
import {askText} from "../ask-dialog";

const VALUE_EXAMPLES: Record<ComponentUnit, string> = {
  "Ω": "e.g. 220, 4.7k, 1M",
  "F": "e.g. 100pF, 10uF, 0.1uF",
  "H": "e.g. 100nH, 10uH, 1mH",
};

// One-tap values offered under the box: the ones most hobby boards use.
const COMMON_VALUES: Record<ComponentUnit, string[]> = {
  "Ω": ["100Ω", "220Ω", "330Ω", "470Ω", "1kΩ", "4.7kΩ", "10kΩ", "47kΩ", "100kΩ", "1MΩ"],
  "F": ["22pF", "100pF", "10nF", "100nF", "1µF", "10µF", "100µF", "470µF"],
  "H": ["10µH", "100µH", "1mH", "10mH"],
};

export const LED_COLORS = ["red", "green", "blue", "yellow", "rgb"] as const;
export type LedColor = typeof LED_COLORS[number];
const LED_COLOR_LABELS: Record<LedColor, string> = {
  red: "Red", green: "Green", blue: "Blue", yellow: "Yellow", rgb: "RGB"
};

export function setSelectedLedColor(color: LedColor | undefined) {
  const component = SelectionState.part;
  if (component?.kind !== "standard-component" || !isLed(component.definitionId)) return;
  component.color = color;
  component.value = color ? LED_COLOR_LABELS[color] : undefined;
  redrawCanvas();
}

// Asks for the selected part's value; an empty answer clears it. A part with a unit only takes a
// value that reads as one (stored formatted, e.g. "4.7kΩ"), unless its definition allows free text.
export async function setSelectedComponentValue() {
  const selected = SelectionState.part;
  const component = selected?.kind === "ic" ? undefined : selected;
  if (!component) return;

  const definition = component.getDefinition();
  const unit = definition?.unit;
  const name = definition?.name ?? "part";
  const title = `${component.ref} ${name} value`;
  if (!unit) {
    const value = await askText({title, value: component.value || "", placeholder: "e.g. 220Ω, 10µF, 5V"});
    if (value !== null) {
      component.value = value.trim() ? value.trim() : undefined;
      redrawCanvas();
    }
    return;
  }

  const freeForm = !!definition && "freeFormValue" in definition && !!definition.freeFormValue;
  const value = await askText({
    title,
    value: component.value || "",
    placeholder: freeForm ? `${VALUE_EXAMPLES[unit]}, B10K` : VALUE_EXAMPLES[unit],
    suggestions: COMMON_VALUES[unit],
    check: (text) => !text.trim() || freeForm || parseComponentValue(text, unit) !== undefined
      ? undefined
      : `Couldn't read "${text.trim()}" as a value. Try a format like ${VALUE_EXAMPLES[unit].replace("e.g. ", "")}.`,
  });
  if (value === null) return;
  const parsed = parseComponentValue(value, unit);
  component.value = !value.trim() ? undefined : parsed !== undefined ? formatComponentValue(parsed, unit) : value.trim();
  redrawCanvas();
}
