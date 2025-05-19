<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/CatalogApp.bundle.css',
	'js' => 'dist/CatalogApp.bundle.js',
	'rel' => [
		'main.polyfill.core',
		'ui.vue3',
		'ui.vue3.pinia',
		'lodash',
	],
	'skip_core' => true,
];
