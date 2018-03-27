$(function(){
	/*简历列表*/
	$('.resume-list li:nth-of-type(3n)').css('margin-right','0');
	/*证明文件*/
	$('.prove-icon img').each(function(){
		var $index = $(this).index()+1;
		$(this).on('click',function(){
			$(this).parent().next().children('img').attr('src','images/appr/appr-icon-'+$index+'.jpg')
			$(this).parent().next().show();
			$(this).parent().next().children('span').on("click",function(){
				$(this).parent().hide();
			})
		})
		
	})
	
	
})
