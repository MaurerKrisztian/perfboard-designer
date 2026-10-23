import {useEffect, useRef} from "react";
import {layoutStore, setSheet} from "../layout/layout-store";
import {useStore} from "../lib/store";
import {cx} from "../lib/class-names";
import {SidebarGroup} from "./SidebarSection";
import {ToolModes} from "./ToolModes";
import {BoardSection} from "./BoardSection";
import {WireSection} from "./wire/WireSection";
import {ComponentsSection} from "../catalog/ComponentsSection";

// The left sidebar: the tool modes and the board (Tools), then wires and the parts catalog
// (Build). On a phone it's a sheet over the board, opened by Add (the catalog alone) or More
// (everything else); the stylesheet shows the right half by its data-view.

const SHEET_TITLES = {add: "Add a part", more: "Tools & board"};

export function ToolsSidebar() {
  const shown = useStore(layoutStore, layout => layout.sidebars.tools);
  const sheet = useStore(layoutStore, layout => layout.sheet);
  const view = useStore(layoutStore, layout => layout.controlsView);
  const sheetOpen = sheet === "add" || sheet === "more";
  const aside = useRef<HTMLElement>(null);

  // Each sheet opens at its top.
  useEffect(() => {
    if (sheetOpen && aside.current) aside.current.scrollTop = 0;
  }, [sheet, sheetOpen]);

  return (
    <aside id="controls" ref={aside} data-view={view}
      className={cx("tool-panel sidebar-scroll", !shown && "sidebar-collapsed", sheetOpen && "sheet-open")}>
      <div className="sheet-header">
        <span id="controlsSheetTitle">{view ? SHEET_TITLES[view] : "Tools & Board"}</span>
        <button className="sheet-close" aria-label="Close" onClick={() => setSheet(undefined)}>✕</button>
      </div>

      <SidebarGroup id="toolsGroup" icon="tools" title="Tools">
        <ToolModes/>
        <div className="sidebar-divider"/>
        <BoardSection/>
      </SidebarGroup>

      <div className="sidebar-divider sidebar-group-divider"/>

      <SidebarGroup id="buildGroup" icon="build" title="Build">
        <WireSection/>
        <div className="sidebar-divider"/>
        <ComponentsSection/>
      </SidebarGroup>
    </aside>
  );
}
