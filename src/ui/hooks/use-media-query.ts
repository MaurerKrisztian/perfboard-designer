import {useSyncExternalStore} from "react";

// Whether a CSS media query matches, following it as it changes.
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    listener => {
      const mql = matchMedia(query);
      mql.addEventListener("change", listener);
      return () => mql.removeEventListener("change", listener);
    },
    () => matchMedia(query).matches,
  );
}

// The phone layout's query: small screens, and touch screens up to a tablet's or held sideways.
// The same one ends src/style.css; keep the two in step.
export const PHONE_QUERY = "(max-width: 768px), (pointer: coarse) and (max-width: 1024px), (pointer: coarse) and (max-height: 500px)";

export function usePhoneLayout(): boolean {
  return useMediaQuery(PHONE_QUERY);
}

// A finger taps rather than clicks, and has no hover.
export function useTouchScreen(): boolean {
  return useMediaQuery("(pointer: coarse)");
}
