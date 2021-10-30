<?php

require_once __DIR__ . '/../lib/Database.php';
require_once __DIR__ . '/UserDTO.php';

class UserRepository {
    private Database $db;

    public function __construct()
    {
        $this->db = Database::get_instance();
    }

    public function saveUser(UserDTO $userDTO)
    {
        try
        {
            $statement = $this->db->prepare('INSERT INTO user (role_id, username, password) VALUES (1, :username, :password)');
            $statement->bindParam(':username', $userDTO->username);
            $statement->bindParam(':password', $userDTO->password);
            $statement->execute();
        } catch (PDOException $e) {
            var_dump($e);
        }
    }

    public function getUserByUsername(string $username)
    {
        try
        {
            $statement = $this->db->prepare('SELECT * FROM user WHERE username = :username');
            $statement->bindParam(':username', $username);
            $statement->execute();
            return $statement->fetchObject('User');
        } catch (PDOException $e) {
            var_dump($e);
        }
        return null;
    }


}