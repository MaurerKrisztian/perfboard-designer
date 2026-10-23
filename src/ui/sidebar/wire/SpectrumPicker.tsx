import {useEffect, useRef, useState} from "react";
import {setWireColor} from "../../../features/wire";
import {addCustomColor, HEX_COLOR} from "./custom-colors";

// A colour picker of its own for wires: a saturation and brightness square to click or drag in, a
// hue slider, and the colour as hex. Picking sets the colour new wires get; "Add Color to Palette"
// keeps it, and gives it to the selected wire too.

const SPECTRUM_WIDTH = 280;
const SPECTRUM_HEIGHT = 130;

function drawSpectrum(canvas: HTMLCanvasElement, hue: number) {
  const ctx = canvas.getContext("2d", {willReadFrequently: true});
  if (!ctx) return;
  const {width: w, height: h} = canvas;
  ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.fillRect(0, 0, w, h);
  // White from the left, black from the bottom.
  const white = ctx.createLinearGradient(0, 0, w, 0);
  white.addColorStop(0, "rgba(255, 255, 255, 1)");
  white.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = white;
  ctx.fillRect(0, 0, w, h);
  const black = ctx.createLinearGradient(0, 0, 0, h);
  black.addColorStop(0, "rgba(0, 0, 0, 0)");
  black.addColorStop(1, "rgba(0, 0, 0, 1)");
  ctx.fillStyle = black;
  ctx.fillRect(0, 0, w, h);
}

// The colour under (x, y), in CSS px from the canvas's top-left corner.
function colorAt(canvas: HTMLCanvasElement, x: number, y: number): string {
  const rect = canvas.getBoundingClientRect();
  const px = Math.min(canvas.width - 1, Math.max(0, Math.round((x / rect.width) * canvas.width)));
  const py = Math.min(canvas.height - 1, Math.max(0, Math.round((y / rect.height) * canvas.height)));
  const [r, g, b] = canvas.getContext("2d", {willReadFrequently: true})?.getImageData(px, py, 1, 1).data ?? [0, 0, 0];
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function SpectrumPicker() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [hue, setHue] = useState(195);
  const [handle, setHandle] = useState({x: 240, y: 20});
  const [hex, setHex] = useState("#38bdf8");
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (canvas.current) drawSpectrum(canvas.current, hue);
  }, [hue]);

  // Picks the colour at a point on screen, kept inside the square.
  const pickAt = (clientX: number, clientY: number) => {
    const el = canvas.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
    const color = colorAt(el, x, y);
    setHandle({x, y});
    setHex(color);
    setWireColor(color, false);
  };

  // A drag carries on outside the square, until the button is let go anywhere.
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => pickAt(e.clientX, e.clientY);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  });

  // A new hue: the square is redrawn, and the colour under the handle picked again.
  const changeHue = (next: number) => {
    setHue(next);
    const el = canvas.current;
    if (!el) return;
    drawSpectrum(el, next);
    const rect = el.getBoundingClientRect();
    pickAt(rect.left + handle.x, rect.top + handle.y);
  };

  const addToPalette = () => {
    const color = hex.trim();
    if (!HEX_COLOR.test(color)) return;
    addCustomColor(color);
    setWireColor(color);
  };

  return (
    <div id="customColorPanel" className="spectrum-picker">
      <div className="spectrum-head">
        <span>Pick a colour</span>
        <label className="spectrum-hex">
          <span>Hex</span>
          <input type="text" value={hex} onChange={e => setHex(e.target.value)} aria-label="Hex colour"/>
          <span className="spectrum-preview" style={{background: hex}}/>
        </label>
      </div>

      <div className="spectrum-area">
        <canvas ref={canvas} width={SPECTRUM_WIDTH} height={SPECTRUM_HEIGHT}
          onPointerDown={e => {
            setDragging(true);
            pickAt(e.clientX, e.clientY);
          }}/>
        <div className="spectrum-handle" style={{left: handle.x, top: handle.y}}/>
      </div>

      <label className="spectrum-hue">
        <span>Hue</span>
        <input type="range" min="0" max="360" value={hue} onChange={e => changeHue(parseInt(e.target.value || "0"))}
          className="rainbow-slider" aria-label="Hue"/>
      </label>

      <button className="btn-accent" onClick={addToPalette}>Add to palette</button>
    </div>
  );
}
