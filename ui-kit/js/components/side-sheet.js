export function initSideSheets(root = document) {
  const overlay = root.querySelector("[data-overlay]");
  const sheets = root.querySelectorAll("[data-sheet]");

  function openSheet(name) {
    overlay.classList.add("is-open");
    sheets.forEach((s) => {
      s.classList.toggle("is-open", s.dataset.sheet === name);
    });
  }

  function closeSheets() {
    overlay.classList.remove("is-open");
    sheets.forEach((s) => s.classList.remove("is-open"));
  }

  root.querySelectorAll('[data-action="open-detail"]').forEach((btn) => {
    btn.addEventListener("click", () => openSheet("detail"));
  });
  root.querySelectorAll('[data-action="open-filters"]').forEach((btn) => {
    btn.addEventListener("click", () => openSheet("filters"));
  });
  root
    .querySelectorAll('[data-action="open-create--clients"]')
    .forEach((btn) => {
      btn.addEventListener("click", () => openSheet("create--clients"));
    });

  if (overlay) {
    overlay.addEventListener("click", closeSheets);
  }
  root.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", closeSheets);
  });
  return { openSheet, closeSheets };
}
