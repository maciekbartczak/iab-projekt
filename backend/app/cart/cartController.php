<?php

require_once __DIR__ . '/CartService.php';
require_once __DIR__ . '/../auth/AuthService.php';


Router::post('/api/user/([0-9]*)/cart/item', function (Request $req, Response $res) {
    $cart_service = new CartService();

    $user_id = $req->params[0];
    $item_id = $req->get_param('itemId');
    $quantity = $req->get_param('quantity');

    if(!$user_id || !$item_id || !$quantity)
    {
        $res->status(HTTP_STATUS::BAD_REQUEST)->send();
        return;
    }

    if(!AuthService::authorizeUserFromTokenWithId($user_id))
    {
        return;
    }

    $cart_service->addItem($user_id, $item_id, $quantity);
    $res->send();
});

Router::get('/api/user/([0-9]*)/cart', function (Request $req, Response $res) {
    $cart_service = new CartService();

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

   $res->body([
       'cartInfo' => $cart_service->getCartByUserId($user_id),
       'products' =>  $cart_service->getAllCartProducts($user_id)
       ])->send();
});

Router::delete('/api/user/([0-9]*)/cart/item/([0-9]*)', function (Request $req, Response $res) {
    $cart_service = new CartService();

    $user_id = $req->params[0];
    $item_id = $req->params[1];

    if(!$user_id || !$item_id)
    {
        $res->status(HTTP_STATUS::BAD_REQUEST)->send();
        return;
    }

    if(!AuthService::authorizeUserFromTokenWithId($user_id))
    {
        return;
    }

    if (!$cart_service->removeItem($item_id, $user_id))
    {
        $res->status(HTTP_STATUS::BAD_REQUEST)->send();
        return;
    }
    $res->send();
});
