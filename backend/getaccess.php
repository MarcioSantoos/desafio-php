<?php
include_once "connection.php";

$sql = "SELECT id, pais, data FROM acesso WHERE id = (SELECT MAX(id) FROM acesso)";

$result = mysqli_query($connection, $sql);
$exibe = mysqli_fetch_assoc($result);

$pais = $exibe['pais'];
$data = $exibe['data'];



$dados = array('pais'=>$pais, 'acesso'=>$data);

echo json_encode($dados);

$connection->close();
?>