// The helpers a scene uses to drive the editor on camera. A scene is a module exporting
// `async (d) => { ... }`, where `d` is the object `createDirector()` returns.
const fs = require("fs");
const path = require("path");

const REPO = path.resolve(__dirname, "../..");

// A visible cursor (headless recordings have none) and a caption bar, added to every page.
function overlays() {
  // Answer the analytics consent banner and mark the tour seen up front, so
  // neither covers the video (a scene can still open the tour from the Help menu).
  try {
    localStorage.setItem("analytics_consent", "denied");
    localStorage.setItem("tour_seen", "true");
  } catch {}
  addEventListener("DOMContentLoaded", () => {
    // The dialogs' blurred backdrop is drawn so slowly in a headless browser that the recording
    // stops getting frames while one is open: dim it without the blur.
    const style = document.createElement("style");
    style.textContent = "* { backdrop-filter: none !important; }";
    document.head.appendChild(style);
    const dot = document.createElement("div");
    dot.id = "demoCursor";
    dot.style.cssText =
      "position:fixed;z-index:99999;width:18px;height:18px;border-radius:50%;background:rgba(255,200,60,.6);" +
      "border:2px solid #fff;pointer-events:none;transform:translate(-50%,-50%);left:-50px;top:-50px;transition:transform .1s";
    document.body.appendChild(dot);
    const at = (e) => {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    };
    addEventListener("mousemove", at, true);
    addEventListener(
      "mousedown",
      () => (dot.style.transform = "translate(-50%,-50%) scale(.6)"),
      true
    );
    addEventListener(
      "mouseup",
      () => (dot.style.transform = "translate(-50%,-50%)"),
      true
    );
  });
}

