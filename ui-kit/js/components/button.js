export function initCopyButtons(root = document) {
  root.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      let el = btn.previousElementSibling;
      while (el && !el.textContent.trim()) {
        el = el.previousElementSibling;
      }
      if (!el) return;

      const text = el.textContent.trim();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
      } else {
        fallbackCopy(text);
      }

      btn.setAttribute("aria-label", "Скопировано!");
      setTimeout(() => btn.setAttribute("aria-label", "Копировать"), 2000);
    });
  });
}

// Fallback for older browsers
function fallbackCopy(str) {
  const textarea = document.createElement("textarea");
  textarea.value = str;
  textarea.style.position = "fixed";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export function initCloseButtons(root = document) {
  root.querySelectorAll(".close-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.closest(".item") || btn.parentElement;
      if (!target) return;

      if (target.remove) {
        target.remove();
      } else if (target.parentNode) {
        target.parentNode.removeChild(target);
      }
    });
  });
}
