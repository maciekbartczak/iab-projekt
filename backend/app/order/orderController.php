<?php

require_once __DIR__ . '/OrderService.php';

Router::post('/api/user/([0-9]*)/order', function (Request $req, Response $res) {
    $order_service = new OrderService();

    $user_id = $req->params[0];
    $cart_id = $req->get_param('cartId');
    $address_id = $req->get_param('addressId');

    if(!$user_id || !$cart_id || !$address_id)
    {
        $res->status(HTTP_STATUS::BAD_REQUEST)->send();
        return;
    }

    if(!AuthService::authorizeUserFromTokenWithId($user_id))
    {
        return;
    }

    $order_service->createNewOrder($user_id, $cart_id, $address_id);
    $res->send();
});

Router::get('/api/user/([0-9]*)/orders', function (Request $req, Response $res) {
    $order_service = new OrderService();

    $user_id = $req->params[0];
    if(!$user_id)
    {
        $res->status(HTTP_STATUS::BAD_REQUEST)->send();
        return;
    }

    if(!AuthService::authorizeUserFromTokenWithId($user_id))
    {
        return;
    }

    $orders = $order_service->getAllOrders($user_id);
    $res->body($orders)->send();
});