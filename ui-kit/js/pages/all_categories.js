export function initAllCategories(root = document) {
  const catsEl = root.querySelector("[data-all-categories-cats]");
  const subcatsEl = root.querySelector("[data-all-categories-subcats]");
  if (!catsEl || !subcatsEl) return;

  const dataGroups = [
    {
      label: "Материалы, системы",
      categories: [
        {
          id: "0",
          label: "Абразивы и сопутствующие материалы",
          children: [
            "Шпатлёвки",
            "Грунты",
            "Грунты-наполнители универсальные",
            "Грунты-наполнители “мокрый по мокрому”",
            "Грунт-наполнители шлифуемые",
            "Готовые краски и покрытия",
            "Прозрачные лаки",
            "Аэрозоли",
            "Отвердители",
            "Разбавители и растворители",
            "Активаторы адгезии и катализаторы",
            "Очистители",
            "Добавки",
          ],
        },
        {
          id: "1",
          label: "Маскировочные материалы",
          children: ["а"],
        },
        {
          id: "2",
          label: "Материалы для детейлинга и полировки",
          children: ["б", "в"],
        },
        {
          id: "3",
          label: "Аксессуары и материалы для подготовки и окраски",
          children: ["г", "д", "е"],
        },
        {
          id: "4",
          label: "Кузовные покрытия",
          children: ["ё", "ж", "з", "и"],
        },
        {
          id: "5",
          label: "Системы цветоподбора",
          children: ["й", "к", "л", "м", "н"],
        },
        {
          id: "6",
          label: "Системы газоудаления",
          children: ["Шпатлёвки"],
        },
        {
          id: "7",
          label: "Средства индивидуальной защиты",
          children: ["Шпатлёвки"],
        },
        {
          id: "8",
          label: "Воздушные фильтры для окраски и вентиляции",
          children: ["Шпатлёвки"],
        },
        {
          id: "9",
          label: "Инструменты и аксессуары для шлифования и полирования",
          children: ["Шпатлёвки"],
        },
        {
          id: "10",
          label: "Краскопульты, аэрографы, распылители",
          children: ["Шпатлёвки"],
        },
        {
          id: "11",
          label: "Оборудование для организации рабочего места",
          children: ["Шпатлёвки"],
        },
      ],
    },
    {
      label: "Оборудование",
      categories: [
        {
          id: "12",
          label: "Пылесборное оборудование",
          children: ["Шпатлёвки"],
        },
        {
          id: "13",
          label: "Шиномонтажное и балансировочное оборудование",
          children: ["Шпатлёвки"],
        },
        {
          id: "14",
          label: "Оборудование для развал-схождения",
          children: ["Шпатлёвки"],
        },
        {
          id: "15",
          label: "Гаражное гидравлическое оборудование",
          children: ["Шпатлёвки"],
        },
        {
          id: "16",
          label: "Оборудование для кузовного ремонта",
          children: ["Шпатлёвки", "Грунты", "Грунты-наполнители универсальные"],
        },
        {
          id: "17",
          label: "Окрасочно-сушильное оборудование",
          children: [
            "Шпатлёвки",
            "Грунты",
            "Грунты-наполнители универсальные",
            "Грунты-наполнители “мокрый по мокрому”",
            "Грунт-наполнители шлифуемые",
          ],
        },
        {
          id: "18",
          label: "Сварочное и пуско-зарядное оборудование",
          children: [
            "Шпатлёвки",
            "Грунты",
            "Грунты-наполнители универсальные",
            "Грунты-наполнители “мокрый по мокрому”",
            "Грунт-наполнители шлифуемые",
            "Готовые краски и покрытия",
            "Прозрачные лаки",
            "Аэрозоли",
            "Отвердители",
          ],
        },
        {
          id: "19",
          label: "Оборудование для обслуживания систем и агрегатов",
          children: [
            "Аэрозоли",
            "Отвердители",
            "Разбавители и растворители",
            "Активаторы адгезии и катализаторы",
            "Очистители",
            "Добавки",
          ],
        },
        {
          id: "20",
          label: "Оборудование для организации рабочего места",
          children: [
            "Активаторы адгезии и катализаторы",
            "Очистители",
            "Добавки",
          ],
        },
        {
          id: "21",
          label: "Компрессорное оборудование",
          children: [
            "Шпатлёвки",
            "Грунты",
            "Грунты-наполнители универсальные",
            "Грунты-наполнители “мокрый по мокрому”",
            "Грунт-наполнители шлифуемые",
            "Готовые краски и покрытия",
            "Прозрачные лаки",
            "Аэрозоли",
            "Отвердители",
            "Разбавители и растворители",
            "Активаторы адгезии и катализаторы",
          ],
        },
        {
          id: "22",
          label: "Автомобильные подъемники",
          children: [
            "Шпатлёвки",
            "Грунты",
            "Грунты-наполнители универсальные",
            "Грунты-наполнители “мокрый по мокрому”",
            "Грунт-наполнители шлифуемые",
            "Готовые краски и покрытия",
            "Прозрачные лаки",
            "Аэрозоли",
            "Отвердители",
            "Разбавители и растворители",
            "Активаторы адгезии и катализаторы",
            "Очистители",
          ],
        },
      ],
    },
  ];

  dataGroups.forEach((group) => {
    const groupDiv = document.createElement("div");
    groupDiv.className = "flex column gap-4";

    const grpLabel = document.createElement("span");
    grpLabel.className = "all-categories__group-label";
    grpLabel.textContent = group.label;
    groupDiv.append(grpLabel);

    const ul = document.createElement("ul");
    ul.className = "all-categories__categories-list";

    group.categories.forEach((cat) => {
      ul.insertAdjacentHTML(
        "beforeend",
        `<li class="all-categories__category-item category-item" data-id="${cat.id}">
          <h2>${cat.label}</h2>
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
        </li>`
      );
    });

    groupDiv.append(ul);
    catsEl.append(groupDiv);
  });

  function renderSubcats(catId) {
    subcatsEl.innerHTML = "";
    let found;
    for (const grp of dataGroups) {
      found = grp.categories.find((c) => c.id === catId);
      if (found) break;
    }
    if (!found) return;

    const ul = document.createElement("ul");
    ul.className = "all-categories__subcategories-list";
    found.children.forEach((label) => {
      ul.insertAdjacentHTML(
        "beforeend",
        `<li>
          <a class="all-categories__subcategory no-underline">${label}</a>
        </li>`
      );
    });
    subcatsEl.append(ul);
  }

  const firstCat = dataGroups[0].categories[0];
  renderSubcats(firstCat.id);
  catsEl
    .querySelector(".all-categories__category-item")
    .classList.add("is-active");

  catsEl.addEventListener("mouseover", (e) => {
    const li = e.target.closest(".all-categories__category-item");
    if (!li) return;
    catsEl
      .querySelectorAll(".all-categories__category-item.is-active")
      .forEach((el) => el.classList.remove("is-active"));
    li.classList.add("is-active");
    renderSubcats(li.dataset.id);
  });
}
