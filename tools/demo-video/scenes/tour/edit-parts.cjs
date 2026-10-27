// Tour clip: drag a part to move it, R to rotate one, Ctrl+Z to undo and Ctrl+Y to redo.
module.exports = async (d) => {
  await d.blank("My board", 12, 8);
  await d.place("resistor", [2, 2], [6, 2]);
  await d.key("Escape");
  await d.settled();
  await d.glideTo(500, 500, 1);
  d.rollCamera();
  await d.wait(600);
  await d.dragHoles([4, 2], [4, 5]);
  await d.wait(600);
  // The first result for "transistor" is the Custom part… entry; the second is the TO-92 transistor.
  await d.pickPart("transistor", 1);
  await d.clickHole(9, 3);
  await d.wait(500);
  await d.key("r", 900);
  await d.key("r", 900);
  await d.key("Control+z", 1300);
  await d.key("Control+y", 1800);
};
module.exports.options = {
  size: "1280x800",
  crop: { x: 0, y: 52, width: 1040, height: 650 },
  width: 832,
  crf: 28,
};
