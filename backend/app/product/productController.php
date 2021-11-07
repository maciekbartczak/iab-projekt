<?php

require_once __DIR__ . '/ProductService.php';

Router::get('/api/products', function (Request $req, Response $res) {
    $productService = new ProductService();
    $res->body($productService->getAll())->send();
});