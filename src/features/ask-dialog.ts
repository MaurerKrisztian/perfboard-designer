import {Utils} from "../utils/utils";

// The editor's own text and yes/no questions (#askDialog), in place of the browser's prompt() and
// confirm(): those look out of place, are awkward on a phone, and some pages that embed the editor
// block them (prompt() then returns null at once). One question at a time; asking another while
// one is open cancels the first. Imports nothing from the editor, so any module can ask.

const overlay = Utils.getSafeHtmlElement("askDialog");
const form = Utils.getSafeHtmlElement<HTMLFormElement>("askForm");
const titleEl = Utils.getSafeHtmlElement("askTitle");
const messageEl = Utils.getSafeHtmlElement("askMessage");
const input = Utils.getSafeHtmlElement<HTMLInputElement>("askInput");
const chips = Utils.getSafeHtmlElement("askChips");
const errorEl = Utils.getSafeHtmlElement("askError");
const okBtn = Utils.getSafeHtmlElement<HTMLButtonElement>("askOkBtn");

export interface AskTextOptions {
  title: string;
  message?: string;
  value?: string;
  placeholder?: string;
  okLabel?: string;
  // One-tap answers shown under the box.
  suggestions?: string[];
  // Says what's wrong with an answer, which keeps the dialog open; undefined accepts it.
  check?: (text: string) => string | undefined;
}

let finish: ((answer: string | null) => void) | undefined;
let check: AskTextOptions["check"];

function open(options: AskTextOptions & {textInput: boolean; danger?: boolean}): Promise<string | null> {
  finish?.(null);
  titleEl.textContent = options.title;
  messageEl.textContent = options.message ?? "";
  messageEl.hidden = !options.message;
  input.hidden = !options.textInput;
  input.value = options.value ?? "";
  input.placeholder = options.placeholder ?? "";
  errorEl.textContent = "";
  okBtn.textContent = options.okLabel ?? "OK";
  okBtn.className = options.danger ? "btn-danger" : "btn-primary";
  check = options.check;
  chips.replaceChildren(...(options.suggestions ?? []).map(text => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "ask-chip";
    chip.textContent = text;
    chip.addEventListener("click", () => {
      input.value = text;
      submit();
    });
    return chip;
  }));
  chips.hidden = !options.suggestions?.length;
  overlay.style.display = "flex";
  // After the event that asked, or the key that did would be typed into the box.
  setTimeout(() => {
    if (options.textInput) {
      input.focus();
      input.select();
    } else {
      okBtn.focus();
    }
  });
  return new Promise(resolve => {
    finish = (answer) => {
      finish = undefined;
      overlay.style.display = "none";
      resolve(answer);
    };
  });
}

function submit() {
  const problem = check?.(input.value);
  if (problem) {
    errorEl.textContent = problem;
    input.focus();
    return;
  }
  finish?.(input.value);
}

// Resolves with the text entered, or null if cancelled.
export function askText(options: AskTextOptions): Promise<string | null> {
  return open({...options, textInput: true});
}

// Resolves with whether the user agreed. `danger` paints the button red, for something that can't
// be undone.
export async function askConfirm(title: string, message: string, okLabel = "Continue", danger = false): Promise<boolean> {
  return (await open({title, message, okLabel, danger, textInput: false})) !== null;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submit();
});
for (const id of ["askCancelBtn", "askCloseBtn"]) {
  Utils.getSafeHtmlElement(id).addEventListener("click", () => finish?.(null));
}
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) finish?.(null);
});
overlay.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    e.stopPropagation();
    finish?.(null);
  }
});
