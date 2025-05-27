<?php if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die(); ?>

<?php

use \Bitrix\Main\Loader;
use \Bitrix\Highloadblock as HL;

Loader::includeModule('highloadblock');


$hlblockId = 4;

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
    'select' => ['ID', 'UF_MOCK'],
])->fetchAll();
?>
<ul class="list client-list">
    <?php

    if (!empty($result))
    {
        foreach ($result as $item)
        {
         
            $fields = json_decode($item['UF_MOCK'], true);
        
    ?>
            <li class="list__item client-item">
                <div class="client-item__name"><?= $fields['full_name'] ?></div>
                <div class="client-item__type"><?= $fields['client_type'] ?></div>
                <div class="client-item__phone"><?= $fields['phone']; ?></div>
                <div class="client-item__mail"><?= $fields['email'] ?></div>
                <a href="/clients/<?= $item['ID'] ?>/" class="btn btn--icon-only--large btn--dark">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19 12H5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path
                            d="M14 17L19 12"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"></path>
                        <path
                            d="M14 7L19 12"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"></path>
                    </svg>
                </a>
            </li>


    <? }
    } ?>
</ul>