import {IDot} from "../interfaces/dot.interface";
import {ILine} from "../interfaces/line.interface";
import type {Part} from "../interfaces/placed-part.interface";

export type Selection =
  | {kind: "dot"; dot: IDot}
  | {kind: "line"; line: ILine}
  | {kind: "part"; part: Part}
  // Several parts and wires at once (Shift-click, a box, Select all, a paste): two or more
  // between them, never a pad. select() keeps it so, so one item is always "part" or "line".
  | {kind: "many"; parts: Part[]; lines: ILine[]};

// What's selected on the board: one pad, wire or placed part, or several parts and wires.
export class SelectionState {
  static current?: Selection;
  // Select more is on (the selection bar's toggle, for a finger, which has no Shift): a click or
  // tap adds the part or wire there to the selection or takes it out, as Shift-click does.
  static adding = false;

  static get dot(): IDot | undefined {
    const current = SelectionState.current;
    return current?.kind === "dot" ? current.dot : undefined;
  }

  // The selected wire, when it's the only thing selected.
  static get line(): ILine | undefined {
    const current = SelectionState.current;
    return current?.kind === "line" ? current.line : undefined;
  }

  // The selected part, when it's the only thing selected.
  static get part(): Part | undefined {
    const current = SelectionState.current;
    return current?.kind === "part" ? current.part : undefined;
  }

  // Every selected part, one or several (none for a pad).
  static get parts(): Part[] {
    const current = SelectionState.current;
    if (current?.kind === "part") return [current.part];
    return current?.kind === "many" ? current.parts : [];
  }

  // Every selected wire, one or several.
  static get lines(): ILine[] {
    const current = SelectionState.current;
    if (current?.kind === "line") return [current.line];
    return current?.kind === "many" ? current.lines : [];
  }

  static get isMany(): boolean {
    return SelectionState.current?.kind === "many";
  }

  static hasPart(part: Part): boolean {
    return SelectionState.parts.includes(part);
  }

  static hasLine(line: ILine): boolean {
    return SelectionState.lines.includes(line);
  }

  // Selects these parts and wires: nothing, the one item, or several.
  static select(parts: Part[], lines: ILine[]) {
    const count = parts.length + lines.length;
    if (count === 0) SelectionState.current = undefined;
    else if (count > 1) SelectionState.current = {kind: "many", parts: [...parts], lines: [...lines]};
    else SelectionState.current = parts.length ? {kind: "part", part: parts[0]} : {kind: "line", line: lines[0]};
  }

  // Takes a part or wire out of the selection (it's off the board, say); the rest stays selected.
  static forget(item: {part: Part} | {line: ILine}) {
    const {parts, lines} = SelectionState;
    if ("part" in item && parts.includes(item.part)) SelectionState.select(parts.filter(p => p !== item.part), lines);
    if ("line" in item && lines.includes(item.line)) SelectionState.select(parts, lines.filter(l => l !== item.line));
  }

  // Deselects everything, or only a selection of the given kind. Several parts and wires go with
  // either "part" or "line".
  static clear(kind?: Selection["kind"]) {
    const current = SelectionState.current?.kind;
    if (!kind || current === kind || (current === "many" && (kind === "part" || kind === "line"))) {
      SelectionState.current = undefined;
    }
  }
}
