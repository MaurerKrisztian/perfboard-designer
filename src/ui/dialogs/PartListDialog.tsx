import {KeyboardEvent, useState} from "react";
import {PartState} from "../../state/PartState";
import {SelectionState} from "../../state/SelectionState";
import {ProjectState} from "../../state/ProjectState";
import {holeName} from "../../project-file/grid";
import {groupedPartListCsv, groupPartList, partList, partListCsv, TYPE_SEPARATOR} from "../../project-file/part-list";
import {redrawCanvas} from "../../features/draw-canvas";
import {downloadFileName, getSaveJson} from "../../features/project/save-project";
import {Modal} from "../components/Modal";
import {SegmentedControl} from "../components/SegmentedControl";
import {useTouchScreen} from "../hooks/use-media-query";

// File → Component List: every part on the board in a table (src/project-file/part-list.ts works
// it out from the save snapshot), each part on its own or grouped by part and value for buying
// them, and the table shown downloaded as a CSV. A click on a part selects it on the board.

type View = "each" | "grouped";

const VIEWS: {value: View; label: string}[] = [
  {value: "each", label: "Each part"},
  {value: "grouped", label: "Grouped by value"},
];

// The table as shown, as a CSV file named after the project. A UTF-8 byte order mark first, so
// spreadsheet apps read "Ω" and "µ" correctly.
function downloadCsv(text: string, view: View) {
  const url = URL.createObjectURL(new Blob(["\uFEFF", text], {type: "text/csv;charset=utf-8"}));
  const link = document.createElement("a");
  const name = ProjectState.current?.name?.trim() || "perfboard-project";
  link.download = downloadFileName("csv", `${name} ${view === "each" ? "components" : "parts to buy"}`);
  link.href = url;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export function PartListDialog({onClose}: {onClose: () => void}) {
  const [rows] = useState(() => partList(getSaveJson()));
  const [view, setView] = useState<View>("each");
  const touch = useTouchScreen();
  const groups = groupPartList(rows);

  // Selects the part on the board and closes the list, so it's in sight.
  const findOnBoard = (ref: string) => {
    const part = PartState.parts.find(p => p.ref === ref);
    if (!part) return;
    SelectionState.current = {kind: "part", part};
    onClose();
    redrawCanvas();
  };
  const onRowKey = (e: KeyboardEvent, ref: string) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    findOnBoard(ref);
  };

  const hint = !rows.length ? ""
    : view === "each" ? `${touch ? "Tap" : "Click"} a part to find it on the board.`
    : `${groups.length} different part${groups.length === 1 ? "" : "s"}, for a shopping list.`;
  const muted = (value?: string) => value ? undefined : "part-list-muted";

  return (
    <Modal title={<>Component List <span className="projects-count">{rows.length || ""}</span></>} titleClassName="projects-title"
      className="part-list-card" onClose={onClose}>
      <div className="modal-body">
        <SegmentedControl id="partListViewSwitch" options={VIEWS} value={view} onChange={setView}/>
        <div className="part-list-scroll">
          {rows.length > 0 && (
            <table className="part-list-table">
              {view === "each" ? (
                <>
                  <thead><tr><th>Ref</th><th>Part</th><th>Value</th><th>Type</th><th className="part-list-number">Pins</th><th>Position</th></tr></thead>
                  <tbody>
                    {rows.map(row => (
                      <tr key={row.ref} className="is-clickable" tabIndex={0} title={`Show ${row.ref} on the board`}
                        onClick={() => findOnBoard(row.ref)} onKeyDown={e => onRowKey(e, row.ref)}>
                        <td className="part-list-ref">{row.ref}</td>
                        <td>{row.part}</td>
                        <td className={muted(row.value)}>{row.value ?? "—"}</td>
                        <td className="part-list-muted">{row.type.join(TYPE_SEPARATOR)}</td>
                        <td className="part-list-number">{row.pins}</td>
                        <td className="part-list-ref">{holeName(row.at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <>
                  <thead><tr><th className="part-list-number">Qty</th><th>Part</th><th>Value</th><th>Type</th><th>Refs</th></tr></thead>
                  <tbody>
                    {groups.map(group => (
                      <tr key={group.refs.join()}>
                        <td className="part-list-number">{group.refs.length}</td>
                        <td>{group.part}</td>
                        <td className={muted(group.value)}>{group.value ?? "—"}</td>
                        <td className="part-list-muted">{group.type.join(TYPE_SEPARATOR)}</td>
                        <td className="part-list-ref">{group.refs.join(", ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          )}
        </div>
        {!rows.length && <p className="share-note">There are no parts on the board yet. Add some from Components and they show up here.</p>}
      </div>
      <div className="modal-footer projects-footer">
        <span className="projects-footer-hint">{hint}</span>
        <button className="btn-primary" disabled={!rows.length}
          onClick={() => downloadCsv(view === "each" ? partListCsv(rows) : groupedPartListCsv(groups), view)}>Download CSV</button>
      </div>
    </Modal>
  );
}
