<?php

require_once __DIR__ . '/../lib/Database.php';
require_once __DIR__ . '/Product.php';

class ProductService {
    private Database $db;

    public function __construct()
    {
        $this->db = Database::get_instance();
    }

    public function getAll() {
        try {
            $statement = $this->db->prepare("SELECT * FROM Product");
            $statement->execute();
            $products = $statement->fetchAll(PDO::FETCH_ASSOC);
            if ($products) {
                return $products;
            }
        } catch (PDOException $e)
        {
            exit($e);
        }
        return null;
    }

    public function getAllCount() {
        try {
            $statement = $this->db->prepare("SELECT COUNT(*) FROM Product");
            $statement->execute();
            $number_of_products = $statement->fetchColumn();
        } catch (PDOException $e)
        {
            exit($e);
        }
        return $number_of_products;
    }

    public function getProductPage(int $offset, int $products_per_page) {
        try {
            $statement = $this->db->prepare("SELECT * FROM Product LIMIT :offset, :products_per_page");
            $statement->bindParam(":offset", $offset, PDO::PARAM_INT);
            $statement->bindParam(":products_per_page", $products_per_page, PDO::PARAM_INT);
            $statement->execute();
            $products = $statement->fetchAll(PDO::FETCH_ASSOC);
            if ($products) {
                return $products;
            }
        } catch (PDOException $e) {
            exit($e);
        }
        return null;
    }

    public function getProductById($product_id)
    {
        try {
            $statement = $this->db->prepare("SELECT * FROM Product WHERE id = :id");
            $statement->bindParam(":id", $product_id);
            $statement->execute();
            $product = $statement->fetchObject('Product');
            if ($product) {
                return $product;
            }
        } catch (PDOException $e) {
            exit($e);
        }
        return null;
    }
}