import {ReactNode, useState} from "react";
import {Icon, IconName} from "../components/Icon";
import {cx} from "../lib/class-names";

// A collapsible section of the left panel: a title row that folds its body away. It keeps its own
// state unless the parent controls it (`collapsed` and `onToggle`).
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
    <section className={cx("sidebar-section", isCollapsed && "is-collapsed")} id={id}>
      <button type="button" className="section-title" aria-expanded={!isCollapsed} aria-controls={bodyId} onClick={toggle}>
        <Icon name={icon} className="section-icon"/>
        <span>{title}</span>
        {extra}
        <span className="collapse-chevron" aria-hidden="true">▾</span>
      </button>
      <div className={cx("section-body", bodyClassName)} id={bodyId} hidden={isCollapsed}>
        {children}
      </div>
    </section>
  );
}
