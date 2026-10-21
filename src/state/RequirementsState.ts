import type { CircuitRequirements } from "../project-file/requirements";

// The open project's optional circuit requirements (intended nets), saved with the board.
export class RequirementsState {
  static current?: CircuitRequirements;
}
