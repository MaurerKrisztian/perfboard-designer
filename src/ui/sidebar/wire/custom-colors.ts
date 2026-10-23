import {createStore} from "../../lib/store";
import {readStored, writeStored} from "../../lib/local-storage";

// The wire colours the user added to the palette, kept in this browser. Only well-formed hex
// colours get in: they become inline styles.

const STORAGE_KEY = "custom_colors";
export const HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;

function load(): string[] {
  const stored = readStored<unknown>(STORAGE_KEY, []);
  return Array.isArray(stored) ? stored.filter((c): c is string => typeof c === "string" && HEX_COLOR.test(c)) : [];
}

export const customColorsStore = createStore({colors: load()});

function save(colors: string[]) {
  customColorsStore.set({colors});
  writeStored(STORAGE_KEY, colors);
}

export function addCustomColor(color: string) {
  const {colors} = customColorsStore.get();
  if (!colors.includes(color)) save([...colors, color]);
}

export function removeCustomColor(color: string) {
  save(customColorsStore.get().colors.filter(c => c !== color));
}
