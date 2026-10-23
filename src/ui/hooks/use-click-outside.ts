import {RefObject, useEffect, useRef} from "react";

// Calls `onOutside` for a click anywhere but inside `refs`, while `active`. Listens on the window,
// after everything else, so a click that stopped propagating (one that just opened a menu) doesn't
// count, and neither does the click that turned it on, nor one on something that click removed.
export function useClickOutside(refs: RefObject<HTMLElement | null>[], onOutside: () => void, active = true) {
  const latest = useRef(onOutside);
  latest.current = onOutside;
  const targets = useRef(refs);
  targets.current = refs;
  useEffect(() => {
    if (!active) return;
    const since = performance.now();
    const onClick = (e: MouseEvent) => {
      if (e.timeStamp < since || !(e.target as Node).isConnected) return;
      if (targets.current.some(ref => ref.current?.contains(e.target as Node))) return;
      latest.current();
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [active]);
}
