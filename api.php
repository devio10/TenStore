<?php
$pdo = new PDO("mysql:dbname=bomj2655_database;host=localhost;charset=UTF8", "user350312512e", "DSFL3024Fsdf4");
isset($_POST['key']);
isset($_POST['count']);
isset($_POST['select']);
isset($_POST['value']);
if($_POST['key']=="KdSqSAOC"){
if($_POST['count'] == "more"){
    if($_POST['select'] == "all"){
$statement = $pdo->prepare("SELECT * FROM `apps` ORDER BY `apps`.`downloads` DESC");
    }
    else{
        $select=$_POST['select'];
        $value=$_POST['value'];
    $statement = $pdo->prepare("SELECT * FROM `apps` WHERE `".$select."`='".$value."' ORDER BY `apps`.`downloads` DESC");
    }
$statement->execute();
$userData_List = array();
while($row=$statement->fetch(PDO::FETCH_ASSOC)){
		$userData_List['apps'][] = $row;	
	}
$json = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
$json=unicode_escape_decode($json);
echo $json;}
if($_POST['count'] == "one"){
$value=$_POST['value'];
$statement = $pdo->prepare("SELECT * FROM apps WHERE `appname`='".$value."'");
$statement->execute();
$results = $statement->fetchAll(PDO::FETCH_OBJ);
$json = json_encode(array_pop($results), JSON_UNESCAPED_SLASHES);
$json=unicode_escape_decode($json);
echo $json;
}}
function unicode_escape_decode($str) {
    return html_entity_decode(
            preg_replace('~\\\u([a-zA-Z0-9]{4})~', '&#x$1;', $str), null, 'UTF-8'
    );
}
?>