# Demo and tutorial videos

Scripted screen recordings of the editor: a scene says what to do ("place a resistor from A5 to A9",
"click this net", "show this caption") and `record.cjs` plays it in a headless browser and saves an MP4.
Re-record after a UI change instead of filming by hand.

This is not test tooling and nothing here is a dependency of the app: it uses a Playwright and an
`ffmpeg` already on the machine (both are in Claude Code's cloud environment; elsewhere
`npm i -g playwright && npx playwright install chromium`, plus ffmpeg).

## Record

```bash
node tools/demo-video/record.cjs scenes/overview.cjs --out docs/media/demo.mp4
```

Several scenes at once go to a folder, each named after its scene. The editor's tour's
clips are made this way:

```bash
node tools/demo-video/record.cjs tools/demo-video/scenes/tour/*.cjs --out-dir assets/tour
```

Options: `--size 1920x1080` (default 1280x720), `--width 960` (scale the output), `--crf 28`
(higher is smaller and blurrier), `--speed 2` (play it faster), `--url http://localhost:3000/app/`
to use a dev server that's already running. A scene can set the same as `module.exports.options = {size, width, crf, speed, crop: {x, y, width, height}}`; the command line wins. Each clip gets a
`.webp` poster beside it, its last frame, which a page shows until the clip plays. Don't edit the
editor's source while recording: the dev server reloads the page. A fresh dev server reloads it too,
the first time a page needs a dependency it hasn't prepared; the recorder loads the editor once
before filming, and records a scene again when the page reloads during it. Without `--url` it starts one on port 3020 (short links off) and
stops it afterwards. It needs the dev server, not a production build: scenes aim at holes through
`window.__perfboard` (docs/testing-with-agents.md).

## Write a scene

A scene is `scenes/<name>.cjs` exporting `async d => { ... }`. `d` (`director.cjs`) has:

| Call                                      | Does                                                                                                                                     |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `blank(name, cols, rows, type?)`          | Opens an empty board (`"perfboard"` or `"stripboard"`).                                                                                  |
| `open(name, file)`                        | Opens a project file: an object, or a path in the repo like `"examples/perfboard-555-blinker.json"`.                                     |
| `caption(text)` / `say(text, ms)`         | Shows a caption at the bottom (`""` hides it); `say` also holds it for `ms`.                                                             |
| `place(query, ...holes)`                  | Searches the parts list, picks the first result and clicks its holes: start and end for a two-lead part, one anchor for a fixed-pin one. |
| `pickPart(query, nth?)`                   | Just arms a part from the search.                                                                                                        |
| `wire(...holes)`                          | Routes a wire with the wire tool (bends at empty holes), then back to Select.                                                            |
| `clickHole(col, row)` / `dragHoles(a, b)` | Clicks a hole; drags between two.                                                                                                        |
| `click(selectorOrLocator)`                | Glides the cursor to an element and clicks it.                                                                                           |
| `key(k)`                                  | Presses a key, e.g. `"r"` rotates, `"Escape"`.                                                                                           |
| `rollCamera()`                            | Starts the video here: everything before it (opening and setting up a board) is cut.                                                     |
| `wait(ms)`, `settled()`, `glideTo(x, y)`  | Pacing.                                                                                                                                  |
| `page`                                    | The Playwright page, for anything else.                                                                                                  |

Holes are `[col, row]` from the top-left, from 0 (A1 is `[0, 0]`). The cursor is drawn as a yellow
dot so viewers can follow it. Keep captions short, one per step, and give viewers ~2 s to read.

Scenes here: `overview.cjs` (a minute-long tour), `tutorial-first-board.cjs` (building a first
circuit, step by step), and `tour/` (the editor tour's clips, `src/ui/dialogs/TourDialog.tsx`,
also shown in the user guide: short loops without captions, since the text beside them says what
they show).

In a recording, dialogs' backdrops are dimmed without their blur: the headless browser draws the
blur so slowly that the video stops getting frames while a dialog is open.
