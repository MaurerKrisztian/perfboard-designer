// Tour clip: Solder side turns the board over, every joint to solder marked.
module.exports = async (d) => {
  await d.open("555 blinker", "examples/perfboard-555-blinker.json");
  await d.glideTo(640, 400, 1);
  d.rollCamera();
  await d.wait(800);
  await d.click("#solderViewBtn");
  await d.wait(3500);
  await d.click("#solderViewBtn");
  await d.wait(1200);
};
module.exports.options = { size: "1280x800", width: 960, crf: 28 };
