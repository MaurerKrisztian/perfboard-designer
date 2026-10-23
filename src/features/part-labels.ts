import {ViewState} from "../state/ViewState";
import {redrawCanvas} from "./draw-canvas";

// Silkscreen-style labels on the parts (the board bar's Labels button), remembered between visits.

// Named from when the labels showed values only; kept so the remembered preference carries over.
const STORAGE_KEY = 'show_component_values';

export function restorePartLabels() {
  try {
    ViewState.showPartLabels = localStorage.getItem(STORAGE_KEY) === 'true';
  } catch (e) {
    console.error("Failed to load part label visibility from localStorage", e);
  }
}

export function togglePartLabels() {
  ViewState.showPartLabels = !ViewState.showPartLabels;
  try {
    localStorage.setItem(STORAGE_KEY, String(ViewState.showPartLabels));
  } catch (e) {
    console.error("Failed to save part label visibility to localStorage", e);
  }
  redrawCanvas();
}
