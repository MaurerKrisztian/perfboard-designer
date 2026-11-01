import {ProjectFile} from "../project-file/project-file";
import {artistFor, boardParts} from "./artists";
import {BoardView, PLAIN_VIEW} from "./board-view";
import {boardSizePx} from "./draw-board";

// How far parts reach past the board's edges, in drawing px: a jack's barrel, a pot's shaft, a
// capacitor on the edge's holes. A picture of the board grows by this much so they show whole; the
// board itself stays the same size, with its top-left corner still at drawing point (0, 0).

export interface Overhang {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export const NO_OVERHANG: Overhang = {left: 0, top: 0, right: 0, bottom: 0};

// `view`: the solder side shows the board mirrored, so what passes one side passes the other.
export function boardOverhang(project: ProjectFile, view: BoardView = PLAIN_VIEW): Overhang {
  const {width, height} = boardSizePx(project.board);
  let left = 0, top = 0, right = 0, bottom = 0;
  for (const part of boardParts(project)) {
    const extent = artistFor(part).extent(part.entry);
    if (!extent) continue;
    left = Math.max(left, -extent.x);
    top = Math.max(top, -extent.y);
    right = Math.max(right, extent.x + extent.w - width);
    bottom = Math.max(bottom, extent.y + extent.h - height);
  }
  return {
    left: Math.ceil(view.solderSide ? right : left),
    top: Math.ceil(top),
    right: Math.ceil(view.solderSide ? left : right),
    bottom: Math.ceil(bottom),
  };
}
