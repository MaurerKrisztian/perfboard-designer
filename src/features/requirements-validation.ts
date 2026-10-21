import type { ProjectFile } from "../project-file/project-file";
import type { Net } from "../project-file/nets";
import {
  RequiredPin,
  requirementPinName,
  validateRequirements,
} from "../project-file/requirements";
import "./requirements-validation.css";

export function requirementValidationCard(
  project: ProjectFile,
  inspect: (pins: RequiredPin[]) => void,
  actual?: Net[]
): HTMLElement {
  const result = validateRequirements(project, actual);
  const details = document.createElement("details");
  details.className = "requirements-validation";
  details.dataset.status = result.status;
  const summary = document.createElement("summary");
  summary.textContent =
    result.status === "disabled"
      ? "Requirements · validation off"
      : result.status === "match"
      ? `Requirements match · ${result.checked}/${result.total} pins`
      : result.status === "mismatch"
      ? `Requirements · ${result.issues.length} mismatch${
          result.issues.length === 1 ? "" : "es"
        }`
      : result.total
      ? `Requirements incomplete · ${result.unspecified.length} unspecified pins`
      : "Requirements empty · add components";
  const body = document.createElement("div");
  body.className = "requirements-validation-body";
  const explanation = document.createElement("p");
  explanation.textContent =
    result.status === "disabled"
      ? "Checking is turned off for these requirements, so intended and actual connections are not compared."
      : `${result.checked}/${result.total} board pins specified. This compares connectivity, not circuit operation. Unspecified pins are unchecked, not assumed disconnected.`;
  body.append(explanation);
  const button = (text: string, pins: RequiredPin[]) => {
    const control = document.createElement("button");
    control.type = "button";
    control.textContent = text;
    control.title = "Highlight the involved terminals and actual board nets";
    control.onclick = () => inspect(pins);
    body.append(control);
  };
  for (const issue of result.issues.slice(0, 100))
    button(issue.message, issue.pins);
  if (result.issues.length > 100) {
    const more = document.createElement("p");
    more.textContent = `${
      result.issues.length - 100
    } more mismatches. Resolve these and recheck.`;
    body.append(more);
  }
  if (result.unspecified.length)
    button(
      `Unspecified: ${result.unspecified
        .slice(0, 30)
        .map((pin) => requirementPinName(project, pin))
        .join(", ")}${result.unspecified.length > 30 ? "…" : ""}`,
      result.unspecified
    );
  details.append(summary, body);
  return details;
}
