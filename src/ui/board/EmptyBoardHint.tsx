import {useState} from "react";
import {DotState} from "../../state/DotState";
import {LineState} from "../../state/LineState";
import {PartState} from "../../state/PartState";
import {importSharedProject} from "../../features/project/current-project";
import {fitToScreen} from "../../features/zoom";
import blinker from "../../../examples/perfboard-555-blinker.json";
import {useEditor} from "../hooks/use-editor";
import {usePhoneLayout} from "../hooks/use-media-query";
import {setSheet} from "../layout/layout-store";

// Over an empty board: how to start, and an example to look around in. It goes once the board has
// anything on it (a part, a wire or a note), or when dismissed.

const isBoardEmpty = () => !PartState.parts.length && !LineState.lines.length && !DotState.dots.some(dot => dot.description);

function openExample() {
  importSharedProject(blinker, "555 blinker");
  fitToScreen(true);
}

export function EmptyBoardHint() {
  const empty = useEditor(isBoardEmpty);
  const phone = usePhoneLayout();
  const [dismissed, setDismissed] = useState(false);
  if (!empty || dismissed) return null;

  // The parts list's search box (ComponentsSection), or on a phone the Add sheet.
  const addPart = () => phone ? setSheet("add") : document.getElementById("catalogSearch")?.focus();

  return (
    <div className="empty-board">
      <div className="empty-board-card" role="note" aria-labelledby="emptyBoardTitle">
        <button className="empty-board-close" aria-label="Dismiss" title="Dismiss" onClick={() => setDismissed(true)}>✕</button>
        <h2 id="emptyBoardTitle">Start your board</h2>
        <p>
          {phone
            ? "Tap Add to place your first part, then hold a pad and drag to run a wire."
            : "Pick a part on the left and click a hole to place it. Drag from one pad to another to run a wire."}
        </p>
        <div className="empty-board-actions">
          <button className="btn-accent" onClick={addPart}>Add a part</button>
          <button onClick={openExample}>Open the 555 blinker</button>
        </div>
      </div>
    </div>
  );
}
