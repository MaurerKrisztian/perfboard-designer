import {KeyboardEvent, useEffect, useMemo, useRef, useState} from "react";
import {CatalogCategory, getCategoryPath} from "../../parts/catalog-categories";
import {ToolState} from "../../state/ToolState";
import {useEditor} from "../hooks/use-editor";
import {useShortcut} from "../hooks/use-shortcut";
import {SidebarSection} from "../sidebar/SidebarSection";
import {catalogItems} from "./catalog-items";
import {CatalogSearchResult, searchCatalog} from "./catalog-search";
import {loadCollapsedCategories, saveCollapsedCategories} from "./collapsed-categories";
import {CatalogTree} from "./CatalogTree";
import {CatalogResults} from "./CatalogResults";

// The left panel's Parts section: a search box over a category tree. While the box has a query,
// the tree is swapped for a flat list of ranked results. It only decides where parts are listed;
// each item knows how to arm its part (catalog-items.ts).

export function ComponentsSection() {
  // Rebuilt when what's listed changes (custom parts come and go, recently used moves on). Each item
  // knows whether it's armed: re-rendering when the active tool changes keeps that highlighted.
  const items = useEditor(catalogItems);
  useEditor(() => ToolState.active);

  const [sectionCollapsed, setSectionCollapsed] = useState(false);
  const [collapsed, setCollapsed] = useState(loadCollapsedCategories);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [reveal, setReveal] = useState<{id: string; at: number}>();
  const search = useRef<HTMLInputElement>(null);
  const tree = useRef<HTMLDivElement>(null);

  const searching = query.trim() !== "";
  const results = useMemo(() => searching ? searchCatalog(query, items) : [], [searching, query, items]);

  const updateCollapsed = (change: (set: Set<string>) => void) => {
    setCollapsed(previous => {
      const next = new Set(previous);
      change(next);
      saveCollapsedCategories(next);
      return next;
    });
  };
  const toggleCategory = (id: string) => updateCollapsed(set => set.has(id) ? set.delete(id) : set.add(id));

  const changeQuery = (text: string) => {
    setQuery(text);
    setActiveIndex(0);
  };

  // Clears the search and scrolls the tree to a category, unfolding it and its ancestors.
  const revealCategory = (id: CatalogCategory["id"]) => {
    changeQuery("");
    setSectionCollapsed(false);
    updateCollapsed(set => getCategoryPath(id).forEach(category => set.delete(category.id)));
    setReveal({id, at: Date.now()});
  };

  // Once it's unfolded and shown: scrolled to, and flashed (restarting a flash still running).
  useEffect(() => {
    if (!reveal) return;
    const header = tree.current?.querySelector<HTMLElement>(`.catalog-category[data-category-id="${reveal.id}"] > .catalog-category-row`);
    if (!header) return;
    header.scrollIntoView({block: "nearest", behavior: "smooth"});
    header.classList.remove("catalog-flash");
    void header.offsetWidth;
    header.classList.add("catalog-flash");
  }, [reveal]);

  const pick = (result: CatalogSearchResult) => {
    if (result.type === "category") {
      revealCategory(result.category.id);
      return;
    }
    // Hand the keyboard back to the board's shortcuts (R to rotate, Esc to cancel...), which
    // ignore keys while the search box has focus.
    search.current?.blur();
    result.item.activate();
  };

  const onSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!results.length) return;
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActiveIndex(index => (index + step + results.length) % results.length);
    } else if (e.key === "Enter") {
      const result = results[activeIndex];
      if (!result) return;
      e.preventDefault();
      pick(result);
    } else if (e.key === "Escape") {
      // Escape stays in the search box rather than also stepping back on the board.
      e.stopPropagation();
      if (query) changeQuery("");
      else search.current?.blur();
    }
  };

  useShortcut("/", "Search components.", e => {
    // Otherwise the "/" lands in the search box once it has focus.
    e.preventDefault();
    setSectionCollapsed(false);
    search.current?.focus();
    search.current?.select();
  });

  return (
    <SidebarSection id="components" bodyId="componentsSection" icon="chip" title="Parts" bodyClassName="catalog-section-body"
      collapsed={sectionCollapsed} onToggle={() => setSectionCollapsed(c => !c)}>
      <div className="catalog-search-box">
        <input type="search" id="catalogSearch" className="catalog-search" placeholder="Search parts" aria-label="Search parts" autoComplete="off"
          spellCheck={false} ref={search} value={query} onChange={e => changeQuery(e.target.value)} onKeyDown={onSearchKey}/>
        {!query && <kbd className="catalog-search-key" title="Press / to search">/</kbd>}
      </div>
      {searching && <CatalogResults query={query} results={results} activeIndex={activeIndex} onHover={setActiveIndex} onPick={pick}/>}
      <div id="catalog-tree" className="catalog-tree" ref={tree} hidden={searching}>
        <CatalogTree items={items} collapsed={collapsed} onToggleCategory={toggleCategory}/>
      </div>
    </SidebarSection>
  );
}
