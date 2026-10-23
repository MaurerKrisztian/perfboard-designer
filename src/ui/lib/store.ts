import {useSyncExternalStore} from "react";

// A small observable store for UI-only state (which dialog is open, which panels show), shared by
// components that aren't parent and child. The editor's own state lives in the editor core and is
// read with useEditor() instead.

export interface Store<T> {
  get(): T;
  set(update: Partial<T> | ((state: T) => Partial<T>)): void;
  subscribe(listener: () => void): () => void;
}

export function createStore<T extends object>(initial: T): Store<T> {
  let state = initial;
  const listeners = new Set<() => void>();
  return {
    get: () => state,
    set(update) {
      state = {...state, ...(typeof update === "function" ? update(state) : update)};
      listeners.forEach(listener => listener());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

// Reads part of a store and re-renders when it changes. `select` should return a value from the
// state (or a primitive), not a new object each time.
export function useStore<T extends object, S>(store: Store<T>, select: (state: T) => S): S {
  return useSyncExternalStore(store.subscribe, () => select(store.get()));
}
