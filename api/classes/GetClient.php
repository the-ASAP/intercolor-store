<?php

namespace Api;

use Bitrix\Main\Loader;
use Bitrix\Highloadblock as HL;
use Bitrix\Main\Entity;

class GetClient  extends \Bitrix\Main\Engine\Controller
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

    private function getElementFromHLBlockMock($hlblock,$id)
    {
        if (!\Bitrix\Main\Loader::includeModule('highloadblock'))
        {
            throw new \Exception('Модуль highloadblock не подключен.');
        }

        $hlblockId = $hlblock;

        // Получение данных highload-блока
        $hlblock = HL\HighloadBlockTable::getById($hlblockId)->fetch();

        if (!$hlblock)
        {
            throw new \Exception("Highload-блок с ID {$hlblockId} не найден.");
        }

        // Получение ORM-класса для работы с HL-блоком
        $entity = HL\HighloadBlockTable::compileEntity($hlblock);
        $entityClass = $entity->getDataClass();

        // Добавление новой записи
        $result = $entityClass::getList([
            'select' => ['UF_MOCK'],
            'filter'=>['ID'=>$id]
        ])->fetchAll();

        if (!empty($result))
        {
            $ret = [];
            foreach ($result as $item)
            {
                $ret[] = json_decode($item['UF_MOCK']);
            }
            return $ret;
        }
    }

    public function viewAction()
    {
        $result = [];
        Loader::includeModule('highloadblock');
        try
        {
            $result = $this->getElementFromHLBlockMock(4,$_GET['id']);
        }
        catch (\Exception $e)
        {
            $result = ['status' => 'error', 'message' => $e->getMessage()];
        }
        return new \Bitrix\Main\Engine\Response\Json($result);
    }
}
