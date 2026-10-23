import {ViewState} from "../../state/ViewState";
import {useEditor} from "../hooks/use-editor";
import {usePhoneLayout} from "../hooks/use-media-query";

// Under the board: the note of the hole under the pointer, or the value of the part under it. Its
// hint is about hovering, which a finger can't do, so a phone starts it empty.
export function HoverReadout() {
  const text = useEditor(() => ViewState.hoverText);
  const phone = usePhoneLayout();
  const hint = phone ? "" : "Hover a pad or component to view its description / value...";
  return <div id="dotDescription" style={{width: "100%"}}>{text ?? hint}</div>;
}
