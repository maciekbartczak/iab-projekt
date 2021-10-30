<?php

require_once __DIR__ . '/../user/User.php';
require_once __DIR__ . '/../user/UserRepository.php';
require_once __DIR__ . '/../user/UserDTO.php';

Router::post('/api/auth/register', function (Request $req, Response $res) {

    $username = $req->get_param('username');
    $password = password_hash($req->get_param('password'), PASSWORD_DEFAULT);

    if(!$username || !$password) {
        $res->body(['error' => 'missing-required-params'])->status(HTTP_STATUS::BAD_REQUEST)->send();
        return ;
    }

    $user_repository = new UserRepository();
    $user_repository->saveUser(new UserDTO($username, $password));

    $res->status(HTTP_STATUS::OK)->send();
});

Router::post('/api/auth/login', function (Request $req, Response $res) {

    $username = $req->get_param('username');
    $password = $req->get_param('password');

    if(!$username || !$password) {
        $res->body(['error' => 'missing-required-params'])->status(HTTP_STATUS::BAD_REQUEST)->send();
        return ;
    }

    $user_repository = new UserRepository();
    $user = $user_repository->getUserByUsername($username);

    if (!$user || !password_verify($password, $user->password)) {
        $res->status(HTTP_STATUS::BAD_REQUEST)->body(['error' => 'invalid-username-or-password'])->send();
        return ;
    }

    $res->status(HTTP_STATUS::OK)->body(['message' => 'logged in!'])->send();

});