import type {Part} from "../interfaces/placed-part.interface";
import {IDot} from "../interfaces/dot.interface";
import {ILine} from "../interfaces/line.interface";
import {Canvas} from "../state/Canvas";
import {DotState} from "../state/DotState";
import {LineState} from "../state/LineState";
import {PartState} from "../state/PartState";
import {SelectionState} from "../state/SelectionState";
import {ToolState} from "../state/ToolState";
import {GridPos, gridToPx, holesAlong, toGridPos} from "../project-file/grid";
import {SavedWire} from "../project-file/project-file";
import {buildDotIndex, dotPositionKey} from "./dot-lookup";
import {linePoints} from "./line-path";
import {lineFromWire, PartEntry, partEntry, partFromEntry} from "./project/board-entries";
import {savedWire} from "./project/save-project";
import {placeItems} from "./placed-parts";
import {deleteItems} from "./delete-selection";
import {setActiveTool} from "./active-tool";
import {redrawCanvas} from "./draw-canvas";
import {tell} from "./ask-dialog";

// Copy, cut, paste and duplicate for the selected parts and wires (Ctrl+C, X, V and D, and the
// selection bar's Duplicate). A copy is their project-file entries with every hole counted from
// the copy's top-left corner, so it pastes onto any board, another project's too, and nothing
// done to the board afterwards changes it. Pasted parts are new parts: new refs (the lowest free
// for their kind) and new identities. Pasted wires don't join or split the wires they land on.

interface Copy {
  parts: PartEntry[];
  wires: SavedWire[];
  // Its size in holes.
  cols: number;
  rows: number;
  // Where its top-left corner was on the board it was copied from.
  from: GridPos;
  // The holes it uses, from its corner: all that each part's box covers, and each wire's ends
  // and corners. Where it lands, these should be free.
  cells: GridPos[];
}

let clipboard: Copy | undefined;

const holeKey = ([col, row]: GridPos) => `${col},${row}`;

// Every hole in the box from `a` to `b`.
function holesBetween(a: GridPos, b: GridPos): GridPos[] {
  const holes: GridPos[] = [];
  for (let col = Math.min(a[0], b[0]); col <= Math.max(a[0], b[0]); col++) {
    for (let row = Math.min(a[1], b[1]); row <= Math.max(a[1], b[1]); row++) holes.push([col, row]);
  }
  return holes;
}

// The corners of the box around a part: its pins and the holes it covers.
function partBox(part: Part): [GridPos, GridPos] {
  const holes = [...part.getOccupiedPositions(), ...part.getPinPositions()].map(toGridPos);
  const cols = holes.map(([col]) => col), rows = holes.map(([, row]) => row);
  return [[Math.min(...cols), Math.min(...rows)], [Math.max(...cols), Math.max(...rows)]];
}

function shiftedEntry(saved: PartEntry, [dc, dr]: GridPos): PartEntry {
  const move = ([col, row]: GridPos): GridPos => [col + dc, row + dr];
  if (saved.kind === "standard-component") return {kind: saved.kind, entry: {...saved.entry, from: move(saved.entry.from), to: move(saved.entry.to)}};
  if (saved.kind === "ic") return {kind: saved.kind, entry: {...saved.entry, at: move(saved.entry.at)}};
  return {kind: saved.kind, entry: {...saved.entry, at: move(saved.entry.at)}};
}

function shiftedWire(wire: SavedWire, [dc, dr]: GridPos): SavedWire {
  const move = ([col, row]: GridPos): GridPos => [col + dc, row + dr];
  return {...wire, from: move(wire.from), to: move(wire.to), ...(wire.via ? {via: wire.via.map(move)} : {})};
}

function copyOf(parts: Part[], lines: ILine[]): Copy | undefined {
  if (!parts.length && !lines.length) return undefined;
  const boxes = parts.map(partBox);
  const wireHoles = lines.flatMap(line => linePoints(line).map(toGridPos));
  const corners = [...boxes.flat(), ...wireHoles];
  const left = Math.min(...corners.map(([col]) => col)), top = Math.min(...corners.map(([, row]) => row));
  const right = Math.max(...corners.map(([col]) => col)), bottom = Math.max(...corners.map(([, row]) => row));
  const back: GridPos = [-left, -top];
  return {
    // A copy of its own: a part's nested fields (a custom part's spec) mustn't be shared.
    parts: parts.map(part => {
      const saved = structuredClone(partEntry(part));
      delete saved.entry.instanceId;
      saved.entry.ref = "";
      return shiftedEntry(saved, back);
    }),
    wires: lines.map(line => shiftedWire(savedWire(line), back)),
    cols: right - left + 1,
    rows: bottom - top + 1,
    from: [left, top],
    cells: [...boxes.flatMap(([a, b]) => holesBetween(a, b)), ...wireHoles].map(([col, row]) => [col - left, row - top]),
  };
}

