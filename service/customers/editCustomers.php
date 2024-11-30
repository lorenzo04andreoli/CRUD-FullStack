<?php
require '../../config/db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];
$name = $data['name'];
$email = $data['email'];

$stmt = $conn->prepare('UPDATE customers SET name = :name, email = :email WHERE id = :id');
$stmt-> execute(['name' => $name, 'email' => $email, 'id' => $id]);

echo json_encode(['message' => 'Cliente atualizado com sucesso!']);

?>