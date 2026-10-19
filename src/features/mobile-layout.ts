import {Canvas} from "../state/Canvas";
import {ToolState} from "../state/ToolState";
import {Utils} from "../utils/utils";
import {setActiveTool} from "./active-tool";
import {onRedraw} from "./draw-canvas";
import {showWholeBoard} from "./view-controls";

// The phone layout (style.css, under the same media query, which also takes touch tablets and
// phones held sideways): the board fills the screen, a toolbar along the bottom (#mobileNav) holds
// Select, Wire, Add, Nets and More, and the sidebars become sheets that slide up over the board, one
// at a time. Add and More are both the left sidebar (#controls): Add shows only the parts catalog,
// More the rest (tools, board, wire style); the stylesheet hides the other half by its data-view.

const phone = matchMedia("(max-width: 768px), (pointer: coarse) and (max-width: 1024px), (pointer: coarse) and (max-height: 500px)");
const nav = Utils.getSafeHtmlElement("mobileNav");
const backdrop = Utils.getSafeHtmlElement("sheetBackdrop");
const controls = Utils.getSafeHtmlElement("controls");
const nets = Utils.getSafeHtmlElement("shortcutsPanel");
const controlsTitle = Utils.getSafeHtmlElement("controlsSheetTitle");

type Sheet = "add" | "more" | "nets";
const CONTROLS_TITLES: Record<string, string> = {add: "Add a part", more: "Tools & board"};

let openSheet: Sheet | undefined;

function setOpenSheet(sheet: Sheet | undefined) {
  openSheet = sheet;
  if (sheet === "add" || sheet === "more") {
    controls.dataset.view = sheet;
    controlsTitle.textContent = CONTROLS_TITLES[sheet];
    controls.scrollTop = 0;
  }
  controls.classList.toggle("sheet-open", sheet === "add" || sheet === "more");
  nets.classList.toggle("sheet-open", sheet === "nets");
  nav.querySelectorAll<HTMLElement>("[data-sheet]").forEach(btn => {
    btn.classList.toggle("active-mode", btn.dataset.sheet === sheet);
  });
  backdrop.hidden = sheet === undefined;
}

nav.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>("button");
  if (!btn) return;
  const {sheet, tool} = btn.dataset;
  if (sheet === "add" || sheet === "more" || sheet === "nets") {
    setOpenSheet(openSheet === sheet ? undefined : sheet);
    return;
  }
  setOpenSheet(undefined);
  if (tool === "wire") {
    setActiveTool(ToolState.active.kind === "wire" ? {kind: "select"} : {kind: "wire"});
  } else if (tool === "select") {
    setActiveTool({kind: "select"});
  }
});

backdrop.addEventListener("click", () => setOpenSheet(undefined));
document.querySelectorAll("[data-close-sheet]").forEach(btn => {
  btn.addEventListener("click", () => setOpenSheet(undefined));
});

// Picking a tool or a part in a sheet closes it, so the next tap lands on the board.
controls.addEventListener("click", () => {
  const before = ToolState.active;
  setTimeout(() => {
    if (phone.matches && ToolState.active !== before) setOpenSheet(undefined);
  });
}, true);

// On a phone the board's toolbar floats over the board rather than taking a row of its own.
const statusBar = Utils.getSafeHtmlElement("boardBar");
const boardStage = Utils.getSafeHtmlElement("boardStage");
const viewport = Utils.getSafeHtmlElement("canvasViewportSection");

function placeBoardBar() {
  if (phone.matches) {
    boardStage.prepend(statusBar);
  } else {
    viewport.prepend(statusBar);
  }
}

placeBoardBar();
phone.addEventListener("change", () => {
  setOpenSheet(undefined);
  placeBoardBar();
});

// A phone shows the whole board whenever a different-sized one is opened (at startup too), rather
// than the desktop's 100%, which is wider than the screen.
let fittedSize = "";
onRedraw(() => {
  const size = `${Canvas.gridWidth}x${Canvas.gridHeight}`;
  if (!phone.matches || size === fittedSize) return;
  fittedSize = size;
  requestAnimationFrame(showWholeBoard);
});

// Its hint is about hovering, which a finger can't do; a tap fills it in.
if (phone.matches) Utils.getSafeHtmlElement("dotDescription").textContent = "";
