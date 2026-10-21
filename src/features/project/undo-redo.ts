import {HistoryState} from "../../state/HistoryState";
import {LineState} from "../../state/LineState";
import {onRedraw, redrawCanvas} from "../draw-canvas";
import {Utils} from "../../utils/utils";
import {ShortcutRegistry} from "../shortcut-keys";
import {IChange} from "../../interfaces/change.interface";
import {ILine} from "../../interfaces/line.interface";
import {addToBoard, takeOffBoard} from "../placed-parts";
import {setBoardSetup} from "../board-type";
import {RequirementsState} from "../../state/RequirementsState";

Utils.getSafeHtmlElement<HTMLButtonElement>('backBtn').addEventListener('click', function() {
undo();
});

// Where `line` is on the board: that very wire, else one running the same way between the same
// holes (the objects history holds are the ones it put on the board, so this is a fallback).
function indexOfLine(line: ILine): number {
  const same = LineState.lines.indexOf(line);
  if (same > -1) return same;
  const route = (l: ILine) => [l.start, ...(l.via ?? []), l.end];
  return LineState.lines.findIndex(l => route(l).length === route(line).length && route(l).every((dot, i) => dot === route(line)[i]));
}

// "apply" replays the change as it originally happened, "revert" puts the board back the way it
// was before it. A move isn't expressible as an add or a remove, hence the direction rather than
// the change's own type driving this.
function applyChange(change: IChange, direction: "apply" | "revert") {
  if (change.kind === "batch") {
    const changes = direction === "apply" ? change.changes : [...change.changes].reverse();
    for (const item of changes) applyChange(item, direction);
    return;
  }
  if (change.kind === "requirements") {
    RequirementsState.current = direction === "apply" ? change.to : change.from;
    return;
  }
  if (change.kind === "board") {
    setBoardSetup(direction === "apply" ? change.to : change.from);
    return;
  }

  if (change.kind === "cut") {
    change.dot.cut = direction === "apply" ? change.cut : !change.cut;
    return;
  }

  if (change.type === "move") {
    change.part.setAnchorDots(direction === "apply" ? change.to : change.from);
    return;
  }

  if (change.type === "replace") {
    const [gone, back] = direction === "apply" ? [change.removed, change.added] : [change.added, change.removed];
    // Back where the first of them was, so a reshaped wire keeps its place in the drawing order.
    let at = LineState.lines.length;
    for (const line of gone) {
      const index = indexOfLine(line);
      if (index < 0) continue;
      LineState.lines.splice(index, 1);
      at = Math.min(at, index);
    }
    LineState.lines.splice(at, 0, ...back);
    return;
  }

  const add = (change.type === "add") === (direction === "apply");
  if (change.kind === "line") {
    if (add) {
      LineState.lines.push(change.line);
    } else {
      const index = indexOfLine(change.line);
      if (index > -1) LineState.lines.splice(index, 1);
    }
  } else if (add) {
    addToBoard(change.part);
  } else {
    takeOffBoard(change.part);
  }
}

export function undo(){
  if(HistoryState.changeIndex >= 0){
    const change = HistoryState.changes[HistoryState.changeIndex];
    applyChange(change, "revert");
    HistoryState.changeIndex--;
    redrawCanvas();
  }
}

// Forward button
Utils.getSafeHtmlElement<HTMLButtonElement>('forwardBtn').addEventListener('click', function() {
  redo()
});

export function redo(){
  if(HistoryState.changeIndex < HistoryState.changes.length - 1){
    HistoryState.changeIndex++;
    const change = HistoryState.changes[HistoryState.changeIndex];
    if (change == undefined){
      return;
    }
    applyChange(change, "apply");
    redrawCanvas();
  }
}

// The buttons are greyed out while there's nothing to undo or redo. Every change ends in a redraw.
onRedraw(() => {
  Utils.getSafeHtmlElement<HTMLButtonElement>('backBtn').disabled = HistoryState.changeIndex < 0;
  Utils.getSafeHtmlElement<HTMLButtonElement>('forwardBtn').disabled = HistoryState.changeIndex >= HistoryState.changes.length - 1;
});

ShortcutRegistry.add({key: "z", ctrl: true, description: "Undo last change.", event: undo});
ShortcutRegistry.add({key: "y", ctrl: true, description: "Redo last undo.", event: redo});
