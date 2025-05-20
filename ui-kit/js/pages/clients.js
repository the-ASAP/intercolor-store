import { initClientForm } from "../components/client-form.js";
import { initInnLookup } from "../components/inn-lookup.js";

export function initClients() {
  initClientForm();
  initInnLookup("2276279f2a257eadf5ffe59a102440b815890010");
}
