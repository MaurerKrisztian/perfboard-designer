import {
  ADVANCED_COMPONENT_DEFINITIONS, AdvancedComponentDefinition, getAdvancedComponentDefinition, PinOffset,
} from "./advanced-component-definitions";
import {getIconFile} from "./component-definitions";

// User-made parts with pins anywhere: a breakout module, a sensor board, a connector with an odd
// layout. Made in the editor's custom module creator, kept in its catalog, and carried whole by
// each placed one (SavedAdvancedComponent.custom), so a board with one draws and connects the same
// anywhere. Placed and drawn as a fixed-pin part: the spec becomes an AdvancedComponentDefinition.
//
// A custom part can instead take a built-in part's package (`shape`): a BC337 or an IRLZ44N missing
// from the catalog is a TO-92 or a TO-220 with its own name and pin names. It's drawn, placed and
// modelled in 3D as that package.

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
  // Letters of a placed one's reference designator (default CUSTOM_REF_PREFIX, or the shape's).
  refPrefix?: string;
  // The body's size in holes.
  cols: number;
  rows: number;
  // In pin order, pin 1 first; each in a different hole of the body.
  pins: CustomPartPin[];
  // The body's fill, a CSS colour; absent: the default dark body. Not used with a shape.
  color?: string;
  // The built-in fixed-pin part whose package this is, by its id ("transistor" is a TO-92): its
  // pins' layout, body, artwork and 3D model, with this part's name, ref letters and pin names.
  // `cols`, `rows` and the pins' holes are then the package's (shapedPartSpec), so a reader that
  // doesn't know the shape still has the same pins, and draws it as a plain module.
  shape?: string;
}

export const CUSTOM_REF_PREFIX = "M";
export const MAX_CUSTOM_PART_SIDE = 40;
// The body reaches this far past its outermost holes (grid units), as a module's board does.
const BODY_MARGIN = 0.45;

// Whether a built-in fixed-pin part's package can be a custom part's shape: all but the ones
// sized when placed (header pins), whose pins aren't fixed.
function isShapeable(def: AdvancedComponentDefinition): boolean {
  return !def.gridSizable && !def.perPinIcon;
}

// The packages a custom part can take, in catalog order.
export const CUSTOM_PART_SHAPES: readonly AdvancedComponentDefinition[] = ADVANCED_COMPONENT_DEFINITIONS.filter(isShapeable);

// The built-in part a shape id names, if this build has it and it can be a shape.
export function customPartShape(id: string | undefined): AdvancedComponentDefinition | undefined {
  const def = id ? getAdvancedComponentDefinition(id) : undefined;
  return def && isShapeable(def) ? def : undefined;
}

// A package's holes as a custom part's body: the box round its pins and covered holes, and each
// pin's [column, row] within it, in pin order.
export function shapeHoles(shape: AdvancedComponentDefinition): {cols: number; rows: number; pins: [number, number][]} {
  const holes = [...shape.pinOffsets, ...(shape.shadedOffsets ?? [])];
  const left = Math.min(...holes.map(h => h.dx)), top = Math.min(...holes.map(h => h.dy));
  const right = Math.max(...holes.map(h => h.dx)), bottom = Math.max(...holes.map(h => h.dy));
  return {
    cols: right - left + 1, rows: bottom - top + 1,
    pins: shape.pinOffsets.map(pin => [pin.dx - left, pin.dy - top]),
  };
}

// A custom part with `shape`'s package and these pin names (in pin order; a blank one is drawn
// with its number): its size and pins' holes are the package's.
export function shapedPartSpec(
  shape: AdvancedComponentDefinition,
  fields: {id?: string; name: string; refPrefix?: string; labels: readonly string[]},
): CustomPartSpec {
  const {cols, rows, pins} = shapeHoles(shape);
  return {
    ...(fields.id ? {id: fields.id} : {}),
    name: fields.name,
    ...(fields.refPrefix ? {refPrefix: fields.refPrefix} : {}),
    cols, rows,
    pins: pins.map((at, i) => {
      const label = fields.labels[i]?.trim();
      return {at, ...(label ? {label} : {})};
    }),
    shape: shape.id,
  };
}

const definitions = new WeakMap<CustomPartSpec, AdvancedComponentDefinition>();

// The spec as a fixed-pin part definition: its shape's, renamed, or one of its own.
export function customPartDefinition(spec: CustomPartSpec): AdvancedComponentDefinition {
  const cached = definitions.get(spec);
  if (cached) return cached;
  const shape = customPartShape(spec.shape);
  const definition = shape ? shapedDefinition(spec, shape) : moduleDefinition(spec);
  definitions.set(spec, definition);
  return definition;
}

// The package's definition with this part's name, ref letters and pin names: listed, drawn and
// modelled as that package.
function shapedDefinition(spec: CustomPartSpec, shape: AdvancedComponentDefinition): AdvancedComponentDefinition {
  return {
    ...shape,
    id: CUSTOM_PART_ID,
    name: spec.name,
    keywords: undefined,
    refPrefix: spec.refPrefix || shape.refPrefix,
    // The package's artwork, which the shape names by its own id.
    iconFile: getIconFile(shape),
    pinLabels: shape.pinOffsets.map((_, i) => spec.pins[i]?.label?.trim() ?? ""),
  };
}

// Pins relative to pin 1 (the anchor it's placed by), the body's other holes covered, and its
// outline round the whole body.
function moduleDefinition(spec: CustomPartSpec): AdvancedComponentDefinition {
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
  return {
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
}

// A placed fixed-pin part's definition: its own spec when it's a custom part, else the catalog's.
export function advancedDefinitionFor(part: {definitionId: string; custom?: CustomPartSpec}): AdvancedComponentDefinition | undefined {
  return part.custom ? customPartDefinition(part.custom) : getAdvancedComponentDefinition(part.definitionId);
}

// What a placed fixed-pin part is modelled as: its shape's id for a shaped custom part, else its
// definitionId (the 3D viewer builds each package by id).
export function modelIdFor(part: {definitionId: string; custom?: CustomPartSpec}): string {
  return part.custom ? customPartShape(part.custom.shape)?.id ?? CUSTOM_PART_ID : part.definitionId;
}
