# Architecture

How Perfboard Designer is put together, and how to extend it. This is the guide for people working
on the code; `CLAUDE.md` is the shorter brief for AI agents and links here. When a change makes a
section wrong, fix the section in the same change.

## Requirements

Version 7 adds an optional `instanceId` to each placed part
(`src/project-file/component-ids.ts`). It never raises a file's version: older readers skip it,
and identities only matter to requirements, which are version 8. The reader gives legacy parts deterministic IDs; new
browser/MCP parts receive UUIDs. Constructors give duplicates fresh IDs, loading restores IDs,
and serialization preserves them. IDs are project-scoped. A top-level `schematic` field written
by older editors is ignored on load and not saved again.

Version 9 adds a jumper's optional `side: "bottom"` (the solder side; absent is the top), the
only thing that raises a file to 9 on its own. Version 8 adds optional independent `requirements`, defined and checked by
`src/project-file/requirements.ts`. Required nets and explicitly unused pins reference stable
component IDs plus numeric pins. Component/pin snapshots retain missing-item diagnostics;
board edits never overwrite intended connections. The reader rejects malformed/overlapping
assignments rather than silently discarding constraints. An unassigned terminal is unchecked,
not implicitly disconnected. Only complete coverage with no mismatches reports a match.

The editor keeps the open project's requirements in `RequirementsState`. They're optional: a
project has none until the user adds a net, copies in the board's wiring, or they come from a
project file, share link or MCP edit. The Nets panel's Required connections
(`src/ui/nets/RequirementsCard.tsx`) is folded away until wanted. It lists each required net
from `requiredNetReports()`, ticked once the board joins its pins, with the shared comparator's
other problems (unexpected joins, parts gone from the board, which Forget drops) above them.
Adding or changing a net arms the `required-net` tool (`src/features/tools/required-net-tool.ts`):
clicking a pin picks it or takes it back out, the picked pins light up on the board
(`editor-view.ts`), Enter or the bar over the board (`RequiredNetBar.tsx`) saves them through
`setRequiredNet()` (a pin picked from another net moves out of it), and Escape drops them.
`src/features/required-nets.ts` makes every change, a deleted net or the whole list removed
too, one undoable `set`. `requirementPinName()` names pins as nets do ("D1.K"), so the
comparator's messages match the chips.
`RequirementsCard.tsx` renders the shared comparator in the Nets sidebar, and
`requirement-highlight.ts` gives multi-net diagnostics stable-identity highlights. Physical board
wiring remains authoritative for actual connectivity, including strip copper. `placePart()`
extends an existing requirement inventory and records the part plus requirement change as one
undoable batch. Deletion retains requirements for missing-item reports and undo. New projects
clear requirements; resize and copies preserve them. MCP edits retain constraints and extend
inventory; validation compares saved requirements only when enabled. Existing `expectNets`
behavior remains unchanged. The browser, MCP and hosted reader must be released with version-8
support together.

Contents:

