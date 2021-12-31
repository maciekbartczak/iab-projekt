<?php

require_once __DIR__ . '/../order/OrderService.php';

Router::get('/api/admin/orders', function(Request $req, Response $res) {
    $order_service = new OrderService();

    if(!AuthService::authorizeUserFromTokenWithRole("ADMIN") && !AuthService::authorizeUserFromTokenWithRole("EMPLOYEE"))
    {
        return;
    }

    $res->body($order_service->getAllOrders())->send();
});

Router::put('/api/admin/order/([0-9]*)/ship', function(Request $req, Response $res) {
    $order_service = new OrderService();

    $order_id = $req->params[0];

    if(!$order_id)
    {
        $res->status(HTTP_STATUS::BAD_REQUEST)->send();
        return;
    }

    if(!AuthService::authorizeUserFromTokenWithRole("ADMIN") && !AuthService::authorizeUserFromTokenWithRole("EMPLOYEE"))
    {
        return;
    }
    $order_service->changeOrderStatus($order_id, 3);
    $res->send();
});

Router::put('/api/admin/order/([0-9]*)/finish', function(Request $req, Response $res) {
    $order_service = new OrderService();

    $order_id = $req->params[0];

    if(!$order_id)
    {
        $res->status(HTTP_STATUS::BAD_REQUEST)->send();
        return;
    }

    if(!AuthService::authorizeUserFromTokenWithRole("ADMIN") && !AuthService::authorizeUserFromTokenWithRole("EMPLOYEE"))
    {
        return;
    }
    $order_service->changeOrderStatus($order_id, 4);
    $res->send();
});