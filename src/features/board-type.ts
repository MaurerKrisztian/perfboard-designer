import {BoardSetup, BoardState} from "../state/BoardState";
import {HistoryState} from "../state/HistoryState";
import {ToolState} from "../state/ToolState";
import {redrawCanvas} from "./draw-canvas";

// Perfboard or stripboard, and a stripboard's strip direction. Switching only changes how the
// board is drawn and saved: wires, parts, marked holes and strip cuts all stay where they are.

// Puts the board into this setup, without recording history: for loading and undo/redo. The
// caller redraws.
export function setBoardSetup(setup: BoardSetup) {
  BoardState.setup = {...setup};
  // The Cut tool exists only on a stripboard.
  if (!BoardState.isStripboard && ToolState.active.kind === "cut") ToolState.active = {kind: "select"};
}

// The Board section's switches: one undoable step.
export function switchBoard(change: Partial<BoardSetup>) {
  const from = BoardState.setup;
  const to = {...from, ...change};
  if (to.type === from.type && to.strips === from.strips) return;
  setBoardSetup(to);
  HistoryState.record({type: "set", kind: "board", from, to});
  redrawCanvas();
}
