import type { ProjectFile } from "./project-file";
import { partPins } from "./pin-positions";
import { boardPins, computeNets, Net, NetPin, netName, pinId, pinName } from "./nets";

export interface RequiredPin {
  componentId: string;
  pin: number;
}

export interface RequiredComponent {
  id: string;
  ref: string;
  name: string;
  pins: { pin: number; label?: string }[];
}

export interface RequiredNet {
  id: string;
  pins: RequiredPin[];
}

export interface CircuitRequirements {
  validate: boolean;
  components: RequiredComponent[];
  nets: RequiredNet[];
  unused: RequiredPin[];
}

export interface RequirementIssue {
  kind:
    | "missing-component"
    | "missing-pin"
    | "missing-connection"
    | "unexpected-connection";
  message: string;
  pins: RequiredPin[];
}

export interface RequirementValidation {
  status: "disabled" | "incomplete" | "mismatch" | "match";
  issues: RequirementIssue[];
  unspecified: RequiredPin[];
  checked: number;
  total: number;
}

type Inventory = Pick<
  ProjectFile,
  "placedIcs" | "placedStandardComponents" | "placedAdvancedComponents"
>;
export const requiredPinKey = (pin: RequiredPin) =>
  `${pin.componentId}:${pin.pin}`;
const entries = (project: Inventory) => [
  ...project.placedIcs,
  ...project.placedStandardComponents,
  ...project.placedAdvancedComponents,
];

export function requiredComponents(project: Inventory): RequiredComponent[] {
  const ids = new Map(
    entries(project).map((part) => [part.ref, part.instanceId ?? part.ref])
  );
  return partPins(project).map((part) => ({
    id: ids.get(part.ref) as string,
    ref: part.ref,
    name: part.part,
    pins: part.pins.map(({ pin, label }) => ({
      pin,
      ...(label ? { label } : {}),
    })),
  }));
}

export function includeRequiredComponents(
  requirements: CircuitRequirements,
  project: Inventory
): CircuitRequirements {
  const current = requiredComponents(project);
  const byId = new Map(current.map((part) => [part.id, part]));
  const known = new Set(requirements.components.map((part) => part.id));
  const added = current.filter((part) => !known.has(part.id));
  const components = requirements.components.map((part) => {
    const present = byId.get(part.id);
    if (!present) return part;
    const pins = present.pins.filter(
      (pin) => !part.pins.some((previous) => previous.pin === pin.pin)
    );
    return pins.length ? { ...part, pins: [...part.pins, ...pins] } : part;
  });
  return added.length ||
    components.some((part, index) => part !== requirements.components[index])
    ? { ...requirements, components: [...components, ...added] }
    : requirements;
}

export function createRequirements(
  project: ProjectFile,
  fromBoard = false
): CircuitRequirements {
  const components = requiredComponents(project);
  const byRef = new Map(components.map((part) => [part.ref, part.id]));
  const pins = (net: Net): RequiredPin[] =>
    net.pins.map((pin) => ({
      componentId: byRef.get(pin.ref) as string,
      pin: pin.pin,
    }));
  const actual = fromBoard ? computeNets(project).nets : [];
  return {
    // Checking is on from the start: the only reason to describe an intended circuit is to
    // hold the board to it, and a blank plan reports honestly that nothing is specified yet,
    // which is also how you watch it fill in. It can be turned off and stays off once saved.
    validate: true,
    components,
    nets: actual
      .filter((net) => net.pins.length > 1)
      .map((net, index) => ({ id: `net-${index + 1}`, pins: pins(net) })),
    unused: actual.filter((net) => net.pins.length === 1).flatMap(pins),
  };
}

export function disconnectRequiredPin(
  requirements: CircuitRequirements,
  pin: RequiredPin,
  unused = false
): CircuitRequirements {
  const key = requiredPinKey(pin);
  return {
    ...requirements,
    nets: requirements.nets
      .map((net) => ({
        ...net,
        pins: net.pins.filter((item) => requiredPinKey(item) !== key),
      }))
      .filter((net) => net.pins.length > 1),
    unused: [
      ...requirements.unused.filter((item) => requiredPinKey(item) !== key),
      ...(unused ? [pin] : []),
    ],
  };
}

