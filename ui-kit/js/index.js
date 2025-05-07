import { initSelectors } from "./components/selector.js";
import { initQuantityInputs } from "./components/input.js";
import { initTabs } from "./components/tabs.js";
import { initCardGallery } from "./components/cards.js";
import { initCopyButtons } from "./components/button.js";
import { initCloseButtons } from "./components/button.js";
import { initSideSheets } from "./components/side-sheet.js";

document.addEventListener("DOMContentLoaded", () => {
  initSelectors();
  initQuantityInputs();
  initTabs();
  initCardGallery();
  initCopyButtons();
  initCloseButtons();
  initSideSheets();
});
