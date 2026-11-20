import {ViewerWire} from "./project-data";
import {GRID_PITCH_PX} from "../project-file/grid";

// What a wire goes over without joining it: another wire (`underWidth`, that wire's width; `stack`,
// how high (mm) that wire already stands there, over wires of its own), or with no `underWidth` a
// hole's pin, lead or wire end.
export interface WireOver {
  underWidth?: number;
  stack?: number;
}

export interface WirePoint {
  x: number;
  y: number;
  // Not a bend: a place on the straight run where the wire arches over something it doesn't join.
  // `runTo`: the wire lies along the one underneath from here to there.
  hop?: WireOver & {runTo?: {x: number; y: number}};
  // A bend sitting over something it doesn't join: the wire turns up there, as high as a hop over
  // it would rise, and its legs rise to meet it.
  raised?: {lift: number; halfRun: number};
}

/** A jumper's radius in mm, from the editor's thin/normal/thick width. */
export function wireRadius(width: number): number {
  return 0.25 + width * 0.09;
}

// The clear space between a wire and the one it goes over, in mm.
const ARCH_GAP = 0.15;

/** How far a wire rises to clear a wire of this width lying on the board (mm). */
export function wireStep(underWidth: number): number {
  return 2 * wireRadius(underWidth) + ARCH_GAP;
}

// How far (mm) a wire's rise over another wire spreads either side of it, beyond that wire's radius.
const ARCH_RUN = 1.4;

/** How far (px) along a wire the rise over a wire of this width spreads either side of it. */
export function archHalfRunPx(underWidth: number): number {
  return (ARCH_RUN + wireRadius(underWidth)) * GRID_PITCH_PX / 2.54;
}

// How far (mm) a wire rises over a hole holding a pin, a lead or another wire's end: clear of a
// wire end's bend or a lead standing in it, rising and falling over this far either side.
const HOLE_ARCH_LIFT = 1.5;
const HOLE_ARCH_RUN = 2;

/** How a wire rises over what it goes over: how high (mm) and how far (px) either side. */
export function riseOver(over: WireOver): {lift: number; halfRun: number} {
  return over.underWidth !== undefined
    ? {lift: wireStep(over.underWidth) + (over.stack ?? 0), halfRun: archHalfRunPx(over.underWidth)}
    : {lift: HOLE_ARCH_LIFT, halfRun: HOLE_ARCH_RUN * GRID_PITCH_PX / 2.54};
}

/** Where a straight run from 0 to `length` rises over its hops: a smooth rise and fall `halfRun`
 *  either side of each one, overlapping arches merged. Hops of one height whose arches touch
 *  and a hop with `until` (a wire lying along another's run) make one raised stretch that stays
 *  level, not an arch per hole. Ends excluded; any units, so long as `at`, `length` and `halfRun`
 *  share one. */
export function archSamples(length: number, hops: {at: number; until?: number; lift: number; halfRun: number}[]): {at: number; lift: number}[] {
  // Points on each side of a rise: enough that it reads as a smooth curve, not facets.
  const STEPS = 8;
  const sorted = [...hops].sort((a, b) => a.at - b.at);
  const stretches: {from: number; to: number; lift: number; halfRun: number}[] = [];
  for (const hop of sorted) {
    const to = Math.max(hop.at, hop.until ?? hop.at);
    const last = stretches[stretches.length - 1];
    if (last && last.lift === hop.lift && hop.at - last.to <= last.halfRun + hop.halfRun) {
      last.to = Math.max(last.to, to);
      last.halfRun = Math.max(last.halfRun, hop.halfRun);
    } else {
      stretches.push({from: hop.at, to, lift: hop.lift, halfRun: hop.halfRun});
    }
  }
  const liftAt = (at: number) => Math.max(0, ...stretches.map(s => {
    const outside = at < s.from ? s.from - at : at > s.to ? at - s.to : 0;
    const u = outside / s.halfRun;
    return u < 1 ? s.lift * (1 + Math.cos(Math.PI * u)) / 2 : 0;
  }));
  return stretches
    .flatMap(s => [
      ...Array.from({length: STEPS + 1}, (_, k) => s.from - s.halfRun * (STEPS - k) / STEPS),
      ...Array.from({length: STEPS + 1}, (_, k) => s.to + s.halfRun * k / STEPS),
    ])
    .filter(at => at > 0 && at < length)
    .sort((a, b) => a - b)
    .filter((at, i, all) => i === 0 || at - all[i - 1] > 0.5)
    .map(at => ({at, lift: liftAt(at)}));
}

/** One jumper wire as the user drew it: a run of editor segments joined end to end. `points`
 *  runs from one free end to the other; a closed loop repeats its first point at the end. */
export interface WirePath {
  points: WirePoint[];
  color: string;
  width: number;
  closed: boolean;
  // On the solder side: lies on the bottom face, arching downward.
  bottom: boolean;
}

