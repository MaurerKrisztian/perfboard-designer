// Tutorial: your first board, a battery, resistor and LED, step by step.
module.exports = async (d) => {
  await d.blank("My first board", 14, 9);
  await d.say("Tutorial: your first board", 2500);

  await d.say("1. Type in the parts search to find a part", 1500);
  await d.caption("Two-lead parts: click where each lead goes");
  await d.place("resistor", [3, 2], [7, 2]);
  await d.wait(800);

  await d.caption("Placing returns to Select with the part selected");
  await d.wait(2000);
  await d.key("Escape");

  await d.caption("2. Add an LED the same way");
  await d.place("led", [9, 2], [9, 5]);
  await d.key("Escape", 800);

  await d.caption("3. Press W for the wire tool and click pin to pin");
  await d.wire([7, 2], [9, 2]);
  await d.wait(800);
  await d.caption("Click empty holes to bend a wire on its way");
  await d.wire([3, 2], [3, 7], [9, 7], [9, 5]);
  await d.wait(800);

  await d.glideTo(1200, 300, 10);
  await d.say("4. Check the Nets panel: each connection is listed", 2500);

  await d.caption("Undo with Ctrl+Z, redo with Ctrl+Y");
  await d.key("Control+z", 1200);
  await d.key("Control+y", 1500);

  await d.say("Your board saves itself in the browser. Done!", 2500);
};
