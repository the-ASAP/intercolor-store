<?php

namespace Api;

use Faker\Provider\Lorem;

class GetCatalog  extends \Bitrix\Main\Engine\Controller
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

        $result =[];
        $catalogStructure = \Bitrix\Iblock\SectionTable::getList(
            [
                'select' => [
                    'ID',
                    'NAME',
                    'DEPTH_LEVEL',
                    'IBLOCK_SECTION_ID',
                    'CODE',
                    'LEFT_MARGIN',
                    'ITEM_NAME'=>'ELEMENTS.NAME',
                    'ITEM_PREVIEW_TEXT'=>'ELEMENTS.PREVIEW_TEXT',
                    'ITEM_ID'=>'ELEMENTS.ID',
                    'ITEM_CODE'=>'ELEMENTS.CODE',
                    'ITEM_PREVIEW_PICTURE'=>'ELEMENTS.PREVIEW_PICTURE',
                ],
                'filter' => [
                    '=IBLOCK_ID' => 20,
                    '=ACTIVE' => 'Y',
                ],
                'order' => [
                    'SORT' => 'ASC'
                ],
                'runtime'=>
                [
                    'ELEMENTS'=>
                    [
                        'data_type'=>\Bitrix\Iblock\Elements\ElementServicecatalogTable::class,
                        'reference' => [
                            '=this.ID' => 'ref.IBLOCK_SECTION_ID',
                            '=ref.ACTIVE' =>  new \Bitrix\Main\DB\SqlExpression('?', 'Y'),
                            '=ref.IBLOCK_ID' => new \Bitrix\Main\DB\SqlExpression('?', 20),
                        ],
                        'join_type' => 'INNER',
                    ]
                ]
            ]
        )->fetchAll();

        $filter = [
            'characteristics'=>[
                [
                    'color'=>[
                        'name'=>'Цвет',
                        'value'=>[
                            [
                                'id'=>1,
                                'name'=>'Красный',
                            ],
                            [
                                'id'=>2,
                                'name'=>'Синий',
                            ],
                            [
                                'id'=>3,
                                'name'=>'Зеленый',
                            ],
                        ]
                        ],
                    'size'=>[
                        'name'=>'Размер',
                        'value'=>[
                            [
                                'id'=>1,
                                'name'=>'Маленький',
                            ],
                            [
                                'id'=>2,
                                'name'=>'Средний',
                            ],
                            [
                                'id'=>3,
                                'name'=>'Большой',
                            ],
                        ]
                    ],
                    'material'=>[
                        'name'=>'Материал',
                        'value'=>[
                            [
                                'id'=>1,
                                'name'=>'Дерево',
                            ],
                            [
                                'id'=>2,
                                'name'=>'Металл',
                            ],
                            [
                                'id'=>3,
                                'name'=>'Пластик',
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
        foreach($catalogStructure as $struct)
        {
            $result['section'][$struct['IBLOCK_SECTION_ID']]['id'] = $struct['IBLOCK_SECTION_ID']??0;
            $result['section'][$struct['IBLOCK_SECTION_ID']]['name'] = $struct['NAME'];
            $result['section'][$struct['IBLOCK_SECTION_ID']]['code'] = $struct['CODE']?? \CUtil::translit($struct['NAME'], 'ru',
                [
                    'replace_space' => '-',
                    'replace_other' => '-',
                ]
            );
                $result['section'][$struct['IBLOCK_SECTION_ID']]['items'][] = [
                'id' => $struct['ITEM_ID'],
                'name' => $struct['ITEM_NAME'],
                'preview' => $struct['ITEM_PREVIEW_TEXT'],
                'code' => $struct['ITEM_CODE']?? \CUtil::translit($struct['ITEM_NAME'], 'ru',
                    [
                        'replace_space' => '-',
                        'replace_other' => '-',
                    ]
                ),
                'image' => \CFile::GetPath($struct['ITEM_PREVIEW_PICTURE']),
                'price'=>10500,
                'old_price'=>15000,
                'total_count'=>15,
                'stocks'=>[
                    [
                        'id'=>1,
                        'name'=>'Склад 1',
                        'count'=>10,
                    ],
                    [
                        'id'=>2,
                        'name'=>'Склад 2',
                        'count'=>5,
                    ],
                ]
            ];
        }
        $result['filter']=$filter;
        $result['pagination'] =[
            'page'=>1,
            'itemsPerPage'=>10,
            'total'=>100,
        ];
        $result['sorting'] = [
            'sort'=>[
                [
                    'value'=>'name',
                    'name'=>'По имени',
                ],
                [
                    'value'=>'price',
                    'name'=>'По цене',
                ],
                [
                    'value'=>'date',
                    'name'=>'По дате',
                ],
            ],
            'order'=>[
                [
                    'id'=>'asc',
                    'name'=>'По возрастанию',
                ],
                [
                    'id'=>'desc',
                    'name'=>'По убыванию',
                ],
            ]
        ];
        return new \Bitrix\Main\Engine\Response\Json($result);
    }
}
