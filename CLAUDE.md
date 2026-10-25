# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

PCB Perfboard Designer — a browser-based CAD tool (a React + TypeScript UI over an HTML5 Canvas board) for
laying out components and wires on a virtual perfboard grid. Built with Vite.

## Commands

```bash
npm install          # install deps
npm run start        # dev server (vite) — http://localhost:3000 (landing), /app/ is the editor
npm run build         # production build to dist/
npm run serve         # preview the production build
npm run lint          # eslint ./src --ext .ts
npm run format         # prettier --write "./**"
npm run format:check   # prettier --check "./**"
npm run deploy         # build + publish dist/ to GitHub Pages (gh-pages)
```

There is no test suite/framework in this repo (no test script, no test runner in
devDependencies). **Do not introduce Playwright or any other automated test tooling** — the user
tests changes manually in the browser. To check a change yourself in a browser, follow
**docs/testing-with-agents.md**: boards opened by link, `data-editor-ready`, and on the dev server
`window.__perfboard` (`src/features/test-handle.ts`) to read the board, selection, nets and hole
positions, with `settled()` to wait for a change.

## Architecture

**Requirements**: each placed part has an `instanceId` (`src/project-file/component-ids.ts`;
version 7, but it never raises a file's version); never generate identities during serialization. Version
8's optional `requirements` is independent intended connectivity, never a second copy of actual
nets. `src/project-file/requirements.ts` owns its types, strict reader, inventory, net editing and
pure comparison. Stable component IDs plus numeric pins bind requirements; snapshots keep missing
parts/pins reportable. Unspecified pins are unchecked, not implicitly unused; only full coverage
without mismatches may report a match; turning checking off is a saved choice the reader and
writer must preserve. The editor holds them in `RequirementsState`; they're optional, edited in
the Nets panel's Required connections (`src/ui/nets/RequirementsCard.tsx`, folded away until
wanted): a net is added or changed by clicking its pins on the board with the `required-net` tool
(`src/features/tools/required-net-tool.ts`, Enter saves, Esc drops; `RequiredNetBar.tsx` over the
board), or the board's wiring is copied in (`createRequirements(project, true)`), and nets are
deleted there; `src/features/required-nets.ts` makes each change one undoable `set`. Pure net
editing (`setRequiredNet()`: a picked pin moves out of any other net) and the per-net report
(`requiredNetReports()`: ticked once the board joins its pins) live in `requirements.ts`; problems
other than a missing connection (unexpected joins, parts gone, with Forget) are listed above the
nets. Preserve multi-net
requirement highlights instead of following only one actual net. `placePart()` records a new
part's required inventory entry and the physical part in one history batch. Deleted parts remain
required until explicitly forgotten. New projects clear requirements; resizing/copying and MCP
edits preserve them. MCP validation checks saved requirements only when enabled; `expectNets` is
unchanged. A top-level `schematic` field from older editors is read and ignored. Release the
frontend, MCP and hosted reader together for format-9 files.

`ARCHITECTURE.md` (repo root) is the developer guide to all of this, for people: how each part
works and how to extend it. Keep it in step with this file: a change that makes a section of
either wrong fixes both.

**Layers** (enforced by ESLint, `.eslintrc.cjs`): each imports only the layers below it.
`src/parts/` (part definitions, catalog categories, value parsing and colour codes,
`rotate-offset.ts`, `ic-package.ts`, and `part-geometry.ts`) imports nothing outside itself →
`src/project-file/` imports it → `src/board-render/` imports both → the editor, `src/viewer-3d/`
and `mcp/` on top. Those three bottom layers are pure (no DOM, no editor state; browser globals
like `document`/`Path2D` fail lint there), outside code imports the renderer only through
`src/board-render/index.ts`, the 3D viewer never imports the editor, and the editor never imports
`mcp/`. The editor is itself two layers: its core (`src/features/`, `src/state/`,
`src/interfaces/`, `src/utils/`) and the React UI on top (`src/ui/`); the core never imports
`src/ui/`. When lint stops an import, move the code to the right layer rather than silencing it.

**Pages** (Vite multi-page build, inputs listed in `vite.config.ts`). Served at
https://perfboarddesigner.com (GitHub Pages custom domain, kept across deploys by `assets/CNAME`).
Keep all in-site URLs relative — never `/...` — so it also works under the github.io subfolder
`/perfboard-designer/`. Absolute URLs belong only in SEO tags (canonical, og:*, sitemap).
- `index.html` — static SEO landing page, JS-free but for the consent banner (styles in `src/landing/`).
- `app/index.html` — the editor itself (everything below). Static assets in `assets/` (the Vite
  publicDir) are served from the site root, so from the editor they're `../icons/...` etc.
- `guide/index.html` — static SEO user guide, JS-free but for the consent banner: how to use the editor, feature by feature
  (styles in `src/guide/`, on top of the landing's). Linked from the editor's Help menu. When a
  change alters how a feature is used (a tool, shortcut, menu or panel), update the guide too.
- `contributors/index.html` — standalone page (`src/contributors/`) listing contributors live from
  the GitHub API; imports nothing from the editor.
- `mcp-server/index.html` — how to connect AI agents (Claude Code, claude.ai, ChatGPT, Cursor…) to
  the hosted MCP server at `https://mcp.perfboarddesigner.com/mcp` (see MCP server below). Reuses
  the landing's styles plus `src/mcp-page/` (its own styles and copy buttons; imports nothing from
  the editor). Named `mcp-server/` because `mcp/` is the server's package. Keep its setup steps in
  step with `mcp/README.md`.
