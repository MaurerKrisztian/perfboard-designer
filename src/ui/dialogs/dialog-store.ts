import {createStore} from "../lib/store";
import type {Ic} from "../../features/ic";
import type {CustomPartSpec} from "../../parts/custom-parts";

// Which of the editor's dialogs is open: one at a time (the editor's questions, AskDialog, can show
// over any of them). Dialogs.tsx shows it.

export type CustomIcType = "ic" | "module";

export type OpenDialog =
  | {kind: "projects"; startNew: boolean}
  | {kind: "share"}
  | {kind: "part-list"}
  // A new chip of `type`, or a custom one being edited.
  | {kind: "ic-editor"; type: CustomIcType; editing?: Ic}
  // A new custom module, or one being edited.
  | {kind: "custom-module"; editing?: CustomPartSpec};

export const dialogStore = createStore<{open?: OpenDialog}>({});

export function openDialog(dialog: OpenDialog) {
  dialogStore.set({open: dialog});
}

export function closeDialog() {
  dialogStore.set({open: undefined});
}
