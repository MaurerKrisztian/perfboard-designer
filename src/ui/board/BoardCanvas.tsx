import {useEffect, useRef} from "react";
import {attachBoard} from "../../features/editor";

// The board itself: a canvas the editor core draws on and takes input from (attachBoard), in a
// viewport that scrolls when the board is bigger than it. React only puts the elements on the
// page: the core sizes the canvas and sets its cursor, so it gets no size or style from here.
export function BoardCanvas() {
  const viewport = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current || !viewport.current) return;
    return attachBoard(canvas.current, viewport.current);
  }, []);

  return (
    <div id="canvas-container" ref={viewport}>
      <div id="canvasZoomWrapper">
        <canvas id="myCanvas" ref={canvas}/>
      </div>
    </div>
  );
}
