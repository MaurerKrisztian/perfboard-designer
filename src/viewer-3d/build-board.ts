import {
  CircleGeometry, DoubleSide, ExtrudeGeometry, Group, InstancedMesh, LatheGeometry, Matrix4,
  Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry, RingGeometry, Shape, Vector2, Vector3,
} from "three";
import {BOARD_BOTTOM_Y, BOARD_THICKNESS, BoardFrame, PITCH, PX_PER_PITCH, SceneKit} from "./scene-kit";
import {CUT_GAP_PITCH, STRIP_WIDTH_PITCH} from "../project-file/stripboard-geometry";
import {ViewerBoard, ViewerDot, ViewerProject, ViewerSolderPath} from "./project-data";
import {archHalfRunPx, archSamples, WirePath, WirePoint, wireRadius, wireStep} from "./wire-paths";

const PERFBOARD_COLOR = "#0e5a27";
// Stripboards are usually SRBP (paper-based), a warm brown.
const STRIPBOARD_COLOR = "#7a5230";
const COPPER_COLOR = "#c98a4f";
const HOLE_RADIUS = 0.5;
const PAD_RADIUS = 0.95;
const CORNER_RADIUS = 1.2;
// A stripboard's strips and the gap at each cut, the same sizes the editor draws (in mm here).
// Strips stop just short of the board's rounded edges.
const STRIP_WIDTH = STRIP_WIDTH_PITCH * PITCH;
const CUT_GAP = CUT_GAP_PITCH * PITCH;
const STRIP_END_INSET = 0.4;
// Lifts pads/holes off the faces they sit on so they don't z-fight with the board.
const SURFACE_LIFT = 0.015;

