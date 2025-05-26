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
	<? global $USER;
	if ($USER->IsAdmin()): ?>
		<div id="panel" style="position:fixed;top:0px; width:100%; z-index:9999;"><? $APPLICATION->ShowPanel(); ?></div>
	<? endif; ?>
	<? $APPLICATION->IncludeComponent(
		"bitrix:menu",
		"left_side",
		array(
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
	); ?>

	<div class="content-wrapper">
		<main>