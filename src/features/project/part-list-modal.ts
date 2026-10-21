import {Utils} from "../../utils/utils";
import {PartState} from "../../state/PartState";
import {SelectionState} from "../../state/SelectionState";
import {holeName} from "../../project-file/grid";
import {
  groupedPartListCsv, groupPartList, partList, partListCsv, PartListGroup, PartListRow, TYPE_SEPARATOR,
} from "../../project-file/part-list";
import {redrawCanvas} from "../draw-canvas";
import {updateSelectionStatus} from "../selection-status";
import {ProjectState} from "../../state/ProjectState";
import {downloadFileName, getSaveJson} from "./save-project";

// File → Component List: every part on the board in a table (src/project-file/part-list.ts works
// it out from the save snapshot), each part on its own or grouped by part and value for buying
// them, and the table shown downloaded as a CSV. A click on a part selects it on the board.
// Built with DOM calls: names and values come from project files.

type View = "each" | "grouped";

const modal = Utils.getSafeHtmlElement("partListModal");
const table = Utils.getSafeHtmlElement<HTMLTableElement>("partListTable");
const count = Utils.getSafeHtmlElement("partListCount");
const empty = Utils.getSafeHtmlElement("partListEmpty");
const hint = Utils.getSafeHtmlElement("partListHint");
const downloadBtn = Utils.getSafeHtmlElement<HTMLButtonElement>("downloadPartListBtn");
const viewButtons = document.querySelectorAll<HTMLButtonElement>("#partListViewSwitch [data-part-view]");

// A finger taps rather than clicks.
const touchScreen = matchMedia("(pointer: coarse)");

let view: View = "each";
let rows: PartListRow[] = [];

function cell(tag: "td" | "th", text: string | number, className = ""): HTMLTableCellElement {
  const el = document.createElement(tag);
  el.textContent = String(text);
  if (className) el.className = className;
  return el;
}

function header(...titles: [string, string?][]): HTMLTableSectionElement {
  const head = document.createElement("thead");
  const tr = document.createElement("tr");
  tr.append(...titles.map(([title, className]) => cell("th", title, className)));
  head.append(tr);
  return head;
}

// Selects the part on the board and closes the list, so it's in sight.
function findOnBoard(ref: string) {
  const part = PartState.parts.find(p => p.ref === ref);
  if (!part) return;
  SelectionState.current = {kind: "part", part};
  closePartList();
  updateSelectionStatus();
  redrawCanvas();
}

function eachRow(row: PartListRow): HTMLTableRowElement {
  const tr = document.createElement("tr");
  tr.className = "is-clickable";
  tr.tabIndex = 0;
  tr.title = `Show ${row.ref} on the board`;
  tr.append(
    cell("td", row.ref, "part-list-ref"),
    cell("td", row.part),
    cell("td", row.value ?? "—", row.value ? "" : "part-list-muted"),
    cell("td", row.type.join(TYPE_SEPARATOR), "part-list-muted"),
    cell("td", row.pins, "part-list-number"),
    cell("td", holeName(row.at), "part-list-ref"),
  );
  tr.addEventListener("click", () => findOnBoard(row.ref));
  tr.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      findOnBoard(row.ref);
    }
  });
  return tr;
}

function groupRow(group: PartListGroup): HTMLTableRowElement {
  const tr = document.createElement("tr");
  tr.append(
    cell("td", group.refs.length, "part-list-number"),
    cell("td", group.part),
    cell("td", group.value ?? "—", group.value ? "" : "part-list-muted"),
    cell("td", group.type.join(TYPE_SEPARATOR), "part-list-muted"),
    cell("td", group.refs.join(", "), "part-list-ref"),
  );
  return tr;
}

function render() {
  viewButtons.forEach(btn => btn.classList.toggle("active-mode", btn.dataset.partView === view));
  count.textContent = rows.length ? String(rows.length) : "";
  empty.hidden = rows.length > 0;
  table.hidden = rows.length === 0;
  downloadBtn.disabled = rows.length === 0;
  const body = document.createElement("tbody");
  if (view === "each") {
    body.append(...rows.map(eachRow));
    table.replaceChildren(header(["Ref"], ["Part"], ["Value"], ["Type"], ["Pins", "part-list-number"], ["Position"]), body);
    hint.textContent = rows.length ? `${touchScreen.matches ? "Tap" : "Click"} a part to find it on the board.` : "";
  } else {
    const groups = groupPartList(rows);
    body.append(...groups.map(groupRow));
    table.replaceChildren(header(["Qty", "part-list-number"], ["Part"], ["Value"], ["Type"], ["Refs"]), body);
    hint.textContent = rows.length ? `${groups.length} different part${groups.length === 1 ? "" : "s"}, for a shopping list.` : "";
  }
}

export function openPartList() {
  rows = partList(getSaveJson());
  render();
  modal.style.display = "flex";
}

function closePartList() {
  modal.style.display = "none";
}

// The table as shown, as a CSV file named after the project. A UTF-8 byte order mark first, so
// spreadsheet apps read "Ω" and "µ" correctly.
function downloadCsv() {
  const text = view === "each" ? partListCsv(rows) : groupedPartListCsv(groupPartList(rows));
  const url = URL.createObjectURL(new Blob(["﻿", text], {type: "text/csv;charset=utf-8"}));
  const link = document.createElement("a");
  const name = ProjectState.current?.name?.trim() || "perfboard-project";
  link.download = downloadFileName("csv", `${name} ${view === "each" ? "components" : "parts to buy"}`);
  link.href = url;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

viewButtons.forEach(btn => btn.addEventListener("click", () => {
  view = btn.dataset.partView === "grouped" ? "grouped" : "each";
  render();
}));
Utils.getSafeHtmlElement("partListBtn").addEventListener("click", openPartList);
Utils.getSafeHtmlElement("closePartListBtn").addEventListener("click", closePartList);
downloadBtn.addEventListener("click", downloadCsv);
modal.addEventListener("click", e => {
  if (e.target === modal) closePartList();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.style.display !== "none") closePartList();
});
