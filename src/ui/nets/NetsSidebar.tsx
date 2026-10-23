import {layoutStore, setSheet} from "../layout/layout-store";
import {useStore} from "../lib/store";
import {cx} from "../lib/class-names";
import {NetsPanel} from "./NetsPanel";
import {ShortcutsLegend} from "./ShortcutsLegend";

// The right sidebar: the board's nets, then the keyboard shortcuts. On a phone it's the Nets sheet.
export function NetsSidebar() {
  const shown = useStore(layoutStore, layout => layout.sidebars.nets);
  const sheetOpen = useStore(layoutStore, layout => layout.sheet === "nets");
  return (
    <aside id="shortcutsPanel" className={cx("right-sidebar tool-panel", !shown && "sidebar-collapsed", sheetOpen && "sheet-open")}>
      <div className="sheet-header">
        <span/>
        <button className="sheet-close" aria-label="Close" onClick={() => setSheet(undefined)}>✕</button>
      </div>
      <NetsPanel/>
      <div className="shortcuts-section">
        <div className="section-title">Keyboard Shortcuts</div>
        <ShortcutsLegend/>
      </div>
    </aside>
  );
}
