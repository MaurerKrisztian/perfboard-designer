import {SelectionState} from "../../state/SelectionState";
import {Icon} from "../components/Icon";
import {shallowEqual, useEditor} from "../hooks/use-editor";
import {ACTIONS, availableActions, deselect, runSelectionAction, selectionLabel} from "./selection-actions";

// What can be done to the selected part, wire or pad, as a bar floating over the board's bottom
// edge: the same actions as the context menu.
export function SelectionBar() {
  const selected = useEditor(() => SelectionState.current !== undefined);
  const label = useEditor(selectionLabel);
  const actions = useEditor(availableActions, shallowEqual);
  return (
    <div id="selectionBar" className="selection-bar" role="toolbar" aria-label="Selected item" hidden={!selected}>
      <span className="selection-bar-label">{label}</span>
      {actions.map(action => {
        const {icon, label, title} = ACTIONS[action];
        return (
          <button key={action} data-action={action} className={action === "delete" ? "is-danger" : undefined} title={title}
            onClick={e => runSelectionAction(action, e.currentTarget)}>
            <Icon name={icon}/><span>{label}</span>
          </button>
        );
      })}
      <button data-action="deselect" className="selection-bar-close" title="Deselect (Esc)" aria-label="Deselect" onClick={deselect}>
        <Icon name="x"/>
      </button>
    </div>
  );
}
