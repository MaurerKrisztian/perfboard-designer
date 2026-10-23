import {ProjectState} from "../../state/ProjectState";
import {useEditor} from "../hooks/use-editor";
import {openProjectsDialog} from "../dialogs/ProjectsDialog";

// The open project's name in the header; opens the Projects dialog.
export function ProjectNameButton() {
  const name = useEditor(() => ProjectState.current?.name);
  return (
    <button
      id="currentProjectBtn"
      className="project-name-btn"
      title={name ? "Saved in this browser as you edit. Click to see all projects." : "This board isn't being saved in this browser."}
      onClick={() => openProjectsDialog(false)}
    >
      {name ?? "Not saved"}
    </button>
  );
}
