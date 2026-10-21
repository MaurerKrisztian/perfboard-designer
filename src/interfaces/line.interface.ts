import {IDot} from "./dot.interface";
import type {WireKind} from "../project-file/project-file";

export interface ILine {
  start: IDot,
  end: IDot,
  // Where it bends between them, in order (SavedWire.via): a jumper's corners are only bends, a
  // solder path's join their holes.
  via?: IDot[];
  // A jumper unless "solder" (SavedWire.kind). A solder path has no colour or width.
  kind?: WireKind;
  color?: string;
  width?: number;
}
