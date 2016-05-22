<?php
/**
 * Created by PhpStorm.
 * User: JO
 * Date: 2016/3/28
 * Time: 19:38
 */

session_start();

$conn = new mysqli("localhost","root","","mydata");

if($_REQUEST["request"] == "initial"){
    $query = "SELECT player_time,text FROM data WHERE permission = 1";

    $match = $conn->query($query);

    $count = $match->num_rows;
    $arr = [];

    while($count --){
        $arr[$count] = $match->fetch_array(MYSQLI_ASSOC);
    }

    echo json_encode($arr);

    $match->free();

}elseif($_REQUEST["request"] == "submit"){

    if($_REQUEST["token"] == $_SESSION["token"]){
        $query = "INSERT INTO data (number,name,text,player_time,permission) VALUES (".$_SESSION['number'].",'".$_SESSION['name']."','".$_POST['text']."',".$_POST['playerTime'].",0)";
        $conn->query($query);
        echo $_SESSION["name"],$_SESSION["number"],$_POST["text"];
    }

}else{
    $a = [];
    array_push($a,3);
    echo json_encode($a);
}

$conn->close();
