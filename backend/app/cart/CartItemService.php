<?php

require_once __DIR__ . '/../product/ProductService.php';
require_once __DIR__ . '/../cart/CartService.php';
require_once __DIR__ . '/../cart/ShoppingCart.php';

class CartItemService
{
    private Database $db;
    private ProductService $product_service;

    public function __construct()
    {
        $this->db = Database::get_instance();
        $this->product_service = new ProductService();
    }

    public function addCartItem($cart_id, $product_id, $quantity): bool
    {
        try {
            $product = $this->product_service->getProductById($product_id);
            if (!$product) {
                return false;
            }
            $statement = $this->db->prepare('INSERT INTO CartItem (cartId, productId, quantity) 
                                                VALUES (:cartId, :productId, :quantity)');
            $statement->bindParam(':cartId', $cart_id);
            $statement->bindParam(':productId', $product_id);
            $statement->bindParam(':quantity', $quantity);
            $statement->execute();

            $statement = $this->db->prepare('SELECT * FROM ShoppingCart WHERE id = :id');
            $statement->bindParam(':id', $cart_id);
            $statement->execute();
            $cart = $statement->fetchObject('ShoppingCart');

            $product = $this->product_service->getProductById($product_id);
            $new_total = $cart->total + ($product->price * $quantity);

            $statement = $this->db->prepare('UPDATE ShoppingCart SET total = :total WHERE id = :id');
            $statement->bindParam(':total', $new_total);
            $statement->bindParam(':id', $cart_id);
            $statement->execute();
            return true;
        } catch (PDOException $e) {
            exit($e);
        }
    }

    public function removeCartItem($item_id)
    {

    }

    public function getAllCartItems($cart_id)
    {
        try {
            $statement = $this->db->prepare('SELECT * FROM CartItem WHERE cartId = :cartId');
            $statement->bindParam('cartId', $cart_id);
            $statement->execute();
            $cart_items = $statement->fetchAll(PDO::FETCH_ASSOC);
            if ($cart_items) {
                return $cart_items;
            }
        } catch (PDOException $e) {
            exit($e);
        }
        return null;
    }

    public function getAllCartProducts($cart_id)
    {
        try {
            $statement = $this->db->prepare('SELECT * FROM Product 
                    JOIN CartItem ON Product.id = CartItem.productId
                    WHERE CartItem.cartId = :cartId');
            $statement->bindParam('cartId', $cart_id);
            $statement->execute();
            $cart_products = $statement->fetchAll(PDO::FETCH_ASSOC);
            if ($cart_products) {
                return $cart_products;
            }
        } catch (PDOException $e) {
            exit($e);
        }
        return null;
    }
}