/** The key the solder registry uses for a hole (see SceneKit.solder). */
export function holeKey(px: number, py: number): string {
  return `${Math.round(px)},${Math.round(py)}`;
}

interface Segment {
  a: WirePoint;
  b: WirePoint;
  // Its bends and hops, from a to b.
  hops: WirePoint[];
  ka: string;
  kb: string;
  color: string;
  width: number;
  bottom: boolean;
}

/** Joins the file's wires into the runs they make. A wire bends at its own corners (`via`), and
 *  wires drawn before bent wires existed made each bend from two wires sharing a hole, so a hole
 *  where exactly two wires of the same color and width meet is a plain bend too and the run
 *  continues through it. Any other hole ends the run: a junction, a color or width change, or a
 *  hole a component lead already sits in. */
export function chainWires(wires: ViewerWire[], componentHoles: ReadonlySet<string>): WirePath[] {
  const segments: Segment[] = [];
  for (const wire of wires) {
    if (wire.x1 === wire.x2 && wire.y1 === wire.y2 && !wire.via.length) continue;
    const a = {x: wire.x1, y: wire.y1}, b = {x: wire.x2, y: wire.y2};
    // Each leg's hops, then the bend that ends it. A hop on a bend (a corner over a hole that
    // holds something, or over another wire) raises the bend instead.
    const isBend = (x: number, y: number) => wire.via.some(corner => corner.x === x && corner.y === y);
    const over = ({underWidth, stack}: ViewerWire["hops"][number]): WireOver => ({
      ...(underWidth !== undefined ? {underWidth} : {}),
      ...(stack ? {stack} : {}),
    });
    const hops: WirePoint[] = [];
    for (let leg = 0; leg <= wire.via.length; leg++) {
      for (const found of wire.hops) {
        const {x, y, runTo, leg: on} = found;
        if (on === leg && (runTo || !isBend(x, y))) hops.push({x, y, hop: {...over(found), ...(runTo ? {runTo} : {})}});
      }
      if (leg < wire.via.length) {
        const corner = wire.via[leg];
        const rises = wire.hops
          .filter(found => !found.runTo && found.x === corner.x && found.y === corner.y)
          .map(found => riseOver(over(found)));
        const raised = rises.reduce<WirePoint["raised"]>((high, rise) => !high || rise.lift > high.lift ? rise : high, undefined);
        hops.push({...corner, ...(raised ? {raised} : {})});
      }
    }
    segments.push({a, b, hops, ka: holeKey(a.x, a.y), kb: holeKey(b.x, b.y), color: wire.color, width: wire.width, bottom: wire.bottom});
  }

  const touching = new Map<string, number[]>();
  segments.forEach((segment, i) => {
    for (const key of [segment.ka, segment.kb]) {
      const list = touching.get(key);
      if (list) list.push(i);
      else touching.set(key, [i]);
    }
  });

  // The segment that carries on past hole `key` from segment `from`, if the hole is a plain bend.
  const continuation = (from: number, key: string): number | undefined => {
    const list = touching.get(key);
    if (!list || list.length !== 2 || componentHoles.has(key)) return undefined;
    const other = list[0] === from ? list[1] : list[0];
    const here = segments[from], there = segments[other];
    return here.bottom === there.bottom && here.color.toLowerCase() === there.color.toLowerCase() && here.width === there.width ? other : undefined;
  };

  // Walks away from hole `key`, an end of segment `from`, collecting each point passed. Reaching
  // a segment already walked means the run has closed into a loop.
  const follow = (from: number, key: string, visited: Set<number>): {points: WirePoint[]; closed: boolean} => {
    const points: WirePoint[] = [];
    let current = from, at = key;
    for (;;) {
      const next = continuation(current, at);
      if (next === undefined) return {points, closed: false};
      if (visited.has(next)) return {points, closed: true};
      visited.add(next);
      const segment = segments[next];
      const forward = segment.ka === at;
      points.push(...(forward ? segment.hops : [...segment.hops].reverse()), forward ? segment.b : segment.a);
      current = next;
      at = segment.ka === at ? segment.kb : segment.ka;
    }
  };

  const visited = new Set<number>();
  const paths: WirePath[] = [];
  segments.forEach((segment, i) => {
    if (visited.has(i)) return;
    visited.add(i);
    const forward = follow(i, segment.kb, visited);
    if (forward.closed) {
      paths.push({points: [segment.a, ...segment.hops, segment.b, ...forward.points], color: segment.color, width: segment.width, closed: true, bottom: segment.bottom});
      return;
    }
    const backward = follow(i, segment.ka, visited);
    paths.push({
      points: [...backward.points.reverse(), segment.a, ...segment.hops, segment.b, ...forward.points],
      color: segment.color, width: segment.width, closed: false, bottom: segment.bottom,
    });
  });
  return paths;
}
