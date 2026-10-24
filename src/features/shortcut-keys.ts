import {notifyEditorChanged} from "./editor-events";

// The editor's keyboard shortcuts. Each is registered once (keyboard-shortcuts.ts lists the
// editor's own; a UI control may add one while it's on screen) and the one keydown listener here
// runs it. The registry also feeds the shortcuts legend in the right sidebar.

export interface IShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  event: (e: KeyboardEvent) => void;
  description?: string;
  // Only when this says so: otherwise the key does what it would without the shortcut (Ctrl+C
  // copies the page's selected text when nothing on the board is selected).
  when?: () => boolean;
}

// Typing in a field never runs a shortcut.
export function isTextEntry(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable);
}

export class ShortcutRegistry {
  static shortcuts: IShortcut[] = [];

  // Adds a shortcut and returns a function that takes it out again.
  static add(shortcut: IShortcut): () => void {
    const clash = this.shortcuts.find((s) => s.key.toLowerCase() === shortcut.key.toLowerCase()
      && !!s.ctrl === !!shortcut.ctrl && !!s.shift === !!shortcut.shift);
    if (clash !== undefined) {
      console.warn(`Shortcut key: ${shortcut.key} already exists`);
    }
    this.shortcuts = [...this.shortcuts, shortcut];
    notifyEditorChanged();
    return () => {
      this.shortcuts = this.shortcuts.filter(s => s !== shortcut);
      notifyEditorChanged();
    };
  }
}

function onKeyDown(event: KeyboardEvent) {
  if (isTextEntry(event.target)) return;
  // Keys compare case-insensitively (so Caps Lock doesn't matter); Shift is its own modifier.
  const keyLower = event.key.toLowerCase();
  for (const shortcut of ShortcutRegistry.shortcuts) {
    if (keyLower === shortcut.key.toLowerCase() && event.ctrlKey === !!shortcut.ctrl && event.shiftKey === !!shortcut.shift
      && (!shortcut.when || shortcut.when())) {
      event.preventDefault();
      shortcut.event(event);
    }
  }
}

// Starts listening for the shortcuts. Returns a function that stops it.
export function listenForShortcuts(): () => void {
  window.addEventListener('keydown', onKeyDown);
  return () => window.removeEventListener('keydown', onKeyDown);
}
