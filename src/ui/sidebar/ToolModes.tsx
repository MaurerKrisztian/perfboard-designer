import {ToolMode, ToolState} from "../../state/ToolState";
import {BoardState} from "../../state/BoardState";
import {setActiveTool} from "../../features/active-tool";
import {Icon, IconName} from "../components/Icon";
import {useEditor} from "../hooks/use-editor";
import {cx} from "../lib/class-names";

// The tool modes: what a click on the board does when no part or wire is armed. Picking one also
// drops anything armed. Cut exists only on a stripboard.

const MODES: {mode: ToolMode; icon: IconName; label: string; title: string}[] = [
  {mode: "select", icon: "select", label: "Select", title: "Select, move and pan"},
  {mode: "eraser", icon: "eraser", label: "Eraser", title: "Erase what you click"},
  {mode: "note", icon: "note", label: "Note", title: "Add a note to a pad"},
  {mode: "cut", icon: "cut", label: "Cut", title: "Cut the strip at a hole"},
];

export function ToolModes() {
  const active = useEditor(() => ToolState.active.kind);
  const stripboard = useEditor(() => BoardState.isStripboard);
  return (
    <div className="tool-mode-block">
      <div className="tool-mode-grid" id="toolModeSelector">
        {MODES.map(({mode, icon, label, title}) => (
          <button key={mode} className={cx("tool-mode-btn", active === mode && "active-mode")} data-mode={mode} title={title}
            hidden={mode === "cut" && !stripboard} onClick={() => setActiveTool({kind: mode})}>
            <Icon name={icon} className="tool-icon"/>
            <span className="tool-label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
