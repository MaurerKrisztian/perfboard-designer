import {COMPONENT_ICON_DIR, ComponentUnit, getIconFile} from "./component-definitions";
import {CategoryId} from "./catalog-categories";

export interface PinOffset {
  dx: number;
  dy: number;
}

// Pin offsets are in grid units (multiples of GridConfig.dotSpace), relative to pins[0],
// which is always the anchor dot the component is placed on. Unlike the flexible-lead
// components, these pins are rigid: their spacing is fixed by the physical part, not
// chosen by the user, so placement only needs an anchor point + rotation.
export interface AdvancedComponentDefinition {
  id: string;
  // Where the part is listed in the Components panel tree (see catalog-categories.ts).
  category: CategoryId;
  name: string;
  // Extra search terms (abbreviations, part families) that don't appear in `name`.
  keywords?: string[];
  // Letters of a placed part's reference designator: "Q" makes Q1, Q2...
  refPrefix: string;
  // The artwork's file in COMPONENT_ICON_DIR, when it isn't named after the id ("<id>.svg").
  iconFile?: string;
  fallbackLabel: string;
  pinOffsets: PinOffset[];
  pinLabels?: string[];
  // Grid holes the body physically covers but that aren't real electrical pins (e.g. the
  // skipped holes of a full-size potentiometer's wider leg spacing). Drawn dimmed, never
  // returned by getPinPositions.
  shadedOffsets?: PinOffset[];
  // Closed polygon (grid units, unrotated) tracing the body's outline for parts whose
  // physical package isn't just a box around its pins. Rotates along with the pins.
  // Falls back to a padded rectangle around the pins when omitted.
  bodyOutline?: PinOffset[];
  // Where to center the icon/fallback label when bodyOutline makes the pin/shaded-hole
  // bounding box a poor stand-in for "the middle of the part" (e.g. a pot's wide flange).
  iconOffset?: PinOffset;
  iconSize?: number;
  // Overrides where the pin number labels sit relative to each pin (grid units, unrotated,
  // negative dy = above the pin row). Needed for parts whose body covers the default spot
  // just above the pin - the numbers get pushed clear of the body instead of onto it.
  pinLabelOffset?: PinOffset;
  // One spot per pin instead, for pins whose names have to read away from each other: a module's
  // two rows, each naming its pins inward.
  pinLabelOffsets?: PinOffset[];
  // Where to center the value label on the part itself (grid units, unrotated, relative to
  // pins[0]), for packages with a spot that reads like silkscreen (e.g. a MOSFET's black
  // body). Parts without it get their value label next to the body instead.
  valueLabelOffset?: PinOffset;
  unit?: ComponentUnit;
  // The value prompt still normalizes anything that parses as a `unit` quantity (so "10k"
  // becomes "10kΩ"), but keeps any other text as typed instead of rejecting it. For parts whose
  // real-world marking isn't a bare number, e.g. a pot's taper code ("B10K", "A100K").
  freeFormValue?: boolean;
  // When true, the icon is scaled to fill the full body box (rather than padded within it)
  // and, once it has loaded, the body's solid color fill is skipped entirely so only the
  // icon's own artwork is visible. Only sensible when bodyOutline's aspect ratio matches the
  // icon's own aspect ratio, otherwise the icon will over/undershoot the box on one axis.
  iconFillsBody?: boolean;
  // A power source, a battery holder: its "+" pin is the board's positive supply and its "−" pin
  // ground, which the polarity checks go by (src/project-file/rails.ts).
  powerSource?: boolean;
  // The part's pin count isn't fixed by the package: the user drags out a rows x cols block of
  // pins at placement time (header pins). pinOffsets then only holds the 1x1 default - the real
  // lattice lives on the placed instance's rows/cols.
  gridSizable?: boolean;
  // The icon is the artwork for a *single* pin, tiled once per pin at exactly one grid pitch,
  // rather than one image stretched across the whole body. Implies no body box, no pin markers
  // and no pin numbers - the tiles themselves are the part.
  perPinIcon?: boolean;
  // Drawn without artwork: the body in `bodyColor` (else the default dark box) with the part's
  // name on it. For user-made parts (custom-parts.ts), which have no icon file.
  noIcon?: boolean;
  bodyColor?: string;
}

// Half-extent (grid units) of one perPinIcon tile. At 0.5 a tile is exactly one grid pitch
// wide, so neighbouring pins butt together into a continuous strip with no seam.
export const PIN_TILE_HALF = 0.5;

export function getAdvancedIconPath(def: AdvancedComponentDefinition): string {
  return `${COMPONENT_ICON_DIR}${getIconFile(def)}`;
}

const INLINE_3_PINS: PinOffset[] = [{dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 2, dy: 0}];
// A TO-92's body sits over the middle pin only, with its outer legs splayed out to pins 1
// and 3, so the box has to span the whole pin row (plus a tenth of a hole either side, for
// the lead tips to land on the outer pin centers rather than stop short of them). The
// resulting 2.2 x 0.88 aspect ratio matches transistor.svg's viewBox, so iconFillsBody
// stretches the artwork without distorting it. The box is taller than the leads need so
// the (much larger) package artwork fits inside it at the icon's own proportions.
const TRANSISTOR_HALF_HEIGHT = 0.44;
const TRANSISTOR_OVERHANG = 0.1;
const TRANSISTOR_BODY_OUTLINE: PinOffset[] = [
  {dx: 0 - TRANSISTOR_OVERHANG, dy: -TRANSISTOR_HALF_HEIGHT},
  {dx: 2 + TRANSISTOR_OVERHANG, dy: -TRANSISTOR_HALF_HEIGHT},
  {dx: 2 + TRANSISTOR_OVERHANG, dy: TRANSISTOR_HALF_HEIGHT},
  {dx: 0 - TRANSISTOR_OVERHANG, dy: TRANSISTOR_HALF_HEIGHT},
];
// The package now reaches nearly the full half-height above the pin row, so the numbers
// have to clear it to sit on the board rather than on the artwork.
const TRANSISTOR_PIN_LABEL_OFFSET: PinOffset = {dx: 0, dy: -(TRANSISTOR_HALF_HEIGHT + 0.24)};
// Some parts (full-size potentiometers, MOSFETs) space their 3 legs one hole apart, so on
// the perfboard grid they land on holes 1/3/5 - holes 2/4 sit under the body but aren't
// connected to anything.
const WIDE_INLINE_3_PINS: PinOffset[] = [{dx: 0, dy: 0}, {dx: 2, dy: 0}, {dx: 4, dy: 0}];
const WIDE_INLINE_3_SHADED: PinOffset[] = [{dx: 1, dy: 0}, {dx: 3, dy: 0}];
// Body box centered on pins 1-3, stopping just shy of the holes either side of the outer
// pins so those stay fully visible, and no taller than the pin row needs - real TO-220
// MOSFETs read as long and thin, not square. The box's 3.9 x 0.92 aspect ratio matches
// mosfet.svg's viewBox, so iconFillsBody stretches the artwork without distorting it.
const MOSFET_HALF_HEIGHT = 0.46;
const MOSFET_OVERHANG = 0.95;
const MOSFET_BODY_OUTLINE: PinOffset[] = [
  {dx: 0 - MOSFET_OVERHANG, dy: -MOSFET_HALF_HEIGHT},
  {dx: 2 + MOSFET_OVERHANG, dy: -MOSFET_HALF_HEIGHT},
  {dx: 2 + MOSFET_OVERHANG, dy: MOSFET_HALF_HEIGHT},
  {dx: 0 - MOSFET_OVERHANG, dy: MOSFET_HALF_HEIGHT},
];
// The body reaches MOSFET_HALF_HEIGHT above the pin row, so the numbers have to clear that
// (plus a little breathing room) to sit on the board rather than on the package artwork.
const MOSFET_PIN_LABEL_OFFSET: PinOffset = {dx: 0, dy: -(MOSFET_HALF_HEIGHT + 0.24)};
// Middle of mosfet.svg's black plastic, between the metal tab's edge (viewBox y=17) and the
// bottom outline (y=40), out of a 46-tall viewBox mapped onto the body's height.
const MOSFET_VALUE_LABEL_OFFSET: PinOffset = {dx: 1, dy: ((17 + 40) / 2 - 23) / 46 * (MOSFET_HALF_HEIGHT * 2)};
// Physical footprint: a 5-hole-wide, 2-hole-tall flange (the pins sit on its bottom edge),
// with a narrower 3-hole-wide, 3-hole-long bushing/shaft tab hanging off its middle.
const POT_OUTLINE_PAD = 0.3;
const POT_BODY_OUTLINE: PinOffset[] = [
  {dx: 0 - POT_OUTLINE_PAD, dy: -1 - POT_OUTLINE_PAD},
  {dx: 4 + POT_OUTLINE_PAD, dy: -1 - POT_OUTLINE_PAD},
  {dx: 4 + POT_OUTLINE_PAD, dy: 0 + POT_OUTLINE_PAD},
  {dx: 3 + POT_OUTLINE_PAD, dy: 0 + POT_OUTLINE_PAD},
  {dx: 3 + POT_OUTLINE_PAD, dy: 2 + POT_OUTLINE_PAD},
  {dx: 1 - POT_OUTLINE_PAD, dy: 2 + POT_OUTLINE_PAD},
  {dx: 1 - POT_OUTLINE_PAD, dy: 0 + POT_OUTLINE_PAD},
  {dx: 0 - POT_OUTLINE_PAD, dy: 0 + POT_OUTLINE_PAD},
];

