import { checkInn } from "../../helpers/check-inn.js";

import { DADATA_API_KEY } from "../../config.js";

export function fillClientForm(root = document) {
  const innIn = root.querySelector("#inn-input");
  const kppIn = root.querySelector("#kpp-input");
  const shortCompanyIn = root.querySelector("#shortcompanyname-input");
  const fullCompanyIn = root.querySelector("#fullcompanyname-input");
  const fullPersonIn = root.querySelector("#fullname-input");
  if (!innIn || !kppIn || !shortCompanyIn || !fullCompanyIn || !fullPersonIn)
    return;

  let timer;
  let type;
  innIn.addEventListener("input", () => {
    clearTimeout(timer);
    const inn = innIn.value.trim();
    if (inn.length === 10 || inn.length === 12) {
      if (inn.length === 10) {
        type = "LEGAL";
      }
      if (inn.length === 12) {
        type = "INDIVIDUAL";
      }
      timer = setTimeout(() => fill(inn, type), 300);
    }
  });

  async function fill(inn, type) {
    const allData = await checkInn(DADATA_API_KEY, inn, "MAIN", type);
    const data = allData[0]?.data;
    if (!data) return;

    if (data.type === "LEGAL") {
      fullCompanyIn.value = data.name.full_with_opf || "";
      shortCompanyIn.value = data.name.short_with_opf || "";
      kppIn.value = data.kpp || "";
    } else {
      fullPersonIn.value = [
        data.fio.surname,
        data.fio.name,
        data.fio.patronymic,
      ]
        .filter(Boolean)
        .join(" ");
    }
  }
}
