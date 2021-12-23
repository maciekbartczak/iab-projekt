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

            $statement = $this->db->prepare('SELECT * FROM CartItem WHERE productId=:productId AND cartId=:cartId');
            $statement->bindParam(':cartId', $cart_id);
            $statement->bindParam(':productId', $product_id);
            $statement->execute();
            $cart_item = $statement->fetchObject();

            if ($cart_item) {
                $statement = $this->db->prepare('UPDATE CartItem SET quantity = :quantity WHERE id = :id');
                $new_quantity = $cart_item->quantity + $quantity;
                $statement->bindParam(':quantity', $new_quantity);
                $statement->bindParam(':id', $cart_item->id);
                $statement->execute();
            } else
            {
                $statement = $this->db->prepare('INSERT INTO CartItem (cartId, productId, quantity) 
                                                VALUES (:cartId, :productId, :quantity)');
                $statement->bindParam(':cartId', $cart_id);
                $statement->bindParam(':productId', $product_id);
                $statement->bindParam(':quantity', $quantity);
                $statement->execute();
            }

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

    public function removeCartItem($item_id, $user_id)
    {
        try {
            $item = $this->getCartItemById($item_id);
            if (!$item) {
                return false;
            }

            $statement = $this->db->prepare('SELECT * FROM ShoppingCart WHERE id = :id');
            $statement->bindParam(':id', $item->cartId);
            $statement->execute();
            $cart = $statement->fetchObject('ShoppingCart');

            if ($cart->UserId != $user_id) {
                return false;
            }

            $statement = $this->db->prepare('DELETE FROM CartItem WHERE id = :id');
            $statement->bindParam(':id', $item_id);
            $statement->execute();

            $product = $this->product_service->getProductById($item->productId);
            $new_total = $cart->total - ($product->price * $item->quantity);

            $statement = $this->db->prepare('UPDATE ShoppingCart SET total = :total WHERE id = :id');
            $statement->bindParam(':total', $new_total);
            $statement->bindParam(':id', $item->cartId);
            $statement->execute();

            return true;
        } catch (PDOException $e) {
            exit($e);
        }
    }

    public function modifyItemQuantity($item_id, $user_id, $item_quantity) {
        try {
            $item = $this->getCartItemById($item_id);
            if (!$item) {
                return false;
            }

            $statement = $this->db->prepare('SELECT * FROM ShoppingCart WHERE id = :id');
            $statement->bindParam(':id', $item->cartId);
            $statement->execute();
            $cart = $statement->fetchObject('ShoppingCart');

            if ($cart->UserId != $user_id) {
                return false;
            }

            $statement = $this->db->prepare('UPDATE CartItem SET quantity = :quantity WHERE id = :id');
            $statement->bindParam(':quantity', $item_quantity);
            $statement->bindParam(':id', $item_id);
            $statement->execute();

            $product = $this->product_service->getProductById($item->productId);
            $new_total = $cart->total - ($product->price * $item->quantity) + ($product->price * $item_quantity);

            $statement = $this->db->prepare('UPDATE ShoppingCart SET total = :total WHERE id = :id');
            $statement->bindParam(':total', $new_total);
            $statement->bindParam(':id', $item->cartId);
            $statement->execute();

            return true;
        } catch (PDOException $e) {
            exit($e);
        }
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

    private function getCartItemById($item_id)
    {
        try {
            $statement = $this->db->prepare('SELECT * FROM CartItem WHERE id = :id');
            $statement->bindParam(':id', $item_id);
            $statement->execute();
            return $statement->fetchObject();
        } catch (PDOException $e) {
            exit($e);
        }
    }
}