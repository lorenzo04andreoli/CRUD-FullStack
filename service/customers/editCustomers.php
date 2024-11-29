<?php
require '../../config/db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];
$name = $data['name'];
$email = $data['email'];


?>