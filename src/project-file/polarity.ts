import {Netlist, NetPin} from "./nets";
import {ProjectFile} from "./project-file";
import {PartKind} from "./part-refs";
import {MINUS, PLUS, Rail, RailLevel, supplyRails} from "./rails";
import {getComponentDefinition} from "../parts/component-definitions";
import {advancedDefinitionFor} from "../parts/custom-parts";

// Parts that look to be in the wrong way round, judged only by the supply rails their ends are on
// (rails.ts), from a project file and its nets like the nets themselves. Only what the rails
// settle is reported, so a part between two signals is never flagged:
// - a part that must face the supply (an LED, an electrolytic capacitor, a part with + and − pins
//   such as a buzzer) is backwards when both its ends are on rails the wrong way round, when its
//   negative end (cathode, −) is on a positive supply no other rail is known to be above, or when
//   its positive end (anode, +) is on ground with no negative supply on the board (or on the
//   lowest negative supply);
// - a plain diode may face either way on purpose (a flyback diode's cathode is on the supply), so
//   it's reported only when it conducts straight across the supply: its anode on a rail above the
//   one its cathode is on.

export interface PolarityWarning {
  ref: string;
  kind: PartKind;
  // What the part is, in a few words: "LED", "electrolytic capacitor".
  part: string;
  // Its positive end then its negative one: the anode or +, then the cathode or −.
  ends: [NetPin, NetPin];
  problem: "backwards" | "across-supply";
  // Why, as a clause: "its cathode (K) is on VCC".
  detail: string;
  // What goes wrong, then what to do, each a sentence: "It won't light.", "Turn it round."
  consequence?: string;
  fix: string;
  // All of it in one, for a list of problems: "D1 (LED) looks backwards: its cathode (K) is on
  // VCC. It won't light. Turn it round."
  message: string;
}

interface Polarized {
  ref: string;
  kind: PartKind;
  part: string;
  ends: [NetPin, NetPin];
  // Must its positive end face the supply's positive side? A plain diode's needn't.
  mustFace: boolean;
  consequence?: string;
  fix: string;
}

const LEVEL: Record<RailLevel, number> = {negative: 0, ground: 1, positive: 2};

// A catalog name in a sentence: "Electrolytic Capacitor" → "electrolytic capacitor", "LED (3 mm)" → "LED".
function inSentence(name: string): string {
  return name.replace(/\s*\(.*\)\s*$/, "").split(" ").map(word => /^[A-Z0-9-]+$/.test(word) ? word : word.toLowerCase()).join(" ");
}

// "anode (A)", "cathode (K)", "+ lead", "− pin".
function endName(pin: NetPin, lead: string): string {
  const label = pin.label?.trim() ?? "";
  if (label === "A") return "anode (A)";
  if (label === "K") return "cathode (K)";
  return `${MINUS.test(label) ? "−" : "+"} ${lead}`;
}

const isPositiveEnd = (pin: NetPin) => pin.label === "A" || PLUS.test(pin.label?.trim() ?? "");
const isNegativeEnd = (pin: NetPin) => pin.label === "K" || MINUS.test(pin.label?.trim() ?? "");

// Every part on the board with a positive and a negative end.
function polarizedParts(project: ProjectFile, netlist: Netlist): Polarized[] {
  const pinsOf = new Map<string, NetPin[]>();
  for (const net of netlist.nets) for (const pin of net.pins) pinsOf.set(pin.ref, [...(pinsOf.get(pin.ref) ?? []), pin]);
  const ends = (ref: string): [NetPin, NetPin] | undefined => {
    const pins = pinsOf.get(ref) ?? [];
    const positive = pins.filter(isPositiveEnd);
    const negative = pins.filter(isNegativeEnd);
    return positive.length === 1 && negative.length === 1 ? [positive[0], negative[0]] : undefined;
  };
  const parts: Polarized[] = [];

  for (const entry of project.placedStandardComponents) {
    const def = getComponentDefinition(entry.definitionId);
    const found = def?.leadLabels && ends(entry.ref);
    if (!def || !found) continue;
    const capacitor = PLUS.test(found[0].label ?? "");
    parts.push({
      ref: entry.ref, kind: "standard-component", part: inSentence(def.name), ends: found,
      mustFace: !!def.led || capacitor,
      ...(def.led ? {consequence: "It won't light."} : capacitor ? {consequence: "In backwards it can overheat and burst."} : {}),
      fix: "Turn it round.",
    });
  }
  for (const entry of project.placedAdvancedComponents) {
    const def = advancedDefinitionFor(entry);
    // A power source's + and − are the rails themselves.
    const found = def && !def.powerSource && ends(entry.ref);
    if (!def || !found) continue;
    parts.push({
      ref: entry.ref, kind: "advanced-component", part: entry.custom ? entry.custom.name : inSentence(def.name), ends: found,
      mustFace: true, fix: "Swap the wires on its + and − pins.",
    });
  }
  return parts;
}