function boardSize(): {cols: number; rows: number} {
  return {cols: holesAlong(Canvas.gridWidth), rows: holesAlong(Canvas.gridHeight)};
}

function fits(copy: Copy, [col, row]: GridPos): boolean {
  const {cols, rows} = boardSize();
  return col >= 0 && row >= 0 && col + copy.cols <= cols && row + copy.rows <= rows;
}

// The holes the board's parts and wires use, as the copy's cells count them.
function usedHoles(): Set<string> {
  const used = new Set<string>();
  for (const part of PartState.parts) for (const hole of holesBetween(...partBox(part))) used.add(holeKey(hole));
  for (const line of LineState.lines) for (const dot of linePoints(line)) used.add(holeKey(toGridPos(dot)));
  return used;
}

// Where a copy goes with no pointer to put it at: beside where it was copied from (below, right,
// above or left of it, a hole apart), else the first free place on the board from the top left.
// Nowhere free: overlapping, at the first of those it fits. Undefined: it's bigger than the board.
function placeFor(copy: Copy): GridPos | undefined {
  const [col, row] = copy.from;
  const beside: GridPos[] = [[col, row + copy.rows + 1], [col + copy.cols + 1, row], [col, row - copy.rows - 1], [col - copy.cols - 1, row]];
  const {cols, rows} = boardSize();
  const anywhere: GridPos[] = [];
  for (let r = 0; r + copy.rows <= rows; r++) for (let c = 0; c + copy.cols <= cols; c++) anywhere.push([c, r]);
  const places = [...beside, ...anywhere].filter(place => fits(copy, place));
  const used = usedHoles();
  const isFree = ([c, r]: GridPos) => copy.cells.every(([dc, dr]) => !used.has(holeKey([c + dc, r + dr])));
  return places.find(isFree) ?? places[0];
}

// The copy with its top-left corner at `hole`, moved back onto the board as far as it has to be.
function placeAt(copy: Copy, [col, row]: GridPos): GridPos | undefined {
  const {cols, rows} = boardSize();
  if (copy.cols > cols || copy.rows > rows) return undefined;
  return [Math.max(0, Math.min(col, cols - copy.cols)), Math.max(0, Math.min(row, rows - copy.rows))];
}

// Puts a copy on the board with its top-left corner at `corner`, which it fits from, as one
// undoable step, and selects what it put there. In Select mode, so it can be dragged away.
function putDown(copy: Copy, corner: GridPos) {
  if (ToolState.active.kind !== "select") setActiveTool({kind: "select"});
  const dots = buildDotIndex();
  const dotAt = ([col, row]: GridPos) => dots.get(dotPositionKey(gridToPx(col + corner[0]), gridToPx(row + corner[1]))) as IDot;
  placeItems(copy.parts.map(saved => partFromEntry(structuredClone(saved), dotAt)), copy.wires.map(wire => lineFromWire(wire, dotAt)));
  redrawCanvas();
}

function tooBig() {
  void tell("No room on the board", "What you're pasting is bigger than the board. Make the board bigger in the Board section, then paste again.");
}

export function hasCopy(): boolean {
  return clipboard !== undefined;
}

// Whether there are parts or wires selected to copy.
export function canCopy(): boolean {
  return SelectionState.parts.length + SelectionState.lines.length > 0;
}

// Ctrl+C: the selected parts and wires, to paste later.
export function copySelection() {
  clipboard = copyOf(SelectionState.parts, SelectionState.lines) ?? clipboard;
}

// Ctrl+X: copies the selected parts and wires, then deletes them.
export function cutSelection() {
  const copy = copyOf(SelectionState.parts, SelectionState.lines);
  if (!copy) return;
  clipboard = copy;
  deleteItems(SelectionState.parts, SelectionState.lines);
  SelectionState.clear();
  redrawCanvas();
}

// Ctrl+V: what was copied, with its top-left corner at the hole under the pointer (moved back
// onto the board if it would hang off it), or else beside where it was copied from.
export function pasteClipboard() {
  if (!clipboard) return;
  const hole = DotState.hoverDot;
  const corner = hole ? placeAt(clipboard, toGridPos(hole)) : placeFor(clipboard);
  if (!corner) return tooBig();
  putDown(clipboard, corner);
}

// Ctrl+D or the selection bar's Duplicate: a copy of the selected parts and wires beside them,
// where there's room, leaving what's been copied alone.
export function duplicateSelection() {
  const copy = copyOf(SelectionState.parts, SelectionState.lines);
  if (!copy) return;
  const corner = placeFor(copy);
  if (!corner) return tooBig();
  putDown(copy, corner);
}
