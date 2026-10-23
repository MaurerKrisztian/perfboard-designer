import {askConfirm} from "../ask-dialog";
import {ProjectFileError} from "../../project-file/read-project-file";
import {decodeEmbeddedProject, MAX_SHARED_PROJECT_BYTES, readShareFragment, ShareLink} from "../../project-file/share-link";
import {importSharedProject} from "./current-project";
import {fetchStoredProject} from "./project-storage";
import {fitToScreen} from "../zoom";

// Opening a share link (src/project-file/share-link.ts): the project it carries or points at is
// added to the receiver's projects as a new one. The Share dialog that makes links is in the UI
// (src/ui/dialogs/ShareDialog.tsx).

// A link's `src` project, after the user agrees to it being downloaded: fetching it tells that
// site about the visit. Undefined when they decline.
async function fetchHostedProject(link: Extract<ShareLink, {kind: "hosted"}>): Promise<unknown> {
  let url: URL;
  try {
    url = new URL(link.url);
  } catch {
    throw new ProjectFileError("The link's project address isn't a web address.");
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new ProjectFileError("The link's project address isn't a web address.");
  if (!await askConfirm("Open a project from another site?", `This link opens a project file from ${url.host}: ${url.href}. Download and open it?`, "Download and open")) return undefined;

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

// A hosted project without a `name` is named after its file.
function hostedFileName(url: string): string | undefined {
  try {
    const file = decodeURIComponent(new URL(url).pathname.split('/').pop() ?? '');
    return file.replace(/\.json$/i, '').trim() || undefined;
  } catch {
    return undefined;
  }
}

// What a link's project is called: its `name`, else a hosted file's name or a stored project's id.
function linkedProjectName(link: ShareLink): string | undefined {
  if (link.name) return link.name;
  if (link.kind === 'hosted') return hostedFileName(link.url);
  return link.kind === 'stored' ? link.id : undefined;
}

// The project a link carries or points at, parsed but not yet checked; undefined when the user
// declines downloading a hosted one. A stored project comes from Perfboard Designer's own storage,
// so it's fetched without asking.
function linkedProject(link: ShareLink): Promise<unknown> {
  if (link.kind === 'hosted') return fetchHostedProject(link);
  if (link.kind === 'stored') return fetchStoredProject(link.id);
  return decodeEmbeddedProject(link);
}

// Opens the project in the address bar's fragment, if it holds a share link.
async function openLinkedProject() {
  const link = readShareFragment(location.hash);
  if (!link) return;
  // Off the address bar first, so reloading the page doesn't add the project again.
  history.replaceState(null, '', location.pathname + location.search);
  let raw: unknown;
  try {
    raw = await linkedProject(link);
  } catch (err) {
    console.error(err);
    alert(`Couldn't open the shared project. ${err instanceof ProjectFileError ? err.message : "The link is damaged."}`);
    return;
  }
  if (raw === undefined) return;
  importSharedProject(raw, linkedProjectName(link));
  // Someone else's board may not fit the view at the zoom it was left at: show all of it.
  fitToScreen(true);
}

// At startup, after the last project was reopened (so this one isn't then replaced by it): opens
// the link the editor was opened with, and any pasted into the address bar of a tab already on
// it, which only changes the fragment.
export function startOpeningSharedLinks() {
  void openLinkedProject();
  window.addEventListener('hashchange', () => void openLinkedProject());
}
