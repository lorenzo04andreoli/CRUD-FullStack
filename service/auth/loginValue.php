<?php
require '../../config/db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$password = $data['password'];

try{
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email");
    $stmt -> bindParam(':email', $email);
    $stmt ->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user ['password'])){
        echo json_encode (['message' => 'Login bem sucedido!', 'success' => true]);
    } else{
        echo json_encode(['message'=> 'Usuário ou senha incorretos', 'success'=> false]);
    }
}catch (PDOException $e){
    echo json_encode(['message'=> 'Erro', $e-> getMessage()]);
}
?>