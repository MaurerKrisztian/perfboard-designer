import {partIcons, solderJoints} from "../board-render";
import {embeddedIcons} from "../features/project/embedded-icons";
import {downloadHostedProject, hostedProjectAddress} from "../features/project/hosted-project";
import {exportProjectPdf, PdfSection} from "../features/project/project-document";
import {regionalPaper} from "../features/project/print-style";
import {fetchStoredProject} from "../features/project/project-storage";
import {descriptionHtml} from "../project-file/description";
import {computeNets, Net, Netlist, pinName} from "../project-file/nets";
import {groupPartList, partList, PartListGroup, PartListRow} from "../project-file/part-list";
import {partMentions} from "../project-file/part-mentions";
import {ProjectFile} from "../project-file/project-file";
import {Rail, supplyRails} from "../project-file/rails";
import {ProjectFileError, readProjectFile} from "../project-file/read-project-file";
import {decodeEmbeddedProject, linkedProjectName, readShareFragment, ShareLink} from "../project-file/share-link";
import {isSolderPath} from "../project-file/wire-path";
import {BoardPicture, connectLights, lightsFor} from "./board-picture";
import {openBoardZoom} from "./board-zoom";
import {sideSwitch} from "./side-switch";
import {icon, IconName} from "./view-icons";

// The shared board's page (view/index.html): a share link's board for reading, with its description,
// parts and nets, and a way into the editor for a copy. It takes the same fragment as the editor, so
// it needs no server, and it changes nothing: unlike the editor, it stores nothing and leaves the
// link in the address bar. It's the editor's pure code and a few of its leaf modules, never its state
// (.eslintrc.cjs), and the 3D viewer loaded when it's asked for.
//
// The board can be seen from either side and up close (board-zoom.ts), and every part, pin and net
// the page names lights up on it (board-picture.ts). The PDF is the editor's project PDF.
//
// A link can hold anything, so everything from it goes in as text. There are two exceptions, both
// made safe: the description comes from descriptionHtml, which escapes all of it, and the picture is
// an <img>, in which an SVG can't run scripts or fetch anything, whatever got into it.

const page = document.getElementById("viewPage") as HTMLElement;

// The PDF's sections, as the editor's Export PDF picks them unless told otherwise.
const PDF_SECTIONS: PdfSection[] = ["overview", "description", "board", "components", "shopping", "nets", "checks"];

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className = "", text?: string): HTMLElementTagNameMap[K] {
  const made = document.createElement(tag);
  if (className) made.className = className;
  if (text !== undefined) made.textContent = text;
  return made;
}

const plural = (count: number, one: string, many = `${one}s`) => `${count} ${count === 1 ? one : many}`;
// A size in holes, in mm: they're 2.54 mm apart.
const mm = (holes: number) => `${Math.round(holes * 25.4) / 10}`;

// The address that opens this page's board in the editor, as a copy of its own there.
const editorLink = () => `../app/${location.hash}`;

function linkButton(text: string, href: string, className = "button", iconName?: IconName): HTMLAnchorElement {
  const link = element("a", className);
  link.href = href;
  if (iconName) link.append(icon(iconName));
  link.append(text);
  return link;
}

function actionButton(text: string, iconName: IconName, title: string, onClick: (button: HTMLButtonElement) => void): HTMLButtonElement {
  const button = element("button", "button button-ghost");
  button.type = "button";
  button.title = title;
  button.append(icon(iconName), text);
  button.addEventListener("click", () => onClick(button));
  return button;
}

// A part's catalog artwork on its tile, or an empty tile for a part this version doesn't know.
function iconTile(src: string | undefined, small = false): HTMLElement {
  const tile = element("span", small ? "view-tile is-small" : "view-tile");
  if (src) {
    const image = element("img");
    image.src = src;
    image.alt = "";
    image.loading = "lazy";
    tile.append(image);
  }
  return tile;
}

// A note in place of the board: why there isn't one yet, with what can be done about it.
function showNote(title: string, text: string, ...actions: HTMLElement[]) {
  const note = element("section", "view-note");
  const buttons = element("div", "view-actions");
  buttons.append(...actions);
  note.append(element("h1", "", title), element("p", "", text), buttons);
  page.replaceChildren(note);
  document.title = `${title} | Perfboard Designer`;
}

