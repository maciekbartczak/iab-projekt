<?php

use Firebase\JWT\JWT;

class JwtUtils {

    public static function createJWT(UserDetails $userDetails) {
        $secretKey  = 'bGS6lzFqvvSQ8ALbOxatm7/Vk7mLQyzqaS34Q4oR1ew=';
        $issuedAt   = new DateTimeImmutable();
        $expire     = $issuedAt->modify('+6 minutes')->getTimestamp();
        $serverName = "localhost";

        $data = [
            'iat'  => $issuedAt->getTimestamp(),
            'iss'  => $serverName,
            'nbf'  => $issuedAt->getTimestamp(),
            'exp'  => $expire,
            'userDetails' => $userDetails,
        ];

        return JWT::encode($data, $secretKey);
    }
}