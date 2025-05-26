<?php require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/header.php'); ?>
<div class="sheet-overlay" data-overlay></div>


<div class="flex items-center gap-5">
    <h1>Клиенты</h1>
    <button
        data-action="open-create--clients"
        class="btn btn--icon-only--large btn--dark rounded-full"
        aria-label="Add client">
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5.28516 10H14.7132"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round" />
            <path
                d="M9.9992 5.28595V14.714"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    </button>
</div>

<?php
$APPLICATION->IncludeComponent(
    "bitrix:news.list",
    "clients",
    array(
        "DISPLAY_DATE" => "Y",
        "DISPLAY_PICTURE" => "Y",
        "DISPLAY_PREVIEW_TEXT" => "Y",
        "SEF_MODE" => "Y",
        "AJAX_MODE" => "Y",
        "IBLOCK_TYPE" => "news",
        "IBLOCK_ID" => "1",
        "NEWS_COUNT" => "20",
        "USE_SEARCH" => "Y",
        "USE_RSS" => "Y",
        "USE_RATING" => "Y",
        "USE_CATEGORIES" => "Y",
        "USE_REVIEW" => "Y",
        "USE_FILTER" => "Y",
        "SORT_BY1" => "ACTIVE_FROM",
        "SORT_ORDER1" => "DESC",
        "SORT_BY2" => "SORT",
        "SORT_ORDER2" => "ASC",
        "CHECK_DATES" => "Y",
        "PREVIEW_TRUNCATE_LEN" => "",
        "LIST_ACTIVE_DATE_FORMAT" => "d.m.Y",
        "LIST_FIELD_CODE" => array(),
        "LIST_PROPERTY_CODE" => array(),
        "HIDE_LINK_WHEN_NO_DETAIL" => "Y",
        "DISPLAY_NAME" => "Y",
        "META_KEYWORDS" => "-",
        "META_DESCRIPTION" => "-",
        "BROWSER_TITLE" => "-",
        "DETAIL_SET_CANONICAL_URL" => "Y",
        "DETAIL_ACTIVE_DATE_FORMAT" => "d.m.Y",
        "DETAIL_FIELD_CODE" => array(),
        "DETAIL_PROPERTY_CODE" => array(),
        "DETAIL_DISPLAY_TOP_PAGER" => "Y",
        "DETAIL_DISPLAY_BOTTOM_PAGER" => "Y",
        "DETAIL_PAGER_TITLE" => "Страница",
        "DETAIL_PAGER_TEMPLATE" => "",
        "DETAIL_PAGER_SHOW_ALL" => "Y",
        "STRICT_SECTION_CHECK" => "Y",
        "SET_TITLE" => "Y",
        "ADD_SECTIONS_CHAIN" => "Y",
        "ADD_ELEMENT_CHAIN" => "N",
        "SET_LAST_MODIFIED" => "Y",
        "PAGER_BASE_LINK_ENABLE" => "Y",
        "SET_STATUS_404" => "Y",
        "SHOW_404" => "Y",
        "MESSAGE_404" => "",
        "PAGER_BASE_LINK" => "",
        "PAGER_PARAMS_NAME" => "arrPager",
        "INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
        "USE_PERMISSIONS" => "Y",
        "GROUP_PERMISSIONS" => array("1"),
        "CACHE_TYPE" => "A",
        "CACHE_TIME" => "3600",
        "CACHE_FILTER" => "Y",
        "CACHE_GROUPS" => "Y",
        "DISPLAY_TOP_PAGER" => "Y",
        "DISPLAY_BOTTOM_PAGER" => "Y",
        "PAGER_TITLE" => "Новости",
        "PAGER_SHOW_ALWAYS" => "Y",
        "PAGER_TEMPLATE" => "",
        "PAGER_DESC_NUMBERING" => "N",
        "PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
        "PAGER_SHOW_ALL" => "Y",
        "FILTER_NAME" => "",
        "FILTER_FIELD_CODE" => array(),
        "FILTER_PROPERTY_CODE" => array(),
        "NUM_NEWS" => "20",
        "NUM_DAYS" => "30",
        "YANDEX" => "Y",
        "MAX_VOTE" => "5",
        "VOTE_NAMES" => array("0", "1", "2", "3", "4"),
        "CATEGORY_IBLOCK" => array(),
        "CATEGORY_CODE" => "CATEGORY",
        "CATEGORY_ITEMS_COUNT" => "5",
        "MESSAGES_PER_PAGE" => "10",
        "USE_CAPTCHA" => "Y",
        "REVIEW_AJAX_POST" => "Y",
        "PATH_TO_SMILE" => "/bitrix/images/forum/smile/",
        "FORUM_ID" => "1",
        "URL_TEMPLATES_READ" => "",
        "SHOW_LINK_TO_FORUM" => "Y",
        "POST_FIRST_MESSAGE" => "Y",
        "SEF_FOLDER" => "/",
        "SEF_URL_TEMPLATES" => array(
            "detail" => "#ELEMENT_ID#/",
            "news" => "search/",
            "section" => "rss/",
        ),
        "AJAX_OPTION_JUMP" => "N",
        "AJAX_OPTION_STYLE" => "Y",
        "AJAX_OPTION_HISTORY" => "N",
        "VARIABLE_ALIASES" => array(
            "detail" => array(),
            "news" => array(),
            "section" => array(),
        ),
        "USE_SHARE" => "Y",
        "SHARE_HIDE" => "Y",
        "SHARE_TEMPLATE" => "",
        "SHARE_HANDLERS" => array("delicious", "lj", "twitter"),
        "SHARE_SHORTEN_URL_LOGIN" => "",
        "SHARE_SHORTEN_URL_KEY" => "",
    ),
    false
);
?>

<aside
    class="side-sheet side-sheet--filters"
    role="dialog"
    aria-modal="true"
    aria-labelledby="client-title"
    data-sheet="create--clients">
    <header class="side-sheet__header">
        <h2 class="side-sheet__title" id="client-title">Добавить клиента</h2>
        <button class="btn btn--icon-only--small" aria-label="Close" data-close>
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
    </header>
    <form action="/v1/client/add/" method="post"
        class="flex column gap-4"
        style="overflow: auto; flex: 1"
        data-form-mode="create"
        id="client-form">
        <div class="side-sheet__body">
            <div class="flex column gap-2">
                <label class="input-label">Вид контрагента </label>
                <label class="flex items-center gap-2">
                    <input
                        name="client_type"
                        type="radio"
                        class="radio"
                        value="Физическое лицо"
                        checked />
                    Физическое лицо
                </label>
                <label class="flex items-center gap-2">
                    <input
                        name="client_type"
                        type="radio"
                        class="radio"
                        value="Юридическое лицо" />
                    Юридическое лицо
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
                    <input name="email" type="email" class="input-field" required />
                </label>
            </div>

            <div class="input-container" data-field="delivery_address">
                <label class="input-label">
                    Адрес доставки*
                    <input name="delivery_address" type="text" class="input-field" required />
                </label>
            </div>
        </div>
        <span class="caption">* поля обязательные для заполнения</span>
        <footer class="side-sheet__footer">
            <button
                class="btn btn--text btn--dark"
                data-action="apply"
                type="submit">
                Сохранить
            </button>
            <button type="reset" class="btn btn--text btn--outline">
                Сбросить
            </button>
        </footer>
    </form>
</aside>

<script src="/ui-kit/js/index.js" type="module"></script>
<?php require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/footer.php');
