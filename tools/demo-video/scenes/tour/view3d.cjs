// Tour clip: the 3D view, turned round with the mouse, then the Bottom view's copper side (its solder
// paths and joints), turned a little too, and back to Angled. Record it on a machine with a GPU: in
// software WebGL (SwiftShader) the headless browser draws the 3D view too slowly and the clip stutters.
module.exports = async (d) => {
  await d.open("555 blinker", "examples/perfboard-555-blinker.json");
  await d.glideTo(900, 300, 1);
  d.rollCamera();
  await d.wait(500);
  await d.click("#open3dViewBtn");
  await d.wait(1500);
  const box = await d.page
    .locator(".viewer3d-canvas-host canvas")
    .boundingBox();
  const [x, y] = [box.x + box.width / 2, box.y + box.height / 2];
  await d.glideTo(x, y, 15);
  await d.page.mouse.down();
  await d.page.mouse.move(x + 280, y + 40, { steps: 60 });
  await d.page.mouse.move(x - 120, y - 30, { steps: 60 });
  await d.page.mouse.up();
  await d.wait(800);
  await d.click(d.page.locator(".viewer3d-view", { hasText: "Bottom" }));
  await d.wait(1800);
  await d.glideTo(x, y, 15);
  await d.page.mouse.down();
  await d.page.mouse.move(x + 160, y - 15, { steps: 50 });
  await d.page.mouse.move(x - 40, y + 5, { steps: 50 });
  await d.page.mouse.up();
  await d.wait(1200);
  await d.click(d.page.locator(".viewer3d-view", { hasText: "Angled" }));
  await d.wait(1200);
};
module.exports.options = { size: "1280x800", width: 960, crf: 33 };
