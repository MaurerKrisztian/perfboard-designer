import {Utils} from "../utils/utils";
import {CUSTOM_PART_ID, CUSTOM_REF_PREFIX, CustomPartPin, CustomPartSpec, MAX_CUSTOM_PART_SIDE} from "../parts/custom-parts";
import {CustomParts} from "./custom-parts";
import {setActiveTool} from "./active-tool";

// The custom module creator: a part with pins anywhere, made by clicking the holes of its board.
// Opened from the Components panel (Custom module…, or ✎ on one of them). Saving a new one arms it
// for placing; saving an edit changes the catalog entry only, never parts already placed.

const COLORS = [
  {name: "Blue", value: "#1d4ed8"},
  {name: "Green", value: "#15803d"},
  {name: "Red", value: "#b91c1c"},
  {name: "Purple", value: "#6d28d9"},
  {name: "Black", value: "#1f2937"},
];

const modal = Utils.getSafeHtmlElement("customPartModal");
const title = Utils.getSafeHtmlElement("customPartTitle");
const nameInput = Utils.getSafeHtmlElement<HTMLInputElement>("customPartName");
const refInput = Utils.getSafeHtmlElement<HTMLInputElement>("customPartRef");
const colsInput = Utils.getSafeHtmlElement<HTMLInputElement>("customPartCols");
const rowsInput = Utils.getSafeHtmlElement<HTMLInputElement>("customPartRows");
const colorsEl = Utils.getSafeHtmlElement("customPartColors");
const grid = Utils.getSafeHtmlElement("customPartGrid");
const pinList = Utils.getSafeHtmlElement("customPartPins");
const pinCount = Utils.getSafeHtmlElement("customPartPinCount");
const errorEl = Utils.getSafeHtmlElement("customPartError");

// What's being made: its size, colour and pins in order (pin 1 first).
let cols = 6;
let rows = 3;
let color = COLORS[0].value;
let pins: CustomPartPin[] = [];
// The catalog entry being edited; undefined while making a new one.
let editingId: string | undefined;

const at = (col: number, row: number) => pins.findIndex(pin => pin.at[0] === col && pin.at[1] === row);

// A hole's tooltip: pin `index`'s number and name, or how to add one (index -1).
function holeTitle(index: number): string {
  if (index < 0) return "Click to add a pin here";
  const label = pins[index].label;
  return `Pin ${index + 1}${label ? ` (${label})` : ""}: click to remove`;
}

function readSide(input: HTMLInputElement, fallback: number): number {
  const n = parseInt(input.value, 10);
  return Number.isNaN(n) ? fallback : Math.min(MAX_CUSTOM_PART_SIDE, Math.max(1, n));
}

function renderColors() {
  colorsEl.replaceChildren(...COLORS.map(choice => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "custom-part-color";
    btn.style.background = choice.value;
    btn.title = choice.name;
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-label", choice.name);
    btn.setAttribute("aria-checked", String(choice.value === color));
    btn.addEventListener("click", () => {
      color = choice.value;
      renderColors();
      renderGrid();
    });
    return btn;
  }));
}

function renderGrid() {
  grid.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
  grid.style.background = color;
  const holes: HTMLButtonElement[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = at(col, row);
      const hole = document.createElement("button");
      hole.type = "button";
      hole.className = `custom-part-hole${index > -1 ? " is-pin" : ""}${index === 0 ? " is-first" : ""}`;
      hole.textContent = index > -1 ? String(index + 1) : "";
      hole.title = holeTitle(index);
      hole.addEventListener("click", () => togglePin(col, row));
      holes.push(hole);
    }
  }
  grid.replaceChildren(...holes);
  pinCount.textContent = pins.length ? String(pins.length) : "";
}

// One name box per pin, in pin order. Kept apart from the grid so typing a name doesn't redraw it.
function renderPinList() {
  pinList.replaceChildren(...pins.map((pin, i) => {
    const row = document.createElement("label");
    const number = document.createElement("span");
    number.className = "pin-num";
    number.textContent = String(i + 1);
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 24;
    input.placeholder = `Pin ${i + 1}`;
    input.value = pin.label ?? "";
    input.addEventListener("input", () => {
      pin.label = input.value;
      const [col, row] = pin.at;
      const hole = grid.children[row * cols + col] as HTMLElement | undefined;
      if (hole) hole.title = holeTitle(i);
    });
    row.append(number, input);
    return row;
  }));
}

