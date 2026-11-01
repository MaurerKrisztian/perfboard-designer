import {Group, Mesh, MeshStandardMaterial, PlaneGeometry, Vector3} from "three";
import {AdvancedComponentDefinition} from "../../parts/advanced-component-definitions";
import {PITCH, paintedTexture, SceneKit, textPlane} from "../scene-kit";
import {buildCustomModule, MODULE_BOARD_TOP} from "./custom-module";
import {addTopLabel, bodyBounds, cylinder} from "./part-geometry";

// The catalog's breakout modules: a board on header pins, as a custom module is, with what makes
// each one recognisable standing on it, placed as its 2D artwork has it. Everything is in mm from the
// board's centre, x along it and z across it (+z is the artwork's bottom edge), and `on` is how far
// above the board it starts, so a module's look is data.

type Paint = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

type Mark =
  | {kind: "box"; x: number; z: number; w: number; d: number; h: number; color: string; metal?: boolean; on?: number; turn?: number}
  | {kind: "can"; x: number; z: number; r: number; h: number; color: string; metal?: boolean; on?: number}
  | {kind: "text"; x: number; z: number; w: number; d: number; text: string; color?: string; on?: number}
  | {kind: "screen"; x: number; z: number; w: number; d: number; paint: Paint; on: number}
  // A cylinder lying along x, from x onward: a pot's shaft.
  | {kind: "rod"; x: number; z: number; r: number; length: number; color: string; metal?: boolean; on: number};

const CHIP = "#1c1f23";
const METAL = "#c7ced6";
const BLUE_TRIM = "#2a5fbf";
const BRASS = "#d9b45b";
const SMD = "#b98a5f";
const HOLE = "#0c1116";
const DARK_INK = "#40464e";