function createDirector(page, { baseUrl, clock }) {
  const wait = (ms) => page.waitForTimeout(ms);
  const hole = (col, row) =>
    page.evaluate(
      ([c, r]) => window.__perfboard.holeToScreen(c, r),
      [col, row]
    );
  const glideTo = (x, y, steps = 20) => page.mouse.move(x, y, { steps });
  const glideToElement = async (locator, steps = 15) => {
    const box = await locator.boundingBox();
    if (!box) throw new Error(`Not on screen: ${locator}`);
    await glideTo(box.x + box.width / 2, box.y + box.height / 2, steps);
  };

  async function openBoard(name, file) {
    const project =
      typeof file === "string"
        ? JSON.parse(fs.readFileSync(path.join(REPO, file), "utf8"))
        : file;
    await page.goto("about:blank");
    await page.goto(
      `${baseUrl}#name=${encodeURIComponent(name)}&json=${encodeURIComponent(
        JSON.stringify(project)
      )}`
    );
    await page.waitForFunction(
      () =>
        document.documentElement.dataset.editorReady === "true" &&
        window.__perfboard
    );
    await page.evaluate(() => window.__perfboard.settled());
    const dismiss = page.locator(".empty-board-card .empty-board-close");
    if (await dismiss.count()) await dismiss.click();
  }

  const d = {
    page,
    wait,
    hole,
    glideTo,
    glideToElement,

    /** Shows a caption along the bottom of the video; "" hides it. */
    async caption(text) {
      await page.evaluate((t) => {
        let bar = document.getElementById("demoCaption");
        if (!bar) {
          bar = document.createElement("div");
          bar.id = "demoCaption";
          bar.style.cssText =
            "position:fixed;z-index:99998;left:50%;bottom:40px;transform:translateX(-50%);max-width:80vw;text-align:center;" +
            "background:rgba(10,20,15,.85);color:#fff;font:600 22px Barlow,sans-serif;padding:10px 22px;border-radius:8px;pointer-events:none";
          document.body.appendChild(bar);
        }
        bar.textContent = t;
        bar.style.display = t ? "block" : "none";
      }, text);
    },

    /** Caption, then hold it for `ms` so viewers can read it. */
    async say(text, ms = 2000) {
      await d.caption(text);
      await wait(ms);
    },

    /** Opens a project file (an object, or a path relative to the repo) as a new board. */
    async open(name, file) {
      d.opening = true;
      try {
        await openBoard(name, file);
      } finally {
        d.opening = false;
      }
    },

    // Whether open() is loading a page: any other page load mid-scene is the dev server's reload.
    opening: false,

    /** Opens an empty board of the given size: a perfboard, or "stripboard" with horizontal strips. */
    blank(name, cols = 16, rows = 10, type = "perfboard") {
      const strips = type === "stripboard" ? { strips: "horizontal" } : {};
      return d.open(name, {
        version: 3,
        board: { type, cols, rows, ...strips },
        pads: [],
        wires: [],
        ics: [],
        standardComponents: [],
        advancedComponents: [],
      });
    },

    /** Moves to a hole and clicks it. */
    async clickHole(col, row) {
      const h = await hole(col, row);
      await glideTo(h.x, h.y);
      await wait(200);
      await page.mouse.down();
      await page.mouse.up();
      await wait(400);
    },

    /** Clicks halfway between two holes: on a wire running between them, that selects it. */
    async clickBetween([c1, r1], [c2, r2]) {
      const [a, b] = [await hole(c1, r1), await hole(c2, r2)];
      await glideTo((a.x + b.x) / 2, (a.y + b.y) / 2);
      await wait(200);
      await page.mouse.down();
      await page.mouse.up();
      await wait(400);
    },

    /** Clicks a placed part (by its ref, e.g. "D1") in the middle of its pins: on its body. */
    async clickPart(ref) {
      const at = await page.evaluate((r) => {
        const part = window.__perfboard.parts().find((p) => p.ref === r);
        if (!part) throw new Error(`No part ${r} on the board`);
        const holes = part.pins.map((pin) =>
          window.__perfboard.holeToScreen(...pin.at)
        );
        const mean = (key) =>
          holes.reduce((sum, h) => sum + h[key], 0) / holes.length;
        return { x: mean("x"), y: mean("y") };
      }, ref);
      await glideTo(at.x, at.y);
      await wait(200);
      await page.mouse.down();
      await page.mouse.up();
      await wait(400);
    },

    /** Holds Shift and drags a box from one hole to another: selects everything inside it. */
    async boxSelect(from, to) {
      await page.keyboard.down("Shift");
      await d.dragHoles(from, to);
      await page.keyboard.up("Shift");
    },

    /** Drags from one hole to another (in Select mode, from a free hole this draws a wire). */
    async dragHoles([c1, r1], [c2, r2]) {
      const a = await hole(c1, r1);
      await glideTo(a.x, a.y);
      await page.mouse.down();
      await wait(150);
      const b = await hole(c2, r2);
      await glideTo(b.x, b.y, 30);
      await wait(200);
      await page.mouse.up();
      await wait(500);
    },

    /** Types into the parts search and picks a result (the first, or the nth). */
    async pickPart(query, nth = 0) {
      await page.fill("#catalogSearch", "");
      await page.click("#catalogSearch");
      await page.keyboard.type(query, { delay: 90 });
      await wait(500);
      const row = page.locator(".catalog-result-row").nth(nth);
      await glideToElement(row);
      await wait(200);
      await row.click();
      await wait(400);
    },

    /** Picks a part and places it: one hole for a fixed-pin part, two (start, end) for a two-lead one. */
    async place(query, ...holes) {
      await d.pickPart(query);
      for (const [c, r] of holes) await d.clickHole(c, r);
    },

    /**
     * Routes a wire with the wire tool through the given holes (bends at empty ones), then back to
     * Select. It ends at a hole that connects (a pin, a wire); to end on an empty hole, give it twice.
     */
    wire: (...holes) => d.route("w", holes),

    /** The same with the solder path tool (S): a trail of solder joining every hole it covers. */
    solder: (...holes) => d.route("s", holes),

    async route(toolKey, holes) {
      await page.keyboard.press("Escape");
      await page.keyboard.press(toolKey);
      await wait(300);
      for (const [c, r] of holes) await d.clickHole(c, r);
      await page.keyboard.press("Escape");
      await page.keyboard.press("Escape");
      await wait(300);
    },

    /** Moves to an element and clicks it. */
    async click(selector) {
      const el =
        typeof selector === "string"
          ? page.locator(selector).first()
          : selector;
      await glideToElement(el);
      await wait(200);
      await el.click();
      await wait(400);
    },

    /** Presses a key (a board shortcut, e.g. "r" to rotate). */
    async key(k, ms = 400) {
      await page.keyboard.press(k);
      await wait(ms);
    },

    /** Starts the video here: everything before (opening a board, setting it up) is cut. */
    rollCamera() {
      clock.rolledAt = Date.now() - clock.start;
    },

    /** Waits until the editor has caught up with the last change. */
    settled: () => page.evaluate(() => window.__perfboard.settled()),
  };
  return d;
}

module.exports = { createDirector, overlays, REPO };
