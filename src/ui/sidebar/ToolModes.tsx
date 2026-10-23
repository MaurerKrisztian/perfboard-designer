import {ToolMode, ToolState} from "../../state/ToolState";
import {BoardState} from "../../state/BoardState";
import {setActiveTool} from "../../features/active-tool";
import {Icon, IconName} from "../components/Icon";
import {useEditor} from "../hooks/use-editor";
import {cx} from "../lib/class-names";

// The tool modes as a row, for the phone's More sheet (wider screens have the tool rail): what a
// tap on the board does when no part or wire is armed. Cut exists only on a stripboard.

const MODES: {mode: ToolMode; icon: IconName; label: string; title: string}[] = [
  {mode: "select", icon: "select", label: "Select", title: "Select, move and pan"},
  {mode: "eraser", icon: "eraser", label: "Erase", title: "Erase what you tap"},
  {mode: "note", icon: "note", label: "Note", title: "Add a note to a pad"},
  {mode: "cut", icon: "cut", label: "Cut", title: "Cut the strip at a hole"},
];

export function ToolModes() {
  const active = useEditor(() => ToolState.active.kind);
  const stripboard = useEditor(() => BoardState.isStripboard);
  return (
    <div className="tool-modes" id="toolModeSelector">
      {MODES.map(({mode, icon, label, title}) => (
        <button key={mode} className={cx("tool-mode-btn", active === mode && "active-mode")} data-mode={mode} title={title}
          hidden={mode === "cut" && !stripboard} onClick={() => setActiveTool({kind: mode})}>
          <Icon name={icon} className="tool-icon"/>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
