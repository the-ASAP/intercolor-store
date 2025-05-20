const INDIVIDUAL_TYPES = new Set([
  "Физическое лицо",
  "Индивидуальный предприниматель",
]);
const INN_LEN = { IND: 12, LEG: 10 };

export function initClientForm(root = document) {
  const form = root.querySelector("#client-form");
  const innIn = form.querySelector("#inn-input");
  const fields = {
    kpp: form.querySelector("#kpp-input"),
    abbrName: form.querySelector("#abbrName-input"),
    businessName: form.querySelector("#businessName-input"),
    fullName: form.querySelector("#fullName-input"),
  };

  const typeToFields = {
    "Физическое лицо": ["fullName"],
    "Индивидуальный предприниматель": ["fullName"],
    "Юридическое лицо": ["kpp", "abbrName", "businessName"],
    "Обособленное подразделение юр.лица": ["kpp", "abbrName", "businessName"],
    "Юридическое лицо (нерезидент)": ["kpp", "abbrName", "businessName"],
  };

  function updateFields() {
    const sel = form.querySelector('input[name="client_type"]:checked').value;
    const show = typeToFields[sel] || [];

    Object.entries(fields).forEach(([key, input]) => {
      const container = input.closest(".input-container");
      if (show.includes(key)) {
        container.style.display = "";
        input.required = true;
      } else {
        container.style.display = "none";
        input.required = false;
        input.value = "";
      }
    });

    innIn.maxLength = INDIVIDUAL_TYPES.has(sel) ? INN_LEN.IND : INN_LEN.LEG;
  }

  const radios = Array.from(form.querySelectorAll('input[name="client_type"]'));
  radios.forEach((r) => r.addEventListener("change", updateFields));
  updateFields();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    console.log("Form submitted:", payload);
  });
}
