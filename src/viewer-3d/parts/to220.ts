import {ExtrudeGeometry, Group, Mesh, Path, Shape, Vector3} from "three";
import {AdvancedComponentDefinition} from "../../parts/advanced-component-definitions";
import {LEAD_TIP_Y, PITCH, SceneKit, textPlane} from "../scene-kit";
import {addLeads, bodyBounds} from "./part-geometry";

// The package without its leads: the plastic in front, the metal tab behind it reaching up past it
// with its mounting hole, centred on (cx, cz).
function addTo220Body(group: Group, kit: SceneKit, {cx, cz, width, bottom, value}: {cx: number; cz: number; width: number; bottom: number; value?: string}) {
  const plasticHeight = 9.2, thickness = 4.5;
  const plasticTop = bottom + plasticHeight;
  const tabThickness = 1.3, tabWidth = width - 0.2;
  const back = cz - thickness / 2, front = cz + thickness / 2;
  const plasticBack = back + tabThickness / 2;
  group.add(kit.box(
    width, plasticHeight, front - plasticBack,
    kit.standard("to220-body", {color: "#26292d", roughness: 0.5}),
    new Vector3(cx, bottom + plasticHeight / 2, (plasticBack + front) / 2),
  ));

  const tabBottom = bottom + 0.8, tabHeight = plasticTop + 6.5 - tabBottom;
  const tab = new Shape();
  tab.moveTo(-tabWidth / 2, 0);
  tab.lineTo(tabWidth / 2, 0);
  tab.lineTo(tabWidth / 2, tabHeight - 0.8);
  tab.lineTo(tabWidth / 2 - 0.8, tabHeight);
  tab.lineTo(-tabWidth / 2 + 0.8, tabHeight);
  tab.lineTo(-tabWidth / 2, tabHeight - 0.8);
  tab.lineTo(-tabWidth / 2, 0);
  const hole = new Path();
  hole.absarc(0, tabHeight - 3.2, 1.8, 0, Math.PI * 2, true);
  tab.holes.push(hole);
  const tabMesh = new Mesh(
    new ExtrudeGeometry(tab, {depth: tabThickness, bevelEnabled: false, curveSegments: 24}),
    kit.standard("to220-tab", {color: "#b9c2cc", metalness: 1, roughness: 0.28}),
  );
  tabMesh.position.set(cx, tabBottom, back);
  tabMesh.castShadow = true;
  group.add(tabMesh);

  if (value) {
    const label = textPlane(value, width * 0.8, 1.6, "#c7ced6");
    label.position.set(cx, bottom + plasticHeight * 0.55, front + 0.01);
    group.add(label);
  }
}

export function buildTo220(kit: SceneKit, value?: string): Group {
  const group = new Group();
  const bottom = 3.5;
  addTo220Body(group, kit, {cx: PITCH, cz: 0, width: 10, bottom, value});
  const leads = new Group();
  addLeads(leads, kit, [{dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 2, dy: 0}], bottom + 0.3, 0.8, 0.5);
  group.add(leads);
  return group;
}

// A power amp's Pentawatt or Multiwatt: the body between its two rows of holes, each lead running in
// from its hole to its place along the body's foot.
export function buildStaggeredTo220(kit: SceneKit, definition: AdvancedComponentDefinition, value: string): Group {
  const group = new Group();
  const bounds = bodyBounds(definition);
  const bottom = 5.5;
  const pins = definition.pinOffsets;
  const leadPitch = pins.length > 5 ? 1.27 : 1.7;
  addTo220Body(group, kit, {cx: bounds.centerX, cz: bounds.centerZ, width: bounds.width, bottom, value});
  pins.forEach(({dx, dy}, i) => {
    const x = dx * PITCH, z = dy * PITCH;
    const footX = bounds.centerX + (i - (pins.length - 1) / 2) * leadPitch;
    group.add(kit.lead([
      new Vector3(x, LEAD_TIP_Y, z),
      new Vector3(x, 1.6, z),
      new Vector3(footX, bottom - 1.2, bounds.centerZ),
      new Vector3(footX, bottom + 0.3, bounds.centerZ),
    ]));
  });
  return group;
}

// TO-126: smaller, and all plastic in front, with a metal plate only on its back.
export function buildTo126(kit: SceneKit, value?: string): Group {
  const group = new Group();
  const width = 8, height = 11, thickness = 3.2, bottom = 3, cx = PITCH;
  const outline = new Shape();
  outline.moveTo(-width / 2, 0);
  outline.lineTo(width / 2, 0);
  outline.lineTo(width / 2, height);
  outline.lineTo(-width / 2, height);
  outline.lineTo(-width / 2, 0);
  const hole = new Path();
  hole.absarc(0, height - 3, 1.6, 0, Math.PI * 2, true);
  outline.holes.push(hole);
  const body = new Mesh(
    new ExtrudeGeometry(outline, {depth: thickness, bevelEnabled: false, curveSegments: 24}),
    kit.standard("to220-body", {color: "#26292d", roughness: 0.5}),
  );
  body.position.set(cx, bottom, -thickness / 2);
  body.castShadow = true;
  group.add(body);
  group.add(kit.box(width * 0.8, height * 0.42, 0.12, kit.standard("to220-tab", {color: "#b9c2cc", metalness: 1, roughness: 0.28}),
    new Vector3(cx, bottom + height * 0.26, -thickness / 2 - 0.06)));
  addLeads(group, kit, [{dx: 0, dy: 0}, {dx: 1, dy: 0}, {dx: 2, dy: 0}], bottom + 0.3, 0.7, 0.45);
  if (value) {
    const label = textPlane(value, width * 0.85, 1.5, "#c7ced6");
    label.position.set(cx, bottom + height * 0.3, thickness / 2 + 0.01);
    group.add(label);
  }
  return group;
}