1. [Overview](#1-overview)
2. [Map of the code](#2-map-of-the-code)
3. [Editor runtime](#3-editor-runtime)
4. [Tools](#4-tools)
5. [Parts and the catalog](#5-parts-and-the-catalog)
6. [Board types](#6-board-types)
7. [Undo and redo](#7-undo-and-redo)
8. [Project file and persistence](#8-project-file-and-persistence)
9. [Connectivity: nets and wire crossings](#9-connectivity-nets-and-wire-crossings)
10. [Rendering](#10-rendering)
11. [3D viewer](#11-3d-viewer)
12. [MCP server](#12-mcp-server)
13. [Conventions](#13-conventions)

---

## 1. Overview

Perfboard Designer is a browser CAD tool for laying out parts and wires on a perfboard or
stripboard. It's TypeScript: a React UI over an editor core that draws the board on an HTML5
canvas, with no state library. It's built
with Vite as a multi-page site (inputs listed in `vite.config.ts`) and published to GitHub Pages
at https://perfboarddesigner.com.

| Page | Source | What it is |
| --- | --- | --- |
| `/` | `index.html`, `src/landing/` | Static landing page (SEO), JS-free but for the consent banner. |
| `/app/` | `app/index.html`, `src/ui/main.tsx` | The editor: everything below. |
| `/guide/` | `guide/index.html`, `src/guide/` | Static user guide (SEO), JS-free but for the consent banner: how to use the editor, feature by feature. Reuses the landing's styles. Keep it in step with the editor when a feature changes how it's used. Linked from the editor's Help menu. |
| `/contributors/` | `contributors/index.html`, `src/contributors/` | Contributors, live from the GitHub API. Imports nothing from the editor. |
| `/mcp-server/` | `mcp-server/index.html`, `src/mcp-page/` | How to connect AI agents to the hosted MCP server. Keep its steps in step with `mcp/README.md`. |
| 404 | `assets/404.html` | GitHub Pages' not-found page, fully self-contained. |

Every page loads `assets/consent.js` with a plain script tag at the top of its head (`/consent.js`
on the 404 page): Google Analytics behind a consent banner. Nothing loads from Google, and no
cookie is set, until the visitor accepts (Consent Mode's basic setup); the choice is kept in
localStorage (`analytics_consent`) for the whole site, and anything with a `data-consent-settings`
attribute reopens the banner: the footers' Cookie settings, and the editor's Help › Cookie
Settings (`src/ui/lib/consent-settings.ts`). It reports each page without its `#fragment`, where
the editor's share links carry a whole board. A new page loads it too.

`assets/` is Vite's publicDir: served from the site root, so from the editor the part icons are
`../icons/components/…`. **Keep in-site URLs relative** (never `/…`), so the site also works under
the github.io subfolder `/perfboard-designer/`. Only SEO tags (canonical, og:*, sitemap) and the
404 page use absolute or root-based URLs.

```bash
npm install          # dependencies
npm run start        # dev server: http://localhost:3000 (landing), /app/ is the editor
npm run build        # production build to dist/
npm run lint         # eslint ./src
npm run format       # prettier
npm run deploy       # build + publish to GitHub Pages
```

There are no automated tests: changes are checked by hand in the browser (section 13).

## 2. Map of the code

```
src/
  ui/                  the editor's React UI (section 3): every panel, menu and dialog
    main.tsx, App.tsx  the entrypoint and the page's layout
    header/, sidebar/, catalog/, board/, nets/, dialogs/, mobile/   components by area
    components/, hooks/, lib/   shared components (Modal, Icon…), hooks (useEditor…), helpers
  state/               the editor core's state, as static fields on plain classes (the "stores")
  interfaces/          shared editor types: dots, lines, placed parts, undo changes
  features/            the editor core: one concern per module, as plain functions
    editor.ts          the core's entry points: attachBoard(), startEditor()
    test-handle.ts     window.__perfboard on the dev server: the board's state, for testing in a browser
    tools/             what a click on the board does, one behaviour per tool
    standard-components/, advanced-components/   the placed-part classes of the two part systems
    catalog/           recently used parts, catalog keys, "the catalog changed"
    project/           save/load, local projects, share links, export, undo/redo
    board-canvas/      the editor's side of drawing: canvas painter, icons, what to mark
  parts/               PURE: part definitions, categories, values, and where a placed part's pins and body are
  project-file/        PURE: the project file format, its reader, pins, nets, rails and polarity, crossings, share links
  board-render/        PURE: draws a board from a project file onto any Painter
  viewer-3d/           read-only three.js view of a project file (lazy-loaded)
  landing/, contributors/, mcp-page/   the other pages' own code
mcp/                   separate npm package: the MCP server (stdio and Cloudflare Worker)
docs/                  share-links.md (the link format for outside writers), component-footprints.md
examples/              project files; double as compatibility fixtures and MCP examples
assets/                static files served from the site root (icons, 404 page, CNAME…)
```

**Pure** means: no DOM, no editor state, nothing imported that has either. Pure code is shared by
the editor, the 3D viewer and the MCP server (which runs it on Node and Cloudflare Workers), which
is why the rule is strict.

The code is in layers, and each imports only the layers below it:

```
┌───────────────────────────────────────────────────────────────────────────────┐
│  src/ui/              the editor's React UI                                   │  UI
├───────────────────────────────────────────────────────────────────────────────┤
│  editor core (src/features, src/state…)  src/viewer-3d/  mcp/ (via editor.ts) │  apps
├───────────────────────────────────────────────────────────────────────────────┤
│  src/board-render/    draws a board from a project file                       │  pure
├───────────────────────────────────────────────────────────────────────────────┤
│  src/project-file/    the file: format, reader, pins, nets, crossings, links  │  pure
├───────────────────────────────────────────────────────────────────────────────┤
│  src/parts/           part definitions, categories, values, part geometry     │  pure
└───────────────────────────────────────────────────────────────────────────────┘
```

- **`src/parts/`** imports nothing outside itself: the definitions of every part
  (`component-definitions.ts`, `advanced-component-definitions.ts`, `ic-definitions.ts`), the
  catalog's categories, value parsing and colour codes, `rotate-offset.ts`, `ic-package.ts` (chip
  or dev board?), and **`part-geometry.ts`**: where a placed part's pins, covered holes and body
  are, in grid units. That one module is the only place this is worked out (section 5).
- **`src/project-file/`** imports `src/parts/`.
- **`src/board-render/`** imports both, and outside code uses it through its `index.ts` only.
- **The 3D viewer** reads project files and the pure layers, never the editor's state.
- **The editor never imports from `mcp/`**, and doesn't know it exists.
- **The editor core never imports `src/ui/`**: the UI reads the core and calls it, never the
  other way round, so the core works (and could be driven) without React.

ESLint enforces all of this (`.eslintrc.cjs`). An import that crosses a layer the wrong way, or a
browser global (`document`, `Path2D`…) in a pure layer, fails `npm run lint` with a message saying
which rule it broke.

## 3. Editor runtime

The editor is two layers: a **core** (`src/features/`, `src/state/`), which owns the editor's
state and behaviour, draws the board on its canvas and takes the board's input, and a **React UI**
(`src/ui/`) that renders everything else from that state and calls the core to act.

**Startup.** `app/index.html` is just a `#root` element; `src/ui/main.tsx` renders `<App/>` into
it. `BoardCanvas` hands the core its canvas and scrolling viewport with `attachBoard()`, then
`App` calls `startEditor()` (both in `src/features/editor.ts`) once: the keyboard shortcuts, the
first grid, reopening the last project, opening a share link the page came with. Then it marks the
page `data-editor-ready`, and on the dev server installs `window.__perfboard`
(`test-handle.ts`, left out of builds by the `__DEV_SERVER__` constant; see
docs/testing-with-agents.md). Nothing in the core attaches a listener at import: a module that
listens does it in an `attach…`, `start…`, `listenFor…` or `track…` function that `editor.ts` calls.

**How the UI follows the core.** The core calls `notifyEditorChanged()`
(`src/features/editor-events.ts`) after any change the UI may show; every `redrawCanvas()` does,
and so do the few changes that don't redraw (a question asked, a project renamed). A component
reads core state with `useEditor(select)` (`src/ui/hooks/use-editor.ts`, on React's
`useSyncExternalStore`): `select` runs again after each change, and the component re-renders only
when what it returns differs. The core changes its objects in place, so `select` returns a
primitive, an object the core replaces when it changes (`ToolState.active`, `BoardState.setup`),
or a fresh array compared with `shallowEqual`:

```tsx
const tool = useEditor(() => ToolState.active.kind);           // re-renders when the tool changes
const actions = useEditor(availableActions, shallowEqual);       // a new array each time: compare items
```

To act, a component calls a core function (`setActiveTool()`, `undo()`, `switchBoard()`…), which
changes the state and redraws; the UI follows by itself.

**UI-only state**, which the core has no business knowing (the open dialog, which sidebars show,
focus mode, the phone's open sheet), lives in small stores (`createStore`/`useStore`,
`src/ui/lib/store.ts`): `src/ui/dialogs/dialog-store.ts` and `src/ui/layout/layout-store.ts`.

**The UI's layout.** Function components, one per file, grouped by where they sit: `header/`
(menus, the project name), `sidebar/` (the tool rail, and the left panel's Wire and Board
sections; the tool modes as a row for the phone), `catalog/` (the left panel's Parts section),
`board/` (the board's toolbar, canvas, selection bar, menus, the status and its text, the hover
readout, the empty board's start card), `nets/` (nets, requirements, shortcuts legend), `dialogs/`,
`mobile/`. `components/` holds the shared pieces (`Modal`, `Icon`,
`SegmentedControl`, `NumberField`, `BoardSetupFields`), `hooks/` the shared hooks, `lib/` small helpers. Components
use the class names in `src/style.css`; there's no CSS-in-JS.

**The look.** The editor is made of a circuit board's materials: soldermask green-black surfaces
(`--ink-0` the page and the board's stage, `--ink-1` panels, `--ink-2`/`--ink-3` controls), hairlines
(`--line`), silkscreen-white text (`--silk`, `--silk-dim`, `--silk-faint`), and copper for whatever
is active or primary (`--copper`, `--copper-hi`, `--copper-wash`), all tokens at the top of
`src/style.css`. The typeface is Barlow. The page is full-height panels separated by hairlines: the
tool rail, the left panel (Parts, Wire, Board), the board's stage (toolbar, the board on a dotted
bench, the foot with the status's hints and the hover readout) and the nets panel; each scrolls on
its own, and below 960px wide the page scrolls instead, the nets under the board.

> **Extend: add a feature.** Write what it does as functions in `src/features/` (state in
> `src/state/` if it needs some), ending in `redrawCanvas()` when it changes what's on screen. Then
> a component in `src/ui/` that reads what it needs with `useEditor` and calls those functions. A
> keyboard shortcut goes in `src/features/keyboard-shortcuts.ts`, or `useShortcut()` for one that
> belongs to a control. A dialog is a `Modal` and an `OpenDialog` kind in `dialog-store.ts`.

**State** (`src/state/`) is plain classes used as singletons: `ClassName.staticField` *is* the
store, and no instances are made.

| Class | Holds |
| --- | --- |
| `Canvas` | the board's canvas and scrolling viewport (from `attachBoard`), its 2D context, `toDrawingCoordinates(e)` |
| `GridConfig` | grid constants (hole pitch 50 px, hit radii) |
| `DotState`, `LineState` | every hole (`IDot`) and wire (`ILine`), plus what's hovered |
| `PartState` | every placed part, in one list grouped by kind (section 5) |
| `BoardState` | perfboard or stripboard, and the strip direction |
| `SelectionState` | the selected hole, wire *or* part, or several parts and wires (a discriminated union), and whether Select more is on |
| `ToolState` | the active tool: a toolbar mode or a placement tool (a discriminated union) |
| `ViewState` | zoom and Fit, labels on/off, the solder side, what's under the pointer |
| `NetHighlightState`, `HistoryState`, `ProjectState`, `DragState` | the lit-up net, undo stack, open project, drag in progress |

The two unions keep things apart by construction: one tool, and one selection, which is a single
hole, wire or part, or else `many` parts and wires (never a hole among them).
`SelectionState.select(parts, lines)` keeps that so: one item comes out as `part` or `line`, so
code that acts on one wire or part (`SelectionState.line`, `.part`) never sees a set, and
`.parts`/`.lines` give every selected one either way.

**Questions.** The editor asks for text (a value, a note) and yes/no (a resize that drops parts),
and tells the user things (a link that wouldn't open), with its own dialog: `askText`/`askConfirm`/
`tell` in `src/features/ask-dialog.ts` (which holds the open question; `src/ui/dialogs/AskDialog.tsx`
shows it and answers it), never the browser's `prompt()`/`confirm()`/`alert()`, which some embedding
pages block and which freeze the page until answered. Modules that draw-canvas reaches through
the tool registry redraw with `requestRedraw()` (`redraw-request.ts`) instead of importing it.

**Placing a part** drops back to Select with the new part selected; Shift-click keeps the
placement tool armed (`BoardClick.keepArmed`).

**Tool rail, board toolbar and selection bar.** The tool rail (`src/ui/sidebar/ToolRail.tsx`)
picks what a click on the board does: Select, Erase, Note (Cut on a stripboard), then Wire and
Solder. Above the board, `src/ui/board/BoardToolbar.tsx` holds the status (`StatusBadge.tsx`, its
text from `status-text.ts`, "what [hint • hint]": the toolbar shows what's selected or what the
tool does, in copper while something waits to be placed, and `StatusHints` the hints along the
board's foot; with a cancel button, and a rotate one for chips and fixed-pin parts, while a
placement tool is armed), undo/redo (greyed out when `canUndo()`/
`canRedo()` say there's nothing to do), zoom, Fit, Labels and Focus. Icons are
`<Icon name="…"/>` (`src/ui/components/Icon.tsx`: one SVG sprite, rendered by `App`). What can be
done to the selection lives in `src/ui/board/selection-actions.ts`: the context menu
(`BoardMenus.tsx`, opened by the board's input through the core's `board-menus.ts`) and the
selection bar over the board's bottom edge (`SelectionBar.tsx`) show only the actions
`availableActions()` lists.

**Phone layout.** On a small or touch screen (one media query, shared by the end of `src/style.css`
and `PHONE_QUERY` in `src/ui/hooks/use-media-query.ts`) the board fills the screen and a toolbar
along the bottom (`src/ui/mobile/MobileNav.tsx`) holds Select, Wire, Solder, a round Add, Nets and
More. Add and More are both the left panel as a sheet that slides up (`#controls[data-view]`:
Add shows only the parts, More the tool modes, wire and board), Nets is the right panel;
`layoutStore` says which is open. Nothing may resize the board's area while a finger is on it: the
readout along the board's foot keeps its line when empty, or the board would jump under the
finger. Picking a tool or part in a sheet closes it. The board toolbar
moves over the board (undo/redo top left, Fit and Labels top right, the hint under them only while
a tool other than Select is active). The board is shown whole whenever one of a different size
opens.
Phones are slow to redraw a big canvas and refuse one over about 16.7M pixels (iOS Safari), so on
a touch screen `canvas-sizing.ts` keeps the board's canvas under 12M pixels (drawing it a little
softer past that), and a pinch scales the board as a picture, redrawing it once when the fingers lift.

**Redraw.** Any change that affects the screen ends with `redrawCanvas()`
(`src/features/draw-canvas.ts`), which redraws everything from scratch (section 10).
`onRedraw(listener)` runs after every redraw. That's how autosave, the nets and the solder joint
count notice changes without each edit having to report itself; the UI hears of them through
`notifyEditorChanged()`, which every redraw ends with.

## 4. Tools

`ToolState.active` decides what a left click on the board does: a toolbar mode (`select`,
`eraser`, `note`, `cut`) or a placement tool (`wire`, `solder`, `ic`, `standard-component`,
`advanced-component`) with its pending first click (`start`).

Each kind has a `ToolBehavior` (`src/features/tools/tool.ts`):

- `onPointerDown(tool, click)`: what a click does. Return `false` to fall back to plain selection.
- `drawPreview(tool, hoverDot, painter)`: optional; drawn over the board while the pointer is over a hole.
- `statusText(tool)`: the status badge.
- `stepBack(tool)`: optional; what Escape does inside the tool.

Behaviours are registered in `src/features/tools/index.ts` and found with `behaviorOf(tool)`.
**Tools only change state.** `src/features/select.ts` is the board's input router (it also owns
panning, the context menu and Escape). It calls the tool, then redraws and refreshes the status.
It listens for pointer events from a mouse or pen. Fingers go through `src/features/board-touch.ts`,
which reuses its exported pieces (`clickBoard`, `pressBoard`, the pan, `openContextMenuAt`). A finger
acts when it lifts, so a second finger can still turn the touch into a pinch: a tap clicks, one finger
dragged pans (or moves the part it landed on in Select mode), two fingers pinch-zoom and pan, and a
long press opens the context menu. In Select mode and with the wire tool, a mouse press on a hole
that starts to move draws a wire instead, dashed until it's let go on another hole
(`src/features/wire-drag.ts`, using the wire tool's `placeWire`; with the solder path tool armed
it draws a solder path); a part's pin holes wire too, its body still moves it. The dragged wire is an L with one bend, going first the way the pointer
moved first and straight when the holes line up; `/` flips it (caught in the capture phase, since
`/` is also the components search) and Shift straightens it. A finger's drag always pans (zoomed
in, most of the board is holes): it draws a wire only after a long press, by dragging on once the
context menu is up (a second finger's tap flips the L), or through the menu's Start Wire Here
or Start Solder Path Here (also the selection bar's Wire and Solder for a selected hole), which arms
that tool with that hole as its start.

The wire tool builds a route click by click (`ActiveTool`'s `start` and `via`): a click on an empty
hole adds a bend; a click on a hole the wire would connect to there (`connectsAt()` in
`wire-merge.ts`: a pin, a wire running over or ending in it, or on a stripboard its strip) places
the wire and starts the next one from there. Clicking the last hole again, or Enter
(`ToolBehavior.finish`, called by `select.ts`), ends the wire on an empty hole; Escape
(`stepBack`) takes back a bend, then ends the run.

The solder path tool (`solder`, button beside the wire tool, <kbd>S</kbd>) is the same behaviour
(`routeTool` in `wire-tool.ts`, registered as both `wireTool` and `solderTool`; `RouteTool` and
`isRouteTool()` in `ToolState.ts` name the pair), placing solder paths instead: an `ILine` with
`kind: "solder"`, a trail of solder on the copper side that joins every hole it covers (see
Connectivity). It has no colour or width, so the colour picker and gauge leave a selected one
alone, and the selection bar offers no Color for it. Selecting, reshaping, erasing and undo treat
it like any wire.

A selected wire can be bent by its handles in Select mode (`src/features/wire-reshape.ts`; the
renderer draws a handle on each bend and a dot mid-leg on the selected wire). `wireGripAt()` finds
the handle under a press (an end, a bend, else a leg), and select.ts and board-touch.ts give it
priority over drawing a new wire or panning: dragging a leg pulls out a new bend, dragging a bend
or an end moves it, and `hover.ts` moves it with the pointer (`reshapeTo()`). The wire changes
live; letting go puts it back as it was and sends the new route through the wire tool's
`routeWire()`, the same pipeline placing a wire uses, as one undoable `replace` that keeps the
wire's place in the drawing order. Only a moved end splits wires it lands on or carries on a wire
there. Double-click (or double-tap) on a bend removes it, and the selection bar's Straighten
removes them all. Escape mid-drag puts the wire back. A finger has no hover, so it calls `hoverAt()` (`hover.ts`)
where it lands. A finger held still on a handle opens the context menu as anywhere else, and moving
on from there still bends the wire (board-touch.ts keeps the handle's wire through the menu, which
selects the hole under the finger).
**Selecting several.** In Select mode a press with Shift held is held back in `select.ts`
(`pendingBox`): let go, it's a Shift-click that adds the part or wire there to the selection or
takes it out (`toggleAt()` in `board-selection.ts`); moved, it draws a selection box
(`src/features/box-select.ts`), and everything whose holes all lie inside it (a part's pins and
the holes it covers, a wire's ends and corners: `selectInBox()`) joins what was selected before,
live as the box grows. The redraw draws the box over the board; Escape puts the selection back.
A finger has no Shift, so the selection bar's Select more (`SelectionState.adding`,
`toggleSelectMore()`) makes clicks and taps do the same, and a mouse drag box; picking another
tool, Escape and Deselect turn it off. <kbd>Ctrl</kbd>+<kbd>A</kbd> selects every part and wire.
A press on one of several selected parts (or between the holes of one of their wires,
`selectedLineAt()`) picks them all up: `component-drag.ts` moves every part and wire in
`DragState` by the same step, refusing a step that would push anything off the board, and records
one `batch` of `move`s (a wire's `move` holds its points before and after). Let go without moving,
just that item stays selected, as a click on it would leave it. Wires that aren't selected stay
where they are, as with one part. Delete takes them all off as one `batch`
(`deleteItems()` in `delete-selection.ts`). `src/features/clipboard.ts` copies, cuts, pastes and
duplicates the selected parts and wires: a copy is their project-file entries counted from its
top-left hole, rebuilt by `partFromEntry()`/`lineFromWire()` (`src/features/project/board-entries.ts`,
which loading uses too) and placed by `placeItems()` (`placed-parts.ts`) as new parts with the
lowest free refs and new identities, in one step. A paste goes at the hole under the pointer,
moved back onto the board if it would hang off; Duplicate goes beside the original where there's
room. Keyboard shortcuts may carry `when` (`IShortcut`): Ctrl+C copies the page's selected text, not
the board's selection, when there is some.

Switch tools with `setActiveTool()` (`src/features/active-tool.ts`). `resetInteraction()` clears
the selection (and Select more) and drops a placement tool back to Select.

Keep tool modules free of imports that lead back to `draw-canvas.ts`, which imports the registry
to draw previews. That's why the note prompt lives in `dot-notes.ts`.

> **Extend: add a tool.**
> 1. Add its variant to `ActiveTool` in `src/state/ToolState.ts`, plus `ToolMode` and
>    `isPlacementTool` if it's a toolbar mode.
> 2. Write its `ToolBehavior` in `src/features/tools/<name>-tool.ts`. Draw its preview with the
>    painter it's given (`drawStartMarker` and `drawPart` from `src/board-render` help).
> 3. Add it to `BEHAVIORS` in `src/features/tools/index.ts`. TypeScript insists on every kind.
> 4. Arm it from a button or shortcut with `setActiveTool({kind: …})`.

## 5. Parts and the catalog

There are **three placement systems**. Don't conflate them:

| System | Definitions | Placed by | Examples |
| --- | --- | --- | --- |
| Standard components | `ComponentDefinition` in `src/parts/component-definitions.ts` | two holes, start and end; the body sits between the leads | resistor, capacitor, LED, diode |
| Advanced components | `AdvancedComponentDefinition` in `src/parts/advanced-component-definitions.ts` | one anchor hole + rotation; pin offsets in grid units, rotated with `rotate-offset.ts` | pots, transistors, switches, header pins |
| ICs | `IC_DEFINITIONS` in `src/parts/ic-definitions.ts`; custom ones from `IcEditorDialog.tsx` | top-left pin + rotation | DIP chips, dual-row dev boards |

The placed-part classes live with their editor behaviour: `PlacedStandardComponent` and
`PlacedAdvancedComponent` in `src/features/standard-components/` and `src/features/advanced-components/`,
and `Ic` (`src/features/ic.ts`), which is both a catalog entry and a placed chip. Custom ICs are kept in
`localStorage` (`custom_ics`), and loading a project **merges** its custom ICs into the catalog,
never replacing `Ic.IC_CONTAINER`.

**Custom modules** are the user's own fixed-pin parts, with pins anywhere on a body of any size
(a sensor breakout, a relay board, a connector with an odd layout):

- `src/parts/custom-parts.ts` defines one, a `CustomPartSpec`: name, ref letters, size in holes,
  its pins' holes in order (pin 1 is the anchor it's placed by) with optional names, a colour.
  `customPartDefinition()` turns it into an `AdvancedComponentDefinition` (the body's other holes
  covered, `noIcon` and `bodyColor`: drawn in its colour with its name on it), so it's placed,
  drawn, hit-tested and connected as an advanced component.
- A placed one has `definitionId: "custom"` and carries its whole spec in `custom`, so a board
  with one draws and connects the same anywhere. Look a placed fixed-pin part's definition up
  with `advancedDefinitionFor(part)`, never by its id alone.
- A custom part can instead take a built-in fixed-pin part's package (`shape`, the built-in's id:
  a BC337 is a `"transistor"` with its own name and pin names). `customPartDefinition()` then
  gives the package's definition renamed (its artwork via `iconFile`, its category, so it's listed
  beside it), and the 3D viewer models the package (`modelIdFor(part)`). The spec still holds the
  package's `cols`, `rows` and pin holes (`shapedPartSpec()`; the reader rebuilds them from the
  package), so a reader that doesn't know the shape draws a plain module with the same pins. Any
  fixed-pin part but the sized ones (header pins) can be a shape (`CUSTOM_PART_SHAPES`).
- The parts list has one entry for all of these, Custom part…, which opens
  `src/ui/dialogs/CustomPartDialog.tsx`: pick the kind (IC chip, dev board, module, part in a
  package) and its editor opens with `fromChooser`, which gives it a Back button to the choice.
- `src/ui/dialogs/CustomModuleDialog.tsx` is the creator (click holes to add pins, name them), and
  `src/ui/dialogs/CustomShapeDialog.tsx` the one for a part in a package (pick it, name the pins;
  `src/features/custom-part-preview.ts` draws the part on a scrap of board as it's made);
  `src/features/custom-parts.ts` is the catalog's store (Modules › Custom, or beside the package;
  localStorage `custom_parts`). Loading a board merges its modules in; placed parts keep their own copy, so
  editing or deleting an entry never changes a board.
- AI agents make them too, through the MCP server: `edit_project`'s `add_part` takes a `custom` spec
  (a module, or a package via `shape`) or a `chip` (added to the file's `customIcs`), checked with
  the editor's own `readCustomPart()`, and places more of one by its name. The editor picks them up
  into its parts list when it opens the board, like any board's custom parts.
- File → Export / Import Custom Parts (`src/features/project/custom-parts-library.ts`) moves custom
  ICs and modules between browsers as a parts library file (`src/project-file/parts-library.ts`).
  Importing adds what's new and changes nothing already there.

**Part geometry** is worked out in one place, `src/parts/part-geometry.ts`, in grid units:

- `advancedPartShape(def, placement)`: a fixed-pin part's pins, covered holes, outline, icon
  anchor and body box;
- `advancedPinOffsets(def, rows, cols)`: its pins before rotation (a header block's lattice);
- `icPins(placement)`: a chip's pins in DIP order, with the side of the chip each is on.

Every consumer uses it:

- the nets and the MCP server, through `src/project-file/pin-positions.ts`;
- the renderer and the editor's hit tests, through `src/board-render/artists/advanced-geometry.ts`, which converts to drawing pixels;
- `Ic`, for its pin positions;
- the 3D viewer, for chip pins and solder joints.

Change a footprint rule there and everything follows.

All placed parts implement `PlacedPart` (`src/interfaces/placed-part.interface.ts`): hit-testing,
pin and occupied positions, anchor dots, `layer`, `ref` and `serialize()` (its project-file
entry). Drawing isn't on it: the renderer draws every part from its `serialize()` entry
(section 10). Board-level code (drag, delete, undo, save, resize) only uses this interface and
narrows on `part.kind` only for kind-specific behaviour.

- **Refs** (R1, U2…): unique ignoring case. `placePart` gives a new part the lowest free one, from
  its definition's `refPrefix` (ICs are U), via `src/project-file/part-refs.ts`.
- **`PartState.parts`** stays grouped by kind (ICs → standard → advanced), so stacking and the
  per-kind arrays in the file stay stable. Add and remove parts through
  `src/features/placed-parts.ts`: `placePart`/`removePart` (and `placeItems` for a paste) record
  undo history, `addToBoard`/`takeOffBoard` don't.

**The catalog** (`src/ui/catalog/`) is the left panel's Parts section: a search box over a
category tree. It only decides where parts are *listed*.

- `catalog-categories.ts` declares the tree: one line per category, `parentId` for nesting, array
  order is display order. `CategoryId` is derived from it, so a bad id fails to compile.
- `catalog-items.ts` merges the three systems into `CatalogItem`s, whose `activate`/`isArmed`/
  `edit`/`remove` hide which system backs them. `catalogItems()` builds them again only when the
  core says what's listed changed: `notifyCatalogChanged()` in `src/features/catalog/catalog-events.ts`
  (custom parts added, edited, deleted or merged in; a part placed, for "Recently used…").
- `catalog-search.ts` ranks matches: exact > prefix > word prefix > substring > fuzzy.
- `ComponentsSection.tsx` renders it: `CatalogTree` (folds remembered in localStorage),
  `CatalogResults` while searching (arrow keys and Enter pick), `/` to search.

> **Extend: add a part.** Add a definition, with a `category` and optional search `keywords`, to
> the right system's definitions file, and its icon to `assets/icons/components/<id>.svg` (or set
> `iconFile`). That's all: the catalog, the board, exports, thumbnails and the MCP server pick it
> up. Optional extras:
> - a 3D model: a builder in `src/viewer-3d/parts/`, wired in `build-catalog-parts.ts`;
> - special 2D art for a standard part: a decoration (section 10);
> - `leadLabels` / `pinLabels`, so the MCP server can name pins.
>
> **Extend: add a category.** One line in `catalog-categories.ts`. Empty categories are hidden.
>
> **Extend: add a kind of part** (a fourth placement system). This is a big change:
> - a class implementing `PlacedPart`;
> - a `kind` in its union;
> - an array in the project file (section 8: new version + upgrade);
> - its geometry in `src/parts/part-geometry.ts`, used by `pin-positions.ts` so the nets see it;
> - an artist in `src/board-render/artists/` (section 10);
> - a catalog source in `src/ui/catalog/catalog-items.ts`;
> - support in the 3D viewer and the MCP server.

## 6. Board types

A board is a **perfboard** (a separate pad per hole) or a **stripboard** (copper strips along every
row or column, cut at chosen holes).

- `BoardState.setup` holds the type and strip direction. Change it through `setBoardSetup()`
  (`src/features/board-type.ts`); the Board section's switches (`src/ui/sidebar/BoardSection.tsx`)
  call its `switchBoard()`, one undoable step. The Cut tool shows only on a stripboard.
- Strip cuts live on the dots (`IDot.cut`). So they survive a resize, and stay (hidden) while the
  board is a perfboard.
- How each type is drawn is its *look* in `src/board-render/board-looks/` (section 10).
- Strip and cut sizes are in `src/project-file/stripboard-geometry.ts`, shared with the 3D viewer.

> **Extend: add a board type.**
> 1. A `BoardType` and its `Saved…` board in `src/project-file/project-file.ts`, with reader support.
> 2. A look in `src/board-render/board-looks/`, registered in `board-looks/index.ts`.
> 3. How it connects holes in `src/project-file/nets.ts`.
> 4. Its option in `board-type.ts`, and in the 3D viewer's `build-board.ts`.

## 7. Undo and redo

Every undoable mutation calls `HistoryState.record(change)` with an `IChange`
(`src/interfaces/change.interface.ts`):

- `add`/`remove` of a line, or `replace` (placing one wire also changed others, as one step:
  `placeWire` (through `routeWire`, which reshaping a wire uses too) splits any wire passing over
  its end holes so the new wire joins it, cuts the new wire wherever it passes over another
  wire's end so that one joins too, and where it starts or ends at a wire's free end (same kind,
  and for jumpers the same colour and width, nothing else in the hole: no pin, no strip, no other
  wire) carries that wire on as one wire bending there: `wire-merge.ts`. A solder path joins every
  hole it covers already, so it's never split or cut. Corners that don't turn the wire are dropped
  (`lineThrough()` in `line-path.ts`));
- `add`/`remove`/`move` of a part;
- `move` of a wire, its points before and after (a wire moved with other selected things);
- `set` of a strip cut, of the board setup or of the circuit requirements;
- `batch` of several, replayed in order and taken back in reverse: placing a part that joins the
  requirements, and moving, deleting or pasting several things at once.

`undo()`/`redo()` in `src/features/project/undo-redo.ts` replay them through `applyChange()` and
redraw. History is cleared whenever the board is replaced (load, reset, resize) via
`resetForNewBoard()`.

> **Extend: a new undoable change.** Add its variant to `IChange`, handle it both ways in
> `applyChange()`, and call `HistoryState.record` where the change happens.

## 8. Project file and persistence

**The format** lives in `src/project-file/`, pure code shared by the editor, the 3D viewer and the
MCP server.

- `project-file.ts` defines version 9 (a jumper's optional `side`), with its shared types in `requirements.ts`. It holds grid
  `[col, row]` positions, the board type with a stripboard's strips and cuts, only holes with notes,
  wires with the corners they bend at (`via`) and what they are (`kind`: absent for a jumper,
  whose corners are bends and never joints, `"solder"` for a solder path), per-kind part arrays
  with refs (a custom module with its whole spec), and the user's custom ICs. It's written to be
  read by people and programs: facts only, nothing derivable (no nets, strip segments or resolved
  pin positions).
- A file says the oldest version that holds it (`fileVersionFor()`): 8 with requirements, else 6
  with a custom module, else 5 with a solder path, else 4 if a wire bends, else 3. So a board
  without them still opens in editors and MCP servers from before.
- `wire-path.ts` gives a wire's points (`from`, each corner, `to`), the straight legs between
  them and the holes each leg runs over (`holesAlong()`), for everything that walks a wire, and
  every hole a solder path covers (`solderPathHoles()`).
- `read-project-file.ts` reads any version into that shape (v5: no custom modules; v4: no solder paths; v3: no bends; v2: no board type or refs; no
  `version` field means v1, with pixel coordinates, every hole, the whole IC catalog). It throws
  `ProjectFileError` for non-projects before the board is touched. Bad entries are skipped and
  counted (a wire bending at a hole off the board too), and parts without a usable ref get
  numbered.
- `save-project.ts`'s `getSaveJson()` snapshots the editor into the current version (each part's
  `serialize()`). `load-project.ts`'s `loadProject(raw)` reads a file and rebuilds the board,
  pinning wires and parts to shared dot objects.

**Projects in the browser:**

- `project-store.ts` is the `localStorage` layout: two keys per project, its file and
  `{name, updatedAt}`, so tabs on different projects never write the same key.
- `current-project.ts` tracks the open one (`ProjectState.current`), opens, creates, imports and
  deletes projects, and autosaves shortly after any redraw that changed the board, and when the
  tab is hidden.
- The UI is the File menu (`src/ui/header/AppHeader.tsx`), the header's project name and the
  Projects dialog (`src/ui/dialogs/ProjectsDialog.tsx`, a `ProjectCard` per project, with a
  thumbnail from `project-thumbnail.ts`, section 10).
- A new project starts on the board its card sets up (`NewProjectCard`: name, then
  `src/ui/components/BoardSetupFields.tsx` for type, strips and size, beside a thumbnail of the
  empty board). `src/features/project/new-board.ts` holds that `NewBoard`: it starts as the one
  picked last time (localStorage `new_project_board`, kept by `newProject(name, board)`), else the
  open board's. Started without one (the first visit, deleting the last project), a project is on
  a board like the open one. The empty board's start card (`EmptyBoardHint.tsx`) shows the open
  board and changes it with the same fields, through `changeOpenBoard()`, then offers three ways
  to start: from scratch (puts the card away), the 555 blinker example, or Design it with AI (the
  `mcp-server/` page, in a new tab).
- A first visit opens the tour (`src/ui/dialogs/TourDialog.tsx`, localStorage `tour_seen`): slides
  of a short looping clip and a line or two of text, worded for taps on a phone, in three
  chapters. "The basics" opens first and ends by offering "How boards work" (wires join only their
  ends, solder paths every hole they cover, the solder side, wires on the back, strips and cuts,
  editing), which offers "More features" (bending wires, selecting several, values and colours,
  notes, parts in backwards, required connections, custom parts, the component list and PDF); Help
  › Tour opens any. The clips are `assets/tour/*.mp4`, each with a `.webp` poster of its last frame,
  recorded from the scenes in `tools/demo-video/scenes/tour/` (`tools/demo-video/README.md`). The
  user guide shows the same clips in the sections about what they show. When a change alters what
  one shows, record it again rather than leaving the tour and the guide out of date.

**Share links** carry a whole project in the editor URL's fragment: `#name=…&z=…`, or
`json=`/`src=` for links written by people and programs. A **short link**, `#name=…&p=<id>`,
names a copy stored on Perfboard Designer's project storage instead.

- The format is `src/project-file/share-link.ts`, documented for outside writers in
  `docs/share-links.md`. Keep the two in step.
- `src/ui/dialogs/ShareDialog.tsx` is the Share dialog. It always makes the full link, and on
  request a short one.
- `src/features/project/open-shared-link.ts` opens an incoming link as a new stored project (at
  startup, after the last project is reopened, and on `hashchange`), then clears the fragment.
- `project-storage.ts` talks to the project storage (`STORED_PROJECTS_URL`,
  `https://projects.perfboarddesigner.com`): `storeProject()` for the dialog, `fetchStoredProject()`
  for `p=` links, fetched without asking since it's the site's own. The storage is the MCP server's
  Worker (section 12), but the editor knows only its HTTP API, documented in `docs/share-links.md`,
  and imports nothing from `mcp/`. `PERFBOARD_PROJECTS_URL`, set when the editor is built or run,
  points it at another copy (`vite.config.ts` passes it in as `__PERFBOARD_PROJECTS_URL__`), e.g.
  a local Worker: `PERFBOARD_PROJECTS_URL=http://localhost:8787 npm run start`. `off` builds an
  editor without short links: the dialog hides them, and a `p=` link says to ask for the full one.

> **Rule: the project works without short links and without the Worker.** They're extras: the
> editor contacts the storage only when a user makes or opens a short link, and the full link is
> always offered beside a short one. The MCP server's stdio copy likewise only points at the
> Worker for `image` and `store`, each of which can be turned off (section 12). Don't build a
> feature that needs them.

> **Extend: change the format.** Bump `PROJECT_FILE_VERSION`, document the new fields in
> `project-file.ts`, and add an upgrade path in the reader. **Old files must keep opening.**
> `examples/*.json` (mostly v1) are the compatibility fixtures; the two `*-555-blinker.json` are v3
> and are the MCP server's examples.

## 9. Connectivity: nets and wire crossings

**Nets** (`src/project-file/nets.ts`): `computeNets(project)` works out which pins the board
connects, from a project file and nothing else. So the editor and any program reading the file
always agree.

- A jumper wire joins only its two end holes, never a hole it passes or bends over, and
  everything in one hole is joined.
- A solder path joins every hole it covers (`solderPathHoles()`: ends, corners and the holes its
  legs run over), and any solder path it touches, even between holes.
- On a stripboard, a cut hole has no copper, so a solder path over one joins nothing there.
- On a stripboard, a strip joins its holes up to the next cut, and a cut hole joins nothing.
- Nets are derived and never saved.
- The editor shows them live in the Nets panel (`src/ui/nets/NetsPanel.tsx`), kept by
  `src/features/board-nets.ts`. Clicking a net lights it up on the board (`NetHighlightState`,
  drawn by the renderer), and the light follows the net as the board changes.
- Each pin shows its part's catalog icon. The panel's Short / Detailed switch (UI-only, kept in
  localStorage as `nets_view`) shows pins as chips ("D1.K") or a line each: ref, part name and
  value, and what the pin is ("cathode (K)", "pin 8 · VCC"). `src/ui/nets/part-info.ts` works
  that out from `partList()` and the definitions' icons; `PinList.tsx` draws both views, for the
  nets and for Required connections. A rail's net has a ground or supply icon.

**Supply rails and polarity** (`src/project-file/rails.ts`, `src/project-file/polarity.ts`): which
nets are supply rails and which way round polarized parts sit on them, from a project file and its
nets alone, like the nets.

- A net is a rail when its pins are named after one (the names nets take their names from,
  `isPowerName()` in `nets.ts`: a chip's VCC or GND, a module's 5V or 3V3), when it holds a power
  source's terminal (a definition with `powerSource`, the battery holders: + is the positive
  supply, − ground), or when one of its holes has a rail's name as its note ("+9V", "GND").
- `supplyRails()` gives each rail's side: positive, ground or negative, and the voltage its name
  states, if any. VSS, VEE and an op amp's V- are ground, unless the board's ground is another net,
  when they're the negative supply.
- `shortedRails()` lists nets joining rails that can't be one: a positive supply with ground or a
  negative one, ground with a negative supply, two different stated voltages (5V and 3V3), or a
  battery's two terminals. Names for one rail together (VCC and 5V, GND and AGND, GND and V-)
  aren't a short.
- `polarityWarnings()` names polarized parts the rails show to be the wrong way round. An LED, an
  electrolytic capacitor or a part with + and − pins (a buzzer) is backwards when both its ends are
  on rails the wrong way round, when its cathode or − is on a positive supply no other rail is
  known to be above, or when its anode or + is on ground with no negative supply. A plain diode is
  reported only when it conducts straight across the supply: a cathode on VCC is a flyback or
  clamp diode doing its job. A part between two signals is never judged.
- The editor keeps the warnings with the nets (`board-nets.ts`) and lists them in the Nets panel,
  in a fold open from the start above the others (`src/ui/nets/PolarityWarnings.tsx`). A click on
  one selects the part (on a phone, putting the sheet away); a two-lead part turns round from
  there, or with the selection's Turn round (`src/features/part-polarity.ts`: its leads swap holes,
  one undoable `move`). The MCP server's `validate_project` warns about each, and about shorted
  rails.

**Wire crossings** (`src/project-file/wire-crossings.ts`): jumper wires are insulated. Where one
runs across another wire, or over a hole holding a pin, a lead or another wire's end, it goes
*over* it (the later wire in the list is on top); so does a bend sitting on such a hole. Solder
paths are on the other side of the board and join what they touch, so they play no part here. Where
three or more things meet at a hole, they're joined. `layoutProjectWires(project)` works this out
leg by leg, and each hop says which `leg` of its wire it's on. The 2D renderer rounds off each
bend and draws a dark edge where a wire goes over something and a solder dot at junctions; the 3D
viewer bends its tube at each corner and arches the upper wire. A wire lying along another wire's
run over a stretch is a `WireRun` (parallel legs never meet, so it has no hops), and the 3D viewer
keeps the upper wire level over it and stacks wires that go over wires that go over others
(`elevation()` in `src/viewer-3d/project-data.ts`). A jumper on the solder side (`side: "bottom"`)
is on the other face: layout compares only wires on the same face, though a pin or any wire's end
in a hole counts for both. The editor moves a selected jumper between faces with "Move to Solder
Side"/"Move to Top" (`moveSelectedWireToSide()` in `src/features/wire.ts`; one undoable
replace), and `wire-merge.ts` never splits, cuts or merges across faces. The 2D top view draws
solder-side wires faded (full strength when selected or hovered), the solder-side view draws them
at full strength over the solder paths, and the 3D viewer lays them under the board.

In the editor a placed wire (`ILine`) keeps its corners in `via`, and `src/features/line-path.ts`
holds its geometry: its points and legs, how near a point is (hover and selection), and splitting
it at a hole it runs or bends over (`wire-merge.ts` uses that to join a wire ending on another).
A part's lead or a wire's end can still land in a hole a jumper only passes over (the part placed
after the wire, say). Connect to Wire (`src/features/connect-wire.ts`, in the context menu and the
selection bar) joins them: it splits the jumpers passing over that hole there with
`splitWiresAt()`, as one undoable `replace`. A pin joins the jumpers on both faces, a jumper's end
only those on its own face. With a part selected it's offered only when exactly one of its pins
lies under a wire, since joining several could short the part.

**Rule:** no connectivity or crossing logic anywhere else, the MCP server included. Add what's
missing to these modules without reshaping their output.

**Component list** (`src/project-file/part-list.ts`): the board's parts as a bill of materials,
worked out from a project file like the nets. `partList(project)` gives each part's ref, its name
from the catalog, its value written out with its unit (an LED's colour by name, `ledColorLabel()` in
`src/parts/component-definitions.ts`, which also holds the LED colours the renderer and 3D viewer
paint), its catalog type and pin 1's hole; `groupPartList()` makes it a shopping list by part and
value; `partListCsv()`/`groupedPartListCsv()` write either as CSV. The editor shows it in File →
Component List (`src/ui/dialogs/PartListDialog.tsx`), where a click on a row selects that
part. Its PDF / Print prints the table as shown (`src/features/project/print-part-list.ts`, each
part with its catalog icon, which the dialog looks up with the Nets panel's `partInfo()`; the
shopping list with a box to tick per row), through the browser's print dialog
(`print-frame.ts`, shared with the project PDF), where Save as PDF makes the PDF.

**Project PDF** (File › Export PDF, `src/ui/dialogs/ExportPdfDialog.tsx`): one document about the
project, its sections ticked in the dialog (remembered, localStorage `pdf_sections`), on A4 or US
Letter (`pdf_paper`; first the paper used where the computer is, by its time zone,
`regionalPaper()`), which the page sets with `@page size` and sizes its pictures to, and laid out
by `src/features/project/project-document.ts` from the project file alone: an overview (figures,
the board, and a verdict from the checks), the board from both sides, the component and shopping
tables (`print-part-list.ts`), the nets (`computeNets()`), the checks (`shortedRails()`,
`polarityWarnings()`, `requiredNetReports()`, unconnected pins, wires connecting no pins) and
true-size pages with a 50 mm check bar (`print-board.ts`). All printed pages share one look,
`print-style.ts`, and print through `print-frame.ts`.

## 10. Rendering

Everything that draws the 2D board (the editor's canvas, PNG and SVG export, Projects-dialog
thumbnails, the catalog's chip icons, and the MCP server's pictures) goes through one
renderer: **`src/board-render/`**.

### The idea

```
ProjectFile ─┐
BoardView ───┼─► drawBoard(painter, project, view) ─► Painter ─┬─ CanvasPainter → editor, PNG export, thumbnails
             │        (src/board-render/, pure)               └─ SvgPainter    → SVG export, MCP pictures, catalog icons
editor state ─► getSaveJson() + editorView()                       then: the active tool's preview on top
```

It has three layers, each knowing only the one below it:

1. **Painter** (`painter/painter.ts`): puts shapes on a surface (circle, arc, rect, line,
   polygon, path, text, image, group, stamp). Knows nothing about boards. Every call carries its
   whole style, so nothing leaks from one shape to the next; transforms, opacity and clipping only
   happen inside `group()`.
2. **Renderer** (`draw-board.ts` and below): what a board looks like, drawn from project-file
   entries and part definitions. Knows nothing about the DOM or the editor.
3. **Consumers**: each picks a painter and a view.

Because the renderer's input is the versioned project file, outside code depends on one function
and a small interface, not on how anything is drawn. A part's look can change freely, and every
consumer picks it up.

### Files

```
src/board-render/                  PURE: no DOM, no editor state
  index.ts                         the public API; code outside this folder imports only this
  draw-board.ts                    drawBoard(): the layer order, and boardSizePx()
  board-view.ts                    BoardView, BoardItem, PLAIN_VIEW
  render-svg.ts                    renderBoardSvg(project, options): a standalone SVG document
  palette.ts                       colours and sizes used by more than one file
  painter/painter.ts               the Painter interface and style types
  painter/svg-painter.ts           SvgPainter: writes SVG as a string, runs anywhere
  painter/fonts.ts                 font stacks, CSS font strings, text width estimates for SVG
  board-looks/                     one BoardLook per board type, boardLookFor(type)
  layers/holes.ts                  holes, solder in joint holes, notes, rings
  layers/wires.ts                  wires and solder paths, selection glow, over-edges, junction dots
  layers/part-labels.ts            refs and values, kept on the board
  layers/net-highlight.ts          a lit-up net
  layers/solder-side.ts            the solder side's joints, pin-1 boxes, refs and cut marks
  artists/part-artist.ts           the PartArtist interface, BoardPart, PartLabel
  artists/index.ts                 ARTISTS registry, boardParts(), drawPart(), iconsUsedBy()
  artists/ic-artist.ts             chips and dev boards: package, pin rings, pin labels
  artists/ic-package/              dip-shape.ts, module-shape.ts: the package drawings (+ catalog icons)
  artists/standard-artist.ts       leads + icon body
  artists/standard-geometry.ts     standardPartSpan(): shared with the hit test
  artists/standard-decorations.ts  resistor bands, ceramic code, LED colour, by definition
  artists/advanced-artist.ts       pin markers, body, icon, pin numbers, tiled header pins
  artists/advanced-geometry.ts     advancedPartGeometry(): src/parts geometry in px, shared with the hit test

src/features/board-canvas/         EDITOR ONLY (browser)
  canvas-painter.ts                CanvasPainter: Path2D, hole sprites, pixel-snapped text
  browser-icons.ts                 loads icons by file name; tells listeners when one arrives
  editor-view.ts                   editorView(): BoardView from the editor's state
src/features/draw-canvas.ts        redrawCanvas() = drawBoard + the tool's preview + listeners
```

### Layer order

`drawBoard` is the one place that knows what goes on top of what:

1. the bare board (its look: fill, a stripboard's strips and cuts), and the column numbers and
   row letters printed round its edge (when `view.holeLabels`, `layers/hole-labels.ts`)
2. `under-board` parts: chips lie flat, under the holes
3. holes, except those under a chip's body; rings, notes
4. solder paths (`drawSolderPaths` in `layers/wires.ts`: a trail of solder with a bead on each
   hole it covers, its corners square), then jumper wires, with dark edges where they go over
   something
5. `over-wires` parts: every other part, then every wire again, faded, so a wire under a part's
   body shows through it, then each fixed-pin part's pins marked (`drawPinMarks`), so a pin under
   a body shows too; the labels go over them
6. junction dots
7. part labels (when `view.partLabels`)
8. part overlays: a chip's pin rings and pin labels
9. the lit-up net (`view.highlight`)

The editor then draws the active tool's preview on top (`ToolBehavior.drawPreview`).

### BoardView: showing more than the file

`BoardView` (`board-view.ts`) holds what to mark beyond the file:

- `partLabels`
- `holeLabels`: column numbers (from 1) and row letters (from A) round the board's edge, in the
  strip between the edge and the first holes, as printed on a real board. The editor and its
  downloads show them (on the solder side too, columns running right to left), and the selection
  bar names a pad the same way (`holeName()` in `grid.ts`, "G7"); the MCP server's pictures
  leave them off, since agents count holes from 0
- `selected` and `hovered`: lists of `BoardItem`s, i.e. a part by `ref`, a wire by index, a hole by
  `[col, row]`. A selected wire's handles are drawn only when it's all that's selected
  (`soleSelected()`)
- `startHole`: a placement's first click
- `highlight`: a net
- `solderSide`: the board from below instead, for soldering. `drawBoard` then draws something else
  entirely: the board look and holes mirrored left to right (a `flipX` group, which both painters
  support), the component side faded inside that group, and outside it, at mirrored positions so
  text reads the right way, a solder blob on every joint (`solderJoints()`: each pin and lead, each
  jumper's ends, every hole a solder path covers), the solder paths at full strength, a square round each multi-pin part's pin 1, part refs, and a stripboard's cuts as red
  crosses (`layers/solder-side.ts`). The blobs would hide a wire's dark edges, so there a jumper is
  drawn broken by a gap round each joint it only passes over, and runs into the joints it ends in
  (`drawWiresFromBelow()` in `layers/wires.ts`). The editor shows it with the board bar's Solder side button or
  <kbd>B</kbd> (`src/features/solder-view.ts`), read-only while it's on, and downloads it as shown.

`PLAIN_VIEW` (`{}`) is the plain board. The editor builds its view in
`src/features/board-canvas/editor-view.ts` from `SelectionState`, `DotState`/`LineState` hover,
`ToolState.pendingStart`, `NetHighlightState` and `ViewState`.

### The editor's side

`redrawCanvas()` clears the canvas and calls
`drawBoard(painter, getSaveJson(), editorView())`, so the editor draws exactly what it would
save. A drag moves the part through `setAnchorDots`, so the snapshot already shows it mid-drag.
One `CanvasPainter` is kept for the page, so its hole sprites survive between redraws.

Placed parts don't draw themselves, but they still hit-test. They use the same geometry as the
drawing, so clicking and drawing agree:

- `PlacedStandardComponent.containsPoint` uses `standardPartSpan()`;
- `PlacedAdvancedComponent`'s pins, covered holes and body box come from `advancedPartGeometry()`;
- `Ic.containsPoint` uses the package extents (`DIP_OVERHANG`, `MODULE_EDGE`, `MODULE_END`).

### Icons

Part artwork is SVG files in `assets/icons/components/`, named by `getIconFile(def)` (the
definition's `iconFile`, else `<id>.svg`). Painters ask for icons by file name:

- **`CanvasPainter`** uses `browser-icons.ts`. The first ask starts the load and returns nothing,
  so the part draws its stand-in box; when the icon arrives, `redrawCanvas` runs again.
  One-off drawings (export, thumbnails) `await browserIcons.ready(iconsUsedBy(project))` first.
- **`SvgPainter`** takes an `icons(file) => svgText` function and embeds each icon once.
  SVG export fetches the icons from the site; the MCP server has them baked in at build time.

### Outputs

| Output | Where | Painter | View |
| --- | --- | --- | --- |
| Editor board | `src/features/draw-canvas.ts` | `CanvasPainter` on the page canvas | `editorView()` |
| PNG export | `src/features/project/save-image.ts` (`downloadAsImage`) | `CanvasPainter` on an offscreen canvas at 2× | labels as shown |
| SVG export | `save-image.ts` (`downloadAsSvg`) | `renderBoardSvg` with fetched icons | labels as shown |
| Project PDF | `src/features/project/project-document.ts` (`exportProjectPdf`), its board pictures from `print-board.ts` | `renderBoardSvg`, scaled to the page, or sized in mm (2.54 mm a hole) for the true-size pages | top with labels, and the solder side |
| Thumbnails | `src/features/project/project-thumbnail.ts` | `CanvasPainter`, scaled to fit | `PLAIN_VIEW` |
| Catalog chip icons | `dipIconSvg()` / `moduleIconSvg()` in `artists/ic-package/` | `SvgPainter` | n/a |
| MCP pictures | `mcp/src/board-image.ts`, Worker `GET /render.svg` | `renderBoardSvg`, icons baked in | labels on |
| MCP board view | `mcp/src/tools/show-board-tool.ts`, `show_board` (an MCP App) | that SVG, as a `data:` image in the client's frame | labels on |
| MCP PNGs | `mcp/src/board-png.ts`, `render_board` with `format: "png"` and Worker `GET /render.png` | that SVG, rasterized by resvg (WebAssembly) with fonts baked in | labels on |

### Rules

- `src/board-render/` is pure. It may import only `src/project-file/` and `src/parts/`
  (section 2). Anything needing a browser (`Path2D`, `document`, `Image`) belongs in
  `src/features/board-canvas/`. ESLint enforces both.
- Code outside the folder imports from `src/board-render/index.ts` only (the MCP server through
  `mcp/src/editor.ts`).
- Colours from a project file are free text. `SvgPainter` lets only plain colour syntax through
  (no markup, no `url()`), because the Worker serves its SVGs as they are.
- Canvas and SVG differ in a few known ways:
  - SVG text widths are estimates (`fonts.ts`), and an SVG uses its viewer's fonts.
  - Group opacity applies per shape on a canvas, but to the whole group in SVG. Only tool
    previews use it.

### Extending

> **A part's look.** Edit its artist (`artists/*-artist.ts`) or its package drawing. Every output
> follows.
>
> **Special art for one standard part** (like resistor bands). Write a `Decoration` in
> `artists/standard-decorations.ts` and add it to `DECORATIONS` under the definition's id:
> ```ts
> // e.g. print an inductor's value on its body
> const inductance: Decoration = (painter, part, bodyStart, bodySize) => {
>   if (part.value) painter.text(part.value, bodyStart + bodySize / 2, 0, {font: {family: "sans", size: 12}, color: "#111", align: "center", baseline: "middle"});
> };
> const DECORATIONS = {..., "inductor": inductance};
> ```
> Decorations draw in the part's own frame: rotated along the span, the icon's square from
> `bodyStart`.
>
> **A new kind of part.** Write a `PartArtist<YourSavedEntry>`:
> - `layer` (`"under-board"` or `"over-wires"`);
> - `draw`;
> - optional `drawOverlay` (over everything) and `label` (beside the part, or on its body).
>
> Then add its `BoardPart` variant in `part-artist.ts`, a line in `ARTISTS` and in `boardParts()`
> (`artists/index.ts`), and its icons in `iconsUsedBy()`.
>
> **A board type.** A `BoardLook` (`paintBoard` for the board and shared copper, a `hole` stamp)
> in `board-looks/`, registered in `board-looks/index.ts`.
>
> **A new output.** Implement `Painter` for the surface (e.g. a PDF painter), then call
> `drawBoard(yourPainter, project, view)`. `SvgPainter` is the simplest example to copy. If it runs
> outside the browser, keep it in `src/board-render/painter/`; if it needs the DOM, put it next to
> `canvas-painter.ts`.
>
> **A new thing to show** (say, highlighting one part's pins). Add a field to `BoardView`, draw it
> in the right layer (or a new layer in `drawBoard`), and fill it in `editorView()` if the editor
> should show it.

## 11. 3D viewer

`src/viewer-3d/` is a read-only three.js view, kept separate from the editor on purpose.

- It only consumes project-file JSON: read by the shared reader, laid out in pixels by its own
  `project-data.ts`, then built in mm (50 px grid = 2.54 mm pitch).
- It never imports editor state, only the pure layers: the reader, wire crossings, and from
  `src/parts/` the definitions, value parsing, colour codes and part geometry (chip pins and the
  solder joints of fixed-pin parts come from `part-geometry.ts`, like everywhere else).
- The editor side is `src/features/open-3d-view.ts`, which snapshots `getSaveJson()` and
  lazy-imports the viewer, so three.js stays out of the main bundle.
- Every hole something is soldered into (each part registers its holes with `SceneKit.solder`, each
  wire its ends, each solder path every hole it covers) gets a fillet underneath and a solder fill
  on top (`buildSolderJoints`).
- Solder paths (`project-data.ts` lists them apart from the jumpers) are a flattened trail of
  solder along the bottom face (`buildSolderPaths`).
- A wire's insulation stops short of each end, as a stripped jumper's does, and the bare tinned
  copper bends down into the hole to its joint underneath (`buildWires`), so a wire end reads as
  soldered there.
- Its controls: a toolbar (screenshot, 3D export, open file, close; icons only on a phone) and an
  Angled/Top/Bottom switch floating over the bottom of the view. Each view is framed by the
  window's height, or its width on a tall phone screen.
- Models for fixed-pin parts are builders in `src/viewer-3d/parts/`, picked by definition id in
  `build-catalog-parts.ts`.
- Export 3D saves the board as a glTF binary (`.glb`, `export-model.ts`): a copy of the scene's
  board scaled from mm to metres (glTF's unit), its instanced meshes (the holes) turned into plain
  meshes, since not every program reads glTF instancing. three.js's GLTFExporter is loaded only when
  it's used. Each part is its own object, named as the component list names it ("R1 Resistor
  10kΩ", from `partList()`, by `build-scene.ts`), beside Board, Wires, Solder paths and Solder
  joints, so other programs' outliners read like the board.

## 12. MCP server

`mcp/` is a separate npm package (`perfboard-designer-mcp`, Node 22+) that lets AI agents design
boards. It runs two ways:

- `src/server.ts`: stdio, local;
- `src/worker.ts`: a Cloudflare Worker with stateless Streamable HTTP at `/mcp`
  (`wrangler.toml`; `npm run worker:dev` / `worker:deploy`), plus `GET /render.svg` and
  `/render.png`, and stored projects: `POST /projects`, `GET /<id>.json`, `.png` and `.svg`,
  served at `projects.perfboarddesigner.com`. Each data center keeps a copy of every picture and
  stored file it serves (the Workers Cache API, `edgeCached()`), so repeats aren't drawn again.

The stdio server works without the Worker. It points at it only for two extras, set in its
environment: `PERFBOARD_IMAGE_URL` (`make_share_link`'s `image`) and `PERFBOARD_PROJECTS_URL`
(`store`), each the public one unless set, `off` for none. `createServer()` takes both as optional,
and `make_share_link` offers agents only the ones there are.

Tool code must not use Node APIs, because it also runs on the Worker. **It depends on the editor,
never the other way round**, and only `mcp/src/editor.ts` imports the editor's source, so that
dependency is listed in one place.

| File | Role |
| --- | --- |
| `create-server.ts` | wires tools and resources together for either entry point |
| `tools/catalog-tools.ts` | `list_parts`, `get_part` |
| `tools/project-tools.ts` | `new_project`, `edit_project`, `get_project` |
| `tools/board-tools.ts` | `validate_project`, `get_nets`, `get_pin_positions`, `render_board` (text or PNG) |
| `tools/share-link-tools.ts` | `make_share_link` (link + `image` URL, optionally stored too), `read_share_link` |
| `tools/show-board-tool.ts`, `board-view/` | `show_board`: an MCP App (`ui://perfboard/board-view.html`) showing the user the board in the chat; the picture goes in the result's `_meta`, for the page only, and `view.ts` (bundled for the browser into `view.html`) speaks the MCP Apps messages itself |
| `board-image.ts` | SVG pictures via the board renderer |
| `board-png.ts` | PNG pictures: that SVG rasterized by resvg-wasm, which each entry point hands over (`setResvgWasm`) |
| `image-requests.ts` | the Worker's `GET /render.svg` and `/render.png`, a board from a share link's parameters |
| `project-handles.ts` | projects kept under a `projectId` (memory on stdio, a Durable Object each on the Worker) |
| `stored-projects.ts` | stored projects: a frozen copy under a short id from a name, a hash added when it's taken; `ProjectStorage` is a Durable Object each on the Worker (`StoredProjectHolder`, deleted after a year unopened), the hosted server's HTTP API on stdio |
| `project-requests.ts` | the Worker's `POST /projects` and `GET /<id>.json`, `.png`, `.svg` |
| `edit-ops.ts`, `edit-project.ts` | `edit_project`'s ops: all or none, one function per op |
| `validate.ts`, `expected-nets.ts` | checks, one function per check; `expectNets` |
| `render-board.ts`, `nets-report.ts` | text drawing of a board; nets as agents name pins |
| `guide.ts` | `INSTRUCTIONS` (keep under ~2 KB) and the full guide; keep the two in step |
| `resources.ts`, `examples.ts` | served documents and example projects |

`build.mjs` bundles the server, the editor's pure code and the SDK into `dist/server.js` and
`dist/worker.js`. It also bakes in the docs, the example projects, `show_board`'s page (`board-view/view.ts`
bundled for the browser into `view.html`) and the part icons, the icons
with their `<metadata>` stripped, and the fonts in `mcp/fonts/` that PNG pictures draw text with
(Noto, cut down to the characters boards use). It copies resvg's WebAssembly to
`dist/resvg.wasm`: the stdio server reads it the first time it draws a PNG, and the Worker is
uploaded with it as a compiled module (Workers can't compile WebAssembly at run time).

> **Extend: add a tool.** Register it in the right `tools/*.ts` group with a zod input schema and
> a description written for agents. Take `projectId`/`project` through `project-source.ts`, and
> format replies with `reply.ts`. Facts about parts belong in the definitions, not in `mcp/`.
>
> **Extend: add a validation check.** A function in `validate.ts` taking the `Board`, called from
> `validateProject`; describe it in `validate_project`'s description and the guide.
>
> **Extend: add an example.** A v3 file in `examples/`, its id in `build.mjs`'s `EXAMPLES` and
> in `src/examples.ts`. Keep it valid with its `expectNets`.

Check server changes with a throwaway script outside the repo that drives the built
`dist/server.js`. `.mcp.json` runs that file as the `perfboard` server, so rebuild after a change.

## 13. Conventions

- **Shortcuts** go through `ShortcutRegistry` (`src/features/shortcut-keys.ts`): the editor's in
  `src/features/keyboard-shortcuts.ts`, a control's own with `useShortcut()`. The legend
  (`ShortcutsLegend.tsx`) lists them. No ad hoc `keydown` listeners. While a dialog is open, keys
  don't reach them (`Modal` stops them).
- **Canvas coordinates:** map mouse events with `Canvas.toDrawingCoordinates(e)`, never raw
  `clientX`/`clientY`. It accounts for the canvas's CSS scaling.
- **DOM:** the page is React's. The core touches only the board's canvas and viewport and the
  short-lived elements it makes itself (download links, `pick-color.ts`'s input); it never looks
  elements up by id. Give it state for the UI to read instead.
- **React:** function components, one per file; read core state with `useEditor`, keep UI-only
  state in a component or a `src/ui/lib/store.ts` store, and call core functions to act.
- **Comments** say why, in plain sentences, at the top of a module and above anything non-obvious.
  Match the density of the code around you.
- **Layers:** `npm run lint` enforces the layer rules (section 2). If it stops an import, the fix
  is to move the code to the right layer, not to silence the rule.
- **Checks before a change is done:**
  - editor: `npx tsc --noEmit` and `npm run lint`;
  - server: `cd mcp && npm run typecheck && npm run build`.
- **Testing:** there's no test suite, and none should be added. Check changes by hand in the
  browser (`npm run start`, `/app/`), e.g. by opening `examples/*.json` through File › Import.
- **Videos:** `tools/demo-video/` films the editor from scripted scenes (the tour's clips, demo and
  tutorial videos). It isn't test tooling and adds no dependency: it uses a Playwright and ffmpeg
  already on the machine.
