export class ViewState {
  // Silkscreen-style labels on parts: each part's ref and value ("R1 10kΩ").
  static showPartLabels = false;
  // Space is held down: any left-drag on the board pans it (see select.ts).
  static spacePanHeld = false;
  // Shift is held down: a click of the wire or solder path tool bends it even on a hole it would
  // connect to, which its preview shows (see select.ts, wire-tool.ts).
  static shiftHeld = false;
  // The board shown from below for soldering (solder-view.ts): read-only while it's on.
  static solderSide = false;
  // How many holes that view marks to solder.
  static solderJointCount = 0;
  // How big the board is shown: 1 is 100% (zoom.ts).
  static zoom = 1;
  // Fit was pressed: the board is zoomed to fit, and the Fit button now offers 100% instead.
  static fitMode = false;
  // The value of the part under the pointer, if any (hover.ts).
  static hoverValue: string | undefined;
}
