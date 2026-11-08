import {BoardPicture} from "./board-picture";
import {sideSwitch} from "./side-switch";
import {icon, IconName} from "./view-icons";

// The board up close: the picture filling the screen, to zoom into and move about, from either side,
// with whatever the page has lit still lit. Drag (or a finger) moves it, the wheel or a pinch zooms
// where it's pointed at, a double-click zooms in there; + and − and 0 (fit) on the keyboard too.
// Esc closes it, as any modal <dialog>.
//
// The picture is an SVG in an <img>, zoomed by sizing the <img> rather than scaling it, so the
// browser draws it sharp at every size, and moved by scrolling. So it's kept from growing past what
// a browser can draw: about 48 million device pixels, and at most four times the editor's size.

const MAX_DEVICE_PIXELS = 48e6;
const MAX_SCALE = 4;
// Room left round the board when it's fitted (px).
const FIT_MARGIN = 32;
const STEP = 1.5;

function iconButton(name: IconName, label: string, onClick: () => void): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "view-icon-btn";
  button.title = label;
  button.setAttribute("aria-label", label);
  button.append(icon(name));
  button.addEventListener("click", onClick);
  return button;
}

export function openBoardZoom(picture: BoardPicture, name: string) {
  const dialog = document.createElement("dialog");
  dialog.className = "view-zoom";
  dialog.setAttribute("aria-label", `${name}, up close`);

  const stage = document.createElement("div");
  stage.className = "view-zoom-stage";
  stage.tabIndex = 0;
  stage.setAttribute("aria-label", "The board. Drag to move it, scroll or pinch to zoom.");
  const canvas = document.createElement("div");
  canvas.className = "view-zoom-canvas";
  const image = picture.image(`The board "${name}", up close`);
  image.draggable = false;
  canvas.append(image);
  stage.append(canvas);

  const level = document.createElement("span");
  level.className = "view-zoom-level";
  level.setAttribute("aria-live", "polite");
  const zoomOut = iconButton("zoom-out", "Zoom out (−)", () => zoomBy(1 / STEP));
  const zoomIn = iconButton("zoom-in", "Zoom in (+)", () => zoomBy(STEP));
  const fit = iconButton("fit", "Fit the board (0)", () => fitBoard());
  const close = iconButton("x", "Close (Esc)", () => dialog.close());
  close.classList.add("view-zoom-close");
  const sides = sideSwitch(picture);

  const title = document.createElement("h2");
  title.className = "view-zoom-title";
  title.textContent = name;
  const zoom = document.createElement("div");
  zoom.className = "view-zoom-buttons";
  zoom.append(zoomOut, level, zoomIn, fit);
  const bar = document.createElement("div");
  bar.className = "view-zoom-bar";
  bar.append(title, sides.element, zoom, close);
  const hint = document.createElement("p");
  hint.className = "view-zoom-hint";
  hint.textContent = "Drag to move · scroll or pinch to zoom · double-click to zoom in";
  dialog.append(bar, stage, hint);

  let scale = 1;
  // Fitted, it fits again as the window changes size.
  let fitted = true;

  const natural = () => ({width: image.naturalWidth || 1, height: image.naturalHeight || 1});
  const fitScale = () => {
    const {width, height} = natural();
    return Math.max(0.01, Math.min((stage.clientWidth - FIT_MARGIN) / width, (stage.clientHeight - FIT_MARGIN) / height));
  };
  const maxScale = () => {
    const {width, height} = natural();
    const ratio = devicePixelRatio || 1;
    return Math.max(fitScale(), Math.min(MAX_SCALE, Math.sqrt(MAX_DEVICE_PIXELS / (width * height * ratio * ratio))));
  };
  const minScale = () => Math.min(fitScale(), 1);

  const stageCentre = () => {
    const box = stage.getBoundingClientRect();
    return {x: box.left + box.width / 2, y: box.top + box.height / 2};
  };

  // Zooms to `next`, keeping the point of the board under `at` (a point on screen) where it is.
  const zoomTo = (next: number, at = stageCentre()) => {
    const before = image.getBoundingClientRect();
    const fx = before.width ? (at.x - before.left) / before.width : 0.5;
    const fy = before.height ? (at.y - before.top) / before.height : 0.5;
    scale = Math.min(maxScale(), Math.max(minScale(), next));
    const {width, height} = natural();
    image.style.width = `${width * scale}px`;
    image.style.height = `${height * scale}px`;
    const after = image.getBoundingClientRect();
    stage.scrollLeft += after.left + fx * after.width - at.x;
    stage.scrollTop += after.top + fy * after.height - at.y;
    level.textContent = `${Math.round((scale / fitScale()) * 100)}%`;
    zoomOut.disabled = scale <= minScale() * 1.001;
    zoomIn.disabled = scale >= maxScale() * 0.999;
  };
  const zoomBy = (factor: number, at?: {x: number; y: number}) => {
    fitted = false;
    zoomTo(scale * factor, at);
  };
  const fitBoard = () => {
    fitted = true;
    zoomTo(fitScale());
  };

  // Moving it: one pointer drags, two pinch.
  const pointers = new Map<number, {x: number; y: number}>();
  const pair = () => {
    const [a, b] = [...pointers.values()];
    return {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, gap: Math.hypot(a.x - b.x, a.y - b.y)};
  };
  stage.addEventListener("pointerdown", event => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    stage.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, {x: event.clientX, y: event.clientY});
    stage.classList.add("is-moving");
  });
  stage.addEventListener("pointermove", event => {
    const last = pointers.get(event.pointerId);
    if (!last) return;
    if (pointers.size === 1) {
      stage.scrollLeft -= event.clientX - last.x;
      stage.scrollTop -= event.clientY - last.y;
      pointers.set(event.pointerId, {x: event.clientX, y: event.clientY});
      return;
    }
    const before = pair();
    pointers.set(event.pointerId, {x: event.clientX, y: event.clientY});
    const after = pair();
    if (before.gap > 0) zoomBy(after.gap / before.gap, after);
    stage.scrollLeft -= after.x - before.x;
    stage.scrollTop -= after.y - before.y;
  });
  const letGo = (event: PointerEvent) => {
    pointers.delete(event.pointerId);
    if (!pointers.size) stage.classList.remove("is-moving");
  };
  stage.addEventListener("pointerup", letGo);
  stage.addEventListener("pointercancel", letGo);
  stage.addEventListener("wheel", event => {
    event.preventDefault();
    const lines = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? 400 : 1;
    zoomBy(Math.exp(-event.deltaY * lines * 0.0018), {x: event.clientX, y: event.clientY});
  }, {passive: false});
  stage.addEventListener("dblclick", event => {
    if (scale >= maxScale() * 0.999) fitBoard();
    else zoomBy(2, {x: event.clientX, y: event.clientY});
  });
  dialog.addEventListener("keydown", event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key === "+" || event.key === "=") zoomBy(STEP);
    else if (event.key === "-" || event.key === "_") zoomBy(1 / STEP);
    else if (event.key === "0") fitBoard();
    else return;
    event.preventDefault();
  });

  const onResize = () => (fitted ? fitBoard() : zoomTo(scale));
  window.addEventListener("resize", onResize);
  dialog.addEventListener("close", () => {
    window.removeEventListener("resize", onResize);
    sides.stop();
    picture.release(image);
    dialog.remove();
  });

  document.body.append(dialog);
  dialog.showModal();
  stage.focus();
  // Sized once the picture's own size is known.
  void image.decode().catch(() => undefined).then(() => {
    if (dialog.open) fitBoard();
  });
}
