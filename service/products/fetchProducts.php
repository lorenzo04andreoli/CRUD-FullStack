<?php
require '../../config/db_connection.php';

$stmt = $conn->query('SELECT * FROM products');
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($products);
?>