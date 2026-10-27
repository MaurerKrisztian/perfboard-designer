import {createStore} from "../lib/store";
import type {Ic} from "../../features/ic";
import type {CustomPartSpec} from "../../parts/custom-parts";
import type {TourChapterId} from "./TourDialog";

// Which of the editor's dialogs is open: one at a time (the editor's questions, AskDialog, can show
// over any of them). Dialogs.tsx shows it.

export type CustomIcType = "ic" | "module";

export type OpenDialog =
  | {kind: "projects"; startNew: boolean}
  | {kind: "share"}
  | {kind: "part-list"}
  | {kind: "export-pdf"}
  // The tour (TourDialog.tsx), open at a chapter.
  | {kind: "tour"; chapter: TourChapterId}
  // The parts list's one way to make a part of your own: pick what kind, then its editor below.
  | {kind: "custom-part"}
  // A new chip of `type`, or a custom one being edited. `fromChooser`: opened from custom-part,
  // so it offers a way back there.
  | {kind: "ic-editor"; type: CustomIcType; editing?: Ic; fromChooser?: boolean}
  // A new custom module, or one being edited.
  | {kind: "custom-module"; editing?: CustomPartSpec; fromChooser?: boolean}
  // A new custom part in a built-in part's package (a transistor's, say), or one being edited.
  | {kind: "custom-shape"; editing?: CustomPartSpec; fromChooser?: boolean};

export const dialogStore = createStore<{open?: OpenDialog}>({});

export function openDialog(dialog: OpenDialog) {
  dialogStore.set({open: dialog});
}

export function closeDialog() {
  dialogStore.set({open: undefined});
}
