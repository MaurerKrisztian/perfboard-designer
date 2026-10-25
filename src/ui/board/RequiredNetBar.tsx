import {cancelRequiredNet, saveRequiredNet} from "../../features/required-nets";
import {ToolState} from "../../state/ToolState";
import {Icon} from "../components/Icon";
import {useEditor} from "../hooks/use-editor";

// While a required net's pins are being picked (the Nets panel's Required connections), a bar over
// the board's bottom edge with how many are picked, Save and Cancel: the way to finish on a phone,
// where the panel is a sheet put away to tap the board.
export function RequiredNetBar() {
  const tool = useEditor(() => ToolState.active.kind === "required-net" ? ToolState.active : undefined);
  if (!tool) return null;
  const count = tool.picked.length;
  const deletes = !!tool.netId && count < 2;
  return (
    <div className="selection-bar required-net-bar" role="toolbar" aria-label="Required net">
      <span className="selection-bar-label">{tool.netId ? "Editing net" : "New net"}: {count} pin{count === 1 ? "" : "s"}</span>
      <button className="is-primary" disabled={!tool.netId && count < 2} title="Save the net (Enter)" onClick={saveRequiredNet}>
        <Icon name="check"/><span>{deletes ? "Delete net" : "Save net"}</span>
      </button>
      <button title="Cancel (Esc)" onClick={cancelRequiredNet}><Icon name="x"/><span>Cancel</span></button>
    </div>
  );
}
