<?php

require_once __DIR__ . '/../user/UserDetails.php';
require_once __DIR__ . '/../user/UserRepository.php';
require_once __DIR__ . '/../user/UserDTO.php';
require_once __DIR__ . '/../lib/JwtUtils.php';


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
    $userDetails = $user_repository->getUserDetailsById($user->id);
    $jwt = JwtUtils::createJWT($userDetails);

    $res->status(HTTP_STATUS::OK)->body(['token' => $jwt])->send();

});