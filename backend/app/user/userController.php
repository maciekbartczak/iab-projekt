<?php

require_once __DIR__ . '/../lib/JwtUtils.php';
require_once __DIR__ . '/../auth/AuthService.php';

Router::get('/api/user/([0-9]*)/profile', function(Request $req, Response $res) {
    $user_id = $req->params[0];
    $user_service = new UserService();

    if (!AuthService::authorizeUserFromToken($user_id)) {
        return;
    }

    $user_profile = $user_service->getUserProfileById($user_id);;
    if(!$user_profile)
    {
      $res->status(HTTP_STATUS::NOT_FOUND)->send();
      return ;
    }
    $res->body($user_profile)->send();
});