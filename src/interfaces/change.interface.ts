import {ILine} from "./line.interface";
import {IDot} from "./dot.interface";
import type {Part} from "./placed-part.interface";
import type {BoardSetup} from "../state/BoardState";

// A drag records the part's anchor dots before and after (see PlacedPart.getAnchorDots), so one
// from/to shape covers every kind of part.
export type IChange =
  | { type: "add" | "remove"; kind: "line"; line: ILine }
  // Placing a wire changed others too: it split the wires it ends on (so it joins them), or folded
  // same-color collinear wires into itself. Recorded as one entry so undo/redo treats the whole
  // placement as a single step.
  | { type: "replace"; kind: "line"; removed: ILine[]; added: ILine[] }
  | { type: "add" | "remove"; kind: "part"; part: Part }
  | { type: "move"; kind: "part"; part: Part; from: IDot[]; to: IDot[] }
  // `cut` is the hole's state after the change.
  | { type: "set"; kind: "cut"; dot: IDot; cut: boolean }
  | { type: "set"; kind: "board"; from: BoardSetup; to: BoardSetup };
