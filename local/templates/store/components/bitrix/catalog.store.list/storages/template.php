<?php if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die(); ?>

<?php
if ($arResult['STORES']):
?>
    <ul class="list warehouses-list">
        <?php foreach ($arResult['STORES'] as $store): ?>
            <li class="list__item warehouses-item">
                <div class="warehouses-item__field warehouses-item__name"><?= $store['STORE_TITLE'] ?></div>
                <div class="warehouses-item__field warehouses-item__city"><?= explode(',', $store['ADDRESS'])[0] ?></div>
                <div class="warehouses-item__field warehouses-item__phone"><?= $store['PHONE']; ?></div>
                <div class="warehouses-item__field warehouses-item__mail"><?= $arResult['EMAILS'][$store['ID']] ?></div>
                <button class="btn btn--text btn--dark">Посмотреть товары</button>
            </li>
        <?php endforeach; ?>
    </ul>
<?php endif; ?>