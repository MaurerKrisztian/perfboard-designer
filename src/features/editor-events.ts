// How the UI hears that the editor changed. The editor core calls notifyEditorChanged() after any
// change the UI might show: every redraw does (redrawCanvas), and so do the few changes that
// don't redraw (a renamed project, a question to ask, a custom part added to the catalog). The
// React UI subscribes through useEditor() (src/ui/hooks/use-editor.ts) and re-reads what it shows.
// `version` counts the changes, so a reader can tell whether it has seen the latest.

const listeners = new Set<() => void>();
let version = 0;

export function notifyEditorChanged() {
  version++;
  for (const listener of Array.from(listeners)) listener();
}

export function subscribeEditor(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function editorVersion(): number {
  return version;
}
