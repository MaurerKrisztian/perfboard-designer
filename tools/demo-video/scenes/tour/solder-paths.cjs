// Tour clip: a solder path joins every hole it runs over, so a second one can join it anywhere.
module.exports = async (d) => {
  await d.blank("My board", 12, 8);
  await d.place("resistor", [1, 2], [4, 2]);
  await d.place("led", [8, 2], [8, 5]);
  await d.place("resistor", [6, 4], [6, 7]);
  await d.key("Escape");
  await d.settled();
  await d.glideTo(700, 600, 1);
  d.rollCamera();
  await d.wait(600);
  await d.solder([4, 2], [8, 2]);
  await d.wait(600);
  await d.solder([6, 4], [6, 2]);
  await d.glideTo(1150, 200, 20);
  await d.wait(2500);
};
module.exports.options = {
  size: "1280x800",
  crop: { x: 364, y: 52, width: 916, height: 572 },
  width: 832,
  crf: 28,
};
