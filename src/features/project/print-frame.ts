// Printing a page the editor makes (the true-size board, the component list) through the browser's
// own print dialog, where "Save as PDF" makes a PDF of it. The page prints from a hidden frame, so
// the editor's own page stays as it is; the frame goes once the dialog closes. Its <title> is the
// name the dialog suggests for a PDF.

export const escapeHtml = (text: string) => text.replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);

export function printInFrame(html: string) {
  const frame = document.createElement("iframe");
  frame.setAttribute("aria-hidden", "true");
  frame.style.cssText = "position: fixed; right: 0; bottom: 0; width: 0; height: 0; border: 0; visibility: hidden;";
  frame.addEventListener("load", () => {
    const win = frame.contentWindow;
    if (!win) return frame.remove();
    win.addEventListener("afterprint", () => frame.remove(), {once: true});
    win.focus();
    win.print();
  }, {once: true});
  frame.srcdoc = html;
  document.body.appendChild(frame);
}