export function polarityWarnings(project: ProjectFile, netlist: Netlist): PolarityWarning[] {
  const rails = supplyRails(project, netlist);
  // The rails the board's supply is on, to tell whether another may be above or below one.
  const all = [...rails.values()].filter(rail => rail.wired);
  // Whether another rail may be above this positive supply: one stating a higher voltage.
  const isTop = (rail: Rail) => !all.some(other => other !== rail && other.level === "positive"
    && other.volts !== undefined && (rail.volts === undefined || other.volts > rail.volts));
  // Whether another rail may be below this one: below ground, any negative supply; below a
  // negative supply, one stating a lower voltage.
  const isBottom = (rail: Rail) => rail.level === "ground"
    ? !all.some(other => other.level === "negative")
    : !all.some(other => other !== rail && other.level === "negative" && other.volts !== undefined && (rail.volts === undefined || other.volts < rail.volts));

  const warnings: PolarityWarning[] = [];
  for (const part of polarizedParts(project, netlist)) {
    const [high, low] = part.ends;
    const highNet = netlist.netAt(high.at);
    const lowNet = netlist.netAt(low.at);
    // An end in a cut hole, or both ends on one net (shorted out), is reported by other checks.
    if (!highNet || !lowNet || highNet === lowNet) continue;
    const highRail = rails.get(highNet);
    const lowRail = rails.get(lowNet);
    const lead = part.kind === "standard-component" ? "lead" : "pin";
    const highEnd = endName(high, lead);
    const lowEnd = endName(low, lead);

    let problem: PolarityWarning["problem"] | undefined;
    let detail = "";
    if (part.mustFace) {
      problem = "backwards";
      if (highRail && lowRail) {
        if (LEVEL[highRail.level] < LEVEL[lowRail.level]) detail = `its ${highEnd} is on ${highRail.name} and its ${lowEnd} on ${lowRail.name}`;
      } else if (lowRail?.level === "positive" && isTop(lowRail)) {
        detail = `its ${lowEnd} is on ${lowRail.name}`;
      } else if (highRail && highRail.level !== "positive" && isBottom(highRail)) {
        detail = `its ${highEnd} is on ${highRail.name}`;
      }
    } else if (highRail && lowRail && LEVEL[highRail.level] > LEVEL[lowRail.level]) {
      problem = "across-supply";
      detail = `its ${highEnd} is on ${highRail.name} and its ${lowEnd} on ${lowRail.name}`;
    }
    if (!problem || !detail) continue;

    const backwards = problem === "backwards";
    const consequence = backwards ? part.consequence : "That shorts the supply.";
    const fix = backwards ? part.fix : "If it's there to guard against reverse polarity, turn it round; otherwise check where its leads go.";
    const head = backwards ? "looks backwards" : "conducts straight across the supply";
    warnings.push({
      ref: part.ref, kind: part.kind, part: part.part, ends: part.ends, problem, detail,
      ...(consequence ? {consequence} : {}), fix,
      message: `${part.ref} (${part.part}) ${head}: ${detail}.${consequence ? ` ${consequence}` : ""} ${fix}`,
    });
  }
  return warnings.sort((a, b) => a.ref.localeCompare(b.ref, undefined, {numeric: true, sensitivity: "base"}));
}
