// 轮播图特效 
//思路：共有5张图片，依次用周期性定时器每隔2s进行展示。
function init(){
    setInterval("changeImg()",2000);
}
var i=1;
function changeImg(){
    i++;
    $('#lunbotu').attr('src','./images/flow/'+i+'.jpg');
    if(i==5){
        i=0;
    }
}

//闪动菜单特效
//思路：用周期性定时器每隔200ms进行样式切换。
setInterval(changeClass,200);
function changeClass(){
if($('#board').hasClass('active')){
    $('#board').removeClass('active');
}else{
    $('#board').addClass('active');
    }
}

//弹框特效
//思路：点击弹窗按钮触发事件，修改id属性值为showCont，调用提前写好的样式，来进行样式切换，,随后该id执行对应动画。
$('#board').click(function(){
    $('.popUp').attr('id','showCont');
});
//思路：点击关闭按钮触发事件，修改id属性值为hiddenCont，调用提前写好的样式，来进行样式切换，随后该id执行对应动画 。
$('#closeBtn').click(function(){   
    $('.popUp').attr('id','hiddenCont');
});

//推拉门特效
//思路：单击id为select2我的菜单，通过toggle()给id为select1的div实现隐藏显示，执行时间为300ms。
//如果id为select1的div隐藏，则改变id为select2div的内容为本店菜单。
//如果id为select1的div显示，则改变id为select2div的内容为我的菜单。
$('#select2').click(
    function(){
        $('#select1').toggle(300,function(){
            if($('#select1').is(':hidden')){
                $('#select2').html("&gt;本店菜单&gt;");
            }else{
                $('#select2').html("&lt;我的菜单&lt;");
            }
        });
    }
);

