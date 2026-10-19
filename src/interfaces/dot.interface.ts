export interface IDot {
  // The hole's note ("+9V"), shown under it.
  description?: string | null;
  // Stripboard only: the strip is cut (drilled through) at this hole. See SavedStripboard.cuts.
  cut?: boolean;
  x: number,
  y: number,
}
