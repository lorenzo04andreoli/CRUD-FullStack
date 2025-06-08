<?php
require '../../config/db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

// Excluir itens do pedido
$stmt = $conn->prepare('DELETE FROM order_items WHERE order_id = :id');
$stmt->execute(['id' => $id]);

// Excluir o pedido
$stmt = $conn->prepare('DELETE FROM orders WHERE id = :id');
$stmt->execute(['id' => $id]);

echo json_encode(['message' => 'Pedido excluído com sucesso!']);

?>
