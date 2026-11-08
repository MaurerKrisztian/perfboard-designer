import {RefObject, useEffect, useRef, useState} from "react";
import {DescriptionState} from "../../state/DescriptionState";
import {ProjectState} from "../../state/ProjectState";
import {makeShareFragment, makeStoredShareFragment, readingPageUrl} from "../../project-file/share-link";
import {getSaveJson} from "../../features/project/save-project";
import {SHORT_LINKS, storedPictures, storeProject} from "../../features/project/project-storage";
import {readShortLinks, SavedShortLink} from "../../features/project/project-store";
import {boardFingerprint, forgetShortLink, rememberShortLink} from "../../features/project/short-links";
import {askConfirm} from "../../features/ask-dialog";
import {reportUsage} from "../../features/analytics";
import {Icon} from "../components/Icon";
import {Modal} from "../components/Modal";
import {SegmentedControl} from "../components/SegmentedControl";
import {useEditor} from "../hooks/use-editor";
import {cx} from "../lib/class-names";
import {openDialog} from "./dialog-store";

// The Share dialog: a link that carries the board as it is now, in the link itself, and on request
// a short link to a copy stored on Perfboard Designer's project storage, with links to pictures of
// it (SVG and PNG). The full link always works, without the storage. A link opens the editor, or
// the page that shows the board for reading (view/, src/view-page/), with the same fragment. The
// short links made for a project are kept in this browser and listed here (short-links.ts), so
// closing the dialog doesn't lose them.
// Opening links in the editor is in src/features/project/open-shared-link.ts.

// Some chat apps and mail clients cut links off past a few thousand characters.
const LONG_LINK = 8000;

interface Note {
  text: string;
  warning?: boolean;
}

// What a link opens: the board in the receiver's editor, or a page to read about it.
type LinkTarget = "editor" | "page";

const TARGETS: {value: LinkTarget; label: string}[] = [
  {value: "editor", label: "Opens the editor"},
  {value: "page", label: "Opens a page to read"},
];

const TARGET_NOTES: Record<LinkTarget, string> = {
  editor: "Anyone who opens this link gets their own copy of the board as it is now. Changes you make later aren't in it: share a new link for those.",
  page: "Anyone who opens this link sees the board, its description, parts and nets on a page, and can open their own copy from there. Changes you make later aren't in it: share a new link for those.",
};

// The link's address with a share link's fragment; never the fragment the editor was opened with.
function shareUrl(target: LinkTarget, fragment: string): string {
  const editor = `${location.origin}${location.pathname}`;
  return `${target === "page" ? readingPageUrl(editor) : editor}#${fragment}`;
}

// Selects a link in its box, showing its start (the address) rather than the tail selecting scrolls to.
function selectLink(input: HTMLInputElement | null) {
  if (!input) return;
  input.focus();
  input.select();
  input.scrollLeft = 0;
}

// Copies the link in `input`. Resolves with whether it worked: the clipboard API needs a secure
// context, so copying the selected text is the fallback.
async function copyLink(input: HTMLInputElement | null): Promise<boolean> {
  if (!input) return false;
  input.select();
  try {
    await navigator.clipboard.writeText(input.value);
    return true;
  } catch {
    return document.execCommand("copy");
  }
}

