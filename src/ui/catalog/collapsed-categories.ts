import {readStored, writeStored} from "../lib/local-storage";

// The catalog's categories the user folded away (they start unfolded), remembered between visits.
const STORAGE_KEY = "catalog_collapsed";

export function loadCollapsedCategories(): Set<string> {
  const stored = readStored<unknown>(STORAGE_KEY, []);
  return new Set(Array.isArray(stored) ? stored.filter((id): id is string => typeof id === "string") : []);
}

export function saveCollapsedCategories(collapsed: Set<string>) {
  writeStored(STORAGE_KEY, Array.from(collapsed));
}
