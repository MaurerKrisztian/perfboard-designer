import {Ic} from "../ic";
import {CustomParts} from "../custom-parts";
import {askConfirm} from "../ask-dialog";
import {partsLibrary, readPartsLibrary} from "../../project-file/parts-library";
import {ProjectFileError} from "../../project-file/read-project-file";

// File → Export / Import Custom Parts: the user's own ICs, dev boards and modules as one parts
// library file (src/project-file/parts-library.ts), to keep a copy or move them to another
// browser. Importing adds what's new to the catalog; nothing already there is changed.

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

export async function exportCustomParts() {
  const customIcs = Ic.customIcEntries();
  const customParts = CustomParts.parts;
  if (!customIcs.length && !customParts.length) {
    await askConfirm("No custom parts yet", "Make one with Custom IC or dev board… or Custom module… at the top of the Components list, then export it here.", "OK");
    return;
  }
  const json = JSON.stringify(partsLibrary(customIcs, customParts), null, 2);
  const url = URL.createObjectURL(new Blob([json], {type: "application/json"}));
  const link = document.createElement("a");
  link.download = "perfboard-custom-parts.json";
  link.href = url;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export async function importCustomParts(file: File) {
  let library;
  try {
    library = readPartsLibrary(JSON.parse(await file.text()));
  } catch (e) {
    const reason = e instanceof ProjectFileError ? e.message : "It isn't a valid parts library file.";
    await askConfirm("Couldn't import parts", `${file.name}: ${reason}`, "OK");
    return;
  }
  const ics = Ic.addCustomIcs(library.customIcs);
  if (ics) Ic.saveCustomIcsToLocalStorage();
  const modules = CustomParts.merge(library.customParts);
  const found = library.customIcs.length + library.customParts.length;
  const added = ics + modules;
  const message = added
    ? `Added ${plural(ics, "IC or dev board")} and ${plural(modules, "module")} to Components › Custom.`
      + (added < found ? ` ${found - added} you already had ${found - added === 1 ? "was" : "were"} left as ${found - added === 1 ? "it was" : "they were"}.` : "")
    : `You already have all ${plural(found, "part")} in ${file.name}.`;
  await askConfirm("Parts imported", message, "OK");
}
