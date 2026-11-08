import {askConfirm, tell} from "../ask-dialog";
import {ProjectFileError} from "../../project-file/read-project-file";
import {decodeEmbeddedProject, linkedProjectName, readShareFragment, ShareLink} from "../../project-file/share-link";
import {importSharedProject} from "./current-project";
import {downloadHostedProject, hostedProjectAddress} from "./hosted-project";
import {fetchStoredProject} from "./project-storage";
import {fitToScreen} from "../zoom";
import {reportUsage} from "../analytics";

// Opening a share link (src/project-file/share-link.ts): the project it carries or points at is
// added to the receiver's projects as a new one. The Share dialog that makes links is in the UI
// (src/ui/dialogs/ShareDialog.tsx).

// A link's `src` project, after the user agrees to it being downloaded: fetching it tells that
// site about the visit. Undefined when they decline.
async function fetchHostedProject(link: Extract<ShareLink, {kind: "hosted"}>): Promise<unknown> {
  const url = hostedProjectAddress(link);
  if (!await askConfirm("Open a project from another site?", `This link opens a project file from ${url.host}: ${url.href}. Download and open it?`, "Download and open")) return undefined;
  return downloadHostedProject(url);
}

// The project a link carries or points at, parsed but not yet checked; undefined when the user
// declines downloading a hosted one. A stored project comes from Perfboard Designer's own storage,
// so it's fetched without asking.
function linkedProject(link: ShareLink): Promise<unknown> {
  if (link.kind === 'hosted') return fetchHostedProject(link);
  if (link.kind === 'stored') return fetchStoredProject(link.id);
  return decodeEmbeddedProject(link);
}

// The link's kind as its fragment says it, for counting (analytics.ts).
const linkType = (link: ShareLink) => link.kind === 'embedded' ? link.format : link.kind === 'hosted' ? 'src' : 'p';

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
    void tell("Couldn't open the shared project", err instanceof ProjectFileError ? err.message : "The link is damaged.");
    return;
  }
  if (raw === undefined) return;
  reportUsage({name: "open_shared_link", link_type: linkType(link)});
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
