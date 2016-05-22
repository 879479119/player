/**
 * Created by JO on 2016/4/5.
 */

var comments = [];             //ths storage of comment object
var passID = [],          //the array of ID for passed comments
    unpassID = [],        //the array of ID for not passed comments
    lastID = 0;           //the ID of last one ,to check for new comments
var active;
var recordIndex = 0;
$(document).ready(function(){

    send(true);

    setInterval(interval,11000);

    $(".trans-btn-success").click(success);
    $(".trans-btn-cancel").click(cancel);
    $("#exit").click(function(){
        $.ajax({
            url:"logout.php",
            success:function(response){
                console.log(response);
                if(response == "stay"){
                    window.location = "index.php";
                }
            },
            error:function(){
                alert("请检查网络链接");
            }
        })
    });

    function change(){
        active = comments.pop();

        var first = $($(".sec")[0]);
        var last = first.clone();
        var sa = $(".sec-active");
        var backup = sa.clone(true);
        var duration = 500;

        if(active == undefined){
            active = [];
            active["img_url"] = "http://7xsm7w.com2.z0.glb.clouddn.com/image/jpegerror.jpg";
            active["name"] = "没有数据";
            active["number"] = "没有数据";
            active["text"] = "没有数据";
        }

        sa.animate({opacity:0},duration,function(){
            sa.remove();
            first.css("margin-top","144px");
            first.find("img").animate({width:"80px",height:"80px"},duration);
            first.find("div").fadeOut(duration);
            first.animate({width:"80%",height:"100px","margin-top":"20px"},duration,function(){
                first.html(backup.html());
                first.removeClass("sec").addClass("sec-active");
                first.find("img")[0].src = active["img_url"];
                first.find("em")[0].innerHTML = active["name"];
                first.find("em")[1].innerHTML = active["number"];
                first.find("p")[1].innerHTML = active["text"];
                first.find("div").css("display","none").fadeIn(duration);
                last.css("opacity","0");

                console.log("B",recordIndex);
                if(recordIndex > 0){
                    last.find("img")[0].src = comments[recordIndex - 1]["img_url"];
                    last.find("p")[0].innerHTML = comments[recordIndex - 1]["text"];
                    recordIndex = recordIndex - 1;
                }else if(recordIndex <= 0){
                    last.find("img")[0].src = "http://7xsm7w.com2.z0.glb.clouddn.com/image/jpegerror.jpg";
                    last.find("p")[0].innerHTML = "";
                }
                $(".container").append(last);
                last.animate({"opacity":1},duration);

                //bind events
                $(first.find("button")[0]).bind("click",success);
                $(first.find("button")[1]).bind("click",cancel);
            });
        });

    }

    function send(isInit){
        $.ajax({
            url:"admin.php",
            method:"POST",
            dataType:"JSON",
            data:{
                name:logName,
                token:permission,
                passID:passID.join(","),
                unpassID:unpassID.join(","),
                lastID:lastID
            },
            success:function(e){
                if(isInit == true){
                    if(e["info"] == "No New Comments"){
                        alert("暂无弹幕需要审核");
                    }else{
                        //format output
                        lastID = parseInt(e[0]["id"]);
                        comments = json2arr(e);
                        console.log(comments);
                        var dom = $(".sec-active");
                        active = comments.pop();
                        dom.find("img")[0].src = active["img_url"];
                        dom.find("em")[0].innerHTML = active["name"];
                        dom.find("em")[1].innerHTML = active["number"];
                        dom.find("p")[1].innerHTML = active["text"];

                        var list = $(".sec"),
                            index = parseInt(comments.length),
                            n = 0;
                        while(n < 5 && index){
                            $(list[n]).find("img")[0].src = comments[index - 1]["img_url"];
                            $(list[n]).find("p")[0].innerHTML = comments[index - 1]["text"];
                            n ++;
                            -- index;
                        }
                        recordIndex = index;
                        console.log("A",recordIndex);
                    }
                }else{
                    passID = [];
                    unpassID = [];
                    if(e["info"] == "No New Comments"){
                        console.log("No New Comments");
                    }else{
                        lastID = parseInt(e[0]["id"]);
                        var addition = json2arr(e);
                        n = 0;
                        while(n ++ < addition.length){
                            comments.unshift(addition[addition.length - n]);
                        }
                    }
                }
            }
        })
    }

    function interval(){
        return send(false);
    }

    function success(){
        passID.push(active["id"]);
        change();
    }

    function cancel(){
        unpassID.push(active["id"]);
        change();
    }

    function json2arr(json){
        var n = 0,arr = [];
        while(json[n] != undefined){
            arr.push(json[n ++]);
        }
        return arr;
    }
});