// A figure about the board, with what it counts.
function stat(iconName: IconName, figure: string, label: string): HTMLElement {
  const item = element("li", "view-stat");
  const text = element("span", "view-stat-text");
  text.append(element("strong", "", figure), element("span", "", label));
  item.append(icon(iconName), text);
  return item;
}

function statsList(project: ProjectFile, rows: PartListRow[], nets: Net[]): HTMLElement {
  const {board} = project;
  const jumpers = project.wires.filter(wire => !isSolderPath(wire)).length;
  const solderPaths = project.wires.length - jumpers;
  const list = element("ul", "view-stats");
  list.append(
    stat("board", `${board.cols} × ${board.rows}`, `holes · ${board.type === "stripboard" ? "stripboard" : "perfboard"}`),
    stat("ruler", `${mm(board.cols)} × ${mm(board.rows)}`, "mm"),
    stat("chip", String(rows.length), rows.length === 1 ? "part" : "parts"),
    stat("nets", String(nets.length), nets.length === 1 ? "net" : "nets"),
    stat("wire", String(jumpers), jumpers === 1 ? "wire" : "wires"),
  );
  if (solderPaths) list.append(stat("wire", String(solderPaths), solderPaths === 1 ? "solder path" : "solder paths"));
  const joints = solderJoints(project).length;
  list.append(stat("solder", String(joints), joints === 1 ? "solder joint" : "solder joints"));
  return list;
}

// A part's ref, lighting it up on the board.
function refButton(ref: string, title: string): HTMLButtonElement {
  const button = element("button", "part-ref view-ref", ref);
  button.type = "button";
  button.dataset.ref = ref;
  button.title = title;
  return button;
}

function partsTable(groups: PartListGroup[], icons: Map<string, string>): HTMLElement {
  const table = element("table", "view-table");
  const head = table.createTHead().insertRow();
  for (const [title, className] of [["Part", "view-col-part"], ["Value", ""], ["Qty", "view-col-qty"], ["Refs", ""]]) head.append(element("th", className, title));
  const body = table.createTBody();
  for (const group of groups) {
    const row = body.insertRow();
    const part = row.insertCell();
    part.className = "view-col-part";
    // One line a part: what kind it is goes in its tooltip.
    const name = element("span", "view-part-name", group.part);
    if (group.type.length) name.title = group.type.join(" › ");
    part.append(iconTile(icons.get(group.refs[0]), true), name);
    row.insertCell().textContent = group.value ?? "";
    const quantity = row.insertCell();
    quantity.className = "view-col-qty";
    quantity.textContent = `×${group.refs.length}`;
    const refs = row.insertCell();
    const list = element("span", "view-refs");
    list.append(...group.refs.map(ref => refButton(ref, group.value ? `${group.part} ${group.value}` : group.part)));
    refs.append(list);
  }
  const scroller = element("div", "view-table-scroller");
  scroller.append(table);
  return scroller;
}

function railBadge(rail: Rail | undefined): HTMLElement | undefined {
  if (!rail) return undefined;
  const ground = rail.level === "ground";
  const text = ground ? "Ground" : rail.level === "negative" ? "Negative supply" : "Supply";
  const badge = element("span", `view-badge ${ground ? "is-ground" : "is-supply"}`);
  badge.append(icon(ground ? "ground" : "bolt"), rail.volts !== undefined && !ground ? `${text} ${rail.volts} V` : text);
  return badge;
}

