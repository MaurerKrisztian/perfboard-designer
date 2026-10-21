import {GridPos, gridToPx} from "../../project-file/grid";
import {partPins} from "../../project-file/pin-positions";
import {ProjectFile} from "../../project-file/project-file";
import {isSolderPath, solderPathHoles} from "../../project-file/wire-path";
import {Painter} from "../painter/painter";
import {LABEL_COLOR, LABEL_HALO, PAD_RADIUS, SOLDER_COLOR, SOLDER_EDGE} from "../palette";

// What the solder side view marks over the mirrored board (drawBoard does the board itself): a
// blob of solder on every hole that needs one, a square round pin 1 of every part with more than
// two pins (so a chip can't go in backwards), each part's ref by its joints, and a stripboard's
// cuts. Drawn outside the mirrored group, at mirrored positions, so the text reads the right way.

const SOLDER_SHINE = "#ffffff";
const CUT_COLOR = "#ef4444";
const PIN1_COLOR = "#fbbf24";
const REF_FONT = {family: "sans", size: 11, weight: 700} as const;

const key = ([col, row]: GridPos) => `${col},${row}`;

// Every hole to solder: each part's pins and leads, each jumper's ends and every hole a solder
// path covers. Once each.
export function solderJoints(project: ProjectFile): GridPos[] {
  const joints = new Map<string, GridPos>();
  for (const part of partPins(project)) {
    for (const pin of part.pins) joints.set(key(pin.at), pin.at);
  }
  for (const wire of project.wires) {
    for (const at of isSolderPath(wire) ? solderPathHoles(wire) : [wire.from, wire.to]) joints.set(key(at), at);
  }
  return [...joints.values()];
}

// The board is `width` px wide; a hole's x as seen from below.
const mirroredX = (col: number, width: number) => width - gridToPx(col);

// Pin 1 of each part with more than two pins.
export function firstPins(project: ProjectFile): GridPos[] {
  const firsts: GridPos[] = [];
  for (const part of partPins(project)) {
    const first = part.pins.length > 2 ? part.pins.find(pin => pin.pin === 1) : undefined;
    if (first) firsts.push(first.at);
  }
  return firsts;
}

export function drawSolderJoints(painter: Painter, project: ProjectFile, width: number) {
  const half = PAD_RADIUS + 5;
  for (const [col, row] of firstPins(project)) {
    painter.rect(mirroredX(col, width) - half, gridToPx(row) - half, half * 2, half * 2, {stroke: {paint: PIN1_COLOR, width: 2.5}}, 2);
  }
  for (const [col, row] of solderJoints(project)) {
    const x = mirroredX(col, width), y = gridToPx(row);
    painter.circle(x, y, PAD_RADIUS + 1.5, {fill: SOLDER_COLOR, stroke: {paint: SOLDER_EDGE, width: 2}});
    painter.circle(x - 2.5, y - 2.5, 3.2, {fill: SOLDER_SHINE});
  }
}

// Each part's ref at the middle of its pins, so a joint can be told from its neighbours.
export function drawSolderRefs(painter: Painter, project: ProjectFile, width: number) {
  for (const part of partPins(project)) {
    if (!part.pins.length) continue;
    const col = part.pins.reduce((sum, pin) => sum + pin.at[0], 0) / part.pins.length;
    const row = part.pins.reduce((sum, pin) => sum + pin.at[1], 0) / part.pins.length;
    painter.text(part.ref, mirroredX(col, width), gridToPx(row) + 4, {
      font: REF_FONT, color: LABEL_COLOR, align: "center", halo: LABEL_HALO,
    });
  }
}

// A stripboard's cuts, made from this side: a red cross on each.
export function drawCutMarks(painter: Painter, cuts: GridPos[], width: number) {
  const r = PAD_RADIUS;
  for (const [col, row] of cuts) {
    const x = mirroredX(col, width), y = gridToPx(row);
    const stroke = {paint: CUT_COLOR, width: 3.5, cap: "round" as const};
    painter.line([{x: x - r, y: y - r}, {x: x + r, y: y + r}], stroke);
    painter.line([{x: x - r, y: y + r}, {x: x + r, y: y - r}], stroke);
  }
}
