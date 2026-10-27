// Tour clip: a wire moved to the solder side, then seen from below.
module.exports = async (d) => {
  await d.open("555 blinker", "examples/perfboard-555-blinker.json");
  await d.glideTo(640, 400, 1);
  d.rollCamera();
  await d.wait(600);
  await d.clickBetween([5, 0], [6, 0]);
  await d.wait(900);
  await d.click(
    d.page.locator("#selectionBar button", { hasText: "To solder side" })
  );
  await d.wait(1500);
  await d.key("b", 3000);
  await d.key("b", 1200);
};
module.exports.options = { size: "1280x800", width: 960, crf: 28 };
