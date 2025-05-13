<?php

namespace Api;

use Exception;

class GetElementBySection  extends \Bitrix\Main\Engine\Controller
{
    private $sectionTree;

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

    private function buildTree()
    {
        $IBLOCK_ID = 24;
        $arFilter = array('IBLOCK_ID' => $IBLOCK_ID);
        $rs_Section = \CIBlockSection::GetList(
            array('DEPTH_LEVEL' => 'desc'),
            $arFilter,
            false,
            array('ID', 'NAME', 'CODE', 'IBLOCK_SECTION_ID', 'DEPTH_LEVEL', 'SORT', 'ACTIVE')
        );
        $arSectionList = array();
        $arDepthLevel = array();
        while ($arSection = $rs_Section->GetNext(true, false))
        {
            $arSectionList[$arSection['ID']] = [
                'id' => $arSection['ID'],
                'name' => $arSection['NAME'],
                'code' => $arSection['CODE'],
                'parent' => $arSection['IBLOCK_SECTION_ID'],
                'depth_level' => $arSection['DEPTH_LEVEL']
            ];
            $arDepthLevel[] = $arSection['DEPTH_LEVEL'];
        }
        $arDepthLevelResult = array_unique($arDepthLevel);
        rsort($arDepthLevelResult);

        $i_MaxDepthLevel = $arDepthLevelResult[0];

        for ($i = $i_MaxDepthLevel; $i > 1; $i--)
        {
            foreach ($arSectionList as $i_SectionID => $arValue)
            {
                if ($arValue['depth_level'] == $i)
                {
                    $arSectionList[$arValue['parent']]['sections'][] = $arValue;
                    unset($arSectionList[$i_SectionID]);
                }
            }
        }
        $this->sectionTree = $arSectionList;
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
                    'brand' => $arItem['IBLOCK_ELEMENTS_ELEMENT_SERVICECATALOG_CML2_MANUFACTURER_VALUE'],
                ];
            }
        }
        catch (\Exception $e)
        {
            $result = ['status' => 'error', 'message' => $e->getMessage()];
        }
        return new \Bitrix\Main\Engine\Response\Json($result);
    }


    public function randomAction()
    {
        try
        {
            $limit = isset($_GET['limit']) ?? null;
            $this->buildTree();

            $sectionID = null;
            while ($sectionID == null)
            {
                $sectionRand = array_rand($this->sectionTree);
                $selectRand = $this->sectionTree[$sectionRand];
                foreach ($selectRand['sections'] as $subSection)
                {
                    if (is_array($subSection['sections'])) continue;
                    $sectionID = $subSection['id'];
                }
            }

            $filter['IBLOCK_SECTION_ID'] = $sectionID;

            $result['sections'] = $selectRand;
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
                        'IBLOCK_SECTION_ID'
                    ],
                    'filter' => $filter,
                    'limit' => $limit
                ]
            )->fetchAll();

            $filterBrand = [];
            foreach ($getElements as $arItem)
            {
                $filterBrand[] = [
                    $arItem['IBLOCK_ELEMENTS_ELEMENT_SERVICECATALOG_CML2_MANUFACTURER_VALUE'],
                ];
                $result['sections']['items'][] = [
                    'id' => (int)$arItem['ID'],
                    'name' => (string)$arItem['NAME'],
                    'preview' => $arItem['PREVIEW_TEXT'],
                    'parent' =>  $arItem['IBLOCK_SECTION_ID'],
                    'image' => $arItem['PREVIEW_PICTURE'],
                    'sku' => $arItem['IBLOCK_ELEMENTS_ELEMENT_SERVICECATALOG_CML2_ARTICLE_VALUE'],
                    'unit' => $arItem['IBLOCK_ELEMENTS_ELEMENT_SERVICECATALOG_CML2_BASE_UNIT_VALUE'],
                    'brand' => $arItem['IBLOCK_ELEMENTS_ELEMENT_SERVICECATALOG_CML2_MANUFACTURER_VALUE'],
                ];
            }

            $resultFilter = [
                'characteristics' => [
                    [
                        'manufacturer' =>
                        [
                            $filterBrand
                        ]
                    ],
                    'delivery' => [
                        [
                            'id' => 1,
                            'value' => '1 день',
                        ],
                        [
                            'id' => 2,
                            'value' => '2 дня',
                        ],
                        [
                            'id' => 3,
                            'value' => '2-5 дней',
                        ],
                        [
                            'id' => 4,
                            'value' => '5-10 дней',
                        ]
                    ]
                ]
            ];
            $result['filter'] = $resultFilter;
            $result['pagination'] = [];
            $result['sorting'] = [
                'sort' => [
                    [
                        'value' => 'name',
                        'name' => 'По имени',
                    ],
                    [
                        'value' => 'price',
                        'name' => 'По цене',
                    ],
                    [
                        'value' => 'date',
                        'name' => 'По дате',
                    ],
                ],
                'order' => [
                    [
                        'id' => 'asc',
                        'name' => 'По возрастанию',
                    ],
                    [
                        'id' => 'desc',
                        'name' => 'По убыванию',
                    ],
                ]
            ];
        }
        catch (\Exception $e)
        {
            $result = ['status' => 'error', 'message' => $e->getMessage()];
        }
        return new \Bitrix\Main\Engine\Response\Json($result);
    }


    public function filterAction($param)
    {
        try
        {
            $result = [];
            if (ctype_digit(strval($param)))
            {
                $searchSectionID =  \CIBlockSection::GetNavChain(24, $param);
                if ($searchSectionID->arResult[0]['DEPTH_LEVEL'] == 1)
                {
                    $rsParentSection = \CIBlockSection::GetByID($param);
                    if ($arParentSection = $rsParentSection->GetNext())
                    {
                        $arFilter = array('IBLOCK_ID' => 24, '>LEFT_MARGIN' => $arParentSection['LEFT_MARGIN'], '<RIGHT_MARGIN' => $arParentSection['RIGHT_MARGIN'], '>DEPTH_LEVEL' => $arParentSection['DEPTH_LEVEL']); // выберет потомков без учета активности
                        $searchSectionID = \CIBlockSection::GetList(array('left_margin' => 'asc'), $arFilter);
                    }
                }
            }
            else
            {
                $searchSectionID = \Bitrix\Iblock\SectionTable::getList(
                    [
                        'select' => ['ID'],
                        'filter' => ['NAME' => $param],
                        'limit' => 1
                    ]
                )->fetch();
                $searchSectionID = $searchSectionID['ID'];
                $searchSectionID = \CIBlockSection::GetNavChain(24, $searchSectionID);
            }
            $latestSection = '';
            while ($arSection = $searchSectionID->GetNext())
            {
                $arSectionList[$arSection['ID']] = [
                    'id' => $arSection['ID'],
                    'name' => $arSection['NAME'],
                    'code' => $arSection['CODE'],
                    'parent' => $arSection['IBLOCK_SECTION_ID'],
                    'depth_level' => $arSection['DEPTH_LEVEL']
                ];
                $arDepthLevel[] = $arSection['DEPTH_LEVEL'];
            }
            $arDepthLevelResult = array_unique($arDepthLevel);
            rsort($arDepthLevelResult);

            $i_MaxDepthLevel = $arDepthLevelResult[0];

            for ($i = $i_MaxDepthLevel; $i > 1; $i--)
            {
                foreach ($arSectionList as $i_SectionID => $arValue)
                {
                    if ($arValue['depth_level'] == $i)
                    {
                        $arSectionList[$arValue['parent']]['sections'][] = $arValue;
                        unset($arSectionList[$i_SectionID]);
                    }
                }
            }

            $result['sections'] = $arSectionList;
        }
        catch (\Exception $e)
        {
            $result = ['status' => 'error', 'message' => $e->getMessage()];
        }
        return new \Bitrix\Main\Engine\Response\Json($result);
    }
}
