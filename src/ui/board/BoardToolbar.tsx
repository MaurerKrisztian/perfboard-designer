import {ToolState, isPlacementTool} from "../../state/ToolState";
import {ViewState} from "../../state/ViewState";
import {rotateSelectedIc} from "../../features/ic";
import {cancelPlacement} from "../../features/select";
import {canRedo, canUndo, redo, undo} from "../../features/project/undo-redo";
import {fitToScreen, zoomIn, zoomOut} from "../../features/zoom";
import {toggleSolderSide} from "../../features/solder-view";
import {togglePartLabels} from "../../features/part-labels";
import {Icon, IconName} from "../components/Icon";
import {useEditor} from "../hooks/use-editor";
import {usePhoneLayout} from "../hooks/use-media-query";
import {useStore} from "../lib/store";
import {cx} from "../lib/class-names";
import {layoutStore, toggleFocusMode} from "../layout/layout-store";
import {StatusBadge} from "./StatusBadge";

// The board's toolbar: the status (with cancel, and rotate for parts that turn, while a part or
// wire is being placed), then undo and redo, zoom, and the view switches. A phone shows the
// status's hints here too; wider screens show them along the stage's foot.
export function BoardToolbar() {
  const tool = useEditor(() => ToolState.active.kind);
  const placing = useEditor(() => isPlacementTool(ToolState.active));
  const solderSide = useEditor(() => ViewState.solderSide);
  const zoom = useEditor(() => Math.round(ViewState.zoom * 100));
  const fitMode = useEditor(() => ViewState.fitMode);
  const labels = useEditor(() => ViewState.showPartLabels);
  const undoable = useEditor(canUndo);
  const redoable = useEditor(canRedo);
  const focusMode = useStore(layoutStore, layout => layout.focusMode);
  const phone = usePhoneLayout();

  return (
    <div className="status-bar" id="boardBar">
      {/* Nothing to say beyond what the selection bar shows in Select mode: the phone layout hides it then. */}
      <div className={cx("status-lead", tool === "select" && !solderSide && "is-quiet")} id="statusLead">
        <StatusBadge withHints={phone}/>
        <BarButton id="rotateToolBtn" icon="rotate" title="Rotate the part before placing it (R)" ariaLabel="Rotate"
          hidden={tool !== "ic" && tool !== "advanced-component"} onClick={rotateSelectedIc}/>
        <BarButton id="cancelToolBtn" icon="x" title="Cancel (Esc)" ariaLabel="Cancel" className="bar-btn-cancel"
          hidden={!placing} onClick={cancelPlacement}/>
      </div>
      <div className="bar-groups">
        <div className="bar-group">
          <BarButton id="backBtn" icon="undo" title="Undo (Ctrl+Z)" ariaLabel="Undo" disabled={!undoable} onClick={undo}/>
          <BarButton id="forwardBtn" icon="redo" title="Redo (Ctrl+Y)" ariaLabel="Redo" disabled={!redoable} onClick={redo}/>
        </div>
        <div className="bar-group">
          <BarButton id="zoomOutBtn" icon="zoom-out" title="Zoom out" ariaLabel="Zoom out" onClick={zoomOut}/>
          <span id="zoomLevelText" className="zoom-level">{zoom}%</span>
          <BarButton id="zoomInBtn" icon="zoom-in" title="Zoom in" ariaLabel="Zoom in" onClick={zoomIn}/>
          <BarButton id="zoomFitBtn" icon="fit" title="Fit the whole board on screen" label={fitMode ? "100%" : "Fit"} on={fitMode}
            onClick={() => fitToScreen()}/>
        </div>
        <div className="bar-group">
          <BarButton id="solderViewBtn" icon="solder" title="Solder side: the board from below, with every joint to solder (B)"
            label="Solder side" on={solderSide} onClick={toggleSolderSide}/>
          <BarButton id="toggleValuesBtn" icon="tag" title="Show part names and values" label="Labels" on={labels} onClick={togglePartLabels}/>
          <BarButton id="canvasFullscreenTrigger" icon="focus" title="Focus on the board (F)" label={focusMode ? "Exit Focus" : "Focus"}
            on={focusMode} onClick={toggleFocusMode}/>
        </div>
      </div>
    </div>
  );
}

interface BarButtonProps {
  id: string;
  icon: IconName;
  title: string;
  onClick: () => void;
  // Shown beside the icon (hidden on a phone); else `ariaLabel` names it.
  label?: string;
  ariaLabel?: string;
  // A switch: shown as on, and announced as pressed.
  on?: boolean;
  className?: string;
  hidden?: boolean;
  disabled?: boolean;
}

function BarButton({id, icon, title, onClick, label, ariaLabel, on, className, hidden, disabled}: BarButtonProps) {
  return (
    <button id={id} className={cx("bar-btn", className, on && "is-on")} title={title} aria-label={ariaLabel}
      aria-pressed={on} hidden={hidden} disabled={disabled} onClick={onClick}>
      <Icon name={icon}/>
      {label && <span className="btn-text">{label}</span>}
    </button>
  );
}
