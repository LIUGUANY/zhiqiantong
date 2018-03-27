function oSlider() {
	var Wind = {};
	Wind.Focus = {
		init:function (args){
			this.id = $(args.id);
			this.aBtn = $(args.aBtn);
			this.prev = $(args.prev);
			this.next = $(args.next);
			this.li = $(args.li);
			this.ms = args.ms;
			this.auto = args.auto?args.auto:false;
			this.on = args.on;
			this.nextTarget = 0;
			this.autoTimer = null;
			this.start();
		},
		start:function (){
				var _this = this;
				var color = this.li.eq(0).find("a").attr("name");
				this.id.siblings(".slideColorBg").show().css("background-color", color);
				this.aBtn.each(function(){
					var index = _this.aBtn.index(this);
					$(this).hover(function(){
						_this.showSlides(index);
					});
				});
				this.autoTimer = setInterval(function(){
					_this.autoPlay();	
				},_this.ms);
				this.id.hover(function(){
					clearInterval(_this.autoTimer);
					_this.prev.show();
					_this.next.show();
				},function(){
					_this.autoTimer = setInterval(function(){
						_this.autoPlay();	
					},_this.ms);
					_this.prev.show();
					_this.next.show();
				});
				this.prev.click(function() {
					_this.nextTarget--;
					if(_this.nextTarget < 0) {
						_this.nextTarget = _this.li.length - 1;
					}
					_this.showSlides(_this.nextTarget);
				})
				this.next.click(function() {
					_this.nextTarget++;
					if(_this.nextTarget > _this.li.length - 1){
						_this.nextTarget = 0;
					}
					_this.showSlides(_this.nextTarget);
				});
				
		},
		showSlides:function (index){
			this.nextTarget = index;
			var color = this.li.eq(index).find("a").attr("name");
			var _thisId = this.id;
			this.aBtn.eq(index).addClass(this.on).siblings().removeClass(this.on);
			this.li.eq(index).fadeIn(800).siblings().hide();
			_thisId.siblings(".slideColorBg").fadeIn("800", function(){$(this).css("background-color", color)});
		},
		autoPlay:function (){
			this.nextTarget++;
			if(this.nextTarget > this.li.length - 1){
				this.nextTarget = 0;
			}	
			this.showSlides(this.nextTarget);
		}	
	}

	Wind.Focus.init({
		//幻灯片id
		id: "#oSlideFun",
		//按钮
		aBtn: "#oSbtn a",
		//左右
		prev: ".prev_btn1",
		next: ".next_btn1",
		//大图li
		li: "#oSlideFun li",
		//按钮鼠标放上时
		on: "on",
		//自动播放的时间
		ms: 5000,
		//是否自动播放
		auto: true
	});
}

$(function(){
	oSlider();
})