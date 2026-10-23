import {HistoryState} from "../../state/HistoryState";
import {LineState} from "../../state/LineState";
import {SelectionState} from "../../state/SelectionState";
import {ActiveTool} from "../../state/ToolState";
import {selectAt, selectLine} from "../board-selection";
import {addDescriptionToDot} from "../dot-notes";
import {findPartAt, removePart} from "../placed-parts";
import {ToolBehavior} from "./tool";

// The tool rail's three modes (and Cut, in cut-tool.ts).

// A press on bare board is held back by select.ts to tell a click from a drag-to-pan, so this
// only sees presses on a placed part (picking it up) - and the released click, via selectAt.
export const selectTool: ToolBehavior<Extract<ActiveTool, {kind: "select"}>> = {
  onPointerDown(_tool, {x, y}) {
    selectAt(x, y, true);
    return true;
  },
  statusText: () => "Select [Drag from a pad to draw a wire]",
};

// Removes the topmost part under the pointer, else the wire, else the hole's note.
export const eraserTool: ToolBehavior<Extract<ActiveTool, {kind: "eraser"}>> = {
  onPointerDown(_tool, {x, y, hoverDot}) {
    const part = findPartAt(x, y);
    if (part) {
      removePart(part);
      return true;
    }
    selectLine(x, y);
    const line = SelectionState.line;
    const index = line ? LineState.lines.indexOf(line) : -1;
    if (line && index > -1) {
      HistoryState.record({type: 'remove', kind: 'line', line});
      LineState.lines.splice(index, 1);
      SelectionState.clear();
      return true;
    }
    if (hoverDot?.description) hoverDot.description = undefined;
    return true;
  },
  statusText: () => "Erase [Click a part, wire or note to remove it]",
};

export const noteTool: ToolBehavior<Extract<ActiveTool, {kind: "note"}>> = {
  onPointerDown(_tool, {hoverDot}) {
    if (hoverDot) void addDescriptionToDot(hoverDot);
    return true;
  },
  statusText: () => "Note [Click a pad to write on it]",
};
