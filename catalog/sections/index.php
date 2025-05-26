<?php require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/header.php'); ?>


<div class="flex gap-4">
    <div class="input-container">
        <input
            type="search"
            class="input-field input-search input-search--tall" />
    </div>
    <button
        style="min-width: 212px"
        class="btn btn--dark btn--text--large">
        Найти
    </button>
</div>
<div class="flex gap-6 items-center">
    <h1>Каталог</h1>
    <nav class="breadcrumbs">
        <ol class="breadcrumbs__list">
            <li class="breadcrumbs__item">
                <a href="index.php" class="caption">Весь каталог</a>
            </li>
            <li class="breadcrumbs__item breadcrumbs__item--current">
                <span class="caption">Все категории</span>
            </li>
        </ol>
    </nav>
</div>
<div class="all-categories" data-all-categories>
    <nav
        class="all-categories__categories"
        data-all-categories-cats></nav>
    <section
        class="all-categories__subcategories"
        data-all-categories-subcats></section>
</div>
<script src="/ui-kit/js/index.js" type="module"></script>
<script src="/ui-kit/js/pages/catalog/all-categories.js" type="module"></script>
<?php require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/footer.php');
