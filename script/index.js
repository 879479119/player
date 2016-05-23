/**
 * Created by JO on 2016/4/3.
 */

$("#log-in").click(function(){

    var number = $("#number").val();
    var password = $("#password").val().toString();

    $.ajax({
        url:"login.php",
        method:"POST",
        data:{number:number,password:password},
        success:function(response){
            console.log(response);
            if(response == "jump"){
                window.location = "admin_show.php"
            }else if(response == "stay"){
                window.location.reload();
            }else if(response == "failed"){
                alert("CANNOT LOG IN!");
            }
        },
        error:function(){
            alert("请检查网络链接");
        }
    })
});

$("#log-out").click(function(){
    $.ajax({
        url:"logout.php",
        success:function(response){
            console.log(response);
            if(response == "stay"){
                window.location.reload();
            }
        },
        error:function(){
            alert("请检查网络链接");
        }
    })
});

$("#submit").click(function(){
    var comment = $("#comment").val();
    $.ajax({
        url:"server.php",
        method:"POST",
        data:{request:"submit",playerTime:player.currentTime,text:comment,token:token},
        success:function(){
            $("#comment").val(undefined);
        }
    });

});


/*
* 试试在这里面加点注释看看
* 
* 哈哈哈哈哈哈哈   版本控制好玩
* 
* */