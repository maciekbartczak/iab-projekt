<?php

require_once __DIR__ . '/../user/User.php';

Router::post('/api/auth/register', function (Request $req, Response $res) {
    $db = Database::get_instance();
    $username = $req->get_param('username');
    $password = password_hash($req->get_param('password'), PASSWORD_DEFAULT);

    if(!$username || !$password) {
        $res->body(['error' => 'missing-required-params'])->status(HTTP_STATUS::BAD_REQUEST)->send();
        return ;
    }

    try
    {
        $statement = $db->prepare('INSERT INTO user (role_id, username, password) VALUES (1, :username, :password)');
        $statement->bindParam(':username', $username);
        $statement->bindParam(':password', $password);
        $statement->execute();
    } catch (PDOException $e) {
        $res->status(HTTP_STATUS::SERVER_ERROR)->body()->send();
        return;
    }
    $res->status(HTTP_STATUS::OK)->send();
});

Router::post('/api/auth/login', function (Request $req, Response $res) {
    $db = Database::get_instance();

    $username = $req->get_param('username');
    $password = $req->get_param('password');

    if(!$username || !$password) {
        $res->body(['error' => 'missing-required-params'])->status(HTTP_STATUS::BAD_REQUEST)->send();
        return ;
    }

    try
    {
        $statement = $db->prepare('SELECT * FROM user WHERE username = :username');
        $statement->bindParam(':username', $username);
        $statement->execute();
        $user = $statement->fetchObject('User');

        if (empty($user) || !password_verify($password, $user->password)) {
            $res->status(HTTP_STATUS::BAD_REQUEST)->body(['error' => 'invalid-username-or-password'])->send();
            return ;
        }
    } catch (PDOException $e) {
        $res->status(HTTP_STATUS::SERVER_ERROR)->send();
        return;
    }
    $res->status(HTTP_STATUS::OK)->body(['message' => 'logged in!'])->send();

});