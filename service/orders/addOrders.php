<?php
require '../../config/db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$customerId = $data['customerId'];
$productId = $data['productId'];
$quantity = $data['quantity'];

// Criar o pedido
$stmt = $conn->prepare('INSERT INTO orders (customer_id) VALUES (:customer_id)');
$stmt->execute(['customer_id' => $customerId]);
$orderId = $conn->lastInsertId();

// Adicionar o item ao pedido
$stmt = $conn->prepare('INSERT INTO order_items (order_id, product_id, quantity, price) 
                        SELECT :order_id, :product_id, :quantity, price FROM products WHERE id = :product_id');
$stmt->execute(['order_id' => $orderId, 'product_id' => $productId, 'quantity' => $quantity]);

// Atualizar estoque
$stmt = $conn->prepare('UPDATE products SET stock = stock - :quantity WHERE id = :product_id');
$stmt->execute(['quantity' => $quantity, 'product_id' => $productId]);

echo json_encode(['message' => 'Pedido criado com sucesso!']);
?>
