<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Интерколор</title>
    <link rel="stylesheet" href="/ui-kit/css/main.css" />
</head>

<body>
    <main class="container">
        <img alt="Интерколор лого" class="logo_full" />

        <form class="flex column items-center gap-6" id="login-form">
            <div class="login-form__intro flex column items-center gap-2">
                <h1>Вход</h1>
                <span>Введите свои данные для авторизации</span>
            </div>
            <div class="login-form__inputs flex column items-center gap-4">
                <div class="input-container">
                    <label class="input-label" id="login">Логин<input type="text" class="input-field" required />
                    </label>
                </div>
                <div class="input-container">
                    <label class="input-label" id="password">Пароль<input type="password" class="input-field" required />
                    </label>
                </div>
            </div>
            <button class="btn btn--dark btn--text--large width-full" type="submit">
                Войти
            </button>
        </form>

        <div id="notification" class="snackbar" role="status">
            <span id="notification-text"></span>
            <button
                class="btn btn--icon-only--small"
                aria-label="Close"
                data-close-notification>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6 6L18 18"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path
                        d="M18 6L6 18"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </button>
        </div>
    </main>

    <script src="/ui-kit/js/index.js" type="module"></script>
</body>

</html>