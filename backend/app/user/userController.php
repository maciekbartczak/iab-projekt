<?php

require_once __DIR__ . '/../lib/JwtUtils.php';
require_once __DIR__ . '/../auth/AuthService.php';

Router::get('/api/user/([0-9]*)', function(Request $req, Response $res) {
    $user_id = $req->params[0];

    if (!AuthService::authorizeUserFromToken($user_id)) {
        return;
    }


    $res->send();
});