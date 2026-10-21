import {GridPos} from "./grid";
import {ProjectFile} from "./project-file";
import {partPins} from "./pin-positions";
import {holesAlong, isSolderPath, legsMeet, WireLeg, wireLegs, WireRoute} from "./wire-path";

// Where wires pass over things without joining them, and where things do join: what the 2D and
// 3D views draw so a crossing never passes for a joint. A wire joins only the holes at its two
// ends (see nets.ts), so a wire running across another wire, or over a hole holding a pin, a lead
// or another wire's end, goes over it, and so does a bend sitting on such a hole. Of two wires
// crossing between their ends, the later one in the list is on top: the order the editor draws
// them in. Solder paths are on the other side of the board, and join what they touch: they play
// no part here (no hops on or under them, and their holes count for nothing).

// A wire's ends and corners, and whether it's a solder path: all the crossings need.
export type WireEnds = WireRoute & {kind?: string};

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

export function layoutWires(wires: WireEnds[], pinHoles: GridPos[]): WireLayout {
  const pins = new Set(pinHoles.map(key));
  const ends = new Map<string, number>();
  const jumper = (i: number) => !isSolderPath(wires[i]);
  for (const wire of wires.filter((_, i) => jumper(i))) {
    for (const end of [wire.from, wire.to]) ends.set(key(end), (ends.get(key(end)) ?? 0) + 1);
  }
  const holds = (at: readonly number[]) => pins.has(key(at)) || ends.has(key(at));
  // A solder path has no legs as far as crossings go.
  const legs = wires.map((wire, i) => jumper(i) ? measuredLegs(wire) : []);

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
