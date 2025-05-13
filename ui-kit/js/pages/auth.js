export function initAuth(apiUrl, endpoint, root = document) {
  const form = root.querySelector("#login-form");
  const notification = root.querySelector("#notification");
  const notificationText = root.querySelector("#notification-text");
  const closeBtn = root.querySelector("[data-close-notification]");
  let notificationTimer;

  if (!form || !notification || !notificationText) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    const credentials = {
      login: form.querySelector("#login").value,
      password: form.querySelector("#password").value,
    };

    try {
      const res = await fetch(`${apiUrl}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const result = await res.json();
      if (result.status) {
        showNotification("Авторизация выполнена успешно", "success");
        window.location.replace(result.url);
      } else {
        showNotification(result.message, "error");
      }
    } catch (err) {
      showNotification(err.message || "Сетевая ошибка", "error");
    } finally {
      submitBtn.disabled = false;
    }
  });

  function showNotification(msg, type) {
    clearTimeout(notificationTimer);
    notificationText.textContent = msg;
    notification.className = `snackbar is-visible snackbar--${type}`;
    notificationTimer = setTimeout(closeNotification, 3000);
  }

  function closeNotification() {
    clearTimeout(notificationTimer);
    notification.classList.remove("is-visible");
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeNotification);
  }
}
