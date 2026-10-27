// Tour clip: two jumper wires crossing stay apart, so the Nets panel shows two nets.
module.exports = async (d) => {
  await d.blank("My board", 12, 9);
  await d.place("resistor", [0, 4], [3, 4]);
  await d.place("resistor", [8, 4], [11, 4]);
  await d.place("resistor", [5, 0], [5, 3]);
  await d.place("resistor", [5, 6], [5, 8]);
  await d.key("Escape");
  await d.settled();
  await d.glideTo(700, 600, 1);
  d.rollCamera();
  await d.wait(600);
  await d.wire([3, 4], [8, 4]);
  await d.wire([5, 3], [5, 6]);
  await d.glideTo(1150, 200, 20);
  await d.wait(2500);
};
module.exports.options = {
  size: "1280x800",
  crop: { x: 364, y: 52, width: 916, height: 572 },
  width: 832,
  crf: 28,
};
