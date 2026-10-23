import {ReactNode, useState} from "react";
import {Icon, IconName} from "../components/Icon";
import {cx} from "../lib/class-names";

// A collapsible section of the tools sidebar: a title row that folds its body away. It keeps its
// own state unless the parent controls it (`collapsed` and `onToggle`).
interface SidebarSectionProps {
  id?: string;
  bodyId: string;
  icon: IconName;
  title: string;
  // Shown in the title row, before the chevron.
  extra?: ReactNode;
  bodyClassName?: string;
  collapsed?: boolean;
  onToggle?: () => void;
  children: ReactNode;
}

export function SidebarSection({id, bodyId, icon, title, extra, bodyClassName, collapsed, onToggle, children}: SidebarSectionProps) {
  const [ownCollapsed, setOwnCollapsed] = useState(false);
  const isCollapsed = collapsed ?? ownCollapsed;
  const toggle = onToggle ?? (() => setOwnCollapsed(c => !c));
  return (
    <div className="sidebar-section" id={id}>
      <div className={cx("section-title", isCollapsed && "section-collapsed")} data-collapse={bodyId} onClick={toggle}>
        <Icon name={icon} className="section-icon"/>
        <span>{title}</span>
        {extra}
        <span className="collapse-chevron">▾</span>
      </div>
      <div className={cx("section-body", bodyClassName, isCollapsed && "collapsed")} id={bodyId}>
        {children}
      </div>
    </div>
  );
}

// A group of sections under one label (Tools, Build).
export function SidebarGroup({id, icon, title, children}: {id: string; icon: IconName; title: string; children: ReactNode}) {
  return (
    <div className="sidebar-group" id={id}>
      <div className="sidebar-group-title">
        <Icon name={icon} className="section-icon"/>
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}
