<?php

require_once __DIR__ . '/../lib/JwtUtils.php';


Router::get('/api/user/([0-9]*)', function(Request $req, Response $res) {
    try {
        $token_data = JwtUtils::getDecodedJWT();
    } catch (Exception $e) {
        $res->status(HTTP_STATUS::UNATHORIZED)->send();
        return ;
    }

    $auth_user_id = $token_data->userDetails->id;
    $user_id = $req->params[0];

    if ($auth_user_id != $user_id) {
        $res->status(HTTP_STATUS::FORBIDDEN)->send();
        return ;
    }
    $res->send();
});