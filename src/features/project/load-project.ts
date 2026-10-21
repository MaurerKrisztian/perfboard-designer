import {LineState} from "../../state/LineState";
import {PartState} from "../../state/PartState";
import type {Part} from "../../interfaces/placed-part.interface";
import {IDot} from "../../interfaces/dot.interface";
import {redrawCanvas} from "../draw-canvas";
import {Ic} from "../ic";
import {PlacedStandardComponent} from "../standard-components/placed-standard-component";
import {PlacedAdvancedComponent} from "../advanced-components/placed-advanced-component";
import {resetForNewBoard} from "../reset-interaction";
import {createDotGrid, heightInput, widthInput} from "./resize-grid";
import {buildDotIndex, dotPositionKey} from "../dot-lookup";
import {GridPos, gridToPx} from "../../project-file/grid";
import {readProjectFile} from "../../project-file/read-project-file";
import {setBoardSetup} from "../board-type";
import {isCategoryId} from "../../parts/catalog-categories";
import {isModuleName} from "../../parts/ic-package";
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
  widthInput.value = String(board.cols);
  heightInput.value = String(board.rows);
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

  LineState.lines = project.wires.map(wire => ({
    start: dotAt(wire.from), end: dotAt(wire.to),
    ...(wire.via ? {via: wire.via.map(dotAt)} : {}),
    ...(wire.kind === "solder" ? {kind: "solder" as const} : {color: wire.color, width: wire.width}),
  }));

  const parts: Part[] = [];
  for (const saved of project.placedIcs) {
    const ic = new Ic(saved.widthPin, saved.heightPin, {...saved.pinDescription}, saved.name);
    ic.ref = saved.ref;
    ic.instanceId = saved.instanceId as string;
    ic.category = isCategoryId(saved.category) ? saved.category : isModuleName(saved.name) ? "modules.custom" : "ics.custom";
    ic.rotationAngle = saved.rotation;
    ic.topLeftDot = dotAt(saved.at);
    parts.push(ic);
  }
  for (const saved of project.placedStandardComponents) {
    const component = new PlacedStandardComponent(saved.definitionId, dotAt(saved.from), dotAt(saved.to));
    component.ref = saved.ref;
    component.instanceId = saved.instanceId as string;
    component.value = saved.value;
    component.color = saved.color;
    parts.push(component);
  }
  for (const saved of project.placedAdvancedComponents) {
    const component = new PlacedAdvancedComponent(saved.definitionId, dotAt(saved.at), saved.rotation);
    if (saved.custom) component.custom = saved.custom;
    component.ref = saved.ref;
    component.instanceId = saved.instanceId as string;
    component.rows = saved.rows;
    component.cols = saved.cols;
    component.value = saved.value;
    parts.push(component);
  }
  // Kind by kind, in the grouped order PartState.parts keeps.
  PartState.parts = parts;

  // A file's custom ICs join the catalog (and are kept, like ones made here) rather than replacing it,
  // and so do the custom parts placed on it, so more of them can be placed.
  if (Ic.addCustomIcs(project.customIcs) > 0) Ic.saveCustomIcsToLocalStorage();
  CustomParts.merge(project.placedAdvancedComponents.flatMap(part => part.custom ? [part.custom] : []));

  redrawCanvas();
  return {skipped};
}
