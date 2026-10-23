import {isPlacementTool, ToolState} from "../../state/ToolState";
import {SelectionState} from "../../state/SelectionState";
import {ViewState} from "../../state/ViewState";
import {behaviorOf} from "../../features/tools";
import {holeName, toGridPos} from "../../project-file/grid";
import {SOLDER_COLOR} from "../../board-render";

// What the board toolbar's status badge says: what's selected, or what the active tool does next,
// with the keys and gestures that apply in brackets. `swatch` is a colour shown before it.

export interface StatusMessage {
  text: string;
  swatch?: string;
}

const SELECTED_PART_COLOR = "#38bdf8";

export function statusMessage(): StatusMessage {
  if (ViewState.solderSide) {
    const count = ViewState.solderJointCount;
    return {text: `Solder side, seen from below: ${count} joint${count === 1 ? "" : "s"} to solder [Square = pin 1]`};
  }
  const tool = ToolState.active;
  const modeLabel = tool.kind.toUpperCase();
  const selection = SelectionState.current;
  // A selected part outranks a placement tool, which outranks a selected wire or pad.
  if (selection?.kind === "part") {
    const part = selection.part;
    if (part.kind === "ic") return {text: `${part.ref} ${part.name} Selected [Drag to Move • Del to Remove]`, swatch: SELECTED_PART_COLOR};
    if (part.kind === "advanced-component") {
      const def = part.getDefinition();
      const size = def?.gridSizable ? ` ${part.rows}×${part.cols}` : "";
      return {text: `${part.ref} ${def?.name ?? "Component"}${size} Selected [Drag to Move • R to Rotate • Del to Remove]`, swatch: SELECTED_PART_COLOR};
    }
    return {text: `${part.ref} ${part.getDefinition()?.name ?? "Component"} Selected [Drag to Move • Del to Remove]`, swatch: SELECTED_PART_COLOR};
  }
  if (isPlacementTool(tool)) return {text: behaviorOf(tool).statusText(tool)};
  if (selection?.kind === "line") {
    const reshape = tool.kind === "select" ? "Drag it to bend it • Drag a bend or an end to move it • " : "";
    const unbend = tool.kind === "select" && selection.line.via?.length ? "Double-click a bend to remove it • " : "";
    if (selection.line.kind === "solder") return {text: `Solder Path Selected [${reshape}${unbend}Mode: ${modeLabel}]`, swatch: SOLDER_COLOR};
    return {text: `Line Selected (${selection.line.width || 4}px) [${reshape}${unbend}Mode: ${modeLabel}]`, swatch: selection.line.color || "#777676"};
  }
  if (selection?.kind === "dot") return {text: `Pad ${holeName(toGridPos(selection.dot))} Selected [Mode: ${modeLabel}]`};
  return {text: behaviorOf(tool).statusText(tool)};
}

export function sameMessage(a: StatusMessage, b: StatusMessage): boolean {
  return a.text === b.text && a.swatch === b.swatch;
}

// The same for a finger: it taps rather than clicks, has no keys for the hints in brackets (the
// selection bar shows those actions as buttons), and pans when it drags: it starts a wire by
// holding a pad.
export function forTouch(text: string): string {
  return text
    .replace("Drag from a pad to wire it", "Hold a pad to start a wire")
    .replace(", or drag pad to pad", "")
    .replace("Drag pad to pad for an L", "Hold a pad and drag for an L")
    .replace(/\[([^\]]*)\]/g, (_, hints: string) => `[${hints.split(" • ").filter(hint => !/^(R|Del) to |^Shift|^Esc /i.test(hint)).join(" • ")}]`)
    .replace(/ or (Esc|Enter)\b/g, "")
    .replace(/\bClick\b/g, "Tap")
    .replace(/\bclick\b/g, "tap");
}
