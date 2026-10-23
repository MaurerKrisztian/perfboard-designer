import type {CSSProperties} from "react";
import {askConfirm} from "../../features/ask-dialog";
import {cx} from "../lib/class-names";
import type {CatalogItem} from "./catalog-items";
import {CatalogIcon} from "./CatalogIcon";

// Indents a catalog row by its depth in the tree (style.css reads --depth).
export const depthStyle = (depth: number) => ({"--depth": depth}) as CSSProperties;

// A part in the tree: its button arms it for placing (or runs the action), plus edit and delete for
// the user's own parts. Highlighted while it's the part armed.
export function CatalogItemRow({item, depth}: {item: CatalogItem; depth: number}) {
  const {edit, remove} = item;
  const confirmRemove = async () => {
    if (await askConfirm("Delete custom part?", `"${item.name}" will be removed from your parts.`, "Delete", true)) remove?.();
  };
  return (
    <div className="catalog-item">
      <button type="button" style={depthStyle(depth)} onClick={() => item.activate()}
        className={cx("catalog-row catalog-item-btn", item.isAction && "catalog-action", item.isArmed() && "active-mode")}>
        <CatalogIcon item={item}/>
        <span className="catalog-name">{item.name}</span>
      </button>
      {edit && <button type="button" className="catalog-edit-btn" title="Edit custom part" onClick={() => edit()}>✎</button>}
      {remove && <button type="button" className="catalog-delete-btn" title="Delete custom part" onClick={() => void confirmRemove()}>✕</button>}
    </div>
  );
}
