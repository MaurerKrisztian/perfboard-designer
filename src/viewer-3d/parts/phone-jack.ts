import {Group, Vector3} from "three";
import {AdvancedComponentDefinition} from "../../parts/advanced-component-definitions";
import {SceneKit} from "../scene-kit";
import {addLeads, addTopLabel, bodyBounds, cylinder} from "./part-geometry";

// Neutrik M series 6.35 mm jack opening toward +x: a black box, a short block behind it, and the
// chrome ferrule on its nose.
export function buildPhoneJack(kit: SceneKit, definition: AdvancedComponentDefinition): Group {
  const group = new Group();
  const bounds = bodyBounds(definition);
  const rearLength = 3, noseLength = 2.92;
  const bottom = 0.4, height = 15;
  const front = bounds.right - noseLength, back = bounds.left + rearLength;
  const axisY = bottom + height / 2;
  const plastic = kit.blackPlasticMaterial;
  const chrome = kit.standard("jack-chrome", {color: "#dfe3e8", metalness: 1, roughness: 0.2});
  const hole = kit.standard("barrel-hole", {color: "#07080a", roughness: 0.9});
  group.add(kit.box(front - back, height, bounds.depth, plastic,
    new Vector3((front + back) / 2, axisY, bounds.centerZ)));
  group.add(kit.box(rearLength, height * 0.72, 11.4, plastic,
    new Vector3(bounds.left + rearLength / 2, axisY, bounds.centerZ)));

  const along = (radius: number, length: number, start: number, material: typeof chrome) => {
    const mesh = cylinder(radius, length, material, new Vector3(start + length / 2, axisY, bounds.centerZ));
    mesh.rotation.z = Math.PI / 2;
    return mesh;
  };
  group.add(along(4.35, noseLength, front, chrome));
  group.add(along(5.2, 0.5, front, chrome));
  group.add(along(3.2, 0.1, bounds.right, hole));
  const middle = (front + back) / 2, top = bottom + height + 0.01;
  addTopLabel(group, "6.35", 9, 3.4, new Vector3(middle, top, bounds.centerZ - 1.2), "#8b949e");
  addTopLabel(group, definition.id === "phone-jack-stereo" ? "STEREO" : "MONO", 9, 2, new Vector3(middle, top, bounds.centerZ + 2), "#8b949e");
  addLeads(group, kit, definition.pinOffsets, bottom + 0.3, 0.9, 0.4);
  return group;
}
