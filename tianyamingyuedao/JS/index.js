/**
 * Created by l on 2016/10/4.
 */
//�ֲ�ͼ
//������
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


//1.��������li�е�ÿһ��
for(var i=0;i<olLis.length;i++){
    olLis[i].index=i;
    olLis[i].onmouseover=function(){
        var target=-this.index*imgWidth;
        move(ul,target,25);
        pic=square=this.index;
    }
}


//1.2��̬�������һ�ż�ͼƬͼƬ
//���ݵ�һ�����ͼƬȥ���ɼٵ�
//��¡��һ��
var firstImg=ulLis[0].cloneNode(true);
ul.appendChild(firstImg);

var pic=0;
var square=0;
//  ����Ҽ�ͷ�� �ƶ�ul��ָ����λ��
right.onclick=function(){
    //һ�������жϵ��ƶ������һ��ͼƬʱӦ������ȥ
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
    //����
    //�ɵ������� �����еİ�ť��� Ҳ���� �ɵ�����
    for (var i = 0; i < olLis.length; i++) {
        olLis[i].className = "";
    }
    //���µ�ǰ�� Ҳ����square�����������Ӧ��
    olLis[square].className = "current";

};

//������ͷ �ƶ�ul����Ӧλ��
left.onclick = function () {
    //һ�������ж� ��ǰ��ʾ��ͼƬ�������ǲ��ǵ�һ��ͼƬ������
    if (pic === 0) {//����� ��һ�� ����˲��������� ���һ��ù�
        ul.style.left = -(ulLis.length - 1) * imgWidth + "px";//˲������ȥ
        pic = ulLis.length - 1;//�Ѽ�¼��ǰ��ʾ��ͼƬ������ ��Ϊ����ͼƬ������
    }
    pic--;//�����������Ҫ��ʾ��ͼ������
    //Ŀ�� target �� pic�й� �� ͼƬ����й� �����Ǹ���
    var target = -pic * imgWidth;
    move(ul, target,25);

    if (square > 0) {
        square--;
    } else {
        square = olLis.length - 1;
    }
    //����
    //�ɵ������� �����еİ�ť��� Ҳ���� �ɵ�����
    for (var i = 0; i < olLis.length; i++) {
        olLis[i].className = "";
    }
    //���µ�ǰ�� Ҳ����square�����������Ӧ��
    olLis[square].className = "current";
};
var timer=null;
//5.����Զ�����
timer=setInterval(playNext, 3000);//ÿ��һ���Ӳ�����һ��
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

//Է����JS TOP��
$(function(){
    //tab������
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
