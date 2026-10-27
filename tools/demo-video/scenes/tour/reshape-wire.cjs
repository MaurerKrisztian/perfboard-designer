// Tour clip: a selected wire's handles: drag its middle out into a bend, move the bend, then straighten it.
module.exports = async (d) => {
  await d.blank("My board", 12, 8);
  await d.place("resistor", [1, 2], [4, 2]);
  await d.place("resistor", [7, 2], [10, 2]);
  await d.key("Escape");
  await d.wire([4, 2], [7, 2]);
  await d.settled();
  await d.glideTo(600, 600, 1);
  d.rollCamera();
  await d.wait(500);
  await d.clickBetween([5, 2], [6, 2]);
  await d.wait(700);
  await d.dragHoles([5, 2], [5, 5]);
  await d.wait(700);
  await d.dragHoles([5, 5], [6, 6]);
  await d.wait(900);
  await d.click("#selectionBar [data-action=straighten]");
  await d.wait(1500);
};
module.exports.options = {
  size: "1280x800",
  crop: { x: 364, y: 52, width: 916, height: 572 },
  width: 832,
  crf: 28,
};
