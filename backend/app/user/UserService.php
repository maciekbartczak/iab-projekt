<?php

require_once __DIR__ . '/../lib/Database.php';
require_once __DIR__ . '/CreateUserRequest.php';
require_once __DIR__ . '/User.php';
require_once __DIR__ . '/UserProfile.php';


class UserService {
    private Database $db;

    public function __construct()
    {
        $this->db = Database::get_instance();
    }

    public function saveUser(CreateUserRequest $createUserRequest)
    {
        try
        {
            $statement = $this->db->prepare('INSERT INTO User (roleId, username, password, firstName, lastName, email)
                VALUES (1, :username, :password, :first_name, :last_name, :email)');
            $statement->bindParam(':username', $createUserRequest->username);
            $statement->bindParam(':password', $createUserRequest->password);
            $statement->bindParam(':first_name', $createUserRequest->first_name);
            $statement->bindParam(':last_name', $createUserRequest->last_name);
            $statement->bindParam(':email', $createUserRequest->email);
            $statement->execute();
        } catch (PDOException $e) {
            exit($e);
        }
    }

    public function getUserByUsername(string $username): ?User
    {
        try
        {
            $statement = $this->db->prepare('SELECT * FROM User WHERE username = :username');
            $statement->bindParam(':username', $username);
            $statement->execute();
            $user = $statement->fetchObject('User');
            if ($user) {
                return $user;
            }
        } catch (PDOException $e)
        {
            exit($e);
        }
        return null;
    }

    public function getUserDetailsById(int $id): ?UserDetails
    {
        try
        {
            $query = 'SELECT User.id, username, role FROM User JOIN UserRole ur on User.roleId = ur.id WHERE User.id = :id ';
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
            exit($e);
        }
        return null;
    }

    public function getUserProfileById(int $id): ?UserProfile
    {
        try
        {
            $query = 'SELECT username, firstName, lastName as lastName, email FROM User WHERE User.id = :id';
            $statement = $this->db->prepare($query);
            $statement->bindParam(':id', $id);
            $statement->execute();
            $user_profile = $statement->fetchObject('UserProfile');
            if($user_profile)
            {
                return $user_profile;
            }
        } catch (PDOException $e)
        {
            exit($e);
        }
        return null;
    }


}