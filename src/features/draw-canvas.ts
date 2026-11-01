import {boardOverhang, drawBoard, SELECTION_COLOR} from "../board-render";
import type {BoardView} from "../board-render";
import type {ProjectFile} from "../project-file/project-file";
import {Canvas} from "../state/Canvas";
import {DotState} from "../state/DotState";
import {ToolState} from "../state/ToolState";
import {ViewState} from "../state/ViewState";
import {applyCanvasResolution} from "./canvas-sizing";
import {isDragging} from "./component-drag";
import {behaviorOf} from "./tools";
import {drawWirePreview} from "./tools/wire-tool";
import {wireDragFrom, wireDragKind, wireDragRoute} from "./wire-drag";
import {setRedraw} from "./redraw-request";
import {CanvasPainter} from "./board-canvas/canvas-painter";
import {browserIcons} from "./board-canvas/browser-icons";
import {editorView} from "./board-canvas/editor-view";
import {getSaveJson} from "./project/save-project";
import {notifyEditorChanged} from "./editor-events";
import {selectionBox} from "./box-select";

// The board on the page. The board renderer (src/board-render/) draws it from a snapshot of the
// editor's state as a project file, with what the editor marks on it (editorView); the active
// tool's placement preview (or a wire being dragged out) and a selection box go on top. Redrawn
// from scratch on every change, which then tells the UI (notifyEditorChanged).

// One painter per canvas context, so its hole sprites are kept between redraws.
let painter: CanvasPainter | undefined;

function painterFor(ctx: CanvasRenderingContext2D): CanvasPainter {
  if (!painter || painter.ctx !== ctx) painter = new CanvasPainter(ctx);
  return painter;
}

// A part icon that finishes loading shows up at the next redraw: ask for one.
browserIcons.onLoad(() => redrawCanvas());

// Run after every redraw. Every change to the board ends in one, so this is how the editor core
// hears about changes without each edit having to report itself (autosave, the nets, the solder
// joint count).
const redrawListeners: (() => void)[] = [];

export function onRedraw(listener: () => void) {
  redrawListeners.push(listener);
}

// Run after a redraw that changed the canvas's margin.
const marginListeners: (() => void)[] = [];

export function onBoardMarginChange(listener: () => void) {
  marginListeners.push(listener);
}

// Grows or shrinks the canvas round the board to show what parts reach past its edges, keeping the
// board where it is on screen as far as scrolling can. Returns whether it changed. Left alone during
// a drag, since the canvas would jump under the pointer: a part dragged past the edge is cut off
// until it's dropped.
function fitMarginToParts(project: ProjectFile, view: BoardView): boolean {
  const overhang = boardOverhang(project, view);
  const {left, top, right, bottom} = Canvas.margin;
  const same = overhang.left === left && overhang.top === top && overhang.right === right && overhang.bottom === bottom;
  if (same || isDragging()) return false;
  const boardOnScreen = () => {
    const rect = Canvas.c.getBoundingClientRect();
    return {x: rect.left + Canvas.margin.left * rect.width / Canvas.drawingWidth, y: rect.top + Canvas.margin.top * rect.height / Canvas.drawingHeight};
  };
  const before = boardOnScreen();
  Canvas.margin = overhang;
  applyCanvasResolution(ViewState.zoom);
  const after = boardOnScreen();
  Canvas.viewport.scrollLeft += after.x - before.x;
  Canvas.viewport.scrollTop += after.y - before.y;
  return true;
}

setRedraw(redrawCanvas);

export function redrawCanvas() {
  if (!Canvas.isAttached) return;
  const project = getSaveJson();
  const view = editorView();
  const marginChanged = fitMarginToParts(project, view);
  const {left, top} = Canvas.margin;
  Canvas.ctx.clearRect(-left, -top, Canvas.drawingWidth, Canvas.drawingHeight);
  const boardPainter = painterFor(Canvas.ctx);
  drawBoard(boardPainter, project, view);
  // The wire being dragged out, or else the active tool's placement preview, over everything.
  const tool = ToolState.active;
  const dragFrom = wireDragFrom();
  if (dragFrom) {
    if (DotState.hoverDot && DotState.hoverDot !== dragFrom) drawWirePreview(boardPainter, wireDragRoute(DotState.hoverDot), false, wireDragKind());
  } else if (DotState.hoverDot) {
    behaviorOf(tool).drawPreview?.(tool, DotState.hoverDot, boardPainter);
  }
  const box = selectionBox();
  if (box) {
    boardPainter.rect(box.left, box.top, box.right - box.left, box.bottom - box.top, {
      fill: "rgba(56, 189, 248, 0.08)", stroke: {paint: SELECTION_COLOR, width: 1.5, dash: [6, 4]},
    });
  }

  for (const listener of redrawListeners) listener();
  notifyEditorChanged();
  if (marginChanged) for (const listener of marginListeners) listener();
}
