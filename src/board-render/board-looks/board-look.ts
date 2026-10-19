import {SavedBoard} from "../../project-file/project-file";
import {Painter, Stamp} from "../painter/painter";

// How a bare board is drawn. Each board type has its own look (perfboard-look.ts,
// stripboard-look.ts), picked by boardLookFor() in index.ts. Purely visual: what's connected is
// the nets code's business (src/project-file/nets.ts), not the look's.
export interface BoardLook {
  // The board itself, plus any copper shared by several holes (a stripboard's strips and their
  // cuts). Painted first, under everything else.
  paintBoard(painter: Painter, board: SavedBoard, width: number, height: number): void;
  // A hole, stamped at every hole that has nothing on top hiding it.
  hole: Stamp;
}
