const INDIVIDUAL_TYPES = new Set([
  "Физическое лицо",
  "Индивидуальный предприниматель",
]);
const INN_LEN = { IND: 12, LEG: 10 };

export function initClientForm(root = document) {
  const form = root.querySelector("#client-form");
  if (!form) return;
  const innIn = form.querySelector("#inn-input");
  const fields = {
    kpp: form.querySelector("#kpp-input"),
    shortCompany: form.querySelector("#shortcompanyname-input"),
    fullCompany: form.querySelector("#fullcompanyname-input"),
    fullPerson: form.querySelector("#fullname-input"),
  };

  const typeToFields = {
    "Физическое лицо": ["fullPerson"],
    "Индивидуальный предприниматель": ["fullPerson"],
    "Юридическое лицо": ["kpp", "shortCompany", "fullCompany"],
    "Обособленное подразделение юр.лица": [
      "kpp",
      "shortCompany",
      "fullCompany",
    ],
    "Юридическое лицо (нерезидент)": ["kpp", "shortCompany", "fullCompany"],
  };

  function updateFields() {
    const sel = form.querySelector('input[name="client_type"]:checked').value;
    const show = typeToFields[sel] || [];

    Object.entries(fields).forEach(([key, input]) => {
      const container = input.closest(".input-container");
      const isVisible = show.includes(key);
      container.classList.toggle("hidden", !isVisible);
      input.required = isVisible;
    });

    innIn.maxLength = INDIVIDUAL_TYPES.has(sel) ? INN_LEN.IND : INN_LEN.LEG;
  }

  const radios = Array.from(form.querySelectorAll('input[name="client_type"]'));
  radios.forEach((r) =>
    r.addEventListener("change", () => {
      updateFields();
      innIn.value = "";
      Object.entries(fields).forEach(([, input]) => {
        input.value = "";
      });
    })
  );
  updateFields();

  return { updateFields };
}
