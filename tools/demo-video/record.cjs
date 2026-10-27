#!/usr/bin/env node
// Records scenes (scenes/*.cjs) of the editor as MP4s. See README.md.
//   node tools/demo-video/record.cjs scenes/overview.cjs [--out video.mp4] [--size 1280x720] [--url http://localhost:3020/app/]
//   node tools/demo-video/record.cjs scenes/tour/*.cjs --out-dir assets/tour
const { spawn, execFileSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { createDirector, overlays, REPO } = require("./director.cjs");

function args() {
  const argv = process.argv.slice(2);
  const opts = {};
  const scenes = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) opts[argv[i].slice(2)] = argv[++i];
    else scenes.push(argv[i]);
  }
  if (!scenes.length || (scenes.length > 1 && opts.out)) {
    console.error(
      "Usage: record.cjs <scene.cjs> [--out file.mp4] [--size WxH] [--url editor-url]\n" +
        "       record.cjs <scene.cjs>... --out-dir dir"
    );
    process.exit(1);
  }
  const resolveScene = (scene) =>
    path.resolve(fs.existsSync(scene) ? scene : path.join(__dirname, scene));
  return { scenes: scenes.map(resolveScene), opts };
}

async function reachable(url) {
  try {
    return (await fetch(url)).ok;
  } catch {
    return false;
  }
}

// The dev server is needed for window.__perfboard; start one on 3020 unless given a URL.
async function startServer() {
  const url = "http://localhost:3020/app/";
  if (await reachable(url)) return { url, stop() {} };
  const server = spawn("npx", ["vite", "--port", "3020", "--strictPort"], {
    cwd: REPO,
    env: { ...process.env, PERFBOARD_PROJECTS_URL: "off" },
    stdio: "ignore",
    detached: true,
  });
  for (let i = 0; i < 120 && !(await reachable(url)); i++)
    await new Promise((r) => setTimeout(r, 500));
  return { url, stop: () => process.kill(-server.pid) };
}

// A scene module may say how it's filmed: `module.exports.options = {size: "1024x640",
// crop: {x, y, width, height}, width: 800, crf: 28, speed: 2}` (crop in page pixels, width the
// output's, speed > 1 to play it faster: the 3D view runs slowly in a headless browser).
// Command-line options win over them.
function filmingOptions(scene, opts) {
  const own = scene.options ?? {};
  const [width, height] = (opts.size ?? own.size ?? "1280x720")
    .split("x")
    .map(Number);
  return {
    width,
    height,
    crop: own.crop,
    outWidth: Number(opts.width ?? own.width ?? 0) || undefined,
    crf: String(opts.crf ?? own.crf ?? 23),
    speed: Number(opts.speed ?? own.speed ?? 1),
  };
}

async function record(browser, scenePath, out, baseUrl, opts) {
  const scene = require(scenePath);
  const { width, height, crop, outWidth, crf, speed } = filmingOptions(
    scene,
    opts
  );
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "demo-video-"));
  try {
    const context = await browser.newContext({
      viewport: { width, height },
      recordVideo: { dir, size: { width, height } },
    });
    await context.addInitScript(overlays);
    const page = await context.newPage();
    const clock = { start: Date.now(), rolledAt: 0 };
    const director = createDirector(page, { baseUrl, clock });
    let reloaded = false;
    page.on("framenavigated", (frame) => {
      if (frame === page.mainFrame() && !director.opening) reloaded = true;
    });
    try {
      await scene(director);
    } catch (e) {
      // A step that failed because the page reloaded under it: the scene is recorded again.
      if (!reloaded) throw e;
    }
    await context.close();
    if (reloaded) return false;
    const webm = path.join(dir, fs.readdirSync(dir)[0]);
    const filters = [];
    if (crop)
      filters.push(`crop=${crop.width}:${crop.height}:${crop.x}:${crop.y}`);
    if (speed !== 1) filters.push(`setpts=PTS/${speed}`);
    if (outWidth) filters.push(`scale=${outWidth}:-2:flags=lanczos`);
    execFileSync("ffmpeg", [
      ...["-loglevel", "error", "-y"],
      ...["-ss", (clock.rolledAt / 1000).toFixed(2), "-i", webm],
      ...(filters.length ? ["-vf", filters.join(",")] : []),
      ...["-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", crf],
      ...["-movflags", "+faststart", out],
    ]);
    // A still of the clip's last frame, the result it shows, beside it: a page shows it before the
    // clip plays (the user guide's <video poster>).
    const poster = out.replace(/\.mp4$/, ".webp");
    execFileSync("ffmpeg", [
      ...["-loglevel", "error", "-y", "-sseof", "-0.5", "-i", out],
      ...["-update", "1", "-c:v", "libwebp", "-quality", "70", poster],
    ]);
    console.log(`Wrote ${out} and its poster`);
    return true;
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// A dev server that has just started prepares its dependencies on the first page load and then
// reloads the page, which would cut into a scene: load the editor once, off camera, first. It can
// still meet a new one later (a dialog's), so a scene the server reloads is recorded again.
async function warmUp(browser, url) {
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForFunction(
    () => document.documentElement.dataset.editorReady === "true",
    null,
    { timeout: 60000 }
  );
  await page.waitForTimeout(3000);
  await page.close();
}

(async () => {
  const { scenes, opts } = args();
  const { chromium } = require("playwright");
  const server = opts.url ? { url: opts.url, stop() {} } : await startServer();
  const browser = await chromium.launch({
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  try {
    await warmUp(browser, server.url);
    for (const scenePath of scenes) {
      const name = path.basename(scenePath, ".cjs") + ".mp4";
      const out = path.resolve(
        opts.out ?? (opts["out-dir"] ? path.join(opts["out-dir"], name) : name)
      );
      if (await record(browser, scenePath, out, server.url, opts)) continue;
      console.log(
        `The dev server reloaded the page; recording ${path.basename(
          scenePath
        )} again.`
      );
      if (!(await record(browser, scenePath, out, server.url, opts)))
        throw new Error(
          `The dev server kept reloading the page in ${scenePath}`
        );
    }
  } finally {
    await browser.close();
    server.stop();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
