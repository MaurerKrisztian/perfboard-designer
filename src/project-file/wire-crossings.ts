import {GridPos} from "./grid";
import {ProjectFile} from "./project-file";
import {partPins} from "./pin-positions";
import {WireLeg, wireLegs, WireRoute} from "./wire-path";

// Where wires pass over things without joining them, and where things do join: what the 2D and
// 3D views draw so a crossing never passes for a joint. A wire joins only the holes at its two
// ends (see nets.ts), so a wire running across another wire, or over a hole holding a pin, a lead
// or another wire's end, goes over it, and so does a bend sitting on such a hole. Of two wires
// crossing between their ends, the later one in the list is on top: the order the editor draws
// them in.

// A wire's ends and corners: all the crossings need.
export type WireEnds = WireRoute;

// One place a wire goes over something.
export interface WireHop {
  // The wire on top, by index.
  wire: number;
  // Which of its legs (wireLegs()), from 0. One at a corner is on the leg the corner starts.
  leg: number;
  // Where, in grid units: a hole, or a point between holes where two wires cross.
  at: [number, number];
  // Another wire's run (`under`, its index), or a hole holding a pin, a lead or a wire's end.
  over: "wire" | "hole";
  under?: number;
}

export interface WireLayout {
  // By wire, then along it from its `from` end.
  hops: WireHop[];
  // Holes where three or more things are joined: wire ends, and a pin if there is one.
  junctions: GridPos[];
}

const key = ([c, r]: readonly number[]) => `${c},${r}`;
const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;

// The holes a straight leg runs over between its ends (it joins none of them), from its `from`
// end, with how far along it each is (0 to 1).
export function holesAlong(leg: WireLeg): {at: GridPos; along: number}[] {
  const [x1, y1] = leg.from;
  const [x2, y2] = leg.to;
  const steps = gcd(Math.abs(x2 - x1), Math.abs(y2 - y1));
  const holes: {at: GridPos; along: number}[] = [];
  for (let k = 1; k < steps; k++) holes.push({at: [x1 + (x2 - x1) / steps * k, y1 + (y2 - y1) / steps * k], along: k / steps});
  return holes;
}

// A wire's legs, each with how far along the whole wire it starts and how long it is.
function measuredLegs(wire: WireEnds): {leg: WireLeg; start: number; length: number}[] {
  let start = 0;
  return wireLegs(wire).map(leg => {
    const length = Math.hypot(leg.to[0] - leg.from[0], leg.to[1] - leg.from[1]);
    const measured = {leg, start, length};
    start += length;
    return measured;
  });
}

// Where two straight legs meet, ends and corners included, as a fraction along each (exact: `t`
// and `u` are 0 or 1 only at an end of the leg). Parallel legs never meet: one lying along the
// other passes over its holes instead.
function legsMeet(a: WireLeg, b: WireLeg): {at: [number, number]; t: number; u: number} | undefined {
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

export function layoutWires(wires: WireEnds[], pinHoles: GridPos[]): WireLayout {
  const pins = new Set(pinHoles.map(key));
  const ends = new Map<string, number>();
  for (const wire of wires) {
    for (const end of [wire.from, wire.to]) ends.set(key(end), (ends.get(key(end)) ?? 0) + 1);
  }
  const holds = (at: readonly number[]) => pins.has(key(at)) || ends.has(key(at));
  const legs = wires.map(measuredLegs);

  // `along`: how far along the whole wire, to put each wire's hops in order.
  const hops: (WireHop & {along: number})[] = [];
  legs.forEach((legsOfWire, i) => {
    legsOfWire.forEach(({leg, start, length}, l) => {
      // A corner (every leg's start but the first) over a hole that holds something.
      if (l > 0 && holds(leg.from)) hops.push({wire: i, leg: l, at: leg.from, over: "hole", along: start});
      for (const {at, along} of holesAlong(leg)) {
        if (holds(at)) hops.push({wire: i, leg: l, at, over: "hole", along: start + along * length});
      }
    });
  });

  // Two wires meeting anywhere but at an end of either: the later one goes over. An end lying on
  // the other wire is a hole that holds a wire end, already found above.
  for (let i = 0; i < wires.length; i++) {
    const endsOfI = new Set([key(wires[i].from), key(wires[i].to)]);
    for (let j = i + 1; j < wires.length; j++) {
      const isEnd = (at: readonly number[]) => endsOfI.has(key(at)) || key(at) === key(wires[j].from) || key(at) === key(wires[j].to);
      const seen = new Set<string>();
      for (const a of legs[i]) {
        legs[j].forEach((b, l) => {
          const meet = legsMeet(a.leg, b.leg);
          if (!meet || isEnd(meet.at) || seen.has(key(meet.at))) return;
          seen.add(key(meet.at));
          // On the corner it reached: the start of the next leg.
          const leg = meet.u === 1 ? l + 1 : l;
          hops.push({wire: j, leg, at: meet.at, over: "wire", under: i, along: b.start + meet.u * b.length});
        });
      }
    }
  }
  hops.sort((a, b) => a.wire - b.wire || a.along - b.along);

  const junctions = [...ends.entries()]
    .filter(([hole, count]) => count + (pins.has(hole) ? 1 : 0) >= 3)
    .map(([hole]) => hole.split(",").map(Number) as GridPos);
  return {
    hops: hops.map(hop => ({wire: hop.wire, leg: hop.leg, at: hop.at, over: hop.over, ...(hop.under !== undefined ? {under: hop.under} : {})})),
    junctions,
  };
}

export function layoutProjectWires(project: ProjectFile): WireLayout {
  return layoutWires(project.wires, partPins(project).flatMap(part => part.pins.map(pin => pin.at)));
}
