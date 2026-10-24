import {IDot} from "../interfaces/dot.interface";
import {ILine} from "../interfaces/line.interface";
import {Point} from "../interfaces/point.interface";

// A placed wire's route (ILine.via): its start, each corner, its end, and the straight legs
// between them. Pure geometry on the editor's dots; nothing here changes LineState.

export function linePoints(line: ILine): IDot[] {
  return [line.start, ...(line.via ?? []), line.end];
}

// Puts the wire on new holes in place: `points` are its start, corners and end, as linePoints().
export function setLinePoints(line: ILine, points: IDot[]) {
  line.start = points[0];
  line.end = points[points.length - 1];
  const via = points.slice(1, -1);
  if (via.length) line.via = via;
  else delete line.via;
}

// Leg i runs from point i to point i + 1 of linePoints().
export function lineLegs(line: ILine): [IDot, IDot][] {
  const points = linePoints(line);
  return points.slice(1).map((end, i) => [points[i], end]);
}

function samePlace(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

// Distance from (x, y) to the nearest point of the wire.
export function distanceToLine(x: number, y: number, line: ILine): number {
  return Math.min(...lineLegs(line).map(([a, b]) => {
    const dx = b.x - a.x, dy = b.y - a.y;
    const lengthSq = dx * dx + dy * dy;
    const t = lengthSq ? Math.max(0, Math.min(1, ((x - a.x) * dx + (y - a.y) * dy) / lengthSq)) : 0;
    return Math.hypot(x - (a.x + t * dx), y - (a.y + t * dy));
  }));
}

// How far along the wire from its start `dot` is, if the wire runs over it between its ends (a
// hole a leg passes over, or a corner); undefined if it doesn't, or `dot` is an end.
export function distanceAlong(line: ILine, dot: Point): number | undefined {
  if (samePlace(line.start, dot) || samePlace(line.end, dot)) return undefined;
  let along = 0;
  for (const [a, b] of lineLegs(line)) {
    const dx = b.x - a.x, dy = b.y - a.y;
    const px = dot.x - a.x, py = dot.y - a.y;
    const lengthSq = dx * dx + dy * dy;
    const projected = dx * px + dy * py;
    if (dx * py - dy * px === 0 && projected >= 0 && projected < lengthSq) return along + projected / Math.sqrt(lengthSq);
    along += Math.sqrt(lengthSq);
  }
  return undefined;
}

// `line` cut in two at `dot`, a hole it runs over between its ends (see distanceAlong): each half
// keeps the corners on its side. Undefined if the wire doesn't run over `dot`.
export function splitLine(line: ILine, dot: IDot): [ILine, ILine] | undefined {
  const points = linePoints(line);
  for (let i = 0; i < points.length - 1; i++) {
    const [a, b] = [points[i], points[i + 1]];
    const onCorner = i > 0 && samePlace(a, dot);
    const dx = b.x - a.x, dy = b.y - a.y;
    const px = dot.x - a.x, py = dot.y - a.y;
    const inside = dx * py - dy * px === 0 && dx * px + dy * py > 0 && dx * px + dy * py < dx * dx + dy * dy;
    if (!onCorner && !inside) continue;
    // Corners before the cut stay with the first half, those after it with the second; a cut on
    // a corner (points[i]) uses that corner up.
    const corners = line.via ?? [];
    const before = corners.slice(0, onCorner ? i - 1 : i);
    const after = corners.slice(i);
    return [withCorners({...line, end: dot}, before), withCorners({...line, start: dot}, after)];
  }
  return undefined;
}

// A wire through `points` (its start, corners and end), styled like `template`. A corner that
// doesn't turn the wire (it carries straight on through it) is left out.
export function lineThrough(points: IDot[], template: ILine): ILine {
  const corners = points.slice(1, -1).filter((p, i) => {
    const a = points[i], b = points[i + 2];
    const straightOn = (p.x - a.x) * (b.y - p.y) - (p.y - a.y) * (b.x - p.x) === 0
      && (p.x - a.x) * (b.x - p.x) + (p.y - a.y) * (b.y - p.y) > 0;
    return !straightOn;
  });
  return withCorners({...template, start: points[0], end: points[points.length - 1]}, corners);
}

function withCorners(line: ILine, via: IDot[]): ILine {
  const copy: ILine = {...line};
  if (via.length) copy.via = via;
  else delete copy.via;
  return copy;
}