// Center of POT_BODY_OUTLINE's bounding box (x -0.3..4.3, y -1.3..2.3), which iconFillsBody
// stretches potentiometer.svg across. That box's 4.6 x 3.6 ratio matches the SVG's viewBox.
const POT_ICON_CENTER: PinOffset = {dx: 2, dy: 0.5};

function rectangularOutline(left: number, top: number, right: number, bottom: number): PinOffset[] {
  return [{dx: left, dy: top}, {dx: right, dy: top}, {dx: right, dy: bottom}, {dx: left, dy: bottom}];
}

const RGB_LED_PINS: PinOffset[] = [...INLINE_3_PINS, {dx: 3, dy: 0}];
const RGB_LED_OUTLINE = rectangularOutline(-0.2, -1.16, 3.2, 1.16);

// DIP switch: two rows 7.62 mm (3 holes) apart, numbered like a DIP IC - pins 1..n left to
// right along the bottom row, then n+1..2n right to left along the top - so switch k joins
// pin k and the pin straight above it. The ~9.9 mm housing covers both rows.
function dipSwitchPins(positions: number): PinOffset[] {
  const bottom = Array.from({length: positions}, (_, i) => ({dx: i, dy: 0}));
  const top = Array.from({length: positions}, (_, i) => ({dx: positions - 1 - i, dy: -3}));
  return [...bottom, ...top];
}
function dipSwitchOutline(positions: number): PinOffset[] {
  return rectangularOutline(-0.6, -3.47, positions - 0.4, 0.47);
}

// 0.56" single-digit display (Kingbright SA56-11 / SC56-11): rows 15.24 mm (6 holes) apart,
// each 1.905 mm in from the 12.5 × 19.05 mm body's edge. Pins 1-5 run left to right along the
// bottom, 6-10 right to left along the top; pins 3 and 8 are the common.
const SEVEN_SEGMENT_PINS: PinOffset[] = [
  {dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 2, dy: 0}, {dx: 3, dy: 0}, {dx: 4, dy: 0},
  {dx: 4, dy: -6}, {dx: 3, dy: -6}, {dx: 2, dy: -6}, {dx: 1, dy: -6}, {dx: 0, dy: -6},
];
const SEVEN_SEGMENT_OUTLINE = rectangularOutline(-0.46, -6.75, 4.46, 0.75);
function sevenSegmentLabels(common: string): string[] {
  return ["E", "D", common, "C", "DP", "B", "A", common, "F", "G"];
}

// 0.56" four-digit display (5641AS / 5641BS pinout): the same 15.24 mm row spacing as the
// single digit with six pins per row, centered under a 50.4 × 19 mm body. DG1-DG4 are the
// digits' common pins.
const FOUR_DIGIT_PINS: PinOffset[] = [
  ...Array.from({length: 6}, (_, i) => ({dx: i, dy: 0})),
  ...Array.from({length: 6}, (_, i) => ({dx: 5 - i, dy: -6})),
];
const FOUR_DIGIT_LABELS = ["E", "D", "DP", "C", "G", "DG4", "B", "DG3", "DG2", "F", "A", "DG1"];

// A single row of pins one hole apart.
function inlinePins(count: number): PinOffset[] {
  return Array.from({length: count}, (_, i) => ({dx: i, dy: 0}));
}

// Two rows of pins `across` holes apart, numbered like a DIP chip: down the left row, then back up
// the right.
function dualRowOffsets(across: number, perRow: number): PinOffset[] {
  return [
    ...Array.from({length: perRow}, (_, i) => ({dx: 0, dy: i})),
    ...Array.from({length: perRow}, (_, i) => ({dx: across, dy: perRow - 1 - i})),
  ];
}
function dualRowLabels(leftTopToBottom: string[], rightTopToBottom: string[]): string[] {
  return [...leftTopToBottom, ...[...rightTopToBottom].reverse()];
}

// A breakout module's board, as a box (grid units) round its first pin, which its artwork fills.
// Its holes aren't covered: a module stands on its header pins, so wires can run below it.
function moduleBoard(left: number, top: number, right: number, bottom: number): Pick<AdvancedComponentDefinition, "bodyOutline" | "iconOffset" | "iconFillsBody"> {
  return {
    bodyOutline: rectangularOutline(left, top, right, bottom),
    iconOffset: {dx: (left + right) / 2, dy: (top + bottom) / 2},
    iconFillsBody: true,
  };
}

// Where a module's pin names sit: on the board beside a header along its edge.
const LABEL_ABOVE_PINS: PinOffset = {dx: 0, dy: -0.62};
const LABEL_BELOW_PINS: PinOffset = {dx: 0, dy: 0.62};
// Each of two rows of pins naming its pins inward, over the board.
function dualRowLabelSpots(perRow: number, inset = 0.72): PinOffset[] {
  return [
    ...Array.from({length: perRow}, () => ({dx: inset, dy: 0})),
    ...Array.from({length: perRow}, () => ({dx: -inset, dy: 0})),
  ];
}
// A power module's pads, by which end of the board each is at: `left` of them name themselves inward.
function padLabelSpots(left: number, right: number): PinOffset[] {
  return [
    ...Array.from({length: left}, () => ({dx: 0.8, dy: 0})),
    ...Array.from({length: right}, () => ({dx: -0.8, dy: 0})),
  ];
}

