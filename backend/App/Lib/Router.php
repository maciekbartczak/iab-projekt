<?php

class Router
{
    public static function get($route, $callback)
    {
        if (strcasecmp($_SERVER['REQUEST_METHOD'], 'GET') !== 0) {
            return ;
        }

        self::on($route, $callback);
    }

    public static function post($route, $callback)
    {
        if (strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') !== 0) {
            return ;
        }

        self::on($route, $callback);
    }

    public static function put($route, $callback)
    {
        if (strcasecmp($_SERVER['REQUEST_METHOD'], 'PUT') !== 0) {
            return ;
        }

        self::on($route, $callback);
    }

    public static function delete($route, $callback)
    {
        if (strcasecmp($_SERVER['REQUEST_METHOD'], 'DELETE') !== 0) {
            return ;
        }

        self::on($route, $callback);
    }

    private static function on($regex, $callback)
    {
        $params = $_SERVER['REQUEST_URI'];
        $params = (stripos($params, "/") !== 0) ? "/" . $params : $params;
        $regex = str_replace('/', '\/', $regex);
        $is_match = preg_match('/^' . ($regex) . '$/', $params, $matches, PREG_OFFSET_CAPTURE);

        if ($is_match) {
            array_shift($matches);
            $params = array_map(function ($param) {
                return $param[0];
            }, $matches);
            $callback(new Request($params), new Response());
        }
        else {
            $response = new Response();
            $response->status(404)->body(["error" => "no route found"])->send();
        }


    }
}
