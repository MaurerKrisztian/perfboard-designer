import * as z from "zod";
import {holeInput as hole} from "./project-source";

// The ops edit_project takes, as the schema agents see. Applied by edit-project.ts.

// A wire end: a hole, or a pin by name, which stands for the hole it's in.
const wireEnd = z.union([z.array(z.number().int()).length(2), z.string()])
  .describe('A hole [column, row], or a pin by name: "U1.7", "U1.DISCH", "D1.K", "R2.1" (the hole that pin is in).');
const rotation = z.union([z.literal(0), z.literal(90), z.literal(180), z.literal(270)]);
const wireSelector = z.union([z.number().int().min(0), z.array(hole).length(2)])
  .describe("A wire by its index in wires, or by its two end holes [[c, r], [c, r]] (either way round).");

// A part of the agent's own, for one the catalog doesn't have: pins anywhere on a body, or a catalog
// part's package with its own name and pin names. Saved whole in the placed part's `custom`.
const customPart = z.object({
  name: z.string().describe('What it is, e.g. "HC-SR04", "BC337". Later add_part ops can place more of it by this name.'),
  shape: z.string().optional().describe('The id of a fixed-pin part from list_parts whose package this part comes in, e.g. "transistor" (TO-92) for a BC337 or "mosfet" (TO-220) for an IRLZ44N: its pins, outline and look, with this part\'s name and pin names. Any fixed-pin part but header-pins. Leave out for a body of your own with pins anywhere.'),
  pins: z.array(z.object({
    at: hole.optional().describe("Without shape: the pin's hole [column, row] within the body, from its top-left hole. With shape: leave out, the package decides."),
    label: z.string().optional().describe('Its name, e.g. "VCC", "TRIG", "B". Wire to it by name ("M1.VCC").'),
  })).optional().describe("In pin order, pin 1 first; pin 1 is the hole add_part's `at` places it by. Without shape: every pin with its `at`. With shape: just their names, in the package's pin order (get_part gives it), as many as it has pins."),
  cols: z.number().int().min(1).optional().describe("Without shape: the body's width in holes. Default: just wide enough for its pins."),
  rows: z.number().int().min(1).optional().describe("Without shape: the body's height in holes. Default: just tall enough for its pins."),
  refPrefix: z.string().optional().describe('Letters of its refs: "Q" makes Q1, Q2. Default: the package\'s, else "M".'),
  color: z.string().optional().describe('Without shape: the body\'s colour, "#rrggbb", e.g. a blue module board "#1d4ed8".'),
});

// A dual-row chip or dev board of the agent's own, like the editor's custom ICs: saved in the
// project's customIcs and placed as a chip.
const customChip = z.object({
  name: z.string().describe('What it is, e.g. "LM358", "ESP32 DevKit". Later add_part ops can place more of it by this name.'),
  pinsPerSide: z.number().int().min(2).describe("Pins in each of its two rows."),
  width: z.number().int().min(2).describe('Columns from one pin row to the other, both included: 4 for a narrow (0.3") DIP, 7 for a wide (0.6") one; a dev board\'s row spacing in holes plus one.'),
  pins: z.array(z.string()).optional().describe('Pin names in DIP order: pin 1 at the top of the left row (at rotation 0), down the left row, then up the right row, so the last pin is at the top right. "" for a pin without a name.'),
  board: z.boolean().optional().describe("true: a dev board or module (drawn as a board, listed under Modules); else a DIP chip."),
});

