<?php

require_once __DIR__ . '/../lib/Database.php';
require_once __DIR__ . '/CreateUserRequest.php';
require_once __DIR__ . '/User.php';

class UserRepository {
    private Database $db;

    public function __construct()
    {
        $this->db = Database::get_instance();
    }

    public function saveUser(CreateUserRequest $createUserRequest)
    {
        try
        {
            $statement = $this->db->prepare('INSERT INTO user (role_id, username, password) VALUES (1, :username, :password)');
            $statement->bindParam(':username', $createUserRequest->username);
            $statement->bindParam(':password', $createUserRequest->password);
            $statement->execute();
        } catch (PDOException $e) {
            var_dump($e);
        }
    }

    public function getUserByUsername(string $username): ?User
    {
        try
        {
            $statement = $this->db->prepare('SELECT * FROM user WHERE username = :username');
            $statement->bindParam(':username', $username);
            $statement->execute();
            $user = $statement->fetchObject('User');
            if ($user) {
                return $user;
            }
        } catch (PDOException $e)
        {
            var_dump($e);
        }
        return null;
    }

    public function getUserDetailsById(int $id): ?UserDetails
    {
        try
        {
            $query = 'SELECT user.id, username, role FROM user JOIN user_role ur on user.role_id = ur.id WHERE user.id = :id ';
            $statement = $this->db->prepare($query);
            $statement->bindParam(':id', $id);
            $statement->execute();
            $userDetails = $statement->fetchObject('UserDetails');
            if($userDetails)
            {
                return $userDetails;
            }
        } catch (PDOException $e)
        {
            var_dump($e);
        }
        return null;
    }


}