// Tour clip: the wire tool, pin to pin, then a wire bending at empty holes.
module.exports = async (d) => {
  await d.blank("My board", 12, 8);
  await d.place("resistor", [2, 2], [6, 2]);
  await d.key("Escape");
  await d.place("led", [8, 2], [8, 5]);
  await d.key("Escape");
  await d.settled();
  await d.glideTo(700, 500, 1);
  d.rollCamera();
  await d.wait(600);
  await d.wire([6, 2], [8, 2]);
  await d.wait(500);
  await d.wire([2, 2], [2, 6], [8, 6], [8, 5]);
  await d.glideTo(1100, 300, 15);
  await d.wait(1500);
};
module.exports.options = {
  size: "1280x800",
  crop: { x: 364, y: 52, width: 916, height: 572 },
  width: 832,
  crf: 28,
};
