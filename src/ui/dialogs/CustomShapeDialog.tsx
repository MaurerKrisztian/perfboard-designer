import {useEffect, useMemo, useRef, useState} from "react";
import type {AdvancedComponentDefinition} from "../../parts/advanced-component-definitions";
import {CATALOG_CATEGORIES, getCategoryPath} from "../../parts/catalog-categories";
import {CUSTOM_PART_ID, CUSTOM_PART_SHAPES, customPartShape, CustomPartSpec, shapedPartSpec} from "../../parts/custom-parts";
import {CustomParts} from "../../features/custom-parts";
import {drawCustomPartPreview} from "../../features/custom-part-preview";
import {setActiveTool} from "../../features/active-tool";
import {Modal} from "../components/Modal";

// A custom part in a built-in part's package: a transistor missing from the catalog is a TO-92 (or
// a TO-220) with its own name, ref letters and pin names. Saving a new one arms it for placing;
// saving an edit changes the catalog entry only, never parts already placed.

const DEFAULT_SHAPE = "transistor";

// Transistor pinouts differ from part to part, so the common ones are a click away.
const TRANSISTOR_PINOUTS = [["E", "B", "C"], ["C", "B", "E"], ["B", "C", "E"], ["E", "C", "B"], ["G", "D", "S"], ["S", "G", "D"]];

// The packages, under the catalog categories they're listed in, in catalog order.
function shapeGroups(): {label: string; shapes: AdvancedComponentDefinition[]}[] {
  return CATALOG_CATEGORIES
    .map(category => ({
      label: getCategoryPath(category.id).map(c => c.name).join(" › "),
      shapes: CUSTOM_PART_SHAPES.filter(shape => shape.category === category.id),
    }))
    .filter(group => group.shapes.length);
}

// A package's own pin names, a blank for each pin it numbers.
function shapeLabels(shape: AdvancedComponentDefinition): string[] {
  return shape.pinOffsets.map((_, i) => shape.pinLabels?.[i] ?? "");
}

export function CustomShapeDialog({editing, onBack, onClose}: {editing?: CustomPartSpec; onBack?: () => void; onClose: () => void}) {
  const groups = useMemo(shapeGroups, []);
  const [shapeId, setShapeId] = useState(() => customPartShape(editing?.shape)?.id ?? DEFAULT_SHAPE);
  const shape = customPartShape(shapeId) ?? CUSTOM_PART_SHAPES[0];
  const [name, setName] = useState(editing?.name ?? "");
  const [refPrefix, setRefPrefix] = useState(editing?.refPrefix ?? shape.refPrefix);
  const [labels, setLabels] = useState(() => editing
    ? shape.pinOffsets.map((_, i) => editing.pins[i]?.label ?? "")
    : shapeLabels(shape));
  const [error, setError] = useState("");
  const nameInput = useRef<HTMLInputElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  const preview = useRef<HTMLCanvasElement>(null);

  useEffect(() => nameInput.current?.focus(), []);

  // The part as it is now, for the preview and for saving.
  const spec = useMemo(
    () => shapedPartSpec(shape, {name: name.trim() || shape.name, refPrefix: refPrefix.trim().toUpperCase(), labels}),
    [shape, name, refPrefix, labels],
  );
  useEffect(() => {
    if (preview.current) drawCustomPartPreview(preview.current, spec);
  }, [spec]);

  // Another package: the names typed so far stay when it has as many pins, else it starts from its
  // own; the ref letters follow it unless they were changed.
  const changeShape = (id: string) => {
    const next = customPartShape(id);
    if (!next) return;
    setShapeId(next.id);
    if (next.pinOffsets.length !== labels.length) setLabels(shapeLabels(next));
    if (refPrefix.trim().toUpperCase() === shape.refPrefix) setRefPrefix(next.refPrefix);
    setError("");
  };
  const renamePin = (index: number, label: string) => setLabels(current => current.map((l, i) => i === index ? label : l));

  const save = () => {
    const prefix = refPrefix.trim().toUpperCase();
    if (!/^[A-Z]{1,4}$/.test(prefix)) {
      setError("Ref letters are 1 to 4 letters, such as Q or U.");
      refInput.current?.focus();
      return;
    }
    onClose();
    if (editing?.id) {
      CustomParts.update(editing.id, spec);
      return;
    }
    // Ready to place straight away.
    const part = CustomParts.add(spec);
    setActiveTool({kind: "advanced-component", definitionId: CUSTOM_PART_ID, rotation: 0, custom: part});
  };

  const isTransistor = shape.category === "semiconductors.transistors" && shape.pinOffsets.length === 3;

  return (
    <Modal title={editing ? "Edit Part in a Package" : "New Part in a Package"} className="custom-part-card" onClose={onClose} onSubmit={save}>
      <div className="modal-body">
        <p className="share-note">A part that isn&apos;t in the catalog but comes in the same package as one that is: a BC337 is a
          TO-92 transistor with its own pinout. It&apos;s drawn and modelled in 3D as that package.</p>
        <div className="form-group">
          <label htmlFor="customShapePackage">Package</label>
          <select id="customShapePackage" value={shape.id} onChange={e => changeShape(e.target.value)}>
            {groups.map(group => (
              <optgroup key={group.label} label={group.label}>
                {group.shapes.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="customShapeName">Name</label>
            <input ref={nameInput} type="text" id="customShapeName" maxLength={60} placeholder="e.g. BC337, 2N3906, IRLZ44N"
              value={name} onChange={e => setName(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="customShapeRef">Ref letters ({shape.refPrefix} makes {shape.refPrefix}1, {shape.refPrefix}2…)</label>
            <input ref={refInput} type="text" id="customShapeRef" maxLength={4} autoComplete="off" spellCheck={false}
              value={refPrefix} onChange={e => {
                setRefPrefix(e.target.value);
                setError("");
              }}/>
          </div>
        </div>
        <div className="form-group">
          <span className="form-label">Pin names</span>
          <p className="share-note">In pin order, as the board below shows them: pin 1 (blue) is the hole you place it by. A pin
            left blank is shown by its number.</p>
          {isTransistor && (
            <div className="custom-part-fill" aria-label="Common pinouts">
              {TRANSISTOR_PINOUTS.map(pinout => (
                <button key={pinout.join("")} type="button" className="btn" onClick={() => setLabels([...pinout])}>{pinout.join(" ")}</button>
              ))}
            </div>
          )}
          <div className="custom-part-pins">
            {labels.map((label, i) => (
              <label key={i}>
                <span className="pin-num">{i + 1}</span>
                <input type="text" maxLength={24} placeholder={`Pin ${i + 1}`} value={label} onChange={e => renamePin(i, e.target.value)}/>
              </label>
            ))}
          </div>
        </div>
        <div className="custom-shape-preview">
          <canvas ref={preview} role="img" aria-label={`${spec.name} on the board`}/>
        </div>
        <p className="ask-error" aria-live="polite">{error}</p>
      </div>

      <div className="modal-footer">
        {onBack && <button type="button" className="btn btn-quiet modal-back" onClick={onBack}>Back</button>}
        <button type="button" className="btn" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-primary">Save Part</button>
      </div>
    </Modal>
  );
}
