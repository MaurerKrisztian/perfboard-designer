import {drawPart} from "../../board-render";
import {ActiveTool, ToolState} from "../../state/ToolState";
import {IDot} from "../../interfaces/dot.interface";
import {advancedDefinitionFor} from "../../parts/custom-parts";
import {PlacedAdvancedComponent} from "../advanced-components/placed-advanced-component";
import {findDotAt} from "../dot-lookup";
import {placePart} from "../placed-parts";
import {advancedKey, customPartKey} from "../catalog/catalog-keys";
import {recordRecentKey} from "../catalog/recent-components";
import {ToolBehavior} from "./tool";

type AdvancedComponentTool = Extract<ActiveTool, {kind: "advanced-component"}>;

// The part the tool places at `dot`, a user-made part with its spec.
function partAt(tool: AdvancedComponentTool, dot: IDot, rotation = tool.rotation): PlacedAdvancedComponent {
  const part = new PlacedAdvancedComponent(tool.definitionId, dot, rotation);
  if (tool.custom) part.custom = tool.custom;
  return part;
}

const recentKey = (tool: AdvancedComponentTool) => tool.custom ? customPartKey(tool.custom.id) : advancedKey(tool.definitionId);

// A grid-sizable block (header pins) spanned between two corner pads. The lattice grows
// right/down from its anchor, so the anchor is the top-left corner of the spanned rect - neither
// clicked dot is it when spanning up and/or left. Always unrotated: the spanned rect already fixes
// the block's orientation, and a rotation would swing the lattice off the holes the user picked.
function spannedBlock(definitionId: string, a: IDot, b: IDot): PlacedAdvancedComponent | undefined {
  const anchorDot = findDotAt(Math.min(a.x, b.x), Math.min(a.y, b.y));
  if (!anchorDot) return undefined;
  const block = new PlacedAdvancedComponent(definitionId, anchorDot, 0);
  const {rows, cols} = PlacedAdvancedComponent.gridSpanFromDots(a, b);
  block.rows = rows;
  block.cols = cols;
  return block;
}

// Pins are rigid, so a single click anchors the component using the armed rotation, matching IC
// placement. The exception is a gridSizable part (header pins), whose block size is chosen by the
// user: that takes two clicks to span opposite corners, like a wire or a standard component.
// Either way placing drops back to Select with the new part selected; Shift keeps the tool armed.
export const advancedComponentTool: ToolBehavior<AdvancedComponentTool> = {
  onPointerDown(tool, {hoverDot, keepArmed}) {
    if (!hoverDot) return false;
    const def = advancedDefinitionFor(tool);
    if (!def?.gridSizable) {
      placePart(partAt(tool, hoverDot));
      recordRecentKey(recentKey(tool));
      if (!keepArmed) ToolState.active = {kind: "select"};
      return true;
    }
    if (!tool.start) {
      tool.start = hoverDot;
      return true;
    }
    const block = spannedBlock(tool.definitionId, tool.start, hoverDot);
    if (block) {
      placePart(block);
      recordRecentKey(recentKey(tool));
      if (!keepArmed) ToolState.active = {kind: "select"};
    }
    tool.start = undefined;
    return true;
  },

  drawPreview(tool, hoverDot, painter) {
    const def = advancedDefinitionFor(tool);
    if (!def) return;
    // Second half of a two-click span: preview the whole block the commit would place.
    const ghost = (def.gridSizable && tool.start && spannedBlock(def.id, tool.start, hoverDot))
      || partAt(tool, hoverDot, def.gridSizable ? 0 : tool.rotation);
    drawPart(painter, {kind: "advanced-component", entry: ghost.serialize()}, {ghost: true});
  },

  statusText(tool) {
    const def = advancedDefinitionFor(tool);
    const name = def?.name ?? "Component";
    if (def?.gridSizable) {
      return tool.start ? `Placing ${name} [Click the opposite corner • Shift+click to place more]` : `${name} [Click the first corner]`;
    }
    return `${name} [Click a pad to place it • R to rotate • Shift+click to place more]`;
  },
};
