<?php

require_once __DIR__ . '/../lib/Database.php';
require_once __DIR__ . '/CreateUserRequest.php';
require_once __DIR__ . '/User.php';
require_once __DIR__ . '/UserProfile.php';
require_once __DIR__ . '/CreateUserAddressRequest.php';


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

    public function saveUserAddress(CreateUserAddressRequest $createUserAddressRequest)
    {
        try
        {
            $statement = $this->db->prepare('INSERT INTO UserAddress (UserId, addressLine1, addressLine2, city, postalCode, country, phoneNumber) 
                                                    VALUES (:UserId, :addressLine1, :addressLine2, :city, :postalCode, :country, :phoneNumber)');
            $statement->bindParam(':UserId', $createUserAddressRequest->userId);
            $statement->bindParam(':addressLine1', $createUserAddressRequest->addressLine1);
            $statement->bindParam(':addressLine2', $createUserAddressRequest->addressLine2);
            $statement->bindParam(':city', $createUserAddressRequest->city);
            $statement->bindParam(':postalCode', $createUserAddressRequest->postalCode);
            $statement->bindParam(':country', $createUserAddressRequest->country);
            $statement->bindParam(':phoneNumber', $createUserAddressRequest->phoneNumber);
            $statement->execute();
        } catch (PDOException $e)
        {
            exit($e);
        }
    }

    public function getUserAddresses(int $user_id)
    {
        try
        {
            $statement = $this->db->prepare('SELECT * FROM UserAddress WHERE UserId = :UserId');
            $statement->bindParam(':UserId', $user_id);
            $statement->execute();
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e)
        {
            exit($e);
        }
    }

    public function getUserAddress(int $address_id)
    {
        try
        {
            $statement = $this->db->prepare('SELECT * FROM UserAddress WHERE id = :addressId');
            $statement->bindParam(':addressId', $address_id);
            $statement->execute();
            return $statement->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e)
        {
            exit($e);
        }
    }

    public function deleteUserAddress(int $address_id)
    {
        try {
            $statement = $this->db->prepare('DELETE FROM UserAddress WHERE id = :addressId');
            $statement->bindParam(':addressId', $address_id);
            $statement->execute();
        } catch (PDOException $e)
        {
            exit($e);
        }
    }
}