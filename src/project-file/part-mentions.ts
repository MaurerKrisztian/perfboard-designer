import type {FindMention} from "./description";
import {partList} from "./part-list";
import {PlacedPin, partPins} from "./pin-positions";
import {ProjectFile} from "./project-file";

// What part names in a project's description stand for (descriptionHtml's FindMention): its parts by
// their refs, written exactly as the board writes them, and their pins as people write them: "U1.8",
// "U1.VCC", "D1.K". Worked out from the project file alone, like the nets.

// A pin by its number or, if only one has it, its name in any case. Pins sharing a name can't be told
// apart by it (a module's two GNDs), so such a mention is left naming the part.
function findPin(pins: PlacedPin[], name: string): PlacedPin | undefined {
  if (/^\d+$/.test(name)) return pins.find(pin => pin.pin === Number(name));
  const wanted = name.toLowerCase();
  const named = pins.filter(pin => pin.label?.toLowerCase() === wanted);
  return named.length === 1 ? named[0] : undefined;
}

export function partMentions(project: ProjectFile): FindMention {
  const titles = new Map(partList(project).map(row => [row.ref, row.value ? `${row.part} ${row.value}` : row.part]));
  const pins = new Map(partPins(project).map(part => [part.ref, part.pins]));
  return (ref, pinName) => {
    const title = titles.get(ref);
    if (title === undefined) return undefined;
    if (pinName === undefined) return {ref, title};
    const pin = findPin(pins.get(ref) ?? [], pinName);
    return pin && {ref, hole: pin.at, title: `${title}, pin ${pin.pin}${pin.label ? ` (${pin.label})` : ""}`};
  };
}
