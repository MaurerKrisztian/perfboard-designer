import {ReactNode, useEffect, useId, useRef} from "react";

// A dialog over the editor: a dimmed backdrop, a card with a title and a close button, and whatever
// body and footer the dialog brings. A click on the backdrop closes it, and so does Escape, which
// goes to the topmost dialog only (`onEscape` may step back within it first). A field that handles
// Escape itself stops it before it gets here.
//
// While a dialog is open, the keyboard is the dialog's: no key reaches the board's shortcuts, which
// listen on the window, behind it. Otherwise Delete would delete the selected part from inside a
// dialog, and the board's Enter would cancel Enter on the dialog's focused button.

// What Escape does in each open dialog, the topmost last.
const openDialogs: {current: () => void}[] = [];

function onKeyDown(e: KeyboardEvent) {
  if (!openDialogs.length) return;
  e.stopPropagation();
  if (e.key !== "Escape") return;
  e.preventDefault();
  openDialogs[openDialogs.length - 1].current();
}

interface ModalProps {
  title: ReactNode;
  onClose: () => void;
  // What Escape does; closing, unless the dialog has a step to go back first.
  onEscape?: () => void;
  // Added to the card's class ("projects-card"…), which sizes it.
  className?: string;
  titleClassName?: string;
  // The card is a form: its OK button submits it.
  onSubmit?: () => void;
  children: ReactNode;
}

export function Modal({title, onClose, onEscape: escape, className = "", titleClassName = "", onSubmit, children}: ModalProps) {
  const titleId = useId();
  const handler = useRef(escape ?? onClose);
  handler.current = escape ?? onClose;

  useEffect(() => {
    openDialogs.push(handler);
    if (openDialogs.length === 1) document.addEventListener("keydown", onKeyDown);
    return () => {
      openDialogs.splice(openDialogs.indexOf(handler), 1);
      if (!openDialogs.length) document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const header = (
    <div className="modal-header">
      <span id={titleId} className={`modal-title ${titleClassName}`.trim()}>{title}</span>
      <button type="button" className="close-btn" aria-label="Close" onClick={onClose}>&times;</button>
    </div>
  );
  const cardClass = `modal-card ${className}`.trim();

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      {onSubmit ? (
        <form className={cardClass} role="dialog" aria-modal="true" aria-labelledby={titleId}
          onSubmit={e => {
            e.preventDefault();
            onSubmit();
          }}>
          {header}
          {children}
        </form>
      ) : (
        <div className={cardClass} role="dialog" aria-modal="true" aria-labelledby={titleId}>
          {header}
          {children}
        </div>
      )}
    </div>
  );
}
