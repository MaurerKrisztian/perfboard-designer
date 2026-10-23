import {useEffect, useRef} from "react";
import {layoutStore, setSheet} from "../layout/layout-store";
import {useStore} from "../lib/store";
import {cx} from "../lib/class-names";
import {usePhoneLayout} from "../hooks/use-media-query";
import {ToolModes} from "./ToolModes";
import {BoardSection} from "./BoardSection";
import {WireSection} from "./wire/WireSection";
import {ComponentsSection} from "../catalog/ComponentsSection";

// The left panel: the parts to add, then how new wires look, then the board itself. On a phone
// it's a sheet over the board, opened by Add (the parts alone) or More (the tool modes, wires and
// board, as the bottom toolbar has no room for them); the stylesheet shows the right part by its
// data-view.

const SHEET_TITLES = {add: "Add a part", more: "Tools and board"};

export function ToolsSidebar() {
  const shown = useStore(layoutStore, layout => layout.sidebars.tools);
  const sheet = useStore(layoutStore, layout => layout.sheet);
  const view = useStore(layoutStore, layout => layout.controlsView);
  const phone = usePhoneLayout();
  const sheetOpen = sheet === "add" || sheet === "more";
  const aside = useRef<HTMLElement>(null);

  // Each sheet opens at its top.
  useEffect(() => {
    if (sheetOpen && aside.current) aside.current.scrollTop = 0;
  }, [sheet, sheetOpen]);

  return (
    <aside id="controls" ref={aside} data-view={view}
      className={cx("tool-panel", !shown && "sidebar-collapsed", sheetOpen && "sheet-open")}>
      <div className="sheet-header">
        <span id="controlsSheetTitle">{view ? SHEET_TITLES[view] : "Tools and board"}</span>
        <button className="sheet-close" aria-label="Close" onClick={() => setSheet(undefined)}>✕</button>
      </div>
      {phone && <ToolModes/>}
      <ComponentsSection/>
      <WireSection/>
      <BoardSection/>
    </aside>
  );
}
