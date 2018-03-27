$(function(){
/*左侧导航*/
	$(".u-c-nav li").each(function(){
		$(this).bind("click",function(e){
			var $index = $(this).index()+2;
			$(this).addClass('current').siblings().removeClass('current');
			e.preventDefault();
			$(".u-c-box :eq("+$index+")").show().siblings().hide();
		})
	})
	/*ucenter切换*/
	function tab(a,b){
		$(a).each(function(){
			$(this).bind('click',function(e){
				var $index = $(this).index();
				e.preventDefault();
				$(this).addClass("current").siblings().removeClass("current");
				$(b+":eq("+$index+")").show().siblings().hide();
			})
		})
	}
/*我的课程*/
	tab('.xf-u-c-right .course-title li',".course-box .course");
/*我的求职*/
	tab(".resume-title li",".resume-box .resume");
/*我的关注*/
	tab(".attention-title li",".company-box .company-list")
	/*我的订单*/
	tab('#study .xf-u-c-title li',".order-box .u-cou-learn-box")
//	$(".u-cou-learn-box .comm-tips-1 table thead tr th:gt(0)").css("border-top",'0');
/*我的设置*/
	/*tab('.user-infor li','.seting-box .u-cou-learn-box');*/
	/*我的设置*/
	$('.user-infor li').each(function(){
			$(this).bind('click',function(e){
				var $index = $(this).index();
				e.preventDefault();
				$(this).addClass("current").siblings().removeClass("current");
				$('.seting-box .u-cou-learn-box:eq('+$index+')').show().siblings().hide();
			})
		})
/*我的求职*/
/*鼠标滑过*/
	$('.show-box').css({'float':'right','display':'none',"margin-right":"0"});
	$('.resume-box .base-box').each(function(){
		$(this).on("mouseover",function(){
			$(this).find(".show-box").show();
		})
		$(this).on("mouseout",function(){
			$(this).find(".show-box").hide();
		})
	})
	
	/*修改*/
	/*单独修改*/
	$('.show-box .amend').each(function(){
		$(this).on('click',function(){
			var $edit = $(this).parents('.base-box-1').next().html();
			$(this).parents('.base-box-2').html($edit);
		})
	})
//	$('.amend').each(function(){
//		$(this).on('click',function(){
//			$(this).parent().parent().hide().next().show();
//		})
//	})
	/*投递简历弹出框*/
	$('.pop-up-box').css('display','none');
	$('.appr-box').css('cursor','pointer');
	$('.appr-box').each(function(){
		$(this).on('click',function(){
			if($(this).hasClass('one')){
				$(this).siblings('.pop-up-box').fadeOut();
				$(this).removeClass('one');
			}else{
				$(this).siblings('.pop-up-box').fadeIn();
				$(this).addClass('one');
			}
		})
	})
	/*查阅简历*/
	$('.user-infor').slice(1).css('display','none');
	$('.look-btn').on('click',function(){
		$('.user-infor').slice(1).css('display','block');
	})
})