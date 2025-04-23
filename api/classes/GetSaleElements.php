<?php

namespace Api;

use Exception;

class GetSaleElements extends \Bitrix\Main\Engine\Controller
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
        $result =
            [
                'id' => 1,
                'name' => 'Тестовый элемент',
                'code' => 'sale-code',
                'dateFrom' => '2023-10-01',
                'dateTill' => '2023-10-01',
                'type' => 'Тестовый тип',
                'items' => [
                    [
                        'name' => 'Тестовый товар',
                        'price' => 100.5,
                        'oldprice' => 20,
                        'sku' => 'Тестовый артикул',
                        'storage' => 'Тестовый склад',
                        'stock' => 10,
                        'image' => 'https://example.com/image.jpg',
                    ],
                    [
                        'name' => 'Тестовый товар 2',
                        'price' => 2499.99,
                        'oldprice' => 2999.99,
                        'sku' => 'ZUMA-EXTRA-LUCK',
                        'storage' => 'Склад №2',
                        'stock' => 5,
                        'image' => 'https://example.com/image2.jpg',
                    ],
                    [
                        'n  ame' => 'Тестовый товар 3',
                        'price' => 59.9,
                        'oldprice' => 120.0,
                        'sku' => 'LIMITED-EDITION',
                        'storage' => 'Центральный склад',
                        'stock' => 42,
                        'image' => 'https://example.com/image3.jpg',
                    ],
                ]

            ];

        return new \Bitrix\Main\Engine\Response\Json($result);
    }
}
