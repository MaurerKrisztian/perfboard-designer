import {GridPos} from "./grid";

// A wire's route: its two ends with its corners (`via`, see SavedWire) between, and the straight
// legs from hole to hole that make it up. A wire without corners is one leg.

export interface WireRoute {
  from: GridPos;
  to: GridPos;
  via?: GridPos[];
}

// A solder path (SavedWire.kind): bare solder, which joins every hole it runs over.
export function isSolderPath(wire: {kind?: string}): boolean {
  return wire.kind === "solder";
}

// A jumper on the solder side (SavedWire.side).
export function isBottomWire(wire: {side?: string}): boolean {
  return wire.side === "bottom";
}

export interface WireLeg {
  from: GridPos;
  to: GridPos;
}

// From `from`, through each corner, to `to`.
export function wirePoints(wire: WireRoute): GridPos[] {
  return [wire.from, ...(wire.via ?? []), wire.to];
}

// In order from `from`: leg i runs from point i to point i + 1 of wirePoints().
export function wireLegs(wire: WireRoute): WireLeg[] {
  const points = wirePoints(wire);
  return points.slice(1).map((to, i) => ({from: points[i], to}));
}

const key = ([c, r]: readonly number[]) => `${c},${r}`;
const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;

// The holes a straight leg runs over between its ends, from its `from` end, with how far along it
// each is (0 to 1). A jumper joins none of them; a solder path joins them all.
export function holesAlong(leg: WireLeg): {at: GridPos; along: number}[] {
  const [x1, y1] = leg.from;
  const [x2, y2] = leg.to;
  const steps = gcd(Math.abs(x2 - x1), Math.abs(y2 - y1));
  const holes: {at: GridPos; along: number}[] = [];
  for (let k = 1; k < steps; k++) holes.push({at: [x1 + (x2 - x1) / steps * k, y1 + (y2 - y1) / steps * k], along: k / steps});
  return holes;
}

// Every hole a wire's route covers, once each, in order from `from`: its ends, its corners and
// the holes its legs run over. What a solder path joins.
export function solderPathHoles(wire: WireRoute): GridPos[] {
  const holes = new Map<string, GridPos>();
  for (const leg of wireLegs(wire)) {
    for (const at of [leg.from, ...holesAlong(leg).map(hole => hole.at), leg.to]) {
      if (!holes.has(key(at))) holes.set(key(at), at);
    }
  }
  return [...holes.values()];
}

// Where two straight legs meet, ends and corners included, as a fraction along each (exact: `t`
// and `u` are 0 or 1 only at an end of the leg). Parallel legs never meet: one lying along the
// other passes over its holes instead.
export function legsMeet(a: WireLeg, b: WireLeg): {at: [number, number]; t: number; u: number} | undefined {
  const [ax, ay] = a.from;
  const [bx, by] = b.from;
  const rx = a.to[0] - ax, ry = a.to[1] - ay;
  const sx = b.to[0] - bx, sy = b.to[1] - by;
  let denom = rx * sy - ry * sx;
  if (denom === 0) return undefined;
  let tNum = (bx - ax) * sy - (by - ay) * sx;
  let uNum = (bx - ax) * ry - (by - ay) * rx;
  if (denom < 0) [denom, tNum, uNum] = [-denom, -tNum, -uNum];
  if (tNum < 0 || tNum > denom || uNum < 0 || uNum > denom) return undefined;
  const t = tNum === 0 ? 0 : tNum === denom ? 1 : tNum / denom;
  const u = uNum === 0 ? 0 : uNum === denom ? 1 : uNum / denom;
  const at: [number, number] = t === 0 ? [ax, ay] : t === 1 ? [a.to[0], a.to[1]] : [ax + t * rx, ay + t * ry];
  return {at, t, u};
}
