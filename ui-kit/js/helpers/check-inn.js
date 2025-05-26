export async function checkInn(apiKey, queryInn, branchType, innType) {
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
      branch_type: branchType,
      type: innType,
    }),
  };

  try {
    const r = await fetch(url, opts);
    const { suggestions } = await (r.ok
      ? r.json()
      : Promise.reject(r.statusText));
    return suggestions;
  } catch (err) {
    return console.error("DaData error:", err);
  }
}
