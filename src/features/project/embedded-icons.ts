import {iconsUsedBy} from "../../board-render";
import {COMPONENT_ICON_DIR} from "../../parts/component-definitions";
import type {ProjectFile} from "../../project-file/project-file";

// The part icons `project` uses, as SVG source for an SVG to carry inside it, so it shows the same
// anywhere it's opened. One that won't load is left out: its part gets its stand-in box. Touches no
// editor state, as the shared board's page (src/view-page/) uses it too.
export async function embeddedIcons(project: ProjectFile): Promise<(icon: string) => string | undefined> {
  const icons = new Map<string, string>();
  await Promise.all(iconsUsedBy(project).map(async icon => {
    try {
      const response = await fetch(`${COMPONENT_ICON_DIR}${icon}`);
      if (response.ok) icons.set(icon, await response.text());
    } catch {
      // Left out.
    }
  }));
  return icon => icons.get(icon);
}
