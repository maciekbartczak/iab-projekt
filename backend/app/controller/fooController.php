<?php

require __DIR__ . '/../lib/Database.php';

Router::delete('/hello/([a-zA-Z0-9]*)', function (Request $req, Response $res) {
    $res->body([
        'message' => 'id ' . $req->params[0],
        'status' => 'ok'
    ])->send();
});

Router::post('/hello', function (Request $req, Response $res) {
    $res->status(200)->body($req->get_body()['hello'])->send();
});

Router::get('/db', function (Request $req, Response $res) {
    $db = Database::get_instance();
    $statement = $db->query("SELECT * FROM user");
    $row = $statement->fetch(PDO::FETCH_ASSOC);
    $res->body($row['username'])->send();
});