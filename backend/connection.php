<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "desafiophp";

$connection = mysqli_connect($servername, $username, $password, $dbname);

if (!$connection) {
    die("Conexão falhou: " . mysqli_connect_error());
}

?>