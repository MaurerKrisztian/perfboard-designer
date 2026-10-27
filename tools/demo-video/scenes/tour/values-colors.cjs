// Tour clip: set a resistor's value (its bands follow) and pick an LED's colour.
module.exports = async (d) => {
  await d.blank("My board", 12, 8);
  await d.place("resistor", [2, 3], [6, 3]);
  await d.place("led", [8, 2], [8, 5]);
  await d.key("Escape");
  await d.settled();
  await d.glideTo(500, 600, 1);
  d.rollCamera();
  await d.wait(500);
  await d.clickPart("R1");
  await d.click("#selectionBar [data-action=value]");
  await d.page.keyboard.press("Control+a");
  await d.page.keyboard.type("4.7k", { delay: 120 });
  await d.wait(400);
  await d.key("Enter", 1200);
  await d.clickPart("D1");
  await d.click("#selectionBar [data-action=color]");
  await d.wait(500);
  await d.click(d.page.locator("#ledColorMenu button", { hasText: "Green" }));
  await d.key("Escape", 1800);
};
module.exports.options = {
  size: "1280x800",
  crop: { x: 0, y: 52, width: 1040, height: 650 },
  width: 832,
  crf: 28,
};
