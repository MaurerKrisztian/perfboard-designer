import {AdvancedComponentDefinition, getAdvancedComponentDefinition, PinOffset} from "./advanced-component-definitions";

// User-made parts with pins anywhere: a breakout module, a sensor board, a connector with an odd
// layout. Made in the editor's custom module creator, kept in its catalog, and carried whole by
// each placed one (SavedAdvancedComponent.custom), so a board with one draws and connects the same
// anywhere. Placed and drawn as a fixed-pin part: the spec becomes an AdvancedComponentDefinition.

// What a placed fixed-pin part names as its definition when it's a custom part.
export const CUSTOM_PART_ID = "custom";

export interface CustomPartPin {
  // [column, row] within the body, from its top-left hole.
  at: [number, number];
  label?: string;
}

export interface CustomPartSpec {
  // Its catalog entry, so the same part placed twice is one entry (and an edit finds it).
  id?: string;
  name: string;
  // Letters of a placed one's reference designator (default CUSTOM_REF_PREFIX).
  refPrefix?: string;
  // The body's size in holes.
  cols: number;
  rows: number;
  // In pin order, pin 1 first; each in a different hole of the body.
  pins: CustomPartPin[];
  // The body's fill, a CSS colour; absent: the default dark body.
  color?: string;
}

export const CUSTOM_REF_PREFIX = "M";
export const MAX_CUSTOM_PART_SIDE = 40;
// The body reaches this far past its outermost holes (grid units), as a module's board does.
const BODY_MARGIN = 0.45;

const definitions = new WeakMap<CustomPartSpec, AdvancedComponentDefinition>();

// The spec as a fixed-pin part definition: pins relative to pin 1 (the anchor it's placed by), the
// body's other holes covered, and its outline round the whole body.
export function customPartDefinition(spec: CustomPartSpec): AdvancedComponentDefinition {
  const cached = definitions.get(spec);
  if (cached) return cached;
  const [ax, ay] = spec.pins[0]?.at ?? [0, 0];
  const offset = ([col, row]: readonly [number, number]): PinOffset => ({dx: col - ax, dy: row - ay});
  const pinHoles = new Set(spec.pins.map(pin => `${pin.at[0]},${pin.at[1]}`));
  const covered: PinOffset[] = [];
  for (let row = 0; row < spec.rows; row++) {
    for (let col = 0; col < spec.cols; col++) {
      if (!pinHoles.has(`${col},${row}`)) covered.push(offset([col, row]));
    }
  }
  const left = -ax - BODY_MARGIN, top = -ay - BODY_MARGIN;
  const right = spec.cols - 1 - ax + BODY_MARGIN, bottom = spec.rows - 1 - ay + BODY_MARGIN;
  const definition: AdvancedComponentDefinition = {
    id: CUSTOM_PART_ID,
    category: "modules.custom",
    name: spec.name,
    refPrefix: spec.refPrefix || CUSTOM_REF_PREFIX,
    fallbackLabel: spec.name,
    pinOffsets: spec.pins.map(pin => offset(pin.at)),
    // A pin without a label is drawn with its number, and names no net.
    pinLabels: spec.pins.map(pin => pin.label?.trim() ?? ""),
    shadedOffsets: covered,
    bodyOutline: [{dx: left, dy: top}, {dx: right, dy: top}, {dx: right, dy: bottom}, {dx: left, dy: bottom}],
    // Its name in the middle of the body.
    iconOffset: {dx: (spec.cols - 1) / 2 - ax, dy: (spec.rows - 1) / 2 - ay},
    noIcon: true,
    ...(spec.color ? {bodyColor: spec.color} : {}),
  };
  definitions.set(spec, definition);
  return definition;
}

// A placed fixed-pin part's definition: its own spec when it's a custom part, else the catalog's.
export function advancedDefinitionFor(part: {definitionId: string; custom?: CustomPartSpec}): AdvancedComponentDefinition | undefined {
  return part.custom ? customPartDefinition(part.custom) : getAdvancedComponentDefinition(part.definitionId);
}
