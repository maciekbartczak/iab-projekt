<?php


require __DIR__ . '/../env.php';

class Database extends PDO {

    public function __construct()
    {
        global $env;

        parent::__construct('mysql:host=' . $env['db_host'] . ';dbname=' . $env['db_name'], $env['db_user'], $env['db_password']);
    }

    public static function get_instance()
    {
        static $instance = null;
        if (is_null($instance))
        {
            $instance = new static();
        }
        return $instance;
    }

}
