import {RefObject, useEffect, useRef, useState} from "react";
import {ProjectState} from "../../state/ProjectState";
import {makeShareFragment, makeStoredShareFragment} from "../../project-file/share-link";
import {getSaveJson} from "../../features/project/save-project";
import {SHORT_LINKS, storeProject} from "../../features/project/project-storage";
import {Modal} from "../components/Modal";
import {cx} from "../lib/class-names";

// The Share dialog: a link that carries the board as it is now, in the link itself, and on request
// a short link to a copy stored on Perfboard Designer's project storage. The full link always
// works, without the storage. Opening links is in src/features/project/open-shared-link.ts.

// Some chat apps and mail clients cut links off past a few thousand characters.
const LONG_LINK = 8000;

interface Note {
  text: string;
  warning?: boolean;
}

// The editor's address with a share link's fragment; never the fragment it was opened with.
const editorLink = (fragment: string) => `${location.origin}${location.pathname}#${fragment}`;

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
  const [link, setLink] = useState("");
  const [info, setInfo] = useState<Note>({text: "Making the link..."});
  const [copied, setCopied] = useState(false);
  const linkInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let current = true;
    makeShareFragment(getSaveJson(), ProjectState.current?.name).then(fragment => {
      if (!current) return;
      const made = editorLink(fragment);
      const size = `${made.length.toLocaleString()} characters.`;
      setLink(made);
      setInfo(made.length > LONG_LINK
        ? {text: `${size} That's long enough that some chat apps and mail clients may cut it off. If it doesn't open for them, send the project file instead (File → Save Project to File).`, warning: true}
        : {text: `${size} The board is in the link itself; it isn't uploaded anywhere.`});
    }, (err: unknown) => {
      console.error(err);
      if (current) setInfo({text: "This browser can't make share links. Use File → Save Project to File instead."});
    });
    return () => {
      current = false;
    };
  }, []);

  useEffect(() => {
    if (link) selectLink(linkInput.current);
  }, [link]);

  const copy = async () => {
    if (await copyLink(linkInput.current)) setCopied(true);
    else setInfo({text: "Copying was blocked. Select the link and copy it yourself."});
  };

  return (
    <Modal title="Share Link" className="share-card" onClose={onClose}>
      <div className="modal-body">
        <p className="share-note">Anyone who opens this link gets their own copy of the board as it is now. Changes you make later aren't in it: share a new link for those.</p>
        <input ref={linkInput} type="text" className="share-link-input" readOnly aria-label="Share link" value={link}/>
        <NoteText note={info}/>
        {SHORT_LINKS && <ShortLink/>}
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

// Stores a copy of the board for a short link, under the name typed (or the project's).
function ShortLink() {
  const [name, setName] = useState(ProjectState.current?.name ?? "");
  const [link, setLink] = useState("");
  const [info, setInfo] = useState<Note>({text: ""});
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const linkInput = useRef<HTMLInputElement>(null);
  // A dialog closed meanwhile mustn't get the link.
  const mounted = useMounted();

  useEffect(() => {
    if (link) selectLink(linkInput.current);
  }, [link]);

  const make = async () => {
    const projectName = ProjectState.current?.name;
    const wanted = name.trim();
    setBusy(true);
    setInfo({text: "Storing a copy of the board..."});
    try {
      const id = await storeProject(getSaveJson(), {...(wanted ? {id: wanted} : {}), ...(projectName ? {name: projectName} : {})});
      if (!mounted.current) return;
      setLink(editorLink(makeStoredShareFragment(id, projectName)));
      setCopied(false);
      setInfo({text: `Stored as "${id}". The stored copy never changes: after changing the board, make a new link.`});
    } catch (err) {
      console.error(err);
      if (!mounted.current) return;
      setInfo({text: `Couldn't make a short link: ${err instanceof Error ? err.message : String(err)} The full link above works without it.`, warning: true});
    } finally {
      if (mounted.current) setBusy(false);
    }
  };

  const copy = async () => {
    if (await copyLink(linkInput.current)) setCopied(true);
    else setInfo({text: "Copying was blocked. Select the link and copy it yourself."});
  };

  return (
    <div className="share-short">
      <p className="share-note"><strong>Short link:</strong> stores a copy of the board on Perfboard Designer's server, so the link can be short. Anyone with the link can open it; it's deleted after a year unopened.</p>
      <div className="share-row">
        <input type="text" maxLength={40} placeholder="Name for the link, e.g. led-blinker" aria-label="Name for the short link"
          value={name} onChange={e => setName(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !busy) void make();
          }}/>
        <button className="btn" disabled={busy} onClick={() => void make()}>Make Short Link</button>
      </div>
      {link && (
        <div className="share-row">
          <input ref={linkInput} type="text" className="share-link-input" readOnly aria-label="Short link" value={link}/>
          <button className="btn" onClick={() => void copy()}>{copied ? "Copied ✓" : "Copy"}</button>
        </div>
      )}
      <NoteText note={info}/>
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
