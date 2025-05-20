import { initSelectors } from "./components/selector.js";
import { initQuantityInputs } from "./components/input.js";
import { initTabs } from "./components/tabs.js";
import { initCardGallery } from "./components/cards.js";
import { initCopyButtons } from "./components/button.js";
import { initCloseButtons } from "./components/button.js";
import { initSideSheets } from "./components/side-sheet.js";
import { initAuth } from "./pages/auth.js";
import { initSidebar } from "./components/sidebar.js";
import {
  API_URL,
  AUTH_PATH,
  CATALOG_PATH,
  CATALOG_FILTERED_PATH,
} from "./config.js";
import { initAllCategories } from "./pages/all_categories.js";
import { initClients } from "./pages/clients.js";

document.addEventListener("DOMContentLoaded", () => {
  initAuth(API_URL, AUTH_PATH);
  initAllCategories(API_URL, CATALOG_PATH);
  initClients();
  initSelectors();
  initQuantityInputs();
  initTabs();
  initCardGallery();
  initCopyButtons();
  initCloseButtons();
  initSideSheets();
  initSidebar();
});
