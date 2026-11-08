import {BoardPicture, Side} from "./board-picture";

// Two buttons choosing which side of the board the picture shows: the parts' side, or the solder
// side as it's held to solder. Every switch on the page follows the picture. Returns the switch and
// what stops it following, for one that goes away.

const SIDES: {side: Side; label: string; title: string}[] = [
  {side: "top", label: "Top", title: "The board from above, with its parts"},
  {side: "bottom", label: "Solder side", title: "The board from below, as you'll hold it to solder, every joint marked"},
];

export function sideSwitch(picture: BoardPicture): {element: HTMLElement; stop: () => void} {
  const element = document.createElement("div");
  element.className = "view-switch";
  element.setAttribute("role", "group");
  element.setAttribute("aria-label", "Side of the board");
  const buttons = SIDES.map(({side, label, title}) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.title = title;
    button.addEventListener("click", () => picture.setSide(side));
    return button;
  });
  const follow = () => buttons.forEach((button, i) => button.setAttribute("aria-pressed", String(SIDES[i].side === picture.side)));
  follow();
  element.append(...buttons);
  return {element, stop: picture.onSideChange(follow)};
}
