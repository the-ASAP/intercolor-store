import { initSelectors } from "./components/selector.js";
import { initQuantityInputs } from "./components/input.js";

document.addEventListener("DOMContentLoaded", () => {
  initSelectors();
  initQuantityInputs();
});
