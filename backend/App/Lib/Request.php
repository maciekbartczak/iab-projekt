<?php

class Request
{
    public $params;
    public $reqMethod;
    public $contentType;

    public function __construct($params)
    {
        $this->params = $params;
        $this->reqMethod = trim($_SERVER['REQUEST_METHOD']);
        $this->contentType = !empty($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    }

    public function get_body()
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

}