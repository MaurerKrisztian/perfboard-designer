import {useEffect, useRef, useState} from "react";
import {partPinNames, setPartPinNames} from "../../features/part-pin-names";
import {PlacedAdvancedComponent} from "../../features/advanced-components/placed-advanced-component";
import {MAX_PIN_NAME_LENGTH} from "../../parts/pin-names";
import {Modal} from "../components/Modal";

// Renaming one placed fixed-pin part's pins: a JST connector whose pins carry +5V and GND, a
// header whose pins are RS and EN. Only this part is renamed; the catalog entry it was placed
// from, and every other copy of it on the board, keep the names they had.

export function PinNamesDialog({part, onClose}: {part: PlacedAdvancedComponent; onClose: () => void}) {
  const def = part.getDefinition();
  // One box per pin, in pin order; the pin's own name or the definition's, as it reads now.
  const [names, setNames] = useState(() => partPinNames(part) ?? []);
  const firstInput = useRef<HTMLInputElement>(null);

  useEffect(() => firstInput.current?.focus(), []);

  const save = () => {
    onClose();
    setPartPinNames(part, names);
  };

  if (!def) return null;
  // A pin block's tiles carry no numbers and no pin 1 mark: its pins are numbered row by row.
  const order = def.gridSizable ? "row by row from its top-left pin" : "pin 1 is the one marked blue on the board";
  const blank = def.gridSizable ? "a pin left blank has no name" : "a pin left blank is shown by its number";

  return (
    <Modal title={`${part.ref} Pin Names`} className="custom-part-card" onClose={onClose} onSubmit={save}>
      <div className="modal-body">
        <p className="share-note">
          Names for {part.ref}&apos;s pins, in pin order ({order}): a connector&apos;s +5V and GND, say. They show
          on the board and in the nets. Only this part is renamed, not others of the same kind; {blank}.
        </p>
        <div className="custom-part-pins">
          {names.map((name, i) => (
            <label key={i}>
              <span className="pin-num">{i + 1}</span>
              <input ref={i === 0 ? firstInput : undefined} type="text" maxLength={MAX_PIN_NAME_LENGTH} placeholder={`Pin ${i + 1}`}
                value={name} onChange={e => setNames(current => current.map((value, index) => index === i ? e.target.value : value))}/>
            </label>
          ))}
        </div>
      </div>

      <div className="modal-footer">
        <button type="button" className="btn" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-primary">Save Names</button>
      </div>
    </Modal>
  );
}
