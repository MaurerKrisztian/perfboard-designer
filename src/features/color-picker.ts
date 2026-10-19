import {ToolState} from "../state/ToolState";
import {LineState} from "../state/LineState";
import {setLineColor} from "./line";
import {updateSelectionStatus} from "./selection-status";
import {SelectionState} from "../state/SelectionState";
import {onRedraw} from "./draw-canvas";
import {Utils} from "../utils/utils";

// The wire palette: the built-in colors, the custom ones the user saved (kept in localStorage),
// and every other color a wire on this board has, however it got it (the selection bar's Color
// button, a loaded project), so any color in use is a click away.
const DEFAULT_COLORS = ["#ef4444", "#3b82f6", "#10b981", "#eab308", "#f97316", "#a855f7", "#ffffff", "#1e293b"];
// How a wire without a color of its own is drawn (the renderer's DEFAULT_WIRE_COLOR).
const UNCOLORED_WIRE = "#777676";

let customColors: string[] = [];
// The board's wire colors not among the defaults or custom ones, in the order wires use them.
let boardColors: string[] = [];

// As "#rrggbb" in lowercase, or "" for anything else (only hex colors go into the swatches' HTML).
const hex = (color: string | undefined) => Utils.normalizeColor(color ?? UNCOLORED_WIRE, "").toLowerCase();

function colorsOnBoard(): string[] {
  const known = new Set([...DEFAULT_COLORS, ...customColors].map(hex));
  const found: string[] = [];
  for (const line of LineState.lines) {
    const color = hex(line.color);
    if (color && !known.has(color) && !found.includes(color)) found.push(color);
  }
  return found;
}

function saveCustomColorsToLocalStorage() {
  try {
    localStorage.setItem('custom_colors', JSON.stringify(customColors));
  } catch (e) {
    console.error("Failed to save custom colors to localStorage", e);
  }
}

function loadCustomColorsFromLocalStorage() {
  try {
    const stored = localStorage.getItem('custom_colors');
    if (stored) {
      // renderSwatches puts these into HTML attributes, so only well-formed hex colors get through.
      const parsed: unknown = JSON.parse(stored);
      customColors = Array.isArray(parsed)
        ? parsed.filter((c): c is string => typeof c === "string" && /^#[0-9A-Fa-f]{6}$/.test(c))
        : [];
    }
  } catch (e) {
    console.error("Failed to load custom colors from localStorage", e);
  }
}

function renderSwatches() {
  const container = document.getElementById('quickSwatches');
  if (!container) return;
  let html = `<button class="color-swatch color-swatch-add" id="toggleCustomColorPanelBtn" title="Custom color">＋</button>`;

  html += DEFAULT_COLORS.map(c =>
    `<button class="color-swatch" data-color="${c}" style="background:${c};" title="${c}"></button>`
  ).join('');

  html += customColors.map(c =>
    `<button class="color-swatch" data-color="${c}" data-custom="true" style="background:${c}; position:relative; border-color:#38bdf8;" title="${c} (Right-click to delete)"></button>`
  ).join('');

  html += boardColors.map(c =>
    `<button class="color-swatch" data-color="${c}" style="background:${c};" title="${c} (used on this board)"></button>`
  ).join('');

  container.innerHTML = html;

  document.getElementById('toggleCustomColorPanelBtn')?.addEventListener('click', () => {
    const panel = document.getElementById('customColorPanel');
    if (panel) {
      const isOpen = panel.style.display === 'flex';
      panel.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        setTimeout(() => {
          drawColorSpectrum();
        }, 50);
      }
    }
  });

  container.querySelectorAll('.color-swatch[data-color]').forEach((swatch) => {
    swatch.addEventListener('click', (e) => {
      const color = (e.currentTarget as HTMLElement).getAttribute('data-color');
      if (!color) return;
      ToolState.activeWireColor = color;
      const badge = document.getElementById('activeColorBadge');
      if (badge) {
        badge.style.background = color;
        badge.style.boxShadow = `0 0 6px ${color}`;
      }
      if (SelectionState.line) {
        setLineColor(color);
      }
      updateSelectionStatus();
    });

    swatch.addEventListener('contextmenu', (e) => {
      const target = e.currentTarget as HTMLElement;
      if (target.getAttribute('data-custom') === 'true') {
        e.preventDefault();
        const color = target.getAttribute('data-color');
        if (color) {
          customColors = customColors.filter(c => c !== color);
          saveCustomColorsToLocalStorage();
          boardColors = colorsOnBoard();
          renderSwatches();
        }
      }
    });
  });
}

