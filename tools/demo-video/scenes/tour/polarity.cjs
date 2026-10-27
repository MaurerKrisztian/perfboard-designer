// Tour clip: an LED turned the wrong way round between the supply rails is flagged in the Nets panel,
// and its Turn round puts it right.
module.exports = async (d) => {
  await d.open("555 blinker", "examples/perfboard-555-blinker.json");
  await d.glideTo(640, 500, 1);
  d.rollCamera();
  await d.wait(500);
  await d.clickPart("D1");
  await d.click("#selectionBar [data-action=turn-round]");
  await d.key("Escape");
  await d.wait(1500);
  await d.glideToElement(d.page.locator(".polarity-item").first());
  await d.wait(1800);
  await d.click(d.page.locator(".polarity-fix").first());
  await d.wait(1800);
};
module.exports.options = { size: "1280x800", width: 960, crf: 28 };
