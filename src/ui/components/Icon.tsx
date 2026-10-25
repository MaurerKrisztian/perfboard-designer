import type {ReactNode} from "react";

// The editor's icons: line drawings in the text colour (style.css, ".icon"). Each is a <symbol> in
// one sprite on the page (<IconSprite/>, rendered once by App), used by <Icon name="…"/>.

const ICONS = {
  "select": <><path d="M4 3l6.5 17 2.4-7.1 7.1-2.4z"/><path d="M13.5 13.5l6 6"/></>,
  "wire": <><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="5" r="2.5"/><path d="M6.8 17.2 17.2 6.8"/></>,
  "solder-path": <><path d="M5 5v14h14" strokeWidth="4" opacity=".5"/><circle cx="5" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/></>,
  "collapse-all": <path d="m7 4 5 5 5-5M7 20l5-5 5 5"/>,
  "plus":<path d="M12 5v14M5 12h14"/>,
  "eraser": <><path d="m7 21-4.3-4.3a2.4 2.4 0 0 1 0-3.4l9.6-9.6a2.4 2.4 0 0 1 3.4 0l5.6 5.6a2.4 2.4 0 0 1 0 3.4L13 21"/><path d="M22 21H7M5 11l9 9"/></>,
  "note": <><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5z"/><path d="M15 3v6h6M7 13h6M7 17h9"/></>,
  "cut": <><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/></>,
  "undo": <><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></>,
  "redo": <><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/></>,
  "zoom-in": <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M8 11h6M11 8v6"/></>,
  "zoom-out": <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M8 11h6"/></>,
  "fit": <><path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"/><rect x="8" y="8" width="8" height="8" rx="1"/></>,
  "tag": <><path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r="1.5"/></>,
  "focus": <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>,
  "straighten": <><path d="M3 9l5-5 5 5 5-5" strokeDasharray="2 2.6"/><path d="M3 18h18"/><path d="M12 12v4"/></>,
  "to-bottom": <><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 20h16" strokeWidth="3.5" opacity=".5"/></>,
  "to-top": <><path d="M12 21V9M7 14l5-5 5 5"/><path d="M4 4h16"/></>,
  "rotate": <><path d="M21 12a9 9 0 1 1-2.6-6.4L21 8"/><path d="M21 3v5h-5"/></>,
  "connect": <><path d="M3 9h18" opacity=".5"/><path d="M12 9v12"/><circle cx="12" cy="9" r="3"/></>,
  "turn-round": <path d="M7 4 3 8l4 4M3 8h14M17 12l4 4-4 4M21 16H7"/>,
  "color": <path d="M12 2.7 17.7 8.4a8 8 0 1 1-11.4 0z"/>,
  "value": <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>,
  "duplicate": <><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></>,
  "select-more": <><path d="M4 3l6.5 17 2.4-7.1 7.1-2.4z"/><path d="M18 15v6M15 18h6"/></>,
  "trash": <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"/>,
  "x": <path d="M18 6 6 18M6 6l12 12"/>,
  "nets": <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></>,
  "more": <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M2 14h4M10 8h4M18 16h4"/>,
  "tools": <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>,
  "board": <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="16" cy="8" r="1"/><circle cx="8" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="16" cy="12" r="1"/><circle cx="8" cy="16" r="1"/><circle cx="12" cy="16" r="1"/><circle cx="16" cy="16" r="1"/></>,
  "build": <><path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/></>,
  "chip": <><rect x="6" y="6" width="12" height="12" rx="1.5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></>,
  "link": <><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></>,
  "solder": <><path d="M3 20h18"/><path d="M7 20v-3a5 5 0 0 1 10 0v3"/><path d="M12 12V3M9 6l3-3 3 3"/></>,
  "cube": <><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7z"/><path d="M3.3 7 12 12l8.7-5M12 22V12"/></>,
  "ground": <path d="M12 3v9M5 12h14M8 16h8M10.5 20h3"/>,
  "bolt": <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z"/>,
  "check": <path d="M4 12.5l5 5L20 6.5"/>,
  "pencil": <><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"/><path d="M14.5 5.5l3 3"/></>,
  "sparkle": <><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></>,
  "external": <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof ICONS;

export function IconSprite() {
  return (
    <svg width="0" height="0" style={{position: "absolute"}} aria-hidden="true">
      <defs>
        {Object.entries(ICONS).map(([name, shape]) => (
          <symbol key={name} id={`i-${name}`} viewBox="0 0 24 24">{shape}</symbol>
        ))}
      </defs>
    </svg>
  );
}

// `className` sizes it for where it sits: "icon" in buttons, "tool-icon", "section-icon", "nav-icon".
export function Icon({name, className = "icon"}: {name: IconName; className?: string}) {
  return <svg className={className} aria-hidden="true"><use href={`#i-${name}`}/></svg>;
}
