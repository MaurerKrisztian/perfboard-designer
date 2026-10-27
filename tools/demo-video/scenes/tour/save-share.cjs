// Tour clip: the File menu's ways to keep and share a board, then the Share dialog.
module.exports = async (d) => {
  await d.open("555 blinker", "examples/perfboard-555-blinker.json");
  await d.glideTo(500, 400, 1);
  d.rollCamera();
  await d.wait(500);
  await d.click(d.page.locator(".menu-trigger", { hasText: "File" }));
  await d.wait(1200);
  await d.click(
    d.page.locator(".menu-panel button", { hasText: "Share Link" })
  );
  await d.wait(3000);
  await d.key("Escape", 800);
};
module.exports.options = { size: "1280x800", width: 960, crf: 28 };
