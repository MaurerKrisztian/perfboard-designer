import {useState} from "react";
import {BoardState} from "../../state/BoardState";
import {DotState} from "../../state/DotState";
import {LineState} from "../../state/LineState";
import {PartState} from "../../state/PartState";
import {ProjectState} from "../../state/ProjectState";
import {importSharedProject} from "../../features/project/current-project";
import {changeOpenBoard, NewBoard} from "../../features/project/new-board";
import {boardSize} from "../../features/project/resize-grid";
import {fitToScreen} from "../../features/zoom";
import blinker from "../../../examples/perfboard-555-blinker.json";
import {BoardSetupFields, boardSpan, describeBoard} from "../components/BoardSetupFields";
import {useEditor} from "../hooks/use-editor";
import {usePhoneLayout} from "../hooks/use-media-query";
import {Icon} from "../components/Icon";

// Over an empty board: the board it's on (to change before anything is placed on it), and three
// ways to start: from scratch (which puts the card away), from the 555 blinker example, or by
// having an AI agent design it through the MCP server (its page, in a new tab). It goes once the
// board has anything on it (a part, a wire or a note), or when put away, until another project is
// opened.

const isBoardEmpty = () => !PartState.parts.length && !LineState.lines.length && !DotState.dots.some(dot => dot.description);

function openExample() {
  importSharedProject(blinker, "555 blinker");
  fitToScreen(true);
}

export function EmptyBoardHint() {
  const empty = useEditor(isBoardEmpty);
  const phone = usePhoneLayout();
  const projectId = useEditor(() => ProjectState.current?.id);
  const type = useEditor(() => BoardState.setup.type);
  const strips = useEditor(() => BoardState.setup.strips);
  const cols = useEditor(() => boardSize().cols);
  const rows = useEditor(() => boardSize().rows);
  // Which project it was dismissed on, or set up on: they last until another one opens.
  const [dismissedOn, setDismissedOn] = useState<{id?: string}>();
  const [changingOn, setChangingOn] = useState<{id?: string}>();
  if (!empty || (dismissedOn && dismissedOn.id === projectId)) return null;
  const changing = changingOn?.id === projectId;
  const board: NewBoard = {type, strips, cols, rows};

  // Starting from scratch puts the card away and, beside the board, puts the cursor in the parts
  // list's search box (ComponentsSection) to find the first part.
  const startFromScratch = () => {
    setDismissedOn({id: projectId});
    if (!phone) document.getElementById("catalogSearch")?.focus();
  };

  return (
    <div className="empty-board">
      <div className="empty-board-card" role="note" aria-labelledby="emptyBoardTitle">
        <button className="empty-board-close" aria-label="Dismiss" title="Dismiss" onClick={() => setDismissedOn({id: projectId})}>✕</button>
        <h2 id="emptyBoardTitle">Start your board</h2>
        <div className="empty-board-setup">
          <span className="empty-board-setup-text">
            <strong>{describeBoard(board)}</strong>
            <span>{boardSpan(board)}</span>
          </span>
          <button className="empty-board-change" aria-expanded={changing}
            onClick={() => setChangingOn(changing ? undefined : {id: projectId})}>{changing ? "Done" : "Change"}</button>
        </div>
        {changing && <BoardSetupFields board={board} onChange={next => void changeOpenBoard(next)} idPrefix="emptyBoard"/>}
        <div className="empty-board-choices">
          <button className="empty-board-choice is-primary" onClick={startFromScratch}>
            <Icon name="plus" className="icon empty-board-choice-icon"/>
            <span className="empty-board-choice-text">
              <strong>Start from scratch</strong>
              <span>{phone
                ? "Tap Add to place a part, then hold a pad and drag to run a wire."
                : "Pick a part on the left, click a hole to place it, and drag between pads to wire."}</span>
            </span>
          </button>
          <button className="empty-board-choice" onClick={openExample}>
            <Icon name="chip" className="icon empty-board-choice-icon"/>
            <span className="empty-board-choice-text">
              <strong>Open an example</strong>
              <span>A 555 LED blinker, finished and wired, to look around in.</span>
            </span>
          </button>
          <a className="empty-board-choice" href="../mcp-server/" target="_blank" rel="noopener">
            <Icon name="sparkle" className="icon empty-board-choice-icon"/>
            <span className="empty-board-choice-text">
              <strong>Design it with AI <Icon name="external" className="icon empty-board-external"/></strong>
              <span>Connect Claude, ChatGPT or Cursor to our MCP server and describe the circuit you want.</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