// 标签切换模块
var as=document.querySelectorAll("#tab a");
//console.log(as);
//遍历
for(var z=0;z<as.length;z++){
//绑定事件处理函
as[z].onclick=function(){
//隐藏其他的div
        for(var n=0;n<as.length;n++){
            as[n].style.background='';
        }
        this.style.background='rgb(230, 126, 152)';
        var divs=document.querySelectorAll("#content>div");
        for(var z=0;z<divs.length;z++){
        divs[z].style.display="none";
        }
        //让对应的div显示
        //获取当前a的href
        var z=this.href.lastIndexOf("#");
        var id=this.href.slice(z);
        //console.log(id);
        document.querySelector(id).style.display="block";
    }
}
// 鼠标悬浮部分
//思路：当鼠标悬浮时获取图片当前下标，.cont1（菜名）向上收起，.cont2（单价）显示（.cont img的在.cont img集合中下标和.cont 的.cont 集合中下标相等。）
$('.cont>img').mouseover(function(){
    bindex=$('.cont>img').index(this);
    $('.cont1').eq(bindex).slideUp();
});
//思路：当鼠标移开时获取图片时，.cont1（菜名）向下展开，.cont2（单价）向下收起。如果.cont1（菜名）向上收起时，鼠标移出图片，则.cont1（菜名)直接向下展开.
$('.cont>img').mouseout(function(){
    $('.cont1').eq(bindex).stop();
    $('.cont1').eq(bindex).slideDown();
});
// 点餐模块
//主要思路：根据当前下标判断点击的是哪个cont.根据cont下cont1的value值来判断是否已经点餐。
//详细思路：点击选中的菜，获取单击的.cont 的.cont 集合中下标。如果单击的.cont1的value在#select3的.database下data1的长度为0，
//则克隆#select3 #data的最后一个database，并将克隆的添加到#data,然后修改克隆的database下的data1,data2,data3,data4,data5的内容分别为cont1的内容（菜名）,cont2（价格），数量（初始值为1）,小计（初始值为单价）,取消订单以及把.cont1的value复制给data1。
//并将克隆的的内容添加到chuncun（以便再次单击时取消点餐时获取原来的菜名和价格更改.cont1,.cont2的内容）。单击后改变.cont1和.cont2的内容分别为已选择，点图取消选择，并调用总计模块，计算器价格。 
//如果单击的.cont1的value在#select3的.database下data1的长度为不为零则删除#data中的和点击的cont1的相同value的.database。（即取消点餐）
//并更改选中的.cont1，.cont2的内容为菜单名和价格删除#chucun里相应的的菜名和价格
$('.cont').click(function(){
    cindex=$('.cont').index(this);
    // console.log($('.cont img').eq(cindex));
    if($('.database .data1[value='+$('.cont .cont1').eq(cindex).attr('value')+']').length==0){
        var $new_dish=$('.database:last').clone(); 
        $('#data').append($new_dish);
        $('.database:last .data1').html($('.cont .cont1').eq(cindex).html());
        $('.database:last .data1').attr("value",$('.cont .cont1').eq(cindex).attr('value'));
        // console.log($('.cont .cont1').eq(cindex).attr('value'));
        $('.database:last .data2').html($('.cont .cont2').eq(cindex).html());
        $('.database:last .data3').html('<button onclick="butred(this)">-</button><span>1</span><button onclick="butadd(this)">+</button>');
        $('.database:last .data4').html($('.cont .cont2').eq(cindex).html());
        $('.database:last .data5').html('<button onclick="button(this)">取消</button>');
        // $('.database:last .data5 button').val($('.cont .cont1').eq(cindex).attr('value'));
        $('#chucun').append($('.database:last .data1').clone());
        $('#chucun').append($('.database:last .data2').clone());
        $('.cont1').eq(cindex).html('已选择');
        $('.cont2').eq(cindex).html('点图取消选择');
        summ();
        // console.log($('.database:last .data5 button').val());   
    }else{
        $('.database .data1[value='+$('.cont .cont1').eq(cindex).attr('value')+']').parent().remove();
        $('.cont1').eq(cindex).html($('#chucun .data1[value='+$('.cont1').eq(cindex).attr('value')+']').html());
        $('.cont2').eq(cindex).html($('#chucun .data1[value='+$('.cont1').eq(cindex).attr('value')+']').next().html());
        $('#chucun .data1[value='+$('.cont1').eq(cindex).attr('value')+']').next().remove();
        $('#chucun .data1[value='+$('.cont1').eq(cindex).attr('value')+']').remove();
    }
});
//减少数量
//主要思路：
// 用onclick="butred(this)"获取被点击的减号按钮，并获取他的下一个它的兄弟元素的数值，并将其转成整数，如果数字大于1才可以减。并用计算后数字的覆盖给原来数字。
//并调用小计模块计算小计，最后调用总计算模块将其小计汇总
function butred(m){
    //console.log($(m).parent().prev().prev().attr('value'));
    var a1=parseInt($(m).next().html());
    if(a1>=1){
        a1--;
        $(m).next().html(a1);
    }
    sub(m,a1);
};
// 增加数量模块
// 主要思路：用onclick="butadd(this)"获取被点击的加号按钮，并获取他的上一个兄弟元素的数值，并将其转成整数，如果数字大于0才可以加（这个条件可无），并用计算后数字的覆盖给原来数字。
//并调用小计模块计算小计，最后调用总计算模块将其小计汇总
function butadd(n){
    //console.log($(n).parent().prev().prev().attr('value'));
    var a2=parseInt($(n).prev().html());
    if(a2>=0){
        a2++;
        $(n).prev().html(a2);
    }
    sub(n,a2);
};
//删除模块
//用onclick="button(this)"获取被点击的取消按钮，并获取它的父元素的父元素并将其（当前的.database）删除。
//并将与当前.database下.data1的value相同的.cont下cont1的内容用#chucun内的相应菜名和价格赋值，然后将#chucun的相应内容删除。
//最后调用总计算模块将其小计汇总。
function button(h){
    $(h).parent().parent().remove();
    $('.cont1[value='+$(h).parent().prev().prev().prev().prev().attr('value')+']').html($('#chucun .data1[value='+$(h).parent().prev().prev().prev().prev().attr('value')+']').html());
    $('.cont1[value='+$(h).parent().prev().prev().prev().prev().attr('value')+']').next().html($('#chucun .data1[value='+$(h).parent().prev().prev().prev().prev().attr('value')+']').next().html());
    $('#chucun .data1[value='+$(h).parent().prev().prev().prev().prev().attr('value')+']').next().remove();
    $('#chucun .data1[value='+$(h).parent().prev().prev().prev().prev().attr('value')+']').remove();
    summ();
}
//小计模块
//获取单价从下标1开始截取，并将其转成浮点类型，将数量和单价相乘得到小计，并将小计保留两位小数。
function sub(x,y){
    //console.log($(n).parent().prev().prev().attr('value'));
    var price=$(x).parent().prev().html();
    price=parseFloat(price.substring(1));
    var subTotal=(price*y).toFixed(2);
    $(x).parent().next().html("￥"+subTotal);
    summ();
};
// 总计模块
//思路：声明两个变量个g,summ初始值均为0，遍历#data下的所有的.data4，利用g跳过第一次遍历，由于#data下第一个database没有数量值和单价值
//所有用if(g>0)来跳过,将获取到的小计从下标开始截取，并以此累加，最后赋值给总计，保留两位小数。
function summ(){
    var g=0;
    var summ=0;
    $('#data .data4').each(function(){
         if(g>0){
            summ+=parseFloat($(this).html().substring(1));
         }
         g++;
    });
    $('#all2').html("￥"+summ.toFixed(2));
}

