import {DotState} from "../state/DotState";
import {LineState} from "../state/LineState";
import {GridConfig} from "../state/GridConfig";
import {redrawCanvas} from "./draw-canvas";
import {Canvas} from "../state/Canvas";
import {Utils} from "../utils/utils";
import {ShortcutRegistry} from "./shortcut-keys";
import {ToolState} from "../state/ToolState";
import {DragState} from "../state/DragState";
import {updateDrag} from "./component-drag";
import {ViewState} from "../state/ViewState";
import {findPartAt} from "./placed-parts";
import {DEFAULT_DOT_COLOR} from "../board-render";
import {PartState} from "../state/PartState";
import {SelectionState} from "../state/SelectionState";
import {wireDragFrom, wireDragStartDot} from "./wire-drag";
import {lineLegs} from "./line-path";
import {isReshaping, reshapeTo, wireGripAt} from "./wire-reshape";
import {IDot} from "../interfaces/dot.interface";

export function isOverPlacedPart(x: number, y: number): boolean {
  return PartState.parts.some(part => part.containsPoint(x, y));
}

// Select mode with nothing armed for placement: placed parts can be dragged, and a drag on bare
// board pans it.
export function canPickUpParts(): boolean {
  return ToolState.active.kind === "select";
}

// Hints at what a drag would do in Select mode: bend the selected wire (on its handles), move a
// part (over its body), draw a wire (on a hole), or pan (anywhere else). Left alone while the cursor reads 'grabbing', which means a drag
// or a board pan owns it right now.
function updateDragCursor(x: number, y: number) {
  if (Canvas.c.style.cursor === 'grabbing') return;
  if (ViewState.spacePanHeld) {
    Canvas.c.style.cursor = 'grab';
    return;
  }
  if (!canPickUpParts() || wireDragFrom()) {
    Canvas.c.style.cursor = 'crosshair';
  } else if (isReshaping() || wireGripAt(x, y, false)) {
    // On the selected wire: a drag bends it.
    Canvas.c.style.cursor = 'move';
  } else if (wireDragStartDot(x, y, false)) {
    Canvas.c.style.cursor = 'crosshair';
  } else {
    Canvas.c.style.cursor = isOverPlacedPart(x, y) ? 'move' : 'grab';
  }
}

function findHoveredComponentValue(x: number, y: number): string | undefined {
  const part = findPartAt(x, y, p => p.kind !== "ic" && !!p.value);
  if (!part || part.kind === "ic") return undefined;
  return `${part.getDefinition()?.name}: ${part.value}`;
}

// Works out the pad and wire under the pointer at e (and moves a dragged part along). Runs on
// every pointer move; a finger has no hover, so board-touch.ts also calls it when one lands.
export function hoverAt(e: MouseEvent) {
  if (ViewState.solderSide) {
    // Nothing on the solder side is pointed at, and a drag pans it.
    DotState.hoverDot = undefined;
    LineState.hoverLine = undefined;
    if (Canvas.c.style.cursor !== 'grabbing') Canvas.c.style.cursor = 'grab';
    return;
  }
  const {x, y} = Canvas.toDrawingCoordinates(e);

  const previousHoverDot = DotState.hoverDot;
  const previousHoverLine = LineState.hoverLine;

  // Check if mouse is within a dot
  DotState.hoverDot = undefined;
  for(let i = 0; i < DotState.dots.length; i++) {
    const dot = DotState.dots[i];
    const dx = x - dot.x;
    const dy = y - dot.y;
    if(dx * dx + dy * dy < GridConfig.dotSelectionRadius * GridConfig.dotSelectionRadius){
      DotState.hoverDot = dot;
      break;
    }
  }

  // Check if mouse is within a line
  LineState.hoverLine = undefined;
  // Close to any of its legs: the sum of the distances to a leg's two ends is barely more than
  // the leg's length.
  const nearLeg = ([a, b]: [IDot, IDot]) =>
    Math.abs(Math.hypot(b.x - a.x, b.y - a.y) - Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y)) < GridConfig.lineSelectTolerance;
  LineState.hoverLine = LineState.lines.find(line => lineLegs(line).some(nearLeg));


  // A part, or a selected wire's handle, being dragged follows the pointer.
  const dragMoved = DragState.target ? updateDrag(x, y) : reshapeTo(DotState.hoverDot);
  updateDragCursor(x, y);

  if (dragMoved || DotState.hoverDot !== previousHoverDot || LineState.hoverLine !== previousHoverLine) {
    redrawCanvas();
  }

  if(DotState.hoverDot && DotState.hoverDot.description){
    Utils.getSafeHtmlElement('dotDescription').innerText = DotState.hoverDot.description;
  } else {
    Utils.getSafeHtmlElement('dotDescription').innerText = findHoveredComponentValue(x, y) || '';
  }
}

// A finger hovers only where it lands (board-touch.ts): following it as it pans would redraw the
// whole board on every move. A part it drags still follows it.
Canvas.c.addEventListener('pointermove', (e) => {
  if (e.pointerType === 'touch' && !DragState.target) return;
  hoverAt(e);
});


// Moves the selected pad's color and note onto the hovered pad. The pads themselves stay put:
// wires and parts are pinned to these dot objects, so replacing them would cut those links.
ShortcutRegistry.add({key: "m", description: "Move the point. select a point, then move the mouse pointer to another point, then press 'm'", event: ()=>{
  const from = SelectionState.dot;
  const to = DotState.hoverDot;
  if (!from || !to || from === to) return;
  to.color = from.color;
  to.description = from.description;
  from.color = DEFAULT_DOT_COLOR;
  from.description = undefined;
  SelectionState.clear("dot");
  redrawCanvas();
}})
