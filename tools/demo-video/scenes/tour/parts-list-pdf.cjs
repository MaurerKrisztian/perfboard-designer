// Tour clip: File › Component List (the bill of materials), then File › Export PDF.
module.exports = async (d) => {
  await d.open("555 blinker", "examples/perfboard-555-blinker.json");
  await d.glideTo(640, 400, 1);
  d.rollCamera();
  await d.wait(500);
  await d.click(d.page.locator(".menu-trigger", { hasText: "File" }));
  await d.click(
    d.page.locator(".menu-panel button", { hasText: "Component List" })
  );
  await d.wait(2500);
  await d.key("Escape", 600);
  await d.click(d.page.locator(".menu-trigger", { hasText: "File" }));
  await d.click(
    d.page.locator(".menu-panel button", { hasText: "Export PDF" })
  );
  await d.wait(2500);
  await d.key("Escape", 600);
};
module.exports.options = { size: "1280x800", width: 960, crf: 28 };
