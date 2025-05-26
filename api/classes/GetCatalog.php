<?php

namespace Api;

use Faker\Provider\Lorem;

class GetCatalog  extends \Bitrix\Main\Engine\Controller
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

    private function getItems($section)
    {
        $items = \Bitrix\Iblock\Elements\ElementServicecatalogTable::getList(
            [
                'select' =>
                [
                    '*'
                ],
                'filter' =>
                [
                    '=ACTIVE' => 'Y',
                    'IBLOCK_SECTION_ID' => $section,
                    'IBLOCK_ID' => 24
                ],
                'limit' => 1
            ]
        )->fetchAll();
        return $items;
    }

    public function viewAction()
    {

        $result = [];
        $this->buildTree();
        $filter = [
            'characteristics' => [
                [
                    'color' => [
                        'name' => 'Цвет',
                        'value' => [
                            [
                                'id' => 1,
                                'name' => 'Красный',
                            ],
                            [
                                'id' => 2,
                                'name' => 'Синий',
                            ],
                            [
                                'id' => 3,
                                'name' => 'Зеленый',
                            ],
                        ]
                    ],
                    'size' => [
                        'name' => 'Размер',
                        'value' => [
                            [
                                'id' => 1,
                                'name' => 'Маленький',
                            ],
                            [
                                'id' => 2,
                                'name' => 'Средний',
                            ],
                            [
                                'id' => 3,
                                'name' => 'Большой',
                            ],
                        ]
                    ],
                    'material' => [
                        'name' => 'Материал',
                        'value' => [
                            [
                                'id' => 1,
                                'name' => 'Дерево',
                            ],
                            [
                                'id' => 2,
                                'name' => 'Металл',
                            ],
                            [
                                'id' => 3,
                                'name' => 'Пластик',
                            ],
                        ]
                    ],
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

        ];
        $result['sections'] = $this->sectionTree;
        $result['filter'] = $filter;
        $result['pagination'] = [
            'page' => 1,
            'itemsPerPage' => 10,
            'total' => 100,
        ];
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
        return new \Bitrix\Main\Engine\Response\Json($result);
    }
}
