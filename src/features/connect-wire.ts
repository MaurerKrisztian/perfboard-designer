import {IDot} from "../interfaces/dot.interface";
import {ILine} from "../interfaces/line.interface";
import type {Part} from "../interfaces/placed-part.interface";
import {Point} from "../interfaces/point.interface";
import type {WireSide} from "../project-file/project-file";
import {HistoryState} from "../state/HistoryState";
import {LineState} from "../state/LineState";
import {PartState} from "../state/PartState";
import {SelectionState} from "../state/SelectionState";
import {findDotAt} from "./dot-lookup";
import {redrawCanvas} from "./draw-canvas";
import {distanceAlong} from "./line-path";
import {splitWiresAt} from "./wire-merge";

// Connect to wire: joins the jumpers running over a hole to what's in it. A jumper joins only the
// holes at its two ends, so a lead, a pin or another jumper's end in a hole it passes over isn't
// connected (the board draws the jumper going over it). Connecting cuts each such jumper in two
// there, as drawing a wire that ends on it does (splitWiresAt), so both halves end in the hole and
// join what's in it. The result is plain wires: nothing new in the project file.

const samePlace = (a: Point, b: Point) => a.x === b.x && a.y === b.y;
const isJumper = (line: ILine) => line.kind !== "solder";
const faceOf = (line: ILine): WireSide => line.side === "bottom" ? "bottom" : "top";

function holdsPin(dot: IDot): boolean {
  return PartState.parts.some(part => part.getPinPositions().some(pin => samePlace(pin, dot)));
}

// The faces whose jumpers would join something in `dot` if cut there: both for a pin, which stands
// through the board, else the faces of the jumpers ending in it.
function facesToJoin(dot: IDot): Set<WireSide> {
  if (holdsPin(dot)) return new Set(["top", "bottom"]);
  const ending = LineState.lines.filter(line => isJumper(line) && (samePlace(line.start, dot) || samePlace(line.end, dot)));
  return new Set(ending.map(faceOf));
}

// The jumpers passing over (or bending over) `dot` that would join what's in it.
function jumpersOver(dot: IDot): ILine[] {
  const faces = facesToJoin(dot);
  return LineState.lines.filter(line => isJumper(line) && faces.has(faceOf(line)) && distanceAlong(line, dot) !== undefined);
}

// Whether a jumper passes over `dot` without joining what's in it.
export function canConnectWiresAt(dot: IDot): boolean {
  return jumpersOver(dot).length > 0;
}

// The one pin of `part` that a jumper passes over, if there's exactly one: where Connect to wire
// joins with the part selected. With more it's left to each hole's own menu, since joining them all
// at once could short the part (an LED lying along a wire).
export function partPinUnderWire(part: Part): IDot | undefined {
  const holes = part.getPinPositions()
    .map(pin => findDotAt(pin.x, pin.y))
    .filter((dot): dot is IDot => !!dot && canConnectWiresAt(dot));
  const unique = [...new Set(holes)];
  return unique.length === 1 ? unique[0] : undefined;
}

// Cuts the jumpers passing over `dot` in two there, joining them to what's in it: one undoable step.
export function connectWiresAt(dot: IDot) {
  const removed: ILine[] = [];
  const added: ILine[] = [];
  for (const face of new Set(jumpersOver(dot).map(faceOf))) {
    const split = splitWiresAt(dot, face);
    removed.push(...split.removed);
    added.push(...split.added);
  }
  if (removed.length === 0) return;
  // A wire selected from the menu is gone now, cut in two.
  if (SelectionState.line && removed.includes(SelectionState.line)) SelectionState.clear("line");
  HistoryState.record({type: "replace", kind: "line", removed, added});
  redrawCanvas();
}
