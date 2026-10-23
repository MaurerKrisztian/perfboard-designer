import {Canvas} from "../state/Canvas";
import {ViewState} from "../state/ViewState";
import {applyCanvasResolution} from "./canvas-sizing";
import {redrawCanvas} from "./draw-canvas";
import {attachMouseInput} from "./select";
import {attachTouchInput} from "./board-touch";
import {attachHover} from "./hover";
import {attachWheelZoom, watchDevicePixelRatio} from "./zoom";
import {listenForShortcuts} from "./shortcut-keys";
import {registerEditorShortcuts} from "./keyboard-shortcuts";
import {listenForWireDragKeys} from "./wire-drag";
import {restorePartLabels} from "./part-labels";
import {trackSolderSide} from "./solder-view";
import {trackBoardNets} from "./board-nets";
import {createDotGrid} from "./project/resize-grid";
import {startProjects} from "./project/current-project";
import {startOpeningSharedLinks} from "./project/open-shared-link";

// The editor core's two entry points for the UI (src/ui/). Everything else the UI does goes through
// the functions of the feature modules, and it hears about changes through editor-events.ts.

// Hands the board's canvas, and the scrolling viewport it sits in, to the editor: it draws the
// board there and takes the mouse, pen, finger and wheel input on it. Returns a function that
// detaches the input again (the element may be replaced).
export function attachBoard(canvas: HTMLCanvasElement, viewport: HTMLElement): () => void {
  Canvas.attach(canvas, viewport);
  const detachers = [attachMouseInput(canvas), attachTouchInput(canvas), attachHover(canvas), attachWheelZoom(canvas)];
  applyCanvasResolution(ViewState.zoom);
  redrawCanvas();
  return () => detachers.forEach(detach => detach());
}

let started = false;

// Starts the editor, once per page: its keyboard shortcuts, the board's first grid, then the
// project open last time (and a shared one the page was opened with), kept saved from then on.
export function startEditor() {
  if (started) return;
  started = true;
  registerEditorShortcuts();
  listenForShortcuts();
  listenForWireDragKeys();
  restorePartLabels();
  watchDevicePixelRatio();
  createDotGrid(10, 10);
  trackSolderSide();
  trackBoardNets();
  startProjects();
  startOpeningSharedLinks();
  redrawCanvas();
}
