<?php
require '../../config/db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$description = $data['description'];
$price = $data ['price'];
$stock = $data ['stock'];

$stmt = $conn->prepare('INSERT INTO products (name, description, price, stock) VALUES (:name, :description, :price, :stock)');
$stmt->execute(['name' => $name, 'description' => $description, 'price' => $price, 'stock' => $stock]);

echo json_encode(['message'=> 'Produto adicionado com sucesso!']);

?>
