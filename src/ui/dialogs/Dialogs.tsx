import {useStore} from "../lib/store";
import {closeDialog, dialogStore} from "./dialog-store";
import {AskDialog} from "./AskDialog";
import {ProjectsDialog} from "./ProjectsDialog";
import {ShareDialog} from "./ShareDialog";
import {PartListDialog} from "./PartListDialog";
import {IcEditorDialog} from "./IcEditorDialog";
import {CustomModuleDialog} from "./CustomModuleDialog";

// The open dialog (dialog-store.ts), and over it any question the editor asks.
export function Dialogs() {
  const open = useStore(dialogStore, state => state.open);
  return (
    <>
      {open?.kind === "projects" && <ProjectsDialog startNew={open.startNew} onClose={closeDialog}/>}
      {open?.kind === "share" && <ShareDialog onClose={closeDialog}/>}
      {open?.kind === "part-list" && <PartListDialog onClose={closeDialog}/>}
      {open?.kind === "ic-editor" && <IcEditorDialog type={open.type} editing={open.editing} onClose={closeDialog}/>}
      {open?.kind === "custom-module" && <CustomModuleDialog editing={open.editing} onClose={closeDialog}/>}
      <AskDialog/>
    </>
  );
}
