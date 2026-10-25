import {boardSizePx, renderBoardSvg} from "../../board-render";
import type {BoardView, SvgIcons} from "../../board-render";
import {GRID_PITCH_PX} from "../../project-file/grid";
import type {ProjectFile, SavedBoard} from "../../project-file/project-file";

// The board's pictures for paper (project-document.ts): drawn by the board renderer as SVG, either
// scaled to fit the page or at true size, 2.54 mm a hole, with a 50 mm bar to check the printer
// kept the scale.

// A hole pitch is 2.54 mm and GRID_PITCH_PX drawing px.
const MM_PER_PX = 2.54 / GRID_PITCH_PX;

export const TOP_VIEW: BoardView = {partLabels: true, holeLabels: true};
export const SOLDER_VIEW: BoardView = {solderSide: true, holeLabels: true};

export function boardSizeMm(board: SavedBoard): {width: number; height: number} {
  const px = boardSizePx(board);
  return {width: px.width * MM_PER_PX, height: px.height * MM_PER_PX};
}

// For people: to 0.1 mm. For the page itself, exact, so a big board doesn't drift off size.
export const mm = (value: number) => `${Math.round(value * 10) / 10}`;
const exactMm = (value: number) => `${Number(value.toFixed(3))}mm`;

// The board as an SVG; its size is set by the page's CSS (.fit or .true-size below). `idPrefix`
// keeps the ids of several pictures in one page apart.
export function boardPicture(project: ProjectFile, view: BoardView, icons: SvgIcons, idPrefix: string): string {
  return renderBoardSvg(project, {icons, view, idPrefix});
}

export function trueSizePicture(project: ProjectFile, view: BoardView, icons: SvgIcons, idPrefix: string): string {
  const {width, height} = boardSizeMm(project.board);
  return `<div class="true-size" style="--width: ${exactMm(width)}; --height: ${exactMm(height)}">${boardPicture(project, view, icons, idPrefix)}</div>`;
}

// A 50 mm bar with a tick each 10 mm: measured, it shows whether the printout is true to size.
export function checkBar(): string {
  const ticks = [0, 10, 20, 30, 40, 50].map(x => `<line x1="${x}" y1="${x % 50 ? 2.5 : 0}" x2="${x}" y2="5"/>`).join("");
  return `<div class="check-bar">
    <svg viewBox="-0.2 0 50.4 5" stroke="#16201c" stroke-width="0.3"><line x1="0" y1="5" x2="50" y2="5"/>${ticks}</svg>
    <p>This bar should measure 50 mm. If it doesn't, print again at 100% (Actual size), not "Fit to page".</p>
  </div>`;
}

export const BOARD_PRINT_STYLE = `
  /* True size: the SVG's drawing px are scaled to millimetres, whatever its own size says. */
  .true-size svg { display: block; width: var(--width); height: var(--height); }
  .check-bar { margin-top: 6mm; }
  .check-bar svg { display: block; width: 50mm; height: 5mm; }
  .check-bar p { margin: 1mm 0 0; color: #5d6b64; font-size: 8.5pt; }
`;
