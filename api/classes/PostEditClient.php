<?php

namespace Api;

use Bitrix\Main\Loader;
use Bitrix\Highloadblock as HL;
use Bitrix\Main\Entity;

class PostEditClient  extends \Bitrix\Main\Engine\Controller
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

    private function updateElementToHLBlockMock($hlblock,$elemId, $value)
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
        $result = $entityClass::Update($elemId,[
            'UF_MOCK' => $value
        ]);

        if ($result->isSuccess())
        {
            return $result->getId(); // Возвращает ID добавленной записи
        }
        else
        {
            throw new \Exception("Ошибка добавления: " . implode(', ', $result->getErrorMessages()));
        }
    }

    public function editAction()
    {
        $result = [];
        Loader::includeModule('highloadblock');
        try
        {
            $input = file_get_contents('php://input');

            $newId = $this->updateElementToHLBlockMock(4, $_GET['param'], $input);
            $result = ['status' => 'success', 'message' => "Запись успешно отредактирована"];
        }
        catch (\Exception $e)
        {
            $result = ['status' => 'error', 'message' => $e->getMessage()];
        }
        return new \Bitrix\Main\Engine\Response\Json($result);
    }
}
