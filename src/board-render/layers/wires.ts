import {GridPos, gridToPx} from "../../project-file/grid";
import {SavedWire} from "../../project-file/project-file";
import {WireHop} from "../../project-file/wire-crossings";
import {holesAlong, isBottomWire, isSolderPath, solderPathHoles, wireLegs, wirePoints} from "../../project-file/wire-path";
import {BoardView, isHovered, isSameItem, isSelected, soleSelected} from "../board-view";
import {Painter, Point} from "../painter/painter";
import {
  DEFAULT_WIRE_COLOR, DEFAULT_WIRE_WIDTH, HOLE_RADIUS, PAD_RADIUS, SELECTION_COLOR, SOLDER_COLOR, SOLDER_EDGE, SOLDER_JOINT_RADIUS,
  SOLDER_PATH_WIDTH,
} from "../palette";

// Wires, and how crossings show (see src/project-file/wire-crossings.ts). A wire runs straight from
// hole to hole through its corners, each bend rounded off as a real bent wire's is. Where a wire
// goes over something it doesn't join (another wire, or a hole holding a pin, a lead or a wire's
// end): a dark edge either side of it there, cutting whatever is underneath, so it reads as
// passing over. Where three or more things do join: a solder dot, like a schematic's junction dot.
// Solder paths (on the copper side, joining every hole they cover) are drawn on their own, under
// the jumpers: a trail of solder with a bead on each of its holes, its corners left square.

const HOVER_COLOR = "#94a3b8";
const OVER_EDGE_COLOR = "#0b1120";
// A junction's blob of solder over the wire ends: the hole's own solder (layers/holes.ts), only
// bigger, covering it whole so there's one outline, not two a pixel apart.
const JUNCTION_RADIUS = HOLE_RADIUS + 2;
const BEND_HANDLE_FILL = "#ffffff";
// A solder path's bead on each of its holes, covering the pad.
const SOLDER_BEAD_RADIUS = PAD_RADIUS - 0.5;
const SOLDER_SHINE = "#ffffff";
// How strongly a wire shows through a part standing over it.
const THROUGH_PART_OPACITY = 0.45;
// How tightly a wire bends at a corner (its centreline's radius, drawing px), and in how many
// straight steps the bend is drawn.
const BEND_RADIUS = 14;
const BEND_STEPS = 6;
// In the solder side view, the clear space between a joint's solder and a wire only passing over it.
const JOINT_GAP = 4;

const widthOf = (wire: SavedWire) => wire.width || DEFAULT_WIRE_WIDTH;
// How wide it's drawn: a solder path has no width of its own.
export const drawnWidthOf = (wire: SavedWire) => isSolderPath(wire) ? SOLDER_PATH_WIDTH : widthOf(wire);

// A wire's centreline in drawing px, from `from` to `to`: a jumper's corners rounded off, a solder
// path's left as they are.
export function wireLine(wire: SavedWire): Point[] {
  const points = wirePoints(wire).map(([col, row]) => ({x: gridToPx(col), y: gridToPx(row)}));
  return isSolderPath(wire) ? points : roundedWireLine(points);
}

// A line through `points` (drawing px) with each corner replaced by a curve from a little before
// it to a little after it, never using more than half of either leg so neighbouring bends don't
// overlap. A corner that doesn't turn is kept.
export function roundedWireLine(points: Point[]): Point[] {
  if (points.length < 3) return points;
  const line: Point[] = [points[0]];
  for (let i = 1; i < points.length - 1; i++) {
    const [a, p, b] = [points[i - 1], points[i], points[i + 1]];
    const toA = Math.hypot(a.x - p.x, a.y - p.y), toB = Math.hypot(b.x - p.x, b.y - p.y);
    const turn = (a.x - p.x) * (b.y - p.y) - (a.y - p.y) * (b.x - p.x);
    if (!toA || !toB || turn === 0) {
      line.push(p);
      continue;
    }
    const r = Math.min(BEND_RADIUS, toA / 2, toB / 2);
    const p1 = {x: p.x + (a.x - p.x) / toA * r, y: p.y + (a.y - p.y) / toA * r};
    const p2 = {x: p.x + (b.x - p.x) / toB * r, y: p.y + (b.y - p.y) / toB * r};
    for (let k = 0; k <= BEND_STEPS; k++) {
      const t = k / BEND_STEPS;
      const [w1, w2, w3] = [(1 - t) * (1 - t), 2 * (1 - t) * t, t * t];
      line.push({x: w1 * p1.x + w2 * p.x + w3 * p2.x, y: w1 * p1.y + w2 * p.y + w3 * p2.y});
    }
  }
  line.push(points[points.length - 1]);
  return line;
}

