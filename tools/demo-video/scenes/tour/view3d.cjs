// Tour clip: the 3D view, turned round with the mouse. Played 4x fast (the headless browser draws
// it slowly), so its waits are 4x long.
module.exports = async (d) => {
  await d.open("555 blinker", "examples/perfboard-555-blinker.json");
  await d.glideTo(900, 300, 1);
  d.rollCamera();
  await d.wait(2000);
  await d.click("#open3dViewBtn");
  await d.wait(6000);
  const box = await d.page
    .locator(".viewer3d-canvas-host canvas")
    .boundingBox();
  const [x, y] = [box.x + box.width / 2, box.y + box.height / 2];
  await d.glideTo(x, y, 15);
  await d.page.mouse.down();
  await d.page.mouse.move(x + 280, y + 40, { steps: 25 });
  await d.page.mouse.move(x - 120, y - 30, { steps: 25 });
  await d.page.mouse.up();
  await d.wait(4000);
};
module.exports.options = { size: "1280x800", width: 960, crf: 30, speed: 4 };
