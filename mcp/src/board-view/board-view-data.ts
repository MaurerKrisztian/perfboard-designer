// What show_board hands its view (view.ts), in its result's _meta.board.
export interface BoardViewData {
  // The picture of the board (board-image.ts).
  svg: string;
  // A line saying what it shows, e.g. "3-led-5v: a 20×15 perfboard".
  caption: string;
  // The share link that opens it in the editor.
  link?: string;
}
