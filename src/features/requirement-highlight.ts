import type { RequiredPin } from "../project-file/requirements";
import { requiredPinKey } from "../project-file/requirements";
import type { ProjectFile } from "../project-file/project-file";
import { computeNets } from "../project-file/nets";
import { NetHighlightState } from "../state/NetHighlightState";

export function highlightRequirements(
  project: ProjectFile,
  pins: RequiredPin[],
  nets = computeNets(project).nets
) {
  const ids = new Map(
    [
      ...project.placedIcs,
      ...project.placedStandardComponents,
      ...project.placedAdvancedComponents,
    ].map((part) => [part.ref, part.instanceId ?? part.ref])
  );
  const wanted = new Set(pins.map(requiredPinKey));
  const involved = nets.filter((net) =>
    net.pins.some((pin) =>
      wanted.has(
        requiredPinKey({
          componentId: ids.get(pin.ref) as string,
          pin: pin.pin,
        })
      )
    )
  );
  NetHighlightState.current = {
    requirements: pins,
    pins: involved.flatMap((net) =>
      net.pins.map((pin) => `${pin.ref}.${pin.pin}`)
    ),
    holes: involved.flatMap((net) => net.holes),
    wires: [...new Set(involved.flatMap((net) => net.wires))].map(
      (index) => project.wires[index]
    ),
  };
}
