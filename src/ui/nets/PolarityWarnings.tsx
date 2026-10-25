import {useState} from "react";
import type {PolarityWarning} from "../../project-file/polarity";
import type {ProjectFile} from "../../project-file/project-file";
import {selectPartByRef, turnPartRoundByRef} from "../../features/part-polarity";
import {layoutStore, setSheet} from "../layout/layout-store";
import {Icon} from "../components/Icon";
import {PartIcon} from "./PinList";
import {partInfo} from "./part-info";

// Polarized parts the supply rails show to be the wrong way round (src/project-file/polarity.ts):
// an LED, an electrolytic capacitor or + and − pins backwards, or a diode straight across the
// supply. Open from the start, unlike the panel's other folds: a part in backwards may not work,
// or burn. A click on one selects it on the board; a two-lead part turns round from here too.

const sentence = (clause: string) => `${clause.charAt(0).toUpperCase()}${clause.slice(1)}.`;

export function PolarityWarnings({warnings, project}: {warnings: PolarityWarning[]; project: ProjectFile}) {
  const [open, setOpen] = useState(true);
  if (!warnings.length) return null;
  const parts = partInfo(project);
  const show = (ref: string) => {
    // On a phone the panel is a sheet over the board: put it away so the part is in sight.
    if (layoutStore.get().sheet === "nets") setSheet(undefined);
    selectPartByRef(ref);
  };
  return (
    <details className="nets-fold polarity-fold" open={open} onToggle={e => setOpen(e.currentTarget.open)}>
      <summary>{warnings.length === 1 ? "1 part looks backwards" : `${warnings.length} parts look backwards`}</summary>
      <ul className="polarity-list">
        {warnings.map(warning => (
          <li key={warning.ref} className="polarity-item">
            <button type="button" className="polarity-show" title={`${warning.message} Click to select it on the board.`}
              onClick={() => show(warning.ref)}>
              <PartIcon part={parts.get(warning.ref)}/>
              <span className="polarity-text">
                <span className="polarity-part"><strong>{warning.ref}</strong> {warning.part}</span>
                <span className="polarity-detail">{sentence(warning.detail)}{warning.consequence ? ` ${warning.consequence}` : ""}</span>
              </span>
            </button>
            {warning.kind === "standard-component" && (
              <button type="button" className="polarity-fix" title="Turn it round end to end: its leads swap holes"
                onClick={() => turnPartRoundByRef(warning.ref)}>
                <Icon name="turn-round"/>Turn round
              </button>
            )}
          </li>
        ))}
      </ul>
    </details>
  );
}
