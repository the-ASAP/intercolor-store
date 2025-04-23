<?php

namespace Api;

use Exception;

class GetSaleList extends \Bitrix\Main\Engine\Controller
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
        $result['items'] = [
            [
                'id' => 1,
                'name' => 'Распродажа 1',
                'code'=> 'rasprodazha-1',
                'dateTill'=> '2023-10-01',
                'url'=> 'https://example.com/sale/rasprodazha-1',
            ],
            [
                'id' => 2,
                'name' => 'Распродажа 2',
                'code'=> 'rasprodazha-2',
                'dateTill'=> '2023-10-15',
                'url'=> 'https://example.com/sale/rasprodazha-2',
            ],
            [
                'id' => 3,
                'name' => 'Распродажа 3',
                'code'=> 'rasprodazha-3',
                'dateTill'=> '2023-11-01',
                'url'=> 'https://example.com/sale/rasprodazha-3',
            ]
        ];
        
        return new \Bitrix\Main\Engine\Response\Json($result);
    }
}