const box = (x: number, z: number, w: number, d: number, h: number, color: string, on = 0): Mark => ({kind: "box", x, z, w, d, h, color, on});
const metal = (x: number, z: number, w: number, d: number, h: number, on = 0): Mark => ({kind: "box", x, z, w, d, h, color: METAL, metal: true, on});
const chip = (x: number, z: number, w: number, d: number, h = 1, on = 0): Mark => box(x, z, w, d, h, CHIP, on);
const can = (x: number, z: number, r: number, h: number, color: string, isMetal = false, on = 0): Mark => ({kind: "can", x, z, r, h, color, metal: isMetal, on});
const label = (x: number, z: number, w: number, d: number, text: string, on = 0, color?: string): Mark => ({kind: "text", x, z, w, d, text, on, color});
// Small resistors and capacitors, each at [x, z].
const smd = (...at: [number, number][]): Mark[] => at.map(([x, z]) => box(x, z, 1.6, 0.8, 0.5, SMD));
// Mounting holes, each at [x, z].
const holes = (radius: number, ...at: [number, number][]): Mark[] => at.flatMap(([x, z]) => [can(x, z, radius + 0.35, 0.03, BRASS, true), can(x, z, radius, 0.04, HOLE)]);
const trimmer = (x: number, z: number): Mark[] => [box(x, z, 9.5, 4.8, 5, BLUE_TRIM), can(x - 3.4, z, 0.95, 0.3, BRASS, true, 5), box(x - 3.4, z, 1.5, 0.28, 0.32, DARK_INK, 5)];
const smallTrimmer = (x: number, z: number): Mark[] => [box(x, z, 3.6, 3.6, 1.8, BLUE_TRIM), can(x, z, 1.05, 0.25, BRASS, true, 1.8), box(x, z, 1.6, 0.28, 0.27, DARK_INK, 1.8)];
const roundTrimmer = (x: number, z: number): Mark[] => [can(x, z, 1.6, 1.1, BLUE_TRIM), can(x, z, 0.95, 0.15, BRASS, true, 1.1), box(x, z, 1.5, 0.26, 0.17, DARK_INK, 1.1)];
// A shielded power inductor: a dark square with its winding showing on top.
const inductor = (x: number, z: number, size: number, h: number): Mark[] => [
  box(x, z, size, size, h, "#2b2e33"), can(x, z, size * 0.4, 0.06, "#b6793d", true, h), can(x, z, size * 0.24, 0.1, "#3b3f45", false, h),
];
// An electrolytic can: a dark sleeve, the metal end with its vent cross.
const electrolytic = (x: number, z: number, r: number, h: number): Mark[] => [
  can(x, z, r, h, "#1d2733"), can(x, z, r * 0.88, 0.05, METAL, true, h),
  box(x, z, r * 1.5, 0.18, 0.07, "#6c7681", h), box(x, z, 0.18, r * 1.5, 0.07, "#6c7681", h),
];
// A green terminal block, its screws along x.
const terminalBlock = (x: number, z: number, count: number, pitch: number, depth: number, h: number): Mark[] => [
  box(x, z, count * pitch, depth, h, "#218454"),
  ...Array.from({length: count}, (_, i): Mark[] => {
    const sx = x + (i - (count - 1) / 2) * pitch;
    return [can(sx, z - 0.8, pitch * 0.34, 0.08, "#0b261b", false, h), can(sx, z - 0.8, pitch * 0.27, 0.14, METAL, true, h), box(sx, z - 0.8, pitch * 0.42, 0.34, 0.16, DARK_INK, h)];
  }).flat(),
];
// A PCB antenna: a copper meander, its long runs along z (or along x).
function antenna(x: number, z: number, w: number, d: number, runs: number, alongX = false, on = 0): Mark[] {
  const width = 0.55, marks: Mark[] = [];
  const span = alongX ? d : w, length = alongX ? w : d;
  for (let i = 0; i < runs; i++) {
    const across = -span / 2 + i * span / (runs - 1);
    marks.push(alongX ? box(x, z + across, length, width, 0.05, BRASS, on) : box(x + across, z, width, length, 0.05, BRASS, on));
    if (i === runs - 1) continue;
    const end = (i % 2 === 0 ? 1 : -1) * (length - width) / 2;
    const step = span / (runs - 1), middle = across + step / 2;
    marks.push(alongX ? box(x + end, z + middle, width, step + width, 0.05, BRASS, on) : box(x + middle, z + end, step + width, width, 0.05, BRASS, on));
  }
  return marks;
}

// The OLED's picture: the yellow band of a two-colour panel over a few lines of blue.
const paintOled: Paint = (ctx, w, h) => {
  ctx.fillStyle = "#05101a";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#f6d24b";
  ctx.fillRect(w * 0.06, h * 0.08, w * 0.6, h * 0.1);
  ctx.fillStyle = "#58c8ee";
  [[0.06, 0.8], [0.06, 0.66], [0.06, 0.74], [0.06, 0.5]].forEach(([left, length], i) => ctx.fillRect(w * left, h * (0.32 + i * 0.16), w * length, h * 0.07));
};

// A character LCD: two rows of sixteen cells, with something to read on them.
const paintLcd: Paint = (ctx, w, h) => {
  ctx.fillStyle = "#2146b0";
  ctx.fillRect(0, 0, w, h);
  const cols = 16, rows = 2, cellW = w * 0.052, cellH = h * 0.38, gapX = (w - cols * cellW) / (cols + 1), gapY = (h - rows * cellH) / (rows + 1);
  const lines = ["PERFBOARD", "DESIGNER"];
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `600 ${cellH * 0.82}px monospace`;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = gapX + col * (cellW + gapX), y = gapY + row * (cellH + gapY);
      ctx.fillStyle = "#3a5fd0";
      ctx.fillRect(x, y, cellW, cellH);
      const char = lines[row][col];
      if (char) {
        ctx.fillStyle = "#f4f7ff";
        ctx.fillText(char, x + cellW / 2, y + cellH / 2);
      }
    }
  }
};

