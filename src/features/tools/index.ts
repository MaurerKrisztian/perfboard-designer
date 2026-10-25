import {ActiveTool} from "../../state/ToolState";
import {ToolBehavior} from "./tool";
import {eraserTool, noteTool, selectTool} from "./mode-tools";
import {cutTool} from "./cut-tool";
import {solderTool, wireTool} from "./wire-tool";
import {icTool} from "./ic-tool";
import {standardComponentTool} from "./standard-component-tool";
import {advancedComponentTool} from "./advanced-component-tool";
import {requiredNetTool} from "./required-net-tool";

const BEHAVIORS: {[K in ActiveTool["kind"]]: ToolBehavior<Extract<ActiveTool, {kind: K}>>} = {
  "select": selectTool,
  "eraser": eraserTool,
  "note": noteTool,
  "cut": cutTool,
  "wire": wireTool,
  "solder": solderTool,
  "ic": icTool,
  "standard-component": standardComponentTool,
  "advanced-component": advancedComponentTool,
  "required-net": requiredNetTool,
};

// The behavior for a tool's kind. The cast is safe - BEHAVIORS pairs every kind with the behavior
// for exactly that kind - but TypeScript can't follow the link between `tool.kind` and the lookup.
export function behaviorOf<T extends ActiveTool>(tool: T): ToolBehavior<T> {
  return BEHAVIORS[tool.kind] as unknown as ToolBehavior<T>;
}