export function connectRequiredPins(
  requirements: CircuitRequirements,
  first: RequiredPin,
  second: RequiredPin
): CircuitRequirements {
  const wanted = new Set([requiredPinKey(first), requiredPinKey(second)]);
  if (wanted.size < 2) return requirements;
  const joined = requirements.nets.filter((net) =>
    net.pins.some((pin) => wanted.has(requiredPinKey(pin)))
  );
  if (
    joined.length === 1 &&
    [first, second].every((pin) =>
      joined[0].pins.some(
        (item) => requiredPinKey(item) === requiredPinKey(pin)
      )
    )
  )
    return requirements;
  const unique = new Map(
    [...joined.flatMap((net) => net.pins), first, second].map((pin) => [
      requiredPinKey(pin),
      pin,
    ])
  );
  let sequence = 1;
  const ids = new Set(requirements.nets.map((net) => net.id));
  while (ids.has(`net-${sequence}`)) sequence++;
  return {
    ...requirements,
    nets: [
      ...requirements.nets.filter((net) => !joined.includes(net)),
      { id: joined[0]?.id ?? `net-${sequence}`, pins: [...unique.values()] },
    ],
    unused: requirements.unused.filter(
      (pin) => !unique.has(requiredPinKey(pin))
    ),
  };
}

// Makes `pins` one required net: the net `netId` when it exists (its pins replaced, its place kept),
// else a new one. A pin already in another net moves here (a net left with one pin goes) and is
// no longer marked unused. Fewer than two pins leave no net, so this also deletes one. Every pin
// must already be in the inventory (includeRequiredComponents).
export function setRequiredNet(
  requirements: CircuitRequirements,
  netId: string | undefined,
  pins: RequiredPin[]
): CircuitRequirements {
  const unique = [
    ...new Map(
      pins.map(({ componentId, pin }) => [
        requiredPinKey({ componentId, pin }),
        { componentId, pin },
      ])
    ).values(),
  ];
  const keys = new Set(unique.map(requiredPinKey));
  const taken = new Set(requirements.nets.map((net) => net.id));
  const editing = netId !== undefined && taken.has(netId);
  let id = editing ? (netId as string) : undefined;
  if (!id) {
    let sequence = 1;
    while (taken.has(`net-${sequence}`)) sequence++;
    id = `net-${sequence}`;
  }
  const replacement: RequiredNet = { id, pins: unique };
  const nets: RequiredNet[] = [];
  for (const net of requirements.nets) {
    if (editing && net.id === netId) {
      if (unique.length > 1) nets.push(replacement);
      continue;
    }
    const kept = net.pins.filter((pin) => !keys.has(requiredPinKey(pin)));
    if (kept.length > 1)
      nets.push(kept.length === net.pins.length ? net : { ...net, pins: kept });
  }
  if (!editing && unique.length > 1) nets.push(replacement);
  return {
    ...requirements,
    nets,
    unused: requirements.unused.filter((pin) => !keys.has(requiredPinKey(pin))),
  };
}

// One required net as the board has it: its pins by name (as nets name them, "U1.8 VCC", "D1.K"),
// which of them are on the board, and whether the board joins them all.
export interface RequiredNetReport {
  id: string;
  // From its pins' names, as the board's nets are named ("GND"); absent when none is named.
  name?: string;
  pins: { pin: RequiredPin; name: string; onBoard: boolean }[];
  wired: boolean;
}

export function requiredNetReports(
  project: ProjectFile,
  actual: Net[] = computeNets(project).nets
): RequiredNetReport[] {
  const ids = new Map(
    entries(project).map((part) => [part.ref, part.instanceId ?? part.ref])
  );
  const netOf = new Map<string, Net>();
  const boardPin = new Map<string, NetPin>();
  for (const net of actual) {
    for (const pin of net.pins) {
      const key = requiredPinKey({
        componentId: ids.get(pin.ref) as string,
        pin: pin.pin,
      });
      netOf.set(key, net);
      boardPin.set(key, pin);
    }
  }
  return (project.requirements?.nets ?? []).map((net) => {
    const onBoard = net.pins.flatMap((pin) => boardPin.get(requiredPinKey(pin)) ?? []);
    const pins = net.pins.map((pin) => {
      const found = boardPin.get(requiredPinKey(pin));
      return {
        pin,
        name: found ? pinName(found) : requirementPinName(project, pin),
        onBoard: !!found,
      };
    });
    const groups = new Set(net.pins.map((pin) => netOf.get(requiredPinKey(pin))));
    const name = netName(onBoard);
    return {
      id: net.id,
      ...(name ? { name } : {}),
      pins,
      wired: onBoard.length === net.pins.length && groups.size === 1,
    };
  });
}

