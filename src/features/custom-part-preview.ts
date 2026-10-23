import {boardSizePx, drawBoard, iconsUsedBy, PLAIN_VIEW} from "../board-render";
import {CUSTOM_PART_ID, customPartDefinition, CustomPartSpec} from "../parts/custom-parts";
import {advancedPartShape} from "../parts/part-geometry";
import type {ProjectFile} from "../project-file/project-file";
import {CanvasPainter} from "./board-canvas/canvas-painter";
import {browserIcons} from "./board-canvas/browser-icons";

// A custom part as it will look on the board, for the dialog that makes it: drawn by the board
// renderer on a scrap of perfboard just big enough for it, its pin names with it.

const MAX_WIDTH = 560;
const MAX_HEIGHT = 200;
// At most this big (a hole every 40px), so a small package isn't blown up.
const MAX_SCALE = 0.8;
// Board left round the part and its pin names, in holes.
const MARGIN = 0.6;

// A board holding only the part, unturned.
function previewProject(spec: CustomPartSpec): ProjectFile {
  const def = customPartDefinition(spec);
  const probe = advancedPartShape(def, {at: [0, 0], rotation: 0, rows: 1, cols: 1});
  // Pin names sit off their pins (above, by default), and must fit on the board too.
  const labelDy = def.pinLabelOffset?.dy ?? -0.35;
  const xs = [probe.body.left, probe.body.right, ...probe.pins.map(p => p.x)];
  const ys = [probe.body.top, probe.body.bottom, ...probe.pins.flatMap(p => [p.y, p.y + labelDy])];
  const left = Math.floor(Math.min(...xs) - MARGIN), top = Math.floor(Math.min(...ys) - MARGIN);
  const right = Math.ceil(Math.max(...xs) + MARGIN), bottom = Math.ceil(Math.max(...ys) + MARGIN);
  return {
    version: 6,
    board: {type: "perfboard", cols: right - left + 1, rows: bottom - top + 1},
    pads: [], wires: [], placedIcs: [], placedStandardComponents: [],
    placedAdvancedComponents: [{ref: "", definitionId: CUSTOM_PART_ID, at: [-left, -top], rotation: 0, rows: 1, cols: 1, custom: spec}],
    customIcs: [],
  };
}

// Which drawing each canvas is on, so an icon arriving late doesn't draw an older part.
const drawings = new WeakMap<HTMLCanvasElement, number>();

export function drawCustomPartPreview(canvas: HTMLCanvasElement, spec: CustomPartSpec) {
  const drawing = (drawings.get(canvas) ?? 0) + 1;
  drawings.set(canvas, drawing);
  const project = previewProject(spec);
  const {width, height} = boardSizePx(project.board);
  const scale = Math.min(MAX_SCALE, MAX_WIDTH / width, MAX_HEIGHT / height);
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(width * scale * dpr);
  canvas.height = Math.round(height * scale * dpr);
  canvas.style.width = `${Math.round(width * scale)}px`;
  canvas.style.height = `${Math.round(height * scale)}px`;

  const paint = () => {
    const ctx = canvas.getContext("2d");
    if (!ctx || drawings.get(canvas) !== drawing) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    drawBoard(new CanvasPainter(ctx), project, PLAIN_VIEW);
  };
  paint();
  // The package's artwork, once it has loaded.
  const icons = iconsUsedBy(project);
  if (icons.some(icon => !browserIcons.image(icon))) void browserIcons.ready(icons).then(paint);
}
