// Tour clip: a finished board, its nets lighting up.
module.exports = async (d) => {
  await d.open("555 blinker", "examples/perfboard-555-blinker.json");
  await d.glideTo(640, 400, 1);
  d.rollCamera();
  await d.wait(800);
  for (const i of [0, 1, 2]) {
    await d.click(d.page.locator(".nets-panel .net").nth(i));
    await d.wait(1300);
  }
  await d.click(d.page.locator(".nets-panel .net").nth(2));
  await d.wait(800);
};
module.exports.options = { size: "1280x800", width: 960, crf: 28 };
