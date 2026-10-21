import {SavedCustomIc} from "./project-file";
import {ProjectFileError, readCustomIcs, readCustomPart} from "./read-project-file";
import {CustomPartSpec} from "../parts/custom-parts";

// A parts library file: the user's own parts, to keep a copy or move them to another browser.
// Written by the editor's File → Export Custom Parts and read by Import Custom Parts, which adds
// what's new to the catalog. Like a project file, facts only, for people and programs:
//   {"format": "perfboard-designer-parts", "version": 1,
//    "customIcs": [ ...as a project file's customIcs ],
//    "customParts": [ ...as a placed part's `custom` (project-file.ts), each with its `id` ]}

export const PARTS_LIBRARY_FORMAT = "perfboard-designer-parts";

export interface PartsLibrary {
  format: typeof PARTS_LIBRARY_FORMAT;
  version: 1;
  customIcs: SavedCustomIc[];
  customParts: CustomPartSpec[];
}

export function partsLibrary(customIcs: SavedCustomIc[], customParts: CustomPartSpec[]): PartsLibrary {
  return {format: PARTS_LIBRARY_FORMAT, version: 1, customIcs, customParts};
}

// The parts in a library file, leaving out entries that can't be read. Throws ProjectFileError
// for a file that isn't one.
export function readPartsLibrary(raw: unknown): {customIcs: SavedCustomIc[]; customParts: CustomPartSpec[]} {
  const data = raw && typeof raw === "object" && !Array.isArray(raw) ? raw as Record<string, unknown> : undefined;
  if (data?.format !== PARTS_LIBRARY_FORMAT) throw new ProjectFileError("This file isn't a Perfboard Designer parts library.");
  return {
    customIcs: readCustomIcs(data.customIcs),
    customParts: (Array.isArray(data.customParts) ? data.customParts : [])
      .map(readCustomPart).filter((part): part is CustomPartSpec => !!part),
  };
}
