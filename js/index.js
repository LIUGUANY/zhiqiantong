$(function(){
	/*左侧导航*/
	$('.appraisal-list li').each(function(){
		$(this).bind('mouseover',function(){
			$('.appraisal-list li').removeClass('current');
			$(this).addClass('current');
		});
	})
	/*个人中心*/
	$('.user-icon').on('mouseover',function(){
		$('.user-icon .sets').show();
	})
	$('.user-icon').on('mouseout',function(){
		$('.user-icon .sets').hide();
	})
	/*职位*/
	$(".practice-box li:nth-of-type(4n)").css('margin-right','0');
	/*职位*/
	$(".course-box li:nth-of-type(4n)").css('margin-right','0');
	/*测评*/
	$('.quiz-list li:nth-of-type(4n)').css('margin-right','0');
	/*高校*/
	$('.college li:nth-of-type(5n)').css('margin-right','0');
	/*测评*/
	$('.img-box').slice(1).hide();
	$('.quiz-list li').each(function(){
		$(this).hover(function(){
			var $index = $(this).index();
			$('.quiz-list li').find('.circle').removeClass('current');
			$(this).find('.circle').addClass('current');
			$('.img-box').eq($index).show().siblings().hide();
		},function(){
			$(this).find('.circle').removeClass('current');
		})
	})
	/*footer*/
	/*右侧导航*/
		$('.nav li').each(function(){
			$(this).hover(function(){
				$(this).css('background-color',"#fff");
				$(this).find('i').addClass('current');
			},function(){
				$(this).css('background-color',"#f2f2f2");
				$(this).find('i').removeClass('current');
			})
		})
		$('.appBox').hover(function(){
			$(this).find('.pa').fadeIn();
		},function(){
			$(this).find('.pa').fadeOut();
		})
		$(window).scroll(function(){
			var scrollTop = $(window).scrollTop();
			if(scrollTop>300){
				$(".toTop").stop().animate({'opacity':'1'},500);
				$('.toTop').parent().show();
			}else{
				$(".toTop").stop().animate({'opacity':0},500);
				$('.toTop').parent().hide();
			}
		})
		/*锚链接效果*/
		$('.toTop').click(function(){
			var hr = $(this).attr("href");
			var anh = $(hr).offset().top-60;
			$("html,body").stop().animate({scrollTop:anh},800);
			return false;
		})
		/*底部icon切换*/
		$('.right-list dl').each(function(){
			$(this).hover(function(){
				$(this).find('.f-f6').addClass('current');
				$(this).siblings().find('.f-f6').removeClass('current');
				if($(this).find('.current-ewm')){
					$(this).find('.current-ewm').fadeIn();
				}
			},function(){
				$(this).find('.f-f6').removeClass('current');
				if($(this).find('.current-ewm')){
					$(this).find('.current-ewm').fadeOut();
				}
			})
		})
})
