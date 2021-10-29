<?php //require __DIR__ . '/vendor/autoload.php';

require_once __DIR__ . '/Lib/Router.php';
require_once __DIR__ . '/Lib/Request.php';
require_once __DIR__ . '/Lib/Response.php';

require_once __DIR__ . '/Controller/fooController.php';


Router::get('/a', function() {
    echo 'Hello world';
});

