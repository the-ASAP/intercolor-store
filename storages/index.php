<?php require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/header.php'); ?>

<? $APPLICATION->IncludeComponent(
    "bitrix:catalog.store.list",
    "storages",
    array(
        "PHONE" => "Y",
        "SCHEDULE" => "Y",
        "PATH_TO_ELEMENT" => "store/#store_id#",
        "MAP_TYPE" => "0",
        "SET_TITLE" => "Y",
        "CACHE_TYPE" => "A",
        "CACHE_TIME" => "36000000"
    )
); ?>

<?php require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/footer.php');
