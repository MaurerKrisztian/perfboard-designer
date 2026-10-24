import {isPlacementTool, isRouteTool, ToolState} from "../../state/ToolState";
import {SelectionState} from "../../state/SelectionState";
import {ViewState} from "../../state/ViewState";
import {behaviorOf} from "../../features/tools";
import {holeName, toGridPos} from "../../project-file/grid";
import {SOLDER_COLOR} from "../../board-render";
import {selectionLabel} from "./selection-actions";

// What the status line over the board says: what's selected, or what the active tool does next,
// with the keys and gestures that apply as hints in brackets: "Wire [Click a start pad, or drag
// pad to pad]". `swatch` is a colour shown before it; `armed` marks a part or wire waiting to be
// placed.

export interface StatusMessage {
  text: string;
  swatch?: string;
  armed?: boolean;
}

// Copper, like everything else that's picked.
const SELECTED_PART_COLOR = "#eaa96a";

// "[a • b]", or nothing for no hints.
const hints = (...list: string[]) => list.length ? ` [${list.join(" • ")}]` : "";

export function statusMessage(): StatusMessage {
  if (ViewState.solderSide) {
    const count = ViewState.solderJointCount;
    return {text: `Solder side, seen from below: ${count} joint${count === 1 ? "" : "s"} to solder [A square pad is pin 1]`};
  }
  const tool = ToolState.active;
  const selection = SelectionState.current;
  if (SelectionState.adding && tool.kind === "select") {
    const what = selection ? selectionLabel() : "nothing yet";
    return {text: `Select more: ${what}${hints("Click a part or wire to add or remove it", "Drag a box around more")}`, swatch: SELECTED_PART_COLOR};
  }
  if (selection?.kind === "many") {
    return {text: `${selectionLabel()}${hints("Drag one to move them all", "Shift-click to add or remove", "Ctrl+D to duplicate", "Del to remove")}`, swatch: SELECTED_PART_COLOR};
  }
  // A selected part outranks a placement tool, which outranks a selected wire or pad.
  if (selection?.kind === "part") {
    const part = selection.part;
    if (part.kind === "ic") return {text: `${part.ref} ${part.name}${hints("Drag to move", "Del to remove")}`, swatch: SELECTED_PART_COLOR};
    if (part.kind === "advanced-component") {
      const def = part.getDefinition();
      const size = def?.gridSizable ? ` ${part.rows}×${part.cols}` : "";
      return {text: `${part.ref} ${def?.name ?? "Part"}${size}${hints("Drag to move", "R to rotate", "Del to remove")}`, swatch: SELECTED_PART_COLOR};
    }
    return {text: `${part.ref} ${part.getDefinition()?.name ?? "Part"}${hints("Drag to move", "Del to remove")}`, swatch: SELECTED_PART_COLOR};
  }
  if (isPlacementTool(tool)) return {text: behaviorOf(tool).statusText(tool), armed: true};
  if (selection?.kind === "line") {
    const line = selection.line;
    const reshape = tool.kind === "select" ? ["Drag it to bend it", "Drag a bend or an end to move it"] : [];
    const unbend = tool.kind === "select" && line.via?.length ? ["Double-click a bend to remove it"] : [];
    const tips = hints(...reshape, ...unbend, "Del to remove");
    if (line.kind === "solder") return {text: `Solder path${tips}`, swatch: SOLDER_COLOR};
    return {text: `Wire, ${line.width || 4} px${tips}`, swatch: line.color || "#777676"};
  }
  if (selection?.kind === "dot") return {text: `Pad ${holeName(toGridPos(selection.dot))}${hints("D to add a note")}`};
  return {text: behaviorOf(tool).statusText(tool), armed: isRouteTool(tool)};
}

export function sameMessage(a: StatusMessage, b: StatusMessage): boolean {
  return a.text === b.text && a.swatch === b.swatch && a.armed === b.armed;
}

// The same for a finger: it taps rather than clicks, has no keys for the hints (the selection bar
// shows those actions as buttons), and pans when it drags: it starts a wire by holding a pad.
export function forTouch(text: string): string {
  return text
    .replace("Drag from a pad to draw a wire", "Hold a pad, then drag, to draw a wire")
    .replace(", or drag pad to pad", "")
    .replace("Drag pad to pad for an L", "Hold a pad and drag for an L")
    .replace(/\[([^\]]*)\]/g, (_, list: string) => `[${list.split(" • ").filter(hint => !/^(R|Del|D) to |^Shift|^Esc |^Ctrl|^Drag a box/i.test(hint)).join(" • ")}]`)
    .replace(/ or press (Esc|Enter)\b/g, "")
    .replace(/\bClick\b/g, "Tap")
    .replace(/\bclick\b/g, "tap");
}

// The text before its hints, and the hints: "Wire [a • b]" is "Wire" and ["a", "b"].
export function splitHints(text: string): {main: string; hints: string[]} {
  const at = text.indexOf(" [");
  if (at < 0 || !text.endsWith("]")) return {main: text, hints: []};
  return {main: text.slice(0, at), hints: text.slice(at + 2, -1).split(" • ").filter(Boolean)};
}
