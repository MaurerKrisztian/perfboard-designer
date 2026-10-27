// Tour clip: Required connections copies the board's wiring as the plan, then flags the net a deleted
// wire leaves unwired.
module.exports = async (d) => {
  await d.open("555 blinker", "examples/perfboard-555-blinker.json");
  await d.glideTo(640, 500, 1);
  d.rollCamera();
  await d.wait(500);
  await d.click(".reqs > summary");
  await d.wait(900);
  await d.click(
    d.page.locator(".reqs-actions button", { hasText: "Use current wiring" })
  );
  await d.wait(1800);
  await d.clickBetween([5, 0], [6, 0]);
  await d.key("Delete", 400);
  await d.glideTo(1150, 160, 20);
  await d.wait(2500);
};
module.exports.options = { size: "1280x800", width: 960, crf: 28 };
