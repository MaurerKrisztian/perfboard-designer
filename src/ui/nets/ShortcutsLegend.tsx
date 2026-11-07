import {Fragment} from "react";
import {IShortcut, ShortcutRegistry} from "../../features/shortcut-keys";
import {useEditor} from "../hooks/use-editor";

// Every keyboard shortcut and what it does, as registered (src/features/keyboard-shortcuts.ts).

const KEY_NAMES: Record<string, string> = {ArrowUp: "↑", ArrowDown: "↓", ArrowLeft: "←", ArrowRight: "→"};

function keyName(key: string): string {
  return KEY_NAMES[key] ?? (key.length === 1 ? key.toUpperCase() : key);
}

function modifiersOf(shortcut: IShortcut): string[] {
  return [...(shortcut.ctrl ? ["Ctrl"] : []), ...(shortcut.shift ? ["Shift"] : [])];
}

// Shortcuts listed one after another that do the same thing with the same modifiers (the four
// arrow keys) share a row.
function legendRows(shortcuts: IShortcut[]): IShortcut[][] {
  const rows: IShortcut[][] = [];
  for (const shortcut of shortcuts) {
    const row = rows[rows.length - 1];
    const first = row?.[0];
    if (first && first.description === shortcut.description
      && !!first.ctrl === !!shortcut.ctrl && !!first.shift === !!shortcut.shift) row.push(shortcut);
    else rows.push([shortcut]);
  }
  return rows;
}

export function ShortcutsLegend() {
  const shortcuts = useEditor(() => ShortcutRegistry.shortcuts);
  return (
    <div id="shortcuts">
      {legendRows(shortcuts).map((row, i) => (
        <div key={i} className="shortcut-row">
          <span className="shortcut-keys">
            {modifiersOf(row[0]).map(modifier => (
              <Fragment key={modifier}><kbd>{modifier}</kbd>{" + "}</Fragment>
            ))}
            {row.map((shortcut, k) => (
              <Fragment key={shortcut.key}>{k > 0 && " "}<kbd>{keyName(shortcut.key)}</kbd></Fragment>
            ))}
          </span>
          <span>{row[0].description}</span>
        </div>
      ))}
    </div>
  );
}
