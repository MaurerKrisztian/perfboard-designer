import {GridPos, holeName} from "./grid";
import {ProjectFile} from "./project-file";
import {partPins} from "./pin-positions";
import {PartKind} from "./part-refs";
import {ComponentUnit, getComponentDefinition, ledColorLabel} from "../parts/component-definitions";
import {advancedDefinitionFor} from "../parts/custom-parts";
import {IC_DEFINITIONS} from "../parts/ic-definitions";
import {CATALOG_CATEGORIES, CategoryId, getCategoryPath, isCategoryId} from "../parts/catalog-categories";
import {isModuleName} from "../parts/ic-package";
import {formatComponentValue, parseComponentValue} from "../parts/component-value";

// The board's parts as a list: every placed part with what it is, its value and where it sits (a
// bill of materials), and the same parts grouped into a shopping list. Worked out from a project
// file alone, like the nets, so the editor's Component List and any program reading the file agree.

export interface PartListRow {
  ref: string;
  kind: PartKind;
  // What it is, as the catalog names it: "Resistor", "NE555 Timer", "Header Pins (2 × 8)". A part
  // this version doesn't know keeps its definition id.
  part: string;
  // Its value, written out with its unit when it reads as one ("10k" is "10kΩ" for a resistor),
  // or an LED's colour ("Red"); absent when it has none.
  value?: string;
  // The value as a number in its unit (Ω, F, H), when it reads as one.
  amount?: number;
  // Its catalog category, and the names down to it, top level first: ["Passives", "Resistors"].
  category?: CategoryId;
  type: string[];
  pins: number;
  // Pin 1's hole.
  at: GridPos;
}

// Parts that are the same thing with the same value, for buying them.
export interface PartListGroup {
  part: string;
  value?: string;
  amount?: number;
  category?: CategoryId;
  type: string[];
  // In ref order; the quantity is how many.
  refs: string[];
}

const byRef = (a: string, b: string) => a.localeCompare(b, undefined, {numeric: true, sensitivity: "base"});

const kindOf = (category: CategoryId | undefined) => ({...(category ? {category} : {}), type: category ? getCategoryPath(category).map(c => c.name) : []});

// A value as written, read in `unit` when the part has one: written out the editor's way, with its
// amount. Text that doesn't read as one (a pot's "B10K") is kept as it is.
function valueOf(text: string | undefined, unit: ComponentUnit | undefined): {value?: string; amount?: number} {
  const trimmed = text?.trim();
  if (!trimmed) return {};
  const amount = unit ? parseComponentValue(trimmed, unit) : undefined;
  return amount === undefined || !unit ? {value: trimmed} : {value: formatComponentValue(amount, unit), amount};
}

// A chip's category: the one it was placed from, else a built-in chip's by its name, else custom.
function chipCategory(name: string, category: string | undefined): CategoryId {
  if (isCategoryId(category)) return category;
  return IC_DEFINITIONS.find(def => def.name === name)?.category ?? (isModuleName(name) ? "modules.custom" : "ics.custom");
}

// Every placed part, in ref order (R1, R2, R10...).
export function partList(project: ProjectFile): PartListRow[] {
  const pinsByRef = new Map(partPins(project).map(part => [part.ref, part.pins]));
  const place = (ref: string) => {
    const pins = pinsByRef.get(ref) ?? [];
    const first = pins.find(pin => pin.pin === 1) ?? pins[0];
    return {pins: pins.length, at: first?.at ?? [0, 0] as GridPos};
  };
  const rows: PartListRow[] = [];

  for (const ic of project.placedIcs) {
    rows.push({ref: ic.ref, kind: "ic", part: ic.name, ...kindOf(chipCategory(ic.name, ic.category)), ...place(ic.ref)});
  }
  for (const entry of project.placedStandardComponents) {
    const def = getComponentDefinition(entry.definitionId);
    // An LED's value is its colour, set or not.
    const value = def?.led && !entry.value?.trim() && entry.color ? {value: ledColorLabel(entry.color)} : valueOf(entry.value, def?.unit);
    rows.push({
      ref: entry.ref, kind: "standard-component", part: def?.name ?? entry.definitionId,
      ...value, ...kindOf(def?.category), ...place(entry.ref),
    });
  }
  for (const entry of project.placedAdvancedComponents) {
    const def = advancedDefinitionFor(entry);
    const size = def?.gridSizable ? ` (${entry.rows} × ${entry.cols})` : "";
    rows.push({
      ref: entry.ref, kind: "advanced-component", part: def ? `${def.name}${size}` : entry.definitionId,
      ...valueOf(entry.value, def?.unit), ...kindOf(def?.category), ...place(entry.ref),
    });
  }
  return rows.sort((a, b) => byRef(a.ref, b.ref));
}

// The rows grouped by part and value (the same amount, or the same text ignoring case): in catalog
// order, then by part, then smallest value first.
export function groupPartList(rows: PartListRow[]): PartListGroup[] {
  const groups = new Map<string, PartListGroup>();
  for (const row of rows) {
    const key = `${row.part}\n${row.amount ?? (row.value ?? "").toLowerCase()}`;
    const group = groups.get(key);
    if (group) {
      group.refs.push(row.ref);
      continue;
    }
    groups.set(key, {
      part: row.part, ...(row.value ? {value: row.value} : {}), ...(row.amount !== undefined ? {amount: row.amount} : {}),
      ...(row.category ? {category: row.category} : {}), type: row.type, refs: [row.ref],
    });
  }
  const catalogOrder = (group: PartListGroup) => {
    const index = CATALOG_CATEGORIES.findIndex(c => c.id === group.category);
    return index < 0 ? CATALOG_CATEGORIES.length : index;
  };
  const byValue = (a: PartListGroup, b: PartListGroup) => a.amount !== undefined && b.amount !== undefined
    ? a.amount - b.amount
    : byRef(a.value ?? "", b.value ?? "");
  return [...groups.values()]
    .map(group => ({...group, refs: group.refs.sort(byRef)}))
    .sort((a, b) => catalogOrder(a) - catalogOrder(b) || byRef(a.part, b.part) || byValue(a, b));
}

export const TYPE_SEPARATOR = " › ";

// Text a spreadsheet would run as a formula when it starts a cell. Names and values come from
// project files anyone can write, so such text is written with a leading ' to stay text.
const FORMULA_START = /^[=+\-@\t\r]/;

// A CSV field, quoted when it has to be.
function csvField(value: string | number): string {
  const text = typeof value === "string" && FORMULA_START.test(value) ? `'${value}` : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function csv(lines: (string | number)[][]): string {
  return lines.map(line => line.map(csvField).join(",")).join("\r\n") + "\r\n";
}

// One line per part, holes named as printed on the board ("B2").
export function partListCsv(rows: PartListRow[]): string {
  return csv([
    ["Ref", "Part", "Value", "Type", "Pins", "Position"],
    ...rows.map(row => [row.ref, row.part, row.value ?? "", row.type.join(TYPE_SEPARATOR), row.pins, holeName(row.at)]),
  ]);
}

// One line per group, with how many and which.
export function groupedPartListCsv(groups: PartListGroup[]): string {
  return csv([
    ["Qty", "Part", "Value", "Type", "Refs"],
    ...groups.map(group => [group.refs.length, group.part, group.value ?? "", group.type.join(TYPE_SEPARATOR), group.refs.join(" ")]),
  ]);
}