export function ShareDialog({onClose}: {onClose: () => void}) {
  const hasDescription = useEditor(() => !!DescriptionState.current);
  // A board with a description is one to read about.
  const [target, setTarget] = useState<LinkTarget>(hasDescription ? "page" : "editor");
  const [fragment, setFragment] = useState("");
  const [problem, setProblem] = useState<Note>();
  const [copied, setCopied] = useState(false);
  const linkInput = useRef<HTMLInputElement>(null);
  const link = fragment && shareUrl(target, fragment);

  useEffect(() => {
    let current = true;
    makeShareFragment(getSaveJson(), ProjectState.current?.name).then(made => {
      if (current) setFragment(made);
    }, (err: unknown) => {
      console.error(err);
      if (current) setProblem({text: "This browser can't make share links. Use File → Save Project to File instead."});
    });
    return () => {
      current = false;
    };
  }, []);

  useEffect(() => {
    setCopied(false);
    if (link) selectLink(linkInput.current);
  }, [link]);

  const copy = async () => {
    if (await copyLink(linkInput.current)) {
      setCopied(true);
      reportUsage({name: "share", method: target === "page" ? "page_link" : "full_link"});
    } else setProblem({text: "Copying was blocked. Select the link and copy it yourself."});
  };

  const size = `${link.length.toLocaleString()} characters.`;
  const info: Note = problem ?? (!link ? {text: "Making the link..."} : link.length > LONG_LINK
    ? {text: `${size} That's long enough that some chat apps and mail clients may cut it off. If it doesn't open for them, send the project file instead (File → Save Project to File).`, warning: true}
    : {text: `${size} The board is in the link itself; it isn't uploaded anywhere.`});

  return (
    <Modal title="Share Link" className="share-card" onClose={onClose}>
      <div className="modal-body">
        <SegmentedControl id="shareTarget" options={TARGETS} value={target} onChange={setTarget}/>
        <p className="share-note">{TARGET_NOTES[target]}</p>
        <div className="share-row">
          <input ref={linkInput} type="text" className="share-link-input" readOnly aria-label="Share link" value={link}/>
          {/* The page as whoever's sent the link sees it. Only for the page: the editor's link would
              open the board here again, as a copy. */}
          {target === "page" && link && (
            <a className="btn share-preview" href={link} target="_blank" rel="noopener" title="Open the page in a new tab, as whoever you send the link to will see it">
              <Icon name="external"/>Preview
            </a>
          )}
        </div>
        <NoteText note={info}/>
        <p className="share-note">
          {hasDescription ? "Its description goes with it. " : "Tell people what this board is and how it works. "}
          <button type="button" className="share-text-btn" onClick={() => openDialog({kind: "description", fromShare: true})}>
            {hasDescription ? "Change the description" : "Add a description"}
          </button>
        </p>
        {SHORT_LINKS && <ShortLink target={target}/>}
      </div>
      <div className="modal-footer">
        <button className="btn" onClick={onClose}>Close</button>
        <button className="btn-primary" disabled={!link} onClick={() => void copy()}>{copied ? "Copied ✓" : "Copy Link"}</button>
      </div>
    </Modal>
  );
}

function NoteText({note}: {note: Note}) {
  return <p className={cx("share-note", note.warning && "is-warning")} aria-live="polite">{note.text}</p>;
}

