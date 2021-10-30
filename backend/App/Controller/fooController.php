<?php

Router::delete('/hello/([a-zA-Z0-9]*)', function (Request $req, Response $res) {
    $res->body([
        'message' => 'id ' . $req->params[0],
        'status' => 'ok'
    ])->send();
});

Router::post('/hello', function (Request $req, Response $res) {
    $res->status(200)->body($req->get_body()['hello'])->send();
});