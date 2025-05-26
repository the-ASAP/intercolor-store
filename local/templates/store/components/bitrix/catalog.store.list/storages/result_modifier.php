<?php if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

$getStoresEmail = CCatalogStore::GetList($arOrder = array(), $arFilter = array(), $arGroupBy = false, $arNavStartParams = false, $arSelectFields = array('ID', 'EMAIL'));

$storesEmails = [];
while ($stores = $getStoresEmail->GetNext())
{
    $storesEmails[$stores['ID']] = $stores['EMAIL'];
}

$arResult['EMAILS'] = $storesEmails;
