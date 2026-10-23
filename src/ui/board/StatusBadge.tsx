import {useEditor} from "../hooks/use-editor";
import {useTouchScreen} from "../hooks/use-media-query";
import {cx} from "../lib/class-names";
import {forTouch, sameMessage, splitHints, StatusMessage, statusMessage} from "./status-text";

// The status: what's selected, or what the next click does, and its hints. On wider screens the
// toolbar shows the first part (StatusBadge) and the stage's foot the hints (StatusHints); a phone
// shows both together, over the board.

function useStatus(): {message: StatusMessage; main: string; hints: string[]; text: string} {
  const message = useEditor(statusMessage, sameMessage);
  const touch = useTouchScreen();
  const text = touch ? forTouch(message.text) : message.text;
  return {message, text, ...splitHints(text)};
}

export function StatusBadge({withHints}: {withHints: boolean}) {
  const {message, main, hints, text} = useStatus();
  return (
    <div id="activeSelectionStatus" className={cx("status-badge", message.armed && "is-armed")} title={text}>
      {message.swatch && <span className="status-swatch" style={{background: message.swatch}}/>}
      <span className="status-main">{main}</span>
      {/* Spaces between, so the line reads as text too (its textContent). */}
      {withHints && hints.map(hint => <span key={hint}> <span className="status-hint">{hint}</span></span>)}
    </div>
  );
}

export function StatusHints() {
  const {hints} = useStatus();
  return (
    <div className="status-hints" title={hints.join(". ")}>
      {hints.map((hint, i) => <span key={hint}>{i > 0 && " "}<span className="status-hint">{hint}</span></span>)}
    </div>
  );
}
