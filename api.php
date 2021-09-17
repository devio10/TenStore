<?php

$pdo = new PDO("mysql:dbname=bomj2655_database;host=localhost;charset=UTF8", "user350312512e", "7T3d9C2r", 	array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8mb4'"));
$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
if (e($_POST['action'])=="status") echo "work";
//get user info
if (e($_POST['action']) == "FEhf42d") {
$login = e($_POST['login']);
$statement = $pdo->prepare("SELECT `login`, `name`, `lastname`, `photo` FROM `TenID` WHERE `login`='" . $login . "'");
    $statement->execute();
    $empty = $statement->rowCount() === 0;
    if (!$empty) {
        $userData_List = array();
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $userData_List['user'][] = $row;
        }
        $json = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
        $json = unicode_escape_decode($json);
        echo $json;
    }
}
if (e($_POST['action']) == "HKdoi40") {
$statement = $pdo->prepare("SELECT * FROM `cards`");
    $statement->execute();
    $empty = $statement->rowCount() === 0;
    if (!$empty) {
        $userData_List = array();
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $userData_List['cards'][] = $row;
        }
        $json = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
        $json = unicode_escape_decode($json);
        echo $json;
    }
}
//CHECK_EMAIL
if (e($_POST['action']=="vgGYOd")){
$email = e($_POST['email']);
    if ($email != null) {
        $result = $pdo->query("SELECT * FROM `TenID` WHERE `email`='" . $email . "'");
        $assocArray = $result->fetch();
        $f = $assocArray['email'];
        if (strcasecmp($f, $email)==0) {
            echo "errEmail";
        }
}
}
//CHECK_LOGIN
if (e($_POST['action']=="UDFhwe")){
$login = e($_POST['login']);
    if ($login != null) {
        $result = $pdo->query("SELECT * FROM `TenID` WHERE `login`='" . $login . "'");
        $assocArray = $result->fetch();
        $f = $assocArray['login'];
        if (strcasecmp($f, $login)==0) {
            echo "errLogin";
        }
}
}
// show more apps
if (e($_POST['action']) == "KdSqSAOC") {
    if (!empty(e($_POST['sort']))) {
        $sort = e($_POST['sort']);
        if (mb_substr($sort, 0, 1) == "+") {
            $by = "ASC";
        }
        if (mb_substr($sort, 0, 1) == "-") {
            $by = "DESC";
        }
        $sort = substr($sort, 1);
    } else {
        $by = "DESC";
        $sort = "downloads";
    }
    if (e($_POST['select']) == "all") {
            $statement = $pdo->prepare("SELECT `name`, `dev`, `icon`, `id`, `icon_bg`, `icon_pad`, `card_bg` FROM `apps` ORDER BY `apps`.`" . $sort . "`" . $by);
        }
    if (e($_POST['select']) == "upd"){
        $date = date('Y-m-d H:i:s');
        $upd_time = strtotime($date)-604800;
        $statement = $pdo->prepare("SELECT `name`, `dev`, `icon`, `id`, `icon_bg`, `icon_pad`, `card_bg` FROM `apps` WHERE `updTime`>".$upd_time." ORDER BY `apps`.`updTime` DESC LIMIT 10");
    }
    if (e($_POST['select']) == "rls"){
        $statement = $pdo->prepare("SELECT `name`, `type`, `dev`, `icon`, `id`, `icon_bg`, `icon_pad`, `card_bg` FROM `apps` ORDER BY `apps`.`rlsTime` DESC LIMIT 10");
    }
    if(e($_POST['select'])=="popular"){
                $statement = $pdo->prepare("SELECT `name`, `type`, `downloads`, `dev`, `icon`, `id`, `icon_bg`, `icon_pad`, `bg`, `card_bg` FROM `apps` ORDER BY `apps`.`downloads` DESC LIMIT 10");
    }
    if(e($_POST['select'])=="editors-choice"){
                $value = e($_POST['value']);
                $statement = $pdo->prepare("SELECT `name`, `req`,  `type`, `downloads`, `dev`, `icon`, `id`, `icon_bg`, `icon_pad`, `bg`, `card_bg` FROM `apps` WHERE (`req`!='' OR `req`!=null)  AND `type`='".$value."' LIMIT 10");
    }
    if(e($_POST['select'])=="random"){
                $value = e($_POST['value']);
                $statement = $pdo->prepare("SELECT `name`, `req`,  `type`, `downloads`, `dev`, `icon`, `id`, `icon_bg`, `icon_pad`, `bg`, `card_bg` FROM `apps` WHERE `type`='".$value."' AND (`req`='' OR `req`=null) ORDER BY RAND() LIMIT 10");
    }
     if(e($_POST['select'])!="rls"&&e($_POST['select'])!="upd"&&e($_POST['select'])!="editors-choice"&&e($_POST['select'])!="all"&&e($_POST['select'])!="popular"&&e($_POST['select'])!="random") {
        $select = e($_POST['select']);
        $value = e($_POST['value']);
        $statement = $pdo->prepare("SELECT `name`, `dev`, `icon`, `type`, `id`, `icon_bg`, `icon_pad`, `card_bg` FROM `apps` WHERE `" . $select . "`='" . $value . "' ORDER BY `apps`.`" . $sort . "`" . $by);
    }
    $statement->execute();
    $userData_List = array();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $userData_List['apps'][] = $row;
    }
    $json = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
    $json = unicode_escape_decode($json);
    echo $json;
}
// show one app
if (e($_POST['action']) == "4LlFCT") {
    $id = (int) e($_POST['id']);
    $statement = $pdo->prepare("SELECT * FROM `apps` WHERE `id`='" . $id . "' ORDER BY `apps`.`downloads` DESC");
    $statement->execute();
    $userData_List = array();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $userData_List['apps'][] = $row;
    }
    $json = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
    $json = unicode_escape_decode($json);
    echo $json;
}
//show screenshots
if (e($_POST['action']) == "aerV452F") {
    $id = (int) e($_POST['id']);
    $statement = $pdo->prepare("SELECT `image`, `platform` FROM `screenshots` WHERE `app_id`='" . $id . "'");
    $statement->execute();
    $userData_List = array();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $userData_List['screenshots'][] = $row;
    }
    $json = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
    $json = unicode_escape_decode($json);
    echo $json;}
    //show files
    if (e($_POST['action']) == "sio3H9re") {
        $id = (int) e($_POST['id']);
        $statement = $pdo->prepare("SELECT `icon`, `platform`, `architecture`, `comment`, `file`, `version`, `published`, `size` FROM `files` WHERE `app_id`='" . $id . "'");
        $statement->execute();
        $userData_List = array();
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $userData_List['files'][] = $row;
        }
        $json = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
        $json = unicode_escape_decode($json);
        echo $json;}
