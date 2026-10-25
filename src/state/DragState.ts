import {IDot} from "../interfaces/dot.interface";
import {ILine} from "../interfaces/line.interface";
import type {Part} from "../interfaces/placed-part.interface";
import type {Selection} from "./SelectionState";

// A drag moving things from hole to hole (src/features/component-drag.ts): one part, or the parts
// and wires of a selection of several. Nothing in `parts` or `lines`: no drag is in progress.
export class DragState {
  static parts: Part[] = [];
  static lines: ILine[] = [];
  // Dot nearest the cursor as of the last committed step. Everything translates by the delta
  // between this and the dot nearest the cursor now, which is what keeps the grab offset.
  static grabDot?: IDot;
  // Where each was when the drag started (each part's anchor dots, each wire's points), for the
  // history entry and for cancelling.
  static partOrigins: IDot[][] = [];
  static lineOrigins: IDot[][] = [];
  // Position -> dot index of the grid, built once per drag since dots can't change mid-drag.
  static dotIndex?: Map<string, IDot>;
  static moved = false;
  // The item of a selection of several that was pressed: let go without moving, it's all that
  // stays selected, as a click on it would select it.
  static pressed?: Selection;
}
