<?php

require_once __DIR__ . '/../user/UserDetails.php';
require_once __DIR__ . '/../user/UserRepository.php';
require_once __DIR__ . '/../user/User.php';
require_once __DIR__ . '/../user/CreateUserRequest.php';
require_once __DIR__ . '/../lib/JwtUtils.php';


Router::post('/api/auth/register', function (Request $req, Response $res) {

    $user_repository = new UserRepository();

    $username = $req->get_param('username');
    if(!$username) {
        $res->body(['error' => 'missing-required-params'])->status(HTTP_STATUS::BAD_REQUEST)->send();
        return ;
    }

    $user = $user_repository->getUserByUsername($username);
    if ($user) {
        $res->body(['error' => 'user-exists'])->status(HTTP_STATUS::UNPROCESSABLE_ENTITY)->send();
        return ;
    }

    $password = password_hash($req->get_param('password'), PASSWORD_DEFAULT);
    $first_name = $req->get_param('firstName');
    $last_name = $req->get_param('lastName');
    $email = $req->get_param('email');

    if(!$password || !$first_name || !$last_name || !$email) {
        $res->body(['error' => 'missing-required-params'])->status(HTTP_STATUS::BAD_REQUEST)->send();
        return ;
    }

    $user_repository = new UserRepository();
    $user_repository->saveUser(new CreateUserRequest($username, $password, $first_name, $last_name, $email));

    $res->status(HTTP_STATUS::CREATED)->send();

});

Router::post('/api/auth/login', function (Request $req, Response $res) {

    $user_repository = new UserRepository();

    $username = $req->get_param('username');
    $password = $req->get_param('password');

    if(!$username || !$password) {
        $res->body(['error' => 'missing-required-params'])->status(HTTP_STATUS::BAD_REQUEST)->send();
        return ;
    }

    $user = $user_repository->getUserByUsername($username);

    if (!$user || !password_verify($password, $user->password)) {
        $res->status(HTTP_STATUS::BAD_REQUEST)->body(['error' => 'invalid-username-or-password'])->send();
        return ;
    }
    $userDetails = $user_repository->getUserDetailsById($user->id);
    $jwt = JwtUtils::createJWT($userDetails);

    $res->status(HTTP_STATUS::OK)->body(['token' => $jwt])->send();
});