// Which jumpers a drawWires() call draws: all, those on the top face, those on the solder side, or
// the solder side's that aren't selected or hovered (the faded ones in the top view).
export type WireFace = "all" | "top" | "bottom";

// The jumpers, in list order, so a later wire is drawn over an earlier one, as wire-crossings.ts
// assumes. Solder paths are drawSolderPaths'.
export function drawWires(painter: Painter, wires: SavedWire[], hops: WireHop[], view: BoardView, face: WireFace = "all", only?: (index: number) => boolean) {
  const hopsByWire = new Map<number, WireHop[]>();
  for (const hop of hops) hopsByWire.set(hop.wire, [...(hopsByWire.get(hop.wire) ?? []), hop]);

  wires.forEach((wire, index) => {
    if (isSolderPath(wire)) return;
    if (face !== "all" && isBottomWire(wire) !== (face === "bottom")) return;
    if (only && !only(index)) return;
    const line = wireLine(wire);
    const ends = [line[0], line[line.length - 1]];
    const width = widthOf(wire);
    const item = {kind: "wire", index} as const;
    // Selected with other things, it can't be bent there: the glow, but no handles.
    const handles = isSameItem(soleSelected(view), item);
    if (isSelected(view, item)) {
      // A glow along it, and a handle on each end.
      painter.line(line, {paint: SELECTION_COLOR, width: width + 6, cap: "round", join: "round"});
      if (handles) for (const end of ends) painter.circle(end.x, end.y, width + 3, {fill: SELECTION_COLOR});
    } else if (isHovered(view, item)) {
      painter.line(line, {paint: HOVER_COLOR, width: width + 3, cap: "round", join: "round"});
    }
    drawOverEdges(painter, line, wire, wires, hopsByWire.get(index) ?? []);
    painter.line(line, {paint: wire.color || DEFAULT_WIRE_COLOR, width, cap: "round", join: "round"});
    if (handles) drawBendHandles(painter, wire);
  });
}

const holeKey = ([col, row]: GridPos) => `${col},${row}`;

// The jumpers on one face as the solder side view shows them, where every joint is a blob of solder
// (`joints`) that would hide a dark edge: each wire is broken by a gap round every joint it only
// passes over (a pin, a lead or another wire's end it doesn't join, or a solder path's hole), so it
// stops short of that solder, while a wire ending in a joint runs into it. Where it crosses another
// wire it gets its dark edges, as in the top view.
export function drawWiresFromBelow(painter: Painter, wires: SavedWire[], hops: WireHop[], joints: GridPos[], face: "top" | "bottom") {
  const isJoint = new Set(joints.map(holeKey));
  wires.forEach((wire, index) => {
    if (isSolderPath(wire) || isBottomWire(wire) !== (face === "bottom")) return;
    const line = wireLine(wire);
    const width = widthOf(wire);
    drawOverEdges(painter, line, wire, wires, hops.filter(hop => hop.wire === index && hop.over === "wire"));
    const gaps = holesPassedOver(wire)
      .filter(at => isJoint.has(holeKey(at)))
      .map(([col, row]) => nearestAlong(line, {x: gridToPx(col), y: gridToPx(row)}));
    // Round caps reach half the wire's width past each piece's end.
    const half = SOLDER_JOINT_RADIUS + JOINT_GAP + width / 2;
    for (const piece of piecesBetweenGaps(line, gaps, half)) {
      painter.line(piece, {paint: wire.color || DEFAULT_WIRE_COLOR, width, cap: "round", join: "round"});
    }
  });
}

