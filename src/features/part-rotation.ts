// Rotating a placed part changes more than its angle: an IC swaps its pin counts, and a
// grid-sizable header transposes its rows/cols and renumbers its pin names. A history entry
// therefore snapshots all of that, so undo/redo put the part back exactly as it was.
import type {RotatablePart} from "../interfaces/placed-part.interface";
import type {PinNames} from "../parts/pin-names";
import type {Rotation} from "../state/ToolState";

export interface RotationSnapshot {
  rotationAngle: Rotation;
  widthPin?: number;
  heightPin?: number;
  rows?: number;
  cols?: number;
  pinDescription?: PinNames;
}

export function captureRotation(part: RotatablePart): RotationSnapshot {
  const snapshot: RotationSnapshot = {rotationAngle: part.rotationAngle as Rotation};
  if (part.kind === "ic") {
    snapshot.widthPin = part.widthPin;
    snapshot.heightPin = part.heightPin;
  } else {
    snapshot.rows = part.rows;
    snapshot.cols = part.cols;
    snapshot.pinDescription = part.pinDescription;
  }
  return snapshot;
}

// Restores a snapshot without recording history: for the rotate change's apply and revert.
export function applyRotation(part: RotatablePart, snapshot: RotationSnapshot) {
  part.rotationAngle = snapshot.rotationAngle;
  if (part.kind === "ic") {
    if (snapshot.widthPin !== undefined) part.widthPin = snapshot.widthPin;
    if (snapshot.heightPin !== undefined) part.heightPin = snapshot.heightPin;
  } else {
    if (snapshot.rows !== undefined) part.rows = snapshot.rows;
    if (snapshot.cols !== undefined) part.cols = snapshot.cols;
    if (snapshot.pinDescription) part.pinDescription = snapshot.pinDescription;
    else delete part.pinDescription;
  }
}
