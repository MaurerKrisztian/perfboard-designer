import {Canvas} from "../state/Canvas";
import {ViewState} from "../state/ViewState";
import {applyCanvasResolution} from "./canvas-sizing";
import {redrawCanvas} from "./draw-canvas";

// How big the board is shown (ViewState.zoom, 1 = 100%), and the zoom controls: the buttons,
// Fit, the mouse wheel and pinches (board-touch.ts) all come here. Zooming changes the canvas's
// resolution as well as its size, so the board stays sharp (canvas-sizing.ts).

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 3.0;
const STEP = 0.15;

export function clampZoom(zoom: number): number {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));
}

export function setZoom(zoom: number) {
  ViewState.zoom = clampZoom(zoom);
  applyCanvasResolution(ViewState.zoom);
  redrawCanvas();
}

// Zooms while keeping the content point under (anchorClientX, anchorClientY) fixed on screen,
// so zoom expands around that point instead of always growing toward the container's bottom-right.
export function applyZoomAnchored(zoom: number, anchorClientX: number, anchorClientY: number) {
  const beforeRect = Canvas.c.getBoundingClientRect();
  const fracX = beforeRect.width > 0 ? (anchorClientX - beforeRect.left) / beforeRect.width : 0.5;
  const fracY = beforeRect.height > 0 ? (anchorClientY - beforeRect.top) / beforeRect.height : 0.5;

  setZoom(zoom);

  const afterRect = Canvas.c.getBoundingClientRect();
  Canvas.viewport.scrollLeft += afterRect.left + fracX * afterRect.width - anchorClientX;
  Canvas.viewport.scrollTop += afterRect.top + fracY * afterRect.height - anchorClientY;
}

// Zooms in or out by a step, about the middle of the board's viewport.
function zoomBy(step: number) {
  const rect = Canvas.viewport.getBoundingClientRect();
  applyZoomAnchored(ViewState.zoom + step, rect.left + rect.width / 2, rect.top + rect.height / 2);
}

export function zoomIn() {
  zoomBy(STEP);
}

export function zoomOut() {
  zoomBy(-STEP);
}

// Back to 100%, the Fit button with it.
export function resetZoom() {
  ViewState.fitMode = false;
  setZoom(1.0);
}

// The Fit button: zooms to show the whole board, or back to 100% when it already did. `force`
// always fits (after the layout around the board changed).
export function fitToScreen(force?: boolean) {
  if (!force && ViewState.fitMode) {
    resetZoom();
    return;
  }
  const fitScale = fitZoom();
  if (fitScale === undefined) return;
  ViewState.fitMode = true;
  setZoom(fitScale);
}

// Zooms to show the whole board, leaving the Fit button as it is (the phone layout's first view).
export function showWholeBoard() {
  const fitScale = fitZoom();
  if (fitScale !== undefined) setZoom(fitScale);
}

// The zoom at which the whole board fits in its viewport.
function fitZoom(): number | undefined {
  if (!Canvas.isAttached) return undefined;
  const viewport = Canvas.viewport;
  // Inside the viewport's padding (the phone layout's leaves room for the buttons over the board).
  const style = getComputedStyle(viewport);
  const availableWidth = viewport.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - 4;
  const availableHeight = viewport.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) - 4;
  if (availableWidth <= 0 || availableHeight <= 0) return undefined;
  return Math.min(availableWidth / Canvas.gridWidth, availableHeight / Canvas.gridHeight) * 0.95;
}

// Mouse wheel zoom, anchored to the cursor so the point under it stays put, and coalesced to at
// most one resize and redraw per frame. Returns a function that detaches it again.
export function attachWheelZoom(canvas: HTMLCanvasElement): () => void {
  let pending: {zoom: number; x: number; y: number} | undefined;
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    const base = pending?.zoom ?? ViewState.zoom;
    const first = !pending;
    pending = {zoom: base + (e.deltaY < 0 ? STEP : -STEP), x: e.clientX, y: e.clientY};
    if (!first) return;
    requestAnimationFrame(() => {
      if (!pending) return;
      applyZoomAnchored(pending.zoom, pending.x, pending.y);
      pending = undefined;
    });
  };
  canvas.addEventListener('wheel', onWheel, {passive: false});
  return () => canvas.removeEventListener('wheel', onWheel);
}

// Moving the window to a screen of another pixel density redraws the board at that density.
export function watchDevicePixelRatio() {
  const mql = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
  mql.addEventListener('change', () => {
    applyCanvasResolution(ViewState.zoom);
    redrawCanvas();
    watchDevicePixelRatio();
  }, {once: true});
}