function netsList(nets: Net[], netlist: Netlist, project: ProjectFile, icons: Map<string, string>): HTMLElement {
  const rails = supplyRails(project, netlist);
  const titles = new Map(partList(project).map(row => [row.ref, row.value ? `${row.part} ${row.value}` : row.part]));
  const list = element("ul", "view-nets");
  nets.forEach((net, index) => {
    const item = element("li");
    const head = element("div", "view-net-head");
    const name = element("button", "net-ref view-net-name", net.name ?? `Net ${index + 1}`);
    name.type = "button";
    name.dataset.net = String(index);
    name.title = `${plural(net.pins.length, "pin")}${net.wires.length ? `, ${plural(net.wires.length, "wire")}` : ""}`;
    head.append(name);
    const badge = railBadge(rails.get(net));
    if (badge) head.append(badge);
    const pins = element("span", "view-pins");
    pins.append(...net.pins.map(pin => {
      const chip = element("button", "part-ref view-pin");
      chip.type = "button";
      chip.dataset.ref = pin.ref;
      chip.dataset.hole = `${pin.at[0]},${pin.at[1]}`;
      chip.title = `${titles.get(pin.ref) ?? pin.ref}, pin ${pin.pin}${pin.label ? ` (${pin.label})` : ""}`;
      chip.append(iconTile(icons.get(pin.ref), true), pinName(pin));
      return chip;
    }));
    item.append(head, pins);
    list.append(item);
  });
  return list;
}

function section(title: string, iconName: IconName, ...content: HTMLElement[]): HTMLElement {
  const part = element("section", "view-section");
  const heading = element("h2", "view-section-title");
  heading.append(icon(iconName), title);
  part.append(heading, ...content);
  return part;
}

// Opens the board in the 3D viewer, with three.js loaded only now. It needs WebGL, which a browser
// may not have: the button then says why instead.
function threeDButton(project: ProjectFile): HTMLElement {
  return actionButton("3D view", "cube", "See the board in 3D", async button => {
    button.disabled = true;
    try {
      const viewer = await import("../viewer-3d/viewer-3d");
      viewer.openViewer3d(JSON.parse(JSON.stringify(project)));
      button.disabled = false;
    } catch (err) {
      console.error(err);
      button.lastChild?.replaceWith("3D view isn't available in this browser");
    }
  });
}

// The editor's project PDF, printed through the browser's own dialog, where "Save as PDF" makes it.
function pdfButton(project: ProjectFile, name: string, icons: Map<string, string>): HTMLElement {
  return actionButton("Download PDF", "pdf", "A PDF about this board: the board from both sides, its parts, shopping list, nets and checks. Your browser's print dialog opens: choose Save as PDF.", async button => {
    button.disabled = true;
    try {
      await exportProjectPdf({project, name, sections: PDF_SECTIONS, paper: regionalPaper(), iconFor: ref => icons.get(ref)});
    } catch (err) {
      console.error(err);
    } finally {
      button.disabled = false;
    }
  });
}

// The board's picture, with its side switch and a way to see it up close.
function boardFigure(picture: BoardPicture, name: string): {figure: HTMLElement; caption: HTMLElement} {
  const figure = element("figure", "view-board");
  const bar = element("div", "view-board-bar");
  const closeUp = element("button", "view-board-expand");
  closeUp.type = "button";
  closeUp.title = "See the board up close, full screen";
  closeUp.append(icon("expand"), element("span", "", "Full screen"));
  closeUp.addEventListener("click", () => openBoardZoom(picture, name));
  bar.append(sideSwitch(picture).element, closeUp);

  const frame = element("button", "view-board-frame");
  frame.type = "button";
  frame.setAttribute("aria-label", "See the board up close, full screen");
  frame.append(picture.image(`The board "${name}", with its parts and wires`));
  frame.addEventListener("click", () => openBoardZoom(picture, name));

  const caption = element("figcaption");
  caption.setAttribute("aria-live", "polite");
  figure.append(bar, frame, caption);
  return {figure, caption};
}

// The picture on show, kept to let go of it when the page shows another board.
let shownPicture: BoardPicture | undefined;

