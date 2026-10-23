import {Fragment} from "react";
import {IShortcut, ShortcutRegistry} from "../../features/shortcut-keys";
import {useEditor} from "../hooks/use-editor";

// Every keyboard shortcut and what it does, as registered (src/features/keyboard-shortcuts.ts).

function keysOf(shortcut: IShortcut): string[] {
  const key = shortcut.key.length === 1 ? shortcut.key.toUpperCase() : shortcut.key;
  return [...(shortcut.ctrl ? ["Ctrl"] : []), ...(shortcut.shift ? ["Shift"] : []), key];
}

export function ShortcutsLegend() {
  const shortcuts = useEditor(() => ShortcutRegistry.shortcuts);
  return (
    <div id="shortcuts">
      {shortcuts.map((shortcut, i) => (
        <div key={i} className="shortcut-row">
          <span className="shortcut-keys">
            {keysOf(shortcut).map((key, k) => (
              <Fragment key={key}>{k > 0 && " + "}<kbd>{key}</kbd></Fragment>
            ))}
          </span>
          <span>{shortcut.description}</span>
        </div>
      ))}
    </div>
  );
}