// The holes a jumper passes over without ending in them: its corners and the holes along its legs.
function holesPassedOver(wire: SavedWire): GridPos[] {
  const corners = wirePoints(wire).slice(1, -1);
  const along = wireLegs(wire).flatMap(leg => holesAlong(leg).map(hole => hole.at));
  return [...corners, ...along];
}

// `line` with a gap `half` px either side of each point `gaps` (px along it), as the pieces left.
function piecesBetweenGaps(line: Point[], gaps: number[], half: number): Point[][] {
  const pieces: Point[][] = [];
  let from = 0;
  for (const at of [...gaps].sort((a, b) => a - b)) {
    if (at - half > from) pieces.push(sliceLine(line, from, at - half));
    from = Math.max(from, at + half);
  }
  pieces.push(sliceLine(line, from, Infinity));
  return pieces.filter(piece => piece.length > 1);
}

// Every solder path, with the selected or hovered one marked as a jumper is.
export function drawSolderPaths(painter: Painter, wires: SavedWire[], view: BoardView) {
  wires.forEach((wire, index) => {
    if (!isSolderPath(wire)) return;
    const line = wireLine(wire);
    const item = {kind: "wire", index} as const;
    const selected = isSelected(view, item);
    if (selected) {
      painter.line(line, {paint: SELECTION_COLOR, width: SOLDER_PATH_WIDTH + 8, cap: "round", join: "round"});
    } else if (isHovered(view, item)) {
      painter.line(line, {paint: HOVER_COLOR, width: SOLDER_PATH_WIDTH + 6, cap: "round", join: "round"});
    }
    drawSolderPath(painter, wire);
    if (isSameItem(soleSelected(view), item)) {
      // Handles the size of a default jumper's, like its bend handles (drawBendHandles): a solder
      // path has no width of its own, and handles as wide as the trail would hide its beads.
      for (const end of [line[0], line[line.length - 1]]) {
        painter.circle(end.x, end.y, widthOf(wire) + 3, {fill: SELECTION_COLOR, stroke: {paint: BEND_HANDLE_FILL, width: 1.5}});
      }
      drawBendHandles(painter, wire);
    }
  });
}

// One solder path: an outlined trail along its route, a bead of solder on each hole it covers,
// and the trail again over the beads' outlines so it reads as one piece of solder.
export function drawSolderPath(painter: Painter, wire: SavedWire) {
  const line = wireLine(wire);
  const beads = solderPathHoles(wire).map(([col, row]) => ({x: gridToPx(col), y: gridToPx(row)}));
  painter.line(line, {paint: SOLDER_EDGE, width: SOLDER_PATH_WIDTH + 3, cap: "round", join: "round"});
  for (const bead of beads) painter.circle(bead.x, bead.y, SOLDER_BEAD_RADIUS, {fill: SOLDER_COLOR, stroke: {paint: SOLDER_EDGE, width: 1.5}});
  painter.line(line, {paint: SOLDER_COLOR, width: SOLDER_PATH_WIDTH, cap: "round", join: "round"});
  for (const bead of beads) painter.circle(bead.x - 2.5, bead.y - 2.5, 2.2, {fill: SOLDER_SHINE});
}

// On the selected wire, over it: a handle on each bend, to drag it, and a dot in the middle of
// each leg, where a new bend can be pulled out (the editor's wire-reshape.ts).
function drawBendHandles(painter: Painter, wire: SavedWire) {
  const points = wirePoints(wire).map(([col, row]) => ({x: gridToPx(col), y: gridToPx(row)}));
  const width = widthOf(wire);
  for (let i = 1; i < points.length; i++) {
    const [a, b] = [points[i - 1], points[i]];
    painter.circle((a.x + b.x) / 2, (a.y + b.y) / 2, 3.5, {fill: SELECTION_COLOR, stroke: {paint: BEND_HANDLE_FILL, width: 1.5}});
  }
  for (const p of points.slice(1, -1)) {
    painter.circle(p.x, p.y, width + 3, {fill: BEND_HANDLE_FILL, stroke: {paint: SELECTION_COLOR, width: 2.5}});
  }
}

