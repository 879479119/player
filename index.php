<?php
session_start();
?>
<html>
<head>
    <meta charset="UTF-8">
    <title>Pilipili弹幕网</title>
    <link href="CSS/index.css" rel="stylesheet" type="text/css">
</head>
<body>
<nav class="nav absolute">
    <span>Pilipili弹幕视频网</span>
    <form action="#" id="log-form">
        <label for="number">账号:</label><input type="text" placeholder="2014210385" id="number" class="input-trans"/>
        <label for="password">密码:</label><input type="password" placeholder="250514" id="password" class="input-trans"/>
        <label for="log"></label><input type="button" value="登入" id="log-in" class="input-trans"/>
    </form>
</nav>
<div class="wrap">
    <div class="container">
        <article class="flex-box box-a">
            <a href="#"  id="img-face"><img src="<?php if(isset($_SESSION["img_url"])){echo $_SESSION["img_url"];}else{echo "http://7xsm7w.com2.z0.glb.clouddn.com/image/jpegface.jpg";}?>" alt="face"/></a>
            <div class="info-line"><span>登录工号: </span><em><?php if(isset($_SESSION["number"])){echo $_SESSION["number"];}else{echo "登录后查看";}?></em></div>
            <div class="info-line"><span>登录名: </span><em><?php if(isset($_SESSION["name"])){echo $_SESSION["name"];}else{echo "登录后查看";}?></em></div>
            <div class="info-line"><button class="input-trans round-btn" id="log-out"><span>注销</span></button></div>
        </article>
        <article class="flex-box box-b">
            <h3>弹幕演示视频:</h3>
            <div id="player" class="player">
                <video src="video/video.mp4" class="video" id="video" controls>CANNOT LOAD</video>
                <div id="show-layout">

                </div>
            </div>
            <form action="#" id="comment-form">
                <label for="comment"></label><input type="text" id="comment" class="input-trans comment-bar"/>
                <label for="submit"></label><input type="button" value="发射弹幕" id="submit" class="input-trans"/>
            </form>
        </article>
        <article class="flex-box box-c">
            <h3>Comments:</h3>
            <table class="comment-table">
                <tr class="table-header">
                    <td>Comment</td><td>Time</td>
                </tr>
                <tr class="table-row">
                    <td>&nbsp;</td><td>&nbsp;</td>
                </tr>
                <tr class="table-row">
                    <td>&nbsp;</td><td>&nbsp;</td>
                </tr>
                <tr class="table-row">
                    <td>&nbsp;</td><td>&nbsp;</td>
                </tr>
                <tr class="table-row">
                    <td>&nbsp;</td><td>&nbsp;</td>
                </tr>
                <tr class="table-row">
                    <td>&nbsp;</td><td>&nbsp;</td>
                </tr>
                <tr class="table-row">
                    <td>&nbsp;</td><td>&nbsp;</td>
                </tr>
                <tr class="table-row">
                    <td>&nbsp;</td><td>&nbsp;</td>
                </tr>
                <tr class="table-row">
                    <td>&nbsp;</td><td>&nbsp;</td>
                </tr>
                <tr class="table-row">
                    <td>&nbsp;</td><td>&nbsp;</td>
                </tr>
                <tr class="table-row">
                    <td>&nbsp;</td><td>&nbsp;</td>
                </tr>
                <tr class="table-row">
                    <td>&nbsp;</td><td>&nbsp;</td>
                </tr>
                <tr class="table-row">
                    <td>&nbsp;</td><td>&nbsp;</td>
                </tr>
                <tr class="table-row">
                    <td>&nbsp;</td><td>&nbsp;</td>
                </tr>
                <tr class="table-row">
                    <td>&nbsp;</td><td>&nbsp;</td>
                </tr>
            </table>
            <div class="page-control">
                <button class="input-trans" id="fore">上一页</button>
                <button class="input-trans" id="after">下一页</button>
            </div>
        </article>
    </div>
</div>
<div id="calculate-area" style="z-index: 0; position: absolute;"></div>
<script src="script/jquery.js"></script>
<script>
    var logName = "<?php
        if(isset($_SESSION["number"])){
            echo $_SESSION["number"];
        }
    ?>";

    var token = "<?php
        if(isset($_SESSION["token"])){
            echo $_SESSION["token"];
        }
    ?>";

    if(logName){
        document.getElementsByTagName("nav").item(0).style.display = "none";
    }
</script>
<script src="script/index.js"></script>
<script src="script/player.js"></script>
</body>
</html>