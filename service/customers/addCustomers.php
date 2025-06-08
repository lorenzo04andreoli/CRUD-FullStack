<?php
require '../../config/db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$email =$data['email'];

$stmt = $conn->prepare('INSERT INTO customers (name, email) VALUES (:name, :email)');
$stmt->execute(['name' => $name, 'email' => $email]);

echo json_encode(['message'=> 'Cliente adicionado com sucesso!']);

?>