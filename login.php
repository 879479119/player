<?php
/**
 * Created by PhpStorm.
 * User: JO
 * Date: 2016/3/28
 * Time: 16:36
 */
session_start();

$conn = new mysqli("localhost","root","","mydata");

$number = $_POST["number"];
$password = $_POST["password"];

$match = $conn->query("SELECT * FROM user_data WHERE number = '".$number."' AND password = '".$password."'");

if($match->num_rows){
    $result = $match->fetch_array(MYSQLI_ASSOC);

    $timeStamp = time();
    $MD5 = md5($number.$timeStamp.$result["permission"]);

    $_SESSION['number'] = $number;
    $_SESSION['name'] = $result["name"];
    $_SESSION['img_url'] = $result["img_url"];
    $_SESSION['token'] = $MD5;


    if($result["permission"] == 1){
        echo "jump";
    }else if($result["permission"] == 0){
        echo "stay";
    }
}else{
    echo "failed";
}

$match->free();

$conn->close();


