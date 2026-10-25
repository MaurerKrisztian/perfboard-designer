// The 3D viewer's own, read-only view of a saved project file. It is deliberately decoupled
// from the editor's state classes: the file is read by the same pure reader the editor uses
// (src/project-file/), then laid out in pixels, so the viewer can render any project file on its own.

import {GRID_PITCH_PX, GridPos, gridToPx} from "../project-file/grid";
import {readProjectFile} from "../project-file/read-project-file";
import {StripDirection} from "../project-file/project-file";
import {layoutProjectWires} from "../project-file/wire-crossings";
import {partList, PartListRow} from "../project-file/part-list";
import {isBottomWire, isSolderPath, solderPathHoles, wireLegs, wirePoints} from "../project-file/wire-path";
import {archHalfRunPx, wireStep} from "./wire-paths";
import type {CustomPartSpec} from "../parts/custom-parts";

export type Rotation = 0 | 90 | 180 | 270;

export interface ViewerDot {
  x: number;
  y: number;
}

export type ViewerBoard =
  | {type: "perfboard"}
  | {type: "stripboard"; strips: StripDirection; cuts: {x: number; y: number}[]};

// Where a wire goes over something it doesn't join (see wire-crossings.ts), in pixels.
// `underWidth` is the width of the wire it crosses; absent over a hole holding a pin, a lead or
// another wire's end.
export interface ViewerHop {
  x: number;
  y: number;
  // Which leg of the wire it's on (WireHop.leg): 0 before the first bend.
  leg: number;
  underWidth?: number;
  // How high (mm) the wire underneath already stands there, over wires of its own.
  stack?: number;
  // Set when the wire runs along the other wire's run over a stretch: where the stretch ends
  // (x, y is where it starts).
  runTo?: {x: number; y: number};
}

export interface ViewerWire {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  // Where it bends, in order from (x1, y1) (SavedWire.via).
  via: {x: number; y: number}[];
  color: string;
  width: number;
  // On the solder side (SavedWire.side), under the board.
  bottom: boolean;
  // In order from (x1, y1).
  hops: ViewerHop[];
}

// A solder path on the copper side (SavedWire.kind "solder"): its route, and every hole it covers.
export interface ViewerSolderPath {
  points: ViewerDot[];
  holes: ViewerDot[];
}

export interface ViewerIc {
  // What the part is called in an exported model: its ref, what it is and its value (partLabel).
  label: string;
  name: string;
  widthPin: number;
  heightPin: number;
  rotationAngle: Rotation;
  pinDescription: Record<number, string>;
  // Catalog category it was placed from; undefined in files that predate it.
  category?: string;
  left: number;
  top: number;
}

