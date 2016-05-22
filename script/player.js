/**
 * Created by JO on 2016/4/8.
 */

var saveComment = [];   //all the comments  [object]
var spanComment = [];   //all the comments on screen  [array]
var page = 0;
var player = document.getElementById("video");
var playState = false,seek = false;
player.volume = 0;

var channel = [0,0,0,0,0,0,0,0,0,0,0,0,0],
    node = new Array(13);
var manager = [channel,node];  //0 for channel,1 for endTime

$.ajax({
    url:"server.php",
    method:"POST",
    dataType:"JSON",
    data:{request:"initial"},
    success:function(e){
        var i = 0;

        while(e[i] != undefined){
            saveComment.push(new Comment(e[i]["text"],e[i]["player_time"]));
            i ++;
        }
        saveComment.sort(compare);
        fillTable(0);
    }
});

$("#fore").click(function(){
    fillTable(page == 0 ? 0 :-- page);
});

$("#after").click(function(){
    fillTable(page == Math.floor(saveComment.length / 14) ? page : ++ page);
});

player.addEventListener("play",function(){

    if(playState == true){
        $(spanComment).each(function(){
            var width = $(this[0]).width();
            $(this[0]).animate({left: (-1) * width + "px"},this[1],"linear",function(){
                this.parentNode.removeChild(this);
            });
        });
        spanComment = [];
        playState = false;
    }else{
        $(".comment-cell").remove();
    }
});

player.addEventListener("pause",function(){
    var comment = $(".comment-cell");
    comment.each(function(){
        var width = $(this).width(),
            left = parseFloat($(this).css("left")),
            leftTime = ((left + width) / (width + 620)) * 8000;
        var arr = new Array(2);
        arr[0] = this;
        arr[1] = leftTime;
        spanComment.push(arr);
        $(this).stop(true);
    });
    playState = true;
});

player.addEventListener("ended",function(){
    $(".comment-cell").stop(true);
});

player.addEventListener("seeking",function(){
    seek = true;
    spanComment = [];
    $(".comment-cell").remove();
    manager[0] = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    manager[1] = [];
});

player.addEventListener("seeked",function(){
    seek = false;
});

player.addEventListener("timeupdate",function(){
    if(seek == false){
        var curTime = player.currentTime;
        //console.log(curTime);
        for(var n = 0;n < saveComment.length;n ++){
            if(saveComment[n].startTime - 0.3 < curTime && saveComment[n].startTime >= curTime){
                var fired = false;

                for(var t = 0;t < 13 && fired == false;t ++){

                    if(manager[0][t] < curTime && manager[1][t] == undefined){

                        saveComment[n].channel = t;
                        manager[1][t] = saveComment[n].fire(curTime);
                        manager[0][t] = saveComment[n].endTime;

                        fired = true;

                        //saveComment.splice(n,1);

                    }else if(manager[0][t] < curTime){
                        var widthA = $(manager[1][t]).width(),
                            widthB = saveComment[n].calculateWidth(),
                            leftA = parseFloat(manager[1][t].style.left);

                        if(widthA > widthB || (620 - widthA - leftA) / (widthB - widthA) > (leftA + widthA) / (620 + widthA)){
                            saveComment[n].channel = t;
                            manager[1][t] = saveComment[n].fire(curTime);
                            manager[0][t] = saveComment[n].endTime;
                            fired = true;
                            //saveComment.splice(n,1);
                        }
                    }
                }
                if(fired == false){
                    saveComment[n].channel = n % 8;
                    saveComment[n].fire(curTime);
                    manager[1][n % 13] = saveComment[n].endTime;
                    //saveComment.splice(n,1);
                }
            }
        }
    }
});

function Comment(text,time){

    var duration = 8000;
    var that = this;
    this.channel = 0;

    this.endTime = 0;
    this.text = text;
    this.startTime = parseFloat(time);
    this.fire = function(curTime){
        var node = document.createElement("span");
        node.innerHTML = text;
        node.setAttribute("class","comment-cell");
        node.style.top = this.channel * 24 + "px";
        document.getElementById("show-layout").appendChild(node);
        var width = $(node).width();
        $(node).animate({left: (-1) * width + "px"},duration,"linear",function(){
            node.parentNode.removeChild(node);
        });
        that.endTime =  (duration / 1000) * width / (620 + width) + curTime;
        return node;      //return the node
    };

    this.calculateWidth = function(){
        var node = document.createElement("span");
        node.innerHTML = text;
        node.setAttribute("class","comment-cell");
        var dom = document.getElementById("calculate-area");
        dom.appendChild(node);
        var result = $(node).width();
        dom.removeChild(node);
        return result;
    };
}

function compare(val1,val2){
    var base = "startTime";
    if(val1[base] > val2[base]){
        return 1;
    }else if(val1[base] < val2[base]){
        return -1;
    }else{
        return 0;
    }
}

function fillTable(page){
    var n = 0;
    while(n < 14){
        var dom = $($(".table-row")[n]).find("td");
        if(n + page * 14 < saveComment.length){
            dom[0].innerHTML = saveComment[n + page * 14].text;
            dom[1].innerHTML = saveComment[n + page * 14].startTime;
        }else{
            dom[0].innerHTML = "&nbsp;";
            dom[1].innerHTML = "&nbsp;";
        }
        n ++;
    }
}