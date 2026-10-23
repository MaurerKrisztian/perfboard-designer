import {useEffect} from "react";
import {Canvas} from "../../state/Canvas";
import {showWholeBoard} from "../../features/zoom";
import {useEditor} from "../hooks/use-editor";
import {usePhoneLayout} from "../hooks/use-media-query";
import {BoardToolbar} from "./BoardToolbar";
import {BoardCanvas} from "./BoardCanvas";
import {SelectionBar} from "./SelectionBar";
import {HoverReadout} from "./HoverReadout";
import {StatusHints} from "./StatusBadge";
import {EmptyBoardHint} from "./EmptyBoardHint";

// The middle of the page: the board's toolbar, the board with the selection bar over its bottom
// edge (and, while it's empty, how to start), and along the foot the status's hints and what's
// under the pointer. On a phone the toolbar, hints and all, floats over the board instead.
export function BoardWorkspace() {
  const phone = usePhoneLayout();
  useFitWholeBoardOnPhone(phone);
  return (
    <section className="canvas-viewport" id="canvasViewportSection">
      {!phone && <BoardToolbar/>}
      <div className="board-stage" id="boardStage">
        {phone && <BoardToolbar/>}
        <BoardCanvas/>
        <SelectionBar/>
        <EmptyBoardHint/>
      </div>
      <footer className="stage-foot">
        {!phone && <StatusHints/>}
        <HoverReadout/>
      </footer>
    </section>
  );
}

// A phone shows the whole board whenever one of a different size is opened (at startup too),
// rather than the desktop's 100%, which is wider than the screen.
function useFitWholeBoardOnPhone(phone: boolean) {
  const size = useEditor(() => `${Canvas.gridWidth}x${Canvas.gridHeight}`);
  useEffect(() => {
    if (!phone) return;
    const frame = requestAnimationFrame(showWholeBoard);
    return () => cancelAnimationFrame(frame);
  }, [phone, size]);
}