// restore password query
if (e($_POST['action']) == "fg0348") {
    $login = e($_POST['login']);
    $go = (int)e($_POST['go']);
    if (filter_var($login, FILTER_VALIDATE_EMAIL) !== false) {
        if ($go == "0") {
            $statement = $pdo->prepare("SELECT `email`, `login`, `name`, `lastname`, `secretKey`, `photo` FROM `TenID` WHERE `email`='" . $login . "'");
        }
        if ($go == "1")
            $result = $pdo->query("SELECT * FROM `TenID` WHERE `email`='" . $login . "'");
    } else {
        if ($go == "0") {

            $statement = $pdo->prepare("SELECT `email`, `login`, `name`, `lastname`, `secretKey`, `photo` FROM `TenID` WHERE `login`='" . $login . "'");
        }
        if ($go == "1")
            $result = $pdo->query("SELECT * FROM `TenID` WHERE `login`='" . $login . "'");
    }
    if ($go == "0") {
        $statement->execute();
        $empty = $statement->rowCount() === 0;
        if (!$empty) {
            $userData_List = array();
            while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
                $userData_List['user'][] = $row;
            }
            $json = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
            $json = unicode_escape_decode($json);
            echo $json;
        }
        if ($go == "1") {
            $assocArray = $result->fetch();
            $secretKey = $assocArray['secretKey'];
            $email = $assocArray['email'];
            $name = $assocArray['name'];
            $lastName = $assocArray['lastName'];
            echo $name;
            $content = "Здравствуйте, " . $name . " " . $lastName . ".\n
Для завершения сброса пароля, вам необходимо пройти по ссылке ниже:\n
thetenstore.ru/newpw.php?secretKey=" . $secretKey . "\n
C уважением,\n
команда Press Team.\n
\n
Это были не вы? Проигнорируйте это письмо.";
            mail($email, "Изменение пароля на TenStore", $content);
        }
    }
}
//add app to library
if (e($_POST['action']) == "95dease") {
    $login = e($_POST['login']);
    $password = e($_POST['password']);
    $id = (int) e($_POST['id']);
    $sql = "SELECT count(*) FROM `TenID` WHERE login = ? AND password = ?";
    $result = $pdo->prepare($sql);
    $result->execute([$login, $password]);
    $number = $result->fetchColumn();
    if ($number == 1) {
        $sql = "SELECT count(*) FROM `library` WHERE login = ? AND app_id = ?";
        $result = $pdo->prepare($sql);
        $result->execute([$login, $id]);
        $number = $result->fetchColumn();
        if ($number == 0) {
            $STH = $pdo->prepare("INSERT INTO `bomj2655_database`.`library` (`login`, `app_id`) VALUES (?,?)");
            $STH->bindParam(1, $login);
            $STH->bindParam(2, $id);
            $STH->execute();
            $statement = $pdo->prepare("UPDATE apps SET `downloads` = downloads+1 WHERE `id` = ?");
            $statement->execute([$id]);
            $statement = $pdo->prepare("SELECT `app_id` FROM `library` WHERE `login`='" . $login . "'");
            $statement->execute();
            $userData_List = array();
            while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
                $userData_List['library'][] = $row;
            }
            $library = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
            $library = unicode_escape_decode($library);
            $statement = $pdo->prepare("UPDATE TenID SET `library` = ? WHERE `login` = ? AND password=?");
            $statement->execute([$library, $login, $password]);
            echo "success";
        }
    }
}
//add comment
if (e($_POST['action']) == "DF7dcbw") {
    $arr = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];
