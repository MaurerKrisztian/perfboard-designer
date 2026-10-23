import {ActiveTool, ToolState} from "../../state/ToolState";
import {BoardState} from "../../state/BoardState";
import {setActiveTool} from "../../features/active-tool";
import {toggleRouteTool} from "../../features/wire";
import {Icon, IconName} from "../components/Icon";
import {useEditor} from "../hooks/use-editor";
import {cx} from "../lib/class-names";

// The tool rail along the left edge (wider screens; a phone has its bottom toolbar): what a click
// on the board does. The modes first, then the two that draw: wires and solder paths. Cut exists
// only on a stripboard.

type RailTool = "select" | "eraser" | "note" | "cut" | "wire" | "solder";

interface RailEntry {
  tool: RailTool;
  icon: IconName;
  label: string;
  title: string;
  key?: string;
}

const MODES: RailEntry[] = [
  {tool: "select", icon: "select", label: "Select", title: "Select, move and pan (Esc)"},
  {tool: "eraser", icon: "eraser", label: "Erase", title: "Erase what you click"},
  {tool: "note", icon: "note", label: "Note", title: "Add a note to a pad"},
  {tool: "cut", icon: "cut", label: "Cut", title: "Cut the strip at a hole, or mend a cut"},
];

const DRAWING: RailEntry[] = [
  {tool: "wire", icon: "wire", label: "Wire", title: "Wire: insulated jumpers, joined only at their ends (W)", key: "W"},
  {tool: "solder", icon: "solder-path", label: "Solder", title: "Solder path: a trail of solder joining every hole it runs over (S)", key: "S"},
];

function pick(tool: RailTool) {
  if (tool === "wire" || tool === "solder") toggleRouteTool(tool);
  else setActiveTool({kind: tool} as ActiveTool);
}

export function ToolRail() {
  const active = useEditor(() => ToolState.active.kind);
  const stripboard = useEditor(() => BoardState.isStripboard);
  const button = ({tool, icon, label, title, key}: RailEntry) => (
    <button key={tool} className={cx("rail-btn", active === tool && "is-active")} title={title} aria-pressed={active === tool}
      hidden={tool === "cut" && !stripboard} onClick={() => pick(tool)}>
      <Icon name={icon}/>
      <span>{label}</span>
      {key && <span className="rail-key" aria-hidden="true">{key}</span>}
    </button>
  );
  return (
    <nav className="tool-rail" aria-label="Tools">
      {MODES.map(button)}
      <div className="rail-divider" role="separator"/>
      {DRAWING.map(button)}
    </nav>
  );
}
