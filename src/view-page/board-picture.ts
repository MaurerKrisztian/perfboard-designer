import {BoardView, renderBoardSvg, SvgIcons} from "../board-render";
import {GridPos} from "../project-file/grid";
import {Net} from "../project-file/nets";
import {partPins} from "../project-file/pin-positions";
import {ProjectFile, SavedWire} from "../project-file/project-file";

// The board's picture on the shared board's page, from either side, and lighting up on it whatever
// the page names: a part, one of its pins or a net (the part-ref and net-ref elements). The picture is
// an <img>, in which an SVG can't run anything, whatever a link put in it. So a part lights up by
// drawing the board again with that part marked, as the editor marks a selected part and a picked
// net, and changing the picture. One BoardPicture can feed several <img>s (the page's and the close
// up's), which all show the same side with the same thing lit.

export type Side = "top" | "bottom";

const SIDE_VIEWS: Record<Side, BoardView> = {
  top: {partLabels: true, holeLabels: true},
  // From below, as it's held to solder, with each joint marked.
  bottom: {solderSide: true, holeLabels: true},
};

// Something lit up on the board.
export interface Lit {
  // Tells it from anything else that can be lit.
  key: string;
  // A part ringed as the editor rings a selected one (on the top).
  ref?: string;
  // Holes ringed and wires glowing, from either side.
  holes: GridPos[];
  wires: SavedWire[];
}

interface Drawing {
  url: string;
  // Held so it stays decoded, which lets the picture change without a flash.
  image: HTMLImageElement;
  ready: Promise<void>;
}

// Drawings kept besides the two plain ones, the least recently shown going first: a long page of
// parts and nets can light up a great many things.
const KEPT_DRAWINGS = 24;

export class BoardPicture {
  side: Side = "top";
  private lit?: Lit;
  private readonly images = new Set<HTMLImageElement>();
  private readonly drawings = new Map<string, Drawing>();
  private readonly listeners = new Set<() => void>();
  private shownKey = "";

  constructor(private readonly project: ProjectFile, private readonly icons: SvgIcons) {
    this.shownKey = this.keyFor(this.side, undefined);
  }

  // An <img> showing this picture, as it changes, until it's released.
  image(alt: string): HTMLImageElement {
    const image = document.createElement("img");
    image.alt = alt;
    image.src = this.drawing(this.side, this.lit).url;
    this.images.add(image);
    return image;
  }

  release(image: HTMLImageElement) {
    this.images.delete(image);
  }

