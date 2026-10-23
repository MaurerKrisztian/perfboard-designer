import {LineState} from "../../../state/LineState";
import {setWireColor} from "../../../features/wire";
import {Utils} from "../../../utils/utils";
import {useEditor, shallowEqual} from "../../hooks/use-editor";
import {useStore} from "../../lib/store";
import {customColorsStore, removeCustomColor} from "./custom-colors";

// The wire palette: the built-in colours, the ones the user added (right-click one to take it
// away), and every other colour a wire on this board has, however it got it, so any colour in use
// is a click away. A click sets the colour new wires get, and the selected wire's; that colour's
// swatch is ringed.

const DEFAULT_COLORS = ["#ef4444", "#3b82f6", "#10b981", "#eab308", "#f97316", "#a855f7", "#ffffff", "#1e293b"];
// How a wire without a colour of its own is drawn (the renderer's DEFAULT_WIRE_COLOR).
const UNCOLORED_WIRE = "#777676";

// As "#rrggbb" in lowercase, or "" for anything else.
const hex = (color: string | undefined) => Utils.normalizeColor(color ?? UNCOLORED_WIRE, "").toLowerCase();

// The board's wire colours not in the palette already, in the order wires use them.
function colorsOnBoard(palette: string[]): string[] {
  const known = new Set(palette.map(hex));
  const found: string[] = [];
  for (const line of LineState.lines) {
    const color = hex(line.color);
    if (color && !known.has(color) && !found.includes(color)) found.push(color);
  }
  return found;
}

export function ColorPalette({active, onToggleCustomColor}: {active: string; onToggleCustomColor: () => void}) {
  const customColors = useStore(customColorsStore, state => state.colors);
  const boardColors = useEditor(() => colorsOnBoard([...DEFAULT_COLORS, ...customColors]), shallowEqual);
  const activeHex = hex(active);
  const swatch = (color: string, key: string, title: string, onContextMenu?: () => void) => (
    <Swatch key={key} color={color} title={title} active={hex(color) === activeHex} onContextMenu={onContextMenu}/>
  );
  return (
    <div className="swatch-grid" id="quickSwatches" role="group" aria-label="Colour">
      {DEFAULT_COLORS.map(color => swatch(color, color, color))}
      {customColors.map(color => swatch(color, `custom-${color}`, `${color} (right-click to remove it)`, () => removeCustomColor(color)))}
      {boardColors.map(color => swatch(color, `board-${color}`, `${color} (used on this board)`))}
      <button className="color-swatch color-swatch-add" title="Pick another colour" aria-label="Pick another colour" onClick={onToggleCustomColor}>+</button>
    </div>
  );
}

function Swatch({color, title, active, onContextMenu}: {color: string; title: string; active: boolean; onContextMenu?: () => void}) {
  return (
    <button className={active ? "color-swatch is-active" : "color-swatch"} title={title} aria-label={title} aria-pressed={active}
      style={{background: color}} onClick={() => setWireColor(color)}
      onContextMenu={onContextMenu && (e => {
        e.preventDefault();
        onContextMenu();
      })}/>
  );
}
