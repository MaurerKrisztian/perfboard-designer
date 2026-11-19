import {ILine} from "./line.interface";
import {IDot} from "./dot.interface";
import type {Part, RotatablePart} from "./placed-part.interface";
import type {RotationSnapshot} from "../features/part-rotation";
import type {PlacedAdvancedComponent} from "../features/advanced-components/placed-advanced-component";
import type {PinNames} from "../parts/pin-names";
import type {BoardSetup} from "../state/BoardState";
import type {CircuitRequirements} from "../project-file/requirements";

// A drag records the part's anchor dots before and after (see PlacedPart.getAnchorDots), so one
// from/to shape covers every kind of part.
export type IChange =
  | {type: "set"; kind: "requirements"; from?: CircuitRequirements; to?: CircuitRequirements}
  | {type: "set"; kind: "description"; from?: string; to?: string}
  | {type: "batch"; kind: "batch"; changes: IChange[]}
  | { type: "add" | "remove"; kind: "line"; line: ILine }
  // Placing a wire changed others too: it split the wires it ends on (so it joins them), or folded
  // same-color collinear wires into itself. Recorded as one entry so undo/redo treats the whole
  // placement as a single step.
  | { type: "replace"; kind: "line"; removed: ILine[]; added: ILine[] }
  | { type: "add" | "remove"; kind: "part"; part: Part }
  | { type: "move"; kind: "part"; part: Part; from: IDot[]; to: IDot[] }
  // A rotation changes the part's angle and, depending on its kind, its pin counts, rows/cols and
  // pin names. The whole rotation state is snapshotted so undo/redo restore it exactly.
  | { type: "rotate"; kind: "part"; part: RotatablePart; from: RotationSnapshot; to: RotationSnapshot }
  // A wire moved with the parts and wires selected with it: its points (start, corners, end;
  // linePoints) before and after. Same shape, so the wire stays the same object.
  | { type: "move"; kind: "line"; line: ILine; from: IDot[]; to: IDot[] }
  // A fixed-pin part's own pin names, as SavedAdvancedComponent.pinDescription holds them.
  | { type: "set"; kind: "pin-names"; part: PlacedAdvancedComponent; from?: PinNames; to?: PinNames }
  // `cut` is the hole's state after the change.
  | { type: "set"; kind: "cut"; dot: IDot; cut: boolean }
  | { type: "set"; kind: "board"; from: BoardSetup; to: BoardSetup };
