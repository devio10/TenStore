<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
$pdo = new PDO("mysql:dbname=bomj2655_database;host=localhost;charset=UTF8", "user350312512e", "7T3d9C2r");
isset($_POST['action']);
//end id apps
if($_POST['action']=="KdSqSAOi"){
    $count=$pdo->query("SELECT MAX(`id`) FROM `apps`")->fetchColumn();
    $text=['text' =>$count ];
    header('Content-Type: application/json');
    echo json_encode($text);
}
//show more apps
if($_POST['action']=="KdSqSAOC"){
isset($_POST['select']);
isset($_POST['value']);
if($_POST['select'] == "all"){
$value=$_POST['value'];
$end=$value+16;
$count=$pdo->query("SELECT MAX(`id`) FROM `apps`")->fetchColumn();
if($count>=$value){
$statement = $pdo->prepare("SELECT `appname`, `devname`, `icon`, `id`, `bg`, `padding` FROM `apps` WHERE `id`>".$value." AND `id`<=".$end." ORDER BY `apps`.`downloads` DESC");
}
}
    else{
        $select=$_POST['select'];
        $value=$_POST['value'];
$statement = $pdo->prepare("SELECT `appname`, `devname`, `icon`, `id`, `bg`, `padding` FROM `apps` WHERE `".$select."`='".$value."' ORDER BY `apps`.`downloads` DESC");
    }
$statement->execute();
$userData_List = array();
while($row=$statement->fetch(PDO::FETCH_ASSOC)){
		$userData_List['apps'][] = $row;
	}
$json = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
$json=unicode_escape_decode($json);
echo $json;
}
//show one app
if($_POST['action']=="4LlFCT"){
isset($_POST['id']);
$id=$_POST['id'];
    $statement = $pdo->prepare("SELECT * FROM `apps` WHERE `id`='".$id."' ORDER BY `apps`.`downloads` DESC");
	$statement->execute();
$userData_List = array();
while($row=$statement->fetch(PDO::FETCH_ASSOC)){
		$userData_List['apps'][] = $row;
	}
$json = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
$json=unicode_escape_decode($json);
echo $json;
}
//download (need edit)
if($_POST['action']=="NvXrSW"){
    $id=$_POST['id'];
    $statement = $pdo->prepare("UPDATE apps SET downloads = downloads+1 WHERE id = ?");
    $statement->execute([$id]);
}
//restore password query
if($_POST['action']=="fg0348"){
	isset($_POST['login']);
$login=$_POST['login'];
$go=$_POST['go'];
if (filter_var($login, FILTER_VALIDATE_EMAIL) !== false)
{
    $statement = $pdo->prepare("SELECT `email`, `login`, `name`, `lastname`, `secretKey`, `photo` FROM `TenID` WHERE `email`='".$login."'");
}
else
{
    $statement = $pdo->prepare("SELECT `email`, `login`, `name`, `lastname`, `secretKey`, `photo` FROM `TenID` WHERE `login`='".$login."'");
}
$statement->execute();
$empty = $statement->rowCount() === 0;

if (!$empty) {
$userData_List = array();
while($row=$statement->fetch(PDO::FETCH_ASSOC)){
		$userData_List['user'][] = $row;
	}
$json = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
$json=unicode_escape_decode($json);
echo $json;}
$assocArray = $statement->fetch();
$secretKey= $assocArray['secretKey'];
$email= $assocArray['email'];
$name= $assocArray['name'];
$lastName= $assocArray['lastName'];
if($go==1){
$content="Здравствуйте, ".$name." ".$lastName.".\n
Для завершения сброса пароля, вам необходимо пройти по ссылке ниже:\n
thetenstore.ru/newpw.php?secretKey=".$secretKey."\n
C уважением,\n
команда Press Team.\n
\n
Это были не вы? Проигнорируйте это письмо.";
mail($email,"Изменение пароля на TenStore",$content);
}}
//change new password and secretkey
if ($_POST['action']=="6R2YVS"){
	$key=$_POST['key'];
	$password=$_POST['password'];
	$secretKey=gen_password(8);
	$statement = $pdo->prepare("UPDATE TenID SET `verified` = 1, `secretKey`=?, `password`=? WHERE `secretKey` = ?");
	$statement->execute(array($secretKey, $password, $key));
}
//search
if($_POST['action']=="d6Gj59"){
$search=$_POST['search'];
	if(strlen($search )>2){
$id = "%$search%";
$appname = "%$search%";
$devname = "%$search%";
$description = "%$search%";
$tag = "%$search%";
$statement = $pdo->prepare("SELECT * FROM apps WHERE `id` LIKE ? || `appname` LIKE ? || `devname` LIKE ? || `description` LIKE ? || `tag` LIKE ?");
$statement->execute(array($id, $appname, $devname, $description, $tag));
$userData_List = array();
while($row=$statement->fetch(PDO::FETCH_ASSOC)){
		$userData_List['apps'][] = $row;
	}
$json = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
$json=unicode_escape_decode($json);
echo $json;
}}
//register
if($_POST['action']=="si839JI"){
	isset($_POST['login']);
$login=$_POST['login'];
isset($_POST['password']);
$password=$_POST['password'];
isset($_POST['email']);
$email=$_POST['email'];
isset($_POST['name']);
$name=$_POST['name'];
isset($_POST['lastName']);
$lastName=$_POST['lastName'];
$secretKey=gen_password(8);
isset($_POST['photo']);
$photo=$_POST['photo'];
isset($_POST['library']);
$library=$_POST['library'];
isset($_POST['theme']);
$theme=$_POST['theme'];
$verified=0;
$date = date('Y-m-d H:i:s');
$f = strtotime($date);
$start_time = strtotime($date);
$end_time=strtotime($date)+86400;
$result = $pdo->query("SELECT * FROM `TenID` WHERE `email`='".$email."'");
$assocArray = $result->fetch();
$f=$assocArray['email'];
if($f==$email){$text=['text' =>"Email занят!" ];
header('Content-Type: application/json');
echo json_encode($text);}
else{ $result = $pdo->query("SELECT * FROM `TenID` WHERE `login`='".$login."'");
$assocArray = $result->fetch();
$f=$assocArray['login'];
if($f==$login){$text=['text' =>"Login занят!" ];
header('Content-Type: application/json');
echo json_encode($text);} else{
try{
$STH = $pdo->prepare("INSERT INTO `bomj2655_database`.`TenID` (`email`, `login`, `name`, `lastName`, `password`, `secretKey`, `photo`, `theme`, `library`, `verified`, `start_time`, `end_time`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
        $STH->bindParam(1, $email);
        $STH->bindParam(2, $login);
        $STH->bindParam(3, $name);
        $STH->bindParam(4, $lastName);
        $STH->bindParam(5, $password);
        $STH->bindParam(6, $secretKey);
        $STH->bindParam(7, $photo);
        $STH->bindParam(8, $theme);
        $STH->bindParam(9, $library);
        $STH->bindParam(10, $verified);
        $STH->bindParam(11, $start_time);
        $STH->bindParam(12, $end_time);
        $STH->execute();
    }
    catch (PDOException $e) {
        echo $e->getMessage();
    }}
$content="Здравствуйте, ".$name." ".$lastName.".\n
Спасибо за создание нового аккаунта TenID.\n
Для завершения регистрации, вам необходимо пройти по ссылке ниже:\n
thetenstore.ru/activate.php?secretKey=".$secretKey."\n
На это даётся 24 часа, после чего аккаунт будет удален.\n
После активации вам будут доступны следующие возможности:\n
- Скачивание приложений и игр в TenStore\n
- Смена фотографии профиля\n
- Просмотр профилей других пользователей.\n
\n
C уважением,\n
команда Press Team.\n
\n
Это были не вы? Проигнорируйте это письмо.";
mail($email,"Регистрация на TenStore",$content);
}}
//autorize
if($_POST['action']=='fd92h20j'){
isset($_POST['secretKey']);
$secretKey=$_POST['secretKey'];
$statement = $pdo->prepare("SELECT * FROM `TenID` WHERE `secretKey`='".$secretKey."'");
$statement->execute();
$empty = $statement->rowCount() === 0;
if (!$empty) {
$userData_List = array();
while($row=$statement->fetch(PDO::FETCH_ASSOC)){
		$userData_List['user'][] = $row;
	}
$json = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
$json=unicode_escape_decode($json);
echo $json;
}}
//login
if($_POST['action']=='h495ujh'){
	isset($_POST['login']);
$login=$_POST['login'];
isset($_POST['password']);
$password=$_POST['password'];
if (filter_var($login, FILTER_VALIDATE_EMAIL) !== false)
{
    $statement = $pdo->prepare("SELECT * FROM `TenID` WHERE `email`='".$login."' AND `password`='".$password."'");
}
else
{
    $statement = $pdo->prepare("SELECT * FROM `TenID` WHERE `login`='".$login."'AND `password`='".$password."'");
}
$statement->execute();
$empty = $statement->rowCount() === 0;

if (!$empty) {
$userData_List = array();
while($row=$statement->fetch(PDO::FETCH_ASSOC)){
		$userData_List['user'][] = $row;
	}
$json = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
$json=unicode_escape_decode($json);
echo $json;}
}
//moderator delete
if($_POST['action']=='EDIAdX'){
    $key=$_POST['key'];
    $id=$_POST['id'];
    $result = $pdo->query("SELECT * FROM `TenID` WHERE `secretKey`='".$key."'");
    $assocArray = $result->fetch();
    $f=$assocArray['userType'];
    $login=$assocArray['login'];
    if($f=='admin'){
    $sql = $pdo->prepare("DELETE FROM `apps` WHERE `id`=".$id);
    $sql->execute();
    $text=['text' =>"Удалено!" ];
    header('Content-Type: application/json');
    echo json_encode($text);}
    if($f=='dev'){
   $result = $pdo->query("SELECT * FROM `apps` WHERE `id`=".$id);
    $assocArray = $result->fetch();
    $f=$assocArray['dev'];
    if($f==$login){
    $sql = $pdo->prepare("DELETE FROM `apps` WHERE `id`=".$id);
    $sql->execute();
    $text=['text' =>"Удалено!" ];
    header('Content-Type: application/json');
    echo json_encode($text);}
    else{
    $text=['text' =>"Вы не разработчик этого приложения!" ];
    header('Content-Type: application/json');
    echo json_encode($text);
    }
    }
}
//uploadimage (don't use, need edit)
if($_POST['action']=='v38yr0'){
	$ten = $_POST["TEN"];
$hinh = $_POST["HINH"];
$path = "upload/asd.png";
$pdo = new PDO("mysql:dbname=bomj2655_database;host=localhost;charset=UTF8", "user350312512e", "7T3d9C2r");
$statement = $pdo->prepare("INSERT INTO image VALUES(null,'$ten','$path')");
$statement->execute();
if($statement->rowCount() > 0){
  file_put_contents($path,base64_decode($hinh));
}else{
  echo "Loi";
}
}
function gen_password($length = 6){
	$password = '';
	$arr = array(
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
		'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
		'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
		'1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
	);

	for ($i = 0; $i < $length; $i++) {
		$password .= $arr[random_int(0, count($arr) - 1)];
	}
	return $password;
}
function unicode_escape_decode($str) {
    return html_entity_decode(
            preg_replace('~\\\u([a-zA-Z0-9]{4})~', '&#x$1;', $str), null, 'UTF-8'
    );
}
?>