export function forgetRequiredComponent(
  requirements: CircuitRequirements,
  id: string
): CircuitRequirements {
  return {
    ...requirements,
    components: requirements.components.filter((part) => part.id !== id),
    nets: requirements.nets
      .map((net) => ({
        ...net,
        pins: net.pins.filter((pin) => pin.componentId !== id),
      }))
      .filter((net) => net.pins.length > 1),
    unused: requirements.unused.filter((pin) => pin.componentId !== id),
  };
}

// Each board pin's name as nets give it ("D1.K", "U1.8"), by requiredPinKey, worked out once per
// project file.
const boardPinNames = new WeakMap<ProjectFile, Map<string, string>>();

function pinNamesOf(project: ProjectFile): Map<string, string> {
  let names = boardPinNames.get(project);
  if (!names) {
    const ids = new Map(
      entries(project).map((part) => [part.ref, part.instanceId ?? part.ref])
    );
    names = new Map(
      boardPins(project).map((pin) => [
        requiredPinKey({ componentId: ids.get(pin.ref) as string, pin: pin.pin }),
        pinId(pin),
      ])
    );
    boardPinNames.set(project, names);
  }
  return names;
}

// A required pin as nets name it ("D1.K", "U1.8"); a part no longer on the board by the ref it had
// and the pin's number.
export function requirementPinName(
  project: ProjectFile,
  pin: RequiredPin
): string {
  const onBoard = pinNamesOf(project).get(requiredPinKey(pin));
  if (onBoard) return onBoard;
  const remembered = project.requirements?.components.find(
    (part) => part.id === pin.componentId
  );
  return `${remembered?.ref ?? pin.componentId}.${pin.pin}`;
}

export function requirementNets(project: ProjectFile): Net[] {
  const ids = new Map(
    entries(project).map((part) => [part.ref, part.instanceId ?? part.ref])
  );
  const available = new Map<string, NetPin>();
  for (const part of partPins(project)) {
    for (const pin of part.pins) {
      available.set(
        requiredPinKey({
          componentId: ids.get(part.ref) as string,
          pin: pin.pin,
        }),
        { ...pin, ref: part.ref, kind: part.kind }
      );
    }
  }
  const used = new Set<string>();
  const nets: Net[] = [];
  for (const required of project.requirements?.nets ?? []) {
    const pins = required.pins.flatMap((pin) => {
      const key = requiredPinKey(pin);
      const actual = available.get(key);
      if (!actual || used.has(key)) return [];
      used.add(key);
      return [actual];
    });
    if (pins.length) nets.push({ pins, wires: [], holes: [] });
  }
  for (const [key, pin] of available) {
    if (!used.has(key)) nets.push({ pins: [pin], wires: [], holes: [] });
  }
  return nets;
}

export function validateRequirements(
  project: ProjectFile,
  actual?: Net[]
): RequirementValidation {
  const requirements = project.requirements;
  if (!requirements?.validate)
    return {
      status: "disabled",
      issues: [],
      unspecified: [],
      checked: 0,
      total: 0,
    };
  actual ??= computeNets(project).nets;
  const components = requiredComponents(project);
  const byId = new Map(components.map((part) => [part.id, part]));
  const byRef = new Map(components.map((part) => [part.ref, part.id]));
  const identity = (pin: NetPin): RequiredPin => ({
    componentId: byRef.get(pin.ref) as string,
    pin: pin.pin,
  });
  const netOf = new Map(
    actual.flatMap((net) =>
      net.pins.map((pin) => [requiredPinKey(identity(pin)), net] as const)
    )
  );
  const issues: RequirementIssue[] = [];
  const named = (pins: RequiredPin[]) =>
    pins.map((pin) => requirementPinName(project, pin)).join(", ");
  for (const expected of requirements.components) {
    const current = byId.get(expected.id);
    if (!current) {
      issues.push({
        kind: "missing-component",
        message: `Missing component: ${expected.ref} (${expected.name}) is required but no longer on the board.`,
        pins: expected.pins.map((pin) => ({
          componentId: expected.id,
          pin: pin.pin,
        })),
      });
    } else {
      const missing = expected.pins
        .filter((pin) => !current.pins.some((item) => item.pin === pin.pin))
        .map((pin) => ({ componentId: expected.id, pin: pin.pin }));
      if (missing.length)
        issues.push({
          kind: "missing-pin",
          message: `Missing terminals: ${named(missing)}.`,
          pins: missing,
        });
    }
  }
  const groupOf = new Map<string, string>();
  for (const net of requirements.nets) {
    for (const pin of net.pins) groupOf.set(requiredPinKey(pin), net.id);
    const groups = new Set(
      net.pins.map((pin) => netOf.get(requiredPinKey(pin))).filter(Boolean)
    );
    if (groups.size > 1)
      issues.push({
        kind: "missing-connection",
        message: `Missing connection: ${named(
          net.pins
        )} should be one net, but the board separates them into ${
          groups.size
        } groups.`,
        pins: net.pins,
      });
  }
  const unused = new Set(requirements.unused.map(requiredPinKey));
  for (const pin of requirements.unused)
    groupOf.set(requiredPinKey(pin), `unused:${requiredPinKey(pin)}`);
  for (const net of actual) {
    if (net.pins.length < 2) continue;
    const pins = net.pins.map(identity);
    const groups = new Set(
      pins.map((pin) => groupOf.get(requiredPinKey(pin))).filter(Boolean)
    );
    const hasUnused = pins.some((pin) => unused.has(requiredPinKey(pin)));
    if (groups.size > 1 || hasUnused)
      issues.push({
        kind: "unexpected-connection",
        message: hasUnused
          ? `Unexpected connection: ${named(
              pins
            )} includes a terminal marked unused.`
          : `Unexpected connection: ${named(
              pins
            )} joins separate required nets.`,
        pins,
      });
  }
  const all = components.flatMap((part) =>
    part.pins.map((pin) => ({ componentId: part.id, pin: pin.pin }))
  );
  const unspecified = all.filter((pin) => !groupOf.has(requiredPinKey(pin)));
  return {
    status: issues.length
      ? "mismatch"
      : unspecified.length || !all.length
      ? "incomplete"
      : "match",
    issues,
    unspecified,
    checked: all.length - unspecified.length,
    total: all.length,
  };
}

