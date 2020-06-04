<?php
$pdo = new PDO("mysql:dbname=bomj2655_database;host=localhost;charset=UTF8", "user350312512e", "7T3d9C2r");
$result = $pdo->prepare("SELECT * FROM `TenID` WHERE verified=0");
$result->execute();
$date = date('Y-m-d H:i:s');
$f = strtotime($date);
$assocArray = $result->fetch();
$d=$assocArray['end_time'];
if (!empty($d)) {
$e=$assocArray['email'];
echo $f. $d;
if($f>=$d){
    $sql = $pdo->prepare("DELETE FROM `TenID` WHERE `email`='".$e."'");
    $sql->execute();
    echo "true";}
    else{
        echo "false";
    }}
?>