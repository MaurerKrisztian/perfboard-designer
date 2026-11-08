import {KeyboardEvent, useState} from "react";
import {selectPartByRef} from "../../features/part-polarity";
import {setDescription} from "../../features/project-description";
import {getSaveJson} from "../../features/project/save-project";
import {descriptionHtml, MAX_DESCRIPTION_LENGTH} from "../../project-file/description";
import {partMentions} from "../../project-file/part-mentions";
import {DescriptionState} from "../../state/DescriptionState";
import {ProjectState} from "../../state/ProjectState";
import {Modal} from "../components/Modal";
import {SegmentedControl} from "../components/SegmentedControl";
import {closeDialog} from "./dialog-store";

// The project's description: what the board is and how it works, saved with it and carried by its
// share links. It opens on the text when there is some, as someone who was sent the board wants to
// read it, and on the box to write in when there's none.
//
// However it's closed, what was typed is kept (one undoable step, setDescription): a stray click
// beside the dialog mustn't lose a write-up, and Undo takes back a change that wasn't wanted.
//
// A part's name in the text selects it on the board and closes the dialog, so it's in sight, as a
// click in the component list does.

type Mode = "read" | "write";

const MODES: {value: Mode; label: string}[] = [{value: "read", label: "Read"}, {value: "write", label: "Write"}];

export function DescriptionDialog({onClose}: {onClose: () => void}) {
  const [draft, setDraft] = useState(() => DescriptionState.current ?? "");
  const [mode, setMode] = useState<Mode>(() => DescriptionState.current ? "read" : "write");
  // The board can't change while the dialog is open.
  const [findMention] = useState(() => partMentions(getSaveJson()));

  const close = () => {
    setDescription(draft);
    onClose();
  };

  const mentionedRef = (target: EventTarget) => target instanceof Element ? target.closest<HTMLElement>(".part-ref")?.dataset.ref : undefined;

  // Straight to the board, wherever the dialog was opened from.
  const findOnBoard = (ref: string) => {
    setDescription(draft);
    closeDialog();
    selectPartByRef(ref);
  };

  // They're buttons to the keyboard too; a link in the text keeps its own keys.
  const onTextKey = (e: KeyboardEvent) => {
    const ref = mentionedRef(e.target);
    if (!ref || (e.key !== "Enter" && e.key !== " ")) return;
    e.preventDefault();
    findOnBoard(ref);
  };

  return (
    <Modal title={ProjectState.current?.name ? `Description: ${ProjectState.current.name}` : "Description"} className="description-card" onClose={close}>
      <div className="modal-body">
        <SegmentedControl id="descriptionMode" options={MODES} value={mode} onChange={setMode}/>
        {mode === "write" ? (
          <>
            <textarea className="description-input" rows={12} autoFocus maxLength={MAX_DESCRIPTION_LENGTH} aria-label="Description"
              placeholder="What is this board, and how does it work? What should someone building it know?"
              value={draft} onChange={e => setDraft(e.target.value)}/>
            <p className="share-note">
              Saved with the board and sent with its share links. You can use <code># Heading</code>, <code>- list</code>, <code>**bold**</code>,{" "}
              <code>*italic*</code>, <code>`code`</code> and <code>[a link](https://…)</code>. A part's name, like <code>R1</code> or{" "}
              <code>U1.8</code>, finds it on the board.
            </p>
          </>
        ) : draft.trim() ? (
          // descriptionHtml escapes everything in the text, which may be from anyone's share link.
          <div className="description-text" onKeyDown={onTextKey} onClick={e => {
            const ref = mentionedRef(e.target);
            if (ref) findOnBoard(ref);
          }} dangerouslySetInnerHTML={{__html: descriptionHtml(draft, findMention)}}/>
        ) : (
          <p className="share-note">Nothing here yet. Switch to Write to say what this board is and how it works.</p>
        )}
      </div>
      <div className="modal-footer">
        <button className="btn-primary" onClick={close}>Done</button>
      </div>
    </Modal>
  );
}
