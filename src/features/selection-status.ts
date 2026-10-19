import {isPlacementTool, ToolState} from "../state/ToolState";
import {SelectionState} from "../state/SelectionState";
import {notifyArmedPartChanged} from "./catalog/catalog-events";
import {behaviorOf} from "./tools";
import {ViewState} from "../state/ViewState";
import {holeName, toGridPos} from "../project-file/grid";

const SWATCH_STYLE = "display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:4px;";
// A finger taps rather than clicks, has no keys for the hints in brackets (the selection bar shows
// those actions as buttons), and pans when it drags: it starts a wire by holding a pad.
const touchScreen = matchMedia("(pointer: coarse)");

function forTouch(text: string): string {
  return text
    .replace("Drag from a pad to wire it", "Hold a pad to start a wire")
    .replace(", or drag pad to pad", "")
    .replace("Drag pad to pad for an L", "Hold a pad and drag for an L")
    .replace(/\[([^\]]*)\]/g, (_, hints: string) => `[${hints.split(" • ").filter(hint => !/^(R|Del) to |^Shift|^Esc /i.test(hint)).join(" • ")}]`)
    .replace(/ or (Esc|Enter)\b/g, "")
    .replace(/\bClick\b/g, "Tap")
    .replace(/\bclick\b/g, "tap");
}
const SELECTED_PART_COLOR = "#38bdf8";

// Built with DOM calls rather than innerHTML: IC names and wire/pad colors come from project
// files, so they must never be parsed as markup.
function setStatus(statusEl: HTMLElement, text: string, swatchColor?: string) {
  if (touchScreen.matches) text = forTouch(text);
  statusEl.title = text;
  if (!swatchColor) {
    const label = document.createElement("span");
    label.textContent = text;
    statusEl.replaceChildren(label);
    return;
  }
  const swatch = document.createElement("span");
  swatch.style.cssText = SWATCH_STYLE;
  swatch.style.background = swatchColor;
  statusEl.replaceChildren(swatch, document.createTextNode(` ${text}`));
}

// Toolbar highlights follow the active tool rather than being toggled by each control: the mode
// button for a mode, the wire button for the wire tool, the catalog entry for an armed part, and
// the phone toolbar's matching button.
function syncToolHighlights() {
  const kind = ToolState.active.kind;
  document.getElementById('wireArmBtn')?.classList.toggle('active-mode', kind === "wire");
  document.querySelectorAll('#toolModeSelector .tool-mode-btn').forEach(btn => {
    btn.classList.toggle('active-mode', btn.getAttribute('data-mode') === kind);
  });
  document.querySelectorAll('#mobileNav [data-tool]').forEach(btn => {
    btn.classList.toggle('active-mode', btn.getAttribute('data-tool') === kind);
  });
  notifyArmedPartChanged();
}

export function updateSelectionStatus() {
  const statusEl = document.getElementById('activeSelectionStatus');
  syncToolHighlights();
  if (!statusEl) return;
  if (ViewState.solderSide) {
    const count = ViewState.solderJointCount;
    setStatus(statusEl, `Solder side, seen from below: ${count} joint${count === 1 ? "" : "s"} to solder [Square = pin 1]`);
    document.getElementById('statusLead')?.classList.remove('is-quiet');
    return;
  }
  const tool = ToolState.active;
  const cancel = document.getElementById('cancelToolBtn');
  if (cancel) cancel.hidden = !isPlacementTool(tool);
  const rotate = document.getElementById('rotateToolBtn');
  if (rotate) rotate.hidden = tool.kind !== "ic" && tool.kind !== "advanced-component";
  // Nothing to say beyond what the selection bar shows: the phone layout hides it then.
  document.getElementById('statusLead')?.classList.toggle('is-quiet', tool.kind === "select");
  const toolText = behaviorOf(tool).statusText(tool);
  const modeLabel = tool.kind.toUpperCase();
  const selection = SelectionState.current;
  // A selected part outranks a placement tool, which outranks a selected wire or pad.
  if (selection?.kind === "part") {
    const part = selection.part;
    if (part.kind === "ic") {
      setStatus(statusEl, `${part.ref} ${part.name} Selected [Drag to Move • Del to Remove]`, SELECTED_PART_COLOR);
    } else if (part.kind === "advanced-component") {
      const def = part.getDefinition();
      const size = def?.gridSizable ? ` ${part.rows}×${part.cols}` : "";
      setStatus(statusEl, `${part.ref} ${def?.name ?? "Component"}${size} Selected [Drag to Move • R to Rotate • Del to Remove]`, SELECTED_PART_COLOR);
    } else {
      const def = part.getDefinition();
      setStatus(statusEl, `${part.ref} ${def?.name ?? "Component"} Selected [Drag to Move • Del to Remove]`, SELECTED_PART_COLOR);
    }
  } else if (isPlacementTool(tool)) {
    setStatus(statusEl, toolText);
  } else if (selection?.kind === "line") {
    const reshape = tool.kind === "select" ? "Drag it to bend it • Drag a bend or an end to move it • " : "";
    const unbend = tool.kind === "select" && selection.line.via?.length ? "Double-click a bend to remove it • " : "";
    setStatus(statusEl, `Line Selected (${selection.line.width || 4}px) [${reshape}${unbend}Mode: ${modeLabel}]`, selection.line.color || '#777676');
  } else if (selection?.kind === "dot") {
    setStatus(statusEl, `Pad ${holeName(toGridPos(selection.dot))} Selected [Mode: ${modeLabel}]`);
  } else {
    setStatus(statusEl, toolText);
  }
}

// Update status badge on user clicks
window.addEventListener('click', () => {
  setTimeout(updateSelectionStatus, 50);
});
