import {GridPos} from "./grid";
import type {CustomPartSpec} from "../parts/custom-parts";
import type {CircuitRequirements} from "./requirements";

// The project file format, version 8. Positions are grid [column, row] pairs counted from the
// top-left hole (column = left to right, row = top to bottom), not pixels, and only holes with a
// note are listed. Older files are still read, see read-project-file.ts:
// - version 7: the same, minus circuit requirements (`requirements`).
// - version 6: the same as 7, minus part identities (a placed part's `instanceId`).
// - version 5: the same as 6, minus custom parts (a fixed-pin part's `custom`).
// - version 4: the same as 5, minus solder paths (a wire's `kind`).
// - version 3: the same as 4, minus bent wires (a wire's `via`).
// - version 2: the same as 3, minus the board type (always a perfboard) and part refs.
// - version 1 (no `version` field): pixel coordinates, every hole listed, the whole IC catalog.
export const PROJECT_FILE_VERSION = 8;

// A file says the oldest version that holds everything in it: 8 with requirements, else 6 with a
// custom part, else 5 with a solder path, else 4 if a wire bends, else 3. So a board without them
// still opens in editors and tools from before. Part identities (version 7) don't raise it: older
// readers skip the field, and identities only matter to requirements, which are version 8.
export type FileVersion = 3 | 4 | 5 | 6 | typeof PROJECT_FILE_VERSION;

export function fileVersionFor(project: Pick<ProjectFile, "wires" | "placedAdvancedComponents" | "requirements">): FileVersion {
  if (project.requirements) return PROJECT_FILE_VERSION;
  if (project.placedAdvancedComponents.some(part => part.custom)) return 6;
  if (project.wires.some(wire => wire.kind === "solder")) return 5;
  return project.wires.some(wire => wire.via?.length) ? 4 : 3;
}

export type Rotation = 0 | 90 | 180 | 270;

// A perfboard has a separate copper pad around every hole: nothing is connected until it's wired.
// A stripboard has long copper strips instead, each connecting a whole line of holes.
export type BoardType = "perfboard" | "stripboard";

// Which way a stripboard's strips run. "horizontal": every hole in the same row is on one strip.
// "vertical": every hole in the same column is.
export type StripDirection = "horizontal" | "vertical";

export interface SavedPerfboard {
  type: "perfboard";
  cols: number;
  rows: number;
}

export interface SavedStripboard {
  type: "stripboard";
  cols: number;
  rows: number;
  strips: StripDirection;
  // Holes where the strip is cut (drilled through). A cut splits its strip in two, and the cut
  // hole itself connects to neither side: a lead in it is connected to nothing.
  cuts: GridPos[];
}

export type SavedBoard = SavedPerfboard | SavedStripboard;

// A hole with a note on it ("+9V", "GND", "to battery"). Purely a label: it says nothing about
// what's connected. (Files from before notes were the only mark may give a hole a `color` too;
// it's ignored.)
export interface SavedPad {
  at: GridPos;
  note: string;
}

// What a wire is made of (version 5):
// - "jumper": an insulated jumper wire on the component side. It joins the holes at its two ends
//   and nothing else: not the holes it passes over, and not its corners.
// - "solder": a solder path, a trail of solder bridging pad to pad on the copper side. Bare metal,
//   so it joins every hole it runs over: its ends, its corners and each hole along the way
//   (solderPathHoles() in wire-path.ts), and any solder path it touches. A cut hole on a
//   stripboard has no copper for it to join, so whatever is in one stays unconnected.
export type WireKind = "jumper" | "solder";

// A wire: a jumper unless `kind` says otherwise.
export interface SavedWire {
  from: GridPos;
  to: GridPos;
  // Where it bends on its way from `from` to `to`, in order (version 4): it runs straight from
  // hole to hole through these. A jumper's corner is a bend over a hole, never a joint; a solder
  // path's joins that hole like the rest of its holes. Absent: straight.
  via?: GridPos[];
  // Absent: "jumper". Only solder paths say it.
  kind?: WireKind;
  // A jumper's insulation colour and thickness (drawing px). A solder path has neither.
  color?: string;
  width?: number;
}

// Every placed part has a `ref`: its reference designator (R1, C2, U1...), unique on the board
// ignoring case. See part-refs.ts.

export interface SavedIc {
  instanceId?: string;
  ref: string;
  name: string;
  // Pin columns and rows as placed, i.e. already swapped by any 90/270 rotation.
  widthPin: number;
  heightPin: number;
  rotation: Rotation;
  pinDescription: Record<number, string>;
  // Top-left pin.
  at: GridPos;
  // The catalog category the chip was placed from; "modules…" parts are drawn as boards. Absent in
  // files from before this was recorded.
  category?: string;
}

export interface SavedStandardComponent {
  instanceId?: string;
  ref: string;
  definitionId: string;
  from: GridPos;
  to: GridPos;
  value?: string;
  color?: string;
}

export interface SavedAdvancedComponent {
  instanceId?: string;
  ref: string;
  definitionId: string;
  // The anchor pin (the definition's pins[0]), or a grid-sizable block's top-left pin.
  at: GridPos;
  rotation: Rotation;
  rows: number;
  cols: number;
  value?: string;
  // A user-made part (version 6, definitionId "custom"): its whole definition, so the board needs
  // nothing else to draw it and know its pins (src/parts/custom-parts.ts): `name`, `cols` x `rows`
  // holes of body, its `pins` in order, each `at` a [column, row] within the body from its top-left
  // hole with an optional `label`, and optionally `refPrefix`, `color` (the body's) and `id` (its
  // entry in the editor's catalog). `at` above is pin 1's hole. With `shape`, the id of a built-in
  // fixed-pin part (e.g. "transistor", a TO-92), it's that part's package with its own name and pin
  // names: the package decides its pins' holes (`cols`, `rows` and each `at` are written to match,
  // so a reader without shapes still finds the same pins) and how it's drawn; `color` is unused.
  custom?: CustomPartSpec;
}

// A user-made IC catalog entry. Loading a file adds these to the catalog (keyed by id) rather
// than replacing it.
export interface SavedCustomIc {
  id?: number;
  name: string;
  widthPin: number;
  heightPin: number;
  pinDescription: Record<number, string>;
  // Where the part is listed in the Components panel; absent in files from before the catalog.
  category?: string;
}

export interface ProjectFile {
  requirements?: CircuitRequirements;
  version: FileVersion;
  board: SavedBoard;
  pads: SavedPad[];
  wires: SavedWire[];
  // One array per kind, each in stacking order (see PartState.parts).
  placedIcs: SavedIc[];
  placedStandardComponents: SavedStandardComponent[];
  placedAdvancedComponents: SavedAdvancedComponent[];
  customIcs: SavedCustomIc[];
}
