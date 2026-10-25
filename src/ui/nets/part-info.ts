import type {ProjectFile} from "../../project-file/project-file";
import {boardPins, NetPin} from "../../project-file/nets";
import {RequiredPin, requiredPinKey} from "../../project-file/requirements";
import {partList} from "../../project-file/part-list";
import {getComponentDefinition, getIconPath} from "../../parts/component-definitions";
import {getAdvancedComponentDefinition, getAdvancedIconPath} from "../../parts/advanced-component-definitions";
import {customPartShape} from "../../parts/custom-parts";
import {dipIconSvg, moduleIconSvg} from "../../board-render";
import {customPartIconSvg} from "../../features/custom-parts";
import {createStore} from "../lib/store";
import {readStored, writeStored} from "../lib/local-storage";

// What the Nets panel says about a pin beyond "D1.K": which part it's on (its catalog name, value
// and the parts list's icon) and what the pin is ("cathode", "pin 8 · VCC"). And the panel's view:
// short (a chip per pin) or detailed (a line per pin), remembered between visits.

export interface PartInfo {
  // As the catalog names it: "LED", "NE555 Timer".
  name: string;
  // "10kΩ", "Red"; absent when it has none.
  value?: string;
  // The parts list's artwork, as an image source; absent for a part this version doesn't know.
  icon?: string;
}

const svgDataUri = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

function iconsByRef(project: ProjectFile): Map<string, string> {
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

// Each part by ref, worked out once per project file (the panel gets a new one after each change).
const cache = new WeakMap<ProjectFile, Map<string, PartInfo>>();

export function partInfo(project: ProjectFile): Map<string, PartInfo> {
  let parts = cache.get(project);
  if (!parts) {
    const icons = iconsByRef(project);
    parts = new Map(partList(project).map(row => [row.ref, {
      name: row.part,
      ...(row.value ? {value: row.value} : {}),
      ...(icons.has(row.ref) ? {icon: icons.get(row.ref)} : {}),
    }]));
    cache.set(project, parts);
  }
  return parts;
}

// Each board pin by the key a required net names it with (its part's identity and number).
const pinCache = new WeakMap<ProjectFile, Map<string, NetPin>>();

export function boardPinFor(project: ProjectFile, pin: RequiredPin): NetPin | undefined {
  let pins = pinCache.get(project);
  if (!pins) {
    const ids = new Map([...project.placedIcs, ...project.placedStandardComponents, ...project.placedAdvancedComponents]
      .map(entry => [entry.ref, entry.instanceId ?? entry.ref]));
    pins = new Map(boardPins(project).map(item =>
      [requiredPinKey({componentId: ids.get(item.ref) as string, pin: item.pin}), item]));
    pinCache.set(project, pins);
  }
  return pins.get(requiredPinKey(pin));
}

// A polarized two-lead part's lead, by its label.
const LEADS: Record<string, string> = {K: "cathode", A: "anode", "+": "positive", "-": "negative", "−": "negative"};

// What a pin is, in words: "cathode (K)" for a polarized lead, "pin 8 · VCC" for a named pin, "pin 1".
export function pinRole(pin: NetPin): string {
  if (pin.kind === "standard-component" && pin.label) {
    const lead = LEADS[pin.label];
    return lead ? `${lead} (${pin.label})` : pin.label;
  }
  return pin.label ? `pin ${pin.pin} · ${pin.label}` : `pin ${pin.pin}`;
}

// "D1, LED (Red), cathode (K)": a pin all in words, for its tooltip.
export function describePin(pin: NetPin, part?: PartInfo): string {
  const what = part ? `${part.name}${part.value ? ` (${part.value})` : ""}` : "";
  return [pin.ref, what, pinRole(pin)].filter(Boolean).join(", ");
}

export type NetsView = "short" | "detailed";

const VIEW_KEY = "nets_view";

export const netsViewStore = createStore<{view: NetsView}>({
  view: readStored<NetsView>(VIEW_KEY, "detailed", raw => raw === "short" ? "short" : "detailed"),
});

export function setNetsView(view: NetsView) {
  netsViewStore.set({view});
  writeStored(VIEW_KEY, view);
}
