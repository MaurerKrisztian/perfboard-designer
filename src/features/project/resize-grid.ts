import {askConfirm} from "../ask-dialog";
import {LineState} from "../../state/LineState";
import {DotState} from "../../state/DotState";
import {GridConfig} from "../../state/GridConfig";
import {PartState} from "../../state/PartState";
import {IDot} from "../../interfaces/dot.interface";
import type {Part} from "../../interfaces/placed-part.interface";
import {redrawCanvas} from "../draw-canvas";
import {Canvas} from "../../state/Canvas";
import {applyCanvasResolution} from "../canvas-sizing";
import {fitToScreen} from "../zoom";
import {ViewState} from "../../state/ViewState";
import {buildDotIndex, dotPositionKey} from "../dot-lookup";
import {resetForNewBoard} from "../reset-interaction";
import {holesAlong} from "../../project-file/grid";

// The board's size in holes, as the Board section shows it.
export function boardSize(): {cols: number; rows: number} {
  return {cols: holesAlong(Canvas.gridWidth), rows: holesAlong(Canvas.gridHeight)};
}

// Lays out a fresh grid of holes. Holes found in `keep` (by position) are reused as-is rather than
// recreated, so their color and note survive, and so do the wires and parts anchored to them.
export function createDotGrid(horizontalDotNumbers: number, verticalDotNumbers: number, keep?: Map<string, IDot>) {
  Canvas.gridWidth = horizontalDotNumbers * GridConfig.dotSpace;
  Canvas.gridHeight = verticalDotNumbers * GridConfig.dotSpace;
  applyCanvasResolution(ViewState.zoom);

  DotState.dots = [];
  for(let x =  GridConfig.dotSpace / 2; x < Canvas.gridWidth; x +=  GridConfig.dotSpace){
    for(let y =  GridConfig.dotSpace / 2; y < Canvas.gridHeight; y +=  GridConfig.dotSpace){
      DotState.dots.push(keep?.get(dotPositionKey(x, y)) ?? {x: x, y: y, description: null});
    }
  }
}

// Resizes the board, keeping every hole, wire and part that still fits. Whatever falls off the new
// edge is removed, after asking. Resolves false if the size isn't one or the user cancelled.
export async function resizeBoard(cols: number, rows: number): Promise<boolean> {
  if (!(cols > 0 && rows > 0)) return false;
  const newWidth = cols * GridConfig.dotSpace;
  const newHeight = rows * GridConfig.dotSpace;
  const oldDots = buildDotIndex();
  const fitsNewBoard = (p: {x: number; y: number}) => p.x < newWidth && p.y < newHeight;

  // Same rule as dragging: a part fits when every hole it covers lands on the new board. Holes it
  // already overhung the old board with are exempt, since placement never required a part to fit.
  const partFits = (part: Part) =>
    part.getAnchorDots().every(fitsNewBoard)
    && part.getOccupiedPositions().every(p => !oldDots.has(dotPositionKey(p.x, p.y)) || fitsNewBoard(p));

  // A wire whose ends fit stays; any corner off the new edge is dropped, straightening it there.
  const keptLines = LineState.lines
    .filter(line => fitsNewBoard(line.start) && fitsNewBoard(line.end))
    .map(line => line.via && !line.via.every(fitsNewBoard) ? {...line, via: line.via.filter(fitsNewBoard)} : line);
  const keptParts = PartState.parts.filter(partFits);

  const droppedWires = LineState.lines.length - keptLines.length;
  const droppedParts = PartState.parts.length - keptParts.length;
  if (droppedWires + droppedParts > 0) {
    const what = [
      droppedWires ? `${droppedWires} wire${droppedWires === 1 ? "" : "s"}` : "",
      droppedParts ? `${droppedParts} part${droppedParts === 1 ? "" : "s"}` : "",
    ].filter(Boolean).join(" and ");
    if (!await askConfirm("Resize the board?", `Resizing will remove ${what} that no longer fit on the board. This can't be undone.`, "Resize", true)) {
      return false;
    }
  }

  resetForNewBoard();
  LineState.lines = keptLines;
  PartState.parts = keptParts;
  createDotGrid(cols, rows, oldDots);
  redrawCanvas();
  fitToScreen(true);
  return true;
}
