<?php

require_once __DIR__ . '/../lib/Database.php';

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
}