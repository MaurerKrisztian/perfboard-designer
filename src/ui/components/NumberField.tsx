import {InputHTMLAttributes, useEffect, useRef, useState} from "react";

// A whole-number box whose value counts once it's committed: on leaving it, Enter, or a click of
// its arrows (the input's own "change" event), not on every key, so typing "12" doesn't pass
// through 1. The committed number is kept within `min` and `max`, and shown as such.
interface NumberFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type" | "min" | "max"> {
  value: number;
  min: number;
  max: number;
  onCommit: (value: number) => void;
}

export function NumberField({value, min, max, onCommit, ...props}: NumberFieldProps) {
  const [text, setText] = useState(String(value));
  const input = useRef<HTMLInputElement>(null);
  const latest = useRef({value, onCommit});
  latest.current = {value, onCommit};

  useEffect(() => setText(String(value)), [value]);

  useEffect(() => {
    const el = input.current;
    if (!el) return;
    const onChange = () => {
      const parsed = parseInt(el.value, 10);
      const next = Number.isNaN(parsed) ? latest.current.value : Math.min(max, Math.max(min, parsed));
      setText(String(next));
      if (next !== latest.current.value) latest.current.onCommit(next);
    };
    el.addEventListener("change", onChange);
    return () => el.removeEventListener("change", onChange);
  }, [min, max]);

  return <input {...props} ref={input} type="number" min={min} max={max} value={text} onChange={e => setText(e.target.value)}/>;
}