function render() {
  renderGrid();
  renderPinList();
}

function togglePin(col: number, row: number) {
  const index = at(col, row);
  if (index > -1) pins.splice(index, 1);
  else pins.push({at: [col, row]});
  errorEl.textContent = "";
  render();
}

// Adds a pin on every hole of one edge that hasn't one, in reading order.
function fill(edge: string) {
  if (edge === "clear") {
    pins = [];
  } else {
    const holes: [number, number][] = edge === "top" || edge === "bottom"
      ? Array.from({length: cols}, (_, col) => [col, edge === "top" ? 0 : rows - 1])
      : Array.from({length: rows}, (_, row) => [edge === "left" ? 0 : cols - 1, row]);
    for (const [col, row] of holes) if (at(col, row) < 0) pins.push({at: [col, row]});
  }
  errorEl.textContent = "";
  render();
}

function resize() {
  cols = readSide(colsInput, cols);
  rows = readSide(rowsInput, rows);
  // Pins that no longer fit go.
  pins = pins.filter(pin => pin.at[0] < cols && pin.at[1] < rows);
  render();
}

export function openCustomPartEditor(spec?: CustomPartSpec) {
  editingId = spec?.id;
  title.textContent = spec ? "Edit Custom Module" : "New Custom Module";
  nameInput.value = spec?.name ?? "";
  refInput.value = spec?.refPrefix ?? CUSTOM_REF_PREFIX;
  cols = spec?.cols ?? 6;
  rows = spec?.rows ?? 3;
  colsInput.value = String(cols);
  rowsInput.value = String(rows);
  color = spec?.color ?? COLORS[0].value;
  // A new module starts as the usual breakout: a row of pins along its bottom edge.
  pins = spec ? spec.pins.map(pin => ({at: [pin.at[0], pin.at[1]], ...(pin.label ? {label: pin.label} : {})})) : [];
  if (!spec) for (let col = 1; col < cols - 1; col++) pins.push({at: [col, rows - 1]});
  errorEl.textContent = "";
  renderColors();
  render();
  modal.style.display = "flex";
  setTimeout(() => nameInput.focus());
}

function close() {
  modal.style.display = "none";
}

function save() {
  const refPrefix = refInput.value.trim().toUpperCase();
  if (!/^[A-Z]{1,4}$/.test(refPrefix)) {
    errorEl.textContent = "Ref letters are 1 to 4 letters, such as M or MOD.";
    refInput.focus();
    return;
  }
  if (!pins.length) {
    errorEl.textContent = "Add at least one pin: click a hole on the board above.";
    return;
  }
  const spec: CustomPartSpec = {
    name: nameInput.value.trim() || "Custom Module",
    refPrefix,
    cols, rows, color,
    pins: pins.map(pin => ({at: pin.at, ...(pin.label?.trim() ? {label: pin.label.trim()} : {})})),
  };
  close();
  if (editingId) {
    CustomParts.update(editingId, spec);
    return;
  }
  // Ready to place straight away.
  const part = CustomParts.add(spec);
  setActiveTool({kind: "advanced-component", definitionId: CUSTOM_PART_ID, rotation: 0, custom: part});
}

colsInput.addEventListener("change", resize);
rowsInput.addEventListener("change", resize);
document.querySelectorAll<HTMLButtonElement>("#customPartModal [data-fill]").forEach(btn => {
  btn.addEventListener("click", () => fill(btn.dataset.fill ?? ""));
});
Utils.getSafeHtmlElement("saveCustomPartBtn").addEventListener("click", save);
Utils.getSafeHtmlElement("cancelCustomPartBtn").addEventListener("click", close);
Utils.getSafeHtmlElement("closeCustomPartBtn").addEventListener("click", close);
modal.addEventListener("click", e => {
  if (e.target === modal) close();
});
modal.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    e.stopPropagation();
    close();
  }
});