- `assets/consent.js` — Google Analytics behind a consent banner, for every page: each loads it
  with a plain script tag at the top of its head (copied as is, not bundled). GA loads, and sets
  cookies, only after the visitor accepts; the choice is localStorage `analytics_consent`;
  anything with `data-consent-settings` (the footers' Cookie settings, the editor's Help ›
  Cookie Settings via `src/ui/lib/consent-settings.ts`) reopens the banner. It reports pages
  without their #fragment, where share links carry a board. A new page loads it too.
- `assets/404.html` — GitHub Pages' not-found page, copied as-is (not a Vite input). It's served at
  whatever missing URL was requested, so it's fully self-contained (inline CSS/SVG) and is the one
  page that uses root-based links (`/app/`, `/`).

**Look**: the editor is made of a circuit board's materials. The colours are the tokens at the top
of `src/style.css` (`--ink-0..3` soldermask surfaces, `--line`, `--silk*` text, `--copper*` for
whatever is active or primary, `--danger`, `--warn`); use them, not new hex values (the 3D
viewer's stylesheet writes the same values out, as it reads nothing of the editor's). The typeface
is Barlow (loaded in `app/index.html`); labels are sentence case. Areas are full-height panels
separated by hairlines, not cards in cards.

**Tool rail, board toolbar, selection bar, icons**: the tool rail on the left
(`src/ui/sidebar/ToolRail.tsx`: Select, Erase, Note, Cut on a stripboard, Wire, Solder) picks what
a click does. The toolbar above the board (`src/ui/board/BoardToolbar.tsx`) has the status
(`StatusBadge.tsx`, its text from `status-text.ts`: what's selected or what the tool does, with
cancel/rotate while placing), undo/redo, zoom, Fit, Labels, Focus; the status's hints run along the
board's foot (`StatusHints`) beside the hover readout (`HoverReadout.tsx`). An empty board shows how
to start (`EmptyBoardHint.tsx`: the board it's on, with Change to set it up there, then Start from
scratch, which puts the card away, the 555 blinker example, or Design it with AI, a link to the
`mcp-server/` page). A new project's card in the Projects dialog asks for its name and its
board (`BoardSetupFields.tsx`, the same fields as the empty board's Change; `src/features/project/new-board.ts` starts it
from the board picked last time). Actions on the selection live in `src/ui/board/selection-actions.ts`: the context
menu (`BoardMenus.tsx`; the core's `board-menus.ts` says which menu is open, where) and the
selection bar floating over the board (`SelectionBar.tsx`) show only the actions that apply
(`availableActions()`). Icons are `<Icon name="…"/>` (`src/ui/components/Icon.tsx`, one SVG sprite
that `App` renders); use them, not emoji.

**Questions**: ask with `askText`/`askConfirm`, and tell with `tell` (`src/features/ask-dialog.ts`,
which holds the open question; `src/ui/dialogs/AskDialog.tsx` shows it), never
`prompt()`/`confirm()`/`alert()` (embedding pages may block them, and they freeze the page). Placing a part returns to Select with it selected; Shift-click
keeps the tool armed (`BoardClick.keepArmed`).

**Phone layout**: on a small or touch screen (one media query, in both the end of `src/style.css`
and `PHONE_QUERY` in `src/ui/hooks/use-media-query.ts`; keep them the same) the board fills the
screen, a bottom toolbar (`src/ui/mobile/MobileNav.tsx`: Select, Wire, Solder, Add, Nets, More)
opens slide-up sheets (Add and More are the left panel `#controls` with a `data-view`: Add the
parts, More the tool modes, wire and board; Nets is the right panel; which one is open is
`layoutStore`'s `sheet`, `src/ui/layout/layout-store.ts`), and the board toolbar, the status's hints
with it, floats over the board. Nothing may resize the board's area mid-gesture (the readout along
its foot keeps its line when empty), or the board jumps under the finger.

**UI and core**: the editor is a React app (`app/index.html` mounts `src/ui/main.tsx`) over a
framework-free core. The core (`src/features/`, `src/state/`) owns the editor's state and
behaviour, draws the board on its canvas and takes the board's input; the UI (`src/ui/`) renders
everything else from that state and calls core functions to act. No state-management library.
They meet in two places:
- `src/features/editor.ts`: `BoardCanvas` hands the core its canvas with `attachBoard(canvas,
  viewport)`, then `App` calls `startEditor()` once (shortcuts, the first grid, reopening the last
  project, opening a share link). The core attaches no listeners at import: a module that listens
  does it in an `attach…`/`start…`/`listenFor…`/`track…` function that `editor.ts` calls.
- `src/features/editor-events.ts`: the core calls `notifyEditorChanged()` after any change the UI
  may show (every `redrawCanvas()` does), and a component reads core state with
  `useEditor(select)` (`src/ui/hooks/use-editor.ts`), re-rendering only when what `select`
  returns changes. The core mutates its objects in place, so return primitives or an object the
  core replaces, or pass `shallowEqual` for a fresh array.
UI-only state (the open dialog, sidebars shown, focus mode, the phone's sheet) lives in small
stores (`src/ui/lib/store.ts`): `src/ui/dialogs/dialog-store.ts`, `src/ui/layout/layout-store.ts`.
Components are function components, one per file, grouped by area (`header/`, `sidebar/`,
`catalog/`, `board/`, `nets/`, `dialogs/`, `mobile/`); `components/` holds the shared ones
(`Modal`, `Icon`, `SegmentedControl`, `NumberField`, `BoardSetupFields`), `hooks/` and `lib/` the shared hooks and
helpers. They use the class names in `src/style.css` (no CSS-in-JS). A new feature is functions
in `src/features/` plus a component in `src/ui/` that calls them.

**State** (`src/state/`): plain classes used as static/global singletons (no instances are ever
created — `ClassName.staticField` is the "store"). E.g. `Canvas` (the board's canvas and scrolling viewport, handed over by
`attachBoard`, + 2D context + coordinate mapping), `GridConfig` (grid constants like dot spacing/radius), `DotState` /
`LineState` (the grid and wires, plus hover), `ViewState` (zoom, labels, solder side, the hover
text), `PartState` (every placed part, see below),
`BoardState` (perfboard or stripboard, see below), `HistoryState` (undo/redo stack). Two
discriminated unions keep things apart by construction: `SelectionState.current` (one selected
pad, wire *or* part, or `many` parts and wires, never a pad; set it with
`SelectionState.select()`, which makes one item a `part` or `line`, so `.part`/`.line` mean "the
one selected" and `.parts`/`.lines` give all of them) and `ToolState.active`
(what a click on the board does: a toolbar mode — select/eraser/note/cut — or a placement tool —
wire, solder path, IC, standard or advanced component — with its pending first click). Switch tools through
`setActiveTool()` (`src/features/active-tool.ts`); `resetInteraction()` clears the selection and
drops a placement tool back to Select. The UI's tool and catalog highlights are read from this
state as it renders.

**Tools** (`src/features/tools/`): each `ActiveTool` kind has a `ToolBehavior` —
`onPointerDown`, `drawPreview` (given the board's Painter), `statusText`, optional `stepBack` (Escape) — registered in
`tools/index.ts` and looked up with `behaviorOf(tool)`. Tools only change state; the caller
(`select.ts`, the board's input router, which also owns panning, the context menu and Escape)
redraws, and the UI follows. `select.ts` takes mouse and pen pointer events; fingers go
through `board-touch.ts`, which reuses its exports (tap = click when the finger lifts, one-finger
drag pans or moves a part, two-finger pinch zooms and pans, long press = context menu). A mouse
drag that starts on a hole in Select mode or with the wire tool draws a wire to the hole it ends on,
an L bending the way the pointer moved first (`wire-drag.ts`: `/` flips it, Shift straightens it;
a part's pins wire, its body moves it). A finger's drag never wires (it pans): it wires after a
long press (drag on, a second finger flipping the L, or the menu's Start Wire Here / Start Solder
Path Here, which arms that tool). On the selected wire's handles a finger's drag bends it, held
still first or not (the long press's menu closes as it moves on). The wire tool (`wire-tool.ts`) clicks a route: an empty hole bends the wire (`via`), a
hole it would connect to there (`connectsAt()` in `wire-merge.ts`: a pin, a wire, a stripboard's
strip) ends it; the last hole again or Enter (`ToolBehavior.finish`) ends it on an empty hole, Esc
takes back a bend. The solder path tool (`solder`, <kbd>S</kbd>) is the same behaviour (`routeTool`
in `wire-tool.ts`; `RouteTool`/`isRouteTool()` name the pair, and a drag with it armed draws one)
placing solder paths: an `ILine` with `kind: "solder"`, no colour or width, joining every hole it
covers (Nets below); everything else treats it as a wire. A selected wire's handles (drawn by `layers/wires.ts`) bend it in Select mode
(`wire-reshape.ts`): drag a leg to pull out a bend, drag a bend or an end to move it, double-click
(double-tap) a bend to take it out, the selection bar's Straighten for all of them; the wire changes
live and its new route goes through the wire tool's `routeWire` (as placing does) as one undoable
`replace`, Escape puts it back. **Selecting several**: in Select mode Shift-click adds or removes a
part or wire, and a Shift-drag draws a box (`box-select.ts`) adding everything whose holes it
encloses, live; the selection bar's Select more (`SelectionState.adding`) does the same without
Shift, for a finger; Ctrl+A selects all. A press on one of several selected parts or wires drags
them all (`component-drag.ts`, one `batch` of `move`s; let go unmoved, only that one stays
selected); Delete removes them in one `batch`. `clipboard.ts` copies (Ctrl+C), cuts, pastes (at
the pointer's hole) and duplicates (Ctrl+D, beside the original) as project-file entries, rebuilt
by `project/board-entries.ts` (shared with loading) and placed by `placeItems()` with new refs and
identities. A shortcut's optional `when` lets the key do its usual thing otherwise (Ctrl+C with page
text selected). Keep tool modules free of imports that lead back to
`draw-canvas.ts` (it imports the registry to draw previews), which is why a hole's note operations live in
`dot-notes.ts` and redraw with `requestRedraw()`.

**Features** (`src/features/`): modules of plain functions, each owning one concern (hover,
selection, wires, zoom, nets, shortcuts, project save/load, etc.). They read/
mutate the state classes and call `redrawCanvas()` (`src/features/draw-canvas.ts`) after any
change that affects what's on screen. `redrawCanvas` redraws everything from scratch each call
(immediate-mode style): it hands the board renderer a snapshot of the board (`getSaveJson()`) and
what the editor marks on it (`editorView()`), then draws the active tool's preview on top. See
Rendering below.

**Rendering** (`src/board-render/`): one renderer draws every 2D board — the editor's canvas, PNG
and SVG export, Projects-dialog thumbnails, the catalog's chip icons, the MCP server's pictures —
as `drawBoard(painter, project, view)`: a project file in, shapes out onto a `Painter`
(`painter/painter.ts`: circle/arc/rect/line/polygon/path/text/image/group/stamp, each call carrying
its whole style). Two painters: `CanvasPainter` (`src/features/board-canvas/canvas-painter.ts`,
browser only: Path2D, hole sprites cached per zoom, text snapped to device pixels) and
`SvgPainter` (`painter/svg-painter.ts`, a string, runs anywhere; lets only plain colour syntax
through, since colours come from files anyone can write). `BoardView` (`board-view.ts`) is what to
mark beyond the file — part labels, `holeLabels` (column numbers and row letters printed round the
edge, `layers/hole-labels.ts`; on in the editor and its downloads, off in MCP pictures), `selected`/`hovered` item lists (a part by ref, a wire by index, a
hole by position; a wire's handles only when it's the one thing selected), a placement's `startHole`, a net `highlight`, or `solderSide` (the board from
below for soldering, mirrored with a `flipX` group, every joint marked: `layers/solder-side.ts`,
a jumper broken by a gap round each joint it only passes over: `drawWiresFromBelow()`,
shown read-only by `src/features/solder-view.ts`); `PLAIN_VIEW` is none of it; the
editor builds its own in `src/features/board-canvas/editor-view.ts`. `draw-board.ts` alone fixes
the layer order: board look → under-board parts (chips) → holes (not those under a chip's body;
solder in each joint hole, from `solderJoints()`) →
wires → over-wires parts (the wires again, faded, showing through them) → pin marks (fixed-pin parts'
pins, `drawPinMarks`) → junction dots → part labels → part overlays (chip pin labels) → net
highlight. Parts are drawn by one `PartArtist` per kind (`artists/`, registered in `artists/index.ts`)
from their project-file entries; a standard part's special art (resistor bands, ceramic code, LED
colour) is a `Decoration` in `artists/standard-decorations.ts`. Placed parts don't draw themselves
but hit-test with the same geometry as the drawing (`standardPartSpan`, `advancedPartGeometry`,
the package extents), so clicking and drawing agree. Icons are asked for by file name
(`getIconFile(def)`): the canvas side loads them (`board-canvas/browser-icons.ts`, redrawing when
one arrives; one-off drawings `await browserIcons.ready(iconsUsedBy(project))`), the SVG side is
handed their text. **`src/board-render/` is pure** (it may import only `src/project-file/` and
`src/parts/`), and outside code imports only its `index.ts`.

**Components catalog** (`src/ui/catalog/`): the left panel's Parts section — a
search box over a category tree. It only decides where parts are *listed*; placing them is still
done by the three systems below. `src/parts/catalog-categories.ts` declares the tree (one line per
category, `parentId` for nesting, array order = display order; `CategoryId` is derived from it so a
bad id fails to compile). Every part definition names one `category: CategoryId` plus optional
search `keywords`. `catalog-items.ts` merges all three systems into `CatalogItem`s whose
`activate`/`isArmed`/`remove` closures hide which system backs them (they set/read
`ToolState.active`); `catalog-search.ts` ranks by
match quality (exact > prefix > word prefix > substring > fuzzy) with kind (component >
subcategory > category) only as a tiebreak; `ComponentsSection.tsx` renders it (`CatalogTree`,
`CatalogResults`). The core tells it what's listed changed with `notifyCatalogChanged()`
(`src/features/catalog/catalog-events.ts`: custom parts added, edited, deleted or merged in, a part
placed for "Recently used…"); `catalogItems()` builds the items again only then. The armed
part's highlight follows `ToolState.active`. To add a part:
add a definition to the relevant system's definitions file with a `category` — nothing else. To
add a category: one line in `catalog-categories.ts` (empty categories are hidden).

**Board types**: a board is a perfboard (a separate pad per hole) or a stripboard (copper strips
along every row or column, which the user can cut at a hole). `BoardState.setup` holds the type
and strip direction; change it through `setBoardSetup()` (`src/features/board-type.ts`; the Board section's
switches, `src/ui/sidebar/BoardSection.tsx`, call its `switchBoard()`, and the Cut tool shows only
on a stripboard). Strip cuts live on the
dots (`IDot.cut`), so they survive a resize and are kept, hidden, while the board is a
perfboard. How each type is drawn is its *look*, one file each in `src/board-render/board-looks/`
(`perfboard-look.ts`, `stripboard-look.ts`) behind the `BoardLook` interface (`paintBoard` for
the bare board, strips and cuts, a `hole` stamp per plain hole); `boardLookFor(type)` picks one. Strip and cut
sizes live in `src/project-file/stripboard-geometry.ts`, shared with the 3D viewer so both draw
cuts the same way. A new board type
means a new look there plus a `BoardType` in the project file.

**Two parallel component systems** — don't conflate them. Their definitions are pure data in
`src/parts/`; the placed-part classes live with their editor behaviour in `src/features/`:
- Standard components (`src/features/standard-components/`) — flexible-lead parts (resistor,
  capacitor, LED, diode…) defined by `ComponentDefinition` in `src/parts/component-definitions.ts`.
  Placed by picking a start and end dot; body is drawn between them. Values (e.g. resistance) use
  SI-prefix parsing/formatting in `src/parts/component-value.ts` / `component-value-codes.ts`.
- Advanced components (`src/features/advanced-components/`) — fixed-pin-geometry parts
  (ICs-adjacent, pots, etc.) defined by `AdvancedComponentDefinition` in
  `src/parts/advanced-component-definitions.ts`. Placed via a single anchor dot + rotation;
  pin/shaded-hole/body-outline offsets (in grid units, relative to the anchor) are rotated
  (`rotate-offset.ts`) by the shared part geometry (below). **Custom modules** are fixed-pin parts
  the user makes (`src/parts/custom-parts.ts`: a `CustomPartSpec`, its size in holes, its pins'
  holes in order with optional names, a colour): a placed one has `definitionId: "custom"` and
  carries its whole spec in `custom`, which `customPartDefinition()` turns into an
  `AdvancedComponentDefinition` (`noIcon`: drawn as its colour with its name). A custom part with a
  `shape` (a built-in fixed-pin part's id, e.g. `"transistor"`) is that package renamed, with its
  own pin names: drawn, listed and modelled in 3D as the package (`modelIdFor()`), made in
  `src/ui/dialogs/CustomShapeDialog.tsx`; its `cols`/`rows`/pin holes are the package's, so readers
  without shapes still get the same pins. So look a placed
  fixed-pin part's definition up with `advancedDefinitionFor(part)`, never by its id alone. The
  creator is `src/ui/dialogs/CustomModuleDialog.tsx` (the parts list's one Custom part… entry opens
  `CustomPartDialog.tsx`, which picks between it, the IC editor and the package one), the catalog entries (Modules › Custom) the
  `CustomParts` store in `src/features/custom-parts.ts` (localStorage `custom_parts`, merged in
  from loaded boards and parts library files; placed parts keep their own copy, so editing or
  deleting an entry never changes a board).
- IC chips (`src/features/ic.ts`, `src/ui/dialogs/IcEditorDialog.tsx`) are a third, older placement concept
  (dual-row multi-pin part with labelled pins), separate from both of the above. It backs both
  DIP ICs and dual-row dev boards (Modules › Dev Boards); built-ins are data in
  `src/parts/ic-definitions.ts` (`dualRowPins()` builds DIP numbering from two top-to-bottom rows). Custom
  ones come from the IC editor (`saveCustomIc()`; IC or Module type → ICs › Custom / Modules › Custom) and persist
  in localStorage `custom_ics`. `Ic` is both the catalog entry and the placed chip; `Ic.id`
  identifies the catalog entry, and catalog entries are saved through `Ic.customIcEntries()`,
  which picks its fields (including `category`). Loading *merges* custom ICs into the catalog —
  never replace `Ic.IC_CONTAINER` wholesale, or built-ins added later go missing.
- File → Export / Import Custom Parts (`src/features/project/custom-parts-library.ts`) writes and
  reads a parts library file of the user's custom ICs and modules (`src/project-file/parts-library.ts`,
  format `perfboard-designer-parts`); importing adds what's new, never changing what's there.

**Part geometry** is worked out once, in grid units, in `src/parts/part-geometry.ts`:
`advancedPartShape()` (a fixed-pin part's pins, covered holes, outline, icon anchor, body box),
`advancedPinOffsets()` (its pins before rotation) and `icPins()` (a chip's pins in DIP order, with
their side). Everything uses it — `src/project-file/pin-positions.ts` (nets, MCP),
`src/board-render/artists/advanced-geometry.ts` (the same in drawing px, for the drawing and
`PlacedAdvancedComponent`'s pins and hit test), `Ic.getRealPinPositions` and the 3D viewer — so
never work out pin positions anywhere else.

All three placed-part classes implement `PlacedPart` (`src/interfaces/placed-part.interface.ts`):
hit-testing, pin/occupied positions, anchor dots, `serialize()` (its entry, which the renderer draws) and `ref`, the part's
reference designator (R1, U2…), unique on the board ignoring case. `placePart` gives a new part
the lowest free ref for its kind; the letters come from each definition's `refPrefix` (ICs are
"U"), via `src/project-file/part-refs.ts`. Board-level code
(drag, delete, undo, save, resize) goes through that interface — narrow on `part.kind` only for
kind-specific behavior. They live in one list, `PartState.parts`, kept grouped by kind (ICs →
standard → advanced) so stacking and the per-kind arrays in the save file stay stable; add/remove
via `src/features/placed-parts.ts` (`placePart`/`removePart` record history, `addToBoard`/
`takeOffBoard` don't).

**Undo/redo** (`src/features/project/undo-redo.ts` + `src/state/HistoryState.ts`): every mutation
that should be undoable calls `HistoryState.record(change)` with an `IChange`
(`src/interfaces/change.interface.ts`): `add`/`remove`/`replace` of a line (a placed wire splits
jumpers passing over its end holes to join them, is itself cut where it passes over other wires'
ends, and started or ended at a wire's free end (same kind, and for jumpers the same colour and
width, nothing else in the hole) carries that wire on as one bent wire into one it continues:
`wire-merge.ts`; a solder path joins every hole it covers already, so it's never split or cut; the
selection's Connect to Wire, `connect-wire.ts`, splits the jumpers passing over a hole holding a pin
or a jumper's end the same way, for a part placed after the wire), `add`/`remove`/`move`
of a part, `move` of a wire (its points; moved with a selection), `set` of a strip cut or of the
board setup, or a `batch` of several as one step. `undo`/`redo` replay these and call `redrawCanvas()`. History is cleared whenever the
board is replaced (load, reset, resize) via `resetForNewBoard()`.

**Persistence**: the project file format lives in `src/project-file/` — pure code (no DOM, no
editor state) shared by the editor and the 3D viewer. `project-file.ts` defines the current format
(version 9 adds a jumper's optional `side: "bottom"`, the solder side, which the editor sets with a selected wire's Move to Solder Side action and which only crosses wires on its own face (`wire-crossings.ts`); version 8 adds optional requirements; version 7 part identities; grid `[col, row]` positions, the board type with a stripboard's strip direction and
cuts, only holes with notes, wires with the corners they bend at (`via`) and their `kind` (absent:
a jumper, whose corners never join; `"solder"`: a solder path, which joins every hole it covers;
`wire-path.ts` gives a wire's points, legs and a solder path's holes), per-kind part arrays with
each part's `ref` (a custom module with its whole spec in `custom`), the user's custom ICs). A file
says the oldest version that holds it (`fileVersionFor()`: 9 with a solder-side wire, else 8 with requirements, else 6 with a custom module, else 5 with a
solder path, else 4 if a wire bends, else 3), so boards without them
still open in older editors and the published MCP server. It's
written to be read by people and programs (e.g. the MCP server) as well as the editor: facts
only, nothing derivable (no nets, strip segments or resolved pin positions), every field
documented there. `read-project-file.ts` reads any version (v5: no custom modules; v4: no solder paths; v3: no bends; v2: no board type or refs; files
without `version` are v1: pixel coordinates, every hole, the whole IC catalog) into that shape,
validating everything and throwing `ProjectFileError` for non-projects before the board is
touched; bad entries are skipped and counted (a wire with a corner off the board too), and parts without a usable ref are numbered. `save-project.ts`'s `getSaveJson()` always writes the current format (each part's
`serialize()` returns its entry); `load-project.ts`'s `loadProject(raw)` reads and then rebuilds
the board, pinning wires and parts to the shared dot objects, and merges (never replaces) custom
ICs and custom modules into the catalog. Projects are also kept in the browser: `project-store.ts` is the
`localStorage` layout (two keys per project, its file and `{name, updatedAt}`, so tabs on
different projects never write the same key), `current-project.ts` tracks which one is open
(`ProjectState.current`), opens/creates/imports/deletes them, and autosaves the open one shortly
after any redraw that changed it (via `onRedraw()` in `draw-canvas.ts` — every board change ends
in a redraw) and when the tab is hidden or closed. Its UI is the File menu
(`src/ui/header/AppHeader.tsx`), the header's project name and the Projects dialog
(`src/ui/dialogs/ProjectsDialog.tsx`, a `ProjectCard` per project). **Share links** carry a whole project in the editor URL's
fragment (`#name=…&z=…`, or `json=`/`src=` for links written by people and programs such as AI
agents): the format is the pure `src/project-file/share-link.ts`, documented for outside writers in
`docs/share-links.md` (keep the two in step). `src/ui/dialogs/ShareDialog.tsx` is the Share dialog;
`src/features/project/open-shared-link.ts` opens an incoming link as a new stored project (at
startup, after the last project is reopened, and on `hashchange`), then clears the fragment. **Short links** (`#name=…&p=<id>`) name a copy kept on
Perfboard Designer's project storage (`STORED_PROJECTS_URL` in `share-link.ts`,
`https://projects.perfboarddesigner.com`): the Share dialog makes one on request, beside the full
link it always makes, and a `p=` link is fetched without asking, both through
`src/features/project/project-storage.ts`. The editor knows only that storage's HTTP API
(documented in `docs/share-links.md`), never the MCP server behind it. `PERFBOARD_PROJECTS_URL` when
building or running the editor (`vite.config.ts`'s `define`, `__PERFBOARD_PROJECTS_URL__`) points it
at another copy, e.g. a local Worker, or `off` builds it without short links. **The project must
work without short links and without the Worker**: they're optional extras, contacted only when a
user makes or opens a short link, and the full link is always offered beside them. No feature may
need them. A format change means a new version number plus an upgrade path in the reader —
old files must keep opening. `examples/*.json` are mostly v1 files and double as compatibility
fixtures; the two `*-555-blinker.json` are v3 and are the MCP server's examples.

**MCP server** (`mcp/`): a separate npm package (`perfboard-designer-mcp`, own `package.json`, Node
22+, stdio) that lets AI agents design boards. **It depends on the editor, never the other way
round**: the editor must not import anything from `mcp/` (an ESLint `no-restricted-imports` rule
enforces it) nor know the server exists (only the project storage's documented HTTP API, which the
Worker serves), and inside `mcp/` only `mcp/src/editor.ts` imports the
editor's source — every other server file takes editor code from it, so the whole dependency is
listed in one place. Layout: `create-server.ts` only wires things up, for two entry points:
`server.ts` (stdio) and `worker.ts` (Cloudflare Workers, stateless Streamable HTTP at `/mcp`,
`mcp/wrangler.toml`; `npm run worker:dev` / `worker:deploy`), so tool code must not use Node
APIs; the tools live in `mcp/src/tools/`
by group (`catalog-tools.ts`: list/get parts; `project-tools.ts`: new/edit/get project;
`board-tools.ts`: validate, nets, pin positions, render; `share-link-tools.ts`;
`show-board-tool.ts`), resources in
`resources.ts`; shared tool inputs (`projectId`/`project`, `expectNets`) in `project-source.ts`,
reply formatting in `reply.ts`, wording helpers (holes, plurals, lists) in `text.ts`.
It can: list parts, start a project (`new_project`, blank or
from an example), change it with small ops (`edit_project`, whose wire ends can be pins by name and
whose wires bend at `via` holes; a `path`'s corners are wire ends instead; `solder: true` makes a solder path;
`add_part` can also make a part of the agent's own, `custom` (a custom module, or with `shape` a part in a
catalog package) or `chip` (into `customIcs`), checked by the editor's `readCustomPart()`),
get pin positions, draw it as text (`render_board`, `mcp/src/render-board.ts`), list the board's
nets (`get_nets`), validate it, make and read share links. `make_share_link` also returns `image`:
the Worker's `GET /render.svg?<a share link's fragment>` (`mcp/src/image-requests.ts`, `z=`/`json=`
only, never fetching `src=`), an SVG picture drawn by the editor's own board renderer with the part
icons `build.mjs` bakes in (`mcp/src/board-image.ts`); `GET /render.png?…` serves it as a PNG.
Claude and ChatGPT don't load Markdown images from links, so `show_board` shows the user that
picture in the chat as an MCP App: its tool `_meta.ui.resourceUri` names `ui://perfboard/board-view.html`
(`mcp/src/board-view/`, `view.ts` bundled for the browser into `view.html` by `build.mjs`), which
the client shows in a sandboxed frame and hands the result; the SVG travels in the result's
`_meta.board`, for the page and not the agent. `view.ts` speaks the few MCP Apps messages itself
(the ext-apps `App` class would make the page ~500 KB); the server side uses
`@modelcontextprotocol/ext-apps/server`.
The Worker keeps a copy of every picture and stored project file it serves in each data center's
Cache API (`edgeCached()` in `worker.ts`, only answers that worked, for as long as their
`Cache-Control` says), so a repeat request isn't drawn again. `render_board` with `format: "png"` returns that PNG for the
agent itself to look at (`mcp/src/board-png.ts`): rasterized by resvg-wasm with the Noto fonts in
`mcp/fonts/` baked in; `build.mjs` copies the wasm to `dist/resvg.wasm`, which `server.ts` reads and
the Worker is uploaded with (`wrangler.toml`'s rules), each handing it over via `setResvgWasm`.
Projects being worked on are kept under a
`projectId` (`mcp/src/project-handles.ts`, behind an async `ProjectStore`: in memory for stdio, a
Durable Object per project on the Worker, so a tool that changes a kept entry calls
`saveHeldProject`), only a cache of the project file:
`get_project` returns it, and every tool takes `projectId` or the whole file as `project`.
`edit_project`'s ops (schema in `mcp/src/edit-ops.ts`, one function per op in `edit-project.ts`) only change file entries, all or none, and refuse
a change the reader would drop (e.g. a part pushed off a shrunk board); its reply, like
`new_project`'s, checks the board as `validate_project` does and lists the nets once there are no
errors. `expectNets` given for a projectId is remembered for later checks. Link base URL defaults
to `PERFBOARD_EDITOR_URL` (set in the client's MCP config), else the public site. **Stored
projects** (`mcp/src/stored-projects.ts`) are optional and extra: `make_share_link` with `store`/
`storeAs` also freezes the project under a short id made from a name (a few characters of its
SHA-256 added when the id holds another board), served by the Worker at `projects.perfboarddesigner.com`
(`POST /projects`, `GET /<id>.json|.png|.svg`, `mcp/src/project-requests.ts`), one Durable Object
each (`StoredProjectHolder`, deleted after a year unopened); the stdio server stores through that
HTTP API (`PERFBOARD_PROJECTS_URL`). The stdio server works without the hosted Worker too: its
extras are settings, each the public one unless set, `off` for none (`PERFBOARD_PROJECTS_URL` for
storing, `PERFBOARD_IMAGE_URL` for `make_share_link`'s `image`), and agents are offered only the
ones it has. The self-contained `z=` link is always made too; the short
link is a `p=` share link (a `src=` link to the file when stored anywhere but the public storage).
This is the same project storage the editor's short links use. The server's
`INSTRUCTIONS` must stay under about 2 KB, since clients cut off the rest: keep them to the
workflow and the rules, and put detail in the guide (both in `mcp/src/guide.ts`; the guide is
served as `perfboard://docs/guide`), keeping the two in step. Example projects
(`examples/perfboard-555-blinker.json`, `examples/stripboard-555-blinker.json`) are baked in by
`mcp/build.mjs` (described in `mcp/src/examples.ts`) and served as `perfboard://examples/...`
resources; keep them valid with their `expectNets`. Through `editor.ts` it uses the editor's pure
code (`src/parts/`, `src/project-file/`, `src/board-render/`),
which esbuild bundles with the SDK into
`mcp/dist/server.js` and `mcp/dist/worker.js` (`cd mcp && npm run build`; `npm run typecheck` uses its own newer TypeScript).
So those modules must stay free of DOM and editor state, and anything they import too. Facts the
server tells agents belong in the definitions (e.g. `leadLabels`, which lead of a polarized part is
which), not in `mcp/`. Pin positions from a project file (`src/project-file/pin-positions.ts`, shared with the nets)
come from the shared part geometry (`src/parts/part-geometry.ts`), like the editor's and the
renderer's. What's connected comes only from the shared `computeNets()` and `layoutProjectWires()`
(Nets and Wire crossings below): never write connectivity or crossing logic in `mcp/`; add what's
missing to those modules without reshaping their output, which the Nets panel and canvas use.
`get_nets` (`mcp/src/nets-report.ts`) names pins as agents write them, via `pinName()` in `nets.ts`
("U1.8 VCC", "D1.K", "C1.+", "R1.1"). Beyond the format, `validate_project` (`mcp/src/validate.ts`, one function per check)
warns about a wire passing over a pin without ending there, duplicate wires, a two-lead part with both leads on one net, IC pins and two-lead parts' leads
connected to nothing (not dev boards' or NC pins), wires that connect no pins, supply rails shorted
together (`shortedRails()`: VCC with GND, 5V with 3V3, a battery's two terminals; VCC with 5V is one
rail), polarized parts in backwards (`polarityWarnings()`, below), and on a stripboard, pins of one part shorted by a
strip or sitting in a cut hole. Wires crossing are only listed in its `notes`, never warned about.
Its optional `expectNets` (`mcp/src/expected-nets.ts`: the netlist the agent meant, as lists of
"REF.pin") reports every missing or extra connection as an error, treating the list as complete.
Check server changes with a throwaway script outside the repo that drives the built
`dist/server.js`. `.mcp.json` runs that file as the `perfboard` server, so rebuild after a change; a
running Claude session keeps the old build until it reconnects.

**Nets** (`src/project-file/nets.ts`): which pins the board connects, computed from a project file
and nothing else (`computeNets(project)`), so the editor and any program reading the file (the MCP
server) always agree. A jumper wire
joins only its two end holes; a solder path joins every hole it covers (but a cut one) and any
solder path it touches; things in one hole are joined; on a stripboard a strip joins its holes up
to the next cut, and a cut hole joins nothing. Nets are derived — never saved in the file.
The editor shows them live in the right panel above the shortcuts (`src/ui/nets/NetsPanel.tsx`),
kept by `src/features/board-nets.ts`, which works them out again from `getSaveJson()` shortly after
a redraw that changed the board. Each pin carries its part's catalog icon, and a Short / Detailed
switch (remembered, `nets_view`) shows pins as chips or as a line each with the part's name, value
and what the pin is ("cathode (K)", "pin 8 · VCC"): `src/ui/nets/part-info.ts` (from
`partList()`), drawn by `PinList.tsx`, which Required connections uses too; a rail's net has a
ground or supply icon. Unconnected pins
and wires connecting no pins are in folds above the nets (likely mistakes, kept in sight). Clicking a net, an unconnected pin or
such wires lights it up on the board until clicked again: `NetHighlightState` holds its holes and
wires, drawn by the renderer (`view.highlight`, `src/board-render/layers/net-highlight.ts`), and `board-nets.ts` moves it to whichever net holds most of its pins
after each change (most of its wires, for wires connecting no pins).

**Supply rails and polarity** (`src/project-file/rails.ts`, `src/project-file/polarity.ts`), from a
project file and its nets alone like the nets. A net is a rail when its pins are named after one
(the nets' rail names, `isPowerName()`: a chip's VCC/GND, a module's 5V), when it holds a power
source's terminal (a definition's `powerSource`: a battery holder's + is the positive supply, its −
ground) or when one of its holes has a rail's name as its note ("+9V"); `supplyRails()` says which
side each is (positive, ground, negative; VSS/VEE/V- is ground unless the board's ground is another
net), and `shortedRails()` the nets joining rails that can't be one. `polarityWarnings()` names
polarized parts the rails show to be the wrong way round: an LED, an electrolytic capacitor or a
part with + and − pins (a buzzer) with an end on the wrong rail, or a plain diode conducting
straight across the supply (one with its cathode on VCC is a flyback diode, not a mistake). Only
what the rails settle is reported: a part between two signals is never judged. The editor lists
them in the Nets panel's open fold above the others (`src/ui/nets/PolarityWarnings.tsx`, kept by
`board-nets.ts`): a click selects the part, and a two-lead part turns round from there or with the
selection's Turn round (`src/features/part-polarity.ts`: its leads swap holes, one undoable `move`).
The MCP server warns about each in `validate_project`.

**Component list** (`src/project-file/part-list.ts`): the parts as a bill of materials, from a
project file alone like the nets: each part's ref, catalog name, value with its unit (an LED's
colour by name: the LED colours, names and paints, live in `src/parts/component-definitions.ts`),
type and pin 1's hole, or grouped by part and value, and either as CSV. The editor shows it in
File → Component List (`src/ui/dialogs/PartListDialog.tsx`, a click selects the part) and
downloads what it shows.

**Wire crossings** (`src/project-file/wire-crossings.ts`): jumper wires are insulated, so where
one runs across another wire, or over a hole holding a pin, a lead or another wire's end, it goes
*over* it (of two crossing wires, the later one in the list), and so does a bend sitting on such a
hole; where three or more things meet at a hole they're joined. Solder paths (on the copper side,
joining what they touch) play no part in it; the 2D renderer draws them under the jumpers as a
trail of solder with a bead on each hole, the 3D viewer flat along the bottom face. `layoutWires()` works this out leg
by leg (each hop says which `leg`) from wire ends, corners and pin holes, and
`layoutProjectWires()` from a project file: the 2D renderer draws it (`src/board-render/layers/wires.ts`:
each bend rounded off, a dark edge either side of a wire where it goes over something, and a solder dot at each junction), and the 3D viewer
bends its tube at each corner and arches the upper wire over each crossing. In the editor, `ILine.via`
holds a wire's corners and `src/features/line-path.ts` its geometry (hit-testing, splitting a wire
at a hole it runs over or bends at).

**3D viewer** (`src/viewer-3d/`): a read-only three.js view of the board, kept separate from the
editor on purpose. It only consumes project-file JSON, read by the shared `src/project-file/`
reader and laid out in pixels by its own `project-data.ts`, and never imports editor state classes
— only pure data modules (the project-file reader, component definitions, value parsing/color
codes, `rotateOffset`). The editor side is just
`src/features/open-3d-view.ts`, which snapshots `getSaveJson()` and lazy-imports the viewer, so
three.js stays out of the main bundle. Scene units are mm (50px grid = 2.54mm pitch). Export 3D
(`export-model.ts`) saves a copy of the board as a `.glb`, scaled to metres (glTF's unit), with
instanced meshes made plain, each part's group named as the component list names it ("R1 Resistor
10kΩ"); the GLTFExporter is imported only when it's used.

**Canvas coordinates**: mouse events are mapped to canvas drawing-space coordinates via
`Canvas.toDrawingCoordinates(e)`, which accounts for CSS scaling of the canvas element (its
rendered size vs. its `width`/`height` attributes) — always go through this helper rather than
using `clientX`/`clientY` directly.

**Shortcuts**: keyboard shortcuts go into `ShortcutRegistry` (`src/features/shortcut-keys.ts`)
rather than ad hoc `keydown` listeners: the editor's are listed in
`src/features/keyboard-shortcuts.ts`, and a UI control adds its own while it's on screen with
`useShortcut()` (`src/ui/hooks/use-shortcut.ts`). The shortcuts legend
(`src/ui/nets/ShortcutsLegend.tsx`) lists the registry. While a dialog is open no key reaches them
(`Modal` stops them), so the board's keys never act behind a dialog.

**DOM**: the page is React's. The core touches only the board's canvas and viewport (`Canvas`,
handed over by `attachBoard`) and short-lived elements it makes itself (download links, the colour
input in `pick-color.ts`). It never looks elements up with `document.getElementById`: give it
state for the UI to read instead.
