export function initAllCategories(apiUrl, endpoint, root = document) {
  const catsEl = root.querySelector("[data-all-categories-cats]");
  const subcatsEl = root.querySelector("[data-all-categories-subcats]");
  if (!catsEl || !subcatsEl) return;

  // Fetch and then build the UI
  fetch(`${apiUrl}/${endpoint}`)
    .then((res) => res.json())
    .then(({ sections }) => {
      // 1. Get top‐level groups (depth_level === "1")
      const topGroups = Object.values(sections).filter(
        (s) => s.depth_level === "1"
      );

      // 2. Build a map from category ID → category object (depth 2)
      const catMap = new Map();

      // 3. Render each group’s categories into its own <ul>
      topGroups.forEach((group) => {
        const ul = document.createElement("ul");
        ul.className = "all-categories__categories-list";

        (group.sections || []).forEach((cat) => {
          catMap.set(cat.id, cat);

          const li = document.createElement("li");
          li.className = "all-categories__category-item category-item";
          li.dataset.id = cat.id;
          li.innerHTML = `
            <h2>${cat.name}</h2>
            <div class="category-item__sku">
              <span class="caption">ID ${cat.id}</span>
              <button class="btn btn--icon-only copy-btn" aria-label="Копировать">
                <!-- SVG icon here -->
              </button>
            </div>
          `;
          ul.appendChild(li);
        });

        catsEl.appendChild(ul);
      });

      // 4. Function to render depth‐3 subcategories for a given category
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

        subcatsEl.appendChild(ul);
      }

      // 5. Initial state: first group’s first category
      const firstCat = topGroups[0]?.sections?.[0];
      if (firstCat) {
        renderSubcats(firstCat);
        const firstLi = catsEl.querySelector(
          `.all-categories__category-item[data-id="${firstCat.id}"]`
        );
        firstLi?.classList.add("is-active");
      }

      // 6. Hover to switch subcategories
      catsEl.addEventListener("mouseover", (e) => {
        const li = e.target.closest(".all-categories__category-item");
        if (!li) return;

        catsEl
          .querySelectorAll(".all-categories__category-item.is-active")
          .forEach((el) => el.classList.remove("is-active"));

        li.classList.add("is-active");
        const cat = catMap.get(li.dataset.id);
        renderSubcats(cat);
      });
    })
    .catch((err) => {
      console.error("Failed to load categories:", err);
    });
}
