import {FormEvent, useEffect, useRef, useState} from "react";
import {ProjectState} from "../../state/ProjectState";
import {listStoredProjects, unusedProjectName} from "../../features/project/project-store";
import {DEFAULT_PROJECT_NAME, newProject, saveNow} from "../../features/project/current-project";
import {useEditor} from "../hooks/use-editor";
import {Modal} from "../components/Modal";
import {importProjectFromFile} from "../header/AppHeader";
import {openDialog} from "./dialog-store";
import {ProjectCard} from "./ProjectCard";

// The Projects dialog: a card per project kept in this browser, with a picture of its board, to
// open, rename, copy, download or delete; and a first card that starts a new one. Naming,
// renaming and confirming a delete happen in the card itself.

// The search box appears once there are this many projects to look through.
const SEARCH_FROM = 7;

// What the dialog is in the middle of, beyond listing. One thing at a time.
export type ProjectsMode =
  | {kind: "list"}
  | {kind: "new"}
  | {kind: "rename"; id: string}
  | {kind: "confirm-delete"; id: string};

// Opens the dialog, after saving the open project so its card shows what's on the board right now.
export function openProjectsDialog(startNew: boolean) {
  saveNow();
  openDialog({kind: "projects", startNew});
}

export function ProjectsDialog({startNew, onClose}: {startNew: boolean; onClose: () => void}) {
  const [mode, setMode] = useState<ProjectsMode>(startNew ? {kind: "new"} : {kind: "list"});
  const [query, setQuery] = useState("");
  const [menuFor, setMenuFor] = useState<string>();
  const [projects, setProjects] = useState(listStoredProjects);
  const refresh = () => setProjects(listStoredProjects());
  const openId = useEditor(() => ProjectState.current?.id);
  const openName = useEditor(() => ProjectState.current?.name);
  // Another project opened, or the open one renamed.
  useEffect(() => setProjects(listStoredProjects()), [openId, openName]);

  const searchable = projects.length >= SEARCH_FROM;
  const needle = searchable ? query.trim().toLowerCase() : "";
  const shown = needle ? projects.filter(p => p.name.toLowerCase().includes(needle)) : projects;

  // A click anywhere but on a card's menu closes it.
  useEffect(() => {
    if (!menuFor) return;
    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".project-menu, .project-menu-btn")) setMenuFor(undefined);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [menuFor]);

  // Escape backs out one step: an open card menu, then a rename or delete, then the dialog.
  const onEscape = () => {
    if (menuFor) setMenuFor(undefined);
    else if (mode.kind !== "list") setMode({kind: "list"});
    else onClose();
  };

  return (
    <Modal title={<>Projects <span className="projects-count">{projects.length || ""}</span></>} titleClassName="projects-title"
      className="projects-card" onClose={onClose} onEscape={onEscape}>
      <div className="modal-body">
        {searchable && (
          <input type="search" className="projects-search" placeholder="Search projects..." aria-label="Search projects"
            value={query} onChange={e => setQuery(e.target.value)}/>
        )}
        <ul className="projects-grid">
          <NewProjectCard creating={mode.kind === "new"} onStart={() => setMode({kind: "new"})} onCancel={() => setMode({kind: "list"})}
            onCreate={name => {
              newProject(name || unusedProjectName(DEFAULT_PROJECT_NAME));
              onClose();
            }}/>
          {shown.map(project => (
            <ProjectCard key={project.id} project={project} isOpen={project.id === openId} mode={mode} setMode={setMode}
              menuOpen={menuFor === project.id} onToggleMenu={() => setMenuFor(id => id === project.id ? undefined : project.id)}
              onChanged={refresh} onOpened={onClose}/>
          ))}
          {needle && shown.length === 0 && <li className="projects-empty">No projects match "{query.trim()}".</li>}
        </ul>
      </div>
      <div className="modal-footer projects-footer">
        <span className="projects-footer-hint">Saved in this browser as you edit</span>
        <button className="btn" onClick={() => {
          onClose();
          void importProjectFromFile();
        }}>Import from File...</button>
      </div>
    </Modal>
  );
}

interface NewProjectCardProps {
  creating: boolean;
  onStart: () => void;
  onCancel: () => void;
  onCreate: (name: string) => void;
}

// The first card: starts a new project, then asks for its name in place.
function NewProjectCard({creating, onStart, onCancel, onCreate}: NewProjectCardProps) {
  const [name, setName] = useState(() => unusedProjectName(DEFAULT_PROJECT_NAME));
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (creating) input.current?.select();
  }, [creating]);

  if (!creating) {
    return (
      <li className="project-card project-new">
        <button className="project-new-btn" onClick={onStart}>
          <span className="project-new-icon">＋</span><span>New project</span>
        </button>
      </li>
    );
  }
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onCreate(name.trim());
  };
  return (
    <li className="project-card project-new">
      <form className="project-new-form" onSubmit={submit}>
        <label className="project-new-label">Name your new project</label>
        <input ref={input} type="text" className="project-new-input" aria-label="New project name" value={name} onChange={e => setName(e.target.value)}/>
        <div className="project-new-actions">
          <button type="button" className="btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn-primary">Create</button>
        </div>
      </form>
    </li>
  );
}
