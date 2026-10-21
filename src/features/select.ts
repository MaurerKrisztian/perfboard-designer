import {isRouteTool, ToolState} from "../state/ToolState";
import {DotState} from "../state/DotState";
import {redrawCanvas} from "./draw-canvas";
import {Canvas} from "../state/Canvas";
import {ShortcutRegistry} from "./shortcut-keys";
import {updateSelectionStatus} from "./selection-status";
import {endDrag} from "./component-drag";
import {findPartAt} from "./placed-parts";
import {SelectionState} from "../state/SelectionState";
import {resetInteraction} from "./reset-interaction";
import {canPickUpParts, isOverPlacedPart} from "./hover";
import {ViewState} from "../state/ViewState";
import {selectAt, selectLine, setSelection} from "./board-selection";
import {behaviorOf} from "./tools";
import {IDot} from "../interfaces/dot.interface";
import {cancelReshape, finishReshape, isReshaping, removeBend, startReshape, WireGrip, wireGripAt} from "./wire-reshape";
import {axisOf, cancelWireDrag, finishWireDrag, setWireDragStraight, startWireDrag, wireDragFrom, wireDragStartDot} from "./wire-drag";

// Board input: routes left clicks to the active tool (src/features/tools/), and owns panning,
// the right-click context menu and Escape. Mouse and pen come through here; fingers go through
// board-touch.ts, which reuses the pieces exported below.

let isPanningBoard = false;
let panStartX = 0;
let panStartY = 0;
let startScrollLeft = 0;
let startScrollTop = 0;

// A left press on bare board (Select mode, nothing armed) may be the start of a drag-to-pan, so
// the click is held back until the pointer either moves this far (pan) or is released (click).
const PAN_DRAG_THRESHOLD = 4;
let pendingPan: {clientX: number; clientY: number; event: MouseEvent} | undefined;
// Likewise a left press on a hole in Select mode or with the wire tool may be the start of a wire
// dragged to another hole (wire-drag.ts), or just a click.
let pendingWire: {clientX: number; clientY: number; event: MouseEvent; dot: IDot} | undefined;
// And a left press on a handle of the selected wire may be the start of bending it
// (wire-reshape.ts). Just a click there leaves the wire selected.
let pendingReshape: {clientX: number; clientY: number; grip: WireGrip} | undefined;

export function startPan(clientX: number, clientY: number) {
  const container = document.getElementById('canvas-container');
  if (!container) return;
  isPanningBoard = true;
  panStartX = clientX;
  panStartY = clientY;
  startScrollLeft = container.scrollLeft;
  startScrollTop = container.scrollTop;
  Canvas.c.style.cursor = 'grabbing';
}

export function panTo(clientX: number, clientY: number) {
  if (!isPanningBoard) return;
  const container = document.getElementById('canvas-container');
  if (!container) return;
  container.scrollLeft = startScrollLeft - (clientX - panStartX);
  container.scrollTop = startScrollTop - (clientY - panStartY);
}

export function stopPan() {
  if (!isPanningBoard) return;
  isPanningBoard = false;
  Canvas.c.style.cursor = ViewState.spacePanHeld ? 'grab' : 'crosshair';
}

// What a plain click on bare board does: drop any part selection, then select the hole or wire
// under the pointer.
function clickBareBoard(e: MouseEvent) {
  const {x, y} = Canvas.toDrawingCoordinates(e);
  SelectionState.clear("part");
  setSelection(x, y);
  redrawCanvas();
  updateSelectionStatus();
}

// A press of the primary button at e, handed to the active tool: in Select mode it picks up the
// part there (bare board goes through clickBoard instead).
export function pressBoard(e: MouseEvent) {
  hideContextMenu();
  const {x, y} = Canvas.toDrawingCoordinates(e);
  const tool = ToolState.active;
  if (!behaviorOf(tool).onPointerDown(tool, {x, y, hoverDot: DotState.hoverDot, keepArmed: e.shiftKey})) {
    // A placement tool clicked away from any pad: plain selection instead. The wire tool
    // doesn't pick parts up, so a slightly-off click near a pin can't grab the whole part
    // mid-run.
    selectAt(x, y, !isRouteTool(tool));
  }
  redrawCanvas();
  updateSelectionStatus();
}

// A whole click (press and release without moving) at e.
export function clickBoard(e: MouseEvent) {
  const {x, y} = Canvas.toDrawingCoordinates(e);
  if (canPickUpParts() && !isOverPlacedPart(x, y)) {
    hideContextMenu();
    clickBareBoard(e);
    return;
  }
  pressBoard(e);
  endDrag();
}

