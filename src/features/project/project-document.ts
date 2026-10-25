import {solderJoints} from "../../board-render";
import type {SvgIcons} from "../../board-render";
import {computeNets, isPowerNet, Net, Netlist, pinName} from "../../project-file/nets";
import {groupPartList, partList} from "../../project-file/part-list";
import {polarityWarnings} from "../../project-file/polarity";
import type {ProjectFile} from "../../project-file/project-file";
import {shortedRails} from "../../project-file/rails";
import {requiredNetReports} from "../../project-file/requirements";
import {isSolderPath} from "../../project-file/wire-path";
import {BOARD_PRINT_STYLE, boardPicture, boardSizeMm, checkBar, mm, SOLDER_VIEW, TOP_VIEW, trueSizePicture} from "./print-board";
import {escapeHtml, printInFrame} from "./print-frame";
import {componentTable, IconFor, shoppingTable} from "./print-part-list";
import {facts, iconTile, Paper, PAPERS, plural, PRINT_STYLE, tag, today} from "./print-style";
import {embeddedIcons} from "./save-image";

// File › Export PDF: one document about the project, its sections picked in the Export PDF dialog.
// An overview (the board, its figures and how its checks came out), the board from both sides, the
// components and the shopping list, the nets, the checks, and the board at true size to work
// from. Everything comes from the project file, as the editor and the MCP server read it. It prints
// through the browser's own dialog (print-frame.ts), where "Save as PDF" makes the PDF.

export type PdfSection = "overview" | "board" | "components" | "shopping" | "nets" | "checks" | "true-size";

// In the order they're printed, with what the dialog says about each.
export const PDF_SECTIONS: {id: PdfSection; label: string; description: string}[] = [
  {id: "overview", label: "Overview", description: "Name, size and figures, the board, and how its checks came out"},
  {id: "board", label: "Board pictures", description: "The top and the solder side, scaled to the page"},
  {id: "components", label: "Components", description: "Every part with its icon, value and hole"},
  {id: "shopping", label: "Shopping list", description: "Parts grouped by value, with a box to tick for each"},
  {id: "nets", label: "Nets", description: "Which pins each net joins, to check the build with a meter"},
  {id: "checks", label: "Checks", description: "Short circuits, parts in backwards, missing connections"},
  {id: "true-size", label: "True size, 1:1", description: "Top and solder side at 2.54 mm a hole, to lay parts on"},
];

export interface ProjectPdf {
  project: ProjectFile;
  name: string;
  sections: PdfSection[];
  paper: Paper;
  iconFor: IconFor;
}

export async function exportProjectPdf(pdf: ProjectPdf) {
  printInFrame(projectDocument(pdf, await embeddedIcons(pdf.project)));
}

// The page margins (mm), and what's left of a sheet inside them, portrait.
const MARGIN = {top: 14, side: 14, bottom: 16};
const printableArea = (paper: Paper) => ({
  width: PAPERS[paper].width - 2 * MARGIN.side,
  height: PAPERS[paper].height - MARGIN.top - MARGIN.bottom,
});
// What a true-size page's title and check bar take besides the board (mm).
const TRUE_SIZE_EXTRAS = 45;
// What the overview takes besides its board picture, and the Board section besides its two (mm),
// so the pictures are sized to fill the page they're on without spilling off it.
const COVER_EXTRAS = 117;
const BOARD_SECTION_EXTRAS = 83;

// What the board's checks found: problems to fix, and things only worth a look.
interface Checks {
  shorts: ReturnType<typeof shortedRails>;
  backwards: ReturnType<typeof polarityWarnings>;
  required: ReturnType<typeof requiredNetReports>;
  unconnected: Net[];
  stray: Net[];
}

function runChecks(project: ProjectFile, netlist: Netlist): Checks {
  return {
    shorts: shortedRails(project, netlist),
    backwards: polarityWarnings(project, netlist),
    required: requiredNetReports(project, netlist.nets),
    unconnected: netlist.nets.filter(net => net.pins.length === 1),
    stray: netlist.nets.filter(net => net.pins.length === 0),
  };
}

const problemCount = (checks: Checks) =>
  checks.shorts.length + checks.backwards.length + checks.required.filter(report => !report.wired).length;
const noteCount = (checks: Checks) => (checks.unconnected.length ? 1 : 0) + (checks.stray.length ? 1 : 0);

function verdict(checks: Checks, linked: boolean): string {
  const see = linked ? ": see Checks" : "";
  const problems = problemCount(checks), notes = noteCount(checks);
  if (problems) return `<p class="verdict bad">${plural(problems, "problem")} to fix${see}</p>`;
  if (notes) return `<p class="verdict note">No problems found, ${plural(notes, "thing")} to look at${see}</p>`;
  return `<p class="verdict good">No problems found</p>`;
}

