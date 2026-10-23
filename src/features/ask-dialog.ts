import {notifyEditorChanged} from "./editor-events";

// The editor's own text and yes/no questions, in place of the browser's prompt() and confirm():
// those look out of place, are awkward on a phone, and some pages that embed the editor block them
// (prompt() then returns null at once). Any module can ask; the React UI shows the question
// (src/ui/dialogs/AskDialog.tsx) and answers it. One question at a time: asking another while one
// is open cancels the first.

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

export interface Question extends AskTextOptions {
  // Tells one question from the next.
  id: number;
  // A text box to answer in, or only OK and Cancel.
  textInput: boolean;
  // Paints OK red, for something that can't be undone.
  danger?: boolean;
}

let open: {question: Question; finish: (answer: string | null) => void} | undefined;
let questionsAsked = 0;

function ask(options: Omit<Question, "id">): Promise<string | null> {
  open?.finish(null);
  const question = {...options, id: ++questionsAsked};
  return new Promise(resolve => {
    const entry = {
      question,
      finish: (answer: string | null) => {
        if (open === entry) open = undefined;
        resolve(answer);
        notifyEditorChanged();
      },
    };
    open = entry;
    notifyEditorChanged();
  });
}

// The question waiting for an answer, if any.
export function openQuestion(): Question | undefined {
  return open?.question;
}

// Answers the open question: the text typed (or "" for a yes), or null to cancel.
export function answerQuestion(answer: string | null) {
  open?.finish(answer);
}

// Resolves with the text entered, or null if cancelled.
export function askText(options: AskTextOptions): Promise<string | null> {
  return ask({...options, textInput: true});
}

// Resolves with whether the user agreed. `danger` paints the button red, for something that can't
// be undone.
export async function askConfirm(title: string, message: string, okLabel = "Continue", danger = false): Promise<boolean> {
  return (await ask({title, message, okLabel, danger, textInput: false})) !== null;
}
