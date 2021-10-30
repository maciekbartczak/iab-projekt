<?php
class Response {
    private int $status = 200;
    private $body;

    public function status(int $code) {
        $this->status = $code;
        return $this;
    }

    public function body($data = []) {
        $this->body = $data;
        return $this;
    }

    public function send()
    {
        http_response_code($this->status);
        header('Content-Type: application/json');
        echo json_encode($this->body);
    }
}