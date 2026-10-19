import {ILine} from "../interfaces/line.interface";
import {IDot} from "../interfaces/dot.interface";
import {LineState} from "../state/LineState";
import {Point} from "../interfaces/point.interface";
import {PartState} from "../state/PartState";
import {Utils} from "../utils/utils";
import {distanceAlong, linePoints, lineThrough, splitLine} from "./line-path";
import {BoardState} from "../state/BoardState";
import {DEFAULT_WIRE_WIDTH} from "../board-render";

function dotsEqual(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

function sameColor(a?: string, b?: string): boolean {
  return Utils.normalizeColor(a) === Utils.normalizeColor(b);
}

// True when a component lead terminates on this dot. A wire ending there has to stay its own
// segment - folding it into a neighbor would make the pin's connection un-splittable later.
function isPinDot(dot: IDot): boolean {
  return PartState.parts.some(part => part.getPinPositions().some(p => dotsEqual(p, dot)));
}

// Splits every wire running over `dot` (passing over it, or bending over it) into two that end
// there, so a wire ending on another joins it (a wire only connects the holes at its ends). The
// split wires are swapped for their halves in LineState.lines; the caller records the history.
export function splitWiresAt(dot: IDot): {removed: ILine[]; added: ILine[]} {
  const removed: ILine[] = [];
  const added: ILine[] = [];
  for (const line of [...LineState.lines]) {
    const halves = splitLine(line, dot);
    if (!halves) continue;
    LineState.lines.splice(LineState.lines.indexOf(line), 1);
    removed.push(line);
    added.push(...halves);
  }
  LineState.lines.push(...added);
  return {removed, added};
}

// `line` cut into pieces at every hole it passes over where another wire ends, so it joins those
// wires as well (the other way round from splitWiresAt). In order from its start; just `line` when
// it passes over no wire end. Nothing in LineState.lines changes.
export function cutAtWireEnds(line: ILine): ILine[] {
  const cuts = new Map<string, {dot: IDot; along: number}>();
  for (const other of LineState.lines) {
    for (const end of [other.start, other.end]) {
      const along = distanceAlong(line, end);
      if (along !== undefined) cuts.set(`${end.x},${end.y}`, {dot: end, along});
    }
  }
  const pieces: ILine[] = [];
  let rest = line;
  for (const {dot} of [...cuts.values()].sort((a, b) => a.along - b.along)) {
    const halves = splitLine(rest, dot);
    if (!halves) continue;
    pieces.push(halves[0]);
    rest = halves[1];
  }
  return [...pieces, rest];
}

// What a wire ending in `dot` would connect to, besides another wire ending there: a pin, a wire
// running over or bending over it (which would be split there to join it), a wire end, or on a
// stripboard its strip (every hole but a cut one).
export function connectsAt(dot: IDot): boolean {
  return isPinDot(dot) || isStripHole(dot)
    || LineState.lines.some(line => dotsEqual(line.start, dot) || dotsEqual(line.end, dot) || distanceAlong(line, dot) !== undefined);
}

function isStripHole(dot: IDot): boolean {
  return BoardState.isStripboard && !dot.cut;
}

const widthOf = (line: ILine) => line.width || DEFAULT_WIRE_WIDTH;

// Where `newLine` starts or ends (at an end `ends` says is new) at the free end of a wire of the same colour and width (one
// ending in a hole with nothing else: no pin, no strip, no other wire), it carries that wire on
// rather than making a joint there: the two become one wire, which bends where they met (or runs
// straight through, if they line up). The absorbed wires are removed from LineState.lines; the
// caller records one history entry for the whole placement and pushes the returned line in place
// of `newLine`.
export function mergeNewWire(newLine: ILine, ends = {start: true, end: true}): {line: ILine; absorbed: ILine[]} {
  const absorbed: ILine[] = [];
  const continued = (dot: IDot, isNew: boolean): ILine | undefined => {
    if (!isNew) return undefined;
    if (isPinDot(dot) || isStripHole(dot)) return undefined;
    const ending = LineState.lines.filter(line => dotsEqual(line.start, dot) || dotsEqual(line.end, dot));
    const [line] = ending;
    if (ending.length !== 1 || absorbed.includes(line) || dotsEqual(line.start, line.end)) return undefined;
    return sameColor(line.color, newLine.color) && widthOf(line) === widthOf(newLine) ? line : undefined;
  };
  // `line`'s holes in order, running into `dot` (its last point).
  const into = (line: ILine, dot: IDot) => {
    const points = linePoints(line);
    return dotsEqual(points[points.length - 1], dot) ? points : points.reverse();
  };

  let points = linePoints(newLine);
  const before = continued(points[0], ends.start);
  if (before) {
    points = [...into(before, points[0]), ...points.slice(1)];
    absorbed.push(before);
  }
  const after = continued(points[points.length - 1], ends.end);
  if (after) {
    points = [...points, ...into(after, points[points.length - 1]).reverse().slice(1)];
    absorbed.push(after);
  }
  if (absorbed.length === 0) return {line: newLine, absorbed};

  for (const line of absorbed) {
    const index = LineState.lines.indexOf(line);
    if (index > -1) LineState.lines.splice(index, 1);
  }
  return {line: lineThrough(points, newLine), absorbed};
}