function sectionHead(number: number, title: string, intro: string): string {
  return `<header class="section-head"><span class="num">${String(number).padStart(2, "0")}</span>
    <div><h2>${escapeHtml(title)}</h2><p class="muted">${intro}</p></div></header>`;
}

const pinChip = (pin: Net["pins"][number], iconFor: IconFor) =>
  `<span class="pin">${iconTile(iconFor(pin.ref), true)}${escapeHtml(pinName(pin))}</span>`;

const GROUND = /^([ADP]?GND|VSS|V-)$/i;
function railBadge(net: Net): string {
  if (!isPowerNet(net)) return "";
  const ground = net.name?.split("/").every(name => GROUND.test(name));
  return `<span class="badge ${ground ? "ground" : "supply"}">${ground ? "Ground" : "Supply"}</span>`;
}

function netsTable(nets: Net[], iconFor: IconFor): string {
  const body = nets.map(net => `<tr>
      <td class="net-name"><strong>${escapeHtml(net.name ?? `Net (${pinName(net.pins[0])})`)}</strong>${railBadge(net)}</td>
      <td class="net-pins">${net.pins.map(pin => pinChip(pin, iconFor)).join("")}</td>
    </tr>`).join("");
  return `<table class="nets"><thead><tr><th>Net</th><th>Pins it joins</th></tr></thead><tbody>${body}</tbody></table>`;
}

function checkCard(kind: "bad" | "note" | "good", title: string, body = ""): string {
  return `<div class="check ${kind}"><h3>${title}</h3>${body}</div>`;
}

function checksSection(checks: Checks, iconFor: IconFor): string {
  const cards: string[] = [];
  for (const short of checks.shorts) {
    cards.push(checkCard("bad", `Short circuit: ${escapeHtml(short.rails.join(" and "))} are joined`,
      `<p>These supply rails are one net, so the supply is shorted. Find the wire or joint that joins them.</p><div class="chips">${short.pins.map(pin => pinChip(pin, iconFor)).join("")}</div>`));
  }
  for (const part of checks.backwards) {
    cards.push(checkCard("bad", `${escapeHtml(part.ref)} looks backwards`,
      `<p>${iconTile(iconFor(part.ref), true)} The ${escapeHtml(part.part)}: ${escapeHtml(part.detail)}. ${escapeHtml(part.consequence ?? "")} ${escapeHtml(part.fix)}</p>`));
  }
  const required = checks.required;
  if (required.length) {
    const missing = required.filter(report => !report.wired);
    const title = missing.length
      ? `Required connections: ${required.length - missing.length} of ${required.length} wired`
      : `Required connections: all ${required.length} wired`;
    const body = missing.map(report => `<p><strong>${escapeHtml(report.name ?? "A net")}</strong> isn't wired yet: ${report.pins.map(pin => tag(pin.name, !pin.onBoard)).join("")}</p>`).join("");
    cards.push(checkCard(missing.length ? "bad" : "good", title, body));
  }
  if (checks.unconnected.length) {
    cards.push(checkCard("note", `${plural(checks.unconnected.length, "pin")} not connected`,
      `<p>Fine for pins left unused on purpose; otherwise they still need wiring.</p><div class="chips">${checks.unconnected.map(net => pinChip(net.pins[0], iconFor)).join("")}</div>`));
  }
  if (checks.stray.length) {
    cards.push(checkCard("note", `${plural(checks.stray.length, "wire")} ${checks.stray.length === 1 ? "connects" : "connect"} no pins`,
      `<p>Probably left over from an edit: ${checks.stray.length === 1 ? "it joins" : "they join"} nothing to anything.</p>`));
  }
  if (!problemCount(checks) && !noteCount(checks) && !required.length) {
    cards.push(checkCard("good", "All clear", "<p>No short circuits, no parts in backwards, and every pin is connected.</p>"));
  }
  return cards.join("");
}

function trueSizePages(project: ProjectFile, icons: SvgIcons, paper: Paper): {html: string; landscape: boolean} {
  const {width, height} = boardSizeMm(project.board);
  const area = printableArea(paper);
  const fitsPortrait = width <= area.width && height <= area.height - TRUE_SIZE_EXTRAS;
  const fitsLandscape = width <= area.height && height <= area.width - TRUE_SIZE_EXTRAS;
  const landscape = !fitsPortrait && fitsLandscape;
  const warning = fitsPortrait || fitsLandscape ? ""
    : `<p class="warning">At ${mm(width)} × ${mm(height)} mm this board is bigger than ${PAPERS[paper].label} paper: print these pages on larger paper, or they'll be cut off.</p>`;
  const page = (title: string, view: typeof TOP_VIEW, prefix: string) => `
    <section class="page true-page${landscape ? " landscape" : ""}">
      <h2 class="true-title">${title} <span class="muted">· true size, ${mm(width)} × ${mm(height)} mm</span></h2>
      ${warning}
      ${trueSizePicture(project, view, icons, prefix)}
      ${checkBar()}
    </section>`;
  return {
    html: page("Top: the component side", TOP_VIEW, "t1-") + page("Solder side, seen from below", SOLDER_VIEW, "t2-"),
    landscape,
  };
}

