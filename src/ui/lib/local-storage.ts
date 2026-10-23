// localStorage that never throws: it's turned off in some browsers and private windows, and can be
// full. A failed read gives the fallback; a failed write is only logged.

export function readStored<T>(key: string, fallback: T, parse: (raw: string) => T = raw => JSON.parse(raw) as T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : parse(raw);
  } catch (e) {
    console.error(`Failed to read "${key}" from localStorage`, e);
    return fallback;
  }
}

export function writeStored(key: string, value: unknown) {
  try {
    localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to save "${key}" to localStorage`, e);
  }
}
