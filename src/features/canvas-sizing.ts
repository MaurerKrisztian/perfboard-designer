import {Canvas} from "../state/Canvas";

// Phone browsers refuse a bigger canvas (iOS Safari's limit is 16.7M pixels) or run out of memory
// near it, and a phone's 3x screen gets there at the default board's top zoom. Past this the board
// is drawn at a lower resolution and scaled up, a little soft. Desktops keep full resolution.
const MAX_TOUCH_CANVAS_PIXELS = 12_000_000;
const touchScreen = matchMedia('(pointer: coarse)');

export function applyCanvasResolution(zoom: number): void {
  const dpr = window.devicePixelRatio || 1;
  let effectiveScale = dpr * zoom;
  if (touchScreen.matches) {
    effectiveScale = Math.min(effectiveScale, Math.sqrt(MAX_TOUCH_CANVAS_PIXELS / (Canvas.gridWidth * Canvas.gridHeight)));
  }
  const targetW = Math.round(Canvas.gridWidth * effectiveScale);
  const targetH = Math.round(Canvas.gridHeight * effectiveScale);
  const shownScale = effectiveScale < dpr * zoom ? zoom * dpr / effectiveScale : 1;

  Canvas.c.width = targetW;
  Canvas.c.height = targetH;
  // Size the element to a whole number of device pixels, so the browser shows the backing store
  // 1:1 instead of resampling it (which blurs it whenever zoom x dpr is fractional, e.g. 63%).
  Canvas.c.style.width = `${targetW * shownScale / dpr}px`;
  Canvas.c.style.height = `${targetH * shownScale / dpr}px`;
  Canvas.ctx.setTransform(targetW / Canvas.gridWidth, 0, 0, targetH / Canvas.gridHeight, 0, 0);
}

function watchDevicePixelRatio(onChange: () => void): void {
  const mql = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
  mql.addEventListener('change', () => {
    onChange();
    watchDevicePixelRatio(onChange);
  }, { once: true });
}

export function startDevicePixelRatioWatch(getCurrentZoom: () => number, redrawCanvas: () => void): void {
  watchDevicePixelRatio(() => {
    applyCanvasResolution(getCurrentZoom());
    redrawCanvas();
  });
}
