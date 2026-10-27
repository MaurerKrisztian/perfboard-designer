// Tour clip: Custom part… makes a module of your own: name it, give it pins, save it, place it.
module.exports = async (d) => {
  await d.blank("My board", 14, 10);
  await d.glideTo(600, 600, 1);
  d.rollCamera();
  await d.wait(500);
  await d.click(
    d.page.locator(".catalog-row", { hasText: "Custom part" }).first()
  );
  await d.wait(900);
  await d.click(
    d.page.locator(".custom-kind", {
      has: d.page.locator(".custom-kind-name", {
        hasText: "Module, pins anywhere",
      }),
    })
  );
  await d.page.waitForSelector("#customPartName");
  await d.wait(700);
  const name = d.page.locator("#customPartName");
  await d.click(name);
  await name.pressSequentially("HC-SR04", { delay: 100 });
  await d.wait(400);
  await d.click(
    d.page.locator(".custom-part-card button", { hasText: "Bottom row" })
  );
  await d.wait(900);
  await d.click(
    d.page.locator(".custom-part-card button", { hasText: "Save Module" })
  );
  await d.wait(900);
  await d.clickHole(5, 4);
  await d.key("Escape", 1800);
};
module.exports.options = { size: "1280x800", width: 960, crf: 28 };
