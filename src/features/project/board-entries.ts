import type {Part} from "../../interfaces/placed-part.interface";
import {IDot} from "../../interfaces/dot.interface";
import {ILine} from "../../interfaces/line.interface";
import {Ic} from "../ic";
import {PlacedStandardComponent} from "../standard-components/placed-standard-component";
import {PlacedAdvancedComponent} from "../advanced-components/placed-advanced-component";
import {GridPos} from "../../project-file/grid";
import {SavedAdvancedComponent, SavedIc, SavedStandardComponent, SavedWire} from "../../project-file/project-file";
import {isCategoryId} from "../../parts/catalog-categories";
import {isModuleName} from "../../parts/ic-package";

// Placed parts and wires made from their project-file entries, pinned to the board's shared dots
// by `dotAt` (which must find every hole they use): for loading a project, and for pasting.

// One part's entry, with the kind of part it is.
export type PartEntry =
  | {kind: "ic"; entry: SavedIc}
  | {kind: "standard-component"; entry: SavedStandardComponent}
  | {kind: "advanced-component"; entry: SavedAdvancedComponent};

export function partEntry(part: Part): PartEntry {
  if (part.kind === "ic") return {kind: "ic", entry: part.serialize()};
  if (part.kind === "standard-component") return {kind: "standard-component", entry: part.serialize()};
  return {kind: "advanced-component", entry: part.serialize()};
}

// The part an entry describes. An entry without an `instanceId` makes a part with a new one.
export function partFromEntry(saved: PartEntry, dotAt: (at: GridPos) => IDot): Part {
  if (saved.kind === "ic") {
    const {entry} = saved;
    const ic = new Ic(entry.widthPin, entry.heightPin, {...entry.pinDescription}, entry.name);
    ic.ref = entry.ref;
    if (entry.instanceId) ic.instanceId = entry.instanceId;
    ic.category = isCategoryId(entry.category) ? entry.category : isModuleName(entry.name) ? "modules.custom" : "ics.custom";
    ic.rotationAngle = entry.rotation;
    ic.topLeftDot = dotAt(entry.at);
    return ic;
  }
  if (saved.kind === "standard-component") {
    const {entry} = saved;
    const component = new PlacedStandardComponent(entry.definitionId, dotAt(entry.from), dotAt(entry.to));
    component.ref = entry.ref;
    if (entry.instanceId) component.instanceId = entry.instanceId;
    component.value = entry.value;
    component.color = entry.color;
    return component;
  }
  const {entry} = saved;
  const component = new PlacedAdvancedComponent(entry.definitionId, dotAt(entry.at), entry.rotation);
  if (entry.custom) component.custom = entry.custom;
  component.ref = entry.ref;
  if (entry.instanceId) component.instanceId = entry.instanceId;
  component.rows = entry.rows;
  component.cols = entry.cols;
  component.value = entry.value;
  return component;
}

// The wire an entry describes.
export function lineFromWire(wire: SavedWire, dotAt: (at: GridPos) => IDot): ILine {
  return {
    start: dotAt(wire.from), end: dotAt(wire.to),
    ...(wire.via ? {via: wire.via.map(dotAt)} : {}),
    ...(wire.kind === "solder" ? {kind: "solder" as const} : {color: wire.color, width: wire.width, ...(wire.side === "bottom" ? {side: "bottom" as const} : {})}),
  };
}
