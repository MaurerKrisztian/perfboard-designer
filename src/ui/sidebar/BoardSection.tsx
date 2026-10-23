import {useEffect, useState} from "react";
import {BoardState} from "../../state/BoardState";
import {BoardType, StripDirection} from "../../project-file/project-file";
import {switchBoard} from "../../features/board-type";
import {boardSize, resizeBoard} from "../../features/project/resize-grid";
import {GRID_PRESETS} from "../../features/project/grid-presets";
import {SegmentedControl} from "../components/SegmentedControl";
import {useEditor} from "../hooks/use-editor";
import {SidebarSection} from "./SidebarSection";

// The Board section: perfboard or stripboard (and a stripboard's strip direction), and the board's
// size in holes, typed or picked from the common board sizes.

const BOARD_TYPES: {value: BoardType; label: string}[] = [
  {value: "perfboard", label: "Perfboard"},
  {value: "stripboard", label: "Stripboard"},
];

const STRIP_DIRECTIONS: {value: StripDirection; label: string}[] = [
  {value: "horizontal", label: "↔ Horizontal strips"},
  {value: "vertical", label: "↕ Vertical strips"},
];

export function BoardSection() {
  const setup = useEditor(() => BoardState.setup);
  const cols = useEditor(() => boardSize().cols);
  const rows = useEditor(() => boardSize().rows);
  const [width, setWidth] = useState(String(cols));
  const [height, setHeight] = useState(String(rows));

  // The fields show the board's size whenever it changes (a project opened, a resize).
  useEffect(() => {
    setWidth(String(cols));
    setHeight(String(rows));
  }, [cols, rows]);

  // A cancelled resize puts the fields back to the board's size.
  const resize = async (w: number, h: number) => {
    if (await resizeBoard(w, h)) return;
    setWidth(String(cols));
    setHeight(String(rows));
  };

  return (
    <SidebarSection id="board" bodyId="gridSection" icon="board" title="Board">
      <SegmentedControl id="boardTypeSelector" options={BOARD_TYPES} value={setup.type} onChange={type => switchBoard({type})}/>
      <SegmentedControl id="stripDirectionSelector" options={STRIP_DIRECTIONS} value={setup.strips}
        hidden={setup.type !== "stripboard"} onChange={strips => switchBoard({strips})}/>
      <form className="grid-inputs" onSubmit={e => {
        e.preventDefault();
        void resize(parseInt(width), parseInt(height));
      }}>
        <label className="grid-field">
          <span>Width</span>
          <input type="number" id="dotMatrixWidth" min="1" value={width} onChange={e => setWidth(e.target.value)}/>
        </label>
        <span className="grid-times" aria-hidden="true">×</span>
        <label className="grid-field">
          <span>Height</span>
          <input type="number" id="dotMatrixHeight" min="1" value={height} onChange={e => setHeight(e.target.value)}/>
        </label>
        <button id="resizeGridBtn" type="submit">Resize</button>
      </form>
      <div className="grid-presets" id="gridPresets">
        {GRID_PRESETS.map(preset => (
          <button key={preset.label} className="preset-btn" onClick={() => {
            setWidth(String(preset.w));
            setHeight(String(preset.h));
            void resize(preset.w, preset.h);
          }}>{preset.label}</button>
        ))}
      </div>
    </SidebarSection>
  );
}
