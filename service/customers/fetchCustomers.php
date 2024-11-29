<?php
require '../../config/db_connection.php';

$stmt = $conn->query('SELECT * FROM customers');
$customers = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($customers);
?>