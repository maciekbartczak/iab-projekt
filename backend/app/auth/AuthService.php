<?php

class AuthService {


    /**
     * @param $user_id user id that is checked against user id extracted from token
     * @return bool true if token is valid and id's match, false otherwise
     */
    public static function authorizeUserFromTokenWithId($user_id): bool {
        $res = new Response();
        try {
            $token_data = JwtUtils::getDecodedJWT();
        } catch (Exception) {
            $res->status(HTTP_STATUS::UNATHORIZED)->send();
            return false;
        }

        $auth_user_id = $token_data->userDetails->id;
        if ($auth_user_id != $user_id) {
            $res->status(HTTP_STATUS::FORBIDDEN)->send();
            return false;
        }
        return true;
    }

    public static function authorizeUserFromTokenWithRole($role): bool {
        $res = new Response();
        try {
            $token_data = JwtUtils::getDecodedJWT();
        } catch (Exception) {
            $res->status(HTTP_STATUS::UNATHORIZED)->send();
            return false;
        }

        $user_role = $token_data->userDetails->role;
        if ($user_role != $role) {
            $res->status(HTTP_STATUS::FORBIDDEN)->send();
            return false;
        }
        return true;
    }

    public static function authorizeUserFromToken(): bool {
        $res = new Response();
        try {
            JwtUtils::getDecodedJWT();
        } catch (Exception $e) {
            $res->status(HTTP_STATUS::UNATHORIZED)->send();
            return false;
        }
        return true;
    }
}