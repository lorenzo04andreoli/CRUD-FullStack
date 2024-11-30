<?php
require '../../config/db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];

$stmt = $conn ->prepare('DELETE FROM customers WHERE id = :id');
$stmt->execute(['id'=> $id]);

echo json_encode(['message'=> 'Cliente excluído com sucesso!']);
?>