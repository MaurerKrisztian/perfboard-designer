// Each pointer event's board point, as first mapped (Canvas.toDrawingCoordinates).
const mappedEvents = new WeakMap<MouseEvent, {x: number, y: number}>();

// The board's canvas and the scrolling viewport around it. The React board component
// (src/ui/board/BoardCanvas.tsx) hands them over through attachBoard() once they're on the page;
// until then nothing is drawn, so code that touches the element runs only after that.
export class Canvas {
  static c: HTMLCanvasElement;
  static ctx: CanvasRenderingContext2D;
  // The scrolling box the canvas sits in: panning and anchored zooms move its scroll position.
  static viewport: HTMLElement;
  // The board's size in drawing px (holes × pitch), whatever resolution the canvas is drawn at.
  static gridWidth = 500;
  static gridHeight = 500;
  // How far the canvas reaches past the board on each side, in drawing px, to show parts that pass
  // its edge (src/features/draw-canvas.ts). The board's top-left corner stays drawing point (0, 0).
  static margin = {left: 0, top: 0, right: 0, bottom: 0};

  // The whole canvas's size in drawing px: the board and its margin.
  static get drawingWidth(): number {
    return Canvas.gridWidth + Canvas.margin.left + Canvas.margin.right;
  }

  static get drawingHeight(): number {
    return Canvas.gridHeight + Canvas.margin.top + Canvas.margin.bottom;
  }

  static get isAttached(): boolean {
    return Canvas.c !== undefined;
  }

  static attach(canvas: HTMLCanvasElement, viewport: HTMLElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("The board needs a 2D canvas, which this browser doesn't offer.");
    Canvas.c = canvas;
    Canvas.ctx = ctx;
    Canvas.viewport = viewport;
  }

  // Where a pointer event is on the board, in drawing px. An event keeps the point it was first
  // mapped to: a gesture maps its landing event again when it ends (a tap lifts, a long press opens
  // the menu), and by then the board may have moved on screen, since React lays out what the
  // landing changed after the event. Mapped afresh, it would aim at the wrong hole.
  static toDrawingCoordinates(e: MouseEvent): {x: number, y: number} {
    const known = mappedEvents.get(e);
    if (known) return {...known};
    const rect = Canvas.c.getBoundingClientRect();
    const scaleX = Canvas.drawingWidth / rect.width;
    const scaleY = Canvas.drawingHeight / rect.height;
    const point = {
      x: (e.clientX - rect.left) * scaleX - Canvas.margin.left,
      y: (e.clientY - rect.top) * scaleY - Canvas.margin.top,
    };
    mappedEvents.set(e, point);
    return {...point};
  }
}
