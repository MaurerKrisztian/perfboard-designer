import {GRID_PITCH_PX} from "../project-file/grid";
import {partPins} from "../project-file/pin-positions";
import {ProjectFile, SavedBoard} from "../project-file/project-file";
import {layoutProjectWires} from "../project-file/wire-crossings";
import {BoardView, isHovered, isSelected, PLAIN_VIEW} from "./board-view";
import {boardLookFor} from "./board-looks";
import {drawHoleLabels} from "./layers/hole-labels";
import {drawHoles} from "./layers/holes";
import {drawNetHighlight} from "./layers/net-highlight";
import {drawPartLabels} from "./layers/part-labels";
import {drawJunctions, drawSolderPath, drawSolderPaths, drawWires, drawWiresFromBelow, drawWiresThroughParts} from "./layers/wires";
import {isSolderPath} from "../project-file/wire-path";
import {drawCutMarks, drawSolderJoints, drawSolderRefs, solderJoints} from "./layers/solder-side";
import {gridToPx} from "../project-file/grid";
import {Painter, Point} from "./painter/painter";
import {artistFor, boardParts} from "./artists";
import {BoardPart, PartLook} from "./artists/part-artist";

// A whole board, drawn from its project file: the one place that knows what goes on top of what.

// The board's size in drawing px: one pitch per hole, each hole centred in its cell.
export function boardSizePx(board: SavedBoard): {width: number; height: number} {
  return {width: board.cols * GRID_PITCH_PX, height: board.rows * GRID_PITCH_PX};
}

export function drawBoard(painter: Painter, project: ProjectFile, view: BoardView = PLAIN_VIEW) {
  if (view.solderSide) {
    drawSolderSide(painter, project, !!view.holeLabels);
    return;
  }
  const {width, height} = boardSizePx(project.board);
  const look = boardLookFor(project.board.type);
  const parts = boardParts(project);
  const wireLayout = layoutProjectWires(project);
  const lookOf = (part: BoardPart): PartLook => ({
    selected: isSelected(view, {kind: "part", ref: part.entry.ref}),
    showRef: view.partLabels,
  });
  const drawLayer = (layer: "under-board" | "over-wires") => {
    for (const part of parts) {
      const artist = artistFor(part);
      if (artist.layer === layer) artist.draw(painter, part.entry, lookOf(part));
    }
  };

  // 1. The bare board, with a stripboard's strips and cuts, and what's printed round its edge.
  look.paintBoard(painter, project.board, width, height);
  if (view.holeLabels) drawHoleLabels(painter, project.board, width, height);
  // 2. Chips, lying flat under the holes.
  drawLayer("under-board");
  // 3. Holes, except those a chip's body covers.
  drawHoles(painter, project, look, holesUnderChips(project), view);
  // 3b. Solder paths, on the copper side but shown through the board: they join what they cover.
  drawSolderPaths(painter, project.wires, view);
  // 4. Jumper wires, each with dark edges where it goes over something it doesn't join. Those on
  // the solder side are under the board's other face: faded, unless selected or hovered.
  const isPicked = (index: number) => isSelected(view, {kind: "wire", index}) || isHovered(view, {kind: "wire", index});
  painter.group({opacity: GHOST_BOTTOM_WIRES}, () => drawWires(painter, project.wires, wireLayout.hops, PLAIN_VIEW, "bottom", index => !isPicked(index)));
  drawWires(painter, project.wires, wireLayout.hops, view, "bottom", isPicked);
  drawWires(painter, project.wires, wireLayout.hops, view, "top");
  // 5. Every other part, standing above the wires; the wires show through them, faded.
  drawLayer("over-wires");
  drawWiresThroughParts(painter, project.wires);
  // 5b. Each part's pins, so a pin under a body still shows (under the labels, which stay readable).
  for (const part of parts) artistFor(part).drawPinMarks?.(painter, part.entry);
  // 6. Solder dots where three or more things are joined, over component leads too.
  drawJunctions(painter, wireLayout.junctions);
  // 7. Refs and values.
  if (view.partLabels) drawPartLabels(painter, parts, width, height);
  // 8. What goes over everything: a chip's pin numbers.
  for (const part of parts) artistFor(part).drawOverlay?.(painter, part.entry, lookOf(part));
  // 9. A net lit up.
  if (view.highlight) drawNetHighlight(painter, view.highlight);
}

// Parts and wires show through the board from the solder side this faintly, for bearings; the
// wires a little more, since they tell which joints belong together.
const GHOST_PARTS = 0.18;
const GHOST_WIRES = 0.4;
// The solder side's wires in the top view: under the board, so faint.
const GHOST_BOTTOM_WIRES = 0.35;

// The board from below, for soldering: mirrored left to right, copper side up (a stripboard's
// strips and cuts and the solder paths at full strength), the component side faded behind it,
// every joint marked and each chip's pin 1 boxed. A wire stops short of each joint it only passes
// over, so it's plain which joints it's soldered into.
function drawSolderSide(painter: Painter, project: ProjectFile, holeLabels: boolean) {
  const {width, height} = boardSizePx(project.board);
  const look = boardLookFor(project.board.type);
  const parts = boardParts(project);
  const plainLook: PartLook = {selected: false, showRef: false};
  const drawLayer = (layer: "under-board" | "over-wires") => {
    for (const part of parts) {
      const artist = artistFor(part);
      if (artist.layer === layer) artist.draw(painter, part.entry, plainLook);
    }
  };

  const {hops} = layoutProjectWires(project);
  const joints = solderJoints(project);

  painter.group({flipX: width}, () => {
    look.paintBoard(painter, project.board, width, height);
    const holes: Point[] = [];
    for (let col = 0; col < project.board.cols; col++) {
      for (let row = 0; row < project.board.rows; row++) holes.push({x: gridToPx(col), y: gridToPx(row)});
    }
    painter.stamp(look.hole, holes);
    painter.group({opacity: GHOST_PARTS}, () => drawLayer("under-board"));
    painter.group({opacity: GHOST_WIRES}, () => drawWiresFromBelow(painter, project.wires, hops, joints, "top"));
    painter.group({opacity: GHOST_PARTS}, () => drawLayer("over-wires"));
    for (const wire of project.wires) if (isSolderPath(wire)) drawSolderPath(painter, wire);
    // The wires on this face, over the solder paths, at full strength.
    drawWiresFromBelow(painter, project.wires, hops, joints, "bottom");
  });
  // Outside the mirrored group, so the print reads the right way round.
  if (holeLabels) drawHoleLabels(painter, project.board, width, height, true);
  if (project.board.type === "stripboard") drawCutMarks(painter, project.board.cuts, width);
  drawSolderJoints(painter, project, width);
  drawSolderRefs(painter, project, width);
}

// Holes under a chip's body that aren't its pins, by "col,row".
function holesUnderChips(project: ProjectFile): Set<string> {
  const hidden = new Set<string>();
  for (const part of partPins(project)) {
    if (part.kind === "ic") for (const [col, row] of part.coveredHoles) hidden.add(`${col},${row}`);
  }
  return hidden;
}
