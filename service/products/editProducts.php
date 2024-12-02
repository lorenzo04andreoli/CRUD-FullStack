<?php
require '../../config/db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];
$name = $data['name'];
$description = $data['description'];
$price = $data ['price'];
$stock = $data ['stock'];

$stmt = $conn->prepare('UPDATE products SET name = :name, description = :description, price = :price, stock =:stock  WHERE id = :id');
$stmt-> execute(['name' => $name, 'description' => $description, 'price' => $price, 'stock' => $stock, 'id' => $id]);

echo json_encode(['message' => 'Produto atualizado com sucesso!']);

?>