function roundedRect(width: number, depth: number, radius: number): Shape {
  const x = -width / 2, y = -depth / 2;
  const shape = new Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + depth - radius);
  shape.quadraticCurveTo(x + width, y + depth, x + width - radius, y + depth);
  shape.lineTo(x + radius, y + depth);
  shape.quadraticCurveTo(x, y + depth, x, y + depth - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

function instanced(geometry: CircleGeometry | RingGeometry, material: MeshBasicMaterial | MeshStandardMaterial, positions: Vector3[]): InstancedMesh {
  const mesh = new InstancedMesh(geometry, material, positions.length);
  const matrix = new Matrix4();
  positions.forEach((position, i) => mesh.setMatrixAt(i, matrix.makeTranslation(position.x, position.y, position.z)));
  mesh.receiveShadow = true;
  return mesh;
}

function buildSlab(frame: BoardFrame, color: string): Mesh {
  const geometry = new ExtrudeGeometry(roundedRect(frame.width, frame.depth, CORNER_RADIUS), {depth: BOARD_THICKNESS, bevelEnabled: false, curveSegments: 6});
  // The shape is drawn in XY and extruded along +z; lay it flat with the top face at y=0.
  geometry.rotateX(Math.PI / 2);
  const slab = new Mesh(geometry, new MeshStandardMaterial({color, roughness: 0.78}));
  slab.receiveShadow = true;
  return slab;
}

/** The holes, on both faces, with a copper ring round each on a perfboard (a stripboard's copper
 *  is its strips). */
function buildPadsAndHoles(frame: BoardFrame, dots: ViewerDot[], padEveryHole: boolean): Group {
  const group = new Group();
  const padMaterial = new MeshStandardMaterial({color: COPPER_COLOR, metalness: 1, roughness: 0.38, side: DoubleSide});
  const holeMaterial = new MeshBasicMaterial({color: "#040604", side: DoubleSide});
  const padGeometry = new RingGeometry(HOLE_RADIUS, PAD_RADIUS, 24).rotateX(-Math.PI / 2);
  const holeGeometry = new CircleGeometry(HOLE_RADIUS, 16).rotateX(-Math.PI / 2);

  for (const faceY of [SURFACE_LIFT, BOARD_BOTTOM_Y - SURFACE_LIFT]) {
    if (padEveryHole) group.add(instanced(padGeometry, padMaterial, dots.map(dot => frame.point(dot.x, dot.y, faceY))));
    // Holes sit a hair above their pads' plane so the black disc always wins the depth test.
    const holeY = faceY + Math.sign(faceY || 1) * 0.002;
    group.add(instanced(holeGeometry, holeMaterial, dots.map(dot => frame.point(dot.x, dot.y, holeY))));
  }
  return group;
}

// The stretches of copper along one strip, as [from, to] in mm along it: the whole strip, minus a
// gap at each cut.
function stripRuns(start: number, end: number, cuts: number[]): [number, number][] {
  const runs: [number, number][] = [];
  let from = start;
  for (const cut of [...cuts].sort((a, b) => a - b)) {
    if (cut - CUT_GAP / 2 > from) runs.push([from, cut - CUT_GAP / 2]);
    from = Math.max(from, cut + CUT_GAP / 2);
  }
  if (end > from) runs.push([from, end]);
  return runs;
}

/** A stripboard's copper strips, on its bottom face: one per row (or column) of holes. */
function buildStrips(frame: BoardFrame, board: Extract<ViewerBoard, {type: "stripboard"}>, dots: ViewerDot[]): Group {
  const group = new Group();
  const material = new MeshStandardMaterial({color: COPPER_COLOR, metalness: 1, roughness: 0.38, side: DoubleSide});
  const y = BOARD_BOTTOM_Y - SURFACE_LIFT;
  const horizontal = board.strips === "horizontal";
  // Each strip runs through one line of holes: a row's y, or a column's x (in canvas pixels).
  const lines = Array.from(new Set(dots.map(dot => horizontal ? dot.y : dot.x)));
  const halfLength = (horizontal ? frame.width : frame.depth) / 2 - STRIP_END_INSET;

  for (const line of lines) {
    const cuts = board.cuts
      .filter(cut => (horizontal ? cut.y : cut.x) === line)
      .map(cut => horizontal ? frame.x(cut.x) : frame.z(cut.y));
    for (const [from, to] of stripRuns(-halfLength, halfLength, cuts)) {
      const length = to - from;
      const geometry = horizontal ? new PlaneGeometry(length, STRIP_WIDTH) : new PlaneGeometry(STRIP_WIDTH, length);
      // PlaneGeometry stands in XY; lay it flat, facing down.
      geometry.rotateX(Math.PI / 2);
      const strip = new Mesh(geometry, material);
      const middle = (from + to) / 2;
      strip.position.set(horizontal ? middle : frame.x(line), y, horizontal ? frame.z(line) : middle);
      strip.receiveShadow = true;
      group.add(strip);
    }
  }
  return group;
}

/** The board itself: a rounded slab with a hole at every grid dot, and its copper. A perfboard
 *  has a pad around every hole, on both faces; a stripboard has bare SRBP on top and copper
 *  strips underneath, broken at each cut. */
export function buildBoard(kit: SceneKit, project: ViewerProject): Group {
  const {frame} = kit;
  const {board, dots} = project;
  const group = new Group();
  if (board.type === "stripboard") {
    group.add(buildSlab(frame, STRIPBOARD_COLOR));
    group.add(buildStrips(frame, board, dots));
    group.add(buildPadsAndHoles(frame, dots, false));
  } else {
    group.add(buildSlab(frame, PERFBOARD_COLOR));
    group.add(buildPadsAndHoles(frame, dots, true));
  }
  return group;
}

// A solder path's trail between its holes: a rod this thick, squashed flat against the copper.
const SOLDER_PATH_RADIUS = 0.5;
const SOLDER_PATH_FLATTEN = 0.45;

/** Solder paths on the bottom face: a flattened trail of solder from hole to hole, and a joint on
 *  every hole it covers (registered with the kit, for buildSolderJoints). */
export function buildSolderPaths(kit: SceneKit, paths: ViewerSolderPath[]): Group {
  const group = new Group();
  const material = kit.standard("solder", {color: "#d7dbe0", metalness: 1, roughness: 0.22});
  for (const path of paths) {
    const trail = kit.bentWire(path.points.map(p => kit.frame.point(p.x, p.y, 0)), SOLDER_PATH_RADIUS, material);
    trail.scale.y = SOLDER_PATH_FLATTEN;
    trail.position.y = BOARD_BOTTOM_Y - SURFACE_LIFT;
    group.add(trail);
    for (const hole of path.holes) kit.solder(hole.x, hole.y);
  }
  return group;
}

/** A solder fillet on the underside of every hole something was soldered into, and on top the
 *  hole filled with solder, so the joints show from above too (as the editor draws them). Built
 *  last, once every part has registered its holes with the kit. */
export function buildSolderJoints(kit: SceneKit): Group | null {
  const holes = Array.from(kit.solderedHoles.values());
  if (holes.length === 0) return null;
  const profile = [
    new Vector2(PAD_RADIUS, 0),
    new Vector2(0.86, 0.18),
    new Vector2(0.66, 0.42),
    new Vector2(0.46, 0.68),
    new Vector2(0.34, 0.92),
    new Vector2(0, 1.0),
  ];
  // Lathe builds upward from the pad; flip it to hang down from the bottom face.
  const geometry = new LatheGeometry(profile, 20).rotateX(Math.PI);
  const material = new MeshStandardMaterial({color: "#d7dbe0", metalness: 1, roughness: 0.22});
  const group = new Group();
  group.add(instanced(geometry as unknown as CircleGeometry, material, holes.map(h => new Vector3(h.x, BOARD_BOTTOM_Y - SURFACE_LIFT, h.z))));
  // Just over the hole's black disc (which sits 0.002 above its pad), and a little wider than the
  // hole, so a rim shows round a wire's end or a lead, inside the copper ring.
  const fill = new CircleGeometry(HOLE_RADIUS + 0.25, 24).rotateX(-Math.PI / 2);
  group.add(instanced(fill, material, holes.map(h => new Vector3(h.x, SURFACE_LIFT + 0.004, h.z))));
  return group;
}

// How a wire arches over what it doesn't join (its hops): clear of the wire underneath, or of a
// wire end's bend or a lead standing in a hole, rising and falling over this far either side.
const HOLE_ARCH_LIFT = 1.5;
const ARCH_RUN = 1.4;
const PX_PER_MM = PX_PER_PITCH / PITCH;

/** A wire's centreline in the scene: lying on the board, arching over each hop between its bends. */
function wireLine(frame: BoardFrame, points: WirePoint[], radius: number, bottom: boolean): Vector3[] {
  // Height in the scene of a wire `up` mm clear of its face: above the top face, below the bottom.
  const heightAt = (up: number) => bottom ? BOARD_BOTTOM_Y - up : up;
  const line: Vector3[] = [];
  for (let i = 0; i < points.length;) {
    const start = points[i];
    line.push(frame.point(start.x, start.y, heightAt(radius)));
    let next = i + 1;
    while (next < points.length && points[next].hop) next++;
    if (next >= points.length) break;
    const end = points[next];
    const length = Math.hypot(end.x - start.x, end.y - start.y);
    const hops = points.slice(i + 1, next).map(({x, y, hop}) => {
      return {
        at: Math.hypot(x - start.x, y - start.y),
        ...(hop?.runTo ? {until: Math.hypot(hop.runTo.x - start.x, hop.runTo.y - start.y)} : {}),
        lift: hop?.underWidth !== undefined ? wireStep(hop.underWidth) + (hop.stack ?? 0) : HOLE_ARCH_LIFT,
        halfRun: hop?.underWidth !== undefined ? archHalfRunPx(hop.underWidth) : ARCH_RUN * PX_PER_MM,
      };
    });
    for (const {at, lift} of archSamples(length, hops)) {
      const t = at / length;
      line.push(frame.point(start.x + (end.x - start.x) * t, start.y + (end.y - start.y) * t, heightAt(radius + lift)));
    }
    i = next;
  }
  return line;
}

// A wire's insulation stops this far (mm) short of each end hole, as a stripped jumper's does,
// though never more than this share of the wire, so a short one keeps some insulation.
const STRIP_LENGTH = 0.8;
const MAX_STRIP_SHARE = 0.3;
// The bare tinned copper inside.
const CONDUCTOR_RADIUS = 0.26;

/** `line` with `cut` mm taken off its start, following it round any bend. */
function trimStart(line: Vector3[], cut: number): Vector3[] {
  let left = cut;
  for (let i = 1; i < line.length; i++) {
    const run = line[i].distanceTo(line[i - 1]);
    if (run >= left) return [line[i - 1].clone().lerp(line[i], run ? left / run : 0), ...line.slice(i)];
    left -= run;
  }
  return line.slice(-1);
}

function lineLength(line: Vector3[]): number {
  return line.reduce((sum, p, i) => i ? sum + p.distanceTo(line[i - 1]) : 0, 0);
}

/** Insulated jumper wires lying on the top face (or, on the solder side, the bottom one). Each wire is one continuous insulated run, so
 *  its bends are just insulation; only its two free ends are stripped, the bare tinned copper
 *  bending down into the hole to its joint underneath, so it reads as soldered there. Where it
 *  crosses another wire, or a hole it doesn't join, it arches over (the later wire over the
 *  earlier, as the editor draws them). Thickness follows the editor's thin/normal/thick gauges. */
export function buildWires(kit: SceneKit, paths: WirePath[]): Group {
  const {frame} = kit;
  const group = new Group();
  const conductor = kit.standard("wire-conductor", {color: "#d0d4d8", metalness: 1, roughness: 0.3});
  for (const path of paths) {
    const radius = wireRadius(path.width);
    const insulation = kit.standard(`wire:${path.color}`, {color: path.color, roughness: 0.45});
    const points = wireLine(frame, path.points, radius, path.bottom);
    if (path.closed) {
      group.add(kit.bentWire(points, radius, insulation));
      // A loop has no free ends; round off the one corner bentWire leaves out.
      group.add(kit.ball(points[0], radius, insulation));
      continue;
    }
    // The insulation, cut square where it's stripped back from each end.
    const strip = Math.min(STRIP_LENGTH, lineLength(points) * MAX_STRIP_SHARE);
    const insulated = trimStart(trimStart(points, strip).reverse(), strip).reverse();
    group.add(kit.bentWire(insulated, radius, insulation));

    const ends = [
      {hole: path.points[0], stripped: insulated[0]},
      {hole: path.points[path.points.length - 1], stripped: insulated[insulated.length - 1]},
    ];
    for (const {hole: {x: px, y: py}, stripped} of ends) {
      // From where the insulation stops, over the hole and down through it.
      // (A wire on the solder side goes the other way: up into the hole from below.)
      const beside = frame.point(px, py, stripped.y);
      const through = path.bottom ? 0.4 : BOARD_BOTTOM_Y - 1.1;
      group.add(kit.bentWire([stripped, beside, frame.point(px, py, through)], CONDUCTOR_RADIUS, conductor));
      kit.solder(px, py);
    }
  }
  return group;
}
