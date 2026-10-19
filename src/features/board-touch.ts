import {Canvas} from "../state/Canvas";
import {DragState} from "../state/DragState";
import {redrawCanvas} from "./draw-canvas";
import {cancelDrag, endDrag} from "./component-drag";
import {canPickUpParts, hoverAt, isOverPlacedPart} from "./hover";
import {clickBoard, endWireDrag, hideContextMenu, openContextMenuAt, panTo, pressBoard, startPan, stopPan} from "./select";
import {cancelWireDrag, startWireDrag, wireDragStartDot} from "./wire-drag";
import {IDot} from "../interfaces/dot.interface";
import {ViewState} from "../state/ViewState";
import {applyZoomAnchored, clampZoom, getCurrentZoom} from "./view-controls";

// Fingers on the board (select.ts handles mouse and pen). Nothing acts the moment a finger lands,
// so a second finger can still turn it into a pinch:
// - a tap (lifted without moving) is a click, so the active tool acts where it lifted;
// - one finger dragged pans the board, or in Select mode moves the part body it landed on (never a
//   wire: zoomed in, most of the board is holes, and panning must not draw on it);
// - two fingers pinch to zoom and drag to pan: the board is scaled as a picture while they move,
//   and redrawn at the new zoom when they lift, since redrawing a big board takes a phone too long
//   to keep up;
// - a finger held still opens the context menu, as a right click does, with Start Wire Here when
//   it's on a hole; dragged on from there without lifting, it draws a wire to the hole it's lifted on.

const TAP_SLOP = 10;
const LONG_PRESS_MS = 500;

type Gesture =
  // One finger, not yet moved: a tap, drag or long press. `wireFrom` is the hole it's on.
  | {kind: "press"; down: PointerEvent; wireFrom?: IDot}
  // Held long enough to open the context menu, and still down: moving on draws a wire.
  | {kind: "held"; down: PointerEvent; wireFrom?: IDot}
  | {kind: "wire"}
  | {kind: "pan"}
  | {kind: "drag"}                       // moving a part
  // Where the fingers started (distance, midpoint, the board's corner) and the scale shown now.
  | {kind: "pinch"; distance: number; zoom: number; startX: number; startY: number; left: number; top: number; scale: number; midX: number; midY: number}
  | {kind: "done"};                      // ended early (long press, a pinch's last finger)

const fingers = new Map<number, {x: number; y: number}>();
let gesture: Gesture | undefined;
let longPressTimer: number | undefined;
// A long press ends in a click on the board, which would close the menu it just opened.
let swallowClick = false;

function clearLongPress() {
  window.clearTimeout(longPressTimer);
  longPressTimer = undefined;
}

function twoFingers() {
  const [a, b] = Array.from(fingers.values());
  return {distance: Math.hypot(a.x - b.x, a.y - b.y), midX: (a.x + b.x) / 2, midY: (a.y + b.y) / 2};
}

// Ends a pinch: zooms for real so the point that was between the fingers is between them again.
function finishPinch(pinch: Extract<Gesture, {kind: "pinch"}>) {
  Canvas.c.style.transform = '';
  if (pinch.scale === 1 && pinch.midX === pinch.startX && pinch.midY === pinch.startY) return;
  applyZoomAnchored(pinch.zoom * pinch.scale, pinch.startX, pinch.startY);
  const container = document.getElementById('canvas-container');
  if (container) {
    container.scrollLeft -= pinch.midX - pinch.startX;
    container.scrollTop -= pinch.midY - pinch.startY;
  }
}

