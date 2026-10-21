import {Group, Vector3} from "three";
import {AdvancedComponentDefinition} from "../../parts/advanced-component-definitions";
import {LEAD_TIP_Y, PITCH, SceneKit} from "../scene-kit";
import {addTopLabel, bodyBounds} from "./part-geometry";

// A user-made part (src/parts/custom-parts.ts) as the breakout board it usually is: its board, in
// its colour with its name printed on it, standing on a header pin at each of its pins.

const DEFAULT_BOARD_COLOR = "#1f2937";
const HOUSING_HEIGHT = 2.5;
const BOARD_THICKNESS = 1.6;

export function buildCustomModule(kit: SceneKit, def: AdvancedComponentDefinition): Group {
  const group = new Group();
  const plastic = kit.blackPlasticMaterial;
  const gold = kit.standard("gold-pin", {color: "#e0b54a", metalness: 1, roughness: 0.28});
  const solder = kit.standard("module-solder", {color: "#d7dbe0", metalness: 1, roughness: 0.22});
  const color = def.bodyColor ?? DEFAULT_BOARD_COLOR;
  const board = kit.standard(`custom-board:${color}`, {color, roughness: 0.45});
  const boardBottom = HOUSING_HEIGHT;
  const boardTop = boardBottom + BOARD_THICKNESS;

  for (const {dx, dy} of def.pinOffsets) {
    const x = dx * PITCH, z = dy * PITCH;
    group.add(kit.box(PITCH - 0.06, HOUSING_HEIGHT, PITCH - 0.06, plastic, new Vector3(x, HOUSING_HEIGHT / 2, z)));
    group.add(kit.box(0.64, boardTop + 1.1 - LEAD_TIP_Y, 0.64, gold, new Vector3(x, (boardTop + 1.1 + LEAD_TIP_Y) / 2, z)));
    const joint = kit.ball(new Vector3(x, boardTop, z), 0.8, solder);
    joint.scale.y = 0.45;
    group.add(joint);
  }

  const bounds = bodyBounds(def);
  group.add(kit.box(bounds.width, BOARD_THICKNESS, bounds.depth, board, new Vector3(bounds.centerX, boardBottom + BOARD_THICKNESS / 2, bounds.centerZ)));
  const labelWidth = Math.max(2, bounds.width * 0.8);
  addTopLabel(group, def.name, labelWidth, Math.min(2.4, bounds.depth * 0.5), new Vector3(bounds.centerX, boardTop + 0.01, bounds.centerZ), "#f1f5f9");
  return group;
}
