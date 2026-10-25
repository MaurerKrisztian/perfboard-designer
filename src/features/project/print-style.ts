import {escapeHtml} from "./print-frame";

// The look the editor's printed pages share (the component list, the project PDF): a white page,
// Barlow, the editor's copper as the one accent, and the same tags, icon tiles and tables, so they
// read as one family. Sizes are in millimetres and points, for paper.

export const PRINT_STYLE = `
  * { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { margin: 0; color: #16201c; font: 11pt/1.45 Barlow, system-ui, -apple-system, "Segoe UI", sans-serif; }

  .brand { margin: 0 0 1.5mm; color: #b5713a; font-size: 9pt; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
  .muted { color: #5d6b64; }

  .facts { display: flex; flex-wrap: wrap; gap: 3mm; }
  .fact { min-width: 24mm; padding: 2.5mm 4mm; border-radius: 2.5mm; background: #f4f1ec; text-align: center; }
  .fact strong { display: block; font-size: 16pt; line-height: 1.2; }
  .fact span { color: #5d6b64; font-size: 9pt; }

  table { width: 100%; border-collapse: collapse; }
  /* A long table repeats its header on each page, and no row is split across two. */
  thead { display: table-header-group; }
  tr { break-inside: avoid; }
  th { padding: 0 2.5mm 2.5mm; color: #7a8781; font-size: 8.5pt; font-weight: 600; letter-spacing: 0.08em;
    text-align: left; text-transform: uppercase; border-bottom: 1px solid #d9dedb; }
  /* Rows stay compact, so a big board's list doesn't run on for pages. */
  td { padding: 1.5mm 2.2mm; border-bottom: 1px solid #eceeec; vertical-align: middle; }
  tbody tr:nth-child(even) td { background: #fafaf8; }
  .number { text-align: right; }

  .tile { width: 10.5mm; }
  /* The catalog's icons are drawn for the editor's dark panels: they sit on its soldermask colour. */
  .icon { display: inline-grid; place-items: center; width: 8mm; height: 8mm; border-radius: 1.8mm; background: #16241f; vertical-align: middle; }
  .icon img { max-width: 6.2mm; max-height: 6.2mm; }
  .icon.small { width: 6mm; height: 6mm; border-radius: 1.4mm; }
  .icon.small img { max-width: 4.6mm; max-height: 4.6mm; }
  .part .name { display: block; font-size: 11pt; font-weight: 600; line-height: 1.25; }
  .part .type { display: block; color: #7a8781; font-size: 8.5pt; line-height: 1.25; }
  .value { font-size: 11pt; font-weight: 600; white-space: nowrap; }
  .tag { display: inline-block; margin: 0.5mm 1mm 0.5mm 0; padding: 0.4mm 1.6mm; border-radius: 1.2mm;
    background: #f6e9dc; color: #7a4518; font: 600 8.5pt/1.35 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; white-space: nowrap; }
  .tag.quiet { background: #eceeec; color: #16201c; }
  .tick { width: 7mm; }
  .box { display: block; width: 4.2mm; height: 4.2mm; border: 1.5px solid #9aa59f; border-radius: 1mm; }
  .qty { width: 13mm; font-size: 13pt; font-weight: 700; text-align: right; white-space: nowrap; }
  .qty span { margin-left: 0.5mm; color: #b5713a; font-size: 10pt; }
  .refs { max-width: 55mm; }
`;

// The paper a printed page is laid out for, set on the page itself (@page size), so "Save as PDF"
// makes exactly that and the layout's sums hold. Sizes in mm.
export type Paper = "a4" | "letter";

export const PAPERS: Record<Paper, {label: string; css: string; width: number; height: number}> = {
  a4: {label: "A4", css: "A4", width: 210, height: 297},
  letter: {label: "US Letter", css: "letter", width: 215.9, height: 279.4},
};

// The paper people use where the computer is: Letter in the Americas and the Philippines, A4
// everywhere else. Told by its time zone, not its language: plenty of people in Europe run their
// browser in US English.
export function regionalPaper(): Paper {
  let zone = "";
  try {
    zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  } catch {
    // No time zone: A4, the world's usual paper.
  }
  return zone.startsWith("America/") || zone === "Asia/Manila" ? "letter" : "a4";
}

export const plural = (count: number, one: string, many = `${one}s`) => `${count} ${count === 1 ? one : many}`;

// A part's catalog icon on its tile, at an address that holds inside the print frame.
export function iconTile(src: string | undefined, small = false): string {
  const className = small ? "icon small" : "icon";
  if (!src) return `<span class="${className}"></span>`;
  const absolute = src.startsWith("data:") ? src : new URL(src, document.baseURI).href;
  return `<span class="${className}"><img src="${escapeHtml(absolute)}" alt=""></span>`;
}

export const tag = (text: string, quiet = false) => `<span class="tag${quiet ? " quiet" : ""}">${escapeHtml(text)}</span>`;

// A few figures side by side: [figure, what it counts].
export const facts = (items: [string, string][]) =>
  `<div class="facts">${items.map(([figure, label]) => `<div class="fact"><strong>${escapeHtml(figure)}</strong><span>${escapeHtml(label)}</span></div>`).join("")}</div>`;

export const today = () => new Date().toLocaleDateString(undefined, {year: "numeric", month: "long", day: "numeric"});
