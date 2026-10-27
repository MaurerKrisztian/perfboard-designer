// Tour clip: finding parts in the search and placing them.
module.exports = async (d) => {
  await d.blank("My board", 12, 8);
  await d.glideTo(500, 400, 1);
  d.rollCamera();
  await d.wait(600);
  await d.place("resistor", [2, 2], [6, 2]);
  await d.key("Escape", 600);
  await d.place("led", [8, 2], [8, 5]);
  await d.key("Escape", 1500);
};
module.exports.options = {
  size: "1280x800",
  crop: { x: 0, y: 52, width: 1040, height: 650 },
  width: 832,
  crf: 28,
};
