$(function(){
	//默认显示五条
	$(".appr-discuss-item .test-answer").each(function(){
			$(this).siblings().slice(5).css('display',"none");
			$(this).last().next().show();
	})
	//点击更多显示10条
	$('.appr-discuss-item .more-appr .click').each(function(){
		$(this).on('click',function(){
			$('.reply-bg .test-answer').each(function(){
				if($(this).index()>=4){
					$(this).siblings().slice(0,9).show();
				};
			})
		})
	})
	//显示回复框
	$('.appr-discuss-item .click-appr').on('click',function(){
		$(this).parent().next().fadeIn();
	})
	//点击回复，跳转到回复框
	$('.reply-bg .appr-discuss-icon1').each(function(){
		$(this).on('click',function(){
			var $answerUser = $(this).parent().siblings().find('.answer-user').text();
			var $more = $(this).parents().find('.more-appr').offset();
			$('html,body').animate({ scrollTop:$more.top},1000);
			$(this).parent().parent().siblings().find('.pub-editor-wrap').children().text('回复@'+$answerUser);
			$(this).parent().parent().siblings().find('.pub-editor-wrap').children().focus();
			$(this).parents().find('.more-appr').siblings().fadeIn();
		})
	})
	$('.comment .appr-discuss-icon1').each(function(){
		$(this).on('click',function(){
			var $reply = $(this).parent().parent().siblings().find('.userName').text();
			var $text = $('.issques .pub-editor-wrap').offset();
			$('html,body').animate({scrollTop:$text.top},1000);
			$('.issques .pub-editor-wrap textarea').text("回复@"+$reply+":").focus();
		})
	})
	/*回复*/
	$('.reply-bg .withdraw').on('click',function(){
		if($(this).text()=='收起回复'){
			$(this).siblings().hide();
			console.log($(this).parent().innerHeight());
			$(this).css({"background":'#fff'}).parent().css({"background":'#fff'});
			$(this).text('回复');
		}else{
			$(this).siblings().show();
			console.log($(this).parent().innerHeight());
			
			$(this).text('收起回复');
			$(this).css({"background":'#f7f7f7'}).parent().css({"background":'#f7f7f7'});
			$(this).siblings().slice(5).css('display',"none");
			$(this).siblings().last().show();
//			$(this).parent().last().firstChild().show();
		}
	})
})