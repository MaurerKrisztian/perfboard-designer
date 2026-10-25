import {useMemo, useState} from "react";
import type {ProjectFile} from "../../project-file/project-file";
import type {Net} from "../../project-file/nets";
import {RequiredPin, requiredNetReports, RequiredNetReport, validateRequirements} from "../../project-file/requirements";
import {litRequiredPins, toggleRequiredPins} from "../../features/board-nets";
import {
  cancelRequiredNet, deleteRequiredNet, forgetRequiredPart, pickRequiredNet, removeRequirements, requireCurrentWiring,
  saveRequiredNet, setRequirementsChecking,
} from "../../features/required-nets";
import {ToolState} from "../../state/ToolState";
import {Icon} from "../components/Icon";
import {useEditor} from "../hooks/use-editor";
import {usePhoneLayout} from "../hooks/use-media-query";
import {setSheet} from "../layout/layout-store";
import {useStore} from "../lib/store";
import {cx} from "../lib/class-names";
import {boardPinFor, NetsView, netsViewStore} from "./part-info";
import {PinList} from "./PinList";
import "./requirements-card.css";

// Required connections: the nets the circuit should have (the project's requirements), an optional
// list at the top of the Nets panel. Folded away until wanted; a net is added by clicking its pins
// on the board (the required-net tool), or the board's wiring is copied in as it is. Each net is
// ticked once the board joins its pins, and what doesn't match (wires joining nets that should be
// apart, parts gone from the board) is listed above them. Clicking a net or a problem lights its
// pins' board nets up.

const MAX_PROBLEMS = 50;

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

// The tool's state while a net's pins are being picked.
const picking = () => ToolState.active.kind === "required-net" ? ToolState.active : undefined;

interface RequirementsCardProps {
  project: ProjectFile;
  nets: Net[];
}

export function RequirementsCard({project, nets}: RequirementsCardProps) {
  const tool = useEditor(picking);
  const phone = usePhoneLayout();
  // Unset: folded while there's no list, open once there is one (or a first net is being picked).
  const [open, setOpen] = useState<boolean>();
  const requirements = project.requirements;
  const shownOpen = open ?? (!!requirements || !!tool);

  // On a phone the Nets sheet covers the board: put it away so the pins can be tapped.
  const startPicking = (netId?: string) => {
    pickRequiredNet(netId);
    if (phone) setSheet(undefined);
  };

  return (
    <details className="reqs" open={shownOpen} onToggle={e => {
      const now = e.currentTarget.open;
      if (now !== shownOpen) setOpen(now);
    }}>
      <summary>
        <span className="reqs-title">Required connections</span>
        {requirements ? <RequirementsStatus project={project} nets={nets}/> : <span className="reqs-tag">Optional</span>}
      </summary>
      <div className="reqs-body">
        {requirements
          ? <RequiredNets project={project} nets={nets} tool={tool} startPicking={startPicking}/>
          : <NoRequirements project={project} nets={nets} tool={tool} startPicking={startPicking}/>}
      </div>
    </details>
  );
}

function NoRequirements({project, nets, tool, startPicking}: {project: ProjectFile; nets: Net[]; tool?: Picking; startPicking: (netId?: string) => void}) {
  const wired = nets.some(net => net.pins.length > 1);
  return (
    <>
      <p className="reqs-intro">
        List which pins your circuit should join, from a schematic or a plan. Each net is ticked off
        once it's wired, and wrong connections show up here.
      </p>
      {tool ? <PickingNet tool={tool} project={project}/> : (
        <div className="reqs-actions">
          <button className="btn-accent" onClick={() => startPicking()}><Icon name="plus"/>Add a net</button>
          <button disabled={!wired} title={wired ? "Require every net the board has now" : "Nothing on the board is wired yet"}
            onClick={requireCurrentWiring}>Use current wiring</button>
        </div>
      )}
    </>
  );
}

type Picking = Exclude<ReturnType<typeof picking>, undefined>;

function useChecks(project: ProjectFile, nets: Net[]) {
  const reports = useMemo(() => requiredNetReports(project, nets), [project, nets]);
  const result = useMemo(() => validateRequirements(project, nets), [project, nets]);
  // A missing connection is the net row without its tick; the rest are problems of their own.
  const problems = result.issues.filter(issue => issue.kind !== "missing-connection");
  return {reports, result, problems, wired: reports.filter(report => report.wired).length};
}

function RequirementsStatus({project, nets}: RequirementsCardProps) {
  const {reports, result, problems, wired} = useChecks(project, nets);
  if (result.status === "disabled") return <span className="reqs-status">Checking off</span>;
  if (problems.length) return <span className="reqs-status is-bad">{plural(problems.length, "problem")}</span>;
  if (!reports.length) return <span className="reqs-status">No nets yet</span>;
  if (wired === reports.length) return <span className="reqs-status is-good"><Icon name="check"/>All {reports.length} wired</span>;
  return <span className="reqs-status is-open">{wired}/{reports.length} wired</span>;
}

interface RequiredNetsProps extends RequirementsCardProps {
  tool?: Picking;
  startPicking: (netId?: string) => void;
}

