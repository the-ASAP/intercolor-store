<?php

namespace Api;

use Exception;

class GetElementBySection  extends \Bitrix\Main\Engine\Controller
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


    public function viewAction($param)
    {
        try
        {
            $limit = isset($_GET['limit']) ?? null;
            $filter = [
                'ACTIVE' => 'Y',
                'IBLOCK_ID' => 24,
            ];

            if (is_numeric($param))
            {
                $filter['IBLOCK_SECTION_ID'] = $param;
            }
            else
            {
                $filter['IBLOCK_SECTION_CODE'] = $param;
            }

            $getElements = \Bitrix\Iblock\Elements\ElementServicecatalogTable::getList(
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
                    'filter' => $filter,
                    'limit' => $limit
                ]
            )->fetchAll();

            foreach ($getElements as $arItem)
            {
                $result[] = [
                    'id' => (int)$arItem['ID'],
                    'name' => (string)$arItem['NAME'],
                    'preview' => $arItem['PREVIEW_TEXT'],
                    'detail' => $arItem['DETAIL_TEXT'],
                    'image' => $arItem['PREVIEW_PICTURE'],
                    'sku' => $arItem['IBLOCK_ELEMENTS_ELEMENT_SERVICECATALOG_CML2_ARTICLE_VALUE'],
                    'unit' => $arItem['IBLOCK_ELEMENTS_ELEMENT_SERVICECATALOG_CML2_BASE_UNIT_VALUE'],
                ];
            }
        }
        catch (\Exception $e)
        {
            $result = ['status' => 'error', 'message' => $e->getMessage()];
        }
        return new \Bitrix\Main\Engine\Response\Json($result);
    }
}
