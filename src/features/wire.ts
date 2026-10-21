import {RouteTool, ToolState} from "../state/ToolState";
import {Utils} from "../utils/utils";
import {ShortcutRegistry} from "./shortcut-keys";
import {setActiveTool} from "./active-tool";

// The wire tool and the solder path tool: each button (and key) arms its tool, or drops it back
// to Select when it's armed already.
function toggle(kind: RouteTool["kind"]) {
  setActiveTool(ToolState.active.kind === kind ? {kind: "select"} : {kind});
}

Utils.getSafeHtmlElement<HTMLButtonElement>('wireArmBtn').addEventListener('click', () => toggle("wire"));
Utils.getSafeHtmlElement<HTMLButtonElement>('solderArmBtn').addEventListener('click', () => toggle("solder"));

ShortcutRegistry.add({
  key: "w",
  description: "Toggle wire tool.",
  event: () => toggle("wire")
});

ShortcutRegistry.add({
  key: "s",
  description: "Toggle solder path tool.",
  event: () => toggle("solder")
});
