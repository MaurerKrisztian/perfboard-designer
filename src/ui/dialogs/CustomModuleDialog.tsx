import {useEffect, useRef, useState} from "react";
import {CUSTOM_PART_ID, CUSTOM_REF_PREFIX, CustomPartPin, CustomPartSpec, MAX_CUSTOM_PART_SIDE} from "../../parts/custom-parts";
import {CustomParts} from "../../features/custom-parts";
import {setActiveTool} from "../../features/active-tool";
import {Modal} from "../components/Modal";
import {NumberField} from "../components/NumberField";
import {cx} from "../lib/class-names";

// The custom module creator: a part with pins anywhere, made by clicking the holes of its board.
// Saving a new one arms it for placing; saving an edit changes the catalog entry only, never parts
// already placed.

const COLORS = [
  {name: "Blue", value: "#1d4ed8"},
  {name: "Green", value: "#15803d"},
  {name: "Red", value: "#b91c1c"},
  {name: "Purple", value: "#6d28d9"},
  {name: "Black", value: "#1f2937"},
];

type Edge = "top" | "bottom" | "left" | "right";

const FILLS: {edge: Edge | "clear"; label: string}[] = [
  {edge: "top", label: "Top row"},
  {edge: "bottom", label: "Bottom row"},
  {edge: "left", label: "Left column"},
  {edge: "right", label: "Right column"},
  {edge: "clear", label: "Clear"},
];

// The holes along one edge, in reading order.
function edgeHoles(edge: Edge, cols: number, rows: number): [number, number][] {
  if (edge === "top" || edge === "bottom") return Array.from({length: cols}, (_, col) => [col, edge === "top" ? 0 : rows - 1]);
  return Array.from({length: rows}, (_, row) => [edge === "left" ? 0 : cols - 1, row]);
}

// A new module starts as the usual breakout: a row of pins along its bottom edge.
function startingPins(spec: CustomPartSpec | undefined, cols: number, rows: number): CustomPartPin[] {
  if (spec) return spec.pins.map(pin => ({at: [pin.at[0], pin.at[1]], ...(pin.label ? {label: pin.label} : {})}));
  return Array.from({length: Math.max(0, cols - 2)}, (_, i) => ({at: [i + 1, rows - 1]}));
}

