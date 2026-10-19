import {ILine} from "../interfaces/line.interface";
import {IDot} from "../interfaces/dot.interface";
import {LineState} from "../state/LineState";
import {Point} from "../interfaces/point.interface";
import {PartState} from "../state/PartState";
import {Utils} from "../utils/utils";

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

// Where wire ends meet: a dot with two or more is a junction, kept as one even if a new wire lines up
// with one of them.
function wireEndsAt(dot: IDot, except: ILine[]): number {
  return LineState.lines.filter(line => except.indexOf(line) === -1 && (dotsEqual(line.start, dot) || dotsEqual(line.end, dot))).length;
}

// True when `dot` lies on the wire between its ends (a hole the wire passes over).
function passesOver(line: ILine, dot: IDot): boolean {
  if (dotsEqual(line.start, dot) || dotsEqual(line.end, dot)) return false;
  const dx = line.end.x - line.start.x, dy = line.end.y - line.start.y;
  const px = dot.x - line.start.x, py = dot.y - line.start.y;
  if (dx * py - dy * px !== 0) return false;
  const along = dx * px + dy * py;
  return along > 0 && along < dx * dx + dy * dy;
}

// Splits every wire passing over `dot` into two that end there, so a wire ending on another joins
// it (a wire only connects the holes at its ends). The split wires are swapped for their halves in
// LineState.lines; the caller records the history.
export function splitWiresAt(dot: IDot): {removed: ILine[]; added: ILine[]} {
  const removed = LineState.lines.filter(line => passesOver(line, dot));
  const added: ILine[] = [];
  for (const line of removed) {
    LineState.lines.splice(LineState.lines.indexOf(line), 1);
    added.push({...line, end: dot}, {...line, start: dot});
  }
  LineState.lines.push(...added);
  return {removed, added};
}

// `line` cut into pieces at every hole it passes over where another wire ends, so it joins those
// wires as well (the other way round from splitWiresAt). In order from its start; just `line` when
// it passes over no wire end. Nothing in LineState.lines changes.
export function cutAtWireEnds(line: ILine): ILine[] {
  const cuts = new Map<string, IDot>();
  for (const other of LineState.lines) {
    for (const end of [other.start, other.end]) {
      if (passesOver(line, end)) cuts.set(`${end.x},${end.y}`, end);
    }
  }
  if (cuts.size === 0) return [line];
  const along = (dot: IDot) => Math.abs(dot.x - line.start.x) + Math.abs(dot.y - line.start.y);
  const stops = [line.start, ...[...cuts.values()].sort((a, b) => along(a) - along(b)), line.end];
  return stops.slice(1).map((dot, i) => ({...line, start: stops[i], end: dot}));
}

// Folds `newLine` into any same-color wire(s) it forms a straight line with at its endpoints
// (chained through as many collinear segments as line up), unless the shared dot is a pin or a
// junction of wires. The absorbed wires are removed from LineState.lines; the caller records one
// history entry for the whole merge and pushes the returned line in place of `newLine`.
export function mergeNewWire(newLine: ILine): {line: ILine; absorbed: ILine[]} {
  const dx = newLine.end.x - newLine.start.x;
  const dy = newLine.end.y - newLine.start.y;
  const absorbed: ILine[] = [];
  let start = newLine.start;
  let end = newLine.end;

  const findNeighbor = (dot: IDot): ILine | undefined => {
    if (isPinDot(dot) || wireEndsAt(dot, absorbed) >= 2) return undefined;
    return LineState.lines.find(candidate => {
      if (absorbed.indexOf(candidate) > -1) return false;
      if (!sameColor(candidate.color, newLine.color)) return false;
      const cdx = candidate.end.x - candidate.start.x;
      const cdy = candidate.end.y - candidate.start.y;
      // Parallel direction through a shared point is the same infinite line.
      if (dx * cdy - dy * cdx !== 0) return false;
      return dotsEqual(candidate.start, dot) || dotsEqual(candidate.end, dot);
    });
  };

  let neighbor = findNeighbor(start);
  while (neighbor) {
    start = dotsEqual(neighbor.start, start) ? neighbor.end : neighbor.start;
    absorbed.push(neighbor);
    neighbor = findNeighbor(start);
  }

  neighbor = findNeighbor(end);
  while (neighbor) {
    end = dotsEqual(neighbor.start, end) ? neighbor.end : neighbor.start;
    absorbed.push(neighbor);
    neighbor = findNeighbor(end);
  }

  if (absorbed.length === 0) {
    return {line: newLine, absorbed};
  }

  for (const line of absorbed) {
    const index = LineState.lines.indexOf(line);
    if (index > -1) LineState.lines.splice(index, 1);
  }

  return {line: {start, end, color: newLine.color, width: newLine.width}, absorbed};
}
