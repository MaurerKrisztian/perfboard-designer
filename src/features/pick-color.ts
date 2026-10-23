// The browser's own colour picker, for a one-off choice (the selected wire's colour): a hidden
// colour input, made once and kept on the page, opened at `initial`. `onPick` hears every colour
// tried while it's open.
let input: HTMLInputElement | undefined;

export function pickColor(initial: string, onPick: (color: string) => void) {
  if (!input) {
    input = document.createElement("input");
    input.type = "color";
    input.setAttribute("aria-hidden", "true");
    input.tabIndex = -1;
    input.style.cssText = "position:fixed; left:0; top:0; width:1px; height:1px; opacity:0; pointer-events:none;";
    document.body.append(input);
  }
  const picker = input;
  picker.value = initial;
  picker.oninput = picker.onchange = () => onPick(picker.value);
  picker.click();
}