const oled = (): Mark[] => [
  ...holes(1.1, [-11.6, -11.8], [11.6, -11.8], [-11.6, 11.8], [11.6, 11.8]),
  box(0, 1.4, 26.6, 19.5, 1, "#080b0f"),
  {kind: "screen", x: 0, z: 0.4, w: 21.8, d: 11, paint: paintOled, on: 1},
  box(0, 12.6, 7, 2.2, 0.15, "#c98a33"),
];

const LOOKS: Record<string, Mark[]> = {
  "oled-ssd1306-i2c": oled(),
  "oled-ssd1306-spi": oled(),
  "lcd-1602": [
    ...holes(1.5, [-37.5, -15.5], [37.5, -15.5], [-37.5, 15.5], [37.5, 15.5]),
    {kind: "box", x: 0, z: 1, w: 71, d: 26, h: 6.5, color: "#3a4048", metal: true},
    {kind: "screen", x: 0, z: 1, w: 64.5, d: 14, paint: paintLcd, on: 6.5},
  ],
  "mpu6050-gy521": [
    ...holes(1.2, [-8.4, -5.9], [8.4, -5.9]), chip(0, -1.4, 4, 4, 0.9), chip(5.4, 1.9, 3, 1.6, 1.1),
    ...smd([-5.2, -3.2], [-5.2, -1], [5.2, -3.2], [5.2, -1]), label(-1.5, 3.3, 11, 2.2, "GY-521"),
  ],
  "bme280-i2c": [
    ...holes(1, [-3.9, -6], [3.9, -6]), metal(0, -3, 2.5, 2.5, 0.9), chip(0, 0.9, 2.8, 1.4, 0.9),
    ...smd([-3.7, 0.9], [3.7, 0.9]), label(0, 3.4, 9, 1.9, "BME280"),
  ],
  "bmp280-6pin": [
    ...holes(1, [-6, -4.4], [6, -4.4]), metal(0, -3, 2, 2, 0.8), ...smd([-3.6, -1], [3.6, -1]), label(0, 1.3, 10, 2, "BMP280"),
  ],
  "ads1115-module": [
    ...holes(1.2, [-12.2, -7.2], [12.2, -7.2]), chip(0, -3, 3.6, 2, 1), ...smd([-6.5, 0.4], [-4.4, 0.4], [4.4, 0.4], [6.5, 0.4]), label(0, 3.6, 14, 2.6, "ADS1115"),
  ],
  "esp-01": [
    ...antenna(-1.9, -8.9, 7.6, 4.8, 5, true), chip(0, -1.6, 4.6, 4.6, 0.9), label(0, -1.6, 4, 1.4, "8266", 0.9, "#c8d0d8"),
    chip(1, 4, 3.2, 1.6, 1.2), metal(-4.8, -1.9, 1.8, 2.6, 0.9),
  ],
  "nrf24l01": [
    ...antenna(10.9, 0, 4.8, 12.4, 6), chip(0.2, -2, 3.6, 3.6, 0.9), metal(-0.5, 3.9, 8.6, 3, 2.3), label(-0.5, 3.9, 7, 1.7, "16.000", 2.3, DARK_INK),
    ...smd([5.4, -5], [5.4, -3.4], [5.4, -0.5], [-4.8, -5], [-4.8, -3.4]),
  ],
  "hc-05": [
    box(0, -6.1, 12.7, 24, 0.9, "#2d7d58"), ...antenna(0, -14.8, 9.6, 3.6, 7, false, 0.9), chip(0, -7.2, 5.6, 5.6, 0.8, 0.9), chip(0, -0.2, 4.6, 2.2, 0.8, 0.9),
    label(0, 9.2, 9, 2.4, "HC-05"), chip(-3.8, 12.9, 2.4, 1.5, 1), metal(3.8, 12.9, 2.8, 2.4, 1.2),
  ],
  "gps-neo6m": [
    ...holes(1.5, [-11, -16], [11, -16], [-11, 13.2], [11, 13.2]),
    metal(0, -5.4, 12.6, 12.2, 2.4), label(0, -5.4, 9, 2.2, "NEO-6M", 2.4, DARK_INK), metal(-3, 4.7, 5, 3.2, 1.6),
    box(5.9, 4.4, 2.6, 2.6, 0.5, BRASS), can(5.9, 4.4, 0.8, 0.8, METAL, true, 0.5), label(0, 12.3, 7, 2.2, "GPS"),
  ],
  "ds3231-module": [
    ...holes(1.5, [-9, -17], [9, -17]), can(0, -8.2, 7.8, 3.2, "#b7bec6", true), can(0, -8.2, 6, 0.06, "#dbe0e5", true, 3.2), label(0, -8.2, 8, 2.4, "CR2032", 3.28, DARK_INK),
    chip(-1, 4.7, 8.2, 5.4, 1.9), label(-1, 4.7, 7, 1.8, "DS3231", 1.9, "#c8d0d8"), chip(6.6, 3.9, 3, 2.2, 1.2),
    ...smd([-7.4, 10], [-5.3, 10], [5.3, 10], [7.4, 10]), label(0, 13.2, 7, 2.2, "RTC"),
  ],
  "microsd-module": [
    ...holes(1.3, [-10.4, -19.4], [10.4, -19.4], [-10.4, 13.2], [10.4, 13.2]),
    metal(0, -11.6, 15.2, 17.2, 1.8), box(0, -12.6, 11.2, 10.6, 0.06, "#20242a", 1.8), label(0, -12.6, 8.5, 2.4, "microSD", 1.87),
    box(0, -4.6, 13.2, 2.6, 0.06, "#8b949e", 1.8), chip(-3, 3.9, 4.6, 2.8, 1.2), chip(4.6, 3.9, 3, 1.8, 1.1), ...smd([-3, 8.4], [1.5, 8.4], [5, 8.4]),
    label(0, 12.8, 12, 2.6, "SD CARD"),
  ],
  "lm2596-module": [
    ...electrolytic(-16, 0, 3.8, 7.5), ...electrolytic(16, 0, 3.8, 7.5), ...inductor(-5.7, -3.1, 8.6, 4),
    chip(5.4, -2.7, 6.6, 4.4, 1.8), metal(5.4, -6, 4.4, 1.4, 0.45), label(5.4, -2.7, 5.6, 1.6, "LM2596", 1.8, "#c8d0d8"), ...trimmer(-3, 6), chip(9.2, 5.6, 3, 2.4, 1.4),
  ],
  "mp1584-module": [...inductor(4.3, -0.5, 6.3, 3), chip(-3.4, -2.7, 3.6, 2.4, 1), label(-3.4, -2.7, 3.2, 1, "1584", 1, "#c8d0d8"), ...smallTrimmer(-5, 3), ...smd([-0.2, 3], [-0.2, 4.6])],
  "mt3608-module": [
    ...inductor(-6.8, 0, 6.3, 3), chip(1.2, -3, 2.8, 1.8, 1), label(1.2, -3, 2.5, 0.8, "3608", 1, "#c8d0d8"), ...trimmer(6, 2.6),
    ...smd([-1, 1.6], [-1, 3.4], [10.5, -3.8], [10.5, -2.2]),
  ],
  "tp4056-module": [
    metal(-10, 0, 5.6, 7.4, 2.8), box(-12.85, 0, 0.12, 5.4, 1.4, "#20242a", 0.7), chip(-0.7, 0, 4.4, 3.2, 1.4), label(-0.7, 0, 3.8, 1.1, "TP4056", 1.4, "#c8d0d8"),
    box(-0.7, -5.4, 1.2, 0.8, 0.5, "#ef4444"), box(1.5, -5.4, 1.2, 0.8, 0.5, "#3b82f6"), chip(6.4, -2.3, 2.8, 1.8, 1), chip(6.4, 2.3, 2.3, 2.3, 1),
    ...smd([-2.8, 5.4], [-0.7, 5.4], [1.4, 5.4]),
  ],
  "a4988": [chip(0, -2, 5, 5, 0.9), label(0, -2, 4.4, 1.3, "A4988", 0.9, "#c8d0d8"), ...roundTrimmer(0, 6.3), ...smd([-2.7, -7.1], [0, -7.1], [2.7, -7.1])],
  "drv8825": [chip(0, 2, 5, 5, 0.9), label(0, 2, 4.4, 1, "DRV8825", 0.9, "#c8d0d8"), ...roundTrimmer(0, -6.3), ...smd([-2.7, 7.1], [0, 7.1], [2.7, 7.1])],
  "relay-module": [
    box(0, -4.2, 15.2, 19, 15.5, BLUE_TRIM), label(0, -6.4, 12, 2.6, "SONGLE", 15.5), label(0, -2.6, 12.5, 2.2, "SRD-05VDC", 15.5),
    ...terminalBlock(0, -20.4, 3, 6.35, 7.6, 10), chip(-4, 10.7, 2.6, 1.7, 1), metal(2, 10, 3, 2, 1.2), can(7, 10.6, 0.65, 0.7, "#ef4444"),
    ...smd([-4.5, 14.6], [-1, 14.6], [3, 14.6]), label(0, 18.7, 10, 2.8, "RELAY"),
  ],
  "dfplayer-mini": [metal(0, -5.4, 12.7, 10.2, 1.8), box(0, -6.2, 9.6, 6.6, 0.06, "#20242a", 1.8), label(0, -6.2, 5, 2.4, "TF", 1.87), chip(0, 4.4, 4.9, 3.2, 1.2), ...smd([-4.6, 8.5], [-1.5, 8.5], [1.5, 8.5], [4.6, 8.5])],
  "arduino-pro-mini": [
    {kind: "box", x: 0, z: 0, w: 7, d: 7, h: 1.2, color: CHIP, turn: Math.PI / 4}, label(0, 0, 4, 1.4, "328P", 1.2, "#c8d0d8"),
    metal(0, -10.5, 4, 2.8, 1.3), can(0, -10.5, 0.85, 0.4, "#2a2f36", false, 1.3), metal(0, 10.8, 3.4, 1.8, 0.9), ...smd([-2, 13.3], [0, 13.3], [2, 13.3]),
    ...Array.from({length: 6}, (_, i) => can((i - 2.5) * PITCH, -15.2, 0.6, 0.03, BRASS, true)), label(0, 6.6, 8, 1.9, "PRO MINI"),
  ],
  "micro-usb-breakout": [metal(0, -4.7, 6.9, 5.3, 2.7), box(0, -7.4, 5.2, 0.12, 1.3, "#20242a", 0.7), ...holes(1.3, [-6, 0.1], [6, 0.1]), label(0, 2, 6, 2.2, "USB")],
  "pam8403-module": [
    chip(-0.8, -6.6, 7.9, 4.6, 1.6), label(-0.8, -6.6, 6.6, 1.6, "PAM8403", 1.6, "#c8d0d8"),
    ...electrolytic(-3.4, 1.4, 3, 5.4), ...smd([5.6, -10], [5.6, -7.6], [5.6, -4.4], [4.6, 1.2], [4.6, 3]),
    box(-1.4, 9.3, 12.4, 9.4, 9, "#1c8a78"), metal(6.1, 9.3, 2.6, 9.4, 9),
    {kind: "rod", x: 7.4, z: 9.3, r: 3.4, length: 3.4, color: METAL, metal: true, on: 4.5},
    {kind: "rod", x: 10.8, z: 9.3, r: 3, length: 11, color: "#dfe3e8", metal: true, on: 4.5},
  ],
};

