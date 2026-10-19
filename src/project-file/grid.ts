// Project files store grid positions; the editor and the 3D viewer draw in pixels, with one hole
// per GRID_PITCH_PX cell and each hole centered in its cell.
export const GRID_PITCH_PX = 50;
const FIRST_HOLE_PX = GRID_PITCH_PX / 2;

// [column, row] of a hole, counted from the top-left hole.
export type GridPos = [number, number];

export function gridToPx(index: number): number {
  return FIRST_HOLE_PX + index * GRID_PITCH_PX;
}

// The grid index of a pixel coordinate that sits exactly on a hole, else undefined.
export function pxToGrid(px: number): number | undefined {
  const index = (px - FIRST_HOLE_PX) / GRID_PITCH_PX;
  return Number.isInteger(index) ? index : undefined;
}

// Grid position of a point the editor knows is a hole (every anchor is one of its dots).
export function toGridPos(point: {x: number; y: number}): GridPos {
  return [Math.round((point.x - FIRST_HOLE_PX) / GRID_PITCH_PX), Math.round((point.y - FIRST_HOLE_PX) / GRID_PITCH_PX)];
}

// A hole's name as printed round a real board's edge: rows lettered from A (Z, then AA, AB…) and
// columns numbered from 1, so [2, 0] is "A3". For people; files and the MCP server count from 0.
export function rowLetters(row: number): string {
  let name = "";
  for (let n = row + 1; n > 0; n = Math.floor((n - 1) / 26)) name = String.fromCharCode(65 + (n - 1) % 26) + name;
  return name;
}

export function holeName([col, row]: GridPos): string {
  return `${rowLetters(row)}${col + 1}`;
}

// How many holes fit along a board edge this many pixels long.
export function holesAlong(px: number): number {
  return Math.max(0, Math.ceil((px - FIRST_HOLE_PX) / GRID_PITCH_PX));
}
