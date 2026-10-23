import {useStore} from "../lib/store";
import {closeDialog, dialogStore, openDialog} from "./dialog-store";
import {AskDialog} from "./AskDialog";
import {ProjectsDialog} from "./ProjectsDialog";
import {ShareDialog} from "./ShareDialog";
import {PartListDialog} from "./PartListDialog";
import {IcEditorDialog} from "./IcEditorDialog";
import {CustomModuleDialog} from "./CustomModuleDialog";
import {CustomShapeDialog} from "./CustomShapeDialog";
import {CustomPartDialog} from "./CustomPartDialog";

// The open dialog (dialog-store.ts), and over it any question the editor asks.
export function Dialogs() {
  const open = useStore(dialogStore, state => state.open);
  // An editor picked in the custom part chooser goes back to it.
  const back = open && "fromChooser" in open && open.fromChooser ? () => openDialog({kind: "custom-part"}) : undefined;
  return (
    <>
      {open?.kind === "projects" && <ProjectsDialog startNew={open.startNew} onClose={closeDialog}/>}
      {open?.kind === "share" && <ShareDialog onClose={closeDialog}/>}
      {open?.kind === "part-list" && <PartListDialog onClose={closeDialog}/>}
      {open?.kind === "custom-part" && <CustomPartDialog onClose={closeDialog}/>}
      {open?.kind === "ic-editor" && <IcEditorDialog type={open.type} editing={open.editing} onBack={back} onClose={closeDialog}/>}
      {open?.kind === "custom-module" && <CustomModuleDialog editing={open.editing} onBack={back} onClose={closeDialog}/>}
      {open?.kind === "custom-shape" && <CustomShapeDialog editing={open.editing} onBack={back} onClose={closeDialog}/>}
      <AskDialog/>
    </>
  );
}
