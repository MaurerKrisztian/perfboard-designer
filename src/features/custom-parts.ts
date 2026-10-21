import {CUSTOM_PART_ID, CustomPartSpec} from "../parts/custom-parts";
import {readCustomPart} from "../project-file/read-project-file";
import {ToolState} from "../state/ToolState";
import {notifyCatalogChanged} from "./catalog/catalog-events";
import {setActiveTool} from "./active-tool";

// The user's own parts with pins anywhere (src/parts/custom-parts.ts), as listed under
// Modules › Custom: made in the custom module creator (custom-part-modal.ts), kept in this
// browser's localStorage, and merged in from boards that use them and from parts library files.
// A placed part keeps the spec it was placed with, so editing or deleting an entry here never
// changes a board.

const STORAGE_KEY = "custom_parts";

export class CustomParts {
  static parts: CustomPartSpec[] = [];

  static find(id: string | undefined): CustomPartSpec | undefined {
    return id === undefined ? undefined : CustomParts.parts.find(part => part.id === id);
  }

  static load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const list: unknown = stored ? JSON.parse(stored) : [];
      CustomParts.parts = (Array.isArray(list) ? list : [])
        .map(readCustomPart).filter((part): part is CustomPartSpec => !!part?.id);
    } catch (e) {
      console.error("Failed to load custom parts from localStorage", e);
    }
  }

  static save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(CustomParts.parts));
    } catch (e) {
      console.error("Failed to save custom parts to localStorage", e);
    }
  }

  // Adds a new entry (given a fresh id) and returns it.
  static add(spec: CustomPartSpec): CustomPartSpec {
    const part = {...spec, id: newId()};
    CustomParts.parts.push(part);
    CustomParts.changed();
    return part;
  }

  // Replaces entry `id`'s spec; placed parts keep the one they were placed with.
  static update(id: string, spec: CustomPartSpec): CustomPartSpec {
    const part = {...spec, id};
    const index = CustomParts.parts.findIndex(p => p.id === id);
    if (index > -1) CustomParts.parts[index] = part;
    else CustomParts.parts.push(part);
    if (isArmed(id)) setActiveTool({kind: "advanced-component", definitionId: CUSTOM_PART_ID, rotation: 0, custom: part});
    CustomParts.changed();
    return part;
  }

  static remove(id: string) {
    const index = CustomParts.parts.findIndex(p => p.id === id);
    if (index < 0) return;
    CustomParts.parts.splice(index, 1);
    if (isArmed(id)) setActiveTool({kind: "select"});
    CustomParts.changed();
  }

  // Adds the entries this catalog doesn't have yet and returns how many it added: not one whose id
  // is here (the entry here wins), nor one just like an entry here (a board written without ids
  // would otherwise add its parts again on every load). One without an id gets one.
  static merge(specs: CustomPartSpec[]): number {
    let added = 0;
    for (const spec of specs) {
      if (spec.id && CustomParts.find(spec.id)) continue;
      if (CustomParts.parts.some(part => sameShape(part, spec))) continue;
      CustomParts.parts.push({...spec, id: spec.id ?? newId()});
      added++;
    }
    if (added) CustomParts.changed();
    return added;
  }

  private static changed() {
    CustomParts.save();
    notifyCatalogChanged();
  }
}

// The same part apart from its id.
function sameShape(a: CustomPartSpec, b: CustomPartSpec): boolean {
  const shape = (spec: CustomPartSpec) => JSON.stringify({...spec, id: undefined});
  return shape(a) === shape(b);
}

function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Whether entry `id` is the part armed for placing.
export function isArmed(id: string | undefined): boolean {
  const active = ToolState.active;
  return active.kind === "advanced-component" && !!active.custom && active.custom.id === id;
}

// A small picture of the part for the catalog: its body in its colour, a dot on each pin.
export function customPartIconSvg(spec: CustomPartSpec): string {
  const pitch = 10;
  const width = spec.cols * pitch, height = spec.rows * pitch;
  const fill = /^#[0-9a-f]{3,8}$/i.test(spec.color ?? "") ? spec.color : "#1f2937";
  const pins = spec.pins.map(({at: [col, row]}, i) =>
    `<circle cx="${col * pitch + pitch / 2}" cy="${row * pitch + pitch / 2}" r="2.6" fill="${i === 0 ? "#38bdf8" : "#e8d296"}"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 ${width + 2} ${height + 2}" width="${width + 2}" height="${height + 2}">`
    + `<rect width="${width}" height="${height}" rx="2" fill="${fill}" stroke="#94a3b8" stroke-width="1"/>${pins}</svg>`;
}

CustomParts.load();