export const editOp = z.discriminatedUnion("op", [
  z.object({
    op: z.literal("add_part"),
    part: z.string().optional().describe('The part\'s id from list_parts ("resistor", "ne555", "header-pins"), or the name of a custom part or chip the project already has. Give this, `custom` or `chip`.'),
    custom: customPart.optional().describe("Instead of `part`, a new part of your own for one the catalog doesn't have, placed by `at` and `rotation`."),
    chip: customChip.optional().describe("Instead of `part`, a new dual-row chip or dev board of your own, placed by `at` (its top-left pin) and `rotation`."),
    ref: z.string().optional().describe("Its reference designator. The next free one (R1, R2...) when left out."),
    from: hole.optional().describe("Two-lead parts: the hole of lead 1. On a polarized part get_part's leadLabels say which that is: K for a diode or LED, - for an electrolytic."),
    to: hole.optional().describe("Two-lead parts: the hole of lead 2."),
    at: hole.optional().describe("Other parts: pin 1's hole (a chip's or pin block's top-left pin)."),
    rotation: rotation.optional().describe("Other parts: 0 (default), 90, 180 or 270, clockwise."),
    rows: z.number().int().min(1).optional().describe("Pin blocks (header-pins): rows of pins."),
    cols: z.number().int().min(1).optional().describe("Pin blocks (header-pins): pins per row."),
    value: z.string().optional().describe('E.g. "10k", "100n".'),
    color: z.string().optional().describe('Two-lead parts, e.g. an LED\'s "#ef4444".'),
  }),
  z.object({
    op: z.literal("update_part"),
    ref: z.string(),
    by: hole.optional().describe("Move it by [columns, rows]."),
    from: hole.optional(),
    to: hole.optional(),
    at: hole.optional(),
    rotation: rotation.optional().describe("Turns about `at`; a chip's widthPin and heightPin are swapped to match."),
    rows: z.number().int().min(1).optional(),
    cols: z.number().int().min(1).optional(),
    value: z.string().optional().describe('"" removes it.'),
    color: z.string().optional().describe('"" removes it.'),
    newRef: z.string().optional(),
  }),
  z.object({op: z.literal("remove_parts"), refs: z.array(z.string()).min(1)}),
  z.object({
    op: z.literal("add_wire"),
    from: wireEnd.optional(),
    to: wireEnd.optional(),
    via: z.array(hole).optional()
      .describe("With from/to: the holes the wire bends at on its way, in order, to route it around things as one wire. A bend joins nothing, like a hole the wire passes over, so it's soldered only at its two ends."),
    path: z.array(wireEnd).min(2).optional()
      .describe("Instead of from/to: holes (or pins) to run through in order, made into one wire per leg. Each corner is a wire end, so it joins whatever is in that hole. For corners that only bend, use from/to with via."),
    solder: z.boolean().optional()
      .describe("true: a solder path instead of a jumper wire, a trail of solder on the copper side, made as one path (a `path`'s corners and any `via` are its bends). Bare solder joins every hole it runs over, ends, bends and all, and every solder path it touches: run it only over holes it should connect. No color or width."),
    color: z.string().optional(),
    width: z.number().positive().optional(),
  }),
  z.object({
    op: z.literal("update_wire"),
    wire: wireSelector,
    from: wireEnd.optional(),
    to: wireEnd.optional(),
    via: z.array(hole).optional().describe("Its bends, replacing the ones it has; [] makes it straight. Left out, its bends stay."),
    color: z.string().optional(),
    width: z.number().positive().optional(),
  }),
  z.object({
    op: z.literal("remove_wires"),
    wires: z.array(wireSelector).min(1).describe("Indexes are as they stand before this op, so list several in one op."),
  }),
  z.object({
    op: z.literal("set_board"),
    cols: z.number().int().min(1).optional(),
    rows: z.number().int().min(1).optional(),
    type: z.enum(["perfboard", "stripboard"]).optional(),
    strips: z.enum(["horizontal", "vertical"]).optional().describe("A stripboard's strips."),
  }),
  z.object({op: z.literal("add_cuts"), at: z.array(hole).min(1).describe("Stripboard holes to cut the strip at.")}),
  z.object({op: z.literal("remove_cuts"), at: z.array(hole).min(1)}),
  z.object({
    op: z.literal("set_pad"),
    at: hole,
    note: z.string().optional().describe('A label on the hole, such as "+9V", "GND" or "to battery". Left out (or "") removes it.'),
  }),
]);

export type EditOp = z.infer<typeof editOp>;

// One op of the given kind.
export type Op<K extends EditOp["op"]> = Extract<EditOp, {op: K}>;
