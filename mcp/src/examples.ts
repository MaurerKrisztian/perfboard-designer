import {ProjectFile, readProjectFile} from "./editor";

// Example projects, served as resources and as new_project's `example`. Their files come from
// ../examples, baked in by build.mjs (which lists the same ids).

export const EXAMPLES: Record<string, {title: string; description: string}> = {
  "555-led-blinker": {
    title: "555 LED blinker (perfboard)",
    description: "An NE555 astable flashing an LED about once a second from a 9 V battery, on a perfboard laid out as a model board: a screw terminal with a reverse-polarity diode and a bulk capacitor, bare-wire supply rails (solder paths) along the top and bottom, a decoupling capacitor right across the chip's supply pins, the timing parts in a column, a red jumper for reset and a link under the chip on the solder side.",
  },
  "555-led-blinker-stripboard": {
    title: "555 LED blinker (stripboard)",
    description: "The same 555 LED blinker on a stripboard with horizontal strips: +9 V and ground strips paired at the top for the supply capacitors and a second ground strip at the bottom, the diode across a cut in the supply strip, cuts under the chip so its two pin rows aren't shorted, and six wire links.",
  },
};

export const EXAMPLE_IDS = Object.keys(EXAMPLES) as [string, ...string[]];

export function exampleProject(id: string): ProjectFile | undefined {
  const text = EXAMPLE_PROJECTS[id];
  return text === undefined ? undefined : readProjectFile(JSON.parse(text)).project;
}
