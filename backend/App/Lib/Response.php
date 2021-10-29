<?php
class Response {
    private $status = 200;

    public function set_status(int $code) {
        $this->status = $code;
        return $this;
    }

    public function to_json($data = [])
    {
        http_response_code($this->status);
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}