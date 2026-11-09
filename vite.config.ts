import type { ConfigEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

const config = ({command}: ConfigEnv): UserConfig => ({
  base: "",
  // The editor's UI is React (src/ui/); the other pages are static HTML.
  plugins: [react()],
  publicDir: 'assets',
  server: {
    port: 3000,
  },
  // Bundled up front: found only when the 3D view is first opened, they'd make the dev server
  // reload the page then.
  optimizeDeps: {
    include: ["three", "three/examples/jsm/controls/OrbitControls.js", "three/examples/jsm/environments/RoomEnvironment.js"],
  },
  define: {
    // Where short links' projects are stored (src/features/project/project-storage.ts): the public
    // service unless PERFBOARD_PROJECTS_URL is set when the editor is built or run, e.g.
    // `PERFBOARD_PROJECTS_URL=http://localhost:8787 npm run start` with a local Worker
    // (`cd mcp && npm run worker:dev`), or `off` for an editor without short links.
    __PERFBOARD_PROJECTS_URL__: JSON.stringify(process.env.PERFBOARD_PROJECTS_URL ?? ""),
    // Dev-only code (window.__perfboard, src/features/test-handle.ts) runs on the dev server only.
    __DEV_SERVER__: JSON.stringify(command === "serve"),
  },
  build: {
    rollupOptions: {
      // Multi-page build: the landing page at the root, the designer at /app/ and the
      // standalone user guide (/guide/), learn articles (/learn/), contributors
      // (/contributors/), MCP server (/mcp-server/) and shared board (/view/) pages.
      input: {
        main: "index.html",
        app: "app/index.html",
        guide: "guide/index.html",
        learn: "learn/index.html",
        learnChoosingABoard: "learn/choosing-a-prototyping-board/index.html",
        learnPerfboardLayout: "learn/perfboard-layout/index.html",
        learnPerfboardWiring: "learn/perfboard-wiring/index.html",
        learnStripboardLayout: "learn/stripboard-layout/index.html",
        learnSolderingTools: "learn/soldering-tools-and-safety/index.html",
        learnHowToSolder: "learn/how-to-solder/index.html",
        learnTestingYourBoard: "learn/testing-your-board/index.html",
        learnGlossary: "learn/glossary/index.html",
        learnBenchCard: "learn/bench-card/index.html",
        learn555LedBlinker: "learn/555-led-blinker/index.html",
        contributors: "contributors/index.html",
        mcpServer: "mcp-server/index.html",
        view: "view/index.html",
      },
    },
  },
});

export default config;
