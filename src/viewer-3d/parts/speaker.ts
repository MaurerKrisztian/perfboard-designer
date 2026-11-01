import {CylinderGeometry, DoubleSide, Group, Mesh, RingGeometry, SphereGeometry, Vector3} from "three";
import {AdvancedComponentDefinition} from "../../parts/advanced-component-definitions";
import {SceneKit} from "../scene-kit";
import {addLeads, bodyBounds, cylinder} from "./part-geometry";

// A small speaker face up on wire legs: the magnet at the bottom, the basket widening to the frame,
// and the paper cone dished down from it to the dust cap.
export function buildSpeaker(kit: SceneKit, definition: AdvancedComponentDefinition): Group {
  const group = new Group();
  const bounds = bodyBounds(definition);
  const radius = bounds.width / 2, depth = radius * 0.8;
  const magnetBottom = 1.2, magnetHeight = depth * 0.42;
  const frameY = magnetBottom + depth;
  const center = (y: number) => new Vector3(bounds.centerX, y, bounds.centerZ);

  const steel = kit.standard("speaker-steel", {color: "#8b949e", metalness: 0.9, roughness: 0.4, side: DoubleSide});
  const frame = kit.standard("speaker-frame", {color: "#c7ced6", metalness: 1, roughness: 0.3, side: DoubleSide});
  const paper = kit.standard("speaker-paper", {color: "#26282c", roughness: 0.9, side: DoubleSide});
  const surround = kit.standard("speaker-surround", {color: "#3a3d42", roughness: 0.85, side: DoubleSide});
  const cap = kit.standard("speaker-cap", {color: "#17181b", roughness: 0.4});

  group.add(cylinder(radius * 0.42, magnetHeight, kit.standard("speaker-magnet", {color: "#2b2e33", metalness: 0.6, roughness: 0.5}), center(magnetBottom + magnetHeight / 2)));

  const basketHeight = depth - magnetHeight;
  const basket = new Mesh(new CylinderGeometry(radius * 0.95, radius * 0.42, basketHeight, 48, 1, true), steel);
  basket.position.copy(center(magnetBottom + magnetHeight + basketHeight / 2));
  basket.castShadow = true;
  group.add(basket);

  // The cone dishes down inside the basket, seen from above.
  const coneDepth = depth * 0.42;
  const cone = new Mesh(new CylinderGeometry(radius * 0.84, radius * 0.3, coneDepth, 48, 1, true), paper);
  cone.position.copy(center(frameY - coneDepth / 2));
  group.add(cone);
  const coneFloor = new Mesh(new RingGeometry(0, radius * 0.31, 48), paper);
  coneFloor.rotation.x = -Math.PI / 2;
  coneFloor.position.copy(center(frameY - coneDepth));
  group.add(coneFloor);
  const dustCap = new Mesh(new SphereGeometry(radius * 0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), cap);
  dustCap.scale.y = 0.55;
  dustCap.position.copy(center(frameY - coneDepth));
  group.add(dustCap);

  const surroundRing = new Mesh(new RingGeometry(radius * 0.83, radius * 0.92, 64), surround);
  surroundRing.rotation.x = -Math.PI / 2;
  surroundRing.position.copy(center(frameY + 0.01));
  group.add(surroundRing);
  const frameRing = new Mesh(new RingGeometry(radius * 0.91, radius, 64), frame);
  frameRing.rotation.x = -Math.PI / 2;
  frameRing.position.copy(center(frameY + 0.02));
  group.add(frameRing);
  const rim = new Mesh(new CylinderGeometry(radius, radius, 0.7, 64, 1, true), frame);
  rim.position.copy(center(frameY - 0.35));
  rim.castShadow = true;
  group.add(rim);

  addLeads(group, kit, definition.pinOffsets, frameY - 0.4, 0.8, 0.4);
  return group;
}
