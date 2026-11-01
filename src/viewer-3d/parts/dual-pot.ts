import {Group, Vector3} from "three";
import {AdvancedComponentDefinition} from "../../parts/advanced-component-definitions";
import {SceneKit} from "../scene-kit";
import {addLeads, bodyBounds, cylinder} from "./part-geometry";

// Alps RK097 dual pot with its shaft toward +x: two gangs in a metal-capped housing, the threaded
// neck and the slotted shaft out of its front.
export function buildDualPot(kit: SceneKit, definition: AdvancedComponentDefinition): Group {
  const group = new Group();
  const bounds = bodyBounds(definition);
  const housingLength = 9.55, neckLength = 7;
  const bottom = 0.5, height = 11;
  const axisY = bottom + height / 2;
  const front = bounds.left + housingLength, neckEnd = front + neckLength;
  const steel = kit.standard("pot-metal", {color: "#c4cad2", metalness: 1, roughness: 0.3});
  const shaftMetal = kit.standard("pot-shaft", {color: "#dfe3e8", metalness: 0.9, roughness: 0.45});
  const plastic = kit.standard("pot-body", {color: "#2d3138", roughness: 0.55});
  // The plastic stops inside the cap: with a face of each in one plane, the two would flicker.
  const capLength = housingLength * 0.45, plasticLength = housingLength - capLength + 1;
  group.add(kit.box(plasticLength, height, bounds.depth, plastic,
    new Vector3(bounds.left + plasticLength / 2, axisY, bounds.centerZ)));
  group.add(kit.box(capLength, height + 0.3, bounds.depth + 0.2, steel,
    new Vector3(front - capLength / 2, axisY, bounds.centerZ)));

  const along = (radius: number, length: number, start: number, material: typeof steel) => {
    const mesh = cylinder(radius, length, material, new Vector3(start + length / 2, axisY, bounds.centerZ));
    mesh.rotation.z = Math.PI / 2;
    return mesh;
  };
  group.add(along(3.5, neckLength, front, steel));
  group.add(along(3, bounds.right - neckEnd, neckEnd, shaftMetal));
  group.add(kit.box(0.5, 6.1, 0.7, kit.blackPlasticMaterial, new Vector3(bounds.right - 0.1, axisY, bounds.centerZ)));
  addLeads(group, kit, definition.pinOffsets, bottom + 0.2, 0.9, 0.4);
  return group;
}
