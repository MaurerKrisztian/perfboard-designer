import {useEffect, useRef} from "react";
import {getCategoryPath} from "../../parts/catalog-categories";
import {cx} from "../lib/class-names";
import type {CatalogSearchResult} from "./catalog-search";
import {CatalogIcon} from "./CatalogIcon";

// The search results, ranked: parts and categories, each with where it sits in the tree. The
// active one (arrow keys, or the pointer) is the one Enter picks.

interface CatalogResultsProps {
  query: string;
  results: CatalogSearchResult[];
  activeIndex: number;
  onHover: (index: number) => void;
  onPick: (result: CatalogSearchResult) => void;
}

export function CatalogResults({query, results, activeIndex, onHover, onPick}: CatalogResultsProps) {
  const list = useRef<HTMLDivElement>(null);

  // Keeps the active result in sight as the arrow keys move it.
  useEffect(() => {
    list.current?.querySelector(".catalog-result-active")?.scrollIntoView({block: "nearest"});
  }, [activeIndex, results]);

  return (
    <div id="catalog-results" className="catalog-results" ref={list}>
      {results.length === 0 && <span className="catalog-empty">No components match "{query.trim()}"</span>}
      {results.map((result, index) => (
        <button key={result.type === "item" ? result.item.key : `category:${result.category.id}`} type="button"
          className={cx("catalog-row catalog-result-row", index === activeIndex && "catalog-result-active",
            result.type === "item" && result.item.isArmed() && "active-mode")}
          onClick={() => onPick(result)} onMouseEnter={() => onHover(index)}>
          {result.type === "item" ? <CatalogIcon item={result.item}/> : <span className="catalog-icon">{result.category.icon ?? "📁"}</span>}
          <span className="catalog-result-text">
            <span className="catalog-name">{result.type === "item" ? result.item.name : result.category.name}</span>
            <span className="catalog-breadcrumb">{breadcrumb(result)}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

function breadcrumb(result: CatalogSearchResult): string {
  if (result.type === "item") {
    const {categoryId} = result.item;
    return categoryId ? getCategoryPath(categoryId).map(c => c.name).join(" › ") : "Create your own part";
  }
  const parentPath = getCategoryPath(result.category.id).slice(0, -1).map(c => c.name).join(" › ");
  return parentPath ? `Category in ${parentPath}` : "Category";
}