Canvas.c.addEventListener('pointerdown', function(e) {
  if (e.pointerType === 'touch') return;
  // Middle button, or left button while Space is held, always pans; so does any left drag while
  // the solder side shows, which is only for looking at.
  if (e.button === 1 || (e.button === 0 && (ViewState.spacePanHeld || ViewState.solderSide))) {
    e.preventDefault();
    startPan(e.clientX, e.clientY);
    return;
  }

  if (e.button === 0) {
    const {x, y} = Canvas.toDrawingCoordinates(e);

    // The selected wire's handles come first: a drag there bends that wire.
    const grip = wireGripAt(x, y, false);
    if (grip) {
      hideContextMenu();
      pendingReshape = {clientX: e.clientX, clientY: e.clientY, grip};
      return;
    }

    const wireDot = wireDragStartDot(x, y, false);
    if (wireDot) {
      hideContextMenu();
      pendingWire = {clientX: e.clientX, clientY: e.clientY, event: e, dot: wireDot};
      return;
    }

    // Select mode on bare board: wait and see whether this is a click or a drag-to-pan.
    if (canPickUpParts() && !isOverPlacedPart(x, y)) {
      hideContextMenu();
      pendingPan = {clientX: e.clientX, clientY: e.clientY, event: e};
      return;
    }

    pressBoard(e);
  }
});

window.addEventListener('pointermove', (e) => {
  if (e.pointerType === 'touch') return;
  if (pendingReshape && Math.hypot(e.clientX - pendingReshape.clientX, e.clientY - pendingReshape.clientY) >= PAN_DRAG_THRESHOLD) {
    startReshape(pendingReshape.grip, DotState.hoverDot);
    pendingReshape = undefined;
    redrawCanvas();
  }
  if (pendingWire && Math.hypot(e.clientX - pendingWire.clientX, e.clientY - pendingWire.clientY) >= PAN_DRAG_THRESHOLD) {
    // The wire bends the way the pointer went first.
    startWireDrag(pendingWire.dot, axisOf(e.clientX - pendingWire.clientX, e.clientY - pendingWire.clientY));
    pendingWire = undefined;
    redrawCanvas();
  }
  if (wireDragFrom()) setWireDragStraight(e.shiftKey);
  if (pendingPan && Math.hypot(e.clientX - pendingPan.clientX, e.clientY - pendingPan.clientY) >= PAN_DRAG_THRESHOLD) {
    // It's a drag: pan from where the press started (so the board doesn't jump), and drop the click.
    startPan(pendingPan.clientX, pendingPan.clientY);
    pendingPan = undefined;
  }
  panTo(e.clientX, e.clientY);
});

window.addEventListener('pointerup', (e) => {
  if (e.pointerType === 'touch') return;
  pendingReshape = undefined;
  if (isReshaping()) endReshape();
  if (pendingPan) {
    // Released without moving: it was a plain click after all.
    const {event} = pendingPan;
    pendingPan = undefined;
    clickBareBoard(event);
  }
  if (pendingWire) {
    const {event} = pendingWire;
    pendingWire = undefined;
    clickBoard(event);
  }
  if (wireDragFrom()) endWireDrag();
  stopPan();
  endDrag();
});

// Lets go of a wire being bent: it takes its new route.
export function endReshape() {
  finishReshape();
  redrawCanvas();
  updateSelectionStatus();
}

// Double-clicking a bend of the selected wire takes it out.
Canvas.c.addEventListener('dblclick', (e) => {
  const line = SelectionState.line;
  const {x, y} = Canvas.toDrawingCoordinates(e);
  const grip = wireGripAt(x, y, false);
  if (!line || grip?.kind !== "bend") return;
  removeBend(line, grip.index);
  redrawCanvas();
  updateSelectionStatus();
});

// Lets go of a wire being dragged: drawn to the hole under the pointer, if that's another hole.
export function endWireDrag() {
  finishWireDrag(DotState.hoverDot);
  redrawCanvas();
  updateSelectionStatus();
}

// Hold Space + drag to pan in any mode (as in Figma/Photoshop). A held modifier rather than a
// one-shot action, so it's tracked here instead of being an entry in ShortcutRegistry.
function isTextEntry(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable);
}

function releaseSpacePan() {
  ViewState.spacePanHeld = false;
  if (!isPanningBoard) Canvas.c.style.cursor = 'crosshair';
}

window.addEventListener('keydown', (e) => {
  if (e.code !== 'Space' || isTextEntry(e.target)) return;
  // Stops the page from scrolling, and a focused toolbar button from being "clicked" by Space.
  e.preventDefault();
  if (e.repeat) return;
  ViewState.spacePanHeld = true;
  if (!isPanningBoard) Canvas.c.style.cursor = 'grab';
});

window.addEventListener('keyup', (e) => {
  if (e.code !== 'Space' || isTextEntry(e.target)) return;
  e.preventDefault();
  releaseSpacePan();
});

// Letting go of Space in another window would never reach us.
window.addEventListener('blur', releaseSpacePan);