  // Calls `listener` whenever the side changes. Returns what stops it.
  onSideChange(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  setSide(side: Side) {
    if (side === this.side) return;
    this.side = side;
    for (const listener of this.listeners) listener();
    void this.update();
  }

  // Lights `lit` up, or nothing.
  light(lit: Lit | undefined) {
    this.lit = lit;
    void this.update();
  }

  // Lets go of its drawings, when the page shows another board.
  dispose() {
    for (const {url} of this.drawings.values()) URL.revokeObjectURL(url);
    this.drawings.clear();
    this.images.clear();
    this.listeners.clear();
  }

  // Shows the side and what's lit as they are now, once that drawing is ready. Asked again before
  // then, the latest wins.
  private async update() {
    const key = this.keyFor(this.side, this.lit);
    const drawing = this.drawing(this.side, this.lit);
    this.shownKey = key;
    await drawing.ready;
    if (this.shownKey !== key) return;
    for (const image of this.images) if (image.getAttribute("src") !== drawing.url) image.src = drawing.url;
  }

  private keyFor(side: Side, lit: Lit | undefined) {
    return `${side} ${lit?.key ?? ""}`;
  }

  private drawing(side: Side, lit: Lit | undefined): Drawing {
    const key = this.keyFor(side, lit);
    const known = this.drawings.get(key);
    if (known) {
      // Most recently shown last.
      this.drawings.delete(key);
      this.drawings.set(key, known);
      return known;
    }
    const view: BoardView = lit
      ? {...SIDE_VIEWS[side], ...(lit.ref ? {selected: [{kind: "part", ref: lit.ref}]} : {}), highlight: {holes: lit.holes, wires: lit.wires}}
      : SIDE_VIEWS[side];
    const svg = renderBoardSvg(this.project, {icons: this.icons, view});
    const url = URL.createObjectURL(new Blob([svg], {type: "image/svg+xml"}));
    const image = new Image();
    image.src = url;
    const drawing = {url, image, ready: image.decode().catch(() => undefined)};
    this.drawings.set(key, drawing);
    this.forgetOld();
    return drawing;
  }

  private forgetOld() {
    const lit = [...this.drawings.keys()].filter(key => !key.endsWith(" "));
    for (const key of lit.slice(0, Math.max(0, lit.length - KEPT_DRAWINGS))) {
      const drawing = this.drawings.get(key);
      if (!drawing || [...this.images].some(image => image.getAttribute("src") === drawing.url)) continue;
      URL.revokeObjectURL(drawing.url);
      this.drawings.delete(key);
    }
  }
}

// What the page's part-ref and net-ref elements light up, for this board.
export function lightsFor(project: ProjectFile, nets: Net[]): (element: HTMLElement) => Lit | undefined {
  const pinsOf = new Map(partPins(project).map(part => [part.ref, part.pins.map(pin => pin.at)]));
  return element => {
    const {ref, hole, net} = element.dataset;
    if (net !== undefined) {
      const found = nets[Number(net)];
      return found && {key: `net ${net}`, holes: found.holes, wires: found.wires.flatMap(index => project.wires[index] ?? [])};
    }
    if (!ref) return undefined;
    const at = hole?.split(",").map(Number);
    const holes = at?.length === 2 ? [at as GridPos] : pinsOf.get(ref) ?? [];
    return {key: `part ${ref} ${hole ?? ""}`, ref, holes, wires: []};
  };
}

const LIGHTS = ".part-ref, .net-ref";

const lightAt = (target: EventTarget | null): HTMLElement | null =>
  target instanceof Element ? target.closest<HTMLElement>(LIGHTS) : null;

// Wait this long (ms) before drawing what the pointer's on, so sweeping across a list of names draws
// only where it stops.
const HOVER_DELAY = 60;

// Connects the part and net names in `containers` to the picture: pointing at one or moving the
// keyboard to it lights it up while it's there; a click or tap keeps it lit until it's clicked again,
// and brings the picture into sight. `caption` says what's lit, or how to light something.
export function connectLights(options: {
  containers: HTMLElement[];
  picture: BoardPicture;
  figure: HTMLElement;
  caption: HTMLElement;
  hint: string;
  lightOf: (element: HTMLElement) => Lit | undefined;
}) {
  const {containers, picture, figure, caption, hint, lightOf} = options;
  let pointedAt: HTMLElement | undefined;
  let kept: HTMLElement | undefined;
  let timer: number | undefined;
  const all = () => containers.flatMap(container => [...container.querySelectorAll<HTMLElement>(LIGHTS)]);
  const keyOf = (element: HTMLElement | undefined) => element && lightOf(element)?.key;
  caption.textContent = hint;

  const update = (now = false) => {
    const shown = kept ?? pointedAt;
    const shownKey = keyOf(shown);
    const keptKey = keyOf(kept);
    for (const element of all()) {
      const key = keyOf(element);
      element.classList.toggle("is-lit", !!shownKey && key === shownKey);
      element.setAttribute("aria-pressed", String(!!keptKey && key === keptKey));
    }
    caption.textContent = shown ? `${shown.textContent?.trim()}: ${shown.title}` : hint;
    window.clearTimeout(timer);
    const draw = () => picture.light(shown && lightOf(shown));
    if (now) draw();
    else timer = window.setTimeout(draw, HOVER_DELAY);
  };

  const enter = (event: Event) => {
    const element = lightAt(event.target);
    if (!element || element === pointedAt) return;
    pointedAt = element;
    update();
  };
  const leave = (event: Event) => {
    const element = lightAt(event.target);
    if (!element) return;
    // Still within it (moving onto its icon, say).
    const to = (event as MouseEvent | FocusEvent).relatedTarget;
    if (to instanceof Node && element.contains(to)) return;
    pointedAt = undefined;
    update();
  };
  const press = (element: HTMLElement) => {
    const wasKept = !!kept && keyOf(kept) === keyOf(element);
    kept = wasKept ? undefined : element;
    pointedAt = undefined;
    update(true);
    if (!wasKept) bringIntoSight(figure);
  };

  for (const container of containers) {
    container.addEventListener("mouseover", enter);
    container.addEventListener("mouseout", leave);
    container.addEventListener("focusin", enter);
    container.addEventListener("focusout", leave);
    container.addEventListener("click", event => {
      const element = lightAt(event.target);
      if (element) press(element);
    });
    // The description's names are spans acting as buttons: they take the keys a button does. A real
    // <button> clicks by itself.
    container.addEventListener("keydown", event => {
      const element = lightAt(event.target);
      if (!element || element.tagName === "BUTTON" || (event.key !== "Enter" && event.key !== " ")) return;
      event.preventDefault();
      press(element);
    });
  }
}

function bringIntoSight(figure: HTMLElement) {
  const box = figure.getBoundingClientRect();
  const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
  // Enough of it showing already.
  if (box.top >= headerHeight - 40 && box.top + Math.min(box.height, innerHeight * 0.6) <= innerHeight) return;
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  figure.scrollIntoView({block: "start", behavior: calm ? "auto" : "smooth"});
}
