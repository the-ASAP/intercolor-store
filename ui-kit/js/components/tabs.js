export function initTabs(root = document) {
  const tablists = root.querySelectorAll('[role="tablist"]');

  tablists.forEach((tablist) => {
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const panels = tabs.map((tab) =>
      document.getElementById(tab.getAttribute("aria-controls"))
    );

    function activateTab(i) {
      tabs.forEach((t, idx) => {
        const selected = idx === i;
        t.setAttribute("aria-selected", selected);
        t.setAttribute("tabindex", selected ? "0" : "-1");
        panels[idx].hidden = !selected;
      });
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => activateTab(i));
    });
  });
}
