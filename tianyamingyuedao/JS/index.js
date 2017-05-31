/**
 * Created by l on 2016/10/4.
 */
//轮播图
//先找人
var box=document.getElementById("box");
var ul=document.getElementById("box_ul");
var ulLis=ul.children;
var imgWidth=box.offsetWidth;

var bottom=document.getElementById("bottom");
var ol=document.getElementById("bottom_ol");
var olLis=ol.children;


var arr=document.getElementById("arr");
var left=document.getElementById("left");
var right=document.getElementById("right");


//1.遍历下面li中的每一个
for(var i=0;i<olLis.length;i++){
    olLis[i].index=i;
    olLis[i].onmouseover=function(){
        var target=-this.index*imgWidth;
        move(ul,target,25);
        pic=square=this.index;
    }
}


//1.2动态生成最后一张假图片图片
//根据第一张真的图片去生成假的
//克隆第一张
var firstImg=ulLis[0].cloneNode(true);
ul.appendChild(firstImg);

var pic=0;
var square=0;
//  点击右箭头， 移动ul到指定的位置
right.onclick=function(){
    //一进来先判断当移动到最后一张图片时应该跳回去
    if(pic===ulLis.length-1){
        ul.style.left=0+"px";
        pic=0;
    }
    pic++;
    var target=-pic*imgWidth;
    move(ul,target,25);


    if (square < olLis.length - 1) {
        square++;
    } else {
        square = 0;
    }
    //排他
    //干掉所有人 让所有的按钮灭掉 也就是 干掉类名
    for (var i = 0; i < olLis.length; i++) {
        olLis[i].className = "";
    }
    //留下当前的 也就是square这个索引所对应的
    olLis[square].className = "current";

};

//点击左箭头 移动ul到相应位置
left.onclick = function () {
    //一进来先判断 当前显示的图片的索引是不是第一个图片的索引
    if (pic === 0) {//如果是 第一个 首先瞬间跳到最后 而且还得滚
        ul.style.left = -(ulLis.length - 1) * imgWidth + "px";//瞬间跳回去
        pic = ulLis.length - 1;//把记录当前显示的图片的索引 变为最后的图片的索引
    }
    pic--;//计算出接下来要显示的图的索引
    //目标 target 和 pic有关 和 图片宽度有关 而且是负数
    var target = -pic * imgWidth;
    move(ul, target,25);

    if (square > 0) {
        square--;
    } else {
        square = olLis.length - 1;
    }
    //排他
    //干掉所有人 让所有的按钮灭掉 也就是 干掉类名
    for (var i = 0; i < olLis.length; i++) {
        olLis[i].className = "";
    }
    //留下当前的 也就是square这个索引所对应的
    olLis[square].className = "current";
};
var timer=null;
//5.添加自动滚动
timer=setInterval(playNext, 3000);//每个一秒钟播放下一张
function playNext() {
    right.onclick();
}
box.onmouseover=function(){
    clearInterval(timer);
    arr.style.display = "block";
};
box.onmouseout=function(){
    timer=setInterval(playNext, 3000);
    arr.style.display = "none";
};

//苑永建JS TOP栏
$(function(){
    //tab栏滑动
    $(".yyjcontl .tabpart .tabs .tali").mouseenter(function(){
        $(this).addClass('current').siblings().removeClass('current');
        console.log($(this).index());
        $(".yyjcontl .listpart .listbox .newlist").eq($(this).index()).show(700).siblings().hide();
    });

    $(".yyjcontc .tabpart .tabs .tali").mouseenter(function(){
        $(this).addClass('current').siblings().removeClass('current');
        console.log($(this).index());
        $(".yyjcontc .listpart .listbox .newlist").eq($(this).index()).show(700).siblings().hide();
    });
});
