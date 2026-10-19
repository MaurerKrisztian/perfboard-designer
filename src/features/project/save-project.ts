import {DotState} from "../../state/DotState";
import {LineState} from "../../state/LineState";
import {PartState} from "../../state/PartState";
import {Utils} from "../../utils/utils";
import {Canvas} from "../../state/Canvas";
import {Ic} from "../ic";
import type {PlacedStandardComponent} from "../standard-components/placed-standard-component";
import type {PlacedAdvancedComponent} from "../advanced-components/placed-advanced-component";
import {fileVersionFor, ProjectFile, SavedBoard, SavedPad, SavedWire} from "../../project-file/project-file";
import {holesAlong, toGridPos} from "../../project-file/grid";
import {BoardState} from "../../state/BoardState";
import {ProjectState} from "../../state/ProjectState";

const saveBtn = Utils.getSafeHtmlElement<HTMLButtonElement>('saveProjectBtn');
saveBtn.addEventListener('click', function() {
  downloadProjectFile(JSON.stringify(getSaveJson()));
});

// Downloads are named after the project (the open one by default), minus characters file systems
// don't allow.
export function downloadFileName(extension: string, projectName = ProjectState.current?.name): string {
  const name = (projectName ?? "").replace(/[\\/:*?"<>|]+/g, "-").trim();
  return `${name || "perfboard-project"}.${extension}`;
}

export function downloadProjectFile(json: string, projectName?: string) {
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(json));
  downloadAnchorNode.setAttribute("download", downloadFileName("json", projectName));
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

// A stripboard lists its cuts. A perfboard has none to list: cuts made while the board was a
// stripboard stay on the dots, but they mean nothing on a perfboard, so they aren't saved.
function savedBoard(): SavedBoard {
  const cols = holesAlong(Canvas.gridWidth);
  const rows = holesAlong(Canvas.gridHeight);
  if (!BoardState.isStripboard) return {type: "perfboard", cols, rows};
  const cuts = DotState.dots.filter(dot => dot.cut).map(toGridPos);
  return {type: "stripboard", cols, rows, strips: BoardState.setup.strips, cuts};
}

// Holes with a note.
function savedPads(): SavedPad[] {
  return DotState.dots.flatMap(dot => dot.description?.trim() ? [{at: toGridPos(dot), note: dot.description}] : []);
}

function savedWires(): SavedWire[] {
  return LineState.lines.map(line => ({
    from: toGridPos(line.start),
    to: toGridPos(line.end),
    ...(line.via?.length ? {via: line.via.map(toGridPos)} : {}),
    ...(line.color ? {color: line.color} : {}),
    ...(line.width ? {width: line.width} : {}),
  }));
}

// The file keeps one array per kind of part. PartState.parts is grouped by kind in the same
// order, so each array comes out in the order it was loaded and drawn.
export function getSaveJson(): ProjectFile {
  const parts = PartState.parts;
  const wires = savedWires();
  return {
    version: fileVersionFor({wires}),
    board: savedBoard(),
    pads: savedPads(),
    wires,
    placedIcs: parts.filter((p): p is Ic => p.kind === "ic").map(p => p.serialize()),
    placedStandardComponents: parts
      .filter((p): p is PlacedStandardComponent => p.kind === "standard-component").map(p => p.serialize()),
    placedAdvancedComponents: parts
      .filter((p): p is PlacedAdvancedComponent => p.kind === "advanced-component").map(p => p.serialize()),
    customIcs: Ic.customIcEntries(),
  };
}
