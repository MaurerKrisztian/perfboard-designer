import {useState} from "react";
import {Ic, saveCustomIc} from "../../features/ic";
import {CategoryId} from "../../parts/catalog-categories";
import {Modal} from "../components/Modal";
import {CustomIcType} from "./dialog-store";

// The custom IC editor: a dual-row chip or dev board with labelled pins, listed under ICs or
// Modules › Custom. Saving an edit changes the catalog entry only; chips already placed keep theirs.

// Which Custom subcategory of the Components panel a new part is listed under.
const CUSTOM_CATEGORY: Record<CustomIcType, CategoryId> = {
  ic: "ics.custom",
  module: "modules.custom",
};

// Smallest usable IC: 2 columns so the body has width, 2 pins per side.
const IC_DIM_MIN = 2;

function readDimension(text: string): number {
  const parsed = parseInt(text, 10);
  return Math.max(IC_DIM_MIN, Number.isNaN(parsed) ? 4 : parsed);
}

interface IcEditorDialogProps {
  type: CustomIcType;
  // The catalog entry being edited; undefined when making a new one.
  editing?: Ic;
  // Back to the custom part chooser, when it was opened from there.
  onBack?: () => void;
  onClose: () => void;
}

export function IcEditorDialog({type: initialType, editing, onBack, onClose}: IcEditorDialogProps) {
  const [name, setName] = useState(editing?.name ?? "Custom Chip");
  const [type, setType] = useState<CustomIcType>(initialType);
  const [width, setWidth] = useState(String(editing?.widthPin ?? 4));
  const [height, setHeight] = useState(String(editing?.heightPin ?? 4));
  // Labels typed are kept when the pin count changes.
  const [labels, setLabels] = useState<Record<number, string>>(() => ({...editing?.pinDescription}));

  const pinsPerSide = readDimension(height);
  const totalPins = pinsPerSide * 2;

  const save = () => {
    const pinDescription: Record<number, string> = {};
    for (let pin = 1; pin <= totalPins; pin++) {
      const label = labels[pin]?.trim();
      if (label) pinDescription[pin] = label;
    }
    saveCustomIc({
      name: name.trim() || "Custom IC",
      widthPin: readDimension(width),
      heightPin: pinsPerSide,
      pinDescription,
      category: CUSTOM_CATEGORY[type],
    }, editing);
    onClose();
  };

  return (
    <Modal title={editing ? "Edit Custom IC / Component" : "Create Custom IC / Component"} onClose={onClose}>
      <div className="modal-body">
        <div className="form-group">
          <label>Component Name:</label>
          <input type="text" placeholder="e.g. ESP8266-01, LM358, Custom Chip" value={name} onChange={e => setName(e.target.value)}/>
        </div>

        <div className="form-group">
          <label>Type (where it's listed in Components):</label>
          <select value={type} onChange={e => setType(e.target.value === "module" ? "module" : "ic")}>
            <option value="ic">IC</option>
            <option value="module">Module</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Body Width (columns, incl. both pin rows):</label>
            <input type="number" min={IC_DIM_MIN} value={width} onChange={e => setWidth(e.target.value)}
              onBlur={() => setWidth(String(readDimension(width)))}/>
          </div>
          <div className="form-group">
            <label>Pins Per Side:</label>
            <input type="number" min={IC_DIM_MIN} value={height} onChange={e => setHeight(e.target.value)}
              onBlur={() => setHeight(String(readDimension(height)))}/>
          </div>
        </div>

        <div className="form-group">
          <label>Pin Labels (Total: <span>{totalPins}</span> pins, pin 1 at the notch):</label>
          <PinLabels pinsPerSide={pinsPerSide} labels={labels} onChange={(pin, label) => setLabels(all => ({...all, [pin]: label}))}/>
        </div>
      </div>

      <div className="modal-footer">
        {onBack && <button type="button" className="btn btn-quiet modal-back" onClick={onBack}>Back</button>}
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn-primary" onClick={save}>Save Component</button>
      </div>
    </Modal>
  );
}

// The pin label boxes laid out like the chip on the board (DIP order): pins 1..n run down the left
// side, n+1..2n back up the right. The boxes stay in pin order, so Tab follows the pins.
function PinLabels({pinsPerSide, labels, onChange}: {pinsPerSide: number; labels: Record<number, string>; onChange: (pin: number, label: string) => void}) {
  const pins = Array.from({length: pinsPerSide * 2}, (_, i) => i + 1);
  return (
    <div className="pin-grid">
      <div className="pin-grid-body" style={{gridRow: `1 / span ${pinsPerSide}`}}/>
      {pins.map(pin => {
        const left = pin <= pinsPerSide;
        return (
          <div key={pin} className={`pin-input-item ${left ? "pin-left" : "pin-right"}`} style={{gridRow: left ? pin : pinsPerSide * 2 - pin + 1}}>
            <span className="pin-num">{pin}</span>
            <input type="text" placeholder={`Pin ${pin}`} value={labels[pin] ?? ""} onChange={e => onChange(pin, e.target.value)}/>
          </div>
        );
      })}
    </div>
  );
}
