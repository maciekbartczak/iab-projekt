<?php

class Request
{
    public $params;
    public $reqMethod;
    public $contentType;
    public $body;


    public function __construct($params)
    {
        $this->params = $params;
        $this->reqMethod = trim($_SERVER['REQUEST_METHOD']);
        $this->contentType = !empty($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
        $this->body = $this->create_body();
    }

    private function create_body()
    {
        if ($this->reqMethod !== 'POST') {
            return [];
        }

        if (strcasecmp($this->contentType, 'application/json') !== 0) {
            return [];
        }

        $content = trim(file_get_contents("php://input"));
        return json_decode($content, true);
    }

    public function get_body()
    {
        return $this->body;
    }

    public function get_param(string $name)
    {
        return $this->body[$name] ?? null;
    }


}