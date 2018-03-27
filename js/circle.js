window.onload = function(){
    var canvas = document.getElementById('circle'),  //获取canvas元素
        context = canvas.getContext('2d'),  //获取画图环境，指明为2d
        centerX = canvas.width/2,   //Canvas中心点x轴坐标
        centerY = canvas.height/2,  //Canvas中心点 y轴坐标
        rad = Math.PI*2/100, //将360度分成100份，每一份rad度
        speed = 0.1; //加载速度
    //绘制进度条
    function blueCircle(n){
        context.save();//save和restore可以保证样式属性只运用于该段canvas元素
        context.strokeStyle = "#00aced"; //设置描边样式
        context.lineWidth = 5; //设置线宽
        context.beginPath(); //路径开始
        context.arc(centerX, centerY, 45 , -Math.PI/2, -Math.PI/2 +n*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke(); //绘制
        context.closePath(); //路径结束
        context.restore();
    }
    //绘制内部圆
    function grayCircle(){
            context.save();//保存当前设置
            context.strokeStyle = "#dcdcdc";//设置内部圆边框样式
            context.lineWidth=5;//设置线宽
            context.beginPath();//路径开始
            context.arc(centerX,centerY,45,0,2*Math.PI,false);
            context.stroke();//内部圆绘制
            context.closePath();//路径结束
            context.restore();
    }
    //绘制内部文字
    function beginText(){
        context.font = "14px Arial"; //设置字体大小和字体
        context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
        context.strokeStyle = "#00aced"; //设置描边样式
        context.strokeText('立即体检', centerX-25, centerY+5);
        context.stroke(); //执行绘制
        context.restore();
    }
    function Text(){
        context.font = "14px Arial"; //设置字体大小和字体
        context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
        context.strokeStyle = "#dcdcdc"; //设置描边样式
        context.strokeText('正在体检', centerX-25, centerY+5);
        context.stroke(); //执行绘制
        context.restore();
    }
    function endText(value){
        context.font = "14px Arial"; //设置字体大小和字体
       context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
        context.strokeStyle = "#dcdcdc"; //设置描边样式
        context.strokeText(value.toFixed(0)+"%", centerX-10, centerY+5);
        context.stroke(); //执行绘制
        context.restore();
    }
    //默认样式
    function drawBegin(){
        grayCircle();
        beginText(100);
        blueCircle(100);
    }
    //动画循环
   function drawFrame(){
        window.requestAnimationFrame(drawFrame,circle);
        context.clearRect(0,0,canvas.width,canvas.height);
        grayCircle();
        Text();
        blueCircle(speed);
        if(speed>100){speed=0;}
        speed+=1;
    }
    /*固定数据*/
   function drawEnd(){
       grayCircle();
       endText(50);
       blueCircle(50);
   }
   drawBegin();
    /*drawFrame();*/
  /*  drawEnd();*/
  $(function(){
      $('#circle').on('click',function(){
          drawFrame();
      })
  })
}