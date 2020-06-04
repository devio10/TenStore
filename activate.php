<?php
if (isset($_GET['secretKey'])){
$key=$_GET['secretKey'];}
echo $user;
$pdo = new PDO("mysql:dbname=bomj2655_database;host=localhost;charset=UTF8", "user350312512e", "7T3d9C2r");
$statement = $pdo->prepare("UPDATE TenID SET `verified` = 1 WHERE `secretKey` = ?");
$statement->execute(array($key));
header("Location: https://www.thetenstore.ru/confirm.html/");
?>