import {COMPONENT_DEFINITIONS, getIconPath} from "../../parts/component-definitions";
import {ADVANCED_COMPONENT_DEFINITIONS, getAdvancedIconPath} from "../../parts/advanced-component-definitions";
import {deleteCustomIc, Ic, selectIc} from "../../features/ic";
import {getIcDefinition} from "../../parts/ic-definitions";
import {dipIconSvg, moduleIconSvg} from "../../board-render";
import {ToolState} from "../../state/ToolState";
import {setActiveTool} from "../../features/active-tool";
import {CategoryId} from "../../parts/catalog-categories";
import {advancedKey, customPartKey, icKey, standardKey} from "../../features/catalog/catalog-keys";
import {CUSTOM_PART_ID, customPartShape} from "../../parts/custom-parts";
import {CustomParts, customPartIconSvg, isArmed as isCustomPartArmed} from "../../features/custom-parts";
import {openDialog} from "../dialogs/dialog-store";
import {catalogVersion} from "../../features/catalog/catalog-events";

// One entry in the Components panel, whichever placement system backs it. The panel and search
// only ever deal with these - activate/isArmed/remove hide which system a part belongs to.
export interface CatalogItem {
  // Unique across all sources, e.g. "standard:resistor", "ic:ne555", "action:custom".
  key: string;
  // Actions (e.g. "Custom…") open something instead of arming a part for placement.
  isAction: boolean;
  name: string;
  // Omitted for top-level entries that sit above the category tree (the Custom… action).
  categoryId?: CategoryId;
  keywords: readonly string[];
  // Artwork next to the name; `emoji` stands in when there's no icon file or it fails to load.
  iconPath?: string;
  emoji: string;
  activate: () => void;
  // Whether this is the part currently armed for placement.
  isArmed: () => boolean;
  // Only on user-created parts.
  edit?: () => void;
  remove?: () => void;
}

function isArmed(kind: "standard-component" | "advanced-component", definitionId: string): boolean {
  const active = ToolState.active;
  return active.kind === kind && active.definitionId === definitionId;
}

// Every kind the custom part chooser makes, so a search for any of them finds it.
const CUSTOM_PART_KEYWORDS = [
  "custom", "new", "create", "add", "ic", "chip", "dip", "dev board", "module", "breakout", "sensor", "board", "pins",
  "transistor", "package", "to-92", "to-220", "bjt", "mosfet", "regulator",
];

// The IC icons are drawn in code (generic DIP / dev board), not stored as files.
function svgDataUri(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// Built fresh on every call: custom ICs come and go at runtime, and the catalog is small.
// Within a category, items appear in this order: actions, then each source's definition order.
export function buildCatalog(): CatalogItem[] {
  const items: CatalogItem[] = [
    {
      key: "action:custom", isAction: true, name: "Custom part…",
      keywords: CUSTOM_PART_KEYWORDS, emoji: "➕",
      activate: () => openDialog({kind: "custom-part"}), isArmed: () => false
    },
  ];

  for (const def of COMPONENT_DEFINITIONS) {
    items.push({
      key: standardKey(def.id), isAction: false, name: def.name, categoryId: def.category,
      keywords: def.keywords ?? [], iconPath: getIconPath(def), emoji: "🧩",
      // Clicking the already-armed part again disarms it
      activate: () => setActiveTool(isArmed("standard-component", def.id)
        ? {kind: "select"}
        : {kind: "standard-component", definitionId: def.id}),
      isArmed: () => isArmed("standard-component", def.id)
    });
  }

  for (const def of ADVANCED_COMPONENT_DEFINITIONS) {
    items.push({
      key: advancedKey(def.id), isAction: false, name: def.name, categoryId: def.category,
      keywords: def.keywords ?? [], iconPath: getAdvancedIconPath(def), emoji: "🧩",
      activate: () => setActiveTool(isArmed("advanced-component", def.id)
        ? {kind: "select"}
        : {kind: "advanced-component", definitionId: def.id, rotation: 0}),
      isArmed: () => isArmed("advanced-component", def.id)
    });
  }

  for (const ic of Ic.IC_CONTAINER) {
    const def = ic.definitionId ? getIcDefinition(ic.definitionId) : undefined;
    items.push({
      key: icKey(ic), isAction: false, name: ic.name, categoryId: ic.category,
      keywords: def?.keywords ?? [], iconPath: svgDataUri(ic.isModule ? moduleIconSvg() : dipIconSvg()), emoji: ic.category.indexOf("modules") === 0 ? "📟" : "📦",
      activate: () => selectIc(ic.id),
      isArmed: () => {
        const active = ToolState.active;
        return active.kind === "ic" && active.template.armedFrom === ic;
      },
      edit: ic.isCustom ? () => openDialog({kind: "ic-editor", type: ic.isModule ? "module" : "ic", editing: ic}) : undefined,
      remove: ic.isCustom ? () => deleteCustomIc(ic.id) : undefined
    });
  }

  // The user's own parts, each placed with its own spec: modules with pins anywhere, and parts in a
  // built-in part's package, listed beside it.
  for (const part of CustomParts.parts) {
    const shape = customPartShape(part.shape);
    items.push({
      key: customPartKey(part.id), isAction: false, name: part.name, categoryId: shape?.category ?? "modules.custom",
      keywords: shape ? ["custom", ...(shape.keywords ?? [])] : ["custom", "module"],
      iconPath: shape ? getAdvancedIconPath(shape) : svgDataUri(customPartIconSvg(part)), emoji: shape ? "🧩" : "📟",
      activate: () => setActiveTool(isCustomPartArmed(part.id)
        ? {kind: "select"}
        : {kind: "advanced-component", definitionId: CUSTOM_PART_ID, rotation: 0, custom: part}),
      isArmed: () => isCustomPartArmed(part.id),
      edit: () => openDialog(shape ? {kind: "custom-shape", editing: part} : {kind: "custom-module", editing: part}),
      remove: () => part.id && CustomParts.remove(part.id),
    });
  }

  return items;
}

// The catalog as it is now: built again only once what it lists has changed (catalogVersion), so
// it's the same array, with the same items, until then.
let built: {version: number; items: CatalogItem[]} | undefined;

export function catalogItems(): CatalogItem[] {
  const version = catalogVersion();
  if (built?.version !== version) built = {version, items: buildCatalog()};
  return built.items;
}
