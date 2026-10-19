export class ViewState {
  // Silkscreen-style labels on parts: each part's ref and value ("R1 10kΩ").
  static showPartLabels = false;
  // Space is held down: any left-drag on the board pans it (see select.ts).
  static spacePanHeld = false;
  // The board shown from below for soldering (solder-view.ts): read-only while it's on.
  static solderSide = false;
  // How many holes that view marks to solder.
  static solderJointCount = 0;
}
