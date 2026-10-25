import {Icon} from "../components/Icon";
import {Menu, MenuBar, MenuCheckbox, MenuControl, MenuDivider, MenuItem, MenuLink} from "./Menu";
import {ProjectNameButton} from "./ProjectNameButton";
import {openDialog} from "../dialogs/dialog-store";
import {openProjectsDialog} from "../dialogs/ProjectsDialog";
import {layoutStore, toggleFocusMode, toggleSidebar} from "../layout/layout-store";
import {useStore} from "../lib/store";
import {pickFile} from "../lib/pick-file";
import {open3dView} from "../../features/open-3d-view";
import {saveProjectToFile} from "../../features/project/save-project";
import {downloadAsImage, downloadAsSvg} from "../../features/project/save-image";
import {importProjectFile} from "../../features/project/current-project";
import {exportCustomParts, importCustomParts} from "../../features/project/custom-parts-library";
import {hasConsentSettings, openConsentSettings} from "../lib/consent-settings";

// Picks a project file and opens it as a new project, named after the file.
export async function importProjectFromFile() {
  const file = await pickFile();
  if (file) importProjectFile(await file.text(), file.name);
}

async function importPartsFromFile() {
  const file = await pickFile(".json,application/json");
  if (file) await importCustomParts(file);
}

export function AppHeader() {
  return (
    <header className="app-header">
      <a className="brand-logo" href="../" title="Back to the Perfboard Designer home page">
        {/* A copper pad, the ring a lead is soldered to, with the shine of fresh solder. */}
        <svg className="brand-mark" viewBox="0 0 28 28" aria-hidden="true">
          <circle cx="14" cy="14" r="11" className="brand-mark-copper"/>
          <path d="M6.5 10.5a8.5 8.5 0 0 1 6-5.6" className="brand-mark-shine"/>
          <circle cx="14" cy="14" r="4.5" className="brand-mark-hole"/>
        </svg>
        <span className="brand-title">Perfboard Designer</span>
      </a>

      <MenuBar>
        {menu => (
          <>
            <Menu label="File" control={menu}>
              <MenuItem onClick={() => openProjectsDialog(true)}>New Project...</MenuItem>
              <MenuItem onClick={() => openProjectsDialog(false)}>Open Project...</MenuItem>
              <MenuItem onClick={() => void importProjectFromFile()}>Import Project from File...</MenuItem>
              <MenuDivider/>
              <MenuItem onClick={saveProjectToFile}>Save Project to File...</MenuItem>
              <MenuItem onClick={() => openDialog({kind: "share"})}>Share Link...</MenuItem>
              <MenuDivider/>
              <MenuItem onClick={() => void downloadAsImage()}>Download Image</MenuItem>
              <MenuItem onClick={() => void downloadAsSvg()}>Download SVG</MenuItem>
              <MenuDivider/>
              <MenuItem onClick={() => openDialog({kind: "part-list"})}>Component List...</MenuItem>
              <MenuDivider/>
              <MenuItem onClick={() => void exportCustomParts()}>Export Custom Parts...</MenuItem>
              <MenuItem onClick={() => void importPartsFromFile()}>Import Custom Parts...</MenuItem>
            </Menu>
            <ViewMenu control={menu}/>
            <Menu label="Help" control={menu}>
              <MenuLink href="../guide/">User Guide</MenuLink>
              <MenuLink href="../mcp-server/">Design with AI (MCP)</MenuLink>
              <MenuDivider/>
              <MenuLink href="https://github.com/MaurerKrisztian/perfboard-designer/issues">Report a Bug</MenuLink>
              {hasConsentSettings() && <MenuItem onClick={openConsentSettings}>Cookie Settings...</MenuItem>}
            </Menu>
            <ProjectNameButton/>
          </>
        )}
      </MenuBar>

      <div className="header-actions">
        <button className="btn btn-quiet" title="Copy a link that opens a copy of this board" onClick={() => openDialog({kind: "share"})}>
          <Icon name="link"/><span className="btn-label">Share</span>
        </button>
        <button id="open3dViewBtn" className="btn-accent" title="See the board in 3D" onClick={() => void open3dView()}>
          <Icon name="cube"/><span className="btn-label">3D view</span>
        </button>
      </div>
    </header>
  );
}

function ViewMenu({control}: {control: MenuControl}) {
  const {sidebars, focusMode} = useStore(layoutStore, layout => layout);
  return (
    <Menu label="View" control={control}>
      <MenuItem id="toggleFullscreenBtn" onClick={toggleFocusMode}>{focusMode ? "Exit Fullscreen" : "Fullscreen"}</MenuItem>
      <MenuItem onClick={() => void open3dView()}>3D View</MenuItem>
      <MenuDivider/>
      <MenuCheckbox id="toggleSidebarBtn" checked={sidebars.tools} onClick={() => toggleSidebar("tools")}>Tools Sidebar</MenuCheckbox>
      <MenuCheckbox id="toggleShortcutsBtn" checked={sidebars.nets} onClick={() => toggleSidebar("nets")}>Nets &amp; Shortcuts</MenuCheckbox>
    </Menu>
  );
}
