<?php
require __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/lib/Router.php';
require_once __DIR__ . '/lib/Request.php';
require_once __DIR__ . '/lib/Response.php';
require_once __DIR__ . '/lib/Database.php';
require_once __DIR__ . '/lib/HttpStatus.php';

$GLOBALS['route_matched'] = false;

require_once __DIR__ . '/auth/authController.php';
require_once __DIR__ . '/user/userController.php';
require_once __DIR__ . '/product/productController.php';

if (!$GLOBALS['route_matched']) {
    $res = new Response();
    $res->status(HTTP_STATUS::NOT_FOUND)->body(['error' => 'no route found'])->send();
}

