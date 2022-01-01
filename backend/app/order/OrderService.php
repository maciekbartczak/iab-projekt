<?php

require_once __DIR__ . '/../cart/CartItemService.php';
require_once __DIR__ . '/../cart/CartService.php';
require_once __DIR__ . '/../product/ProductService.php';

class OrderService
{
    private Database $db;
    private CartItemService $cart_item_service;
    private CartService $cart_service;
    private ProductService $product_service;

    public function __construct()
    {
        $this->db = Database::get_instance();
        $this->cart_item_service = new CartItemService();
        $this->cart_service = new CartService();
        $this->product_service = new ProductService();
    }

    public function createNewOrder($user_id, $cart_id, $address_id): bool
    {
        try {
            $statement = $this->db->prepare('INSERT INTO OrderAddress (UserId, addressLine1, addressLine2, city, postalCode, country, phoneNumber)
                                            SELECT UserId, addressLine1, addressLine2, city, postalCode, country, phoneNumber FROM UserAddress WHERE id = :id');
            $statement->bindParam(":id", $address_id);
            $statement->execute();
            $id = $this->db->lastInsertId();

            $statement = $this->db->prepare('INSERT INTO `Order` (UserId, addressId, statusId, total, placedAt) VALUES (:UserId, :addressId, 1, 0, CURRENT_TIMESTAMP())');
            $statement->bindParam(":UserId", $user_id);
            $statement->bindParam(":addressId", $id);
            $statement->execute();
            $order_id = $this->db->lastInsertId();

            $cart_items = $this->cart_item_service->getAllCartItems($cart_id);
            $total = 0;
            foreach ($cart_items as $cart_item) {
                $statement = $this->db->prepare('INSERT INTO `OrderItem` (orderId, productId,price, quantity) VALUES (:orderId, :productId, :price, :quantity)');
                $statement->bindParam(':orderId', $order_id);
                $statement->bindParam(':productId', $cart_item['productId']);
                $product_price = $this->product_service->getProductById($cart_item['productId'])->price;
                $total += $product_price;
                $statement->bindParam(':price', $product_price);
                $statement->bindParam(':quantity', $cart_item['quantity']);
                $statement->execute();
            }
            $this->cart_item_service->deleteAllCartItems($cart_id);
            $this->cart_service->clearCart($cart_id);

            $statement = $this->db->prepare('UPDATE `Order` SET total = :total WHERE id = :id');
            $statement->bindParam(':total', $total);
            $statement->bindParam(':id', $order_id);
            $statement->execute();
            return true;
        } catch (PDOException) {
            return false;
        }
    }

    public function getAllUserOrders($user_id): ?array
    {
        try {
            $full_orders = array();

            $statement = $this->db->prepare('SELECT O.id, O.addressId, O.total, O.placedAt, SD.status AS orderStatus
                                            FROM `Order` AS O JOIN StatusDetails SD on O.statusId = SD.id WHERE UserId = :userId');
            $statement->bindParam(':userId', $user_id);
            $statement->execute();
            $orders = $statement->fetchAll(PDO::FETCH_ASSOC);

            foreach ($orders as $order) {
                $statement = $this->db->prepare('SELECT oi.id, oi.orderId, oi.productId, oi.price, oi.quantity, p.name, p.imageUrl
                                                FROM OrderItem AS oi JOIN Product AS p ON p.id = oi.productId WHERE orderId = :orderId');
                $statement->bindParam(':orderId', $order['id']);
                $statement->execute();
                $items = $statement->fetchAll(PDO::FETCH_ASSOC);
                $full_order = ['order' => $order, 'items' => $items];
                array_push($full_orders, $full_order);
            }

            return $full_orders;
        } catch (PDOException) {
            return null;
        }

    }

    public function payForOrder($user_id, $order_id): bool
    {
        try {
            $statement = $this->db->prepare('UPDATE `Order` SET statusId = 2 WHERE UserId = :UserId AND id = :id AND statusId = 1');
            $statement->bindParam(':UserId', $user_id);
            $statement->bindParam(':id', $order_id);
            return $statement->execute();
        } catch (PDOException) {
            return false;
        }
    }

    public function getAllOrders() {
        try {
            $full_orders = array();

            $statement = $this->db->prepare('SELECT O.id, O.addressId, O.total, O.placedAt, SD.status AS orderStatus
                                            FROM `Order` AS O JOIN StatusDetails SD on O.statusId = SD.id');
            $statement->execute();
            $orders = $statement->fetchAll(PDO::FETCH_ASSOC);

            foreach ($orders as $order) {
                $statement = $this->db->prepare('SELECT oi.id, oi.orderId, oi.productId, oi.price, oi.quantity, p.name, p.imageUrl
                                                FROM OrderItem AS oi JOIN Product AS p ON p.id = oi.productId WHERE orderId = :orderId');
                $statement->bindParam(':orderId', $order['id']);
                $statement->execute();
                $items = $statement->fetchAll(PDO::FETCH_ASSOC);
                $full_order = ['order' => $order, 'items' => $items];
                array_push($full_orders, $full_order);
            }

            return $full_orders;
        } catch (PDOException) {
            return null;
        }
    }

    public function changeOrderStatus($order_id, $new_status) {
        try {
            $statement = $this->db->prepare('UPDATE `Order` SET statusId = :status WHERE id = :id');
            $statement->bindParam(':id', $order_id);
            $statement->bindParam(':status', $new_status);
            return $statement->execute();
        } catch (PDOException) {
            return false;
        }
    }

    public function getOrderAddress($order_id) {
        try {
            $statement = $this->db->prepare('SELECT * FROM OrderAddress WHERE id = (SELECT addressId FROM `Order` WHERE id = :id)');
            $statement->bindParam(':id', $order_id);
            $statement->execute();
            return $statement->fetchObject();
        } catch (PDOException) {
            return false;
        }
    }
}