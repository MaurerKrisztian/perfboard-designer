import {createStore} from "../lib/store";
import {readStored, writeStored} from "../lib/local-storage";
import {fitToScreen, resetZoom} from "../../features/zoom";

// How the editor's page is laid out, beyond the board itself: whether the tools sidebar (left) and
// the nets sidebar (right) show (View menu, remembered between visits), focus mode (the board
// alone, filling the window), and on a phone which sheet is slid up over the board.

export type Sheet = "add" | "more" | "nets";
export type Sidebar = "tools" | "nets";

interface Layout {
  sidebars: Record<Sidebar, boolean>;
  focusMode: boolean;
  sheet?: Sheet;
  // Which half of the tools sidebar its sheet shows: the one opened last, kept while it slides away.
  controlsView?: "add" | "more";
}

const STORAGE_KEYS: Record<Sidebar, string> = {tools: "show_tools_sidebar", nets: "show_shortcuts_panel"};

export const layoutStore = createStore<Layout>({
  sidebars: {
    tools: readStored(STORAGE_KEYS.tools, true, raw => raw !== "false"),
    nets: readStored(STORAGE_KEYS.nets, true, raw => raw !== "false"),
  },
  focusMode: false,
});

// Fits the board again once the layout around it has settled.
function refitSoon(delay: number) {
  setTimeout(() => fitToScreen(true), delay);
}

export function toggleSidebar(sidebar: Sidebar) {
  const show = !layoutStore.get().sidebars[sidebar];
  layoutStore.set(state => ({sidebars: {...state.sidebars, [sidebar]: show}}));
  writeStored(STORAGE_KEYS[sidebar], String(show));
  refitSoon(80);
}

// Focus mode fits the whole board in the window; leaving it goes back to 100%.
export function setFocusMode(on: boolean) {
  if (layoutStore.get().focusMode === on) return;
  layoutStore.set({focusMode: on});
  if (on) refitSoon(50);
  else resetZoom();
}

export function toggleFocusMode() {
  setFocusMode(!layoutStore.get().focusMode);
}

export function setSheet(sheet: Sheet | undefined) {
  layoutStore.set(sheet === "add" || sheet === "more" ? {sheet, controlsView: sheet} : {sheet});
}

// A bottom toolbar button opens its sheet, or closes it when it's open already.
export function toggleSheet(sheet: Sheet) {
  setSheet(layoutStore.get().sheet === sheet ? undefined : sheet);
}
