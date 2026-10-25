import {Group, InstancedMesh, Matrix4, Mesh, Object3D} from "three";

// The board as a glTF binary (.glb) for other 3D programs (Blender, online viewers, CAD tools): a
// copy of the scene's board, so the view itself is left alone. The exporter is loaded on first use.

// glTF's unit is the metre; the scene is built in millimetres.
const MM_TO_M = 0.001;

export async function exportGlb(board: Object3D): Promise<Blob> {
  const {GLTFExporter} = await import("three/examples/jsm/exporters/GLTFExporter.js");
  const model = withPlainMeshes(board.clone());
  model.scale.multiplyScalar(MM_TO_M);
  const glb = await new GLTFExporter().parseAsync(model, {binary: true});
  return new Blob([glb as ArrayBuffer], {type: "model/gltf-binary"});
}

// `root` with each instanced mesh (the board's holes and pads) swapped for plain meshes, one per
// instance, sharing its geometry and material: not every program reads glTF's instancing.
function withPlainMeshes(root: Object3D): Object3D {
  const instancedMeshes: InstancedMesh[] = [];
  root.traverse(object => {
    if ((object as InstancedMesh).isInstancedMesh) instancedMeshes.push(object as InstancedMesh);
  });
  const matrix = new Matrix4();
  for (const instanced of instancedMeshes) {
    const group = new Group();
    group.name = instanced.name;
    group.position.copy(instanced.position);
    group.quaternion.copy(instanced.quaternion);
    group.scale.copy(instanced.scale);
    for (let i = 0; i < instanced.count; i++) {
      const mesh = new Mesh(instanced.geometry, instanced.material);
      instanced.getMatrixAt(i, matrix);
      matrix.decompose(mesh.position, mesh.quaternion, mesh.scale);
      group.add(mesh);
    }
    instanced.parent?.add(group);
    instanced.removeFromParent();
  }
  return root;
}
