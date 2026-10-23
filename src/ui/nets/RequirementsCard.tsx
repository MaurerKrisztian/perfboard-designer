import {useMemo} from "react";
import type {ProjectFile} from "../../project-file/project-file";
import type {Net} from "../../project-file/nets";
import {RequiredPin, requirementPinName, RequirementValidation, validateRequirements} from "../../project-file/requirements";
import "./requirements-card.css";

// How the board's actual connections compare with the project's requirements (the connections it
// should have): a summary that unfolds to each mismatch and the pins not yet specified. Each one
// lights up its pins and the board nets they're on.

const MAX_ISSUES = 100;
const MAX_UNSPECIFIED = 30;

function summary(result: RequirementValidation): string {
  if (result.status === "disabled") return "Requirements · validation off";
  if (result.status === "match") return `Requirements match · ${result.checked}/${result.total} pins`;
  if (result.status === "mismatch") return `Requirements · ${result.issues.length} mismatch${result.issues.length === 1 ? "" : "es"}`;
  return result.total ? `Requirements incomplete · ${result.unspecified.length} unspecified pins` : "Requirements empty · add components";
}

interface RequirementsCardProps {
  project: ProjectFile;
  nets: Net[];
  onInspect: (pins: RequiredPin[]) => void;
}

export function RequirementsCard({project, nets, onInspect}: RequirementsCardProps) {
  const result = useMemo(() => validateRequirements(project, nets), [project, nets]);
  const inspect = (text: string, pins: RequiredPin[], key: string) => (
    <button key={key} type="button" title="Highlight the involved terminals and actual board nets" onClick={() => onInspect(pins)}>{text}</button>
  );
  const unspecified = result.unspecified.slice(0, MAX_UNSPECIFIED).map(pin => requirementPinName(project, pin)).join(", ");
  return (
    <details className="requirements-validation" data-status={result.status}>
      <summary>{summary(result)}</summary>
      <div className="requirements-validation-body">
        <p>
          {result.status === "disabled"
            ? "Checking is turned off for these requirements, so intended and actual connections are not compared."
            : `${result.checked}/${result.total} board pins specified. This compares connectivity, not circuit operation. Unspecified pins are unchecked, not assumed disconnected.`}
        </p>
        {result.issues.slice(0, MAX_ISSUES).map((issue, i) => inspect(issue.message, issue.pins, `issue-${i}`))}
        {result.issues.length > MAX_ISSUES && <p>{result.issues.length - MAX_ISSUES} more mismatches. Resolve these and recheck.</p>}
        {result.unspecified.length > 0 && inspect(
          `Unspecified: ${unspecified}${result.unspecified.length > MAX_UNSPECIFIED ? "…" : ""}`, result.unspecified, "unspecified")}
      </div>
    </details>
  );
}
