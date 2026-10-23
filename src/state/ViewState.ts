export class ViewState {
  // Silkscreen-style labels on parts: each part's ref and value ("R1 10kΩ").
  static showPartLabels = false;
  // Space is held down: any left-drag on the board pans it (see select.ts).
  static spacePanHeld = false;
  // The board shown from below for soldering (solder-view.ts): read-only while it's on.
  static solderSide = false;
  // How many holes that view marks to solder.
  static solderJointCount = 0;
  // How big the board is shown: 1 is 100% (zoom.ts).
  static zoom = 1;
  // Fit was pressed: the board is zoomed to fit, and the Fit button now offers 100% instead.
  static fitMode = false;
  // What's under the pointer, in words: the hovered hole's note or part's value (hover.ts).
  // Undefined until the pointer first moves over the board.
  static hoverText: string | undefined;
}
