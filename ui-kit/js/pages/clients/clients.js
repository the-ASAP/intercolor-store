import { initClientForm } from "./client-form.js";
import { fillClientForm } from "./fill-client-form.js";
import { initClientCreate } from "./client-create.js";
import { API_URL, CLIENT_PATH } from "../../config.js";

export function initClients() {
  initClientForm();
  fillClientForm();
  initClientCreate(API_URL, CLIENT_PATH);
}
