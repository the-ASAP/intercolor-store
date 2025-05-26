export function initSidebar(root = document) {
  const sidebar = root.querySelector(".nav-sidebar");
  const toggleButton = root.querySelector(".toggle-button");
  const navBtnsText = root.querySelectorAll(".nav-btn span");

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      toggleButton.classList.toggle("rotated");

      navBtnsText.forEach((text) => {
        text.classList.toggle("hide");
      });
    });
  }
}
