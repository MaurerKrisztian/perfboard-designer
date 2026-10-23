import {useEffect, useRef, useState} from "react";
import {answerQuestion, openQuestion, Question} from "../../features/ask-dialog";
import {useEditor} from "../hooks/use-editor";
import {Modal} from "../components/Modal";

// The editor's questions (src/features/ask-dialog.ts): a text to type, with one-tap suggestions and
// a check that keeps the dialog open until the answer reads, or a yes or no.
export function AskDialog() {
  const question = useEditor(openQuestion);
  return question ? <QuestionCard key={question.id} question={question}/> : null;
}

function QuestionCard({question}: {question: Question}) {
  const {title, message, textInput, placeholder, suggestions, check, okLabel, danger} = question;
  const [text, setText] = useState(question.value ?? "");
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const ok = useRef<HTMLButtonElement>(null);

  // After the event that asked, or the key that did would be typed into the box.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (textInput) input.current?.select();
      else ok.current?.focus();
    });
    return () => clearTimeout(timer);
  }, [textInput]);

  const submit = (answer: string) => {
    const problem = check?.(answer);
    if (problem) {
      setError(problem);
      input.current?.focus();
      return;
    }
    answerQuestion(answer);
  };
  const cancel = () => answerQuestion(null);

  return (
    <Modal title={title} onClose={cancel} className="ask-card" onSubmit={() => submit(text)}>
      <div className="modal-body">
        {message && <p className="ask-message">{message}</p>}
        {textInput && (
          <input ref={input} type="text" className="ask-input" autoComplete="off" spellCheck={false} aria-label={title}
            value={text} placeholder={placeholder} onChange={e => setText(e.target.value)}/>
        )}
        {suggestions && suggestions.length > 0 && (
          <div className="ask-chips">
            {suggestions.map(suggestion => (
              <button key={suggestion} type="button" className="ask-chip" onClick={() => {
                setText(suggestion);
                submit(suggestion);
              }}>{suggestion}</button>
            ))}
          </div>
        )}
        <p className="ask-error" aria-live="polite">{error}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn" onClick={cancel}>Cancel</button>
        <button type="submit" ref={ok} className={danger ? "btn-danger" : "btn-primary"}>{okLabel ?? "OK"}</button>
      </div>
    </Modal>
  );
}
