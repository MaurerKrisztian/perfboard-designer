import {BoardType, StripDirection} from "../../project-file/project-file";
import {GRID_PRESETS} from "../../features/project/grid-presets";
import {MAX_BOARD_SIDE, NewBoard} from "../../features/project/new-board";
import {cx} from "../lib/class-names";
import {NumberField} from "./NumberField";
import {SegmentedControl} from "./SegmentedControl";

// A board to start on, picked in one place: perfboard or stripboard (and a stripboard's strip
// direction), and its size, from the sizes boards are sold in or typed in holes. Changes go out as
// they're made; the New project card keeps them for its board, the empty board's card applies them.

export const BOARD_TYPES: {value: BoardType; label: string}[] = [
  {value: "perfboard", label: "Perfboard"},
  {value: "stripboard", label: "Stripboard"},
];

export const STRIP_DIRECTIONS: {value: StripDirection; label: string}[] = [
  {value: "horizontal", label: "↔ Horizontal strips"},
  {value: "vertical", label: "↕ Vertical strips"},
];

// Holes are 2.54 mm apart.
const cm = (holes: number) => (holes * 0.254).toFixed(1);

// "Perfboard, 18 × 25 holes"
export function describeBoard(board: NewBoard): string {
  const type = BOARD_TYPES.find(t => t.value === board.type)?.label ?? board.type;
  return `${type}, ${board.cols} × ${board.rows} holes`;
}

// "about 4.6 × 6.4 cm": the span of its holes.
export function boardSpan(board: NewBoard): string {
  return `about ${cm(board.cols)} × ${cm(board.rows)} cm`;
}

interface BoardSetupFieldsProps {
  board: NewBoard;
  onChange: (board: NewBoard) => void;
  // Gives the size fields ids, so their labels hold even with two of these on the page.
  idPrefix: string;
}

export function BoardSetupFields({board, onChange, idPrefix}: BoardSetupFieldsProps) {
  const set = (change: Partial<NewBoard>) => onChange({...board, ...change});
  return (
    <div className="board-setup">
      <SegmentedControl options={BOARD_TYPES} value={board.type} onChange={type => set({type})}/>
      <SegmentedControl options={STRIP_DIRECTIONS} value={board.strips} hidden={board.type !== "stripboard"}
        onChange={strips => set({strips})}/>
      <div className="board-setup-presets" role="group" aria-label="Common board sizes">
        {GRID_PRESETS.map(preset => {
          const on = preset.w === board.cols && preset.h === board.rows;
          return (
            <button key={preset.label} type="button" className={cx("size-preset", on && "is-on")} aria-pressed={on}
              onClick={() => set({cols: preset.w, rows: preset.h})}>
              <span className="size-preset-name">{preset.label.replace("x", " × ")} cm</span>
              <span className="size-preset-holes">{preset.w} × {preset.h}</span>
            </button>
          );
        })}
      </div>
      <div className="board-setup-size">
        <label className="grid-field" htmlFor={`${idPrefix}Cols`}>
          <span>Width</span>
          <NumberField id={`${idPrefix}Cols`} min={1} max={MAX_BOARD_SIDE} value={board.cols} onCommit={cols => set({cols})}/>
        </label>
        <span className="grid-times" aria-hidden="true">×</span>
        <label className="grid-field" htmlFor={`${idPrefix}Rows`}>
          <span>Height</span>
          <NumberField id={`${idPrefix}Rows`} min={1} max={MAX_BOARD_SIDE} value={board.rows} onCommit={rows => set({rows})}/>
        </label>
        <span className="board-setup-span">holes, {boardSpan(board)}</span>
      </div>
    </div>
  );
}