export function isBreakoutModule(id: string): boolean {
  return id in LOOKS;
}

export function buildBreakoutModule(kit: SceneKit, id: string, def: AdvancedComponentDefinition): Group {
  const group = buildCustomModule(kit, def, "");
  const bounds = bodyBounds(def);
  const at = (x: number, y: number, z: number) => new Vector3(bounds.centerX + x, MODULE_BOARD_TOP + y, bounds.centerZ + z);
  const materialFor = (color: string, isMetal = false) => kit.standard(`breakout:${color}:${isMetal}`, isMetal
    ? {color, metalness: 1, roughness: 0.3}
    : {color, roughness: 0.55});
  for (const mark of LOOKS[id] ?? []) {
    const on = mark.on ?? 0;
    if (mark.kind === "box") {
      const part = kit.box(mark.w, mark.h, mark.d, materialFor(mark.color, mark.metal), at(mark.x, on + mark.h / 2, mark.z));
      if (mark.turn) part.rotation.y = mark.turn;
      group.add(part);
    } else if (mark.kind === "can") {
      group.add(cylinder(mark.r, mark.h, materialFor(mark.color, mark.metal), at(mark.x, on + mark.h / 2, mark.z)));
    } else if (mark.kind === "screen") {
      const pixelsPerMm = 24;
      const texture = paintedTexture(mark.w * pixelsPerMm, mark.d * pixelsPerMm, mark.paint);
      const screen = new Mesh(new PlaneGeometry(mark.w, mark.d), new MeshStandardMaterial({map: texture, roughness: 0.3, emissive: "#ffffff", emissiveMap: texture, emissiveIntensity: 0.25}));
      screen.rotation.x = -Math.PI / 2;
      screen.position.copy(at(mark.x, on + 0.02, mark.z));
      group.add(screen);
    } else if (mark.kind === "rod") {
      const rod = cylinder(mark.r, mark.length, materialFor(mark.color, mark.metal), at(mark.x + mark.length / 2, on, mark.z));
      rod.rotation.z = Math.PI / 2;
      group.add(rod);
    } else {
      addTopLabel(group, mark.text, mark.w, mark.d, at(mark.x, on + 0.02, mark.z), mark.color ?? "#eef3f8");
    }
  }
  return group;
}

