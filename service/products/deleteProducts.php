<?php
require '../../config/db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];

$stmt = $conn ->prepare('DELETE FROM products WHERE id = :id');
$stmt->execute(['id'=> $id]);

echo json_encode(['message'=> 'Produto excluído com sucesso!']);
?>