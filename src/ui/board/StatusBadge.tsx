import {useEditor} from "../hooks/use-editor";
import {useTouchScreen} from "../hooks/use-media-query";
import {forTouch, sameMessage, statusMessage} from "./status-text";

// The board toolbar's status: what's selected, or what the next click does.
export function StatusBadge() {
  const message = useEditor(statusMessage, sameMessage);
  const touch = useTouchScreen();
  const text = touch ? forTouch(message.text) : message.text;
  return (
    <div id="activeSelectionStatus" className="status-badge" title={text}>
      {message.swatch && (
        <span style={{display: "inline-block", width: 10, height: 10, borderRadius: "50%", marginRight: 4, background: message.swatch}}/>
      )}
      <span>{message.swatch ? ` ${text}` : text}</span>
    </div>
  );
}
