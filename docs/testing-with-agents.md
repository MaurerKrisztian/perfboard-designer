# Testing the editor with a coding agent

There's no test suite here on purpose (see CLAUDE.md): changes are checked by using the editor in a
real browser. This page is for a coding agent doing that: how to start the editor, put a known board
on it, wait for it, drive it, and read back what it holds, without guessing from pixels.

Keep any scripts you write for this outside the repo (in a temp folder): the repo takes no test
tooling.

## Start it

```bash
npm run start                              # http://localhost:3000/app/ (/ is the landing page)
npx vite --port 3020 --strictPort          # a second dev server beside the user's own
PERFBOARD_PROJECTS_URL=off npm run start   # short links off: nothing reaches the public storage
```

Short links against a local copy of the storage Worker: `cd mcp && npm run worker:dev` (it listens on
http://localhost:8787), then `PERFBOARD_PROJECTS_URL=http://localhost:8787 npm run start`.

A production build: `npm run build && npm run serve`. It has no `window.__perfboard` (below); the
ready signal works in both.

## Put a board on it

Open the editor with the board in the link: `/app/#name=<name>&json=<percent-encoded project file>`.
`json` must come last. The editor opens it as a new stored project (a copy), so nothing else changes.
In Node:

```js
const file = JSON.parse(fs.readFileSync("examples/perfboard-555-blinker.json", "utf8"));
const url = `http://localhost:3000/app/#name=Blinker&json=${encodeURIComponent(JSON.stringify(file))}`;
```

A fresh browser profile starts with empty storage, and so with an empty untitled board. Link
formats in full: docs/share-links.md.

The examples, as the editor reads them (nets join two or more pins, as the Nets panel counts them;
"unconnected" counts lone pins):

| `examples/` | Board | Parts | Wires | Nets | Unconnected pins |
|---|---|---|---|---|---|
| `perfboard-555-blinker.json` | perfboard 14×12 | 8 | 29 | 7 | 0 |
| `stripboard-555-blinker.json` | stripboard 20×12 | 9 | 5 | 7 | 0 |
| `3d-showcase.json` | perfboard 36×24 | 25 | 58 | 14 | 84 |
| `component-gallery.json` | perfboard 60×46 | 70 | 36 | 1 | 294 |
| `new-components-batteries.json` | perfboard 38×26 | 3 | 0 | 0 | 6 |
| `new-components-connectors.json` | perfboard 30×21 | 12 | 4 | 0 | 40 |
| `new-components-dip-chips.json` | perfboard 34×25 | 14 | 0 | 0 | 152 |
| `new-components-displays-leds.json` | perfboard 37×23 | 9 | 0 | 0 | 76 |
| `new-components-passives-sensors.json` | perfboard 33×18 | 13 | 0 | 0 | 40 |
| `new-components-switches.json` | perfboard 30×19 | 10 | 0 | 0 | 59 |

The perfboard blinker's nets: GND (C1.- C2.2 D1.K J1.2 U1.1), VCC (J1.1 R1.1 U1.4 U1.8),
TRIG/THRESH (C1.+ R2.2 U1.2 U1.6), CTRL (C2.1 U1.5), DISCH (R1.2 R2.1 U1.7), OUT (R3.1 U1.3) and
D1.A–R3.2. If one of these numbers changes, something changed how boards are read or connected.

## Wait for it

- **Started**: `document.documentElement.dataset.editorReady === "true"`, once the editor has opened
  its project (and a linked one). On the dev server, `window.__perfboard` is there by then too.
  Until the editor shows, `#appLoading` says "Loading the editor…"; if its script didn't arrive or
  failed before showing anything, it says so instead (`app/index.html`).
- **Settled** after an action: `await __perfboard.settled()`. It waits until the editor has been
  quiet for 150 ms (the nets refresh 100 ms after a change) and the UI has caught up, then writes the
  autosave, so the page and localStorage both hold the result. Don't sleep for a guessed time.

## Read it: `window.__perfboard` (dev server only)

`src/features/test-handle.ts`. It only reads; change things through the page, as a user would.

| Call | Gives |
|---|---|
| `project()` | The board as autosave writes it (the project file format, `src/project-file/project-file.ts`). |
| `projectName()` | The open project's name, as the header shows it. |
| `parts()` | Each part: `ref`, `part` (catalog id or chip name), `pins` with their holes. |
| `nets()` | Each net: `name`, `pins` (`"U1.8"`, `"D1.K"`), `wires` (indexes into `project().wires`). One pin: an unconnected pin. |
| `selection()` | `{kind: "pad", at}`, `{kind: "wire", from, to}`, `{kind: "part", ref}`, `{kind: "many", parts: [refs], wires: [{from, to}]}` (several parts and wires) or `null`. |
| `addingToSelection()` | Whether Select more is on, so clicks and taps add to the selection. |
| `hover()` | The hole under the pointer (`at`) and the readout along the board's foot (`text`). |
| `tool()` | `"select"`, `"wire"`, `"solder"`, `"eraser"`, `"note"`, `"cut"`, or the kind of part being placed. |
| `view()` | `zoom`, `fit`, `solderSide`, `labels`. |
| `dialog()` | The question or notice showing (`kind` `"text"`, `"confirm"` or `"notice"`, `title`, `message`), or `null`. |
| `holeToScreen(col, row)` | `{x, y}` in page pixels: where to click or tap to hit that hole. |
| `describe()` | The whole board as text: size, parts and their pins, wires, nets, notes. Read this instead of a screenshot. |
| `version()` | A count of the editor's changes: two equal readings mean nothing happened in between. |
| `settled(quietMs?)` | See above. |

Holes are `[col, row]` from the top-left hole, counting from 0, as in project files and the MCP
server. The board's edge labels count rows from A and columns from 1, so `[2, 0]` is A3.

## Drive it

Send real input events (a browser tool's click, or CDP `Input.dispatch…Event`), not `element.click()`
on the canvas: the board listens to pointer events.

- **Mouse**: in the Select tool, clicking a part's body selects it, clicking a hole selects the pad,
  and dragging from a hole to another draws a wire. Aim with `holeToScreen`; for a two-lead part's
  body, aim halfway between its leads.
- **Keys**: the board's shortcuts listen on `window` (list: the Keyboard Shortcuts panel, or
  `src/features/keyboard-shortcuts.ts`): `w` wire tool, `s` solder path, `r` rotate, `Delete`, `/`
  search parts, `ctrl+z`/`ctrl+y`. While a dialog is open, they're off. If typing `/` through a
  browser tool does nothing, send a keydown event for it instead.
- **Phone layout**: emulate a phone, e.g. 390×844, mobile, with touch (CDP
  `Emulation.setDeviceMetricsOverride` and `Emulation.setTouchEmulationEnabled`), and use touch
  events (`Input.dispatchTouchEvent`). A long press is 500 ms (`board-touch.ts`): long press and drag
  from a hole to draw a wire, or long press a part for its menu. The wire's L bends the way the
  finger first went; a second finger's tap flips it. With CDP, a `touchMove` that leaves a finger out
  lifts that finger, while `touchEnd` lifts them all.
- **Dialogs**: the editor's dialogs are ordinary page elements, never the browser's `alert()` or
  `confirm()`. `__perfboard.dialog()` says which question or notice is showing; Escape or its
  buttons answer it.

Page elements worth reading: `#activeSelectionStatus` (the status above the board: what's selected,
or what the tool does), `.status-hints` (its hints, along the board's foot; on a phone they're in the
status), `#currentProjectBtn` (project name), `#netsCount`, `#dotDescription` (the readout along the
board's foot), `.rail-btn.is-active` (the tool rail's active tool),
`#contextMenu`, `#selectionBar .selection-bar-label`, `#zoomLevelText`, `#mobileNav .active-mode`,
`#open3dViewBtn`, and the 3D view's `.viewer3d-canvas-host canvas`.

Storage: `current-project` holds the open project's id, `project:<id>` its file and
`project-meta:<id>` its name.

## Check a board with the MCP server

The MCP server reads the same project files, so it can judge a board the editor made: pass
`__perfboard.project()` to `validate_project` (problems, with where they are), `get_nets`, or
`render_board` (a text drawing, or a PNG). The hosted server is at
https://projects.perfboarddesigner.com/mcp; a local one is `cd mcp && npm run build && npm start`
(stdio), or `npm run inspect` to call tools by hand.

## Pitfalls

- The editor is at `/app/`, not `/`.
- An empty board shows a start card over its middle (`.empty-board-card`), which takes clicks there:
  open a board by link first, or dismiss it with its ✕.
- A git worktree whose `node_modules` links to this repo's shares Vite's dependency cache
  (`node_modules/.vite`): two dev servers on one cache break each other's dependencies (504
  "Outdated Optimize Dep"). Run one at a time, or give the worktree its own `npm install`.
- The 3D view needs WebGL. Headless Chrome has it with `--use-angle=swiftshader
  --enable-unsafe-swiftshader`; the browser pane in the Claude desktop app has none.
- After a deploy, a browser may still hold the old `app/index.html` for a few minutes, pointing at
  scripts the deploy removed. The page then says it couldn't load the editor: reload before judging
  a deploy.
