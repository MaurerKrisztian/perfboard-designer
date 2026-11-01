import {Group, Vector3} from "three";
import {AdvancedComponentDefinition} from "../../parts/advanced-component-definitions";
import {SceneKit} from "../scene-kit";
import {addLeads, addTopLabel, bodyBounds} from "./part-geometry";

// Era EI 30/23: a potted black block with the maker's label on top.
export function buildTransformer(kit: SceneKit, definition: AdvancedComponentDefinition, value?: string): Group {
  const group = new Group();
  const bounds = bodyBounds(definition);
  const bottom = 0.6, height = 26, top = bottom + height;
  group.add(kit.box(bounds.width, height, bounds.depth, kit.standard("transformer-case", {color: "#202226", roughness: 0.6}),
    new Vector3(bounds.centerX, bottom + height / 2, bounds.centerZ)));
  group.add(kit.box(bounds.width * 0.74, 0.06, bounds.depth * 0.62, kit.standard("transformer-label", {color: "#c8ccd1", roughness: 0.7}),
    new Vector3(bounds.centerX, top + 0.03, bounds.centerZ)));
  addTopLabel(group, "EI 30/23", bounds.width * 0.6, 3.6, new Vector3(bounds.centerX, top + 0.08, bounds.centerZ - 3.6), "#30343a");
  addTopLabel(group, value || "PRI  SEC", bounds.width * 0.6, 3, new Vector3(bounds.centerX, top + 0.08, bounds.centerZ + 2.6), "#30343a");
  addLeads(group, kit, definition.pinOffsets, bottom + 0.2, 0.8, 0.8);
  return group;
}
