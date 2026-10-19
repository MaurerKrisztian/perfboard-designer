import {gridToPx, GRID_PITCH_PX, rowLetters} from "../../project-file/grid";
import {SavedBoard} from "../../project-file/project-file";
import {Painter} from "../painter/painter";
import {PAD_RADIUS} from "../palette";

// What a real board has printed round its edge: each column's number along the top and bottom,
// each row's letter down the left and right (holeName() in grid.ts), in the strip between the edge
// and the first holes. Printed on the board, so parts and wires go over it.

const PRINT_COLOR = "rgba(255,255,255,0.78)";
const PRINT_FONT = {family: "sans", size: 9, weight: 600} as const;
// Midway between the board's edge and the first holes' pads.
const INSET = (GRID_PITCH_PX / 2 - PAD_RADIUS) / 2;

// `mirrored`: the board seen from below, so the columns run right to left (the text still reads).
export function drawHoleLabels(painter: Painter, board: SavedBoard, width: number, height: number, mirrored = false) {
  const style = {font: PRINT_FONT, color: PRINT_COLOR, align: "center", baseline: "middle"} as const;
  for (let col = 0; col < board.cols; col++) {
    const x = mirrored ? width - gridToPx(col) : gridToPx(col);
    painter.text(String(col + 1), x, INSET, style);
    painter.text(String(col + 1), x, height - INSET, style);
  }
  for (let row = 0; row < board.rows; row++) {
    const y = gridToPx(row);
    painter.text(rowLetters(row), INSET, y, style);
    painter.text(rowLetters(row), width - INSET, y, style);
  }
}
