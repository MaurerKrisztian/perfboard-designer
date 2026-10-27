// Tour clip: on a stripboard a strip joins a resistor's two leads; a cut between them parts them.
module.exports = async (d) => {
  await d.blank("My stripboard", 12, 8, "stripboard");
  await d.place("resistor", [1, 2], [5, 2]);
  await d.place("led", [7, 2], [7, 5]);
  await d.key("Escape");
  await d.settled();
  await d.glideTo(1150, 200, 1);
  d.rollCamera();
  await d.wait(1800);
  await d.click(d.page.locator(".rail-btn", { hasText: "Cut" }));
  await d.clickHole(3, 2);
  await d.wait(500);
  await d.key("Escape");
  await d.glideTo(1150, 200, 20);
  await d.wait(2500);
};
module.exports.options = {
  size: "1280x800",
  crop: { x: 0, y: 52, width: 1280, height: 748 },
  width: 960,
  crf: 28,
};
