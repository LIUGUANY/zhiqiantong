$(function(){
	/*课程列表*/
	$('.course-infor-box li:nth-of-type(4n)').css('margin-right',"0");
			$('.course-infor-box li a').css('color',"#0d0d0d");
			$('.course-infor-box li a').bind('mouseover',function(){
				$(this).css('color','#6bc513');
			}).bind('mouseout',function(){
				$(this).css('color','#0d0d0d');
	});
	/*评论点击效果*/
	$(".course-introduce .icon-radio").each(function(){
		$(this).on('click',function(){
			$(".course-introduce .icon-radio").removeClass("checked");
			$(this).addClass('checked');
		})
	})
	/*右侧图片去右侧margin*/
	$('.buy-student img:nth-of-type(4n)').css('margin-right',"0");
	/*study-button效果*/
	$(".edit .study").on('click',function(){
		$(this).text('继续学习').removeClass('study').addClass('study-click');
	})
	
	/*课程详情tabs样式*/
	$(".course-info-bom-left .tabs li").each(function(){
		var $index = $(this).index();
		$(this).hover(function(){
			$(this).css('color','#6BC513');
		},function(){
			$(this).css('color','')
		})
		$(this).on('click',function(){
			$(this).addClass('current').siblings().removeClass("current");
			$(".course-info-bom-left .publicClass").hide();
			$(".course-info-bom-left .publicClass:eq("+$index+")").show();
		})
	})
	/*课程目录*/
	$('.course-catalog .chapter h3').each(function(){
		$(this).on('click',function(){
			if($(this).children().hasClass('icon-plus')){
				$(this).next().hide();
				$(this).children().removeClass('icon-plus').addClass('icon-minus');
				
			}else{
				$(this).next().show();
				$(this).children().removeClass('icon-minus').addClass('icon-plus');
			}
		})
	})
	$('.course-catalog .c-m-s-box').each(function(){
		$(this).on('click',function(){
			if($(this).find('b').hasClass('list-hide')){
				$(this).next().hide();
				$(this).find('b').removeClass('list-hide').addClass('a-l-icon5');				
			}else{
				$(this).next().show();
				$(this).find('b').removeClass('a-l-icon5').addClass('list-hide');

			}
		})
	})
	
})