async function showBoard(project: ProjectFile, name: string, skipped: number, isCurrent: () => boolean) {
  const svgIcons = await embeddedIcons(project);
  if (!isCurrent()) return;

  const icons = partIcons(project);
  const rows = partList(project);
  const netlist = computeNets(project);
  const nets = netlist.nets.filter(net => net.pins.length > 1);

  shownPicture?.dispose();
  const picture = shownPicture = new BoardPicture(project, svgIcons);
  const {figure, caption} = boardFigure(picture, name);

  const head = element("header", "view-head");
  const actions = element("div", "view-actions");
  actions.append(linkButton("Open a copy in the editor", editorLink(), "button", "pencil"), pdfButton(project, name, icons), threeDButton(project));
  head.append(element("p", "eyebrow", "Shared board"), element("h1", "", name), statsList(project, rows, nets), actions);

  const main = element("div", "view-main");
  const lit: HTMLElement[] = [];
  if (project.description) {
    const description = element("div", "view-description");
    // descriptionHtml escapes everything in the text.
    description.innerHTML = descriptionHtml(project.description, partMentions(project));
    main.append(section("About this board", "note", description));
    lit.push(description);
  }
  if (rows.length) {
    const parts = section("Components", "chip", partsTable(groupPartList(rows), icons));
    main.append(parts);
    lit.push(parts);
  }
  if (nets.length) {
    const connections = section("Nets", "nets",
      element("p", "view-note-line", "Each group of pins the board joins. Point at one, or a pin, to find it on the board."),
      netsList(nets, netlist, project, icons));
    main.append(connections);
    lit.push(connections);
  }
  connectLights({
    containers: lit, picture, figure, caption,
    hint: "Point at or tap a part, pin or net on this page to find it on the board.",
    lightOf: lightsFor(project, nets),
  });

  const layout = element("div", "view-layout");
  layout.append(figure, main);
  const content: HTMLElement[] = [head];
  if (skipped) {
    content.push(element("p", "view-warning", `${plural(skipped, "item")} in this link couldn't be read and ${skipped === 1 ? "was" : "were"} left out.`));
  }
  content.push(layout);
  page.replaceChildren(...content);
  document.title = `${name} | Perfboard Designer`;
}

// A hosted project is downloaded only once the visitor agrees, as that shows the other site the visit.
function askBeforeDownloading(link: Extract<ShareLink, {kind: "hosted"}>, isCurrent: () => boolean) {
  const url = hostedProjectAddress(link);
  const download = element("button", "button", "Download and show it");
  download.type = "button";
  download.addEventListener("click", () => void show(link, () => downloadHostedProject(url), isCurrent));
  showNote("Show a board from another site?", `This link's board is a project file on ${url.host}: ${url.href}. Downloading it shows that site your visit.`, download);
}

async function show(link: ShareLink, fetchProject: () => Promise<unknown>, isCurrent: () => boolean) {
  let read;
  try {
    read = readProjectFile(await fetchProject());
  } catch (err) {
    console.error(err);
    if (isCurrent()) showCouldNotOpen(err);
    return;
  }
  try {
    if (isCurrent()) await showBoard(read.project, linkedProjectName(link) ?? "Shared board", read.skipped, isCurrent);
  } catch (err) {
    console.error(err);
    if (isCurrent()) showCouldNotOpen(err);
  }
}

function showCouldNotOpen(err: unknown) {
  showNote("Couldn't open this board", err instanceof ProjectFileError ? err.message : "The link is damaged.", linkButton("Open the designer", "../app/"));
}

// Which fragment is being shown, so a slow download can't replace the board of a later link.
let showing = 0;

function showLinkedBoard() {
  const shown = ++showing;
  const isCurrent = () => shown === showing;
  const link = readShareFragment(location.hash);
  if (!link) {
    showNote("There's no board in this link", "This page shows boards shared from Perfboard Designer. Open a share link to see one, or start your own.", linkButton("Open the designer", "../app/"));
    return;
  }
  try {
    if (link.kind === "hosted") askBeforeDownloading(link, isCurrent);
    else void show(link, () => link.kind === "stored" ? fetchStoredProject(link.id) : decodeEmbeddedProject(link), isCurrent);
  } catch (err) {
    console.error(err);
    showCouldNotOpen(err);
  }
}

showLinkedBoard();
// A link pasted into the address bar of this page only changes the fragment. The footer's Cookie
// settings link does too, and must leave the board alone.
window.addEventListener("hashchange", () => {
  if (readShareFragment(location.hash)) showLinkedBoard();
});
