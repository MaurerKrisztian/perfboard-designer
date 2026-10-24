import {DotState} from "../state/DotState";
import {LineState} from "../state/LineState";
import {GridConfig} from "../state/GridConfig";
import {SelectionState} from "../state/SelectionState";
import {PartState} from "../state/PartState";
import {ILine} from "../interfaces/line.interface";
import type {Part} from "../interfaces/placed-part.interface";
import {Point} from "../interfaces/point.interface";
import {beginDrag} from "./component-drag";
import {findPartAt} from "./placed-parts";
import {distanceToLine, linePoints} from "./line-path";

// Selecting pads, wires and parts by clicking them, and several parts and wires at once
// (Shift-click, a box, Select all). Nothing here redraws: callers do, once.

function findLineAt(x: number, y: number): ILine | undefined {
  let closest: ILine | undefined;
  let closestDistance = GridConfig.lineSelectTolerance;
  for (const line of LineState.lines) {
    // How close, not just whether it's within tolerance, so the nearest wire wins: a jumper on a
    // tie, since it's drawn over the solder paths.
    const distance = distanceToLine(x, y, line);
    const jumperOverSolder = distance === closestDistance && closest?.kind === "solder" && line.kind !== "solder";
    if (distance < closestDistance || jumperOverSolder) {
      closest = line;
      closestDistance = distance;
    }
  }
  return closest;
}

// A hovered dot only outranks a wire under the cursor when the click actually lands on the
// dot itself (dotClickPriorityRadius) - otherwise the dot's generous hover/snap radius would
// swallow clicks on most of a short wire, since wires span only 50px between dots.
function dotOutranksLineAt(x: number, y: number): boolean {
  if (!DotState.hoverDot) {
    return false;
  }
  return Math.hypot(x - DotState.hoverDot.x, y - DotState.hoverDot.y) <= GridConfig.dotClickPriorityRadius;
}

// Selects the wire at (x, y), if a dot doesn't outrank it; otherwise drops a wire selection.
export function selectLine(x: number, y: number) {
  const line = dotOutranksLineAt(x, y) ? undefined : findLineAt(x, y);
  if (line) {
    SelectionState.current = {kind: "line", line};
  } else {
    SelectionState.clear("line");
  }
}

// Selects the wire or else the hovered pad at (x, y).
export function setSelection(x: number, y: number) {
  if (!dotOutranksLineAt(x, y)) {
    const line = findLineAt(x, y);
    if (line) {
      SelectionState.current = {kind: "line", line};
      return;
    }
  }

  if (DotState.hoverDot) {
    SelectionState.current = {kind: "dot", dot: DotState.hoverDot};
  } else {
    SelectionState.clear("line");
  }
}

// A wire of a selection of several under (x, y): pressed there, the whole selection moves.
export function selectedLineAt(x: number, y: number): ILine | undefined {
  if (!SelectionState.isMany) return undefined;
  const line = findLineAt(x, y);
  return line && SelectionState.hasLine(line) ? line : undefined;
}

// A plain click: picks up the part under the pointer (when allowed) to select and drag it, or
// else selects the wire or pad there. On one of several selected parts or wires it picks them
// all up instead, and they stay selected unless the pointer lets go without moving them.
export function selectAt(x: number, y: number, pickUpParts: boolean) {
  if (pickUpParts) {
    const part = findPartAt(x, y);
    const line = part ? undefined : selectedLineAt(x, y);
    if ((part && SelectionState.isMany && SelectionState.hasPart(part)) || line) {
      const pressed = part ? {kind: "part" as const, part} : {kind: "line" as const, line: line as ILine};
      beginDrag(SelectionState.parts, SelectionState.lines, x, y, pressed);
      return;
    }
    if (part) {
      SelectionState.current = {kind: "part", part};
      beginDrag([part], [], x, y);
      return;
    }
    // Missed every part: drop the part selection and fall through to dot/line selection.
    SelectionState.clear("part");
  }
  setSelection(x, y);
}

const toggled = <T>(list: T[], item: T): T[] => list.includes(item) ? list.filter(other => other !== item) : [...list, item];

// Shift-click (or a click with Select more on): the part or wire at (x, y) joins the selection,
// or leaves it if it's in it already. A selected pad is let go, since pads are only selected on
// their own. Returns whether there was a part or wire there.
export function toggleAt(x: number, y: number): boolean {
  const part = findPartAt(x, y);
  const line = part ? undefined : findLineAt(x, y);
  if (part) SelectionState.select(toggled(SelectionState.parts, part), SelectionState.lines);
  else if (line) SelectionState.select(SelectionState.parts, toggled(SelectionState.lines, line));
  return !!(part || line);
}

// A box on the board, in drawing coordinates.
export interface Box {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

// Selects `base` and every part and wire whose holes all lie inside `box`: a part's pins and the
// holes it covers, a wire's ends and corners.
export function selectInBox(box: Box, base: {parts: Part[]; lines: ILine[]}) {
  const inside = ({x, y}: Point) => x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
  const boxed = PartState.parts.filter(part => [...part.getOccupiedPositions(), ...part.getPinPositions()].every(inside));
  const lines = LineState.lines.filter(line => linePoints(line).every(inside));
  SelectionState.select(
    [...base.parts, ...boxed.filter(part => !base.parts.includes(part))],
    [...base.lines, ...lines.filter(line => !base.lines.includes(line))],
  );
}

// Every part and wire on the board.
export function selectEverything() {
  SelectionState.select(PartState.parts, LineState.lines);
}
