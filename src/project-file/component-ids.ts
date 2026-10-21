import type { ProjectFile } from "./project-file";

// Every placed part carries a stable `instanceId`, so circuit requirements can name a part even
// after its ref changes.
export function componentId(): string {
  return crypto.randomUUID();
}

// Gives each part without a usable, unique `instanceId` a new one. `migrate` numbers them
// predictably (`legacy-1`, …) for files read from older versions.
export function ensureComponentIds(
  project: Pick<
    ProjectFile,
    "placedIcs" | "placedStandardComponents" | "placedAdvancedComponents"
  >,
  migrate = false
) {
  const parts = [
    ...project.placedIcs,
    ...project.placedStandardComponents,
    ...project.placedAdvancedComponents,
  ];
  const reserved = new Set(parts.map((part) => part.instanceId));
  const seen = new Set<string>();
  let sequence = 0;
  for (const part of parts) {
    if (
      !part.instanceId ||
      !/^[\w-]{1,100}$/.test(part.instanceId) ||
      ["__proto__", "constructor", "prototype"].includes(part.instanceId) ||
      seen.has(part.instanceId)
    ) {
      let next: string;
      do {
        next = migrate ? `legacy-${++sequence}` : componentId();
      } while (reserved.has(next));
      part.instanceId = next;
      reserved.add(next);
    }
    seen.add(part.instanceId);
  }
}
