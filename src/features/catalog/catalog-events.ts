import {notifyEditorChanged} from "../editor-events";

// Tells the Components panel that what it lists changed: custom parts added, edited, deleted or
// merged in from a loaded project, or a part placed (the "Recently used…" list). The panel
// (src/ui/catalog/) rebuilds its items when catalogVersion() moves on.

let version = 0;

export function notifyCatalogChanged() {
  version++;
  notifyEditorChanged();
}

export function catalogVersion(): number {
  return version;
}
