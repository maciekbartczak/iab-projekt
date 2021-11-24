<?php

require_once __DIR__ . '/../lib/JwtUtils.php';
require_once __DIR__ . '/../auth/AuthService.php';

Router::get('/api/user/([0-9]*)/profile', function(Request $req, Response $res) {
    $user_id = $req->params[0];
    $user_service = new UserService();

    if (!AuthService::authorizeUserFromTokenWithId($user_id))
    {
        return;
    }

    $user_info = $user_service->getUserInfoById($user_id);
    if(!$user_info)
    {
      $res->status(HTTP_STATUS::NOT_FOUND)->send();
      return ;
    }
    $user_addresses = $user_service->getUserAddresses($user_id);

    $res->body(['userInfo' => $user_info,
                'userAddresses' => $user_addresses])->send();
});

Router::get('/api/user/([0-9]*)/address', function(Request $req, Response $res) {
    $user_id = $req->params[0];
    $user_service = new UserService();

    if(!AuthService::authorizeUserFromTokenWithId($user_id))
    {
        return;
    }

    $res->status(HTTP_STATUS::OK)->body($user_service->getUserAddresses($user_id))->send();
});

Router::post('/api/user/([0-9]*)/address', function(Request $req, Response $res) {
   $user_id = $req->params[0];
   $user_service = new UserService();

   if(!AuthService::authorizeUserFromTokenWithId($user_id))
   {
       return;
   }

   $address_line1 = $req->get_param('addressLine1');
   $address_line2 = $req->get_param('addressLine2');
   $city = $req->get_param('city');
   $postalCode = $req->get_param('postalCode');
   $country = $req->get_param('country');
   $phoneNumber = $req->get_param('phoneNumber');

   if(!$address_line1 || !$city || !$postalCode || !$country || !$phoneNumber)
   {
       $res->body(['error' => 'missing-required-params'])->status(HTTP_STATUS::BAD_REQUEST)->send();
       return ;
   }
    $user_service->saveUserAddress(new CreateUserAddressRequest($user_id, $address_line1, $address_line2, $city, $postalCode,
        $country, $phoneNumber));

    $res->status(HTTP_STATUS::CREATED)->send();
});

Router::delete('/api/user/address/([0-9]*)', function(Request $req, Response $res) {
    $address_id = $req->params[0];
    $user_service = new UserService();

    $address = $user_service->getUserAddress($address_id);
    if (!$address)
    {
        $res->status(HTTP_STATUS::NOT_FOUND)->send();
        return;
    }
    $user_id = $address["UserId"];
    if(!AuthService::authorizeUserFromTokenWithId($user_id))
    {
        return;
    }
    $user_service->deleteUserAddress($address_id);
    $res->status(HTTP_STATUS::OK)->send();
});