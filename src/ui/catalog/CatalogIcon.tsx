import {useState} from "react";
import type {CatalogItem} from "./catalog-items";

// An item's artwork, or its emoji when it has no icon file or the file fails to load.
export function CatalogIcon({item}: {item: CatalogItem}) {
  const [failed, setFailed] = useState(false);
  if (!item.iconPath || failed) return <span className="catalog-icon">{item.emoji}</span>;
  return <img className="catalog-icon" src={item.iconPath} alt="" onError={() => setFailed(true)}/>;
}