Canvas.c.addEventListener('pointerdown', (e) => {
  if (e.pointerType !== 'touch') return;
  e.preventDefault();
  Canvas.c.setPointerCapture(e.pointerId);
  fingers.set(e.pointerId, {x: e.clientX, y: e.clientY});
  swallowClick = false;

  if (fingers.size === 1) {
    hideContextMenu();
    if (ViewState.solderSide) {
      // Only for looking at: a finger pans, and a tap or a long press does nothing.
      gesture = {kind: "press", down: e};
      return;
    }
    hoverAt(e);
    const {x, y} = Canvas.toDrawingCoordinates(e);
    const wireFrom = wireDragStartDot(x, y, true);
    if (!wireFrom && canPickUpParts() && isOverPlacedPart(x, y)) {
      // Selects the part and picks it up; it only moves once the finger does.
      pressBoard(e);
    }
    gesture = {kind: "press", down: e, wireFrom};
    longPressTimer = window.setTimeout(() => {
      if (gesture?.kind !== "press") return;
      cancelDrag();
      openContextMenuAt(gesture.down);
      gesture = {kind: "held", down: gesture.down, wireFrom: gesture.wireFrom};
      swallowClick = true;
    }, LONG_PRESS_MS);
    return;
  }

  if (fingers.size === 2) {
    clearLongPress();
    if (gesture?.kind === "pan") stopPan();
    if (gesture?.kind === "held") hideContextMenu();
    cancelWireDrag();
    cancelDrag();
    const {distance, midX, midY} = twoFingers();
    const {left, top} = Canvas.c.getBoundingClientRect();
    gesture = {kind: "pinch", distance, zoom: getCurrentZoom(), startX: midX, startY: midY, left, top, scale: 1, midX, midY};
    Canvas.c.style.transformOrigin = '0 0';
    redrawCanvas();
  }
});

Canvas.c.addEventListener('pointermove', (e) => {
  const finger = fingers.get(e.pointerId);
  if (!finger || !gesture) return;
  finger.x = e.clientX;
  finger.y = e.clientY;

  if (gesture.kind === "held") {
    const {down, wireFrom} = gesture;
    if (!wireFrom || Math.hypot(e.clientX - down.clientX, e.clientY - down.clientY) < TAP_SLOP) return;
    hideContextMenu();
    startWireDrag(wireFrom);
    gesture = {kind: "wire"};
  }

  if (gesture.kind === "press") {
    const {down} = gesture;
    if (Math.hypot(e.clientX - down.clientX, e.clientY - down.clientY) < TAP_SLOP) return;
    clearLongPress();
    if (DragState.target) {
      gesture = {kind: "drag"};
    } else {
      gesture = {kind: "pan"};
      startPan(down.clientX, down.clientY);
    }
  }

  if (gesture.kind === "pan") {
    panTo(e.clientX, e.clientY);
  } else if (gesture.kind === "wire") {
    // The hole under the finger is where the wire would end; the board shows it dashed.
    hoverAt(e);
  } else if (gesture.kind === "pinch" && fingers.size === 2) {
    const {distance, midX, midY} = twoFingers();
    const pinch = gesture;
    if (pinch.distance > 0) pinch.scale = clampZoom(pinch.zoom * distance / pinch.distance) / pinch.zoom;
    pinch.midX = midX;
    pinch.midY = midY;
    // The board point first between the fingers follows their midpoint.
    const tx = midX - pinch.left - (pinch.startX - pinch.left) * pinch.scale;
    const ty = midY - pinch.top - (pinch.startY - pinch.top) * pinch.scale;
    Canvas.c.style.transform = `translate(${tx}px, ${ty}px) scale(${pinch.scale})`;
  }
  // A dragged part follows the finger through hover.ts, like the mouse's.
});

function liftFinger(e: PointerEvent) {
  if (!fingers.delete(e.pointerId)) return;
  clearLongPress();
  if (gesture?.kind === "press" && e.type === "pointerup" && ViewState.solderSide) {
    // A tap on the solder side does nothing.
  } else if (gesture?.kind === "press" && e.type === "pointerup") {
    // Hover followed the finger's small wobble: aim at where it landed.
    hoverAt(gesture.down);
    if (DragState.target) {
      endDrag();
    } else {
      clickBoard(gesture.down);
    }
  } else if (gesture?.kind === "press") {
    cancelDrag();
  } else if (gesture?.kind === "wire") {
    if (e.type === "pointerup") {
      endWireDrag();
    } else {
      cancelWireDrag();
      redrawCanvas();
    }
  } else if (gesture?.kind === "pan") {
    stopPan();
  } else if (gesture?.kind === "drag") {
    endDrag();
    redrawCanvas();
  } else if (gesture?.kind === "pinch") {
    finishPinch(gesture);
  }
  // The rest of a pinch is ignored until every finger is up.
  gesture = fingers.size === 0 ? undefined : {kind: "done"};
}

Canvas.c.addEventListener('pointerup', liftFinger);
Canvas.c.addEventListener('pointercancel', liftFinger);

Canvas.c.addEventListener('click', (e) => {
  if (!swallowClick) return;
  swallowClick = false;
  e.stopPropagation();
}, true);
