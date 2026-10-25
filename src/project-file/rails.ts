import {isPowerName, isPowerNet, Net, Netlist, NetPin} from "./nets";
import {ProjectFile} from "./project-file";
import {advancedDefinitionFor} from "../parts/custom-parts";

// Which nets are supply rails, and which side of the supply each one is: the positive supply,
// ground or a negative supply. Worked out from a project file and its nets alone, like the nets,
// for checks that need to know which way round a part should go (polarity.ts). Three things mark a
// net as a rail:
// - a pin named after one, as the nets are named (nets.ts): a chip's VCC or GND, a module's 5V;
// - a power source's terminals: a battery holder's + is the positive supply, its − ground;
// - a note on one of the net's holes that names a rail: "+9V", "GND".
// A net marked as two rails that can't be one (VCC and GND, 5V and 3V3) is a short, not a rail, so
// it's left out.

export type RailLevel = "positive" | "ground" | "negative";

export interface Rail {
  level: RailLevel;
  // The voltage its name states (5 for "5V" or "+5V", 3.3 for "3V3"); absent for "VCC" and the like.
  volts?: number;
  // What to call it in a sentence: "VCC", "+9V", "BT1's + terminal".
  name: string;
  // Whether it's wired to anything: a lone pin naming a rail (a chip's VCC not wired yet) says
  // nothing about the board's supply.
  wired: boolean;
}

// Which side of the supply a rail's name says: "low" is ground on a single supply and the negative
// supply on a split one (VSS, VEE, an op amp's V-).
export type RailSide = RailLevel | "low";

const GROUND = /^([ADP]?GND|0V)$/i;
const LOW = /^(VSS\d*|VEE\d*|V-)$/i;
// "5V", "+12V", "-5V", "3V3".
const STATED = /^([+-]?)(\d+(?:\.\d+)?)V(\d*)$/i;
// A power source's terminal or a polarized lead: "+", or "-" or "−".
export const PLUS = /^\+$/;
export const MINUS = /^[-−]$/;

// The voltage a rail's name states, or undefined when it states none.
export function railVolts(name: string): number | undefined {
  const match = STATED.exec(name.trim());
  if (!match) return undefined;
  const [, sign, whole, fraction] = match;
  const volts = Number(fraction ? `${whole}.${fraction}` : whole);
  return sign === "-" ? -volts : volts;
}

// Which side of the supply a rail's name says it is; undefined for a name that isn't a rail's.
export function railSide(name: string): RailSide | undefined {
  const text = name.trim();
  if (!isPowerName(text)) return undefined;
  if (GROUND.test(text)) return "ground";
  if (LOW.test(text)) return "low";
  const volts = railVolts(text);
  if (volts !== undefined) return volts < 0 ? "negative" : volts === 0 ? "ground" : "positive";
  return "positive";
}

interface Mark {
  side: RailSide;
  volts?: number;
  // What it says, in a sentence: "VCC", "BT1's + terminal", "+9V".
  name: string;
  // The pin that marks it; absent for a hole's note.
  pin?: NetPin;
}

// Whether rails marked so, joined in one net, are shorted together: a positive supply with ground
// or a negative supply, ground with a negative supply, or supplies of two different stated
// voltages. Names for one rail aren't: VCC and 5V, GND and AGND, GND and an op amp's V-.
function shorted(marks: Mark[]): boolean {
  const sides = new Set(marks.map(mark => mark.side));
  if (sides.has("positive") && (sides.has("ground") || sides.has("negative") || sides.has("low"))) return true;
  if (sides.has("ground") && sides.has("negative")) return true;
  return new Set(marks.flatMap(mark => mark.volts === undefined ? [] : [mark.volts])).size > 1;
}

// What marks each net as a rail: its pins named after one, power sources' terminals on it, and
// notes on its holes, in that order.
function railMarks(project: ProjectFile, netlist: Netlist): Map<Net, Mark[]> {
  const marked = new Map<Net, Mark[]>();
  const add = (net: Net, mark: Mark) => marked.set(net, [...(marked.get(net) ?? []), mark]);
  const sources = new Set(project.placedAdvancedComponents.filter(part => advancedDefinitionFor(part)?.powerSource).map(part => part.ref));

  for (const net of netlist.nets) {
    const terminals: Mark[] = [];
    for (const pin of net.pins) {
      const label = pin.label?.trim() ?? "";
      if (sources.has(pin.ref) && (PLUS.test(label) || MINUS.test(label))) {
        const plus = PLUS.test(label);
        terminals.push({side: plus ? "positive" : "ground", name: `${pin.ref}'s ${plus ? "+" : "−"} terminal`, pin});
        continue;
      }
      // Named as the net is: a chip's or module's pin, not a two-lead part's lead.
      const side = pin.kind === "standard-component" ? undefined : railSide(label);
      if (side) add(net, {side, volts: railVolts(label), name: label, pin});
    }
    for (const mark of terminals) add(net, mark);
  }
  for (const pad of project.pads) {
    const note = pad.note.trim();
    const side = railSide(note);
    const net = side && netlist.netAt(pad.at);
    if (side && net) add(net, {side, volts: railVolts(note), name: note});
  }
  return marked;
}

// Every net that's a supply rail, with which side of the supply it is.
export function supplyRails(project: ProjectFile, netlist: Netlist): Map<Net, Rail> {
  const rails = new Map<Net, Rail>();
  const lowOnly: Net[] = [];
  for (const [net, marks] of railMarks(project, netlist)) {
    if (shorted(marks)) continue;
    const sides = new Set(marks.map(mark => mark.side));
    const volts = marks.find(mark => mark.volts !== undefined)?.volts;
    // Named as the Nets panel names it, when its pins name it.
    const name = isPowerNet(net) && net.name ? net.name : marks[0].name;
    const level: RailLevel | undefined = sides.has("positive") ? "positive" : sides.has("ground") ? "ground" : sides.has("negative") ? "negative" : undefined;
    if (!level) lowOnly.push(net);
    const wired = net.pins.length > 1 || net.wires.length > 0 || marks.some(mark => !mark.pin);
    rails.set(net, {level: level ?? "ground", ...(volts !== undefined ? {volts} : {}), name, wired});
  }
  // VSS, VEE or V- on a net of its own is the negative supply if the board's ground is another net.
  const hasGround = [...rails].some(([net, rail]) => rail.level === "ground" && rail.wired && !lowOnly.includes(net));
  if (hasGround) for (const net of lowOnly) (rails.get(net) as Rail).level = "negative";
  return rails;
}

export interface ShortedRails {
  net: Net;
  // Each rail it joins, once: "GND", "VCC", "BT1's + terminal", "+9V".
  rails: string[];
  // The pins that say so.
  pins: NetPin[];
}

// Nets joining supply rails that can't be one rail: a short circuit (see shorted() above).
export function shortedRails(project: ProjectFile, netlist: Netlist): ShortedRails[] {
  const found: ShortedRails[] = [];
  for (const [net, marks] of railMarks(project, netlist)) {
    if (!shorted(marks)) continue;
    const rails = marks.map(mark => mark.name).filter((name, i, names) => names.findIndex(n => n.toLowerCase() === name.toLowerCase()) === i);
    found.push({net, rails, pins: marks.flatMap(mark => mark.pin ? [mark.pin] : [])});
  }
  return found;
}