export const ADVANCED_COMPONENT_DEFINITIONS: AdvancedComponentDefinition[] = [
  {
    id: "transistor", refPrefix: "Q", category: "semiconductors.transistors", name: "Transistor (TO-92)", fallbackLabel: "Q",
    keywords: ["bjt", "npn", "pnp", "to-92", "2n2222", "bc547"],
    pinOffsets: INLINE_3_PINS,
    bodyOutline: TRANSISTOR_BODY_OUTLINE, iconFillsBody: true,
    pinLabelOffset: TRANSISTOR_PIN_LABEL_OFFSET
  },
  {
    id: "mosfet", refPrefix: "Q", category: "semiconductors.transistors", name: "MOSFET (TO-220)", fallbackLabel: "MOS",
    keywords: ["fet", "to-220", "irf"],
    pinOffsets: INLINE_3_PINS,
    bodyOutline: MOSFET_BODY_OUTLINE, iconFillsBody: true,
    pinLabelOffset: MOSFET_PIN_LABEL_OFFSET, valueLabelOffset: MOSFET_VALUE_LABEL_OFFSET
  },
  {
    id: "potentiometer", refPrefix: "RV", category: "passives.resistors", name: "Potentiometer", fallbackLabel: "POT",
    keywords: ["pot", "variable resistor", "trimmer", "knob"],
    pinOffsets: WIDE_INLINE_3_PINS, shadedOffsets: WIDE_INLINE_3_SHADED, bodyOutline: POT_BODY_OUTLINE,
    iconOffset: POT_ICON_CENTER, iconFillsBody: true, unit: "Ω", freeFormValue: true
  },
  {
    id: "header-pins", refPrefix: "J", category: "connectors", name: "Header Pins", fallbackLabel: "HDR",
    keywords: ["header", "pin header", "jumper", "dupont"],
    // Only the 1x1 default lives here - the real lattice is the placed instance's rows/cols.
    pinOffsets: [{dx: 0, dy: 0}],
    gridSizable: true, perPinIcon: true
  },
  {
    id: "screw-terminal-2", refPrefix: "J", category: "connectors", name: "Screw Terminal (2-pin, 5.08 mm)", fallbackLabel: "TB2",
    keywords: ["terminal block", "power input", "connector", "wire"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 2, dy: 0}],
    bodyOutline: rectangularOutline(-1, -1.6, 3, 1.6), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -1.9}
  },
  {
    id: "screw-terminal-3", refPrefix: "J", category: "connectors", name: "Screw Terminal (3-pin, 5.08 mm)", fallbackLabel: "TB3",
    keywords: ["terminal block", "power input", "connector", "wire"],
    pinOffsets: WIDE_INLINE_3_PINS,
    bodyOutline: rectangularOutline(-1, -1.6, 5, 1.6), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -1.9}
  },
  {
    id: "push-button", refPrefix: "SW", category: "switches", name: "Push Button (KSA, 7.62 × 5.08 mm)", fallbackLabel: "BTN",
    keywords: ["tactile", "momentary", "normally open", "spst", "ksa0m"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 3, dy: 0}, {dx: 3, dy: 2}, {dx: 0, dy: 2}],
    bodyOutline: rectangularOutline(-0.27, -0.5, 3.27, 2.5), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -0.8}
  },
  {
    id: "slide-switch", refPrefix: "SW", category: "switches", name: "Slide Switch (SPDT, formed 2.54 mm)", fallbackLabel: "SPDT",
    keywords: ["on on", "selector", "js102011cqn", "switch"],
    pinOffsets: INLINE_3_PINS, pinLabels: ["1", "COM", "3"],
    bodyOutline: rectangularOutline(-0.67, -0.69, 2.67, 0.69), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -1}
  },
  {
    id: "regulator-7805", refPrefix: "U", category: "ics.power", name: "7805 Voltage Regulator (TO-220)", fallbackLabel: "7805",
    keywords: ["lm7805", "lm340", "5v", "linear", "power supply"],
    iconFile: "mosfet.svg",
    pinOffsets: INLINE_3_PINS, pinLabels: ["IN", "GND", "OUT"],
    bodyOutline: MOSFET_BODY_OUTLINE, iconFillsBody: true,
    pinLabelOffset: MOSFET_PIN_LABEL_OFFSET, valueLabelOffset: MOSFET_VALUE_LABEL_OFFSET
  },
  {
    id: "regulator-lm317", refPrefix: "U", category: "ics.power", name: "LM317 Adjustable Regulator (TO-220)", fallbackLabel: "LM317",
    keywords: ["voltage regulator", "linear", "power supply", "adjustable"],
    iconFile: "mosfet.svg",
    pinOffsets: INLINE_3_PINS, pinLabels: ["ADJ", "OUT", "IN"],
    bodyOutline: MOSFET_BODY_OUTLINE, iconFillsBody: true,
    pinLabelOffset: MOSFET_PIN_LABEL_OFFSET, valueLabelOffset: MOSFET_VALUE_LABEL_OFFSET
  },
  {
    id: "trimmer", refPrefix: "RV", category: "passives.resistors", name: "Trimmer Potentiometer (3296W)", fallbackLabel: "TRIM",
    keywords: ["trimpot", "preset", "multiturn", "variable resistor", "adjustment"],
    pinOffsets: INLINE_3_PINS, pinLabels: ["CCW", "W", "CW"],
    bodyOutline: rectangularOutline(-0.88, -0.95, 2.88, 0.95), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -1.25}, unit: "Ω", freeFormValue: true
  },
  {
    id: "female-header", refPrefix: "J", category: "connectors", name: "Female Header (2.54 mm)", fallbackLabel: "SOCK",
    keywords: ["socket", "female pins", "receptacle", "dupont", "module"],
    pinOffsets: [{dx: 0, dy: 0}], gridSizable: true, perPinIcon: true
  },
  {
    id: "jumper-cap", refPrefix: "JP", category: "connectors", name: "Jumper Cap (2.54 mm)", fallbackLabel: "JP",
    keywords: ["shunt", "bridge", "jumper", "header"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 1, dy: 0}],
    bodyOutline: rectangularOutline(-0.5, -0.5, 1.5, 0.5), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -0.8}
  },
  {
    id: "buzzer", refPrefix: "BZ", category: "outputs", name: "Buzzer (12 mm, formed 5.08 mm)", fallbackLabel: "BZ",
    keywords: ["audio", "sound", "alarm", "magnetic", "transducer", "cem-1206s"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 2, dy: 0}], pinLabels: ["+", "−"],
    bodyOutline: rectangularOutline(-1.36, -2.36, 3.36, 2.36), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -2.65}
  },
  {
    id: "relay-dpdt", refPrefix: "K", category: "outputs", name: "Relay (G5V-2, DPDT)", fallbackLabel: "RELAY",
    keywords: ["coil", "signal", "normally open", "normally closed", "omron"],
    pinOffsets: [
      {dx: 0, dy: 0}, {dx: 3, dy: 0}, {dx: 5, dy: 0}, {dx: 7, dy: 0},
      {dx: 7, dy: -3}, {dx: 5, dy: -3}, {dx: 3, dy: -3}, {dx: 0, dy: -3}
    ],
    pinLabels: ["1 COIL", "4 COM", "6 NC", "8 NO", "9 NO", "11 NC", "13 COM", "16 COIL"],
    bodyOutline: rectangularOutline(-0.535, -3.488, 7.535, 0.488),
    iconOffset: {dx: 3.5, dy: -1.5}, iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -0.8}
  },
  {
    id: "rgb-led-cathode", refPrefix: "D", category: "semiconductors.diodes", name: "RGB LED (Common Cathode, formed 2.54 mm)", fallbackLabel: "RGB−",
    keywords: ["light", "red green blue", "5mm", "indicator", "cc"],
    iconFile: "rgb-led.svg",
    pinOffsets: RGB_LED_PINS, pinLabels: ["R", "K", "G", "B"],
    bodyOutline: RGB_LED_OUTLINE, iconFillsBody: true, pinLabelOffset: {dx: 0, dy: -1.45}
  },
  {
    id: "rgb-led-anode", refPrefix: "D", category: "semiconductors.diodes", name: "RGB LED (Common Anode, formed 2.54 mm)", fallbackLabel: "RGB+",
    keywords: ["light", "red green blue", "5mm", "indicator", "ca"],
    iconFile: "rgb-led.svg",
    pinOffsets: RGB_LED_PINS, pinLabels: ["R", "A", "G", "B"],
    bodyOutline: RGB_LED_OUTLINE, iconFillsBody: true, pinLabelOffset: {dx: 0, dy: -1.45}
  },
  {
    id: "crystal-hc49", refPrefix: "Y", category: "passives.timing", name: "Quartz Crystal (HC-49/US, formed 5.08 mm)", fallbackLabel: "XTAL",
    keywords: ["crystal", "quartz", "oscillator", "clock", "frequency", "mhz"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 2, dy: 0}],
    bodyOutline: rectangularOutline(-1.234, -0.915, 3.234, 0.915), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -1.22}, freeFormValue: true
  },
  {
    id: "ceramic-resonator", refPrefix: "Y", category: "passives.timing", name: "Ceramic Resonator (CSTLS, formed 2.54 mm)", fallbackLabel: "RES",
    keywords: ["clock", "oscillator", "frequency", "murata", "cstls4m00g53", "mhz"],
    pinOffsets: INLINE_3_PINS, pinLabels: ["OUT", "GND", "IN"],
    bodyOutline: rectangularOutline(-0.575, -0.591, 2.575, 0.591), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -0.9}, freeFormValue: true
  },
  {
    id: "ldr", refPrefix: "R", category: "passives.resistors", name: "Photoresistor (PDV-P8103, formed 5.08 mm)", fallbackLabel: "LDR",
    keywords: ["ldr", "light dependent resistor", "photocell", "sensor", "cds"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 2, dy: 0}],
    bodyOutline: rectangularOutline(-0.004, -1.004, 2.004, 1.004), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -1.3}, unit: "Ω", freeFormValue: true
  },
  {
    id: "thermistor", refPrefix: "RT", category: "passives.resistors", name: "NTC Thermistor (NTCLE100E3, 2.54 mm)", fallbackLabel: "NTC",
    keywords: ["temperature", "sensor", "negative temperature coefficient", "thermal", "vishay"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 1, dy: 0}],
    bodyOutline: rectangularOutline(-0.248, -0.591, 1.248, 0.591), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -0.9}, unit: "Ω", freeFormValue: true
  },
  {
    id: "film-capacitor", refPrefix: "C", category: "passives.capacitors", name: "Film Capacitor (MKS 2, formed 5.08 mm)", fallbackLabel: "FILM",
    keywords: ["polyester", "pet", "box", "nonpolar", "wima", "capacitor"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 2, dy: 0}],
    bodyOutline: rectangularOutline(-0.417, -0.492, 2.417, 0.492), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -0.8}, unit: "F"
  },
  // The housing hides both pin rows, so the numbers sit on the pins themselves.
  ...[2, 4, 8].map((positions): AdvancedComponentDefinition => ({
    id: `dip-switch-${positions}`, refPrefix: "SW", category: "switches",
    name: `DIP Switch (${positions}-position)`, fallbackLabel: `DIP${positions}`,
    keywords: ["dip switch", "configuration", "address", "spst", "piano", "cts 206"],
    pinOffsets: dipSwitchPins(positions),
    bodyOutline: dipSwitchOutline(positions), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: 0}
  })),
  {
    id: "seven-segment-cc", refPrefix: "DS", category: "displays", name: "7-Segment Display (Common Cathode, 0.56\")", fallbackLabel: "8.",
    keywords: ["seven segment", "7seg", "led display", "digit", "numeric", "sc56-11", "5161as", "cc"],
    iconFile: "seven-segment.svg",
    pinOffsets: SEVEN_SEGMENT_PINS, pinLabels: sevenSegmentLabels("CC"),
    bodyOutline: SEVEN_SEGMENT_OUTLINE, iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: 0}
  },
  {
    id: "seven-segment-ca", refPrefix: "DS", category: "displays", name: "7-Segment Display (Common Anode, 0.56\")", fallbackLabel: "8.",
    keywords: ["seven segment", "7seg", "led display", "digit", "numeric", "sa56-11", "5161bs", "ca"],
    iconFile: "seven-segment.svg",
    pinOffsets: SEVEN_SEGMENT_PINS, pinLabels: sevenSegmentLabels("CA"),
    bodyOutline: SEVEN_SEGMENT_OUTLINE, iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: 0}
  },
  {
    // Schurter OGN 0031.8201: 22.5 mm pin distance, which lands within 0.2 mm of a hole at
    // each end of a 9-hole (22.86 mm) span.
    id: "fuse-holder", refPrefix: "F", category: "passives.protection", name: "Fuse Holder (5×20 mm, OGN, 9-hole span)", fallbackLabel: "FUSE",
    keywords: ["fuse", "fuseholder", "5x20", "glass fuse", "schurter", "protection", "overcurrent"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 9, dy: 0}],
    bodyOutline: rectangularOutline(-0.6, -0.95, 9.6, 0.95), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -1.25}, freeFormValue: true
  },
  {
    // Bourns PEC11R-4xxxF-S: A/C/B at 2.5 mm pitch and the push switch's two pins on the far
    // side, 14.5 mm away, formed to 2.54 mm and a 6-hole (15.24 mm) row spacing. The two wide
    // mounting lugs between the rows don't fit perfboard holes and aren't drawn.
    id: "rotary-encoder", refPrefix: "SW", category: "switches", name: "Rotary Encoder (PEC11R, push switch, formed)", fallbackLabel: "ENC",
    keywords: ["encoder", "incremental", "quadrature", "knob", "menu", "volume", "ec11", "bourns"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 2, dy: 0}, {dx: 0, dy: -6}, {dx: 2, dy: -6}],
    pinLabels: ["A", "C", "B", "S1", "S2"],
    bodyOutline: rectangularOutline(-1.46, -5.64, 3.46, -0.36), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: 0.5}
  },
  {
    // 5.5 × 2.1 mm jack with thin breadboard-friendly pins (SparkFun PRT-10811, 4UCON 18742),
    // opening to the right. Its pins sit 5.8 mm apart along the barrel with the switch pin
    // 4.8 mm to the side, formed to 2 holes along and 2 across.
    id: "dc-barrel-jack", refPrefix: "J", category: "connectors", name: "DC Barrel Jack (5.5 × 2.1 mm, formed)", fallbackLabel: "DC",
    keywords: ["power jack", "dc jack", "barrel", "power input", "wall adapter", "2.1mm", "5.5mm"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 2, dy: 0}, {dx: 1, dy: -2}],
    pinLabels: ["CTR", "SLV", "SW"],
    bodyOutline: rectangularOutline(-0.354, -1.772, 5.354, 1.772),
    iconOffset: {dx: 2.5, dy: 0}, iconFillsBody: true
  },
  {
    // Omron B3F-1000: pins 6.5 × 4.5 mm apart, formed to the same 3 × 2 hole span as the KSA.
    id: "tactile-6x6", refPrefix: "SW", category: "switches", name: "Tactile Switch (6 × 6 mm, formed)", fallbackLabel: "BTN",
    keywords: ["tactile", "momentary", "push button", "tact", "b3f", "6x6"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 3, dy: 0}, {dx: 3, dy: 2}, {dx: 0, dy: 2}],
    bodyOutline: rectangularOutline(0.32, -0.18, 2.68, 2.18), iconFillsBody: true
  },
  {
    // Self-locking DPDT switch: two rows of three at 2.5 mm, 6 mm apart, formed to 2.54 mm and a
    // 2-hole row spacing. The middle pin of each row is that pole's common.
    id: "latching-switch", refPrefix: "SW", category: "switches", name: "Latching Push Switch (8 × 8 mm DPDT, formed)", fallbackLabel: "LATCH",
    keywords: ["self locking", "push on push off", "power switch", "dpdt", "8x8"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 2, dy: 0}, {dx: 0, dy: -2}, {dx: 1, dy: -2}, {dx: 2, dy: -2}],
    bodyOutline: rectangularOutline(-0.575, -2.575, 2.575, 0.575), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: 0}
  },
  {
    // MTS-102 style miniature toggle: 4.7 mm pin pitch formed to 2 holes. Middle pin is common.
    id: "toggle-spdt", refPrefix: "SW", category: "switches", name: "Toggle Switch (MTS-102 SPDT, formed)", fallbackLabel: "TOG",
    keywords: ["toggle", "lever", "on on", "mts-102", "panel", "power switch"],
    pinOffsets: WIDE_INLINE_3_PINS, pinLabels: ["1", "COM", "3"],
    bodyOutline: rectangularOutline(-0.6, -1.6, 4.6, 1.6), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -1.9}
  },
  {
    // MTS-202 style: two rows of the SPDT layout, one per pole. Pins 2 and 5 are the commons.
    id: "toggle-dpdt", refPrefix: "SW", category: "switches", name: "Toggle Switch (MTS-202 DPDT, formed)", fallbackLabel: "TOG2",
    keywords: ["toggle", "lever", "on on", "mts-202", "panel", "double pole"],
    pinOffsets: [...WIDE_INLINE_3_PINS, ...WIDE_INLINE_3_PINS.map(({dx}) => ({dx, dy: -2}))],
    bodyOutline: rectangularOutline(-0.6, -3.52, 4.6, 1.52), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: 0}
  },
  {
    // Kingbright DC-10: 20 pins in a 0.3" DIP, numbered like a DIP IC. LED k runs from anode
    // pin k (bottom row) to cathode pin 21 - k, straight above it.
    id: "led-bargraph-10", refPrefix: "D", category: "displays", name: "LED Bar Graph (10-segment)", fallbackLabel: "BAR",
    keywords: ["bargraph", "bar graph", "level meter", "vu meter", "dc-10", "led array"],
    pinOffsets: dipSwitchPins(10),
    pinLabels: [
      ...Array.from({length: 10}, (_, i) => `A${i + 1}`),
      ...Array.from({length: 10}, (_, i) => `K${10 - i}`),
    ],
    bodyOutline: rectangularOutline(-0.5, -3.5, 9.5, 0.5), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: 0}
  },
  {
    id: "seven-segment-4-cc", refPrefix: "DS", category: "displays", name: "4-Digit 7-Segment Display (Common Cathode, 0.56\")", fallbackLabel: "8888",
    keywords: ["seven segment", "7seg", "led display", "clock", "4 digit", "5641as", "cc", "multiplexed"],
    iconFile: "seven-segment-4.svg",
    pinOffsets: FOUR_DIGIT_PINS, pinLabels: FOUR_DIGIT_LABELS,
    bodyOutline: rectangularOutline(-7.42, -6.75, 12.42, 0.75), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: 0}
  },
  {
    id: "seven-segment-4-ca", refPrefix: "DS", category: "displays", name: "4-Digit 7-Segment Display (Common Anode, 0.56\")", fallbackLabel: "8888",
    keywords: ["seven segment", "7seg", "led display", "clock", "4 digit", "5641bs", "ca", "multiplexed"],
    iconFile: "seven-segment-4.svg",
    pinOffsets: FOUR_DIGIT_PINS, pinLabels: FOUR_DIGIT_LABELS,
    bodyOutline: rectangularOutline(-7.42, -6.75, 12.42, 0.75), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: 0}
  },
  {
    // Maxim DS18B20 in TO-92, flat face toward the viewer.
    id: "ds18b20", refPrefix: "U", category: "sensors", name: "DS18B20 Temperature Sensor (TO-92)", fallbackLabel: "DS18",
    keywords: ["temperature", "1-wire", "onewire", "thermometer", "dallas", "maxim"],
    iconFile: "transistor.svg",
    pinOffsets: INLINE_3_PINS, pinLabels: ["GND", "DQ", "VDD"],
    bodyOutline: TRANSISTOR_BODY_OUTLINE, iconFillsBody: true,
    pinLabelOffset: TRANSISTOR_PIN_LABEL_OFFSET
  },
  {
    // Vishay TSOP38238 (and VS1838B clones): 5.0 × 4.8 mm body, lens facing the viewer.
    id: "ir-receiver", refPrefix: "U", category: "sensors", name: "IR Receiver (TSOP38238, 38 kHz)", fallbackLabel: "IR",
    keywords: ["infrared", "remote control", "vs1838b", "tsop", "38khz", "demodulator"],
    pinOffsets: INLINE_3_PINS, pinLabels: ["OUT", "GND", "VS"],
    bodyOutline: rectangularOutline(-0.1, -0.95, 2.1, 1.35),
    iconOffset: {dx: 1, dy: 0.2}, iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -1.25}
  },
  {
    // Aosong DHT22 / AM2302 bare sensor, 15.1 × 7.7 mm footprint, standing 25 mm tall.
    id: "dht22", refPrefix: "U", category: "sensors", name: "DHT22 Humidity Sensor (AM2302)", fallbackLabel: "DHT22",
    keywords: ["humidity", "temperature", "am2302", "dht", "hygrometer"],
    pinOffsets: inlinePins(4), pinLabels: ["VDD", "DATA", "NC", "GND"],
    bodyOutline: rectangularOutline(-1.47, -1.52, 4.47, 1.52), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -1.8}
  },
  {
    // Aosong DHT11 bare sensor, 12 × 5.5 mm footprint, standing 15.5 mm tall. Same pinout as the DHT22.
    id: "dht11", refPrefix: "U", category: "sensors", name: "DHT11 Humidity Sensor", fallbackLabel: "DHT11",
    keywords: ["humidity", "temperature", "dht", "hygrometer"],
    pinOffsets: inlinePins(4), pinLabels: ["VDD", "DATA", "NC", "GND"],
    bodyOutline: rectangularOutline(-0.86, -1.08, 3.86, 1.08), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -1.4}
  },
  {
    // Same Sky CMA-4544PF-W: 9.7 mm capsule with two PC pins 2.54 mm apart under it.
    id: "electret-mic", refPrefix: "MK", category: "sensors", name: "Electret Microphone (9.7 mm, PC pins)", fallbackLabel: "MIC",
    keywords: ["microphone", "mic", "audio", "condenser", "sound", "cma-4544"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 1, dy: 0}], pinLabels: ["OUT", "GND"],
    bodyOutline: rectangularOutline(-1.41, -1.91, 2.41, 1.91), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: 0}
  },
  {
    // Same Sky SJ1-3523N stereo jack, opening to the right: sleeve pin nearest the opening,
    // tip and ring 5 mm behind it and 5 mm to either side, formed to 2 holes.
    id: "audio-jack-3-5mm", refPrefix: "J", category: "connectors", name: "Audio Jack (3.5 mm stereo, formed)", fallbackLabel: "AUX",
    keywords: ["headphone", "trs", "aux", "line in", "line out", "3.5mm", "sj1-3523n"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: -2, dy: -2}, {dx: -2, dy: 2}], pinLabels: ["SLV", "TIP", "RNG"],
    bodyOutline: rectangularOutline(-3.74, -2.36, 1.77, 2.36),
    iconOffset: {dx: -0.985, dy: 0}, iconFillsBody: true
  },
  // JST XH (B2B-XH-A family): 2.5 mm pitch formed to 2.54 mm, in a housing 4.9 mm longer than
  // the pin row and 5.75 mm deep.
  ...[2, 3, 4].map((count): AdvancedComponentDefinition => ({
    id: `jst-xh-${count}`, refPrefix: "J", category: "connectors", name: `JST XH Connector (${count}-pin, formed)`, fallbackLabel: `XH${count}`,
    keywords: ["jst", "xh", "battery connector", "wire to board", "2.5mm", "b2b-xh"],
    pinOffsets: inlinePins(count),
    bodyOutline: rectangularOutline(-0.965, -1.38, count - 1 + 0.965, 0.88),
    iconOffset: {dx: (count - 1) / 2, dy: -0.25}, iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: 1.15}
  })),
  {
    // Generic open CR2032 holder with PC pins about 20 mm apart, across the cell.
    id: "coin-cell-holder", refPrefix: "BT", powerSource: true, category: "batteries", name: "Coin Cell Holder (CR2032, 8-hole span)", fallbackLabel: "2032",
    keywords: ["cr2032", "coin cell", "button cell", "rtc backup", "3v", "bs-7"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 8, dy: 0}], pinLabels: ["+", "−"],
    bodyOutline: rectangularOutline(-0.6, -4.53, 8.6, 4.53), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: 0}
  },
  {
    // Keystone 2462: both terminals at one end, 12.7 mm (5 holes) apart.
    id: "battery-2xaa", refPrefix: "BT", powerSource: true, category: "batteries", name: "Battery Holder (2 × AA, Keystone 2462)", fallbackLabel: "2×AA",
    keywords: ["aa", "battery", "3v", "two cell", "keystone"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 0, dy: -5}], pinLabels: ["+", "−"],
    bodyOutline: rectangularOutline(-22.13, -8.98, 1.3, 3.98),
    iconOffset: {dx: -10.415, dy: -2.5}, iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: 0}
  },
  {
    // Keystone 1043: contacts 71.6 mm apart at either end, 0.24 mm off a 28-hole span each.
    id: "battery-18650", refPrefix: "BT", powerSource: true, category: "batteries", name: "Battery Holder (18650, Keystone 1043, 28-hole span)", fallbackLabel: "18650",
    keywords: ["18650", "li-ion", "lithium", "battery", "3.7v", "keystone"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 28, dy: 0}], pinLabels: ["+", "−"],
    bodyOutline: rectangularOutline(-1.18, -4.075, 29.18, 4.075), iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: 0}
  },
  {
    // TI LM1117T / ST LD1117V in TO-220, in any fixed voltage (3.3 V is the usual one) or adjustable.
    id: "regulator-ld1117", refPrefix: "U", category: "ics.power", name: "LM1117 / LD1117 LDO Regulator (TO-220)", fallbackLabel: "1117",
    keywords: ["ams1117", "3.3v", "3v3", "low dropout", "ldo", "voltage regulator", "linear", "power supply"],
    iconFile: "mosfet.svg",
    pinOffsets: INLINE_3_PINS, pinLabels: ["GND", "OUT", "IN"],
    bodyOutline: MOSFET_BODY_OUTLINE, iconFillsBody: true,
    pinLabelOffset: MOSFET_PIN_LABEL_OFFSET, valueLabelOffset: MOSFET_VALUE_LABEL_OFFSET
  },
  {
    // 100 mA regulator in TO-92, flat face toward the viewer.
    id: "regulator-78l05", refPrefix: "U", category: "ics.power", name: "78L05 Voltage Regulator (TO-92)", fallbackLabel: "78L05",
    keywords: ["lm78l05", "mc78l05", "5v", "linear", "small", "power supply"],
    iconFile: "transistor.svg",
    pinOffsets: INLINE_3_PINS, pinLabels: ["OUT", "GND", "IN"],
    bodyOutline: TRANSISTOR_BODY_OUTLINE, iconFillsBody: true,
    pinLabelOffset: TRANSISTOR_PIN_LABEL_OFFSET
  },
  {
    // BJTs and Darlingtons in the usual TO-220 order, seen from the marked front.
    id: "power-transistor", refPrefix: "Q", category: "semiconductors.transistors", name: "Power Transistor (TO-220, BCE)", fallbackLabel: "BJT",
    keywords: ["tip120", "tip122", "tip31", "tip41", "darlington", "npn", "pnp", "bjt", "to-220"],
    iconFile: "mosfet.svg",
    pinOffsets: INLINE_3_PINS, pinLabels: ["B", "C", "E"],
    bodyOutline: MOSFET_BODY_OUTLINE, iconFillsBody: true,
    pinLabelOffset: MOSFET_PIN_LABEL_OFFSET, valueLabelOffset: MOSFET_VALUE_LABEL_OFFSET
  },
  {
    // TI LM35 in TO-92, flat face toward the viewer.
    id: "lm35", refPrefix: "U", category: "sensors", name: "LM35 Temperature Sensor (TO-92)", fallbackLabel: "LM35",
    keywords: ["temperature", "thermometer", "analog", "lm35dz", "tmp36"],
    iconFile: "transistor.svg",
    pinOffsets: INLINE_3_PINS, pinLabels: ["VS", "OUT", "GND"],
    bodyOutline: TRANSISTOR_BODY_OUTLINE, iconFillsBody: true,
    pinLabelOffset: TRANSISTOR_PIN_LABEL_OFFSET
  },
  {
    // Worldsemi WS2812D-F5: 5 mm LED with leads 1.27 mm apart, spread to 2.54 mm. DOUT is beside the
    // flat, and VDD is the longest lead.
    id: "ws2812d-f5", refPrefix: "D", category: "semiconductors.diodes", name: "Addressable RGB LED (WS2812D-F5, formed 2.54 mm)", fallbackLabel: "WS2812",
    keywords: ["neopixel", "ws2812", "ws2812b", "pl9823", "smart led", "digital led", "5mm"],
    iconFile: "rgb-led.svg",
    pinOffsets: RGB_LED_PINS, pinLabels: ["DOUT", "VDD", "GND", "DIN"],
    bodyOutline: RGB_LED_OUTLINE, iconFillsBody: true, pinLabelOffset: {dx: 0, dy: -1.45}
  },
  {
    // DIP-4 bridge (DF10M, DB107): rows 7.62 mm apart and pins 5.08 mm along them, + and − in one row.
    id: "bridge-rectifier", refPrefix: "D", category: "semiconductors.diodes", name: "Bridge Rectifier (DIP-4, DF10M / DB107)", fallbackLabel: "BR",
    keywords: ["rectifier", "full wave", "ac to dc", "df10m", "db107", "db-1", "graetz"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 0, dy: 2}, {dx: 3, dy: 2}, {dx: 3, dy: 0}], pinLabels: ["+", "−", "~", "~"],
    bodyOutline: rectangularOutline(0.25, -0.71, 2.75, 2.6),
    iconOffset: {dx: 1.5, dy: 0.945}, iconFillsBody: true,
    pinLabelOffsets: [{dx: -0.45, dy: 0}, {dx: -0.45, dy: 0}, {dx: 0.45, dy: 0}, {dx: 0.45, dy: 0}]
  },
  // KF128-style blocks whose pins fit the grid as they come. The 5.08 mm ones are further up.
  ...[2, 3, 4].map((count): AdvancedComponentDefinition => ({
    id: `screw-terminal-254-${count}`, refPrefix: "J", category: "connectors", name: `Screw Terminal (${count}-pin, 2.54 mm)`, fallbackLabel: `TB${count}`,
    keywords: ["terminal block", "kf128", "power input", "connector", "wire", "2.54mm"],
    pinOffsets: inlinePins(count),
    bodyOutline: rectangularOutline(-0.5, -1.25, count - 0.5, 1.25),
    iconOffset: {dx: (count - 1) / 2, dy: 0}, iconFillsBody: true,
    pinLabelOffset: {dx: 0, dy: -1.55}
  })),
  {
    // Micro-B breakout (SparkFun BOB-12035, Adafruit 1833), socket at the top, pins in the socket's own order.
    id: "micro-usb-breakout", refPrefix: "J", category: "connectors", name: "Micro USB Breakout (5-pin)", fallbackLabel: "USB",
    keywords: ["usb", "micro usb", "micro-b", "power input", "5v", "module"],
    pinOffsets: inlinePins(5), pinLabels: ["VCC", "D-", "D+", "ID", "GND"], bodyColor: "#4d2a7c",
    ...moduleBoard(-1, -5.5, 5, 0.5), pinLabelOffset: LABEL_ABOVE_PINS
  },
  {
    // 0.96" module, 27.3 × 27.8 mm, header centred along the top edge. Some makers swap VCC and GND.
    id: "oled-ssd1306-i2c", refPrefix: "DS", category: "displays", name: "OLED Display (0.96\", SSD1306, I2C 4-pin)", fallbackLabel: "OLED",
    keywords: ["oled", "ssd1306", "sh1106", "128x64", "i2c", "screen", "module"],
    pinOffsets: inlinePins(4), pinLabels: ["GND", "VCC", "SCL", "SDA"], bodyColor: "#0f3d7a",
    ...moduleBoard(-3.875, -0.5, 6.875, 10.445), pinLabelOffset: LABEL_BELOW_PINS
  },
  {
    // The same 0.96" module wired for SPI: D0 is the clock, D1 the data.
    id: "oled-ssd1306-spi", refPrefix: "DS", category: "displays", name: "OLED Display (0.96\", SSD1306, SPI 7-pin)", fallbackLabel: "OLED",
    keywords: ["oled", "ssd1306", "128x64", "spi", "screen", "module"],
    pinOffsets: inlinePins(7), pinLabels: ["GND", "VCC", "D0", "D1", "RES", "DC", "CS"], bodyColor: "#0f3d7a",
    ...moduleBoard(-2.375, -0.5, 8.375, 10.445), pinLabelOffset: LABEL_BELOW_PINS
  },
  {
    // Wincom WC1602A and its many clones: 80 × 36 mm, 16 pins along the top edge, pin 1 8 mm in.
    id: "lcd-1602", refPrefix: "DS", category: "displays", name: "Character LCD (16×2, HD44780)", fallbackLabel: "LCD",
    keywords: ["lcd", "1602", "16x2", "hd44780", "character display", "text", "screen", "module"],
    pinOffsets: inlinePins(16),
    pinLabels: ["VSS", "VDD", "VO", "RS", "RW", "E", "D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "A", "K"], bodyColor: "#1f6f43",
    ...moduleBoard(-3.15, -0.984, 28.346, 13.189), pinLabelOffset: LABEL_BELOW_PINS
  },
  {
    // 45 × 20 mm board standing on its right-angle pins, so what's seen from above is its edge and
    // the two transducers, 12 mm deep, facing the board's bottom edge.
    id: "hc-sr04", refPrefix: "M", category: "modules.sensors", name: "Ultrasonic Sensor (HC-SR04)", fallbackLabel: "SR04",
    keywords: ["ultrasonic", "distance", "range finder", "sonar", "hc-sr04", "module"],
    pinOffsets: inlinePins(4), pinLabels: ["VCC", "TRIG", "ECHO", "GND"], bodyColor: "#1a4fa0",
    ...moduleBoard(-7.36, -0.5, 10.36, 5.2), pinLabelOffset: LABEL_ABOVE_PINS
  },
  {
    // GY-521 breakout, about 21 × 16 mm, header along a long edge.
    id: "mpu6050-gy521", refPrefix: "M", category: "modules.sensors", name: "Accelerometer & Gyro (MPU6050, GY-521)", fallbackLabel: "6050",
    keywords: ["mpu6050", "gy-521", "imu", "gyroscope", "accelerometer", "i2c", "motion", "module"],
    pinOffsets: inlinePins(8), pinLabels: ["VCC", "GND", "SCL", "SDA", "XDA", "XCL", "AD0", "INT"], bodyColor: "#1a3f8a",
    ...moduleBoard(-0.63, -5.8, 7.63, 0.5), pinLabelOffset: LABEL_ABOVE_PINS
  },
  {
    // GY-BME280 I2C breakout, about 11.5 × 15 mm, with its own 3.3 V regulator.
    id: "bme280-i2c", refPrefix: "M", category: "modules.sensors", name: "Weather Sensor (BME280, I2C 4-pin)", fallbackLabel: "BME280",
    keywords: ["bme280", "temperature", "humidity", "pressure", "barometer", "i2c", "module"],
    pinOffsets: inlinePins(4), pinLabels: ["VIN", "GND", "SCL", "SDA"], bodyColor: "#56308f",
    ...moduleBoard(-0.76, -5.4, 3.76, 0.5), pinLabelOffset: LABEL_ABOVE_PINS
  },
  {
    // GY-BMP280 breakout, about 15 × 11.5 mm, for I2C or SPI. 3.3 V only unless yours has a regulator.
    id: "bmp280-6pin", refPrefix: "M", category: "modules.sensors", name: "Pressure Sensor (BMP280, 6-pin)", fallbackLabel: "BMP280",
    keywords: ["bmp280", "temperature", "pressure", "barometer", "i2c", "spi", "module"],
    pinOffsets: inlinePins(6), pinLabels: ["VCC", "GND", "SCL", "SDA", "CSB", "SDO"], bodyColor: "#56308f",
    ...moduleBoard(-0.45, -4.03, 5.45, 0.5), pinLabelOffset: LABEL_ABOVE_PINS
  },
  {
    // ADS1115 breakout, about 28 × 18 mm, header along a long edge.
    id: "ads1115-module", refPrefix: "M", category: "modules.sensors", name: "16-bit ADC (ADS1115)", fallbackLabel: "ADS1115",
    keywords: ["ads1115", "adc", "analog to digital", "i2c", "16 bit", "module"],
    pinOffsets: inlinePins(10), pinLabels: ["VDD", "GND", "SCL", "SDA", "ADDR", "ALRT", "A0", "A1", "A2", "A3"], bodyColor: "#1f4fa3",
    ...moduleBoard(-1.01, -6.5, 10.01, 0.5), pinLabelOffset: LABEL_ABOVE_PINS
  },
  {
    // Ai-Thinker ESP-01: 14.4 × 24.7 mm, the 2 × 4 header at the end away from the antenna.
    id: "esp-01", refPrefix: "M", category: "modules.wireless", name: "ESP-01 Wi-Fi Module (ESP8266)", fallbackLabel: "ESP-01",
    keywords: ["esp01", "esp-01s", "esp8266", "wifi", "ai-thinker", "module"],
    pinOffsets: [...inlinePins(4), ...inlinePins(4).map(({dx}) => ({dx, dy: 1}))],
    pinLabels: ["GND", "IO2", "IO0", "RX", "TX", "EN", "RST", "3V3"], bodyColor: "#15181c",
    ...moduleBoard(-1.378, -8.134, 4.291, 1.591),
    pinLabelOffsets: [...inlinePins(4).map(() => LABEL_ABOVE_PINS), ...inlinePins(4).map(() => LABEL_BELOW_PINS)]
  },
  {
    // nRF24L01+ breakout: 29 × 15.25 mm, the 2 × 4 header at the end away from the antenna. Its pins
    // are numbered row by row. VCC is 3.3 V, though the signal pins take 5 V.
    id: "nrf24l01", refPrefix: "M", category: "modules.wireless", name: "2.4 GHz Radio (nRF24L01)", fallbackLabel: "nRF24",
    keywords: ["nrf24", "nrf24l01+", "2.4ghz", "rf", "transceiver", "spi", "module"],
    pinOffsets: [0, 1, 2, 3].flatMap(dy => [{dx: 0, dy}, {dx: 1, dy}]),
    pinLabels: ["GND", "VCC", "CE", "CSN", "SCK", "MOSI", "MISO", "IRQ"], bodyColor: "#14241d",
    ...moduleBoard(-0.59, -0.787, 10.827, 5.217),
    pinLabelOffsets: [0, 1, 2, 3].flatMap(() => [{dx: -0.72, dy: 0}, {dx: 0.8, dy: 0}])
  },
  {
    // HC-05 on its usual carrier, about 15.5 × 37 mm, header on a short edge. RXD is 3.3 V logic.
    id: "hc-05", refPrefix: "M", category: "modules.wireless", name: "Bluetooth Serial (HC-05)", fallbackLabel: "HC-05",
    keywords: ["bluetooth", "hc-06", "serial", "uart", "wireless", "module"],
    pinOffsets: inlinePins(6), pinLabels: ["EN", "VCC", "GND", "TXD", "RXD", "STATE"], bodyColor: "#1a4fa0",
    ...moduleBoard(-0.55, -14.2, 5.55, 0.5), pinLabelOffset: LABEL_ABOVE_PINS
  },
  {
    // GY-NEO6MV2, about 25 × 35 mm. Its antenna hangs from a lead on the U.FL socket.
    id: "gps-neo6m", refPrefix: "M", category: "modules.wireless", name: "GPS Receiver (NEO-6M, GY-NEO6MV2)", fallbackLabel: "GPS",
    keywords: ["gps", "gnss", "neo-6m", "ublox", "uart", "location", "module"],
    pinOffsets: inlinePins(4), pinLabels: ["VCC", "RX", "TX", "GND"], bodyColor: "#1a4fa0",
    ...moduleBoard(-3.42, -13.28, 6.42, 0.5), pinLabelOffset: LABEL_ABOVE_PINS
  },
  {
    // ZS-042 module, 38 × 22 mm, drawn lying flat. Its right-angle pins stand it up instead unless
    // they're swapped for straight ones.
    id: "ds3231-module", refPrefix: "M", category: "modules.storage", name: "Real-Time Clock (DS3231, ZS-042)", fallbackLabel: "DS3231",
    keywords: ["rtc", "clock", "ds3231", "zs-042", "i2c", "timekeeping", "module"],
    pinOffsets: inlinePins(6), pinLabels: ["32K", "SQW", "SCL", "SDA", "VCC", "GND"], bodyColor: "#15509c",
    ...moduleBoard(-1.83, -14.46, 6.83, 0.5), pinLabelOffset: LABEL_ABOVE_PINS
  },
  {
    // Catalex-style card socket board, 42 × 24 mm, header on a short edge, runs from 5 V.
    id: "microsd-module", refPrefix: "M", category: "modules.storage", name: "MicroSD Card Module (SPI)", fallbackLabel: "SD",
    keywords: ["sd card", "microsd", "tf card", "storage", "logger", "spi", "catalex", "module"],
    pinOffsets: inlinePins(6), pinLabels: ["GND", "VCC", "MISO", "MOSI", "SCK", "CS"], bodyColor: "#1a4fa0",
    ...moduleBoard(-2.22, -16.04, 7.22, 0.5), pinLabelOffset: LABEL_ABOVE_PINS
  },
  // Power modules have bare pads, not a header, and their spacing varies by maker: these spans are
  // the nearest holes, for stiff wire legs or header pins bent to fit.
  {
    // 43 × 21 mm step-down board: pads about 40 × 17.8 mm apart, input at one end, output at the other.
    id: "lm2596-module", refPrefix: "M", category: "modules.power", name: "Buck Converter (LM2596, 16 × 7 holes)", fallbackLabel: "LM2596",
    keywords: ["lm2596", "buck", "step down", "dc-dc", "converter", "regulator", "module"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 0, dy: 7}, {dx: 16, dy: 0}, {dx: 16, dy: 7}],
    pinLabels: ["IN+", "IN-", "OUT+", "OUT-"], bodyColor: "#1c4f9c",
    ...moduleBoard(-0.46, -0.63, 16.46, 7.63), pinLabelOffsets: padLabelSpots(2, 2)
  },
  {
    // 22 × 17 mm miniature step-down board.
    id: "mp1584-module", refPrefix: "M", category: "modules.power", name: "Mini Buck Converter (MP1584, 8 × 5 holes)", fallbackLabel: "MP1584",
    keywords: ["mp1584", "mp1584en", "buck", "step down", "dc-dc", "converter", "regulator", "module"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 0, dy: 5}, {dx: 8, dy: 0}, {dx: 8, dy: 5}],
    pinLabels: ["IN+", "IN-", "OUT+", "OUT-"], bodyColor: "#1f6a4f",
    ...moduleBoard(-0.33, -0.85, 8.33, 5.85), pinLabelOffsets: padLabelSpots(2, 2)
  },
  {
    // 36 × 17 mm step-up board.
    id: "mt3608-module", refPrefix: "M", category: "modules.power", name: "Boost Converter (MT3608, 13 × 5 holes)", fallbackLabel: "MT3608",
    keywords: ["mt3608", "boost", "step up", "dc-dc", "converter", "regulator", "module"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 0, dy: 5}, {dx: 13, dy: 0}, {dx: 13, dy: 5}],
    pinLabels: ["IN+", "IN-", "OUT+", "OUT-"], bodyColor: "#1c4f9c",
    ...moduleBoard(-0.586, -0.85, 13.586, 5.85), pinLabelOffsets: padLabelSpots(2, 2)
  },
  {
    // 03962A board, 26 × 17 mm, with cell protection: supply pads beside the USB socket, the cell
    // (B+, B-) and the protected output (OUT+, OUT-) at the far end.
    id: "tp4056-module", refPrefix: "M", category: "modules.power", name: "Li-ion Charger (TP4056, with protection)", fallbackLabel: "TP4056",
    keywords: ["tp4056", "03962a", "lithium", "li-ion", "18650", "battery charger", "usb", "module"],
    pinOffsets: [{dx: 0, dy: 0}, {dx: 0, dy: 5}, {dx: 9, dy: 0}, {dx: 9, dy: 1}, {dx: 9, dy: 4}, {dx: 9, dy: 5}],
    pinLabels: ["IN+", "IN-", "OUT+", "B+", "B-", "OUT-"], bodyColor: "#1c4f9c",
    ...moduleBoard(-0.62, -0.85, 9.62, 5.85), pinLabelOffsets: padLabelSpots(2, 4)
  },
  {
    // Pololu A4988 carrier and clones: 15.2 × 20.3 mm, rows 12.7 mm apart.
    id: "a4988", refPrefix: "M", category: "modules.motor", name: "Stepper Driver (A4988)", fallbackLabel: "A4988",
    keywords: ["a4988", "stepper", "pololu", "stepstick", "motor driver", "cnc", "3d printer", "module"],
    pinOffsets: dualRowOffsets(5, 8),
    pinLabels: dualRowLabels(["EN", "MS1", "MS2", "MS3", "RST", "SLP", "STEP", "DIR"], ["VMOT", "GND", "2B", "2A", "1A", "1B", "VDD", "GND"]), bodyColor: "#a8322a",
    ...moduleBoard(-0.5, -0.5, 5.5, 7.5), pinLabelOffsets: dualRowLabelSpots(8)
  },
  {
    // Pololu DRV8825 carrier and clones: the A4988's board and pins, with FLT where it has VDD.
    id: "drv8825", refPrefix: "M", category: "modules.motor", name: "Stepper Driver (DRV8825)", fallbackLabel: "DRV8825",
    keywords: ["drv8825", "stepper", "pololu", "stepstick", "motor driver", "cnc", "3d printer", "module"],
    pinOffsets: dualRowOffsets(5, 8),
    pinLabels: dualRowLabels(["EN", "M0", "M1", "M2", "RST", "SLP", "STEP", "DIR"], ["VMOT", "GND", "B2", "B1", "A1", "A2", "FLT", "GND"]), bodyColor: "#3f2a80",
    ...moduleBoard(-0.5, -0.5, 5.5, 7.5), pinLabelOffsets: dualRowLabelSpots(8)
  },
  {
    // One-channel relay board, about 26 × 50 mm: control header at one end, screw terminals for the
    // switched load at the other. Pin order varies by maker.
    id: "relay-module", refPrefix: "M", category: "modules.motor", name: "Relay Module (1-channel)", fallbackLabel: "RELAY",
    keywords: ["relay", "srd-05vdc", "5v relay", "switch", "mains", "module"],
    pinOffsets: inlinePins(3), pinLabels: ["VCC", "GND", "IN"], bodyColor: "#1a4fa0",
    ...moduleBoard(-4.12, -19.2, 6.12, 0.5), pinLabelOffset: LABEL_ABOVE_PINS
  },
  {
    // DFRobot DFR0299: 20.7 mm square, rows about 17.78 mm apart, card socket at the top. It's
    // numbered like a DIP chip.
    id: "dfplayer-mini", refPrefix: "M", category: "modules.audio", name: "MP3 Player (DFPlayer Mini)", fallbackLabel: "MP3",
    keywords: ["dfplayer", "dfr0299", "mp3", "audio", "sound", "speaker", "microsd", "module"],
    pinOffsets: dualRowOffsets(7, 8),
    pinLabels: dualRowLabels(["VCC", "RX", "TX", "DAC_R", "DAC_L", "SPK1", "GND", "SPK2"], ["BUSY", "USB-", "USB+", "ADKEY2", "ADKEY1", "IO2", "GND", "IO1"]), bodyColor: "#142a55",
    ...moduleBoard(-0.575, -0.575, 7.575, 7.575), pinLabelOffsets: dualRowLabelSpots(8, 0.85)
  },
  {
    // SparkFun Arduino Pro Mini and clones: 18 × 33 mm, rows 0.6" apart. The serial header across the
    // top end faces away from the board, so it isn't one of its pins here.
    id: "arduino-pro-mini", refPrefix: "U", category: "modules.dev-boards", name: "Arduino Pro Mini", fallbackLabel: "MINI",
    keywords: ["pro mini", "sparkfun", "atmega328p", "avr", "ftdi", "3.3v", "module"],
    pinOffsets: dualRowOffsets(6, 12),
    pinLabels: dualRowLabels(["TXO", "RXI", "RST", "GND", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["RAW", "GND", "RST", "VCC", "A3", "A2", "A1", "A0", "D13", "D12", "D11", "D10"]), bodyColor: "#b5302a",
    ...moduleBoard(-0.5, -1.5, 6.5, 11.5), pinLabelOffsets: dualRowLabelSpots(12)
  },
];

export function getAdvancedComponentDefinition(id: string): AdvancedComponentDefinition | undefined {
  return ADVANCED_COMPONENT_DEFINITIONS.find(def => def.id === id);
}
