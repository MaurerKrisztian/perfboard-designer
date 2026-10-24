import {Canvas} from "../state/Canvas";
import {DotState} from "../state/DotState";
import {ProjectState} from "../state/ProjectState";
import {SelectionState} from "../state/SelectionState";
import {ToolState} from "../state/ToolState";
import {ViewState} from "../state/ViewState";
import {GridPos, gridToPx, toGridPos} from "../project-file/grid";
import {computeNets, pinId, pinName} from "../project-file/nets";
import {PartPins, partPins} from "../project-file/pin-positions";
import {ProjectFile, SavedWire} from "../project-file/project-file";
import {openQuestion, QuestionKind} from "./ask-dialog";
import {editorVersion, subscribeEditor} from "./editor-events";
import {saveNow} from "./project/current-project";
import {getSaveJson} from "./project/save-project";

// window.__perfboard: what the editor holds, for a person or a coding agent driving it in a
// browser, without reading pixels or digging through localStorage. On the dev server only
// (startEditor installs it). It only reads: changes go through the page, as a user's do. How to
// use it: docs/testing-with-agents.md.

export interface TestHandle {
  // The board as autosave would write it.
  project(): ProjectFile;
  // The stored project the board is, as the header shows it.
  projectName(): string | undefined;
  // Every placed part with its pins' holes.
  parts(): {ref: string; part: string; pins: {pin: number; label?: string; at: GridPos}[]}[];
  // Every net, as the Nets panel works it out: one with a single pin is an unconnected pin, one
  // with none is wires that connect no pins.
  nets(): {name?: string; pins: string[]; wires: number[]}[];
  // What's selected: a pad, a wire (by its ends), a part (by its ref), or several parts and wires.
  selection(): {kind: "pad"; at: GridPos} | {kind: "wire"; from: GridPos; to: GridPos} | {kind: "part"; ref: string}
    | {kind: "many"; parts: string[]; wires: {from: GridPos; to: GridPos}[]} | null;
  // Select more (the selection bar's toggle): clicks and taps add to the selection.
  addingToSelection(): boolean;
  // The hole under the pointer and the readout under the board.
  hover(): {at?: GridPos; text?: string};
  // The active tool: "select", "wire", "solder", "eraser", "note", "cut", or a part being placed.
  tool(): string;
  view(): {zoom: number; fit: boolean; solderSide: boolean; labels: boolean};
  // The editor's question or notice on screen (src/features/ask-dialog.ts), if any.
  dialog(): {kind: QuestionKind; title: string; message?: string} | null;
  // Where to click or tap to hit hole [col, row], in page (client) pixels. Component side: the
  // solder side view is mirrored, and only pans and zooms anyway.
  holeToScreen(col: number, row: number): {x: number; y: number};
  // The whole board in a few lines of text: its size, parts, wires and nets.
  describe(): string;
  // Counts the editor's changes: compare two readings to tell whether anything happened.
  version(): number;
  // Waits until the editor has been quiet for `quietMs` and the UI has caught up, then writes the
  // autosave, so what the page shows and localStorage hold are both up to date.
  settled(quietMs?: number): Promise<void>;
}

declare global {
  interface Window {
    __perfboard?: TestHandle;
  }
}

const hole = (at: GridPos) => `[${at[0]},${at[1]}]`;

function nets(project: ProjectFile) {
  return computeNets(project).nets.map(net => ({...(net.name ? {name: net.name} : {}), pins: net.pins.map(pinId), wires: net.wires}));
}

function selection(): ReturnType<TestHandle["selection"]> {
  const selected = SelectionState.current;
  if (!selected) return null;
  if (selected.kind === "dot") return {kind: "pad", at: toGridPos(selected.dot)};
  if (selected.kind === "line") return {kind: "wire", from: toGridPos(selected.line.start), to: toGridPos(selected.line.end)};
  if (selected.kind === "many") {
    return {
      kind: "many",
      parts: selected.parts.map(part => part.ref),
      wires: selected.lines.map(line => ({from: toGridPos(line.start), to: toGridPos(line.end)})),
    };
  }
  return {kind: "part", ref: selected.part.ref};
}

function holeToScreen(col: number, row: number) {
  const rect = Canvas.c.getBoundingClientRect();
  return {
    x: rect.left + gridToPx(col) * rect.width / Canvas.gridWidth,
    y: rect.top + gridToPx(row) * rect.height / Canvas.gridHeight,
  };
}

// "U1 NE555 Timer: 1 GND [6,4], 2 TRIG [6,5]…", its pins named as the nets name them.
function partLine({ref, kind, part, pins}: PartPins): string {
  const named = pins.map(({pin, label, at}) => `${pinName({ref, kind, pin, label, at}).slice(ref.length + 1)} ${hole(at)}`);
  return `  ${ref} ${part}: ${named.join(", ")}`;
}

function wireLine(wire: SavedWire, index: number): string {
  const via = wire.via?.length ? ` via ${wire.via.map(hole).join(" ")}` : "";
  return `  ${index}: ${wire.kind === "solder" ? "solder " : ""}${hole(wire.from)} → ${hole(wire.to)}${via}`;
}

function describe(): string {
  const project = getSaveJson();
  const {board} = project;
  const parts = partPins(project);
  const netList = nets(project);
  const connected = netList.filter(net => net.pins.length > 1);
  const unconnected = netList.filter(net => net.pins.length === 1).map(net => net.pins[0]);
  return [
    `"${ProjectState.current?.name ?? "(not saved)"}": ${board.type} ${board.cols}×${board.rows}` +
      (board.type === "stripboard" ? `, ${board.strips} strips, cuts at ${board.cuts.map(hole).join(" ") || "none"}` : ""),
    `Parts (${parts.length}):`,
    ...parts.map(partLine),
    `Wires (${project.wires.length}):`,
    ...project.wires.map(wireLine),
    `Nets (${connected.length}):`,
    ...connected.map(net => `  ${net.name ?? "-"}: ${net.pins.join(" ")}`),
    `Not connected: ${unconnected.join(" ") || "none"}`,
    `Notes: ${project.pads.map(pad => `${hole(pad.at)} "${pad.note}"`).join(" ") || "none"}`,
  ].join("\n");
}

function settled(quietMs = 150): Promise<void> {
  return new Promise(resolve => {
    let timer = window.setTimeout(done, quietMs);
    const unsubscribe = subscribeEditor(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(done, quietMs);
    });
    function done() {
      unsubscribe();
      saveNow();
      // React shows a change in the next frame.
      requestAnimationFrame(() => resolve());
    }
  });
}

export function installTestHandle() {
  window.__perfboard = {
    project: getSaveJson,
    projectName: () => ProjectState.current?.name,
    parts: () => partPins(getSaveJson()).map(({ref, part, pins}) => ({ref, part, pins})),
    nets: () => nets(getSaveJson()),
    selection,
    addingToSelection: () => SelectionState.adding,
    hover: () => ({
      ...(DotState.hoverDot ? {at: toGridPos(DotState.hoverDot)} : {}),
      ...(ViewState.hoverText ? {text: ViewState.hoverText} : {}),
    }),
    tool: () => ToolState.active.kind,
    view: () => ({zoom: ViewState.zoom, fit: ViewState.fitMode, solderSide: ViewState.solderSide, labels: ViewState.showPartLabels}),
    dialog: () => {
      const question = openQuestion();
      return question ? {kind: question.kind, title: question.title, ...(question.message ? {message: question.message} : {})} : null;
    },
    holeToScreen,
    describe,
    version: editorVersion,
    settled,
  };
}
