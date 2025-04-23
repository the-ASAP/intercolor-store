<?php

namespace Api;

use Exception;
use \Bitrix\Main\Loader;

Loader::includeModule('iblock');
Loader::includeModule('catalog');

class GetStoragesList extends \Bitrix\Main\Engine\Controller
{
    protected function getDefaultPreFilters()
    {
        return [];
    }

    public function configureActions()
    {
        return [
            'viewAction' => [
                'prefilters' => [
                    new \Bitrix\Main\Engine\ActionFilter\Csrf(),
                ],
                '-postfilters' => [
                    new \Bitrix\Main\Engine\ActionFilter\Csrf(),
                ],
            ],
        ];
    }


    public function viewAction()
    {

        $getAllStores = \CCatalogStore::GetList(
            [],
            [
                'ACTIVE' => 'Y',
            ],
            false,
            false,
            [
                'ID',
                'TITLE',
                'ADDRESS',
                'PHONE',
                'EMAIL',
                'CITY'
            ]
        );
        while($store = $getAllStores->Fetch()){
            $city= explode(' ', $store['ADDRESS']);
            $result['items'][] = [
                'id' => (int)$store['ID'],
                'name' => (string)$store['TITLE'],
                'city' => (string)$city[0].rtrim($city[1],','),
                'address' => (string)$store['ADDRESS'],
                'phone' => (string)$store['PHONE'],
                'email' => (string)$store['EMAIL'],
            ];
        }
        return new \Bitrix\Main\Engine\Response\Json($result);
    }
}
