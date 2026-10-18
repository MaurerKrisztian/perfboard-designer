import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod";
import {RESOURCE_MIME_TYPE, registerAppResource, registerAppTool} from "@modelcontextprotocol/ext-apps/server";
import {makeShareFragment} from "../editor";
import {projectIdInput, projectInput, projectSource, readSource} from "../project-source";
import {boardSummary} from "../project-summary";
import {boardSvg} from "../board-image";
import {failure} from "../reply";
import {editorBase} from "./share-link-tools";
import type {BoardViewData} from "../board-view/board-view-data";

// show_board: shows the user the board in the conversation, as an MCP App (the "MCP Apps"
// extension): the tool names a ui:// page, which the host shows in a sandboxed frame and hands
// the tool's result (board-view/view.ts). The picture travels in the result's _meta, which goes to
// the page, not to the agent. Hosts without MCP Apps show nothing, which the reply says.

const VIEW_URI = "ui://perfboard/board-view.html";

export function registerShowBoardTool(server: McpServer, DEFAULT_EDITOR_URL: string) {
  registerAppResource(server, "board-view", VIEW_URI, {
    title: "Board view",
    description: "The page show_board shows the board in.",
    // The picture is a data: image, and the page loads nothing else.
    _meta: {ui: {prefersBorder: false}},
  }, async uri => ({contents: [{uri: uri.href, mimeType: RESOURCE_MIME_TYPE, text: BOARD_VIEW_HTML, _meta: {ui: {prefersBorder: false}}}]}));

  registerAppTool(server, "show_board", {
    title: "Show board",
    description: "Shows the user a picture of the board right in the conversation, as the editor draws it, with a button that opens it in Perfboard Designer. Only in clients that show MCP Apps (e.g. Claude, ChatGPT); elsewhere the user sees nothing, so give them make_share_link's link too. The picture goes to the user, not to you: to look at the board yourself, use render_board.",
    inputSchema: {
      project: projectInput,
      projectId: projectIdInput,
      name: z.string().optional().describe("The project's name, shown under the picture and in the editor. Defaults to the name it was given in new_project or came with from read_share_link."),
    },
    annotations: {readOnlyHint: true, openWorldHint: false},
    _meta: {ui: {resourceUri: VIEW_URI}, "openai/outputTemplate": VIEW_URI},
  }, async ({project, projectId, name}) => {
    const from = await projectSource({project, projectId});
    if ("error" in from) return failure(from.error);
    const read = readSource(from.raw);
    if ("error" in read) return failure(read.error);
    const linkName = name ?? from.held?.name;
    const board = boardSummary(read.project.board);
    const caption = linkName ? `${linkName}: a ${board}` : `A ${board}`;
    const base = editorBase(DEFAULT_EDITOR_URL);
    const link = base && `${base.href}#${await makeShareFragment(read.project, linkName)}`;
    const view: BoardViewData = {svg: boardSvg(read.project), caption, ...(link ? {link} : {})};
    return {
      content: [{type: "text" as const, text: `Shown to the user, where the client shows MCP Apps: a picture of the ${board}, with a button that opens it in the editor.`}],
      _meta: {board: view},
    };
  });
}