$month = date('n')-1;
    $date=date('d').' '.$arr[$month].' '. date('Y').'г.';
    $login = e($_POST['login']);
    $password = e($_POST['password']);
    $id = (int) e($_POST['id']);
    $comment = e($_POST['comment']);
    $title = e($_POST['title']);
    $isLiked = (int) e($_POST['isLiked']);
    $sql = "SELECT count(*) FROM `TenID` WHERE login = ? AND password = ?";
    $result = $pdo->prepare($sql);
    $result->execute([$login, $password]);
    $number = $result->fetchColumn();
    if ($number == 1) {
        $sql = "SELECT count(*) FROM `comments` WHERE login = ? AND app_id = ?";
        $result = $pdo->prepare($sql);
        $result->execute([$login, $id]);
        $number = $result->fetchColumn();
        if($comment!="$%delete%$"){
        if ($number == 0) {
            $STH = $pdo->prepare("INSERT INTO `bomj2655_database`.`comments` (`login`, `app_id`, `date`, `title`, `comment`, `isLiked`) VALUES (?, ?, ?,?,?,?)");
            $STH->bindParam(1, $login);
            $STH->bindParam(2, $id);
            $STH->bindParam(3, $date);
            $STH->bindParam(4, $title);
            $STH->bindParam(5, $comment);
            $STH->bindParam(6, $isLiked);
            $STH->execute();
        }
        if ($number == 1) {
            $statement = $pdo->prepare("UPDATE comments SET `isLiked` = ?, `date` =?, `title` =?, `comment` =? WHERE `app_id` = ? AND `login`=?");
            $statement->execute([$isLiked, $date, $title, $comment, $id, $login]);
        }
      }
      else{
        $statement = $pdo->prepare("DELETE FROM `bomj2655_database`.`comments` WHERE `app_id` = ? AND `login` =?");
        $statement->execute([$id, $login]);
      }
        $sql = "SELECT count(*) FROM `comments` WHERE `app_id` = ? AND `isLiked` = 1";
        $result = $pdo->prepare($sql);
        $result->execute([$id]);
        $like_count = $result->fetchColumn();
        $sql = "SELECT count(*) FROM `comments` WHERE `app_id` = ? AND `isLiked` = -1";
        $result = $pdo->prepare($sql);
        $result->execute([$id]);
        $dislike_count = $result->fetchColumn();
        $statement = $pdo->prepare("SELECT `login`, `date`, `title`, `comment`, `isLiked` FROM `comments` WHERE `app_id`='" .$id. "'");
        $statement->execute();
        $userData_List = array();
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $userData_List['comments'][] = $row;
        }
        $comments = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
        $comments = unicode_escape_decode($comments);
        $statement = $pdo->prepare("UPDATE apps SET `comments` = ?, `liked` = ?, `disliked` =? WHERE `id` = ?");
        $statement->execute([$comments, $like_count, $dislike_count, $id]);
        echo "success";
}}

