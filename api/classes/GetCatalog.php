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

  

    public function viewAction()
    {

        $result = [];
        $this->buildTree();
        
        $result['sections'] = $this->sectionTree;
    
        return new \Bitrix\Main\Engine\Response\Json($result);
    }
}
