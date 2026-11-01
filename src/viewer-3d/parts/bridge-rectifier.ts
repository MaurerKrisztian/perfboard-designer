import {Group, Vector3} from "three";
import {AdvancedComponentDefinition} from "../../parts/advanced-component-definitions";
import {SceneKit} from "../scene-kit";
import {addLeads, addTopLabel, bodyBounds} from "./part-geometry";

// DIP-4 bridge rectifier: a low black block with a lead out of each corner.
export function buildBridgeRectifier(kit: SceneKit, definition: AdvancedComponentDefinition): Group {
  const group = new Group();
  const bounds = bodyBounds(definition);
  const bottom = 0.5, height = 3.2, top = bottom + height;
  const epoxy = kit.standard("bridge-epoxy", {color: "#1b1d20", roughness: 0.62});
  group.add(kit.box(bounds.width, height, bounds.depth, epoxy, new Vector3(bounds.centerX, bottom + height / 2, bounds.centerZ)));
  addLeads(group, kit, definition.pinOffsets, bottom + 1, 0.5, 0.3);
  // The lead's shoulder, from the body's side out to its hole.
  for (const {dx, dy} of definition.pinOffsets) {
    const x = dx * 2.54;
    const edge = x < bounds.centerX ? bounds.left : bounds.right;
    group.add(kit.box(Math.abs(x - edge) + 0.3, 0.3, 0.8, kit.leadMaterial, new Vector3((x + edge) / 2, bottom + 1, dy * 2.54)));
  }
  addTopLabel(group, "DF10M", bounds.width * 0.7, 1.6, new Vector3(bounds.centerX, top + 0.01, bounds.centerZ), "#aab3bd");
  return group;
}