// Stores a copy of the board for a short link, under the name typed (or the project's), and lists
// the short links made for this project, each opening `target`.
function ShortLink({target}: {target: LinkTarget}) {
  const project = ProjectState.current;
  const [name, setName] = useState(project?.name ?? "");
  const [links, setLinks] = useState<SavedShortLink[]>(() => project ? readShortLinks(project.id) : []);
  // The one just made, opened out and ready to copy.
  const [madeNow, setMadeNow] = useState<string>();
  // The board can't change while the dialog is open.
  const [boardNow] = useState(() => boardFingerprint(getSaveJson()));
  const [info, setInfo] = useState<Note>({text: ""});
  const [busy, setBusy] = useState(false);
  // A dialog closed meanwhile mustn't get the result, but the link is still worth keeping.
  const mounted = useMounted();

  const make = async () => {
    const board = getSaveJson();
    const wanted = name.trim();
    setBusy(true);
    setInfo({text: "Storing a copy of the board..."});
    try {
      const id = await storeProject(board, {...(wanted ? {id: wanted} : {}), ...(project ? {name: project.name} : {})});
      reportUsage({name: "share", method: "short_link"});
      const made: SavedShortLink = {id, ...(project ? {name: project.name} : {}), madeAt: Date.now(), board: boardFingerprint(board)};
      // Not kept when the board isn't a stored project (this browser's storage is off), but still shown.
      const kept = project ? rememberShortLink(project.id, made) : [made, ...links.filter(link => link.id !== id)];
      if (!mounted.current) return;
      setLinks(kept);
      setMadeNow(id);
      setInfo({text: `Stored as "${id}". The stored copy doesn't change: after changing the board, make a new link.`});
    } catch (err) {
      console.error(err);
      if (!mounted.current) return;
      setInfo({text: `Couldn't make a short link: ${err instanceof Error ? err.message : String(err)} The full link above works without it.`, warning: true});
    } finally {
      if (mounted.current) setBusy(false);
    }
  };

  // Asks first: losing a link is what the list is there to prevent.
  const forget = async (id: string) => {
    if (!await askConfirm(`Forget the short link "${id}"?`, "It comes off this list. The link keeps working for anyone who has it, but you can't get it back from here.", "Forget", true)) return;
    if (!mounted.current) return;
    setLinks(project ? forgetShortLink(project.id, id) : links.filter(link => link.id !== id));
  };

  return (
    <div className="share-short">
      <p className="share-note"><strong>Short link:</strong> stores a copy of the board on Perfboard Designer's server and gives you a short link to it, with links to a picture of the board as SVG and PNG.</p>
      <div className="share-row">
        <input type="text" maxLength={40} placeholder="Name for the link, e.g. led-blinker" aria-label="Name for the short link"
          value={name} onChange={e => setName(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !busy) void make();
          }}/>
        <button className="btn" disabled={busy} onClick={() => void make()}>Make Short Link</button>
      </div>
      <NoteText note={info}/>
      {links.length > 0 && (
        <section className="share-saved" aria-label="Short links made for this project">
          <p className="share-note">Short links made for this project, kept in this browser:</p>
          <ul>
            {links.map(link => (
              <SavedLink key={link.id} link={link} target={target} changedSince={link.board !== boardNow} madeNow={link.id === madeNow} onForget={() => void forget(link.id)}/>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

// One short link made for the project: to copy, with its pictures folded away until it's just made.
// A stored copy never changes, so it's marked once the board has moved on from it.
function SavedLink({link, target, changedSince, madeNow, onForget}: {link: SavedShortLink; target: LinkTarget; changedSince: boolean; madeNow: boolean; onForget: () => void}) {
  const pictures = storedPictures(link.id);
  return (
    <li className="share-saved-link">
      <div className="share-saved-head">
        <strong>{link.id}</strong>
        <span>{new Date(link.madeAt).toLocaleDateString()}</span>
        {changedSince && <span className="share-saved-changed" title="This link still shows the board as it was when the link was made. Make a new link for the board as it is now.">Board has changed since</span>}
        <button type="button" className="share-text-btn share-forget" onClick={onForget}>Forget</button>
      </div>
      <CopyRow label="Link" value={shareUrl(target, makeStoredShareFragment(link.id, link.name))} selected={madeNow}/>
      <details className="share-pictures" open={madeNow}>
        <summary>Pictures of it</summary>
        <CopyRow label="SVG" value={pictures.svg}/>
        <CopyRow label="PNG" value={pictures.png}/>
      </details>
    </li>
  );
}

// One link with a Copy button; `selected` selects it as it appears, ready to copy.
function CopyRow({label, value, selected = false}: {label: string; value: string; selected?: boolean}) {
  const [copied, setCopied] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCopied(false);
    if (selected) selectLink(input.current);
  }, [value, selected]);

  const copy = async () => {
    const worked = await copyLink(input.current);
    setCopied(worked);
    setBlocked(!worked);
  };

  return (
    <div className="share-row">
      <span className="share-row-label">{label}</span>
      <input ref={input} type="text" className="share-link-input" readOnly aria-label={`Short link: ${label}`} value={value}/>
      <button className="btn" title={blocked ? "Copying was blocked. Select the link and copy it yourself." : undefined}
        onClick={() => void copy()}>{copied ? "Copied ✓" : blocked ? "Select it" : "Copy"}</button>
    </div>
  );
}

// Whether the component is still on the page, for work that finishes after it may have gone.
function useMounted(): RefObject<boolean> {
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return mounted;
}
