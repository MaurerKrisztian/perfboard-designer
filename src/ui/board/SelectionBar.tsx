import {SelectionState} from "../../state/SelectionState";
import {Icon} from "../components/Icon";
import {shallowEqual, useEditor} from "../hooks/use-editor";
import {ACTIONS, availableActions, deselect, runSelectionAction, selectionLabel} from "./selection-actions";

// What can be done to the selected part, wire or pad (or to several parts and wires), as a bar
// floating over the board's bottom edge: the same actions as the context menu. It stays up while
// Select more is on, so it can be turned off again.
export function SelectionBar() {
  const shown = useEditor(() => SelectionState.current !== undefined || SelectionState.adding);
  const adding = useEditor(() => SelectionState.adding);
  const label = useEditor(selectionLabel);
  const actions = useEditor(availableActions, shallowEqual);
  return (
    <div id="selectionBar" className="selection-bar" role="toolbar" aria-label="Selected item" hidden={!shown}>
      <span className="selection-bar-label">{label}</span>
      {actions.map(action => {
        const {icon, label, title} = ACTIONS[action];
        const toggle = action === "select-more";
        const className = action === "delete" ? "is-danger" : toggle && adding ? "is-on" : undefined;
        return (
          <button key={action} data-action={action} className={className} title={title}
            aria-pressed={toggle ? adding : undefined}
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
