import {ToolState} from "../../state/ToolState";
import {setActiveTool} from "../../features/active-tool";
import {toggleRouteTool} from "../../features/wire";
import {Icon} from "../components/Icon";
import {useEditor} from "../hooks/use-editor";
import {useStore} from "../lib/store";
import {cx} from "../lib/class-names";
import {layoutStore, setSheet, Sheet, toggleSheet} from "../layout/layout-store";

// The phone layout's toolbar along the bottom (hidden on wider screens): Select, Wire and Solder
// pick a tool; Add, Nets and More slide up a sheet over the board, and the backdrop behind a sheet
// closes it.
export function MobileNav() {
  const tool = useEditor(() => ToolState.active.kind);
  const sheet = useStore(layoutStore, layout => layout.sheet);

  const pickTool = (kind: "select" | "wire" | "solder") => {
    setSheet(undefined);
    if (kind === "select") setActiveTool({kind: "select"});
    else toggleRouteTool(kind);
  };
  const sheetButton = (name: Sheet) => ({className: cx(sheet === name && "active-mode"), onClick: () => toggleSheet(name)});

  return (
    <>
      <nav id="mobileNav" className="mobile-nav" aria-label="Board tools">
        <button className={cx(tool === "select" && "active-mode")} onClick={() => pickTool("select")}>
          <Icon name="select" className="nav-icon"/><span>Select</span>
        </button>
        <button className={cx(tool === "wire" && "active-mode")} onClick={() => pickTool("wire")}>
          <Icon name="wire" className="nav-icon"/><span>Wire</span>
        </button>
        <button className={cx(tool === "solder" && "active-mode")} onClick={() => pickTool("solder")}>
          <Icon name="solder-path" className="nav-icon"/><span>Solder</span>
        </button>
        <button {...sheetButton("add")} className={cx("nav-add", sheet === "add" && "active-mode")} aria-label="Add a part">
          <span className="nav-add-disc"><Icon name="plus" className="nav-icon"/></span><span>Add</span>
        </button>
        <button {...sheetButton("nets")}><Icon name="nets" className="nav-icon"/><span>Nets</span></button>
        <button {...sheetButton("more")}><Icon name="more" className="nav-icon"/><span>More</span></button>
      </nav>
      <div id="sheetBackdrop" className="sheet-backdrop" hidden={!sheet} onClick={() => setSheet(undefined)}/>
    </>
  );
}
