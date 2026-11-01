import {useEffect, useRef} from "react";
import {attachBoard} from "../../features/editor";
import {Canvas} from "../../state/Canvas";
import {useEditor} from "../hooks/use-editor";

// The board itself: a canvas the editor core draws on and takes input from (attachBoard), in a
// viewport that scrolls when the board is bigger than it. React only puts the elements on the
// page: the core sizes the canvas and sets its cursor, so it gets no size or style from here. The
// canvas can reach past the board to show parts that pass its edge, so the board's shadow is its
// own element, under the canvas, on the board's part of it.
export function BoardCanvas() {
  const viewport = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const shadowInset = useEditor(boardInset);

  useEffect(() => {
    if (!canvas.current || !viewport.current) return;
    return attachBoard(canvas.current, viewport.current);
  }, []);

  return (
    <div id="canvas-container" ref={viewport}>
      <div id="canvasZoomWrapper">
        <div className="board-shadow" style={{inset: shadowInset}}/>
        <canvas id="myCanvas" ref={canvas}/>
      </div>
    </div>
  );
}

// Where the board is within the canvas, as a CSS inset: in percent, so zooming leaves it alone.
function boardInset(): string {
  const {top, right, bottom, left} = Canvas.margin;
  const percent = (part: number, whole: number) => `${part / whole * 100}%`;
  return [
    percent(top, Canvas.drawingHeight), percent(right, Canvas.drawingWidth),
    percent(bottom, Canvas.drawingHeight), percent(left, Canvas.drawingWidth),
  ].join(" ");
}
