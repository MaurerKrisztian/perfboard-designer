import {getAdvancedComponentDefinition, getAdvancedIconPath} from "../parts/advanced-component-definitions";
import {getComponentDefinition, getIconPath} from "../parts/component-definitions";
import {customPartShape, CustomPartSpec} from "../parts/custom-parts";
import type {ProjectFile} from "../project-file/project-file";
import {dipIconSvg} from "./artists/ic-package/dip-shape";
import {moduleIconSvg} from "./artists/ic-package/module-shape";

// Each placed part's catalog artwork, as the parts list shows it: the Nets panel's pins, the
// component list, the project PDF and the shared board's page. An image source each: a catalog
// icon's address (relative, as the editor's pages and the view/ page sit side by side) or, for
// artwork drawn from the part itself, an SVG data: URI.

export const svgDataUri = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

// A small picture of a custom module: its body in its colour, a dot on each pin.
export function customPartIconSvg(spec: CustomPartSpec): string {
  const pitch = 10;
  const width = spec.cols * pitch, height = spec.rows * pitch;
  const fill = /^#[0-9a-f]{3,8}$/i.test(spec.color ?? "") ? spec.color : "#1f2937";
  const pins = spec.pins.map(({at: [col, row]}, i) =>
    `<circle cx="${col * pitch + pitch / 2}" cy="${row * pitch + pitch / 2}" r="2.6" fill="${i === 0 ? "#38bdf8" : "#e8d296"}"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 ${width + 2} ${height + 2}" width="${width + 2}" height="${height + 2}">`
    + `<rect width="${width}" height="${height}" rx="2" fill="${fill}" stroke="#94a3b8" stroke-width="1"/>${pins}</svg>`;
}

// Each part's artwork by its ref; a part this version doesn't know has none.
export function partIcons(project: ProjectFile): Map<string, string> {
  const icons = new Map<string, string>();
  for (const entry of project.placedStandardComponents) {
    const def = getComponentDefinition(entry.definitionId);
    if (def) icons.set(entry.ref, getIconPath(def));
  }
  for (const entry of project.placedAdvancedComponents) {
    if (entry.custom) {
      const shape = customPartShape(entry.custom.shape);
      icons.set(entry.ref, shape ? getAdvancedIconPath(shape) : svgDataUri(customPartIconSvg(entry.custom)));
      continue;
    }
    const def = getAdvancedComponentDefinition(entry.definitionId);
    if (def && !def.noIcon) icons.set(entry.ref, getAdvancedIconPath(def));
  }
  const dip = svgDataUri(dipIconSvg());
  const board = svgDataUri(moduleIconSvg());
  for (const ic of project.placedIcs) icons.set(ic.ref, ic.category?.startsWith("modules") ? board : dip);
  return icons;
}
