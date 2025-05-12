<html lang="ru">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <?php
    $APPLICATION->SetAdditionalCSS("/ui-kit/css/main.css");
    $APPLICATION->ShowHead(false);
    ?>
</head>

<body>
    <div id="panel"><? $APPLICATION->ShowPanel(); ?></div> 
    <?$APPLICATION->IncludeComponent("bitrix:menu","left_side",Array(
		"ROOT_MENU_TYPE" => "top", 
		"MAX_LEVEL" => "1", 
		"CHILD_MENU_TYPE" => "top", 
		"USE_EXT" => "Y",
		"DELAY" => "N",
		"ALLOW_MULTI_SELECT" => "Y",
		"MENU_CACHE_TYPE" => "N", 
		"MENU_CACHE_TIME" => "3600", 
		"MENU_CACHE_USE_GROUPS" => "Y", 
		"MENU_CACHE_GET_VARS" => "" 
	)
);?>

    <div class="content-wrapper">
        <main>