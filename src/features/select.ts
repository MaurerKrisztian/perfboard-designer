import {isRouteTool, ToolState} from "../state/ToolState";
import {DotState} from "../state/DotState";
import {redrawCanvas} from "./draw-canvas";
import {Canvas} from "../state/Canvas";
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
import {hideBoardMenus, showBoardMenu} from "./board-menus";
import {isTextEntry} from "./shortcut-keys";

// Board input: routes left clicks to the active tool (src/features/tools/), and owns panning,
// the right-click context menu, Escape and Enter. Mouse and pen come through here
// (attachMouseInput); fingers go through board-touch.ts, which reuses the pieces exported below.

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
  isPanningBoard = true;
  panStartX = clientX;
  panStartY = clientY;
  startScrollLeft = Canvas.viewport.scrollLeft;
  startScrollTop = Canvas.viewport.scrollTop;
  Canvas.c.style.cursor = 'grabbing';
}

export function panTo(clientX: number, clientY: number) {
  if (!isPanningBoard) return;
  Canvas.viewport.scrollLeft = startScrollLeft - (clientX - panStartX);
  Canvas.viewport.scrollTop = startScrollTop - (clientY - panStartY);
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
}

// A press of the primary button at e, handed to the active tool: in Select mode it picks up the
// part there (bare board goes through clickBoard instead).
export function pressBoard(e: MouseEvent) {
  hideBoardMenus();
  const {x, y} = Canvas.toDrawingCoordinates(e);
  const tool = ToolState.active;
  if (!behaviorOf(tool).onPointerDown(tool, {x, y, hoverDot: DotState.hoverDot, keepArmed: e.shiftKey})) {
    // A placement tool clicked away from any pad: plain selection instead. The wire tool
    // doesn't pick parts up, so a slightly-off click near a pin can't grab the whole part
    // mid-run.
    selectAt(x, y, !isRouteTool(tool));
  }
  redrawCanvas();
}

// A whole click (press and release without moving) at e.
export function clickBoard(e: MouseEvent) {
  const {x, y} = Canvas.toDrawingCoordinates(e);
  if (canPickUpParts() && !isOverPlacedPart(x, y)) {
    hideBoardMenus();
    clickBareBoard(e);
    return;
  }
  pressBoard(e);
  endDrag();
}

function onPointerDown(e: PointerEvent) {
  if (e.pointerType === 'touch') return;
  // Middle button, or left button while Space is held, always pans; so does any left drag while
  // the solder side shows, which is only for looking at.
  if (e.button === 1 || (e.button === 0 && (ViewState.spacePanHeld || ViewState.solderSide))) {
    e.preventDefault();
    startPan(e.clientX, e.clientY);
    return;
  }
  if (e.button !== 0) return;

  const {x, y} = Canvas.toDrawingCoordinates(e);

  // The selected wire's handles come first: a drag there bends that wire.
  const grip = wireGripAt(x, y, false);
  if (grip) {
    hideBoardMenus();
    pendingReshape = {clientX: e.clientX, clientY: e.clientY, grip};
    return;
  }

  const wireDot = wireDragStartDot(x, y, false);
  if (wireDot) {
    hideBoardMenus();
    pendingWire = {clientX: e.clientX, clientY: e.clientY, event: e, dot: wireDot};
    return;
  }

  // Select mode on bare board: wait and see whether this is a click or a drag-to-pan.
  if (canPickUpParts() && !isOverPlacedPart(x, y)) {
    hideBoardMenus();
    pendingPan = {clientX: e.clientX, clientY: e.clientY, event: e};
    return;
  }

  pressBoard(e);
}

const movedFar = (from: {clientX: number; clientY: number}, e: PointerEvent) =>
  Math.hypot(e.clientX - from.clientX, e.clientY - from.clientY) >= PAN_DRAG_THRESHOLD;

function onPointerMove(e: PointerEvent) {
  if (e.pointerType === 'touch') return;
  if (pendingReshape && movedFar(pendingReshape, e)) {
    startReshape(pendingReshape.grip, DotState.hoverDot);
    pendingReshape = undefined;
    redrawCanvas();
  }
  if (pendingWire && movedFar(pendingWire, e)) {
    // The wire bends the way the pointer went first.
    startWireDrag(pendingWire.dot, axisOf(e.clientX - pendingWire.clientX, e.clientY - pendingWire.clientY));
    pendingWire = undefined;
    redrawCanvas();
  }
  if (wireDragFrom()) setWireDragStraight(e.shiftKey);
  if (pendingPan && movedFar(pendingPan, e)) {
    // It's a drag: pan from where the press started (so the board doesn't jump), and drop the click.
    startPan(pendingPan.clientX, pendingPan.clientY);
    pendingPan = undefined;
  }
  panTo(e.clientX, e.clientY);
}

