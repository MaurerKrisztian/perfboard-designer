// The overview demo: build a small circuit, nets, the 555 blinker examples, the 3D view.
module.exports = async (d) => {
  await d.blank("LED demo", 16, 10);
  await d.say(
    "Perfboard Designer — lay out circuits on a virtual perfboard",
    2200
  );

  await d.caption("Search the parts catalog and place a resistor");
  await d.place("resistor", [4, 3], [8, 3]);
  await d.caption("Add an LED");
  await d.place("led", [10, 3], [10, 6]);

  await d.caption("Wire tool (W): click a route, bending at empty holes");
  await d.wire([8, 3], [10, 3]);
  await d.wire([4, 3], [4, 8], [10, 8], [10, 6]);
  await d.glideTo(1200, 650, 10);
  await d.say("Nets update live in the right panel", 2500);

  await d.caption("Open bigger projects — a 555 LED blinker");
  await d.open("555 blinker", "examples/perfboard-555-blinker.json");
  await d.wait(2500);

  await d.caption("Click a net to highlight it on the board");
  for (const i of [0, 2]) {
    await d.click(d.page.locator(".nets-panel .net").nth(i));
    await d.wait(1800);
  }

  await d.caption("Stripboards too, with strip cuts");
  await d.open("Stripboard blinker", "examples/stripboard-555-blinker.json");
  await d.wait(3000);

  await d.caption("…and inspect it in 3D");
  await d.click("#open3dViewBtn");
  await d.wait(4500);
  const box = await d.page
    .locator(".viewer3d-canvas-host canvas")
    .boundingBox();
  const [x, y] = [box.x + box.width / 2, box.y + box.height / 2];
  await d.page.mouse.move(x, y);
  await d.page.mouse.down();
  await d.page.mouse.move(x + 250, y + 60, { steps: 60 });
  await d.page.mouse.up();
  await d.wait(2000);

  await d.say("perfboarddesigner.com", 2500);
};
