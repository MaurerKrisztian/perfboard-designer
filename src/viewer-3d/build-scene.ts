import {Group, Material, Mesh, Object3D} from "three";
import {BoardFrame, SceneKit} from "./scene-kit";
import {ViewerProject} from "./project-data";
import {buildBoard, buildSolderJoints, buildSolderPaths, buildWires} from "./build-board";
import {buildStandardPart} from "./build-standard-parts";
import {buildAdvancedPart} from "./build-advanced-parts";
import {buildIc} from "./build-ics";
import {chainWires, holeKey} from "./wire-paths";

export interface BuiltBoard {
  root: Group;
  frame: BoardFrame;
  partCount: number;
  wireCount: number;
}

// Names an object, as other 3D programs list it once the board is exported (export-model.ts).
function named<T extends Object3D | null | undefined>(object: T, name: string): T {
  if (object) object.name = name;
  return object;
}

/** Builds the whole board - perf- or stripboard, wires, every placed part and the solder joints
 *  under it - from a parsed project file. Each part's group is named after it ("R1 Resistor 10kΩ"),
 *  and the rest after what it is, for an exported model's outliner. */
export function buildBoardScene(project: ViewerProject): BuiltBoard {
  const frame = new BoardFrame(project.canvasWidth, project.canvasHeight);
  const kit = new SceneKit(frame);
  const root = named(new Group(), "Perfboard");

  root.add(named(buildBoard(kit, project), "Board"));

  // Parts go first: each one registers the holes it is soldered into, so the wires can tell
  // which holes a component lead already ends in before they register their own.
  const parts = [
    ...project.ics.map(ic => named(buildIc(kit, ic), ic.label)),
    ...project.standardParts.map(part => named(buildStandardPart(kit, part), part.label)),
    ...project.advancedParts.map(part => named(buildAdvancedPart(kit, part), part.label)),
  ];
  // A solder path's holes count as component holes: wires ending at one are joined there, not
  // one straight wire passing through.
  const componentHoles = new Set(kit.solderedHoles.keys());
  for (const path of project.solderPaths) {
    for (const hole of path.holes) componentHoles.add(holeKey(hole.x, hole.y));
  }
  const wires = chainWires(project.wires, componentHoles);
  root.add(named(buildWires(kit, wires), "Wires"));
  // Only when there are some, so an exported model doesn't list an empty object.
  if (project.solderPaths.length) root.add(named(buildSolderPaths(kit, project.solderPaths), "Solder paths"));

  let partCount = 0;
  for (const part of parts) {
    if (!part) continue;
    part.traverse(child => {
      // Transparent label planes would otherwise cast solid rectangular shadows.
      const material = (child as Mesh).material as Material | Material[] | undefined;
      child.castShadow = !(material && !Array.isArray(material) && material.transparent);
    });
    root.add(part);
    partCount++;
  }

  // Last, so it sees every hole the wires and parts above registered.
  const joints = buildSolderJoints(kit);
  if (joints) root.add(named(joints, "Solder joints"));

  return {root, frame, partCount, wireCount: wires.length};
}
