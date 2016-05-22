<html>
<head>
    <meta charset="UTF-8">
    <title>弹幕审核</title>
    <link href="CSS/admin.css" rel="stylesheet" type="text/css">
</head>
<body>
<nav></nav>
<div class="wrap">
    <div class="container">
        <div class="statistics trans">
            <h3>Alanysis<sup>&nbsp;数据分析</sup></h3>
            <table class="statistics-table">
                <tr>
                    <td>待审数目:</td>
                    <td><a href="#" id="all-count" class="count">0</a><span>条</span></td>
                </tr>
                <tr>
                    <td>通过率:</td>
                    <td><a href="#" id="pass-count" class="count">100</a><span>%</span></td>
                </tr>
                <tr>
                    <td>弹幕密度:</td>
                    <td><a href="#" id="midu" class="count">15</a><span>条/秒</span></td>
                </tr>
            </table>
            <button class="trans" id="exit">注销</button>
        </div>
        <section class="trans sec-active">
            <img src="image/error.jpg" alt="face"/>
            <div>
                <p>
                    <span>昵称:</span>
                    <em>没有数据</em>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <span>账号:</span>
                    <em>没有数据</em>
                </p>
                <p>没有数据</p>
            </div>
            <div class="choice">
                <button class="trans trans-btn-success">通过</button>
                <button class="trans trans-btn-cancel">取消</button>
            </div>
        </section>
        <section class="trans sec">
            <img src="image/error.jpg" alt="face"/>
            <div>
                <p></p>
            </div>
        </section>
        <section class="trans sec">
            <img src="image/error.jpg" alt="face"/>
            <div>
                <p></p>
            </div>
        </section>
        <section class="trans sec">
            <img src="image/error.jpg" alt="face"/>
            <div>
                <p></p>
            </div>
        </section>
        <section class="trans sec">
            <img src="image/error.jpg" alt="face"/>
            <div>
                <p></p>
            </div>
        </section>
        <section class="trans sec">
            <img src="image/error.jpg" alt="face"/>
            <div>
                <p></p>
            </div>
        </section>
    </div>
</div>
<script src="script/jquery.js"></script>
<script src="script/jquery-ui.js"></script>
<script>
    var logName = "<?php
    session_start();

    if(isset($_SESSION["name"])){
        echo $_SESSION["name"];
    }else{
        echo "***";
    }
    ?>";

    var permission = "<?php
    if(isset($_SESSION["token"])){
        echo $_SESSION["token"];
    }else{
        echo 0;
    }
    ?>";

</script>
<script src="script/admin.js"></script>
</body>
</html>