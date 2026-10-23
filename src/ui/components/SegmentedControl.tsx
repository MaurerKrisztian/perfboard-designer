import {cx} from "../lib/class-names";

// A row of buttons, one of them on: a choice between a few options (perfboard or stripboard…).
interface SegmentedControlProps<T extends string> {
  id?: string;
  options: {value: T; label: string}[];
  value: T;
  onChange: (value: T) => void;
  hidden?: boolean;
}

export function SegmentedControl<T extends string>({id, options, value, onChange, hidden}: SegmentedControlProps<T>) {
  return (
    <div className="board-switch" id={id} hidden={hidden}>
      {options.map(option => (
        <button key={option.value} className={cx(option.value === value && "active-mode")} onClick={() => onChange(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  );
}