function onPointerUp(e: PointerEvent) {
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
}

// Lets go of a wire being bent: it takes its new route.
export function endReshape() {
  finishReshape();
  redrawCanvas();
}

// Double-clicking a bend of the selected wire takes it out.
function onDoubleClick(e: MouseEvent) {
  const line = SelectionState.line;
  const {x, y} = Canvas.toDrawingCoordinates(e);
  const grip = wireGripAt(x, y, false);
  if (!line || grip?.kind !== "bend") return;
  removeBend(line, grip.index);
  redrawCanvas();
}

// Lets go of a wire being dragged: drawn to the hole under the pointer, if that's another hole.
export function endWireDrag() {
  finishWireDrag(DotState.hoverDot);
  redrawCanvas();
}

// Hold Space + drag to pan in any mode (as in Figma/Photoshop). A held modifier rather than a
// one-shot action, so it's tracked here instead of being an entry in ShortcutRegistry.
function releaseSpacePan() {
  ViewState.spacePanHeld = false;
  if (!isPanningBoard) Canvas.c.style.cursor = 'crosshair';
}

function onKeyDown(e: KeyboardEvent) {
  if (e.code !== 'Space' || isTextEntry(e.target)) return;
  // Stops the page from scrolling, and a focused toolbar button from being "clicked" by Space.
  e.preventDefault();
  if (e.repeat) return;
  ViewState.spacePanHeld = true;
  if (!isPanningBoard) Canvas.c.style.cursor = 'grab';
}

function onKeyUp(e: KeyboardEvent) {
  if (e.code !== 'Space' || isTextEntry(e.target)) return;
  e.preventDefault();
  releaseSpacePan();
}

// Right click: the context menu. A finger's long press opens it through board-touch.ts, so the
// browser's own long-press contextmenu is ignored.
function onContextMenu(e: MouseEvent) {
  e.preventDefault();
  if ((e as PointerEvent).pointerType === 'touch' || ViewState.solderSide) return;
  openContextMenuAt(e);
}

// Opens the context menu for the part, wire or pad at e, selecting it; nothing there closes it.
export function openContextMenuAt(e: MouseEvent) {
  const {x, y} = Canvas.toDrawingCoordinates(e);
  const hole = DotState.hoverDot;
  const menu = {kind: "actions" as const, x: e.clientX, y: e.clientY, hole};

  const part = findPartAt(x, y);
  if (part) {
    SelectionState.current = {kind: "part", part};
    redrawCanvas();
    showBoardMenu(menu);
    return;
  }

  // The menu now acts on a wire or pad, so a part selected earlier mustn't be what Delete hits.
  SelectionState.clear("part");
  selectLine(x, y);
  if (!SelectionState.line) {
    SelectionState.current = DotState.hoverDot ? {kind: "dot", dot: DotState.hoverDot} : undefined;
  }
  redrawCanvas();

  if (SelectionState.line || SelectionState.dot || hole) {
    showBoardMenu(menu);
  } else {
    hideBoardMenus();
  }
}

// The board bar's cancel button, shown while a placement tool is armed: drops it, as Escape
// eventually does.
export function cancelPlacement() {
  resetInteraction();
  hideBoardMenus();
  redrawCanvas();
}

// Enter completes what the active tool is building: a wire ends at its last bend.
export function finishActiveTool() {
  const tool = ToolState.active;
  if (!behaviorOf(tool).finish?.(tool)) return;
  redrawCanvas();
}

// Escape backs out one step: a wire being bent or dragged, then the active tool's own step (the
// wire tool ends its run but stays armed), then the placement tool and the selection.
export function stepBack() {
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
  const tool = ToolState.active;
  if (behaviorOf(tool).stepBack?.(tool)) {
    redrawCanvas();
    return;
  }
  cancelPlacement();
}

// Mouse and pen on the board's canvas. Returns a function that detaches it again.
export function attachMouseInput(canvas: HTMLCanvasElement): () => void {
  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('dblclick', onDoubleClick);
  canvas.addEventListener('contextmenu', onContextMenu);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  // Letting go of Space in another window would never reach us.
  window.addEventListener('blur', releaseSpacePan);
  return () => {
    canvas.removeEventListener('pointerdown', onPointerDown);
    canvas.removeEventListener('dblclick', onDoubleClick);
    canvas.removeEventListener('contextmenu', onContextMenu);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    window.removeEventListener('blur', releaseSpacePan);
  };
}
