import { initCopyButtons } from "../../components/button.js";

export function initAllCategories(apiUrl, endpoint, root = document) {
  const catsEl = root.querySelector("[data-all-categories-cats]");
  const subcatsEl = root.querySelector("[data-all-categories-subcats]");
  const searchIn = root.querySelector(".input-search");
  if (!catsEl || !subcatsEl || !searchIn) return;

  let searchTimer;
  searchIn.addEventListener("input", () => {
    clearTimeout(searchTimer);
    const q = searchIn.value.trim();
    searchTimer = setTimeout(() => {
      !q ? loadSections() : loadSections(q);
    }, 300);
  });

  function loadSections(param = null) {
    fetch(
      param
        ? `${apiUrl}/${endpoint}/section/${encodeURIComponent(param)}/filter/`
        : `${apiUrl}/${endpoint}/`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "error") {
          return;
        }
        renderCategories(data.sections);
      })
      .catch((err) => console.error(err));
  }

  function renderCategories(sections) {
    catsEl.innerHTML = "";

    const top = Object.values(sections).filter((s) => s.depth_level === "1");
    top.forEach((group) => {
      const hdr = document.createElement("label");
      hdr.className = "input-label";
      hdr.textContent = group.name;
      catsEl.append(hdr);

      const ul = document.createElement("ul");
      ul.className = "all-categories__categories-list";

      (group.sections || []).forEach((cat) => {
        const li = document.createElement("li");
        li.className = "all-categories__category-item category-item";
        li.dataset.id = cat.id;
        li.innerHTML = `
          <h2>${cat.name}</h2>
          <div class="category-item__sku">
            <span class="caption">ID ${cat.id}</span>
            <button class="btn btn--icon-only copy-btn">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 18H18C19.1046 18 20 17.1046 20 16V5C20 3.89543 19.1046 3 18 3H9C7.89543 3 7 3.89543 7 5V7"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.3593 9.47041L13.5296 7.6407C13.1194 7.23047 12.563 7 11.9828 7H6C4.89543 7 4 7.89543 4 9V19C4 20.1046 4.89543 21 6 21H14C15.1046 21 16 20.1046 16 19V11.0172C16 10.437 15.7695 9.88065 15.3593 9.47041Z"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 11.5H13C12.1716 11.5 11.5 10.8284 11.5 10V7"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
          </div>
        `;

        li.addEventListener("mouseenter", () => renderSubcats(cat));
        ul.appendChild(li);
      });

      catsEl.append(ul);
    });

    initCopyButtons();
  }

  function renderSubcats(cat) {
    subcatsEl.innerHTML = "";
    if (!cat.sections) return;
    const ul = document.createElement("ul");
    ul.className = "all-categories__subcategories-list";

    cat.sections.forEach((sub) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="/${sub.id}" class="all-categories__subcategory no-underline">
          ${sub.name}
        </a>
      `;
      ul.appendChild(li);
    });
    subcatsEl.append(ul);
  }

  loadSections();
}
