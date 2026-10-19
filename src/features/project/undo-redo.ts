import {HistoryState} from "../../state/HistoryState";
import {LineState} from "../../state/LineState";
import {onRedraw, redrawCanvas} from "../draw-canvas";
import {Utils} from "../../utils/utils";
import {ShortcutRegistry} from "../shortcut-keys";
import {IChange} from "../../interfaces/change.interface";
import {addToBoard, takeOffBoard} from "../placed-parts";
import {setBoardSetup} from "../board-type";

Utils.getSafeHtmlElement<HTMLButtonElement>('backBtn').addEventListener('click', function() {
undo();
});

// "apply" replays the change as it originally happened, "revert" puts the board back the way it
// was before it. A move isn't expressible as an add or a remove, hence the direction rather than
// the change's own type driving this.
function applyChange(change: IChange, direction: "apply" | "revert") {
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
    for (const line of gone) {
      const index = LineState.lines.findIndex(l => l.start === line.start && l.end === line.end);
      if (index > -1) LineState.lines.splice(index, 1);
    }
    LineState.lines.push(...back);
    return;
  }

  const add = (change.type === "add") === (direction === "apply");
  if (change.kind === "line") {
    if (add) {
      LineState.lines.push(change.line);
    } else {
      const index = LineState.lines.findIndex(l => l.start === change.line.start && l.end === change.line.end);
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
