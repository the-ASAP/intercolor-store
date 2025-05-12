<? require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/header.php');
$APPLICATION->SetTitle("");
?><h1>Склады</h1>
<? $APPLICATION->IncludeComponent(
    "bitrix:catalog.store.list",
    "storages",
    array(
        "PHONE" => 'Y',
        'FIELDS' => ['UF_EMAIL'],
        'USER_FIELDS' => ['UF_EMAIL']
    )
); ?>

<? require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/footer.php');
