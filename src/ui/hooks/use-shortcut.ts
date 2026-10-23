import {useEffect, useRef} from "react";
import {ShortcutRegistry} from "../../features/shortcut-keys";

// Registers a keyboard shortcut (src/features/shortcut-keys.ts) while the component is on screen,
// so it's in the shortcuts legend too. `run` may change between renders; the latest one runs.
export function useShortcut(key: string, description: string, run: (e: KeyboardEvent) => void) {
  const latest = useRef(run);
  latest.current = run;
  useEffect(() => ShortcutRegistry.add({key, description, event: e => latest.current(e)}), [key, description]);
}