loadCustomColorsFromLocalStorage();
renderSwatches();

// Every change ends in a redraw: the palette follows the board's wire colors.
onRedraw(() => {
  const colors = colorsOnBoard();
  if (colors.join() === boardColors.join()) return;
  boardColors = colors;
  renderSwatches();
});

// Mouse-Interactive 2D Color Spectrum Selector Handlers
const spectrumCanvas = document.getElementById('colorSpectrumCanvas') as HTMLCanvasElement;
const hueBar = document.getElementById('hueBar') as HTMLInputElement;
const spectrumHandle = document.getElementById('spectrumHandle');
const hexInput = document.getElementById('hexColorInput') as HTMLInputElement;
const previewBox = document.getElementById('colorPreviewBox');

let currentHue = 195;
let isMouseDownOnSpectrum = false;

function drawColorSpectrum() {
  if (!spectrumCanvas) return;
  const ctx = spectrumCanvas.getContext('2d');
  if (!ctx) return;
  const w = spectrumCanvas.width;
  const h = spectrumCanvas.height;

  // 1. Draw base Hue color background
  ctx.fillStyle = `hsl(${currentHue}, 100%, 50%)`;
  ctx.fillRect(0, 0, w, h);

  // 2. Horizontal gradient: White to transparent
  const whiteGrad = ctx.createLinearGradient(0, 0, w, 0);
  whiteGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  whiteGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = whiteGrad;
  ctx.fillRect(0, 0, w, h);

  // 3. Vertical gradient: Transparent to Black
  const blackGrad = ctx.createLinearGradient(0, 0, 0, h);
  blackGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  blackGrad.addColorStop(1, 'rgba(0, 0, 0, 1)');
  ctx.fillStyle = blackGrad;
  ctx.fillRect(0, 0, w, h);
}

function updatePickedColorFromMouse(clientX: number, clientY: number) {
  if (!spectrumCanvas) return;
  const rect = spectrumCanvas.getBoundingClientRect();
  const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
  const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

  if (spectrumHandle) {
    spectrumHandle.style.left = `${x}px`;
    spectrumHandle.style.top = `${y}px`;
  }

  // Sample exact pixel color from canvas
  const ctx = spectrumCanvas.getContext('2d');
  if (ctx) {
    const canvasX = Math.min(spectrumCanvas.width - 1, Math.max(0, Math.round((x / rect.width) * spectrumCanvas.width)));
    const canvasY = Math.min(spectrumCanvas.height - 1, Math.max(0, Math.round((y / rect.height) * spectrumCanvas.height)));
    const pixel = ctx.getImageData(canvasX, canvasY, 1, 1).data;
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];
    const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

    if (hexInput) hexInput.value = hex;
    if (previewBox) previewBox.style.background = hex;
    ToolState.activeWireColor = hex;
    const badge = document.getElementById('activeColorBadge');
    if (badge) {
      badge.style.background = hex;
      badge.style.boxShadow = `0 0 6px ${hex}`;
    }
  }
}

hueBar?.addEventListener('input', () => {
  currentHue = parseInt(hueBar.value || "0");
  drawColorSpectrum();
  if (spectrumHandle && spectrumCanvas) {
    const rect = spectrumCanvas.getBoundingClientRect();
    const handleX = parseFloat(spectrumHandle.style.left) || rect.width / 2;
    const handleY = parseFloat(spectrumHandle.style.top) || rect.height / 2;
    updatePickedColorFromMouse(rect.left + handleX, rect.top + handleY);
  }
});

spectrumCanvas?.addEventListener('pointerdown', (e) => {
  isMouseDownOnSpectrum = true;
  updatePickedColorFromMouse(e.clientX, e.clientY);
});

window.addEventListener('pointermove', (e) => {
  if (isMouseDownOnSpectrum) {
    updatePickedColorFromMouse(e.clientX, e.clientY);
  }
});

window.addEventListener('pointerup', () => {
  isMouseDownOnSpectrum = false;
});

document.getElementById('addCustomColorToPaletteBtn')?.addEventListener('click', () => {
  const hex = hexInput?.value.trim();
  if (hex && /^#[0-9A-Fa-f]{6}$/.test(hex)) {
    if (!customColors.includes(hex)) {
      customColors.push(hex);
      saveCustomColorsToLocalStorage();
      boardColors = colorsOnBoard();
      renderSwatches();
    }
    ToolState.activeWireColor = hex;
    const badge = document.getElementById('activeColorBadge');
    if (badge) badge.style.background = hex;
    if (SelectionState.line) {
      setLineColor(hex);
    }
  }
});
