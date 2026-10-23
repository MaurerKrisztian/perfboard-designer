import {useEffect, useRef} from "react";
import {dipIconSvg, moduleIconSvg} from "../../board-render";
import {customPartIconSvg} from "../../features/custom-parts";
import {getAdvancedIconPath} from "../../parts/advanced-component-definitions";
import {CUSTOM_PART_SHAPES, customPartShape} from "../../parts/custom-parts";
import {Modal} from "../components/Modal";
import {OpenDialog, openDialog} from "./dialog-store";

// The parts list's one way in to making a part of your own: pick what kind of part it is, and its
// editor opens (with a way back here).

function svgDataUri(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// A module's picture: a small blue board with a row of pins along its bottom.
const MODULE_PICTURE = customPartIconSvg({
  name: "", cols: 5, rows: 3, color: "#1d4ed8", pins: [{at: [1, 2]}, {at: [2, 2]}, {at: [3, 2]}],
});
const TRANSISTOR = customPartShape("transistor") ?? CUSTOM_PART_SHAPES[0];

const KINDS: {key: string; name: string; text: string; picture: string; open: OpenDialog}[] = [
  {
    key: "ic", name: "IC chip",
    text: "A DIP chip: two rows of pins, named from pin 1 at the notch, like an LM358 or ATtiny85.",
    picture: svgDataUri(dipIconSvg()),
    open: {kind: "ic-editor", type: "ic", fromChooser: true},
  },
  {
    key: "dev-board", name: "Dev board",
    text: "A board with two rows of pins, like an ESP32, Arduino Nano or Pi Pico.",
    picture: svgDataUri(moduleIconSvg()),
    open: {kind: "ic-editor", type: "module", fromChooser: true},
  },
  {
    key: "module", name: "Module, pins anywhere",
    text: "A sensor breakout, a relay board, a display or a connector with an odd layout: click its pins.",
    picture: svgDataUri(MODULE_PICTURE),
    open: {kind: "custom-module", fromChooser: true},
  },
  {
    key: "package", name: "Transistor or other package",
    text: "A part in a package the library has, with its own name and pinout: a BC337 is a TO-92.",
    picture: getAdvancedIconPath(TRANSISTOR),
    open: {kind: "custom-shape", fromChooser: true},
  },
];

export function CustomPartDialog({onClose}: {onClose: () => void}) {
  const first = useRef<HTMLButtonElement>(null);
  useEffect(() => first.current?.focus(), []);

  return (
    <Modal title="New Custom Part" className="custom-kind-card" onClose={onClose}>
      <div className="modal-body">
        <p className="share-note">What kind of part is it?</p>
        <ul className="custom-kind-grid">
          {KINDS.map((kind, i) => (
            <li key={kind.key}>
              <button ref={i === 0 ? first : undefined} type="button" className="custom-kind" onClick={() => openDialog(kind.open)}>
                <span className="custom-kind-picture"><img src={kind.picture} alt=""/></span>
                <span className="custom-kind-name">{kind.name}</span>
                <span className="custom-kind-text">{kind.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn" onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
}
