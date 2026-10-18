import type {BoardViewData} from "./board-view-data";

// show_board's view: the page an MCP Apps host (Claude, ChatGPT…) shows in the conversation, in a
// sandboxed frame. It runs in the browser, not the server: build.mjs bundles it into view.html,
// served as the ui:// resource. The host hands it show_board's result, whose _meta carries the
// picture (so the agent isn't sent it) and the link to open.
//
// It speaks the few MCP Apps messages it needs (JSON-RPC over postMessage with the host) itself:
// @modelcontextprotocol/ext-apps's App class would make the page about 500 KB, with the whole
// MCP SDK and zod in it.

const PROTOCOL_VERSION = "2026-01-26";

const picture = document.getElementById("board") as HTMLImageElement;
const caption = document.getElementById("caption") as HTMLSpanElement;
const open = document.getElementById("open") as HTMLButtonElement;

let link: string | undefined;
let nextId = 1;
const pending = new Map<number, (result: unknown) => void>();

const send = (message: object) => window.parent.postMessage({jsonrpc: "2.0", ...message}, "*");

function request(method: string, params: object): Promise<unknown> {
  const id = nextId++;
  send({id, method, params});
  return new Promise(resolve => pending.set(id, resolve));
}

interface ToolResult {
  isError?: boolean;
  content?: {type: string; text?: string}[];
  _meta?: {board?: BoardViewData};
}

function showResult(result: ToolResult) {
  const data = result._meta?.board;
  if (result.isError || !data) {
    caption.textContent = result.content?.find(item => item.type === "text")?.text ?? "The board couldn't be shown.";
    return;
  }
  // As an image, so nothing in the picture can run.
  picture.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(data.svg)}`;
  picture.alt = data.caption;
  caption.textContent = data.caption;
  link = data.link;
  open.hidden = !link;
}

window.addEventListener("message", ({source, data}) => {
  if (source !== window.parent || data?.jsonrpc !== "2.0") return;
  if (data.method === undefined) {
    // A response to one of ours.
    pending.get(data.id)?.(data.result);
    pending.delete(data.id);
  } else if (data.method === "ui/notifications/tool-result") {
    showResult(data.params ?? {});
  } else if (data.id !== undefined) {
    // ping, ui/resource-teardown: nothing to do but answer.
    send({id: data.id, result: {}});
  }
});

open.addEventListener("click", () => {
  if (link) void request("ui/open-link", {url: link});
});

// The page's height, for the host to size its frame to, as it changes.
let lastWidth = 0, lastHeight = 0;
function reportSize() {
  const root = document.documentElement;
  const height = Math.ceil(root.getBoundingClientRect().height), width = Math.ceil(window.innerWidth);
  if (width === lastWidth && height === lastHeight) return;
  lastWidth = width;
  lastHeight = height;
  send({method: "ui/notifications/size-changed", params: {width, height}});
}

await request("ui/initialize", {
  protocolVersion: PROTOCOL_VERSION,
  appInfo: {name: "Perfboard Designer board", version: SERVER_VERSION},
  appCapabilities: {},
});
send({method: "ui/notifications/initialized", params: {}});
new ResizeObserver(() => requestAnimationFrame(reportSize)).observe(document.body);
picture.addEventListener("load", reportSize);
reportSize();
