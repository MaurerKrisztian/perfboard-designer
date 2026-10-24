import {ReactNode} from "react";
import {CatalogCategory, getChildCategories} from "../../parts/catalog-categories";
import {getRecentKeys} from "../../features/catalog/recent-components";
import {cx} from "../lib/class-names";
import type {CatalogItem} from "./catalog-items";
import {CatalogItemRow, depthStyle} from "./CatalogItemRow";

// The catalog as a tree: the top-level actions (Custom…), the parts placed most recently, then each
// category with its subcategories first and its own parts after. Empty categories are left out.

// Shares the collapsed-categories store; not a real category, so it can't clash with one.
export const RECENT_NODE_ID = "recent";

interface CatalogTreeProps {
  items: CatalogItem[];
  collapsed: Set<string>;
  onToggleCategory: (id: string) => void;
}

export function CatalogTree({items, collapsed, onToggleCategory}: CatalogTreeProps) {
  const byKey = new Map(items.map(item => [item.key, item]));
  const recent = getRecentKeys().map(key => byKey.get(key)).filter((item): item is CatalogItem => item !== undefined);

  const categoryNode = (category: CatalogCategory, depth: number): {node: ReactNode; count: number} | undefined => {
    const children = getChildCategories(category.id)
      .map(child => categoryNode(child, depth + 1))
      .filter((child): child is {node: ReactNode; count: number} => child !== undefined);
    const own = items.filter(item => item.categoryId === category.id);
    if (!children.length && !own.length) return undefined;
    const count = children.reduce((sum, child) => sum + child.count, 0) + own.filter(item => !item.isAction).length;
    return {
      count,
      node: (
        <CategoryNode key={category.id} id={category.id} depth={depth} icon={category.icon} name={category.name} count={count}
          collapsed={collapsed.has(category.id)} onToggle={onToggleCategory}>
          {children.map(child => child.node)}
          {own.map(item => <CatalogItemRow key={item.key} item={item} depth={depth + 1}/>)}
        </CategoryNode>
      ),
    };
  };

  return (
    <>
      {items.filter(item => !item.categoryId).map(item => <CatalogItemRow key={item.key} item={item} depth={0}/>)}
      {recent.length > 0 && (
        <CategoryNode id={RECENT_NODE_ID} depth={0} icon="🕘" name="Recently used…" count={recent.length}
          collapsed={collapsed.has(RECENT_NODE_ID)} onToggle={onToggleCategory}>
          {recent.map(item => <CatalogItemRow key={item.key} item={item} depth={1}/>)}
        </CategoryNode>
      )}
      {getChildCategories().map(category => categoryNode(category, 0)?.node)}
    </>
  );
}

interface CategoryNodeProps {
  id: string;
  depth: number;
  icon?: string;
  name: string;
  count: number;
  collapsed: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
}

function CategoryNode({id, depth, icon, name, count, collapsed, onToggle, children}: CategoryNodeProps) {
  return (
    <div className={cx("catalog-category", collapsed && "collapsed")} data-category-id={id}>
      <button type="button" className="catalog-row catalog-category-row" style={depthStyle(depth)} onClick={() => onToggle(id)}>
        <span className="catalog-chevron">▾</span>
        {icon && <span className="catalog-icon">{icon}</span>}
        <span className="catalog-name">{name}</span>
        {count > 0 && <span className="catalog-count">{count}</span>}
      </button>
      <div className="catalog-children">{children}</div>
    </div>
  );
}
