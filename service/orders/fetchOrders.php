<?php
require '../../config/db_connection.php';

$stmt = $conn->query('
    SELECT o.id, c.name AS customer_name, o.order_date, o.status 
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
');
$orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($orders);

?>
