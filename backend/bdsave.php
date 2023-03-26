<?php

include_once "connection.php";

$json = file_get_contents('php://input');

$dados = json_decode($json);

$data = new DateTime($dados->data);
$data_formatada = date_format($data, 'Y-m-d H:i:s');

$sql = "INSERT INTO acesso (pais, data) VALUES ('".$dados->pais."', '".$data_formatada."')";

$result = mysqli_query($connection, $sql);

if ($result) {
    echo "Dados salvos com sucesso.";
} else {
    echo "Erro ao salvar os dados: " . mysqli_error($connection);
}

  $connection->close();
  
?>