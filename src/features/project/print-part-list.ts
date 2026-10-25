import {holeName} from "../../project-file/grid";
import {PartListGroup, PartListRow, TYPE_SEPARATOR} from "../../project-file/part-list";
import type {SavedBoard} from "../../project-file/project-file";
import {escapeHtml, printInFrame} from "./print-frame";
import {facts, iconTile, PAPERS, plural, PRINT_STYLE, regionalPaper, tag, today} from "./print-style";

// The Component List's tables for paper: each part, or grouped by part and value as a shopping list
// with a box to tick for each, every part with its catalog icon (`iconFor`, which the editor's UI
// looks up). The Component List prints the one it shows; the project PDF (project-document.ts)
// uses both.

export type PartListView = "each" | "grouped";

// A part's icon by ref, as an image source; undefined leaves its tile empty.
export type IconFor = (ref: string) => string | undefined;

const text = (value: string | number | undefined) => value === undefined || value === "" ? "—" : escapeHtml(String(value));

function partCell(part: string, type: string[]): string {
  const kind = type.length ? `<span class="type">${escapeHtml(type.join(TYPE_SEPARATOR))}</span>` : "";
  return `<td class="part"><span class="name">${escapeHtml(part)}</span>${kind}</td>`;
}

export function componentTable(rows: PartListRow[], iconFor: IconFor): string {
  const body = rows.map(row => `<tr>
      <td class="tile">${iconTile(iconFor(row.ref))}</td>
      <td>${tag(row.ref)}</td>
      ${partCell(row.part, row.type)}
      <td class="value">${text(row.value)}</td>
      <td class="number">${row.pins}</td>
      <td>${tag(holeName(row.at), true)}</td>
    </tr>`).join("");
  return `<table>
    <thead><tr><th></th><th>Ref</th><th>Part</th><th>Value</th><th class="number">Pins</th><th>Hole</th></tr></thead>
    <tbody>${body}</tbody>
  </table>`;
}

export function shoppingTable(groups: PartListGroup[], iconFor: IconFor): string {
  const body = groups.map(group => `<tr>
      <td class="tick"><span class="box"></span></td>
      <td class="qty">${group.refs.length}<span>×</span></td>
      <td class="tile">${iconTile(iconFor(group.refs[0]))}</td>
      ${partCell(group.part, group.type)}
      <td class="value">${text(group.value)}</td>
      <td class="refs">${group.refs.map(ref => tag(ref)).join("")}</td>
    </tr>`).join("");
  return `<table>
    <thead><tr><th></th><th class="number">Qty</th><th></th><th>Part</th><th>Value</th><th>Used as</th></tr></thead>
    <tbody>${body}</tbody>
  </table>`;
}

export interface PartListPrint {
  projectName: string;
  view: PartListView;
  rows: PartListRow[];
  groups: PartListGroup[];
  board: SavedBoard;
  iconFor: IconFor;
}

// The table the Component List shows, on its own page, through the browser's print dialog
// (print-frame.ts), where "Save as PDF" makes a PDF, named as the CSV download is.
export function printPartList({projectName, view, rows, groups, board, iconFor}: PartListPrint) {
  const what = view === "each" ? "Components" : "Parts to buy";
  printInFrame(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(`${projectName} ${what.toLowerCase()}`)}</title>
<style>
  @page { size: ${PAPERS[regionalPaper()].css}; margin: 14mm 14mm 16mm; }
  ${PRINT_STYLE}
  header { display: flex; align-items: flex-end; justify-content: space-between; gap: 8mm;
    padding-bottom: 5mm; margin-bottom: 6mm; border-bottom: 2px solid #d08c4c; }
  h1 { margin: 0; font-size: 20pt; line-height: 1.15; }
  .subtitle { margin: 1mm 0 0; font-size: 10.5pt; }
  footer { margin-top: 6mm; color: #9aa59f; font-size: 8pt; display: flex; justify-content: space-between; }
</style>
</head>
<body>
  <header>
    <div>
      <p class="brand">Perfboard Designer</p>
      <h1>${escapeHtml(projectName)}</h1>
      <p class="subtitle muted">${what} · ${escapeHtml(today())}</p>
    </div>
    ${facts([
      [String(rows.length), rows.length === 1 ? "part" : "parts"],
      [String(groups.length), groups.length === 1 ? "kind" : "kinds"],
      [`${board.cols} × ${board.rows}`, board.type === "stripboard" ? "stripboard" : "perfboard"],
    ])}
  </header>
  ${view === "each" ? componentTable(rows, iconFor) : shoppingTable(groups, iconFor)}
  <footer><span>${plural(rows.length, "part")} in ${plural(groups.length, "kind")}</span><span>Made with Perfboard Designer · perfboarddesigner.com</span></footer>
</body>
</html>`);
}
