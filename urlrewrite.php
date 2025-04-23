<?php
$arUrlRewrite = array(
    0 =>
    array(
        'CONDITION' => '#^/catalog/([\\w\\d_-]+)/([\\w\\d_-]+)/#',
        'RULE' => 'ELEMENT_CODE=$1',
        'ID' => '',
        'PATH' => '/catalog/element.php',
        'SORT' => 100,
    ),
    1 =>
    array(
        'CONDITION' => '#^/catalog/([\\w\\d_-]+)/#',
        'RULE' => 'ELEMENT_CODE=$1',
        'ID' => '',
        'PATH' => '/catalog/section.php',
        'SORT' => 100,
    ),
);
