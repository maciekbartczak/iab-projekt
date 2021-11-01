<?php

require __DIR__ . '/../env.php';
use Firebase\JWT\JWT;

class JwtUtils {

    public static function createJWT(UserDetails $userDetails): string
    {
        global $env;

        $secretKey  = $env['jwt_secret'];
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