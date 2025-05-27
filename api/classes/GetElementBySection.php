<?php

namespace Api;

use CIBlockElement;
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
        $IBLOCK_ID = 20;
        $arFilter = array('IBLOCK_ID' => $IBLOCK_ID);
        $rs_Section = \CIBlockSection::GetList(
            array('DEPTH_LEVEL' => 'desc'),
            $arFilter,
            false,
            array('ID', 'NAME', 'CODE', 'IBLOCK_SECTION_ID', 'DEPTH_LEVEL', 'SORT', 'ACTIVE')
        );
        $ar_SectionList = array();
        $ar_DepthLavel = array();
        while ($ar_Section = $rs_Section->GetNext(true, false))
        {
            $ar_SectionList[$ar_Section['ID']] = [
                'id' => $ar_Section['ID'],
                'name' => $ar_Section['NAME'],
                'code' => $ar_Section['CODE'],
                'parent' => $ar_Section['IBLOCK_SECTION_ID'],
                'depth_level' => $ar_Section['DEPTH_LEVEL']
            ];
            $ar_DepthLavel[] = $ar_Section['DEPTH_LEVEL'];
        }
        $ar_DepthLavelResult = array_unique($ar_DepthLavel);
        rsort($ar_DepthLavelResult);

        $i_MaxDepthLevel = $ar_DepthLavelResult[0];

        for ($i = $i_MaxDepthLevel; $i > 1; $i--)
        {
            foreach ($ar_SectionList as $i_SectionID => $ar_Value)
            {
                if ($ar_Value['depth_level'] == $i)
                {
                    $ar_SectionList[$ar_Value['parent']]['sections'][] = $ar_Value;
                    unset($ar_SectionList[$i_SectionID]);
                }
            }
        }
        $this->sectionTree = $ar_SectionList;
    }


    public function viewAction($param)
    {
        try
        {
            $limit = isset($_GET['limit']) ?? null;
            $filter = [
                'ACTIVE' => 'Y',
                'IBLOCK_ID' => 20,
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


    public function mainAction()
    {
        try
        {
            $limit = $_GET['limit'] ?? 10;
            $offset = $_GET['page'] * $limit;
            $countElems = \Bitrix\Iblock\Elements\ElementkbTable::getList(
                [
                    'select' => [
                        'ID'
                    ],
                    'filter'=>
                    [
                        'ACTIVE'=>'Y'
                    ],
                    'cache'=>
                    [
                        'ttl'=>120,
                    ]

                ])->fetchAll();

            $pagination =
            [
                'currentPage'=>$_GET['page']??1,
                'itemsPerPage'=>$limit,
                'totalItems'=>count($countElems),
                'totalPages'=>ceil( count($countElems)/$limit),
            ];    
            $filter =['ACTIVE'=>'Y'];
            if(!empty($_GET['brand']))
            {
                $filter= array_push($filter,['IBLOCK_ELEMENTS_ELEMENT_SERVICECATALOG_CML2_MANUFACTURER_VALUE' => $_GET['brand']]);
            }
            $getElements = \Bitrix\Iblock\Elements\ElementkbTable::getList(
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
                    'filter' => [
                        $filter
                    ],
                    'limit' => $limit,
                    'offset'=> $offset
                ]
            )->fetchAll();

            $filterBrand = [];
            $brands = \CIBlockElement::GetList(
                [],
                ['IBLOCK_ID'=>20,'ACTIVE'=>'Y'],
                'PROPERTY_CML2_MANUFACTURER',
                false,
                ['ID', 'PROPERTY_CML2_MANUFACTURER']
            );

            while($brand = $brands->GetNext())
            {
                if(!empty($brand['PROPERTY_CML2_MANUFACTURER_VALUE'])){
                $filterBrand[] = trim($brand['PROPERTY_CML2_MANUFACTURER_VALUE']);
                }
            }
            $filterBrand = array_unique($filterBrand);
            $remappedFilterBrand= [];
            foreach($filterBrand as $key=>$item)
            {       
                $remappedFilterBrand[] =[
                    'id'=>$key,
                    'name'=>$item
                ];
            }
            foreach ($getElements as $arItem)
            {
                if (!empty($arItem['IBLOCK_ELEMENTS_ELEMENT_SERVICECATALOG_CML2_MANUFACTURER_VALUE']))
                {
                    $filterBrand[] = [
                        'id' => ++$ic,
                        'name' => $arItem['IBLOCK_ELEMENTS_ELEMENT_SERVICECATALOG_CML2_MANUFACTURER_VALUE'],
                    ];
                }
                $result['items'][] = [
                    'id' => (int)$arItem['ID'],
                    'name' => (string)$arItem['NAME'],
                    'preview' => $arItem['PREVIEW_TEXT'],
                    'parent' =>  $arItem['IBLOCK_SECTION_ID'],
                    'image' =>  'https://managers.intercolor.asap-lp.ru/local/templates/store/images/logo.png',
                    'sku' => $arItem['IBLOCK_ELEMENTS_ELEMENT_SERVICECATALOG_CML2_ARTICLE_VALUE'],
                    'unit' => $arItem['IBLOCK_ELEMENTS_ELEMENT_SERVICECATALOG_CML2_BASE_UNIT_VALUE'],
                    'brand' => $arItem['IBLOCK_ELEMENTS_ELEMENT_SERVICECATALOG_CML2_MANUFACTURER_VALUE'],
                ];
            }

            $resultFilter = [
                'characteristics' => [
                    'manufacturer' =>
                    $remappedFilterBrand,
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
            $result['pagination'] = $pagination;
            $result['sorting'] = [
                'sort' => [
                    [
                        'value' => 'По популярности',
                        'name' => 'popular-asc',
                        'order' => 'asc'
                    ],
                    [
                        'value' => 'По популярности',
                        'name' => 'popular-desc',
                        'order' => 'desc'
                    ],
                    [
                        'value' => 'По цене',
                        'name' => 'price-asc',
                        'order' => 'asc'
                    ],
                    [
                        'value' => 'По цене',
                        'name' => 'price-desc',
                        'order' => 'desc'
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
                $searchSectionID =  \CIBlockSection::GetNavChain(20, $param);
                if ($searchSectionID->arResult[0]['DEPTH_LEVEL'] == 1)
                {
                    $rsParentSection = \CIBlockSection::GetByID($param);
                    if ($arParentSection = $rsParentSection->GetNext())
                    {
                        $arFilter = array('IBLOCK_ID' => 20, '>LEFT_MARGIN' => $arParentSection['LEFT_MARGIN'], '<RIGHT_MARGIN' => $arParentSection['RIGHT_MARGIN'], '>=DEPTH_LEVEL' => $arParentSection['DEPTH_LEVEL']); // выберет потомков без учета активности
                        $searchSectionID = \CIBlockSection::GetList(array('left_margin' => 'asc'), $arFilter);
                    }
                }
            }
            else
            {
                $searchSectionID = \Bitrix\Iblock\SectionTable::getList(
                    [
                        'select' => ['ID'],
                        'filter' => ['%NAME' => $param ],
                        'limit' => 1
                    ]
                )->fetch();
                $searchSectionID = $searchSectionID['ID'];
                $searchSectionID = \CIBlockSection::GetNavChain(20, $searchSectionID);
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
            if (empty($arSectionList))
            {
                return new \Bitrix\Main\Engine\Response\Json(['status' => 'error', 'text' => 'Ошибка получения данных']);
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
