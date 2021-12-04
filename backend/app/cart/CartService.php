<?php

require_once __DIR__ . '/ShoppingCart.php';
require_once __DIR__ . '/CartItemService.php';


class CartService
{
    private Database $db;
    private CartItemService $cart_item_service;

    public function __construct()
    {
        $this->db = Database::get_instance();
        $this->cart_item_service = new CartItemService();
    }

    public function addItem($user_id, $item_id, $item_quantity)
    {
        $cart = $this->getCartByUserId($user_id);
        $this->cart_item_service->addCartItem($cart->id, $item_id, $item_quantity);
    }

    public function getCartByUserId($user_id)
    {
        try {
            $statement = $this->db->prepare('SELECT * FROM ShoppingCart WHERE UserId = :UserId');
            $statement->bindParam(':UserId', $user_id);
            $statement->execute();
            $cart = $statement->fetchObject('ShoppingCart');
            if ($cart) {
                return $cart;
            }
        } catch (PDOException $e) {
            exit($e);
        }
        return null;
    }

    public function getAllCartProducts($user_id)
    {
        try {
            $cart = $this->getCartByUserId($user_id);
            $cart_products = $this->cart_item_service->getAllCartProducts($cart->id);
            if ($cart_products) {
                return $cart_products;
            }
        } catch (PDOException $e) {
            exit($e);
        }
        return null;
    }

    public function createCart($user_id)
    {
        try {
            $statement = $this->db->prepare('INSERT INTO ShoppingCart (UserId, total) VALUES (:UserId, 0)');
            $statement->bindParam(':UserId', $user_id);
            $statement->execute();
        } catch (PDOException $e) {
            exit($e);
        }
    }
}