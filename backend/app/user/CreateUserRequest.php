<?php

class CreateUserRequest {
    public string $username;
    public string $password;
    public string $first_name;
    public string $last_name;
    public string $email;

    public function __construct(string $username, string $password, string $first_name, string $last_name, string $email)
    {
        $this->username = $username;
        $this->password = $password;
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->email = $email;
    }


}