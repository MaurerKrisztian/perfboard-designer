import type {Part} from "../interfaces/placed-part.interface";
import type {ILine} from "../interfaces/line.interface";
import type {IChange} from "../interfaces/change.interface";
import {PartState} from "../state/PartState";
import {LineState} from "../state/LineState";
import {HistoryState} from "../state/HistoryState";
import {SelectionState} from "../state/SelectionState";
import {BoardRefs, refPrefixFor} from "../project-file/part-refs";
import {RequirementsState} from "../state/RequirementsState";
import {includeRequiredComponents} from "../project-file/requirements";

// Stacking group of each kind within PartState.parts.
const KIND_ORDER: Record<Part["kind"], number> = {"ic": 0, "standard-component": 1, "advanced-component": 2};

// Puts a part on the board, on top of the others of its kind. Records no history: for loading,
// undo/redo, and callers that record their own entry.
export function addToBoard(part: Part) {
  const rank = KIND_ORDER[part.kind];
  const index = PartState.parts.findIndex(p => KIND_ORDER[p.kind] > rank);
  PartState.parts.splice(index === -1 ? PartState.parts.length : index, 0, part);
}

// Takes a part off the board, dropping it from the selection. Records no history. Returns false
// if it wasn't on the board.
export function takeOffBoard(part: Part): boolean {
  SelectionState.forget({part});
  const index = PartState.parts.indexOf(part);
  if (index < 0) return false;
  PartState.parts.splice(index, 1);
  return true;
}

function giveRef(part: Part) {
  const refs = new BoardRefs(PartState.parts.map(p => p.ref));
  part.ref = refs.claimNext(refPrefixFor(part));
}

// New parts join the circuit requirements' inventory (when there are requirements), as the
// change that does it; undefined when there's nothing to change.
function requireParts(parts: Part[]): IChange | undefined {
  const before = RequirementsState.current;
  if (!before || !parts.length) return undefined;
  const next = includeRequiredComponents(before, {
    placedIcs: parts.flatMap(part => part.kind === "ic" ? [part.serialize()] : []),
    placedStandardComponents: parts.flatMap(part => part.kind === "standard-component" ? [part.serialize()] : []),
    placedAdvancedComponents: parts.flatMap(part => part.kind === "advanced-component" ? [part.serialize()] : []),
  });
  RequirementsState.current = next;
  return {type: "set", kind: "requirements", from: before, to: next};
}

// Places a new part as one undoable step, and selects it.
export function placePart(part: Part) {
  giveRef(part);
  addToBoard(part);
  SelectionState.current = {kind: "part", part};
  const required = requireParts([part]);
  const added: IChange = {type: "add", kind: "part", part};
  HistoryState.record(required ? {type: "batch", kind: "batch", changes: [added, required]} : added);
}

// Places new parts and wires (a paste) as one undoable step, each part with the lowest free ref
// for its kind, and selects them all.
export function placeItems(parts: Part[], lines: ILine[]) {
  const changes: IChange[] = [];
  for (const part of parts) {
    giveRef(part);
    addToBoard(part);
    changes.push({type: "add", kind: "part", part});
  }
  for (const line of lines) {
    LineState.lines.push(line);
    changes.push({type: "add", kind: "line", line});
  }
  const required = requireParts(parts);
  if (required) changes.push(required);
  if (!changes.length) return;
  HistoryState.record(changes.length === 1 ? changes[0] : {type: "batch", kind: "batch", changes});
  SelectionState.select(parts, lines);
}

// Removes a part as one undoable step. Returns false if it wasn't on the board.
export function removePart(part: Part): boolean {
  if (!takeOffBoard(part)) return false;
  HistoryState.record({type: "remove", kind: "part", part});
  return true;
}

// Topmost placed part under a canvas point, optionally limited to the parts `accept` allows.
// Searches in reverse draw order (see drawBoard: the under-board layer first, then the layer
// over the wires, each in list order), so a click lands on the part that's visibly on top.
export function findPartAt(x: number, y: number, accept?: (part: Part) => boolean): Part | undefined {
  for (const layer of ["over-wires", "under-board"] as const) {
    for (let i = PartState.parts.length - 1; i >= 0; i--) {
      const part = PartState.parts[i];
      if (part.layer === layer && part.containsPoint(x, y) && (!accept || accept(part))) return part;
    }
  }
  return undefined;
}
