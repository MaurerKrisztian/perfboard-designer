import {LineState} from "../../state/LineState";
import {PartState} from "../../state/PartState";
import type {Part} from "../../interfaces/placed-part.interface";
import {IDot} from "../../interfaces/dot.interface";
import {redrawCanvas} from "../draw-canvas";
import {Ic} from "../ic";
import {resetForNewBoard} from "../reset-interaction";
import {createDotGrid} from "./resize-grid";
import {buildDotIndex, dotPositionKey} from "../dot-lookup";
import {GridPos, gridToPx} from "../../project-file/grid";
import {readProjectFile} from "../../project-file/read-project-file";
import {setBoardSetup} from "../board-type";
import {lineFromWire, partFromEntry} from "./board-entries";
import {CustomParts} from "../custom-parts";
import {RequirementsState} from "../../state/RequirementsState";

// Replaces the board with a project file's (any version). The file is read and checked in full
// first, so a file that isn't a project throws ProjectFileError with the board untouched.
// Returns how many malformed or off-board entries were left out.
export function loadProject(raw: unknown): {skipped: number} {
  const {project, skipped} = readProjectFile(raw);

  resetForNewBoard();
  RequirementsState.current = project.requirements;
  const {board} = project;
  setBoardSetup({type: board.type, strips: board.type === "stripboard" ? board.strips : "horizontal"});
  createDotGrid(board.cols, board.rows);

  // The reader only lets through positions on the board, so every lookup finds its dot. Wires and
  // parts are pinned to these shared dot objects, as when they're placed by hand.
  const dots = buildDotIndex();
  const dotAt = ([col, row]: GridPos): IDot => dots.get(dotPositionKey(gridToPx(col), gridToPx(row))) as IDot;

  for (const pad of project.pads) dotAt(pad.at).description = pad.note;
  if (board.type === "stripboard") {
    for (const at of board.cuts) dotAt(at).cut = true;
  }

  LineState.lines = project.wires.map(wire => lineFromWire(wire, dotAt));

  // Kind by kind, in the grouped order PartState.parts keeps. The reader gives every part an
  // instanceId, which the parts keep.
  const parts: Part[] = [
    ...project.placedIcs.map(entry => partFromEntry({kind: "ic", entry}, dotAt)),
    ...project.placedStandardComponents.map(entry => partFromEntry({kind: "standard-component", entry}, dotAt)),
    ...project.placedAdvancedComponents.map(entry => partFromEntry({kind: "advanced-component", entry}, dotAt)),
  ];
  PartState.parts = parts;

  // A file's custom ICs join the catalog (and are kept, like ones made here) rather than replacing it,
  // and so do the custom parts placed on it, so more of them can be placed.
  if (Ic.addCustomIcs(project.customIcs) > 0) Ic.saveCustomIcsToLocalStorage();
  CustomParts.merge(project.placedAdvancedComponents.flatMap(part => part.custom ? [part.custom] : []));

  redrawCanvas();
  return {skipped};
}
