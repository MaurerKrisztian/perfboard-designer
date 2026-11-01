import {useEffect, useState} from "react";
import {Icon} from "../components/Icon";
import {closeDialog} from "../dialogs/dialog-store";
import {importProjectFiles} from "../../features/project/current-project";

// A project file dragged onto the page, anywhere on it, opens as a new project, as File › Import
// Project from File does. Without this the browser would leave the editor to show the file. While a
// file is over the page this says what dropping it will do; it takes no pointer events, so the drag
// still reaches the page under it.
export function ProjectFileDrop() {
  const over = useProjectFileDrop();
  if (!over) return null;
  return (
    <div className="file-drop">
      <div className="file-drop-card">
        <Icon name="board" className="icon file-drop-icon"/>
        <strong>Drop a project file to open it</strong>
        <span>It opens as a new project. The one you have open stays saved.</span>
      </div>
    </div>
  );
}

// Whether a file is being dragged over the page. The listeners are on the window, so a drop lands
// wherever it's let go. Other drags are left alone, and so is an image dragged from the page itself,
// which browsers also report as carrying a file.
function useProjectFileDrop(): boolean {
  const [over, setOver] = useState(false);
  useEffect(() => {
    let fromThisPage = false;
    // Elements the drag has entered and not left: moving onto the next one enters it before leaving
    // the last, so this only reaches 0 when the drag has left the page or been cancelled.
    let entered = 0;
    const carriesFiles = (e: DragEvent) => !fromThisPage && !!e.dataTransfer?.types.includes("Files");

    const onDragStart = () => {
      fromThisPage = true;
    };
    const onDragEnd = () => {
      fromThisPage = false;
    };
    const onDragEnter = (e: DragEvent) => {
      if (!carriesFiles(e)) return;
      e.preventDefault();
      entered++;
      setOver(true);
    };
    const onDragOver = (e: DragEvent) => {
      if (!carriesFiles(e)) return;
      // Without this the page refuses the drop and the browser opens the file itself.
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
      setOver(true);
    };
    const onDragLeave = (e: DragEvent) => {
      if (!carriesFiles(e)) return;
      entered = Math.max(0, entered - 1);
      if (entered === 0) setOver(false);
    };
    const onDrop = (e: DragEvent) => {
      if (!carriesFiles(e)) return;
      e.preventDefault();
      entered = 0;
      setOver(false);
      const files = [...(e.dataTransfer?.files ?? [])];
      if (!files.length) return;
      // The project a dialog was showing or editing for is about to change.
      closeDialog();
      void importProjectFiles(files);
    };
    // A drag's last dragleave or dragend can go missing (its element gone from the page, a cancelled
    // drag), but no mouse moves reach the page during a drag: the first one means it's over.
    const onMouseMove = () => {
      fromThisPage = false;
      entered = 0;
      setOver(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("dragstart", onDragStart);
    window.addEventListener("dragend", onDragEnd);
    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("dragstart", onDragStart);
      window.removeEventListener("dragend", onDragEnd);
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("drop", onDrop);
    };
  }, []);
  return over;
}
