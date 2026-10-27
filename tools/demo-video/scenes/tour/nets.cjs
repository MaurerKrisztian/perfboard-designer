// Tour clip: the Nets panel, each net lit up on the board in turn.
module.exports = async (d) => {
  await d.open("555 blinker", "examples/perfboard-555-blinker.json");
  await d.glideTo(1100, 120, 1);
  d.rollCamera();
  await d.wait(500);
  const nets = d.page.locator(".nets-panel .net");
  for (const i of [0, 1, 2, 3, 5]) {
    await d.click(nets.nth(i));
    await d.wait(1100);
  }
  await d.click(nets.nth(5));
  await d.wait(700);
};
module.exports.options = {
  size: "1280x800",
  crop: { x: 364, y: 52, width: 916, height: 572 },
  width: 832,
  crf: 28,
};
