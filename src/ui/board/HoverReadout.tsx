import {ViewState} from "../../state/ViewState";
import {useEditor} from "../hooks/use-editor";

// Along the stage's foot: the note of the hole under the pointer, or the value of the part under
// it; nothing while there's nothing under it.
export function HoverReadout() {
  const text = useEditor(() => ViewState.hoverText);
  return <div id="dotDescription">{text}</div>;
}
