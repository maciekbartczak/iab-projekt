<?php

Router::delete('/hello/([a-zA-Z0-9]*)', function (Request $req, Response $res) {
    $res->to_json([
        'message' => 'id ' . $req->params[0],
        'status' => 'ok'
    ]);
});