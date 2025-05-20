export function initInnLookup(apiKey, root = document) {
  const innIn = root.querySelector("#inn-input");
  const kppIn = root.querySelector("#kpp-input");
  const abbrIn = root.querySelector("#abbrName-input");
  const bizIn = root.querySelector("#businessName-input");
  const nameIn = root.querySelector("#fullName-input");
  if (!innIn) return;

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
      timer = setTimeout(() => fetchParty(inn, type), 300);
    }
  });

  function fetchParty(queryInn, innType) {
    const url =
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
    const opts = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + apiKey,
      },
      body: JSON.stringify({
        query: queryInn,
        branch_type: "MAIN",
        type: innType,
      }),
    };

    fetch(url, opts)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then(({ suggestions }) => {
        const d = suggestions[0]?.data;
        if (!d) return;

        if (d.type === "LEGAL") {
          bizIn.value = d.name.full_with_opf || "";
          abbrIn.value = d.name.short_with_opf || "";
          kppIn.value = d.kpp || "";
        } else {
          nameIn.value = [d.fio.surname, d.fio.name, d.fio.patronymic]
            .filter(Boolean)
            .join(" ");
        }
      })
      .catch((err) => console.error("DaData error:", err));
  }
}
