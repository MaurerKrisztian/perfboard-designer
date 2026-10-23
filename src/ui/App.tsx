import {useEffect} from "react";
import {startEditor} from "../features/editor";
import {ToolState} from "../state/ToolState";
import {IconSprite} from "./components/Icon";
import {AppHeader} from "./header/AppHeader";
import {ToolRail} from "./sidebar/ToolRail";
import {ToolsSidebar} from "./sidebar/ToolsSidebar";
import {BoardWorkspace} from "./board/BoardWorkspace";
import {BoardMenus} from "./board/BoardMenus";
import {NetsSidebar} from "./nets/NetsSidebar";
import {MobileNav} from "./mobile/MobileNav";
import {Dialogs} from "./dialogs/Dialogs";
import {layoutStore, setFocusMode, setSheet, toggleFocusMode} from "./layout/layout-store";
import {useStore} from "./lib/store";
import {useEditor} from "./hooks/use-editor";
import {usePhoneLayout} from "./hooks/use-media-query";
import {useShortcut} from "./hooks/use-shortcut";
import {cx} from "./lib/class-names";
import {fitToScreen} from "../features/zoom";

// The editor's page: the header, the tool rail, the left panel (parts, wire, board), the board, the
// nets panel, and on a phone the bottom toolbar; the board's menus and the dialogs float over them. The editor core starts once
// the board's canvas is on the page (BoardCanvas attaches it first: children's effects run first).
export function App() {
  useEffect(startEditor, []);
  const focusMode = useStore(layoutStore, layout => layout.focusMode);
  useFocusMode(focusMode);
  usePhoneSheets();

  return (
    <>
      <IconSprite/>
      <AppHeader/>
      <main className={cx("app-layout", focusMode && "fullscreen-mode")} id="mainAppLayout">
        <ToolRail/>
        <ToolsSidebar/>
        <BoardWorkspace/>
        <NetsSidebar/>
      </main>
      <MobileNav/>
      <BoardMenus/>
      <Dialogs/>
    </>
  );
}

// Focus mode shows the board alone: F toggles it, Escape leaves it, and it keeps the board fitted
// to the window as that's resized.
function useFocusMode(on: boolean) {
  useShortcut("f", "Focus on the board.", toggleFocusMode);
  useEffect(() => {
    document.body.classList.toggle("fullscreen-active", on);
    if (!on) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFocusMode(false);
    };
    const onResize = () => fitToScreen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [on]);
}

// On a phone, picking a tool or a part closes the sheet it was picked in, so the next tap lands on
// the board; so does a part armed from elsewhere (saving a new custom module arms it). Turning the
// phone layout on or off closes it too. (Only a phone opens sheets.)
function usePhoneSheets() {
  const phone = usePhoneLayout();
  const tool = useEditor(() => ToolState.active);
  useEffect(() => setSheet(undefined), [phone, tool]);
}
