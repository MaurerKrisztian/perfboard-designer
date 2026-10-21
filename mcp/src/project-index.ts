import {DurableObject, DurableObjectState} from "cloudflare:workers";
import {StoredProject, storedAddresses} from "./stored-projects";

type ProjectEntry = Pick<StoredProject, "id" | "name" | "storedAt">;
type ProjectRow = {id: string; name: string | null; storedAt: number};

export interface ProjectQuery {
  query: string;
  limit: number;
  cursor?: {storedAt: number; id: string};
}

export class StoredProjectIndex extends DurableObject {
  constructor(ctx: DurableObjectState, env: unknown) {
    super(ctx, env);
    ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS projects (id TEXT PRIMARY KEY, name TEXT, storedAt INTEGER NOT NULL);
      CREATE INDEX IF NOT EXISTS projects_created ON projects (storedAt DESC, id DESC);
    `);
  }

  async put(entry: ProjectEntry): Promise<void> {
    this.ctx.storage.sql.exec(
      "INSERT INTO projects (id, name, storedAt) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET name = excluded.name, storedAt = excluded.storedAt",
      entry.id, entry.name ?? null, entry.storedAt,
    );
  }

  async remove(id: string, storedAt: number): Promise<void> {
    this.ctx.storage.sql.exec("DELETE FROM projects WHERE id = ? AND storedAt = ?", id, storedAt);
  }

  async list({query, limit, cursor}: ProjectQuery): Promise<{projects: ProjectEntry[]; nextCursor: string | null}> {
    const conditions: string[] = [];
    const bindings: (string | number)[] = [];
    if (query) {
      conditions.push("(instr(lower(id), ?) > 0 OR instr(lower(coalesce(name, '')), ?) > 0)");
      bindings.push(query.toLowerCase(), query.toLowerCase());
    }
    if (cursor) {
      conditions.push("(storedAt, id) < (?, ?)");
      bindings.push(cursor.storedAt, cursor.id);
    }
    const rows = this.ctx.storage.sql.exec<ProjectRow>(
      `SELECT id, name, storedAt FROM projects ${conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""} ORDER BY storedAt DESC, id DESC LIMIT ?`,
      ...bindings, limit + 1,
    ).toArray();
    const projects = rows.slice(0, limit).map(({id, name, storedAt}) => ({id, ...(name === null ? {} : {name}), storedAt}));
    const last = projects.at(-1);
    return {projects, nextCursor: rows.length > limit && last ? `${last.storedAt}:${last.id}` : null};
  }
}

export async function handleListProjectsRequest(
  request: Request, index: Pick<StoredProjectIndex, "list">, base: string, editorBase: string,
): Promise<Response> {
  const headers = {"Cache-Control": "no-store"};
  const error = (status: number, message: string) => Response.json({error: message}, {status, headers});
  const params = new URL(request.url).searchParams;
  const rawLimit = params.get("limit") ?? "20";
  const limit = Number(rawLimit);
  if (!/^\d+$/.test(rawLimit) || !Number.isInteger(limit) || limit < 1 || limit > 100) {
    return error(400, "limit must be an integer between 1 and 100.");
  }
  const query = params.get("q")?.trim() ?? "";
  if (query.length > 200) return error(400, "q must be at most 200 characters.");
  const rawCursor = params.get("cursor");
  let cursor: ProjectQuery["cursor"];
  if (rawCursor !== null) {
    const match = /^(\d{1,16}):([a-z0-9-]{3,105})$/.exec(rawCursor);
    if (!match || !Number.isSafeInteger(Number(match[1]))) return error(400, "Invalid cursor. Use nextCursor from the previous response.");
    cursor = {storedAt: Number(match[1]), id: match[2]};
  }
  try {
    const page = await index.list({query, limit, cursor});
    return Response.json({
      projects: page.projects.map(entry => ({...entry, ...storedAddresses(base, entry.id, editorBase, entry.name)})),
      nextCursor: page.nextCursor,
    }, {headers});
  } catch {
    return error(503, "Projects could not be listed. Try again later.");
  }
}
