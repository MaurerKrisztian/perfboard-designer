import {useEffect, useRef} from "react";
import {ProjectFile} from "../../project-file/project-file";
import {readProjectFile} from "../../project-file/read-project-file";
import {readStoredProjectFile, StoredProject} from "../../features/project/project-store";
import {deleteProject, duplicateProject, openProject, renameProject, saveNow} from "../../features/project/current-project";
import {downloadProjectFile} from "../../features/project/save-project";
import {drawProjectThumbnail} from "../../features/project/project-thumbnail";
import {ProjectState} from "../../state/ProjectState";
import {cx} from "../lib/class-names";
import type {ProjectsMode} from "./ProjectsDialog";

// One project in the Projects dialog: a picture of its board, its name, size and contents, and when
// it was last edited. The card opens it; its ⋯ menu renames, copies, downloads or deletes it.

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

function editedAgo(time: number): string {
  const minutes = Math.round((Date.now() - time) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  return `on ${new Date(time).toLocaleDateString()}`;
}

function readStoredFile(id: string): ProjectFile | undefined {
  try {
    return readProjectFile(JSON.parse(readStoredProjectFile(id) ?? "null")).project;
  } catch {
    return undefined;
  }
}

// Each project's file as last read, so a card re-renders without reading and drawing it again until
// it's edited.
const readFiles = new Map<string, {updatedAt: number; file?: ProjectFile}>();

function storedFile(project: StoredProject): ProjectFile | undefined {
  const cached = readFiles.get(project.id);
  if (cached?.updatedAt === project.updatedAt) return cached.file;
  const file = readStoredFile(project.id);
  readFiles.set(project.id, {updatedAt: project.updatedAt, file});
  return file;
}

// "26×31 perfboard · 5 parts · 8 wires"
function describe(file: ProjectFile | undefined): string {
  if (!file) return "Can't be read by this version";
  const parts = file.placedIcs.length + file.placedStandardComponents.length + file.placedAdvancedComponents.length;
  return `${file.board.cols}×${file.board.rows} ${file.board.type} · ${plural(parts, "part")} · ${plural(file.wires.length, "wire")}`;
}

interface ProjectCardProps {
  project: StoredProject;
  isOpen: boolean;
  mode: ProjectsMode;
  setMode: (mode: ProjectsMode) => void;
  menuOpen: boolean;
  onToggleMenu: () => void;
  // The stored projects changed (renamed, copied, deleted).
  onChanged: () => void;
  // The project was opened: the dialog's work is done.
  onOpened: () => void;
}

export function ProjectCard({project, isOpen, mode, setMode, menuOpen, onToggleMenu, onChanged, onOpened}: ProjectCardProps) {
  const file = storedFile(project);
  const renaming = mode.kind === "rename" && mode.id === project.id;
  const confirmingDelete = mode.kind === "confirm-delete" && mode.id === project.id;

  const open = () => {
    if (isOpen || openProject(project.id)) onOpened();
  };
  // A menu item closes the menu, then does its thing.
  const fromMenu = (action: () => void) => () => {
    onToggleMenu();
    action();
  };
  const download = () => {
    if (project.id === ProjectState.current?.id) saveNow();
    const json = readStoredProjectFile(project.id);
    if (json !== null) downloadProjectFile(json, project.name);
  };

  const thumb = (
    <div className="project-thumb">
      {file ? <ProjectThumbnail file={file}/> : <span className="project-thumb-missing">?</span>}
      {isOpen && <span className="project-badge">Open</span>}
    </div>
  );
  const body = (
    <div className="project-card-body">
      {renaming
        ? <RenameField name={project.name} onDone={name => {
          if (name && name !== project.name) renameProject(project.id, name);
          setMode({kind: "list"});
          onChanged();
        }} onCancel={() => setMode({kind: "list"})}/>
        : <span className="project-name" title={project.name}>{project.name}</span>}
      <span className="project-meta">{describe(file)}</span>
      <span className="project-edited">Edited {editedAgo(project.updatedAt)}</span>
    </div>
  );

  return (
    <li className={cx("project-card", isOpen && "is-open")}>
      {/* The whole card opens the project, except while its name is being edited (an input can't sit inside a button). */}
      {renaming ? <>{thumb}{body}</> : (
        <button className="project-open" aria-label={isOpen ? `"${project.name}" is open` : `Open "${project.name}"`} onClick={open}>
          {thumb}{body}
        </button>
      )}
      <button className="project-menu-btn" title="More actions" aria-label={`More actions for "${project.name}"`}
        aria-haspopup="menu" aria-expanded={menuOpen} onClick={onToggleMenu}>⋯</button>
      <div className="project-menu" role="menu" hidden={!menuOpen}>
        <CardMenuItem icon="✎" label="Rename" onClick={fromMenu(() => setMode({kind: "rename", id: project.id}))}/>
        <CardMenuItem icon="⧉" label="Duplicate" onClick={fromMenu(() => {
          duplicateProject(project.id);
          onChanged();
        })}/>
        <CardMenuItem icon="⤓" label="Download file" onClick={fromMenu(download)}/>
        <div className="menu-divider"/>
        <CardMenuItem icon="🗑" label="Delete" className="is-danger" onClick={fromMenu(() => setMode({kind: "confirm-delete", id: project.id}))}/>
      </div>
      {confirmingDelete && (
        <DeleteConfirmation name={project.name} onCancel={() => setMode({kind: "list"})} onDelete={() => {
          deleteProject(project.id);
          setMode({kind: "list"});
          onChanged();
        }}/>
      )}
    </li>
  );
}

function CardMenuItem({icon, label, className, onClick}: {icon: string; label: string; className?: string; onClick: () => void}) {
  return (
    <button role="menuitem" className={className} onClick={onClick}>
      <span className="project-menu-icon">{icon}</span>{label}
    </button>
  );
}

function ProjectThumbnail({file}: {file: ProjectFile}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvas.current) drawProjectThumbnail(canvas.current, file);
  }, [file]);
  return <canvas ref={canvas}/>;
}

// The project's name, edited in place: Enter or leaving the box keeps it, Escape doesn't.
function RenameField({name, onDone, onCancel}: {name: string; onDone: (name: string) => void; onCancel: () => void}) {
  const input = useRef<HTMLInputElement>(null);
  // Finishing re-renders the card without the field, which blurs it: finish only once.
  const done = useRef(false);
  const finish = (keep: boolean) => {
    if (done.current) return;
    done.current = true;
    if (keep) onDone(input.current?.value.trim() ?? "");
    else onCancel();
  };
  useEffect(() => input.current?.select(), []);
  return (
    <input ref={input} type="text" className="project-rename-input" aria-label="Project name" defaultValue={name}
      onBlur={() => finish(true)}
      onKeyDown={e => {
        if (e.key === "Enter") finish(true);
        if (e.key === "Escape") {
          // Leaves the dialog open: Escape only cancels the rename.
          e.stopPropagation();
          finish(false);
        }
      }}/>
  );
}

// Asks before deleting, over the card itself.
function DeleteConfirmation({name, onCancel, onDelete}: {name: string; onCancel: () => void; onDelete: () => void}) {
  const cancel = useRef<HTMLButtonElement>(null);
  useEffect(() => cancel.current?.focus(), []);
  return (
    <div className="project-confirm">
      <strong>Delete "{name}"?</strong>
      <span className="project-confirm-note">It will be removed from this browser for good.</span>
      <div className="project-confirm-actions">
        <button ref={cancel} className="btn" onClick={onCancel}>Cancel</button>
        <button className="btn-danger" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
