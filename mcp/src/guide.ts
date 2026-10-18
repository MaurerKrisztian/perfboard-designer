// What the server tells agents about using it: its instructions, sent when a client connects, and
// the full guide, served as the resource perfboard://docs/guide. Keep the two in step.

// Kept short: clients cut instructions off at about 2 KB. The rest is in the guide below.
export const INSTRUCTIONS = `Perfboard Designer (https://perfboarddesigner.com) is a browser editor for perfboard and stripboard layouts. You design a board here as a project file and give the user a link that opens it in the editor. The goal is a board that's right, looks neat and is easy to solder.

1. list_parts with no query: every part. Then get_part with ids: every part you use, in one call.
2. new_project (cols, rows, type) returns a projectId: pass it to every other tool.
3. edit_project: place parts (add_part) and route wires (add_wire with from/to, or a path with corners; ends can be pins by name, "U1.7", "D1.K"), all ops or none. Its reply gives where pins landed, the board's problems and, once there are no errors, its nets. Give expectNets (your netlist, e.g. [["U1.8", "R1.1"], ...]) once and every missing or extra connection is an error from then on. render_board draws the board as text to show free space, or with format "png" as a picture to look at.
4. Fix every error; warnings are likely mistakes.
5. Make it neat and solderable: look at render_board format "png". Parts in tidy rows near what they connect to, connectors at edges; straight wires, few corners and crossings, none over a part. Rework it, then check again.
6. make_share_link: give the user the link (and with store: true, where offered, a short one too). show_board shows them the board in the chat, where the client shows MCP Apps.

Rules: holes are [column, row] from the top-left hole, from 0, 2.54 mm apart. A hole holds one part's pin or lead at most (two parts in one hole is an error) plus any number of wire ends, and everything in it is joined: to connect two parts, run a wire between their pins. A wire joins only the holes at its ends and corners, never a hole it passes over; wires may cross (no short, but avoid it). On a stripboard each strip joins its holes up to a cut (add_cuts).

The full guide, with more on all this and on changing a board the user shares (read_share_link): the resource perfboard://docs/guide.`;