// Right click context menu handler. A finger's long press opens it through board-touch.ts, so the
// browser's own long-press contextmenu is ignored.
Canvas.c.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  if ((e as PointerEvent).pointerType === 'touch' || ViewState.solderSide) return;
  openContextMenuAt(e);
});

// The hole the context menu was opened on, for its Start Wire Here.
let contextHole: IDot | undefined;

export function contextMenuHole(): IDot | undefined {
  return contextHole;
}

// Opens the context menu for the part, wire or pad at e, selecting it; nothing there closes it.
export function openContextMenuAt(e: MouseEvent) {
  const {x, y} = Canvas.toDrawingCoordinates(e);
  contextHole = DotState.hoverDot;
  for (const id of ['ctxWireBtn', 'ctxSolderBtn']) {
    const startBtn = document.getElementById(id);
    if (startBtn) startBtn.hidden = !contextHole;
  }

  const part = findPartAt(x, y);
  if (part) {
    SelectionState.current = {kind: "part", part};
    redrawCanvas();
    showContextMenu(e.clientX, e.clientY);
    return;
  }

  // The menu now acts on a wire or pad, so a part selected earlier mustn't be what Delete hits.
  SelectionState.clear("part");
  selectLine(x, y);
  if (!SelectionState.line) {
    SelectionState.current = DotState.hoverDot ? {kind: "dot", dot: DotState.hoverDot} : undefined;
  }
  redrawCanvas();

  if (SelectionState.line || SelectionState.dot || contextHole) {
    showContextMenu(e.clientX, e.clientY);
  } else {
    hideContextMenu();
  }
}

// Shows a popup menu at (x, y), moved left or up as needed to stay on screen (a phone's is narrow).
function placeMenu(menu: HTMLElement, x: number, y: number) {
  menu.style.display = 'block';
  const margin = 8;
  const left = Math.max(margin, Math.min(x, window.innerWidth - menu.offsetWidth - margin));
  const top = Math.max(margin, Math.min(y, window.innerHeight - menu.offsetHeight - margin));
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
}

export function showContextMenu(x: number, y: number) {
  const menu = document.getElementById('contextMenu');
  if (!menu) return;
  placeMenu(menu, x, y);
}

export function hideContextMenu() {
  const menu = document.getElementById('contextMenu');
  if (menu) {
    menu.style.display = 'none';
  }
  hideLedColorMenu();
}

// At (x, y), or where the context menu was shown.
export function showLedColorMenu(x?: number, y?: number) {
  const menu = document.getElementById('ledColorMenu');
  const contextMenu = document.getElementById('contextMenu');
  if (!menu) return;
  if (x !== undefined && y !== undefined) {
    if (contextMenu) contextMenu.style.display = 'none';
    placeMenu(menu, x, y);
    return;
  }
  if (contextMenu) {
    // Reuse the position the right-click context menu was already shown at.
    const left = parseFloat(contextMenu.style.left) || 0;
    const top = parseFloat(contextMenu.style.top) || 0;
    contextMenu.style.display = 'none';
    placeMenu(menu, left, top);
    return;
  }
  menu.style.display = 'block';
}

export function hideLedColorMenu() {
  const menu = document.getElementById('ledColorMenu');
  if (menu) {
    menu.style.display = 'none';
  }
}

window.addEventListener('click', (e) => {
  const menu = document.getElementById('contextMenu');
  const ledColorMenu = document.getElementById('ledColorMenu');
  if (menu && !menu.contains(e.target as Node) && ledColorMenu && !ledColorMenu.contains(e.target as Node)) {
    hideContextMenu();
  }
});

// The board bar's cancel button, shown while a placement tool is armed: drops it, as Escape
// eventually does.
document.getElementById('cancelToolBtn')?.addEventListener('click', () => {
  resetInteraction();
  hideContextMenu();
  redrawCanvas();
});

// Enter completes what the active tool is building: a wire ends at its last bend.
ShortcutRegistry.add({key: "Enter", description: "End the wire being drawn at its last bend.", event: () => {
  const tool = ToolState.active;
  if (!behaviorOf(tool).finish?.(tool)) return;
  redrawCanvas();
  updateSelectionStatus();
}});

ShortcutRegistry.add({key: "Escape", description: "Unselect dot or line", event: ()=>{
  if (isReshaping()) {
    cancelReshape();
    redrawCanvas();
    return;
  }
  if (wireDragFrom()) {
    cancelWireDrag();
    redrawCanvas();
    return;
  }
  // A tool may step back first (e.g. the wire tool ends its run but stays armed); otherwise
  // Escape drops the placement tool and the selection.
  const tool = ToolState.active;
  if (behaviorOf(tool).stepBack?.(tool)) {
    updateSelectionStatus();
    redrawCanvas();
    return;
  }
  resetInteraction();
  hideContextMenu();
  redrawCanvas();
}});
