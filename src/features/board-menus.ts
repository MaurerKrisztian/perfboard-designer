import {IDot} from "../interfaces/dot.interface";
import {notifyEditorChanged} from "./editor-events";

// The board's popup menus: the context menu (a right click, or a finger's long press), which acts
// on what it was opened on, and the LED colour menu its Change Color opens for an LED. The board
// input (select.ts, board-touch.ts) opens them; the React UI draws them
// (src/ui/board/BoardMenus.tsx). One at a time, at a point on screen (client px).

export type BoardMenu =
  // `hole`: the hole it was opened on, for Start Wire Here.
  | {kind: "actions"; x: number; y: number; hole?: IDot}
  | {kind: "led-colors"; x: number; y: number};

let open: BoardMenu | undefined;

export function openBoardMenu(): BoardMenu | undefined {
  return open;
}

export function showBoardMenu(menu: BoardMenu) {
  open = menu;
  notifyEditorChanged();
}

export function hideBoardMenus() {
  if (!open) return;
  open = undefined;
  notifyEditorChanged();
}
