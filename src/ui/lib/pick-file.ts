// Asks the user for a file with the browser's file picker. Resolves with it, or undefined if they
// cancel. The input is made for the occasion and taken off the page again.
export function pickFile(accept?: string): Promise<File | undefined> {
  return new Promise(resolve => {
    const input = document.createElement("input");
    input.type = "file";
    if (accept) input.accept = accept;
    input.style.display = "none";
    const done = (file: File | undefined) => {
      input.remove();
      resolve(file);
    };
    input.addEventListener("change", () => done(input.files?.[0]));
    input.addEventListener("cancel", () => done(undefined));
    document.body.append(input);
    input.click();
  });
}
