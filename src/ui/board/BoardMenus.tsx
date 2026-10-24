import {ReactNode, useLayoutEffect, useRef, useState} from "react";
import {BoardMenu, hideBoardMenus, openBoardMenu} from "../../features/board-menus";
import {setSelectedLedColor} from "../../features/standard-components/standard-component-actions";
import type {LedColor} from "../../parts/component-definitions";
import {Icon} from "../components/Icon";
import {shallowEqual, useEditor} from "../hooks/use-editor";
import {useClickOutside} from "../hooks/use-click-outside";
import {ACTIONS, availableActions, runSelectionAction, SelectionAction} from "./selection-actions";

// The board's popup menus (src/features/board-menus.ts opens them): the context menu, with what
// can be done to what it was opened on, and the LED colour menu. A click anywhere else closes them.
export function BoardMenus() {
  const menu = useEditor(openBoardMenu);
  if (!menu) return null;
  return menu.kind === "actions" ? <ContextMenu menu={menu}/> : <LedColorMenu menu={menu}/>;
}

// The context menu's order: Start Wire/Solder Path Here only when it was opened on a hole.
const MENU_ORDER: SelectionAction[] = ["rotate", "color", "straighten", "to-bottom", "to-top", "note", "value", "delete"];

function ContextMenu({menu}: {menu: Extract<BoardMenu, {kind: "actions"}>}) {
  const available = useEditor(availableActions, shallowEqual);
  const actions: SelectionAction[] = [...(menu.hole ? ["wire", "solder"] as const : []), ...MENU_ORDER.filter(a => available.includes(a))];
  return (
    <PopupMenu id="contextMenu" x={menu.x} y={menu.y}>
      {actions.map(action => {
        const {icon, menuLabel, key} = ACTIONS[action];
        return (
          <button key={action} data-action={action} className={action === "delete" ? "ctx-danger" : undefined}
            onClick={e => runSelectionAction(action, e.currentTarget, menu.hole)}>
            <Icon name={icon}/>{menuLabel}{key && <kbd>{key}</kbd>}
          </button>
        );
      })}
    </PopupMenu>
  );
}

const LED_COLORS: {color: LedColor | ""; label: string; className?: string}[] = [
  {color: "red", label: "🔴 Red"},
  {color: "green", label: "🟢 Green"},
  {color: "blue", label: "🔵 Blue"},
  {color: "yellow", label: "🟡 Yellow"},
  {color: "rgb", label: "🌈 RGB", className: "led-color-rgb-btn"},
  {color: "", label: "✕ Clear"},
];

function LedColorMenu({menu}: {menu: BoardMenu}) {
  return (
    <PopupMenu id="ledColorMenu" x={menu.x} y={menu.y}>
      {LED_COLORS.map(({color, label, className}) => (
        <button key={label} className={className} onClick={() => {
          setSelectedLedColor(color || undefined);
          hideBoardMenus();
        }}>{label}</button>
      ))}
    </PopupMenu>
  );
}

// A menu at a point on screen, moved left or up as needed to stay on it (a phone's is narrow).
function PopupMenu({id, x, y, children}: {id: string; x: number; y: number; children: ReactNode}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({left: x, top: y});
  useClickOutside([ref], hideBoardMenus);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const margin = 8;
    setPosition({
      left: Math.max(margin, Math.min(x, window.innerWidth - el.offsetWidth - margin)),
      top: Math.max(margin, Math.min(y, window.innerHeight - el.offsetHeight - margin)),
    });
  }, [x, y]);

  return (
    <div id={id} ref={ref} className="context-menu" style={{display: "block", ...position}}>
      {children}
    </div>
  );
}