export interface ViewerStandardPart {
  label: string;
  definitionId: string;
  value?: string;
  color?: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export interface ViewerAdvancedPart {
  label: string;
  definitionId: string;
  // A user-made part's own definition (SavedAdvancedComponent.custom).
  custom?: CustomPartSpec;
  value?: string;
  rotationAngle: Rotation;
  anchorX: number;
  anchorY: number;
  rows: number;
  cols: number;
}

export interface ViewerProject {
  canvasWidth: number;
  canvasHeight: number;
  board: ViewerBoard;
  dots: ViewerDot[];
  // The jumper wires; solder paths are listed apart.
  wires: ViewerWire[];
  solderPaths: ViewerSolderPath[];
  ics: ViewerIc[];
  standardParts: ViewerStandardPart[];
  advancedParts: ViewerAdvancedPart[];
}

const DEFAULT_WIRE_COLOR = "#777676";
const DEFAULT_WIRE_WIDTH = 4;

const px = ([col, row]: GridPos) => ({x: gridToPx(col), y: gridToPx(row)});

// A part as the component list names it: "R1 Resistor 10kΩ", "U1 NE555 Timer".
const partLabel = (row: PartListRow) => [row.ref, row.part, row.value].filter(Boolean).join(" ");

/** Reads a project file (already JSON-decoded, any version) into the viewer's pixel-space model.
 *  Throws ProjectFileError on files that aren't perfboard projects at all; individual malformed
 *  entries are left out instead. */
export function readProject(raw: unknown): ViewerProject {
  const {project} = readProjectFile(raw);
  const labels = new Map(partList(project).map(row => [row.ref, partLabel(row)]));
  const labelOf = (ref: string) => labels.get(ref) ?? ref;
  const {cols, rows} = project.board;
  const board: ViewerBoard = project.board.type === "stripboard"
    ? {type: "stripboard", strips: project.board.strips, cuts: project.board.cuts.map(px)}
    : {type: "perfboard"};

  const dots: ViewerDot[] = [];
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) dots.push(px([col, row]));
  }

  const {hops, runs} = layoutProjectWires(project);
  const widthOf = (index: number) => project.wires[index].width ?? DEFAULT_WIRE_WIDTH;
  // How high (mm) wire `wire` stands above the board at `at`: over every wire it goes over near
  // there (within the rise either side of the crossing, or along the stretch lying over a wire),
  // each of which may stand on others in turn. Over a ramp this errs high, never into the wire. A
  // wire only goes over earlier ones, so it ends.
  const distance = (a: readonly number[], b: readonly number[]) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const distanceToRun = (run: {from: readonly number[]; to: readonly number[]}, at: readonly number[]) => {
    const dx = run.to[0] - run.from[0], dy = run.to[1] - run.from[1];
    const length2 = dx * dx + dy * dy;
    const t = length2 ? Math.max(0, Math.min(1, ((at[0] - run.from[0]) * dx + (at[1] - run.from[1]) * dy) / length2)) : 0;
    return distance(at, [run.from[0] + t * dx, run.from[1] + t * dy]);
  };
  const reachOf = (underWidth: number) => archHalfRunPx(underWidth) / GRID_PITCH_PX;
  const elevation = (wire: number, at: readonly number[]): number => {
    let best = 0;
    for (const hop of hops) {
      if (hop.wire === wire && hop.under !== undefined && distance(hop.at, at) <= reachOf(widthOf(hop.under))) {
        best = Math.max(best, wireStep(widthOf(hop.under)) + elevation(hop.under, hop.at));
      }
    }
    for (const run of runs) {
      if (run.wire === wire && distanceToRun(run, at) <= reachOf(widthOf(run.under))) {
        best = Math.max(best, wireStep(widthOf(run.under)) + elevation(run.under, at));
      }
    }
    return best;
  };
  const wires: ViewerWire[] = project.wires.flatMap((wire, i) => {
    if (isSolderPath(wire)) return [];
    const from = px(wire.from);
    const to = px(wire.to);
    const legStarts = wireLegs(wire).map(leg => px(leg.from));
    const found: ViewerHop[] = [
      ...hops.filter(hop => hop.wire === i).map(hop => ({
        ...px(hop.at),
        leg: hop.leg,
        ...(hop.under !== undefined ? {underWidth: widthOf(hop.under), stack: elevation(hop.under, hop.at)} : {}),
      })),
      ...runs.filter(run => run.wire === i).map(run => ({
        ...px(run.from),
        leg: run.leg,
        underWidth: widthOf(run.under),
        stack: Math.max(elevation(run.under, run.from), elevation(run.under, run.to)),
        runTo: px(run.to),
      })),
    ];
    // In order along each leg, a stretch by where it starts.
    const reach = (hop: ViewerHop) => Math.hypot(hop.x - legStarts[hop.leg].x, hop.y - legStarts[hop.leg].y);
    found.sort((a, b) => a.leg - b.leg || reach(a) - reach(b));
    return [{
      x1: from.x, y1: from.y, x2: to.x, y2: to.y,
      via: (wire.via ?? []).map(px),
      color: wire.color ?? DEFAULT_WIRE_COLOR, width: wire.width ?? DEFAULT_WIRE_WIDTH,
      bottom: isBottomWire(wire),
      hops: found,
    }];
  });

  const solderPaths: ViewerSolderPath[] = project.wires.filter(isSolderPath).map(wire => ({
    points: wirePoints(wire).map(px),
    holes: solderPathHoles(wire).map(px),
  }));

  const ics: ViewerIc[] = project.placedIcs.map(ic => {
    const {x: left, y: top} = px(ic.at);
    return {
      label: labelOf(ic.ref),
      name: ic.name,
      // The chip body needs two pin columns to have any width.
      widthPin: Math.max(2, ic.widthPin),
      heightPin: ic.heightPin,
      rotationAngle: ic.rotation,
      pinDescription: ic.pinDescription,
      category: ic.category,
      left, top,
    };
  });

  const standardParts: ViewerStandardPart[] = project.placedStandardComponents.map(part => {
    const start = px(part.from);
    const end = px(part.to);
    return {
      label: labelOf(part.ref),
      definitionId: part.definitionId, value: part.value, color: part.color,
      startX: start.x, startY: start.y, endX: end.x, endY: end.y,
    };
  });

  const advancedParts: ViewerAdvancedPart[] = project.placedAdvancedComponents.map(part => {
    const anchor = px(part.at);
    return {
      label: labelOf(part.ref),
      definitionId: part.definitionId, ...(part.custom ? {custom: part.custom} : {}), value: part.value, rotationAngle: part.rotation,
      anchorX: anchor.x, anchorY: anchor.y, rows: part.rows, cols: part.cols,
    };
  });

  return {
    canvasWidth: cols * GRID_PITCH_PX, canvasHeight: rows * GRID_PITCH_PX,
    board, dots, wires, solderPaths, ics, standardParts, advancedParts,
  };
}
