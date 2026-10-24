import {GridPos, gridToPx} from "../../project-file/grid";
import {ProjectFile} from "../../project-file/project-file";
import {BoardView, isHovered, isSelected, soleSelected} from "../board-view";
import {BoardLook} from "../board-looks/board-look";
import {Painter, Point, Stamp} from "../painter/painter";
import {HOLE_RADIUS, PAD_RADIUS, SELECTION_COLOR, SOLDER_COLOR, SOLDER_EDGE} from "../palette";
import {solderJoints} from "./solder-side";

// Every hole of the board: holes stamped, solder in each hole that gets some (a pin, a lead or a wire end, so the board shows where to solder), then the rings
// that mark the selected, hovered or placement-start hole, then the notes written under holes. Holes
// under a chip's body (`hidden`) aren't drawn, since the chip sits on top of them; its pins are.

const START_RING_COLOR = "#22c55e";
const HOVER_RING_COLOR = "#e2e8f0";
const NOTE_FONT = {family: "sans", size: 10} as const;
const NOTE_COLOR = "#a4a0a0";
// Notes show their first few letters, and all of it while the hole is hovered.
const NOTE_PREVIEW_LENGTH = 5;

const key = ([col, row]: GridPos) => `${col},${row}`;

// Fills the hole and a little of its pad, leaving the copper ring around it.
const SOLDER_FILL: Stamp = {
  id: "solder-fill",
  radius: HOLE_RADIUS + 2,
  draw(painter) {
    painter.circle(0, 0, HOLE_RADIUS + 1, {fill: SOLDER_COLOR, stroke: {paint: SOLDER_EDGE, width: 1}});
    painter.circle(-1.8, -1.8, 2, {fill: "#ffffff"});
  },
};

export function drawHoles(painter: Painter, project: ProjectFile, look: BoardLook, hidden: Set<string>, view: BoardView) {
  const {cols, rows} = project.board;
  const holes: Point[] = [];
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      if (!hidden.has(key([col, row]))) holes.push({x: gridToPx(col), y: gridToPx(row)});
    }
  }
  painter.stamp(look.hole, holes);
  painter.stamp(SOLDER_FILL, solderJoints(project)
    .filter(at => !hidden.has(key(at)))
    .map(([col, row]) => ({x: gridToPx(col), y: gridToPx(row)})));

  drawHoleRings(painter, view, cols, rows);

  for (const pad of project.pads) {
    const hovered = isHovered(view, {kind: "hole", at: pad.at});
    const text = hovered ? pad.note : pad.note.substring(0, NOTE_PREVIEW_LENGTH);
    painter.text(text, gridToPx(pad.at[0]), gridToPx(pad.at[1]) + PAD_RADIUS + 11, {
      font: NOTE_FONT, color: NOTE_COLOR, align: "center",
    });
  }
}

// One ring per hole at most: selected wins over a placement's start, which wins over hover.
function drawHoleRings(painter: Painter, view: BoardView, cols: number, rows: number) {
  const onBoard = ([col, row]: GridPos) => col >= 0 && row >= 0 && col < cols && row < rows;
  const sole = soleSelected(view);
  const selected = sole?.kind === "hole" && onBoard(sole.at) ? sole.at : undefined;
  if (selected) {
    const x = gridToPx(selected[0]), y = gridToPx(selected[1]);
    painter.circle(x, y, PAD_RADIUS + 4, {stroke: {paint: SELECTION_COLOR, width: 3}});
    painter.circle(x, y, PAD_RADIUS + 1, {stroke: {paint: "#ffffff", width: 1.5}});
  }
  const start = view.startHole && onBoard(view.startHole) && !isSelected(view, {kind: "hole", at: view.startHole})
    ? view.startHole : undefined;
  if (start) {
    painter.circle(gridToPx(start[0]), gridToPx(start[1]), PAD_RADIUS + 4, {stroke: {paint: START_RING_COLOR, width: 3}});
  }
  for (const item of view.hovered ?? []) {
    if (item.kind !== "hole" || !onBoard(item.at) || isSelected(view, item)) continue;
    if (start && start[0] === item.at[0] && start[1] === item.at[1]) continue;
    painter.circle(gridToPx(item.at[0]), gridToPx(item.at[1]), PAD_RADIUS + 3, {stroke: {paint: HOVER_RING_COLOR, width: 2}});
  }
}
