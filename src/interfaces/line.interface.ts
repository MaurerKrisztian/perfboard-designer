import {IDot} from "./dot.interface";

export interface ILine {
  start: IDot,
  end: IDot,
  // Where it bends between them, in order: corners over holes, never joints (SavedWire.via).
  via?: IDot[];
  color?: string;
  width?: number;
}
