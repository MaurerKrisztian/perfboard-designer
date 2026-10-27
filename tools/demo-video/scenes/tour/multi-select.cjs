// Tour clip: Shift-drag a box round a small circuit, duplicate it (Ctrl+D), then drag the copy away.
module.exports = async (d) => {
  await d.blank("My board", 14, 10);
  await d.place("resistor", [1, 1], [4, 1]);
  await d.place("led", [6, 1], [6, 3]);
  await d.key("Escape");
  await d.wire([4, 1], [6, 1]);
  await d.settled();
  await d.glideTo(600, 650, 1);
  d.rollCamera();
  await d.wait(500);
  await d.boxSelect([0, 0], [7, 4]);
  await d.wait(900);
  await d.key("Control+d", 1200);
  await d.wait(1500);
};
module.exports.options = {
  size: "1280x800",
  crop: { x: 364, y: 52, width: 916, height: 572 },
  width: 832,
  crf: 28,
};