// Drawn just under the wire itself, so the wire runs between its two edges: the stretch of the
// wire either side of each hop, which follows a bend when the hop is on one.
function drawOverEdges(painter: Painter, line: Point[], wire: SavedWire, wires: SavedWire[], hops: WireHop[]) {
  for (const hop of hops) {
    // Long enough to cut across what's underneath: the other wire, or the hole's pad.
    const under = hop.under !== undefined ? wires[hop.under] : undefined;
    const half = under ? widthOf(under) / 2 + 5 : PAD_RADIUS + 2;
    const at = nearestAlong(line, {x: gridToPx(hop.at[0]), y: gridToPx(hop.at[1])});
    const stretch = sliceLine(line, at - half, at + half);
    if (stretch.length > 1) painter.line(stretch, {paint: OVER_EDGE_COLOR, width: widthOf(wire) + 6, join: "round"});
  }
}

// How far along `line` (px from its start) the point of it nearest to `p` is.
function nearestAlong(line: Point[], p: Point): number {
  let best = 0, bestDistance = Infinity, start = 0;
  for (let i = 1; i < line.length; i++) {
    const a = line[i - 1], b = line[i];
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    const t = length ? Math.max(0, Math.min(1, ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / (length * length))) : 0;
    const distance = Math.hypot(a.x + t * (b.x - a.x) - p.x, a.y + t * (b.y - a.y) - p.y);
    if (distance < bestDistance) [best, bestDistance] = [start + t * length, distance];
    start += length;
  }
  return best;
}

// The part of `line` from `from` to `to` px along it (clamped to the line).
function sliceLine(line: Point[], from: number, to: number): Point[] {
  const out: Point[] = [];
  let start = 0;
  for (let i = 1; i < line.length; i++) {
    const a = line[i - 1], b = line[i];
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    const end = start + length;
    if (end >= from && start <= to && length) {
      const point = (s: number) => ({x: a.x + (b.x - a.x) * (s - start) / length, y: a.y + (b.y - a.y) * (s - start) / length});
      if (!out.length) out.push(point(Math.max(from, start)));
      out.push(point(Math.min(to, end)));
    }
    start = end;
  }
  return out;
}

// Every wire's line again, faded: drawn over the parts that stand above the wires, so a wire
// running under a part's body still shows through it. Elsewhere it lands on the wire itself and
// changes nothing. Solder paths first, as they're drawn under the jumpers.
export function drawWiresThroughParts(painter: Painter, wires: SavedWire[]) {
  painter.group({opacity: THROUGH_PART_OPACITY}, () => {
    for (const wire of wires) {
      if (isSolderPath(wire)) painter.line(wireLine(wire), {paint: SOLDER_COLOR, width: SOLDER_PATH_WIDTH, cap: "round", join: "round"});
    }
    for (const wire of wires) {
      if (isSolderPath(wire) || isBottomWire(wire)) continue;
      painter.line(wireLine(wire), {paint: wire.color || DEFAULT_WIRE_COLOR, width: widthOf(wire), cap: "round", join: "round"});
    }
  });
}

export function drawJunctions(painter: Painter, junctions: GridPos[]) {
  for (const [col, row] of junctions) {
    const x = gridToPx(col), y = gridToPx(row);
    painter.circle(x, y, JUNCTION_RADIUS, {fill: SOLDER_COLOR, stroke: {paint: SOLDER_EDGE, width: 1}});
    painter.circle(x - 2.2, y - 2.2, 2.2, {fill: SOLDER_SHINE});
  }
}
