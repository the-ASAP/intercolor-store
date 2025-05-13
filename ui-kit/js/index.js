import { initSelectors } from "./components/selector.js";
import { initQuantityInputs } from "./components/input.js";
import { initTabs } from "./components/tabs.js";
import { initCardGallery } from "./components/cards.js";
import { initCopyButtons } from "./components/button.js";
import { initCloseButtons } from "./components/button.js";
import { initSideSheets } from "./components/side-sheet.js";
import { initAuth } from "./pages/auth.js";
import { initSidebar } from "./components/sidebar.js";
import { API_URL, AUTH_PATH } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  initSelectors();
  initQuantityInputs();
  initTabs();
  initCardGallery();
  initCopyButtons();
  initCloseButtons();
  initSideSheets();
  initAuth(API_URL, AUTH_PATH);
  initSidebar();
});
