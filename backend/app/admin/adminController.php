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