// HC-SR04: its board stands on right-angle pins along the row, facing +z, with the two transducers
// out of its front and the crystal between them.
export function buildUltrasonicSensor(kit: SceneKit, def: AdvancedComponentDefinition): Group {
  const group = new Group();
  const bounds = bodyBounds(def);
  const boardHeight = 20, boardThickness = 1.6, bottom = 2.5, z = 0.8;
  const middle = bottom + boardHeight / 2;
  const pcb = kit.standard("sr04-pcb", {color: def.bodyColor ?? "#1a4fa0", roughness: 0.45});
  const shell = kit.standard("sr04-can", {color: METAL, metalness: 1, roughness: 0.3});
  const mesh = kit.standard("sr04-mesh", {color: "#30353c", roughness: 0.85});
  const gold = kit.standard("gold-pin", {color: "#e0b54a", metalness: 1, roughness: 0.28});
  const plastic = kit.blackPlasticMaterial;
  group.add(kit.box(bounds.width, boardHeight, boardThickness, pcb, new Vector3(bounds.centerX, middle, z)));
  for (const offset of def.pinOffsets) {
    const x = offset.dx * PITCH;
    group.add(kit.box(2.48, bottom, 2.48, plastic, new Vector3(x, bottom / 2, offset.dy * PITCH)));
    group.add(kit.box(0.64, bottom + 3, 0.64, gold, new Vector3(x, (bottom + 3) / 2 - 1.5, offset.dy * PITCH)));
  }
  for (const side of [-1, 1]) {
    const can3d = cylinder(8, 12, shell, new Vector3(bounds.centerX + side * 13, middle, z + 6.8));
    can3d.rotation.x = Math.PI / 2;
    group.add(can3d);
    const face = cylinder(6.6, 0.1, mesh, new Vector3(bounds.centerX + side * 13, middle, z + 12.85));
    face.rotation.x = Math.PI / 2;
    group.add(face);
  }
  group.add(kit.box(8, 3, 1.8, shell, new Vector3(bounds.centerX, middle + 5.6, z + 1.7)));
  const name = textPlane("HC-SR04", 9, 2.4, "#eef3f8");
  name.position.set(bounds.centerX, middle, z + 0.82);
  group.add(name);
  return group;
}
