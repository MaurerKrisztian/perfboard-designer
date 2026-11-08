import {ProjectFileError} from "../../project-file/read-project-file";
import {MAX_SHARED_PROJECT_BYTES, ShareLink} from "../../project-file/share-link";

// A project file hosted elsewhere, which a src= share link points at. Fetching it tells that site
// about the visit, so whoever calls this asks the user first. Touches no editor state, as the shared
// board's page (src/view-page/) uses it too.

// Where a link's `src` project is. Throws ProjectFileError when it isn't a web address.
export function hostedProjectAddress(link: Extract<ShareLink, {kind: "hosted"}>): URL {
  let url: URL;
  try {
    url = new URL(link.url);
  } catch {
    throw new ProjectFileError("The link's project address isn't a web address.");
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new ProjectFileError("The link's project address isn't a web address.");
  return url;
}

// The project file at `url`, parsed but not yet checked: pass it to readProjectFile. Throws
// ProjectFileError when it can't be had.
export async function downloadHostedProject(url: URL): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(url.href);
  } catch {
    throw new ProjectFileError(`It couldn't be downloaded from ${url.host}. The site may be down, or it may not let other websites read its files.`);
  }
  if (!response.ok) throw new ProjectFileError(`${url.host} didn't send it (error ${response.status}).`);
  const text = await response.text();
  if (text.length > MAX_SHARED_PROJECT_BYTES) throw new ProjectFileError("It's too big to open.");
  try {
    return JSON.parse(text);
  } catch {
    throw new ProjectFileError(`The file at ${url.host} isn't a Perfboard Designer project.`);
  }
}
