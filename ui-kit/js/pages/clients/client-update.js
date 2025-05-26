export function initClientUpdate(apiUrl, endpoint, root = document) {
  const form = root.querySelector('form#client-form[data-form-mode="update"]');
  if (!form) return;
  const url = new URL(window.location.href);
  const client_id = url.searchParams.get("id");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {};
    new FormData(form).forEach((value, key) => {
      const input = form.querySelector(`[name="${key}"]`);
      if (!value) return;
      if (input.required === false) return;
      payload[key] = value;
    });

    try {
      const res = await fetch(`${apiUrl}/${endpoint}/${client_id}/edit/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || json.status === "error") {
        throw new Error(json.text || json.message || res.statusText);
      }

      console.log("Клиент обновлен:", json);
      root.querySelector("[data-close]").click();
    } catch (err) {
      console.error("Ошибка при обновлении клиента:", err.message);
    }
  });
}