export function projectDocument({project, name, sections, paper, iconFor}: ProjectPdf, icons: SvgIcons): string {
  const wanted = new Set(sections);
  const netlist = computeNets(project);
  const checks = runChecks(project, netlist);
  const rows = partList(project);
  const groups = groupPartList(rows);
  const nets = netlist.nets.filter(net => net.pins.length > 1);
  const jumpers = project.wires.filter(wire => !isSolderPath(wire)).length;
  const solderPaths = project.wires.length - jumpers;
  const board = project.board;
  const size = boardSizeMm(board);
  const boardLine = `${board.type === "stripboard" ? "Stripboard" : "Perfboard"} · ${board.cols} × ${board.rows} holes · ${mm(size.width)} × ${mm(size.height)} mm`;

  // Numbered as they come, the overview not counted.
  const order = PDF_SECTIONS.filter(section => wanted.has(section.id) && section.id !== "overview" && section.id !== "true-size");
  const numberOf = (id: PdfSection) => order.findIndex(section => section.id === id) + 1;
  const parts: string[] = [];

  if (wanted.has("overview")) {
    const contents = PDF_SECTIONS.filter(section => wanted.has(section.id) && section.id !== "overview")
      .map(section => `<li><span class="num">${section.id === "true-size" ? "1:1" : String(numberOf(section.id)).padStart(2, "0")}</span>${escapeHtml(section.label)}</li>`).join("");
    parts.push(`<section class="cover">
      <p class="brand">Perfboard Designer · Project sheet</p>
      <h1>${escapeHtml(name)}</h1>
      <p class="subtitle muted">${boardLine} · ${escapeHtml(today())}</p>
      ${verdict(checks, wanted.has("checks"))}
      ${facts([
        [String(rows.length), rows.length === 1 ? "part" : "parts"],
        [String(groups.length), groups.length === 1 ? "kind" : "kinds"],
        [String(nets.length), nets.length === 1 ? "net" : "nets"],
        [String(jumpers), jumpers === 1 ? "wire" : "wires"],
        ...(solderPaths ? [[String(solderPaths), solderPaths === 1 ? "solder path" : "solder paths"] as [string, string]] : []),
        [String(solderJoints(project).length), "joints"],
      ])}
      <figure class="frame hero">${boardPicture(project, TOP_VIEW, icons, "c-")}</figure>
      ${contents ? `<ol class="contents">${contents}</ol>` : ""}
    </section>`);
  }
  if (wanted.has("board")) {
    parts.push(`<section class="section">
      ${sectionHead(numberOf("board"), "Board", "As the editor draws it: the top with each part's ref, and the solder side as you'll hold it to solder, every joint marked.")}
      <figure class="frame side"><figcaption>Top · the component side</figcaption>${boardPicture(project, TOP_VIEW, icons, "b1-")}</figure>
      <figure class="frame side"><figcaption>Solder side · seen from below</figcaption>${boardPicture(project, SOLDER_VIEW, icons, "b2-")}</figure>
    </section>`);
  }
  if (wanted.has("components")) {
    parts.push(`<section class="section">
      ${sectionHead(numberOf("components"), "Components", `${plural(rows.length, "part")} on the board, by ref. Hole: where pin 1 goes.`)}
      ${rows.length ? componentTable(rows, iconFor) : `<p class="muted">No parts yet.</p>`}
    </section>`);
  }
  if (wanted.has("shopping")) {
    parts.push(`<section class="section">
      ${sectionHead(numberOf("shopping"), "Shopping list", `${plural(groups.length, "different part")}, ${plural(rows.length, "part")} in all. Tick them off as you get them.`)}
      ${groups.length ? shoppingTable(groups, iconFor) : `<p class="muted">No parts yet.</p>`}
    </section>`);
  }
  if (wanted.has("nets")) {
    parts.push(`<section class="section">
      ${sectionHead(numberOf("nets"), "Nets", "Each group of pins the board joins. On the finished board, a meter should beep between any two pins of one net, and between no two nets.")}
      ${nets.length ? netsTable(nets, iconFor) : `<p class="muted">Nothing is connected yet.</p>`}
    </section>`);
  }
  if (wanted.has("checks")) {
    parts.push(`<section class="section">
      ${sectionHead(numberOf("checks"), "Checks", "What the editor's checks find on this board.")}
      ${checksSection(checks, iconFor)}
    </section>`);
  }
  const trueSize = wanted.has("true-size") ? trueSizePages(project, icons, paper) : undefined;
  const area = printableArea(paper);
  if (trueSize) parts.push(trueSize.html);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(`${name} project sheet`)}</title>
