<?php

require_once __DIR__ . '/ProductService.php';

Router::get('/api/products', function (Request $req, Response $res) {
    $productService = new ProductService();
    $res->body($productService->getAll())->send();
});

Router::post('/api/products/pages', function (Request $req, Response $res) {
    $product_service = new ProductService();

    $page_number = $req->get_param("pageNumber");
    $products_per_page = $req->get_param("productsPerPage");
    $categories = $req->get_param('categories');

    $offset = ($page_number - 1) * $products_per_page;
    $product_count = $product_service->getAllCount($categories);
    $total_pages = ceil($product_count / $products_per_page);
    $products = $product_service->getProductPage($offset, $products_per_page, $categories);

    $res->body(["items" => $products, "totalPages" => $total_pages])->send();

});

Router::get('/api/products/categories', function (Request $req, Response $res) {
   $product_service = new ProductService();

   $res->body($product_service->getProductCategories())->send();
});