function RequiredNets({project, nets, tool, startPicking}: RequiredNetsProps) {
  const {reports, result, problems} = useChecks(project, nets);
  const lit = useEditor(litRequiredPins);
  const view = useStore(netsViewStore, state => state.view);
  const checking = project.requirements?.validate ?? false;
  const unlisted = result.unspecified.length;
  return (
    <>
      {!checking && (
        <div className="reqs-note">
          Checking is off, so nets aren't ticked off and nothing is compared.
          <button className="reqs-link" onClick={() => setRequirementsChecking(true)}>Turn it on</button>
        </div>
      )}
      {problems.slice(0, MAX_PROBLEMS).map((issue, i) => (
        <div key={`${issue.kind}-${i}`} className="reqs-problem">
          <button className="reqs-problem-text" title="Show it on the board" onClick={() => toggleRequiredPins(issue.pins)}>
            {issue.message}
          </button>
          {issue.kind === "missing-component" && issue.pins[0] && (
            <button className="reqs-link" title="Stop requiring this part and its pins" onClick={() => forgetRequiredPart(issue.pins[0].componentId)}>
              Forget it
            </button>
          )}
        </div>
      ))}
      {problems.length > MAX_PROBLEMS && <p className="reqs-muted">{problems.length - MAX_PROBLEMS} more problems.</p>}
      {reports.length > 0 && (
        <ul className="reqs-nets">
          {reports.map((report, i) => tool?.netId === report.id
            ? <li key={report.id}><PickingNet tool={tool} project={project}/></li>
            : <RequiredNetRow key={report.id} report={report} index={i} checking={checking} lit={lit} busy={!!tool}
              project={project} view={view} onEdit={() => startPicking(report.id)}/>)}
        </ul>
      )}
      {tool && !tool.netId && <PickingNet tool={tool} project={project}/>}
      {!tool && (
        <div className="reqs-actions">
          <button onClick={() => startPicking()}><Icon name="plus"/>Add a net</button>
          <button className="reqs-link reqs-remove" onClick={() => void removeRequirements()}>Remove list</button>
        </div>
      )}
      {checking && unlisted > 0 && reports.length > 0 && (
        <p className="reqs-muted">{plural(unlisted, "pin")} on the board {unlisted === 1 ? "isn't" : "aren't"} in any net here, so {unlisted === 1 ? "it isn't" : "they aren't"} checked.</p>
      )}
    </>
  );
}

const pinsKey = (pins: RequiredPin[]) => pins.map(pin => `${pin.componentId}:${pin.pin}`).sort().join(" ");

interface RequiredNetRowProps {
  report: RequiredNetReport;
  index: number;
  checking: boolean;
  lit?: string;
  // Another net's pins are being picked: no editing this one meanwhile.
  busy: boolean;
  project: ProjectFile;
  view: NetsView;
  onEdit: () => void;
}

function RequiredNetRow({report, index, checking, lit, busy, project, view, onEdit}: RequiredNetRowProps) {
  const pins = report.pins.map(item => item.pin);
  const isLit = lit === pinsKey(pins);
  return (
    <li className={cx("reqs-net", checking && report.wired && "is-wired", isLit && "is-lit")}>
      <button className="reqs-net-main" title={isLit ? "Stop showing it on the board" : "Show it on the board"}
        aria-pressed={isLit} onClick={() => toggleRequiredPins(pins)}>
        <span className="reqs-net-head">
          {checking && (report.wired
            ? <Icon name="check" className="icon reqs-mark"/>
            : <span className="reqs-mark reqs-mark-open" aria-hidden="true"/>)}
          <span className="reqs-net-name">{report.name ?? `Net ${index + 1}`}</span>
          {checking && <span className="reqs-net-state">{report.wired ? "Wired" : report.pins.every(pin => pin.onBoard) ? "To wire" : "Part missing"}</span>}
        </span>
        <PinList project={project} view={view} items={report.pins.map(item => ({
          key: `${item.pin.componentId}:${item.pin.pin}`, pin: boardPinFor(project, item.pin), name: item.name,
        }))}/>
      </button>
      <span className="reqs-net-actions">
        <button title="Change its pins" aria-label="Change its pins" disabled={busy} onClick={onEdit}><Icon name="pencil"/></button>
        <button title="Delete this net" aria-label="Delete this net" disabled={busy} onClick={() => deleteRequiredNet(report.id)}><Icon name="trash"/></button>
      </span>
    </li>
  );
}

// The net whose pins are being picked on the board, with Save and Cancel.
function PickingNet({tool, project}: {tool: Picking; project: ProjectFile}) {
  const count = tool.picked.length;
  const deletes = !!tool.netId && count < 2;
  return (
    <div className="reqs-picking">
      <div className="reqs-picking-head">
        <strong>{tool.netId ? "Editing net" : "New net"}</strong>
        <span>Click its pins on the board</span>
      </div>
      {count
        ? <PinList project={project} view="short" items={tool.picked.map(pin => ({
          key: `${pin.componentId}:${pin.pin}`, pin: boardPinFor(project, pin), name: pin.name,
        }))}/>
        : <span className="reqs-muted">No pins picked yet.</span>}
      <div className="reqs-actions">
        <button className="btn-accent" disabled={!tool.netId && count < 2} title={!tool.netId && count < 2 ? "Pick at least two pins" : "Save the net (Enter)"}
          onClick={saveRequiredNet}>{deletes ? "Delete net" : "Save net"}</button>
        <button title="Cancel (Esc)" onClick={cancelRequiredNet}>Cancel</button>
      </div>
    </div>
  );
}