export function readRequirements(
  value: unknown
): CircuitRequirements | undefined {
  if (value === undefined) return;
  const invalid = () => {
    throw new Error(
      "The requirements are malformed. They were not discarded; fix their components, pin assignments or nets before importing."
    );
  };
  const object = (entry: unknown): Record<string, unknown> => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry))
      return invalid();
    return entry as Record<string, unknown>;
  };
  const list = (entry: unknown): unknown[] => {
    if (!Array.isArray(entry) || entry.length > 20000) return invalid();
    return entry;
  };
  const id = (entry: unknown): string => {
    if (
      typeof entry !== "string" ||
      !/^[\w-]{1,100}$/.test(entry) ||
      ["__proto__", "constructor", "prototype"].includes(entry)
    )
      return invalid();
    return entry;
  };
  const text = (entry: unknown): string => {
    if (typeof entry !== "string" || !entry.trim() || entry.length > 200)
      return invalid();
    return entry;
  };
  const number = (entry: unknown): number => {
    if (
      typeof entry !== "number" ||
      !Number.isInteger(entry) ||
      entry < 1 ||
      entry > 20000
    )
      return invalid();
    return entry;
  };
  const raw = object(value);
  if (typeof raw.validate !== "boolean") return invalid();
  const componentIds = new Set<string>();
  const terminals = new Set<string>();
  const components = list(raw.components).map((entry) => {
    const part = object(entry);
    const componentId = id(part.id);
    if (componentIds.has(componentId)) return invalid();
    componentIds.add(componentId);
    const pins = list(part.pins).map((entry) => {
      const pin = object(entry);
      const pinNumber = number(pin.pin);
      const key = requiredPinKey({ componentId, pin: pinNumber });
      if (terminals.has(key) || terminals.size >= 20000) return invalid();
      terminals.add(key);
      return {
        pin: pinNumber,
        ...(pin.label === undefined || pin.label === ""
          ? {}
          : { label: text(pin.label) }),
      };
    });
    if (!pins.length) return invalid();
    return {
      id: componentId,
      ref: text(part.ref),
      name: text(part.name),
      pins,
    };
  });
  const assigned = new Set<string>();
  const readPin = (entry: unknown): RequiredPin => {
    const raw = object(entry);
    const pin = { componentId: id(raw.componentId), pin: number(raw.pin) };
    const key = requiredPinKey(pin);
    if (!terminals.has(key) || assigned.has(key)) return invalid();
    assigned.add(key);
    return pin;
  };
  const netIds = new Set<string>();
  const nets = list(raw.nets).map((entry) => {
    const net = object(entry);
    const netId = id(net.id);
    if (netIds.has(netId)) return invalid();
    netIds.add(netId);
    const pins = list(net.pins).map(readPin);
    if (pins.length < 2) return invalid();
    return { id: netId, pins };
  });
  const unused = list(raw.unused).map(readPin);
  // A `schematic` here is a layout from older editors with a schematic view; it is ignored.
  return {
    validate: raw.validate,
    components,
    nets,
    unused,
  };
}
