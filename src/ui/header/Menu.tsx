import {MouseEvent, ReactNode, useEffect, useRef, useState} from "react";
import {useClickOutside} from "../hooks/use-click-outside";

// The header's dropdown menus (File, View, Help). One is open at a time; it closes on a click
// outside, Escape, or choosing an item, except a checkbox item, which stays open so several can be
// toggled.

export function MenuBar({children}: {children: (menu: MenuControl) => ReactNode}) {
  const [open, setOpen] = useState<string>();
  const bar = useRef<HTMLElement>(null);
  useClickOutside([bar], () => setOpen(undefined), open !== undefined);
  useEffect(() => {
    if (open === undefined) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(undefined);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const control: MenuControl = {
    isOpen: label => open === label,
    toggle: label => setOpen(current => current === label ? undefined : label),
    close: () => setOpen(undefined),
  };
  return <nav className="menu-bar" ref={bar}>{children(control)}</nav>;
}

export interface MenuControl {
  isOpen(label: string): boolean;
  toggle(label: string): void;
  close(): void;
}

export function Menu({label, control, children}: {label: string; control: MenuControl; children: ReactNode}) {
  const open = control.isOpen(label);
  const closeOnChoice = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest('[role="menuitemcheckbox"]')) control.close();
  };
  return (
    <div className="menu">
      <button className="menu-trigger" aria-haspopup="true" aria-expanded={open} onClick={() => control.toggle(label)}>
        {label}
      </button>
      <div className="menu-panel" role="menu" hidden={!open} onClick={closeOnChoice}>
        {children}
      </div>
    </div>
  );
}

export function MenuItem({id, onClick, children}: {id?: string; onClick: () => void; children: ReactNode}) {
  return <button id={id} role="menuitem" onClick={onClick}>{children}</button>;
}

export function MenuCheckbox({id, checked, onClick, children}: {id?: string; checked: boolean; onClick: () => void; children: ReactNode}) {
  return (
    <button id={id} role="menuitemcheckbox" aria-checked={checked} onClick={onClick}>
      {children}<span className="menu-check">{checked ? "✓" : ""}</span>
    </button>
  );
}

export function MenuLink({href, children}: {href: string; children: ReactNode}) {
  return <a href={href} target="_blank" rel="noopener" role="menuitem">{children}</a>;
}

export function MenuDivider() {
  return <div className="menu-divider"/>;
}
