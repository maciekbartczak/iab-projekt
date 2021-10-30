<?php

require_once __DIR__ . '/lib/Router.php';
require_once __DIR__ . '/lib/Request.php';
require_once __DIR__ . '/lib/Response.php';
require_once __DIR__ . '/lib/Database.php';
require_once __DIR__ . '/lib/HttpStatus.php';

$GLOBALS['route_matched'] = false;

require_once __DIR__ . '/auth/authController.php';

if (!$GLOBALS['route_matched']) {
    $res = new Response();
    $res->status(HTTP_STATUS::NOT_FOUND)->body(['error' => 'no route found'])->send();
}