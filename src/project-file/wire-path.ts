import {GridPos} from "./grid";

// A wire's route: its two ends with its corners (`via`, see SavedWire) between, and the straight
// legs from hole to hole that make it up. A wire without corners is one leg.

export interface WireRoute {
  from: GridPos;
  to: GridPos;
  via?: GridPos[];
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
