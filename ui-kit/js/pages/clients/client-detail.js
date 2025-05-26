import { initClientUpdate } from "./client-update.js";
import { API_URL, CLIENT_PATH } from "../../config.js";
import { initClientForm } from "./client-form.js";

export function initClientDetail(root = document) {
  const viewC = root.querySelector("[data-view]");
  const editC = root.querySelector("[data-edit]");
  if (!viewC || !editC) return;
  const form = editC.querySelector("#client-form");
  const editBtn = root.querySelector("#edit-btn");
  const sbmBtn = root.querySelector("#submit-btn");

  const { updateFields } = initClientForm(root);

  function changeView() {
    viewC.classList.toggle("hidden");
    editBtn.classList.toggle("hidden");
    editC.classList.toggle("hidden");
    sbmBtn.classList.toggle("hidden");
  }

  editBtn.addEventListener("click", () => {
    viewC.querySelectorAll("[data-field]").forEach((fieldEl) => {
      const key = fieldEl.dataset.field;
      const display = fieldEl.querySelector("div").textContent.trim();
      const inputs = Array.from(form.querySelectorAll(`[name="${key}"]`));

      if (!inputs.length) return;

      if (inputs[0].type === "radio") {
        inputs.forEach((radio) => {
          radio.checked = radio.value === display;
        });
      } else {
        const input = inputs[0];
        if (key === "phone") {
          input.value = display.replace(/\D/g, "").slice(1);
        } else {
          input.value = display;
        }
      }
    });
    updateFields();
    changeView();
  });

  sbmBtn.addEventListener("click", () => {
    changeView();
  });

  changePhoneView(root);
  initClientUpdate(API_URL, CLIENT_PATH);
}

function changePhoneView(root) {
  root
    .querySelectorAll('.client-field[data-field="phone"] > div')
    .forEach((el) => {
      const raw = el.textContent.trim();
      const m = raw.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
      if (!m) return;

      const formatted = `+7 (${m[1]}) ${m[2]}-${m[3]}-${m[4]}`;
      el.textContent = formatted;
    });
}
