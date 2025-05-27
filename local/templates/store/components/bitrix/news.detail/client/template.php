<?php if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die(); ?>
<?php

use \Bitrix\Main\Loader;
use \Bitrix\Highloadblock as HL;

Loader::includeModule('highloadblock');


$hlblockId = 4;

// Получение данных highload-блока
$hlblock = HL\HighloadBlockTable::getById($hlblockId)->fetch();

if (!$hlblock)
{
    throw new \Exception("Highload-блок с ID {$hlblockId} не найден.");
}

// Получение ORM-класса для работы с HL-блоком
$entity = HL\HighloadBlockTable::compileEntity($hlblock);
$entityClass = $entity->getDataClass();

$getID = explode('/', $_SERVER['REQUEST_URI']);
// Добавление новой записи
$result = $entityClass::getList([
    'select' => ['ID', 'UF_MOCK'],
    'filter' => ['ID' => $getID[2]]
])->fetch();

if ($result):
    $client = json_decode($result['UF_MOCK'], true);
?>
    <div class="flex items-center justify-between">
        <div class="flex items-end gap-6">
            <h1><?= $client['short_company_name'] ?? $client['full_name'] ?></h1>
            <nav class="breadcrumbs">
                <ol class="breadcrumbs__list">
                    <li class="breadcrumbs__item">
                        <a href="/clients" class="caption">Клиенты</a>
                    </li>
                    <li class="breadcrumbs__item breadcrumbs__item--current">
                        <span class="caption"><?= $client['short_company_name'] ?? $client['full_name'] ?></span>
                    </li>
                </ol>
            </nav>
        </div>
        <button
            id="edit-btn"
            class="btn btn--icon-only--large btn--dark"
            aria-label="Edit">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.652 4.75106L16.249 3.34806C15.858 2.95706 15.225 2.95706 14.835 3.34806L4 14.1821V17.0001H6.818L17.652 6.16606C18.043 5.77506 18.043 5.14206 17.652 4.75106Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                <path
                    d="M3 21H21"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                <path
                    d="M15.87 7.95L13.05 5.13"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>
        <button
            id="submit-btn"
            class="btn btn--text btn--dark hidden"
            data-action="apply"
            type="submit"
            form="client-form"
            style="width: 200px">
            Сохранить
        </button>
    </div>
    <div class="client__container--view" data-view>
        <div class="client__fields grid grid-cols-2 gap-4">
            <div class="card-block flex column gap-4">
                <div class="flex column">
                    <div class="client-field" data-field="client_type">
                        <span class="caption">Вид контрагента</span>
                        <div><?= $client['client_type'] ?></div>
                    </div>
                    <div class="client-field" data-field="full_name">
                        <span class="caption">ФИО</span>
                        <div><?= $client['full_name'] ?></div>
                    </div>
                    <div class="client-field" data-field="phone">
                        <span class="caption">Телефон</span>
                        <div><?= $client['phone'] ?></div>
                    </div>
                    <div class="client-field" data-field="email">
                        <span class="caption">Email</span>
                        <div><?= $client['email'] ?></div>
                    </div>
                </div>
            </div>
            <div class="card-block flex column gap-4">
                <div class="flex column">
                    <div class="client-field" data-field="delivery_address">
                        <span class="caption">Адрес доставки</span>
                        <div><?= $client['delivery_address'] ?></div>
                    </div>
                    <div class="client-field" data-field="inn">
                        <span class="caption">ИНН</span>
                        <div><?= $client['inn']; ?></div>
                    </div>
                </div>
                <a
                    href="docs/agreement.pdf"
                    class="card card-file"
                    target="_blank"
                    rel="noopener">
                    <svg
                        class="card-file__icon"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 0.75H20.5146C21.82 0.75 23.075 1.2364 24.0381 2.1084L24.2266 2.28809L33.7119 11.7734C34.6965 12.758 35.25 14.093 35.25 15.4854V34C35.25 36.8995 32.8995 39.25 30 39.25H10C7.10051 39.25 4.75 36.8995 4.75 34V6C4.75 3.10051 7.10051 0.75 10 0.75Z"
                            fill="white"
                            stroke="#E1E1E1"
                            stroke-width="1.5" />
                        <path
                            d="M23 1V9C23 11.2091 24.7909 13 27 13H35"
                            stroke="#E1E1E1"
                            stroke-width="1.5" />
                        <path
                            d="M0 22C0 19.7909 1.79086 18 4 18H24C26.2091 18 28 19.7909 28 22V30C28 32.2091 26.2091 34 24 34H4C1.79086 34 0 32.2091 0 30V22Z"
                            fill="#EBB77B" />
                        <path
                            d="M3.78906 30V22H6.78906C7.40365 22 7.91927 22.1146 8.33594 22.3437C8.75521 22.5729 9.07161 22.888 9.28516 23.2891C9.5013 23.6875 9.60938 24.1406 9.60938 24.6484C9.60938 25.1615 9.5013 25.6172 9.28516 26.0156C9.06901 26.4141 8.75 26.7279 8.32812 26.957C7.90625 27.1836 7.38672 27.2969 6.76953 27.2969H4.78125V26.1055H6.57422C6.93359 26.1055 7.22786 26.043 7.45703 25.918C7.6862 25.793 7.85547 25.6211 7.96484 25.4023C8.07682 25.1836 8.13281 24.9323 8.13281 24.6484C8.13281 24.3646 8.07682 24.1146 7.96484 23.8984C7.85547 23.6823 7.6849 23.5143 7.45313 23.3945C7.22396 23.2721 6.92839 23.2109 6.56641 23.2109H5.23828V30H3.78906ZM13.7991 30H11.0882V22H13.8538C14.6481 22 15.3304 22.1602 15.9007 22.4805C16.4736 22.7982 16.9137 23.2552 17.221 23.8516C17.5283 24.4479 17.6819 25.1615 17.6819 25.9922C17.6819 26.8255 17.527 27.5417 17.2171 28.1406C16.9098 28.7396 16.4658 29.1992 15.885 29.5195C15.3069 29.8398 14.6116 30 13.7991 30ZM12.5374 28.7461H13.7288C14.2861 28.7461 14.7509 28.6445 15.1233 28.4414C15.4957 28.2357 15.7757 27.9297 15.9632 27.5234C16.1507 27.1146 16.2444 26.6042 16.2444 25.9922C16.2444 25.3802 16.1507 24.8724 15.9632 24.4687C15.7757 24.0625 15.4983 23.7591 15.1311 23.5586C14.7665 23.3555 14.3134 23.2539 13.7718 23.2539H12.5374V28.7461ZM19.2789 30V22H24.4039V23.2148H20.7281V25.3867H24.0523V26.6016H20.7281V30H19.2789Z"
                            fill="#323232" />
                    </svg>
                    <span class="card-file__name">Соглашение</span>
                </a>
                <a
                    href="docs/contract.pdf"
                    class="card card-file"
                    target="_blank"
                    rel="noopener">
                    <svg
                        class="card-file__icon"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 0.75H20.5146C21.82 0.75 23.075 1.2364 24.0381 2.1084L24.2266 2.28809L33.7119 11.7734C34.6965 12.758 35.25 14.093 35.25 15.4854V34C35.25 36.8995 32.8995 39.25 30 39.25H10C7.10051 39.25 4.75 36.8995 4.75 34V6C4.75 3.10051 7.10051 0.75 10 0.75Z"
                            fill="white"
                            stroke="#E1E1E1"
                            stroke-width="1.5" />
                        <path
                            d="M23 1V9C23 11.2091 24.7909 13 27 13H35"
                            stroke="#E1E1E1"
                            stroke-width="1.5" />
                        <path
                            d="M0 22C0 19.7909 1.79086 18 4 18H24C26.2091 18 28 19.7909 28 22V30C28 32.2091 26.2091 34 24 34H4C1.79086 34 0 32.2091 0 30V22Z"
                            fill="#EBB77B" />
                        <path
                            d="M3.78906 30V22H6.78906C7.40365 22 7.91927 22.1146 8.33594 22.3437C8.75521 22.5729 9.07161 22.888 9.28516 23.2891C9.5013 23.6875 9.60938 24.1406 9.60938 24.6484C9.60938 25.1615 9.5013 25.6172 9.28516 26.0156C9.06901 26.4141 8.75 26.7279 8.32812 26.957C7.90625 27.1836 7.38672 27.2969 6.76953 27.2969H4.78125V26.1055H6.57422C6.93359 26.1055 7.22786 26.043 7.45703 25.918C7.6862 25.793 7.85547 25.6211 7.96484 25.4023C8.07682 25.1836 8.13281 24.9323 8.13281 24.6484C8.13281 24.3646 8.07682 24.1146 7.96484 23.8984C7.85547 23.6823 7.6849 23.5143 7.45313 23.3945C7.22396 23.2721 6.92839 23.2109 6.56641 23.2109H5.23828V30H3.78906ZM13.7991 30H11.0882V22H13.8538C14.6481 22 15.3304 22.1602 15.9007 22.4805C16.4736 22.7982 16.9137 23.2552 17.221 23.8516C17.5283 24.4479 17.6819 25.1615 17.6819 25.9922C17.6819 26.8255 17.527 27.5417 17.2171 28.1406C16.9098 28.7396 16.4658 29.1992 15.885 29.5195C15.3069 29.8398 14.6116 30 13.7991 30ZM12.5374 28.7461H13.7288C14.2861 28.7461 14.7509 28.6445 15.1233 28.4414C15.4957 28.2357 15.7757 27.9297 15.9632 27.5234C16.1507 27.1146 16.2444 26.6042 16.2444 25.9922C16.2444 25.3802 16.1507 24.8724 15.9632 24.4687C15.7757 24.0625 15.4983 23.7591 15.1311 23.5586C14.7665 23.3555 14.3134 23.2539 13.7718 23.2539H12.5374V28.7461ZM19.2789 30V22H24.4039V23.2148H20.7281V25.3867H24.0523V26.6016H20.7281V30H19.2789Z"
                            fill="#323232" />
                    </svg>
                    <span class="card-file__name">Договор</span>
                </a>
            </div>
        </div>
    </div>

    <div class="card-block hidden" data-edit>
        <form
            class="flex column gap-4"
            data-form-mode="update"
            style="overflow: auto; flex: 1"
            id="client-form">
            <div class="side-sheet__body">
                <div class="flex column gap-2">
                    <label class="input-label">Вид контрагента </label>
                    <div class="flex items-center gap-4">
                        <label class="flex items-center gap-2"><input
                                name="client_type"
                                type="radio"
                                class="radio"
                                value="Физическое лицо"
                                checked />Физ. лицо
                        </label>
                        <label class="flex items-center gap-2">
                            <input
                                name="client_type"
                                type="radio"
                                class="radio"
                                value="Юридическое лицо" />Юр. лицо
                        </label>
                        <label class="flex items-center gap-2">
                            <input
                                name="client_type"
                                type="radio"
                                class="radio"
                                value="Обособленное подразделение юр.лица" />
                            Обособленное подразделение юр.лица
                        </label>
                        <label class="flex items-center gap-2">
                            <input
                                name="client_type"
                                type="radio"
                                class="radio"
                                value="Юридическое лицо (нерезидент)" />
                            Юридическое лицо (нерезидент)
                        </label>
                        <label class="flex items-center gap-2">
                            <input
                                name="client_type"
                                type="radio"
                                class="radio"
                                value="Индивидуальный предприниматель" />
                            Индивидуальный предприниматель
                        </label>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="input-container" data-field="inn">
                        <label class="input-label">
                            ИНН*
                            <input
                                name="inn"
                                id="inn-input"
                                type="search"
                                class="input-field"
                                required
                                placeholder="10 или 12 цифр"
                                maxlength="12"
                                inputmode="numeric" />
                        </label>
                    </div>

                    <div class="input-container" data-field="full_name">
                        <label class="input-label">
                            Фамилия, имя, отчество*
                            <input
                                name="full_name"
                                id="fullname-input"
                                type="text"
                                class="input-field"
                                required />
                        </label>
                    </div>

                    <div class="input-container" data-field="short_company_name">
                        <label class="input-label">
                            Сокращенное юридическое наименование*
                            <input
                                name="short_company_name"
                                id="shortcompanyname-input"
                                type="text"
                                class="input-field"
                                required />
                        </label>
                    </div>

                    <div class="input-container" data-field="full_company_name">
                        <label class="input-label">
                            Рабочее наименование*
                            <input
                                name="full_company_name"
                                id="fullcompanyname-input"
                                type="text"
                                class="input-field"
                                required />
                        </label>
                    </div>

                    <div class="input-container" data-field="kpp">
                        <label class="input-label">
                            КПП*
                            <input
                                name="kpp"
                                id="kpp-input"
                                type="text"
                                class="input-field"
                                required />
                        </label>
                    </div>

                    <div class="input-container" data-field="phone">
                        <label class="input-label">Номер телефона*
                            <div class="phone-input">
                                <img
                                    src="/ui-kit/assets/icons/ru.svg"
                                    alt="Флаг России"
                                    class="phone-flag" />
                                <span class="phone-prefix">+7</span>
                                <input
                                    name="phone"
                                    type="tel"
                                    class="input-field phone-value"
                                    required
                                    maxlength="10" />
                            </div>
                        </label>
                    </div>

                    <div class="input-container" data-field="email">
                        <label class="input-label">
                            Email*
                            <input
                                name="email"
                                type="email"
                                class="input-field"
                                required />
                        </label>
                    </div>

                    <div
                        class="input-container col-span-full"
                        data-field="delivery_address">
                        <label class="input-label">
                            Адрес доставки*
                            <input
                                name="delivery_address"
                                type="text"
                                class="input-field"
                                required />
                        </label>
                    </div>
                </div>
            </div>
            <span class="caption">* поля обязательные для заполнения</span>
        </form>
    </div>
<? endif; ?>