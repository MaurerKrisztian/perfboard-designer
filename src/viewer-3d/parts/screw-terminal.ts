import {Group, Vector3} from "three";
import {AdvancedComponentDefinition} from "../../parts/advanced-component-definitions";
import {PITCH, SceneKit} from "../scene-kit";
import {addLeads, bodyBounds, cylinder} from "./part-geometry";

// The sizes below are a 5.08 mm block's. On a 2.54 mm block each pole's screw and wire opening shrink
// to fit their half of the pitch, the block is lower, and a groove marks where each pole ends.
const FINE_POLE_SCALE = 0.54;
const FINE_HEIGHT_SCALE = 0.8;

export function buildScrewTerminal(kit: SceneKit, definition: AdvancedComponentDefinition): Group {
  const group = new Group();
  const bounds = bodyBounds(definition);
  const [first, second] = definition.pinOffsets;
  const fine = Math.abs(second.dx - first.dx) === 1;
  const pole = fine ? FINE_POLE_SCALE : 1, tall = fine ? FINE_HEIGHT_SCALE : 1;
  const bottom = 0.3, height = 8.5 * tall, top = bottom + height;
  const plastic = kit.standard("terminal-green", {color: "#218454", roughness: 0.48});
  const recess = kit.standard("terminal-recess", {color: "#0b261b", roughness: 0.8});
  group.add(kit.box(bounds.width, height, bounds.depth, plastic,
    new Vector3(bounds.centerX, bottom + height / 2, bounds.centerZ)));
  definition.pinOffsets.forEach((offset, i) => {
    const centerX = offset.dx * PITCH;
    const screwZ = bounds.back + bounds.depth * 0.43;
    group.add(cylinder(1.8 * pole, 0.1, recess, new Vector3(centerX, top + 0.02, screwZ)));
    group.add(cylinder(1.4 * pole, 0.16, kit.leadMaterial, new Vector3(centerX, top + 0.06, screwZ)));
    const slot = kit.box(2.4 * pole, 0.03, 0.35 * pole, recess, new Vector3(centerX, top + 0.15, screwZ));
    slot.rotation.y = Math.PI / 5;
    group.add(slot);
    group.add(kit.box(3.4 * pole, 3.2 * tall, 0.06, recess, new Vector3(centerX, bottom + 3.5 * tall, bounds.front + 0.02)));
    group.add(kit.box(2.5 * pole, 0.45 * tall, 0.08, kit.leadMaterial, new Vector3(centerX, bottom + 2.25 * tall, bounds.front + 0.06)));
    if (fine && i > 0) {
      group.add(kit.box(0.14, height + 0.02, bounds.depth + 0.02, recess, new Vector3(centerX - PITCH / 2, bottom + height / 2, bounds.centerZ)));
    }
  });
  addLeads(group, kit, definition.pinOffsets, bottom + 0.2, 0.8, 0.7);
  return group;
}

