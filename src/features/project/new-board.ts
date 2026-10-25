import {BoardType, ProjectFile, SavedBoard, StripDirection} from "../../project-file/project-file";
import {MAX_BOARD_SIDE} from "../../project-file/read-project-file";
import {BoardState} from "../../state/BoardState";
import {switchBoard} from "../board-type";
import {boardSize, resizeBoard} from "./resize-grid";

// The board a project starts on: perfboard or stripboard, a stripboard's strip direction, and its
// size in holes. The New project card sets one up, starting from the one picked the last time a
// project was made (kept in localStorage), else the open board's. The empty board's start card
// changes the open board the same way.

export interface NewBoard {
  type: BoardType;
  // Stripboard only, but kept on a perfboard so switching back restores it.
  strips: StripDirection;
  cols: number;
  rows: number;
}

export {MAX_BOARD_SIDE};

const STORAGE_KEY = "new_project_board";

const isSide = (n: unknown): n is number => typeof n === "number" && Number.isInteger(n) && n >= 1 && n <= MAX_BOARD_SIDE;

function rememberedBoard(): NewBoard | undefined {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (!raw || typeof raw !== "object") return undefined;
    const {type, strips, cols, rows} = raw as Record<string, unknown>;
    if (type !== "perfboard" && type !== "stripboard") return undefined;
    if (strips !== "horizontal" && strips !== "vertical") return undefined;
    if (!isSide(cols) || !isSide(rows)) return undefined;
    return {type, strips, cols, rows};
  } catch (e) {
    console.error("Failed to read the last new project's board from localStorage", e);
    return undefined;
  }
}

// The open board's setup and size.
export function openBoard(): NewBoard {
  return {...BoardState.setup, ...boardSize()};
}

// What the New project card starts with.
export function lastNewBoard(): NewBoard {
  return rememberedBoard() ?? openBoard();
}

export function rememberNewBoard(board: NewBoard) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  } catch (e) {
    console.error("Failed to save the new project's board to localStorage", e);
  }
}

// The board's entry in a project file: a fresh one, so a stripboard has no cuts yet.
export function savedBoardFor(board: NewBoard): SavedBoard {
  const {type, strips, cols, rows} = board;
  return type === "stripboard" ? {type, cols, rows, strips, cuts: []} : {type, cols, rows};
}

// A project with nothing on this board yet: the New project card's preview.
export function emptyProjectOn(board: NewBoard): ProjectFile {
  return {
    version: 3, board: savedBoardFor(board), pads: [], wires: [],
    placedIcs: [], placedStandardComponents: [], placedAdvancedComponents: [], customIcs: [],
  };
}

// Changes the open board to this one: its type at once (one undoable step), its size by resizing,
// which asks first if anything would fall off the edge. For the empty board's start card.
export async function changeOpenBoard(board: NewBoard) {
  switchBoard({type: board.type, strips: board.strips});
  const size = boardSize();
  if (board.cols !== size.cols || board.rows !== size.rows) await resizeBoard(board.cols, board.rows);
}
