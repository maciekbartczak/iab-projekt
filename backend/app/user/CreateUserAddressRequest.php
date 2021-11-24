<?php

class CreateUserAddressRequest {
    public int $userId;
    public string $addressLine1;
    public string $addressLine2;
    public string $city;
    public string $postalCode;
    public string $country;
    public string $phoneNumber;

    public function __construct(int $userId, string $addressLine1, string $addressLine2, string $city, string $postalCode, string $country, string $phoneNumber)
    {
        $this->userId = $userId;
        $this->addressLine1 = $addressLine1;
        $this->addressLine2 = $addressLine2;
        $this->city = $city;
        $this->postalCode = $postalCode;
        $this->country = $country;
        $this->phoneNumber = $phoneNumber;
    }

}