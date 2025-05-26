import {
  initSelectors,
  initQuantityInputs,
  initTabs,
  initCardGallery,
  initCopyButtons,
  initCloseButtons,
  initSideSheets,
  initSidebar,
} from "./components/index.js";

import { API_URL, AUTH_PATH, CATALOG_PATH } from "./config.js";

import { initAuth } from "./pages/auth/auth.js";
import { initAllCategories } from "./pages/catalog/all-categories.js";
import { initClients } from "./pages/clients/clients.js";
import { initClientDetail } from "./pages/clients/client-detail.js";

document.addEventListener("DOMContentLoaded", () => {
  initAuth(API_URL, AUTH_PATH);
  initAllCategories(API_URL, CATALOG_PATH);
  initClientDetail();
  initClients();
  initSelectors();
  initQuantityInputs();
  initTabs();
  initCardGallery();
  initCloseButtons();
  initSideSheets();
  initSidebar();
});
