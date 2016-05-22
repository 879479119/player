<?php
/**
 * Created by PhpStorm.
 * User: JO
 * Date: 2016/3/28
 * Time: 16:36
 */

session_start();

//echo $_SESSION["name"];
//echo $_POST["name"];
//echo $_SESSION["token"];
//echo $_POST["token"];


if($_SESSION["name"] == $_POST["name"] && $_SESSION["token"] == $_POST["token"]){
    $conn = new mysqli("localhost","root","","mydata");

    $last = $_POST["lastID"];

    $match = $conn->query("SELECT * FROM data WHERE permission = 0 AND id > $last");

    $count = $match->num_rows;
    $arr = [];

    if($count > 0){
        while($count --){
            $arr[$count] = $match->fetch_array(MYSQLI_ASSOC);

            /*for face image*/

            $query_img_url = $conn->query("SELECT * FROM user_data WHERE number = ".$arr[$count]['number']);
            $url = $query_img_url->fetch_array(MYSQLI_ASSOC);

            $arr[$count]["img_url"] = $url["img_url"];

            /*for face image*/
        }
    }else{
        $arr["info"] = "No New Comments";
    }

    echo json_encode($arr);

    if($_POST["passID"]){
        $arrayID = explode(",",$_POST["passID"]);
        foreach($arrayID as $key => $value){
            $update = "UPDATE data SET permission = 1 WHERE id = '$value' ";
            $conn->query($update);
        }
    }

    if($_POST["unpassID"]){
        $arrayID = explode(",",$_POST["unpassID"]);
        foreach($arrayID as $key => $value){
            $update = "UPDATE data SET permission = 2 WHERE id = '$value' ";
            $conn->query($update);
        }
    }

    $conn->close();
}else{
    echo "请检查权限";

    exit();
}

