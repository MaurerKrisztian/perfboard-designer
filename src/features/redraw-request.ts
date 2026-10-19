// Lets a module redraw the board without importing draw-canvas.ts, for the few that draw-canvas
// reaches itself (through the tool registry), where that import would close a cycle. draw-canvas
// hands its redraw over when it loads.

let redraw: (() => void) | undefined;

export function setRedraw(handler: () => void) {
  redraw = handler;
}

export function requestRedraw() {
  redraw?.();
}
