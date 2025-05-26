<?php

use Bitrix\Main\Routing\RoutingConfigurator;
use Api\GetElementBySection;
use Api\GetElementById;
use Api\GetSaleList;
use Api\GetSaleElements;
use Api\GetStoragesList;
use Api\PostAuth;
use Api\GetCatalog;
use Api\PostCreateClient;
use Api\PostEditClient;
use Api\GetListClient;
use Api\GetClient;

header("Referrer-Policy: no-referrer-when-downgrade");
header("Content-type: application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

\Bitrix\Main\Loader::registerAutoLoadClasses(
    null,
    [
        'Api\GetElementBySection' => '/api/classes/GetElementBySection.php',
        'Api\GetElementById' => '/api/classes/GetElementById.php',
        'Api\GetCatalog' => '/api/classes/GetCatalog.php'
        ,
        'Api\PostAuth' => '/api/classes/PostAuth.php',

        'Api\GetSaleList' => '/api/classes/GetSaleList.php',
        'Api\GetSaleElements' => '/api/classes/GetSaleElements.php',

        'Api\PostCreateClient' => '/api/classes/PostCreateClient.php',
        'Api\PostEditClient' => '/api/classes/PostEditClient.php',
        'Api\GetListClient' => '/api/classes/GetListClient.php',
        'Api\GetClient' => '/api/classes/GetClient.php',

        'Api\GetStoragesList' => '/api/classes/GetStorageList.php',
        'Api\GetStoragesList' => '/api/classes/GetStorageList.php',

        'Faker\Provider\Base' => '/api/classes/FakerBase.php',
        'Faker\Provider\Lorem' => '/api/classes/Faker.php',
    ]
);

return function (RoutingConfigurator $routes)
{
    $routes->get('/api/v1/catalog/', [GetCatalog::class, 'view']);

    $routes->get('/api/v1/catalog/section/', [GetElementBySection::class, 'main']);
    $routes->get('/api/v1/catalog/section/{param}/', [GetElementBySection::class, 'view']);
    $routes->get('/api/v1/catalog/section/{param}/filter/', [GetElementBySection::class, 'filter']);

    $routes->get('/api/v1/catalog/element/{id}/', [GetElementById::class, 'view']);

    $routes->get('/api/v1/sale/list/', [GetSaleList::class, 'view']);
    $routes->get('/api/v1/sale/{id}/elements/', [GetSaleElements::class, 'view']);

    $routes->get('/api/v1/storages/list/', [GetStoragesList::class, 'view']);


    $routes->post('/api/v1/auth/login', [PostAuth::class, 'login']);

    $routes->get('/api/v1/clients/{id}/', [GetClient::class, 'view']);
    $routes->get('/api/v1/clients/list', [GetListClient::class, 'view']);
    $routes->post('/api/v1/client/add/', [PostCreateClient::class, 'create']);
    $routes->post('/api/v1/client/{param}/edit/', [PostEditClient::class, 'edit']);
};