<style>
  @page { size: ${PAPERS[paper].css}; margin: ${MARGIN.top}mm ${MARGIN.side}mm ${MARGIN.bottom}mm; }
  @page wide { size: ${PAPERS[paper].css} landscape; }
  ${PRINT_STYLE}
  ${BOARD_PRINT_STYLE}

  /* The overview has its page; the sections then run on, each well apart. True-size pages are
     pages of their own, as they must be. */
  .cover { break-after: page; }
  .section + .section { margin-top: 14mm; }
  .page { break-before: page; }
  body > section:first-child { break-before: auto; }

  .cover h1 { margin: 0; font-size: 34pt; line-height: 1.1; letter-spacing: -0.01em; }
  .cover .subtitle { margin: 2mm 0 6mm; font-size: 12.5pt; }
  .verdict { display: inline-block; margin: 0 0 5mm; padding: 2mm 4.5mm; border-radius: 10mm; font-weight: 600; font-size: 11.5pt; }
  .verdict::before { margin-right: 1.5mm; }
  .verdict.good { background: #e6f4ea; color: #1e6b37; }
  .verdict.good::before { content: "✓"; }
  .verdict.note { background: #fdf3dc; color: #8a5a00; }
  .verdict.note::before { content: "●"; }
  .verdict.bad { background: #fde7e4; color: #b42318; }
  .verdict.bad::before { content: "!"; font-weight: 800; }

  .frame { margin: 6mm 0 0; padding: 5mm; border-radius: 3mm; background: #f4f1ec; text-align: center; break-inside: avoid; }
  .frame svg { display: block; margin: 0 auto; width: 100%; height: auto; }
  .hero svg { max-height: ${mm(area.height - COVER_EXTRAS)}mm; }
  /* Both sides fit on one page, under the section's heading. */
  .side svg { max-height: ${mm((area.height - BOARD_SECTION_EXTRAS) / 2)}mm; }
  .frame figcaption { margin-bottom: 3mm; color: #5d6b64; font-size: 10.5pt; font-weight: 600; text-align: left; }

  .contents { display: flex; flex-wrap: wrap; gap: 2.5mm 7mm; margin: 8mm 0 0; font-size: 12pt; padding: 0; list-style: none; color: #5d6b64; }
  .contents .num { margin-right: 1.5mm; color: #b5713a; font-weight: 700; }

  .section-head { display: flex; gap: 4mm; align-items: flex-start; margin-bottom: 5mm; padding-bottom: 4mm;
    border-bottom: 2px solid #d08c4c; break-after: avoid; }
  .section-head .num { color: #d08c4c; font-size: 28pt; font-weight: 700; line-height: 1; }
  .section-head h2 { margin: 0; font-size: 20pt; line-height: 1.2; }
  .section-head p { margin: 1mm 0 0; font-size: 11pt; }

  .nets .net-name { width: 36mm; vertical-align: top; font-size: 11pt; }
  .nets .net-name strong { display: block; }
  .badge { display: inline-block; margin-top: 1mm; padding: 0.2mm 1.6mm; border-radius: 1.2mm; font-size: 8.5pt; font-weight: 700; }
  .badge.supply { background: #f6e9dc; color: #7a4518; }
  .badge.ground { background: #e3e7e5; color: #16201c; }
  .pin, .chips .pin { display: inline-flex; align-items: center; gap: 1.2mm; margin: 0.6mm 2mm 0.6mm 0;
    font: 600 9pt/1.3 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; white-space: nowrap; }

  .check { margin-bottom: 4mm; padding: 4mm 5mm; border-left: 1.2mm solid; border-radius: 1.5mm; background: #fafaf8; break-inside: avoid; }
  .check h3 { margin: 0 0 1.5mm; font-size: 13pt; }
  .check p { margin: 1mm 0; }
  .check.bad { border-color: #d64933; }
  .check.note { border-color: #e0a526; }
  .check.good { border-color: #2f9e57; }
  .check .icon.small { margin-right: 1mm; }

  .true-page.landscape { page: wide; }
  .true-title { margin: 0 0 6mm; font-size: 16pt; }
  .warning { color: #b42318; font-weight: 600; }

  footer { margin-top: 12mm; padding-top: 3mm; border-top: 1px solid #eceeec; color: #9aa59f; font-size: 9pt;
    display: flex; justify-content: space-between; }
</style>
</head>
<body>
  ${parts.join("")}
  ${trueSize ? "" : `<footer><span>${escapeHtml(name)} · ${escapeHtml(today())}</span><span>Made with Perfboard Designer · perfboarddesigner.com</span></footer>`}
</body>
</html>`;
}