export const GUIDE = `# Designing a board with Perfboard Designer

Perfboard Designer (https://perfboarddesigner.com) is a browser editor for perfboard and stripboard layouts. With these tools you design a board as a project file (JSON, format version 3) and give the user a link that opens it in the editor, where they can see and change it. The goal is a board that's electrically right, looks neat and is easy to solder by hand: the user will build it.

## Workflow

1. list_parts with no query: every part, by category, in one call. Then get_part with ids: every part you use, in one call: its pins, polarity and footprint.
2. new_project (cols, rows, type): a blank board, kept here under a projectId. Pass the projectId to every other tool instead of the whole project file. (new_project with example starts from an example project; see the perfboard://examples resources.)
3. edit_project with a list of ops: place parts (add_part with the part's id and "at", or "from" and "to" for a two-lead part) and route wires (add_wire with "from" and "to", or a "path" of holes for a wire with corners; any of these can be a pin by name, "U1.7" or "D1.K", for the hole it's in). If any op can't be done, none are. Each reply says where the new parts' pins landed and checks the board; once it has no errors, the reply lists its nets too.
4. Check the circuit is the one you meant: the nets in edit_project's reply (pins named like "U1.8 VCC", "D1.K", "R1.1"), or get_nets for junctions and crossings too. Give expectNets (your netlist, e.g. [["U1.8", "U1.4", "R1.1", "J1.1"], ...]) once, to edit_project or validate_project, and every missing or extra connection is reported as an error from then on. render_board draws the board as text, one cell per hole: use it to see free space and where wires run before you place or route more. With format "png" it draws a picture of the board instead, as the editor shows it: look at it to see how the board comes out, e.g. a part's body reaching off the board, labels and wire colours. A big board's picture is scaled down; give area to zoom in.
5. Fix every error. Warnings are likely mistakes, such as two pins of one part shorted by a strip or a resistor's two leads joined by wires, a wire passing over a pin without joining it, a lead or wires connected to nothing, or two supply rails shorted. validate_project lists notes too.
6. Make it neat and solderable (see Laying it out well): look at render_board with format "png", then move parts and reroute wires until it's tidy, and check again (errors, warnings, expectNets). Don't stop at the first board that's right.
7. make_share_link with the projectId: give the user the link it returns. The link carries the whole board and needs no server; a server may also offer these extras. It returns "image", the address of an SVG picture of the board as the editor draws it: show it where images from links display, e.g. Markdown ![board](image) (Claude and ChatGPT don't load those). With store: true (or storeAs: "led-blinker", the id you'd like), the project is also stored on the Perfboard Designer server, and "stored" gives its id, a short link, its file and its pictures (png too, for places that don't show SVG). Give the user both links: the short one needs the server, the long one works without it. A stored project never changes: store again after changing the board, for a new id.
8. show_board shows the user the board right in the chat, as the editor draws it, with a button that opens it in the editor: in clients that show MCP Apps (e.g. Claude, ChatGPT), where a Markdown image from a link isn't shown. Elsewhere it shows nothing, so give the link too. The picture goes to the user, not to you: render_board with format "png" is the one for you to look at.

## The board

Positions are [column, row] holes counted from the top-left hole, both from 0. Neighbouring holes are 2.54 mm (0.1") apart.

## What can share a hole

A hole holds at most one part's pin or lead: a second part's pin or lead in the same hole, or a pin in a hole under another part's body, is an error ("Hole [c, r] is used twice"), as it would be on a real board. Wire ends are different: any number of them can end in a hole, with or without a pin there, but not in a hole under a part's body. Everything in one hole is joined. So to connect two parts, run a wire from one's pin to the other's ("U1.1" to "R1.1"), never put both in one hole. A wire end in a hole with no pin and no other wire is a loose end (a warning, on a perfboard).

## How things connect

Wires are insulated jumpers: a wire joins only the holes at its two ends (and a path's corners), never a hole it passes over, and wires may cross each other (that's not a short, but avoid it: see Laying it out well). On a stripboard, every hole along a strip is already connected up to the next cut, and a cut hole connects to nothing: cut strips (add_cuts) to separate them, e.g. under a chip so its two pin rows aren't shorted.

## Laying it out well

A board that's right isn't done until it looks neat and someone can easily solder it. Prefer a readable, compact, physically practical layout, like one a person would lay out by hand, over the shortest total wire length:

- Place parts first, wires after. Put the main chip or module near the middle and each part close to the pins it connects to, so most wires are short. Keep parts that belong together (a timing resistor and capacitor, a decoupling capacitor and its chip's supply pins) next to each other.
- Line parts up: two-lead parts straight (horizontal or vertical) and in tidy rows, polarized parts the same way round where you can, and a gap of a hole or two between parts for wires and fingers. Leave the board no bigger than it needs to be, with a hole or so of margin at the edges.
- Follow the signal: inputs and connectors at one edge, outputs at the other, and supply rails (VCC, GND) along the edges or in a row each, so they're easy to follow and to reach.
- Leave room to solder: every lead straight and fully on the board, and a part's body not covering holes that wires or other parts need.
- Route wires straight, horizontal or vertical, with as few corners as possible; never diagonal unless it's a very short hop. Avoid crossings: they're allowed (wires are insulated), but every one makes the board harder to follow and to build. Moving a part or swapping which way it's placed often removes one.
- Don't run wires over parts' bodies or across chips: go around them. Don't run a wire across a hole holding a pin it doesn't connect to (validate_project warns about that).
- On a stripboard, let the strips do the connecting: place parts so pins that share a net sit on one strip, and use wires and cuts only where strips can't.
- Look at the board as you go: render_board shows free space as text; with format "png" you see it as the user will. Tidy it up before you give the user the link: fewer crossings, fewer corners, straighter rows. Never break a connection to make it look better.

## More

get_project returns the whole file. Kept projects don't last forever (on your computer, only while the server runs; hosted, 30 days unused); a whole project file works in place of a projectId everywhere. To change a board the user shares with you, read it with read_share_link: it returns a projectId to edit. The format is documented in the resource perfboard://docs/project-file, links in perfboard://docs/share-links, and the whole parts catalog is perfboard://parts.
`;
