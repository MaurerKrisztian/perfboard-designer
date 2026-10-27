// Tour clip: the Note tool writes a note on a hole; pointing at the hole shows it.
module.exports = async (d) => {
  await d.blank("My board", 12, 8);
  await d.place("resistor", [3, 3], [7, 3]);
  await d.key("Escape");
  await d.settled();
  await d.glideTo(500, 600, 1);
  d.rollCamera();
  await d.wait(500);
  await d.click(d.page.locator(".rail-btn", { hasText: "Note" }));
  await d.clickHole(1, 3);
  await d.wait(400);
  await d.page.keyboard.type("+9V from battery", { delay: 80 });
  await d.wait(400);
  await d.key("Enter", 800);
  await d.key("Escape", 300);
  await d.glideTo(500, 500, 10);
  const h = await d.hole(1, 3);
  await d.glideTo(h.x, h.y, 20);
  await d.wait(2200);
};
module.exports.options = {
  size: "1280x800",
  crop: { x: 0, y: 52, width: 1280, height: 748 },
  width: 960,
  crf: 28,
};
