<?php

namespace Api;

use Faker\Provider\Lorem;

class GetElementById  extends \Bitrix\Main\Engine\Controller
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


    public function viewAction($id)
    {

        $getElement = \Bitrix\Iblock\Elements\ElementServicecatalogTable::getList(
            [
                'select' => [
                    'ID',
                    'NAME',
                    'PREVIEW_TEXT',
                    'DETAIL_TEXT',
                    'CML2_ARTICLE',
                    'PREVIEW_PICTURE',
                    'CML2_BASE_UNIT',
                    'CML2_MANUFACTURER',


                ],
                'limit' => 1,
                'filter' => [
                    '=ID' => $id,
                    'ACTIVE' => 'Y',
                    'IBLOCK_ID' => 20
                ],
            ]
        )->fetch();

        $result = [
            'id' => (int)$getElement['ID'],
            'name' => (string)$getElement['NAME'],
            'preview' => $getElement['PREVIEW_TEXT'],
            'detail' => Lorem::text(1200),
            'image' => $getElement['PREVIEW_PICTURE'],
            'sku' => $getElement['IBLOCK_ELEMENTS_ELEMENT_SERVICECATALOG_CML2_ARTICLE_VALUE'],
            'unit' => $getElement['IBLOCK_ELEMENTS_ELEMENT_SERVICECATALOG_CML2_BASE_UNIT_VALUE'],
            'delivery' => 'Доставка 19 ноября',
            'documents' => [
                [
                    'name' => 'Тестовый документ 1',
                    'url' => 'https://example.com/doc1.pdf',
                ],
                [
                    'name' => 'Тестовый документ 2',
                    'url' => 'https://example.com/doc2.pdf',
                ],
            ],
            'storages' => [
                [
                    'name' => 'Склад 1',
                    'stock' => 10,
                ],
                [
                    'name' => 'Склад 2',
                    'stock' => 5,
                ],
                [
                    'name' => 'Склад 3',
                    'stock' => 0,
                ],
            ],
            'characteristics' => [
                [
                    'name' => 'Бренд',
                    'value' => 'Тестовый бренд',
                ],
                [
                    'name' => 'Модель',
                    'value' => 'Тестовая модель',
                ],
                [
                    'name' => 'Гарантия',
                    'value' => '12 месяцев',
                ],
                [
                    'name' => 'Страна производитель',
                    'value' => 'Китай',
                ],
                [
                    'name' => 'Тестовая характеристика 1',
                    'value' => 'Значение 1',
                ],
                [
                    'name' => 'Тестовая характеристика 1',
                    'value' => 'Значение 1',
                ],
                [
                    'name' => 'Тестовая характеристика 2',
                    'value' => 'Значение 2',
                ],
                [
                    'name' => 'Тестовая характеристика 3',
                    'value' => 'Значение 3',
                ],
            ],
            'analogues' => [
                [
                    'name' => 'Тестовый аналог 1',
                    'sku' => 'SKU-123',
                    'price' => 100.5,
                    'image' => 'https://example.com/analogue1.jpg',
                    'storage' => 'Склад 1',
                    'stock' => 10,
                ],
                [
                    'name' => 'Тестовый аналог 2',
                    'sku' => 'SKU-456',
                    'price' => 2499.99,
                    'image' => 'https://example.com/analogue2.jpg',
                    'storage' => 'Склад 1',
                    'stock' => 10,
                ],
            ],
        ];
        return new \Bitrix\Main\Engine\Response\Json($result);
    }
}
