import {ProjectFile} from "../project-file/project-file";
import {boardOverhang, NO_OVERHANG} from "./board-overhang";
import {BoardView, PLAIN_VIEW} from "./board-view";
import {boardSizePx, drawBoard} from "./draw-board";
import {SvgIcons, SvgPainter} from "./painter/svg-painter";

// A board as a standalone SVG document. Runs anywhere (no DOM): the MCP server's Worker and SVG
// export both use it. `icons` hands over each part icon's SVG source; parts whose icon it doesn't
// have are drawn with their stand-in box.

export interface SvgRenderOptions {
  icons?: SvgIcons;
  view?: BoardView;
  // Display size per drawing px: 1 is 50px per hole pitch.
  scale?: number;
  idPrefix?: string;
  // Only the board's own area, cutting off what parts reach past its edges: for a picture that has
  // to be the board's true size.
  boardOnly?: boolean;
}

export function renderBoardSvg(project: ProjectFile, options: SvgRenderOptions = {}): string {
  const painter = new SvgPainter({icons: options.icons, idPrefix: options.idPrefix});
  const view = options.view ?? PLAIN_VIEW;
  drawBoard(painter, project, view);
  const {width, height} = boardSizePx(project.board);
  const {left, top, right, bottom} = options.boardOnly ? NO_OVERHANG : boardOverhang(project, view);
  return painter.toSvg(width + left + right, height + top + bottom, options.scale ?? 1, -left, -top);
}
