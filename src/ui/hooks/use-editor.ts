import {useRef, useSyncExternalStore} from "react";
import {editorVersion, subscribeEditor} from "../../features/editor-events";

// Reads something from the editor core and re-renders the component when it changes. `select`
// runs again after every editor change (src/features/editor-events.ts); the component re-renders
// only when what it returns differs by `isEqual`. Return primitives, or pass shallowEqual for an
// array, since the core changes its objects in place.
export function useEditor<T>(select: () => T, isEqual: (a: T, b: T) => boolean = Object.is): T {
  const cache = useRef<{version: number; select: () => T; value: T} | undefined>(undefined);
  const getSnapshot = () => {
    const version = editorVersion();
    const cached = cache.current;
    if (cached && cached.version === version && cached.select === select) return cached.value;
    const value = select();
    // An equal value keeps the old one, so React sees no change.
    cache.current = {version, select, value: cached && isEqual(cached.value, value) ? cached.value : value};
    return cache.current.value;
  };
  return useSyncExternalStore(subscribeEditor, getSnapshot);
}

// Two arrays with the same items in the same order.
export function shallowEqual<T>(a: readonly T[], b: readonly T[]): boolean {
  return a.length === b.length && a.every((item, i) => Object.is(item, b[i]));
}
