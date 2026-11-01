import {Group, Vector3} from "three";
import {AdvancedComponentDefinition} from "../../parts/advanced-component-definitions";
import {PITCH, SceneKit} from "../scene-kit";
import {addLeads, bodyBounds, cylinder} from "./part-geometry";

// RCJ-04 RCA jack opening toward +x: a square coloured housing with the metal barrel out of its front.
export function buildRcaJack(kit: SceneKit, definition: AdvancedComponentDefinition): Group {
  const group = new Group();
  const bounds = bodyBounds(definition);
  const housingLength = 10, housingHeight = 13, bottom = 0.4;
  const housingFront = bounds.left + housingLength;
  const axisY = bottom + 6.5;
  const housing = kit.standard(`rca-housing:${definition.id}`, {color: definition.bodyColor ?? "#1c1f23", roughness: 0.55});
  const nickel = kit.standard("rca-nickel", {color: "#d3d8de", metalness: 1, roughness: 0.25});
  const hole = kit.standard("barrel-hole", {color: "#07080a", roughness: 0.9});
  group.add(kit.box(housingLength, housingHeight, bounds.depth, housing,
    new Vector3(bounds.left + housingLength / 2, bottom + housingHeight / 2, bounds.centerZ)));

  const along = (radius: number, length: number, start: number, material: typeof nickel) => {
    const mesh = cylinder(radius, length, material, new Vector3(start + length / 2, axisY, bounds.centerZ));
    mesh.rotation.z = Math.PI / 2;
    return mesh;
  };
  group.add(along(4.15, bounds.right - housingFront, housingFront, nickel));
  group.add(along(1.6, 0.1, bounds.right, hole));
  // The insulator round the centre hole, in the housing's colour.
  group.add(along(2.6, 0.06, bounds.right, housing));
  group.add(along(1.5, 0.12, bounds.right, hole));
  addLeads(group, kit, definition.pinOffsets, bottom + 0.3, 2 * PITCH * 0.16, 0.3);
  return group;
}
