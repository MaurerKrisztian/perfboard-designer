import {hoverReadout} from "../../features/hover";
import {useEditor} from "../hooks/use-editor";

// Along the stage's foot: the hovered hole's pins, net, note or part value.
export function HoverReadout() {
  const text = useEditor(hoverReadout);
  return <div id="dotDescription" title={text || undefined}>{text}</div>;
}