// change new password and secretkey
if (e($_POST['action']) == "6R2YVS") {
    $key = e($_POST['key']);
    $password = e($_POST['password']);
    $secretKey = gen_password(8);
    $statement = $pdo->prepare("UPDATE TenID SET `verified` = 1, `secretKey`=?, `password`=? WHERE `secretKey` = ?");
    $statement->execute(array(
        $secretKey,
        $password,
        $key
    ));
}
// search
if (e($_POST['action']) == "d6Gj59") {
    $search = e($_POST['search']);
        $query = "%$search%";
        $statement = $pdo->prepare("SELECT * FROM apps WHERE `id` LIKE ? || `name` LIKE ? || `dev` LIKE ? || `descr` LIKE ? || `tags` LIKE ? || `searchTags` LIKE ?");
        $statement->execute(array(
            $query,
            $query,
            $query,
            $query,
            $query, $query
        ));
        $userData_List = array();
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $userData_List['apps'][] = $row;
        }
        $json = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
        $json = unicode_escape_decode($json);
        echo $json;
}
// register
if (e($_POST['action']) == "si8739JI") {
    if (!$_POST["g-recaptcha"]) {
        exit("errRecaptcha");
    } else {
        $url = "https://www.google.com/recaptcha/api/siteverify";
        $key = "6LcY78EZAAAAAAS57kIxQKmJf52MDXt97AwCYJbq";
        $query = array(
            "secret" => $key,
            "response" => $_POST["g-recaptcha"],
            "remoteip" => $_SERVER['thetenstore.ru'])
        ;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $query);
        $data = json_decode(curl_exec($ch), $assoc = true);
        curl_close($ch);
        if (!$data['success']) {
            exit("errBot");
        } else {
            $login = e($_POST['login']);
            $password = e($_POST['password']);
            $email = e($_POST['email']);
            $name = e($_POST['name']);
            $lastName = e($_POST['lastName']);
            $secretKey = gen_password(8);
            $folder = "images/userPics/";
            $filename = $_FILES['photo']['name'];
            $ext = pathinfo($filename, PATHINFO_EXTENSION);
            $photoPath = $folder . $login . "." . $ext;
            $target_file = $folder . basename($_FILES["photo"]["name"]);
            $allowed = array(
                'jpeg',
                'png',
                'jpg',
                'bmp',
                'gif',
                ""
            );
            $library = e($_POST['library']);
            $verified = 0;
            $date = date('Y-m-d H:i:s');
            $f = strtotime($date);
            $start_time = strtotime($date);
            $end_time = strtotime($date) + 86400;
            $result = $pdo->query("SELECT * FROM `TenID` WHERE `email`='" . $email . "'");
            $assocArray = $result->fetch();
            $f = $assocArray['email'];
        if (strcasecmp($f, $email)==0) {
                echo "errEmail";
            } else {
                $result = $pdo->query("SELECT * FROM `TenID` WHERE `login`='" . $login . "'");
                $assocArray = $result->fetch();
                $f = $assocArray['login'];
        if (strcasecmp($f, $login)==0) {
                    echo "errLogin";
                } else {
                    try {
                        if (!in_array($ext, $allowed)) {
                            echo "errExt";
                        } else {
                            move_uploaded_file($_FILES['photo']['tmp_name'], $photoPath);
                            $STH = $pdo->prepare("INSERT INTO `bomj2655_database`.`TenID` (`email`, `login`, `name`, `lastName`, `password`, `secretKey`, `photo`, `library`, `verified`, `start_time`, `end_time`) VALUES (?,?,?,?,?,?,?,?,?,?,?)");
                            $STH->bindParam(1, $email);
                            $STH->bindParam(2, $login);
                            $STH->bindParam(3, $name);
                            $STH->bindParam(4, $lastName);
                            $STH->bindParam(5, $password);
                            $STH->bindParam(6, $secretKey);
                            if ($photoPath == $folder . $login . ".")
                                $photoPath = "";
                            $STH->bindParam(7, $photoPath);
                            $STH->bindParam(8, $library);
                            $STH->bindParam(9, $verified);
                            $STH->bindParam(10, $start_time);
                            $STH->bindParam(11, $end_time);
                            $STH->execute();
                            echo "success";
                            $content = $content = "<!doctype html>
<html>
  <head>
    <meta name=\"viewport\" content=\"width=device-width\" />
    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />
    <title>Simple Transactional Email</title>
    <style>
      /* -------------------------------------
          GLOBAL RESETS
      ------------------------------------- */

      /*All the styling goes here*/

      img {
        border: none;
        -ms-interpolation-mode: bicubic;
        max-width: 100%;
      }

      body {
        background-color: #f6f6f6;
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 14px;
        line-height: 1.4;
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      table {
        border-collapse: separate;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        width: 100%; }
        table td {
          font-family: sans-serif;
          font-size: 14px;
          vertical-align: top;
      }

      /* -------------------------------------
          BODY & CONTAINER
      ------------------------------------- */

      .body {
        background-color: #f6f6f6;
        width: 100%;
      }

      /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
      .container {
        display: block;
        margin: 0 auto !important;
        /* makes it centered */
        max-width: 580px;
        padding: 10px;
        width: 580px;
      }

      /* This should also be a block element, so that it will fill 100% of the .container */
      .content {
        box-sizing: border-box;
        display: block;
        margin: 0 auto;
        max-width: 580px;
        padding: 10px;
      }

      /* -------------------------------------
          HEADER, FOOTER, MAIN
      ------------------------------------- */
      .main {
        background: #ffffff;
        border-radius: 3px;
        width: 100%;
      }

      .wrapper {
        box-sizing: border-box;
        padding: 20px;
      }

      .content-block {
        padding-bottom: 10px;
        padding-top: 10px;
      }

      .footer {
        clear: both;
        margin-top: 10px;
        text-align: center;
        width: 100%;
      }
        .footer td,
        .footer p,
        .footer span,
        .footer a {
          color: #999999;
          font-size: 12px;
          text-align: center;
      }

      /* -------------------------------------
          TYPOGRAPHY
      ------------------------------------- */
      h1,
      h2,
      h3,
      h4 {
        color: #000000;
        font-family: sans-serif;
        font-weight: 400;
        line-height: 1.4;
        margin: 0;
        margin-bottom: 30px;
      }

      h1 {
        font-size: 35px;
        font-weight: 300;
        text-align: center;
        text-transform: capitalize;
      }

      p,
      ul,
      ol {
        font-family: sans-serif;
        font-size: 14px;
        font-weight: normal;
        margin: 0;
        margin-bottom: 15px;
      }
        p li,
        ul li,
        ol li {
          list-style-position: inside;
          margin-left: 5px;
      }

      a {
        color: #3498db;
        text-decoration: underline;
      }

      /* -------------------------------------
          BUTTONS
      ------------------------------------- */
      .btn {
        box-sizing: border-box;
        width: 100%; }
        .btn > tbody > tr > td {
          padding-bottom: 15px; }
        .btn table {
          width: auto;
      }
        .btn table td {
          background-color: #ffffff;
          border-radius: 5px;
          text-align: center;
      }
        .btn a {
          background-color: #ffffff;
          border: solid 1px #3498db;
          border-radius: 5px;
          box-sizing: border-box;
          color: #3498db;
          cursor: pointer;
          display: inline-block;
          font-size: 14px;
          font-weight: bold;
          margin: 0;
          padding: 12px 25px;
          text-decoration: none;
          text-transform: capitalize;
      }

      .btn-primary table td {
        background-color: #3498db;
      }

      .btn-primary a {
        background-color: #3498db;
        border-color: #3498db;
        color: #ffffff;
      }

      /* -------------------------------------
          OTHER STYLES THAT MIGHT BE USEFUL
      ------------------------------------- */
      .last {
        margin-bottom: 0;
      }

      .first {
        margin-top: 0;
      }

      .align-center {
        text-align: center;
      }

      .align-right {
        text-align: right;
      }

      .align-left {
        text-align: left;
      }

      .clear {
        clear: both;
      }

      .mt0 {
        margin-top: 0;
      }

      .mb0 {
        margin-bottom: 0;
      }

      .preheader {
        color: transparent;
        display: none;
        height: 0;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        mso-hide: all;
        visibility: hidden;
        width: 0;
      }

      .powered-by a {
        text-decoration: none;
      }

      hr {
        border: 0;
        border-bottom: 1px solid #f6f6f6;
        margin: 20px 0;
      }

      /* -------------------------------------
          RESPONSIVE AND MOBILE FRIENDLY STYLES
      ------------------------------------- */
      @media only screen and (max-width: 620px) {
        table[class=body] h1 {
          font-size: 28px !important;
          margin-bottom: 10px !important;
        }
        table[class=body] p,
        table[class=body] ul,
        table[class=body] ol,
        table[class=body] td,
        table[class=body] span,
        table[class=body] a {
          font-size: 16px !important;
        }
        table[class=body] .wrapper,
        table[class=body] .article {
          padding: 10px !important;
        }
        table[class=body] .content {
          padding: 0 !important;
        }
        table[class=body] .container {
          padding: 0 !important;
          width: 100% !important;
        }
        table[class=body] .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important;
        }
        table[class=body] .btn table {
          width: 100% !important;
        }
        table[class=body] .btn a {
          width: 100% !important;
        }
        table[class=body] .img-responsive {
          height: auto !important;
          max-width: 100% !important;
          width: auto !important;
        }
      }

      /* -------------------------------------
          PRESERVE THESE STYLES IN THE HEAD
      ------------------------------------- */
      @media all {
        .ExternalClass {
          width: 100%;
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%;
        }
        .apple-link a {
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          text-decoration: none !important;
        }
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          line-height: inherit;
        }
        .btn-primary table td:hover {
          background-color: #34495e !important;
        }
        .btn-primary a:hover {
          background-color: #34495e !important;
          border-color: #34495e !important;
        }
      }

    </style>
  </head>
  <body class=\"\">
    <span class=\"preheader\">This is preheader text. Some clients will show this text as a preview.</span>
    <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"body\">
      <tr>
        <td>&nbsp;</td>
        <td class=\"container\">
          <div class=\"content\">

            <!-- START CENTERED WHITE CONTAINER -->
            <table role=\"presentation\" class=\"main\">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class=\"wrapper\">
                  <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">
                    <tr>
                      <td>
                        <p>Здравствуйте,</p>
                        <p>Нажмите на кнопку ниже, чтобы подтвердить ваш аккаунт TenID.</p>
                        <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"btn btn-primary\">
                          <tbody>
                            <tr>
                              <td align=\"left\">
                                <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">
                                  <tbody>
                                    <tr>
                                      <td> <a href=\"https://thetenstore.ru/activate.php?secretKey=" . $secretKey . "\" target=\"_blank\">Подтвердить</a> </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p>Если вы ничего не делали, проигнорируйте это письмо.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <div class=\"footer\">
              <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">
                <tr>
                  <td class=\"content-block\">
                    <span class=\"apple-link\">https://thetenstore.ru</span>
                  </td>
                </tr>
                <tr>
                  <td class=\"content-block powered-by\">
                    TenStore by <a href=\"https://vk.com/pressteam\">Press Team</a>.
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </td>
        <td>&nbsp;</td>
      </tr>
    </table>
  </body>
</html>
";
                            $headers = 'MIME-Version: 1.0' . "\r\n";
                            $headers .= "Content-type: text/html; charset=utf-8 \r\n";
                            $headers .= "From: TenStore <webmaster@thetenstore.ru>\r\n"; // от кого
                            mail($email, "Регистрация на TenStore", $content, $headers);
                        }
                    } catch (PDOException $e) {
                        echo $e->getMessage();
                    }
                }
            }
        }
    }
}
// update account
if (e($_POST['action']) == "QWE2e3FA") {
    $id = e($_POST['currentLogin']);
    $password = e($_POST['password']);
    $isNewPhoto = e($_POST['isNewPhoto']);
    $isNewBG = e($_POST['isNewBG']);
    $login =e($_POST['newLogin']);
    $email =e($_POST['email']);
    $contact =e($_POST['contact']);
    $bio = e($_POST['bio']);
    $shortBio =e($_POST['shortBio']);
    $name = e($_POST['name']);
    $lastName =e($_POST['lastName']);
    $next = 0;
    if ($email != null) {
        $result = $pdo->query("SELECT * FROM `TenID` WHERE `email`='" . $email . "'");
        $assocArray = $result->fetch();
        $f = $assocArray['email'];
        if (strcasecmp($f, $email)==0) {
            echo "errEmail";
            $next = 1;
        }
    } else {
        $result = $pdo->query("SELECT * FROM `TenID` WHERE `login`='" . $id . "' AND `password`='" . $password . "'");
        $assocArray = $result->fetch();
        $email = $assocArray['email'];
    }
    if ($login != null) {
        $result = $pdo->query("SELECT * FROM `TenID` WHERE `login`='" . $login . "'");
        $assocArray = $result->fetch();
        $f = $assocArray['login'];
        if (strcasecmp($f, $login)==0) {
            echo "errLogin";
            $next = 1;
        }
    } else {
        $result = $pdo->query("SELECT * FROM `TenID` WHERE `login`='" . $id . "' AND `password`='" . $password . "'");
        $assocArray = $result->fetch();
        $login = $assocArray['login'];
    }
    if ($bio == null) {
        $result = $pdo->query("SELECT * FROM `TenID` WHERE `login`='" . $id . "' AND `password`='" . $password . "'");
        $assocArray = $result->fetch();
        $bio = $assocArray['bio'];
    }
    if ($bio == "%*enpty*%") {
        $bio = "";
    }
    if ($lastName == "%*enpty*%") {
        $lastName = "";
    }
    if ($shortBio == "%*enpty*%") {
        $shorBio = "";
    }
    if ($contact == "%*enpty*%") {
        $contact = "";
    }
    if ($shorBio == null) {
        $result = $pdo->query("SELECT * FROM `TenID` WHERE `login`='" . $id . "' AND `password`='" . $password . "'");
        $assocArray = $result->fetch();
        $shorBio = $assocArray['shorBio'];
    }
    if ($contact == null) {
        $result = $pdo->query("SELECT * FROM `TenID` WHERE `login`='" . $id . "' AND `password`='" . $password . "'");
        $assocArray = $result->fetch();
        $contact = $assocArray['contact'];
    }
    if ($name == null) {
        $result = $pdo->query("SELECT * FROM `TenID` WHERE `login`='" . $id . "' AND `password`='" . $password . "'");
        $assocArray = $result->fetch();
        $name = $assocArray['name'];
    }
    if ($lastName == null) {
        $results = $pdo->query("SELECT * FROM `TenID` WHERE `login`='" . $id . "' AND `password`='" . $password . "'");
        $assocArrays = $results->fetch();
        $lastName = $assocArrays['lastname'];
    }
    if ($next == 0) {
        if ($isNewBG == "true") {
            $folder = "images/userBg/";
            $filename = $_FILES['bg']['name'];
            $ext = pathinfo($filename, PATHINFO_EXTENSION);
            $bgPath = $folder . $login . "." . $ext;
            $target_file = $folder . basename($_FILES["bg"]["name"]);
            $allowed = array(
                'jpeg',
                'png',
                'jpg',
                'bmp',
                'gif',
                ""
            );
            if (!in_array($ext, $allowed)) {
                echo "errExt";
                $ext = 1;
            } else {
                move_uploaded_file($_FILES['bg']['tmp_name'], $bgPath);
                $ext = 0;

            }
        }
        if ($isNewPhoto == "true") {
            $folder = "images/userPics/";
            $filename = $_FILES['photo']['name'];
            $ext = pathinfo($filename, PATHINFO_EXTENSION);
            $photoPath = $folder . $login . "." . $ext;
            $target_file = $folder . basename($_FILES["photo"]["name"]);
            $allowed = array(
                'jpeg',
                'png',
                'jpg',
                'bmp',
                'gif',
                ""
            );
            if (!in_array($ext, $allowed)) {
                echo "errExt";
                $ext = 1;
            } else {
                move_uploaded_file($_FILES['photo']['tmp_name'], $photoPath);
                $ext = 0;

            }
        }
        if ($isNewPhoto == "false") {
            $result = $pdo->query("SELECT * FROM `TenID` WHERE `login`='" . $id . "' AND `password`='" . $password . "'");
            $assocArray = $result->fetch();
            $photoPath = $assocArray['photo'];
        }
        if ($isNewPhoto == null) {
            $result = $pdo->query("SELECT * FROM `TenID` WHERE `login`='" . $id . "' AND `password`='" . $password . "'");
            $assocArray = $result->fetch();
            $photoPath = $assocArray['photo'];
            unlink($photoPath);
            $photoPath = null;
        }
        if ($ext == 0) {
            $STH = $pdo->prepare("UPDATE `TenID` SET `email`=?, `login`=?, `name`=?, `lastname`=?, `photo`=?, `bg`=?, `bio`=?,`shortBio`=?,`contact`=? WHERE `login`=? AND `password`=?");
            $STH->execute([
                $email,
                $login,
                $name,
                $lastName,
                $photoPath,
                $bgPath,
                $bio,
                $shortBio,
                $contact,
                $id,
                $password
            ]);
            echo "success";
        }
    }
}
//get library
if (e($_POST['action']) == 'hgwea0756') {
  $login = e($_POST['login']);
  $password = e($_POST['password']);
  $sql = "SELECT count(*) FROM `TenID` WHERE login = ? AND password = ?";
  $result = $pdo->prepare($sql);
  $result->execute([$login, $password]);
  $number = $result->fetchColumn();
  if ($number == 1) {
  $statement = $pdo->prepare("SELECT group_concat(`app_id`) FROM `library` WHERE `login`='" . $login."'");
  $statement->execute();
  if (($data = $statement->fetch()) !== false) {
    $array=$data['group_concat(`app_id`)'];
    $statement = $pdo->prepare("SELECT `name`, `dev`, `icon`, `id`, `icon_bg`, `icon_pad`, `card_bg` FROM `apps` WHERE `id` in(".$array.")");
    $statement->execute();
    $userData_List = array();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $userData_List['apps'][] = $row;
    }
    $json = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
    $json = unicode_escape_decode($json);
    echo $json;}
}
}
// login
if (e($_POST['action']) == 'h495ujh') {
    $login = e($_POST['login']);
    $password = e($_POST['password']);
    if (filter_var($login, FILTER_VALIDATE_EMAIL) !== false) {
        $statement = $pdo->prepare("SELECT * FROM `TenID` WHERE `email`='" . $login . "' AND `password`='" . $password . "' AND `verified`=1");
    } else {
        $statement = $pdo->prepare("SELECT * FROM `TenID` WHERE `login`='" . $login . "'AND `password`='" . $password . "' AND `verified`=1");
    }
    $statement->execute();
    $empty = $statement->rowCount() === 0;
    if (!$empty) {
        $userData_List = array();
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $userData_List['user'][] = $row;
        }
        $json = json_encode($userData_List, JSON_UNESCAPED_SLASHES);
        $json = unicode_escape_decode($json);
        echo $json;
    }
    else echo "errLogin";
}
// moderator delete
if (e($_POST['action']) == 'EDIAdX') {
    $login = e($_POST['login']);
    $password = e($_POST['password']);
    $id = (int) e($_POST['id']);
    $result = $pdo->query("SELECT * FROM `TenID` WHERE `login`='" . $login . "' AND `password`='".$password."'");
    $assocArray = $result->fetch();
    $f = $assocArray['userType'];
    if ($f == 'admin') {
        $result = $pdo->query("SELECT * FROM `apps` WHERE `id`='" . $id."'");
        $assocArray = $result->fetch();
        $icon = $assocArray['icon'];
        $windows = $assocArray['windows'];
        $android = $assocArray['android'];
        $sql = $pdo->prepare("DELETE FROM `apps` WHERE `id`=" . $id);
        $sql->execute();
        $text = [
            'text' => "Удалено!"
        ];
        header('Content-Type: application/json');
        echo json_encode($text);
        unlink($icon);
        unlink($windows);
        unlink($android);
    }
    if ($f == 'dev') {
        $result = $pdo->query("SELECT * FROM `apps` WHERE `id`=" . $id);
        $assocArray = $result->fetch();
        $f = $assocArray['dev'];
        if ($f == $login) {
            $sql = $pdo->prepare("DELETE FROM `apps` WHERE `id`=" . $id);
            $sql->execute();
            $text = [
                'text' => "Удалено!"
            ];
            header('Content-Type: application/json');
            echo json_encode($text);
        } else {
            $text = [
                'text' => "Вы не разработчик этого приложения!"
            ];
            header('Content-Type: application/json');
            echo json_encode($text);
        }
    }
}

function gen_password($length = 6)
{
    $password = '';
    $arr = array(
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0'
    );

    for ($i = 0; $i < $length; $i++) {
        $password .= $arr[random_int(0, count($arr) - 1)];
    }
    return $password;
}

function unicode_escape_decode($str)
{
    return html_entity_decode(preg_replace('~\\\u([a-zA-Z0-9]{4})~', '&#x$1;', $str), null, 'UTF-8');
}
function e($string)
{
    return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
}
?>
