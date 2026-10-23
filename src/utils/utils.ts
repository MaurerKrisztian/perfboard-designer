export class Utils {
  // As "#rrggbb", or `fallback` for anything but a 3- or 6-digit hex colour.
  static normalizeColor(color?: string, fallback = "#000000"): string {
    if (!color) return fallback;
    if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
      return color;
    }
    if (/^#[0-9A-Fa-f]{3}$/.test(color)) {
      return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
    }
    return fallback;
  }
}

