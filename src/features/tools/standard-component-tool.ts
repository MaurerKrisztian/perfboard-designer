import {ActiveTool, ToolState} from "../../state/ToolState";
import {getComponentDefinition} from "../../parts/component-definitions";
import {drawPart} from "../../board-render";
import {PlacedStandardComponent} from "../standard-components/placed-standard-component";
import {placePart} from "../placed-parts";
import {standardKey} from "../catalog/catalog-keys";
import {recordRecentKey} from "../catalog/recent-components";
import {drawStartMarker, ToolBehavior} from "./tool";

type StandardComponentTool = Extract<ActiveTool, {kind: "standard-component"}>;

// Two-click span (one pad per lead). Placing drops back to Select with the new part selected, so
// its value is a tap away; Shift keeps the tool armed to place another.
export const standardComponentTool: ToolBehavior<StandardComponentTool> = {
  onPointerDown(tool, {hoverDot, keepArmed}) {
    if (!hoverDot) return false;
    if (!tool.start) {
      tool.start = hoverDot;
      return true;
    }
    if (tool.start !== hoverDot) {
      placePart(new PlacedStandardComponent(tool.definitionId, tool.start, hoverDot));
      recordRecentKey(standardKey(tool.definitionId));
      if (!keepArmed) ToolState.active = {kind: "select"};
    }
    tool.start = undefined;
    return true;
  },

  drawPreview(tool, hoverDot, painter) {
    const def = getComponentDefinition(tool.definitionId);
    if (!def) return;
    if (!tool.start) {
      drawStartMarker(painter, hoverDot, `Start ${def.name}`);
      return;
    }
    const ghost = new PlacedStandardComponent(def.id, tool.start, hoverDot);
    drawPart(painter, {kind: "standard-component", entry: ghost.serialize()}, {ghost: true});
  },

  statusText(tool) {
    const name = getComponentDefinition(tool.definitionId)?.name ?? "Component";
    return tool.start ? `Placing ${name} [Click the end pad • Shift+click to place more]` : `${name} [Click the start pad]`;
  },
};
