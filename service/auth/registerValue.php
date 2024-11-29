<?php
require '../../config/db_connection.php';

header('Content-Type: application/json');

// Exibe erros para depuração
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Lê o JSON enviado pela requisição
$data = json_decode(file_get_contents('php://input'), true);

// Captura os campos enviados
$username = $data['username'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Verifica se os campos não estão vazios
if (empty($username) || empty($email) || empty($password)) {
    http_response_code(400); // Resposta HTTP para erro de cliente
    echo json_encode(['message' => 'Preencha todos os campos.', 'success' => false]);
    exit;
}

// Hash da senha
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

try {
    // Prepara e executa a query
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $hashed_password);
    $stmt->execute();

    // Retorna sucesso
    http_response_code(200); // Resposta HTTP para sucesso
    echo json_encode(['message' => 'Usuário cadastrado com sucesso!', 'success' => true]);
} catch (PDOException $e) {
    // Captura erros do banco de dados
    http_response_code(500); // Resposta HTTP para erro do servidor
    echo json_encode(['message' => 'Erro ao cadastrar: ' . $e->getMessage(), 'success' => false]);
}
?>