export function CustomModuleDialog({editing, onBack, onClose}: {editing?: CustomPartSpec; onBack?: () => void; onClose: () => void}) {
  const [name, setName] = useState(editing?.name ?? "");
  const [refPrefix, setRefPrefix] = useState(editing?.refPrefix ?? CUSTOM_REF_PREFIX);
  const [cols, setCols] = useState(editing?.cols ?? 6);
  const [rows, setRows] = useState(editing?.rows ?? 3);
  const [color, setColor] = useState(editing?.color ?? COLORS[0].value);
  // In order: pin 1 first.
  const [pins, setPins] = useState(() => startingPins(editing, cols, rows));
  const [error, setError] = useState("");
  const nameInput = useRef<HTMLInputElement>(null);
  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => nameInput.current?.focus(), []);

  const pinAt = (col: number, row: number) => pins.findIndex(pin => pin.at[0] === col && pin.at[1] === row);

  const changePins = (next: CustomPartPin[]) => {
    setPins(next);
    setError("");
  };
  const togglePin = (col: number, row: number) => {
    const index = pinAt(col, row);
    changePins(index > -1 ? pins.filter((_, i) => i !== index) : [...pins, {at: [col, row]}]);
  };
  // Adds a pin on every hole of one edge that hasn't one.
  const fill = (edge: Edge | "clear") => {
    if (edge === "clear") return changePins([]);
    const added = edgeHoles(edge, cols, rows).filter(([col, row]) => pinAt(col, row) < 0).map(at => ({at}));
    changePins([...pins, ...added]);
  };
  // Pins that no longer fit go.
  const resize = (nextCols: number, nextRows: number) => {
    setCols(nextCols);
    setRows(nextRows);
    setPins(current => current.filter(pin => pin.at[0] < nextCols && pin.at[1] < nextRows));
  };
  const renamePin = (index: number, label: string) => setPins(current => current.map((pin, i) => i === index ? {...pin, label} : pin));

  const save = () => {
    const prefix = refPrefix.trim().toUpperCase();
    if (!/^[A-Z]{1,4}$/.test(prefix)) {
      setError("Ref letters are 1 to 4 letters, such as M or MOD.");
      refInput.current?.focus();
      return;
    }
    if (!pins.length) {
      setError("Add at least one pin: click a hole on the board above.");
      return;
    }
    const spec: CustomPartSpec = {
      name: name.trim() || "Custom Module",
      refPrefix: prefix,
      cols, rows, color,
      pins: pins.map(pin => ({at: pin.at, ...(pin.label?.trim() ? {label: pin.label.trim()} : {})})),
    };
    onClose();
    if (editing?.id) {
      CustomParts.update(editing.id, spec);
      return;
    }
    // Ready to place straight away.
    const part = CustomParts.add(spec);
    setActiveTool({kind: "advanced-component", definitionId: CUSTOM_PART_ID, rotation: 0, custom: part});
  };

  // A hole's tooltip: its pin's number and name, or how to add one.
  const holeTitle = (index: number) => {
    if (index < 0) return "Click to add a pin here";
    const label = pins[index].label;
    return `Pin ${index + 1}${label ? ` (${label})` : ""}: click to remove`;
  };

  return (
    <Modal title={editing ? "Edit Custom Module" : "New Custom Module"} className="custom-part-card" onClose={onClose}>
      <div className="modal-body">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="customPartName">Name</label>
            <input ref={nameInput} type="text" id="customPartName" maxLength={60} placeholder='e.g. HC-SR04, OLED 0.96", Relay module'
              value={name} onChange={e => setName(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="customPartRef">Ref letters (M makes M1, M2…)</label>
            <input ref={refInput} type="text" id="customPartRef" maxLength={4} autoComplete="off" spellCheck={false}
              value={refPrefix} onChange={e => setRefPrefix(e.target.value)}/>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="customPartCols">Width (holes)</label>
            <NumberField id="customPartCols" min={1} max={MAX_CUSTOM_PART_SIDE} value={cols} onCommit={c => resize(c, rows)}/>
          </div>
          <div className="form-group">
            <label htmlFor="customPartRows">Height (holes)</label>
            <NumberField id="customPartRows" min={1} max={MAX_CUSTOM_PART_SIDE} value={rows} onCommit={r => resize(cols, r)}/>
          </div>
        </div>
        <div className="form-group">
          <span className="form-label">Board colour</span>
          <div className="custom-part-colors" role="radiogroup" aria-label="Board colour">
            {COLORS.map(choice => (
              <button key={choice.value} type="button" className="custom-part-color" style={{background: choice.value}} title={choice.name}
                role="radio" aria-label={choice.name} aria-checked={choice.value === color} onClick={() => setColor(choice.value)}/>
            ))}
          </div>
        </div>
        <div className="form-group">
          <span className="form-label">Pins <span className="projects-count">{pins.length || ""}</span></span>
          <p className="share-note">Click holes to add or remove pins, in order: pin 1 is the hole you place the module by.</p>
          <div className="custom-part-fill">
            {FILLS.map(({edge, label}) => <button key={edge} type="button" className="btn" onClick={() => fill(edge)}>{label}</button>)}
          </div>
          <div className="custom-part-grid-scroll">
            <div className="custom-part-grid" style={{gridTemplateColumns: `repeat(${cols}, 30px)`, background: color}}>
              {Array.from({length: rows}, (_, row) => Array.from({length: cols}, (_, col) => {
                const index = pinAt(col, row);
                return (
                  <button key={`${col},${row}`} type="button" title={holeTitle(index)} onClick={() => togglePin(col, row)}
                    className={cx("custom-part-hole", index > -1 && "is-pin", index === 0 && "is-first")}>
                    {index > -1 ? index + 1 : ""}
                  </button>
                );
              }))}
            </div>
          </div>
        </div>
        <div className="form-group">
          <span className="form-label">Pin names (optional)</span>
          <div className="custom-part-pins">
            {pins.map((pin, i) => (
              <label key={`${pin.at[0]},${pin.at[1]}`}>
                <span className="pin-num">{i + 1}</span>
                <input type="text" maxLength={24} placeholder={`Pin ${i + 1}`} value={pin.label ?? ""} onChange={e => renamePin(i, e.target.value)}/>
              </label>
            ))}
          </div>
        </div>
        <p className="ask-error" aria-live="polite">{error}</p>
      </div>

      <div className="modal-footer">
        {onBack && <button type="button" className="btn btn-quiet modal-back" onClick={onBack}>Back</button>}
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn-primary" onClick={save}>Save Module</button>
      </div>
    </Modal>
  );
}
