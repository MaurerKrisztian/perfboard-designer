import {ProjectFile} from "../../project-file/project-file";
import {readShortLinks, SavedShortLink, writeShortLinks} from "./project-store";

// The short links made for a project, kept in this browser so they aren't lost once the Share dialog
// closes. A stored project never changes (project-storage.ts), so each remembers which board it's a
// copy of, for saying so when the project's board has moved on from it.

// Stands for a board, to tell it from another. Without customIcs, which is this browser's whole
// catalog of them rather than anything about this board. FNV-1a: a mistake here would only mislabel
// a link, so it needn't be a cryptographic hash (and those are asynchronous, and need https).
export function boardFingerprint(project: ProjectFile): string {
  const text = JSON.stringify({...project, customIcs: undefined});
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36);
}

// Keeps `link` at the top of the project's list; making the same link again moves it there. Returns
// the list. If storage is full or off, it's logged, and the link is on the returned list all the same.
export function rememberShortLink(projectId: string, link: SavedShortLink): SavedShortLink[] {
  const links = [link, ...readShortLinks(projectId).filter(other => other.id !== link.id)];
  try {
    writeShortLinks(projectId, links);
  } catch (e) {
    console.error("Can't keep the short link in local storage.", e);
  }
  return links;
}

// Takes a link off the project's list. The stored copy stays where it is. Returns the list.
export function forgetShortLink(projectId: string, id: string): SavedShortLink[] {
  const links = readShortLinks(projectId).filter(link => link.id !== id);
  try {
    writeShortLinks(projectId, links);
  } catch (e) {
    console.error("Can't update the short links in local storage.", e);
  }
  return links;
}
