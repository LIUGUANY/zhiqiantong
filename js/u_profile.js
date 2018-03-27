//解绑提示
function exclideBungingConfirm(profileType,id){
	dialog('解除绑定',profileType,19,'javascript:exclideBunging('+id+')');
	$("#bundingName").html('用户名:'+$("#unameheader").html());
}
//解绑
function exclideBunging(id){
	var pwd=$("#excludeBundingPwd").val();
	if(isNotEmpty(pwd)){
		//验证密码是否正确  正确将进行解绑操作
		$.ajax({
			url:baselocation+"/uc/ajax/excludeBunging",
			data:{"id":id,"pwd":pwd},
			type:"post",
			dataType:"json",
			cache : false,
			async:false,
			success:function(result){
				//关闭上次弹窗
				$(".dialog-shadow").remove();
				if(result.success){
					dialog('解绑提示',result.message,6,'javascript:window.location.reload()');
				}else{
					dialog('解绑提示',result.message,1);
				}
			}
		});
	}
}
//联合登录,重新打开窗口
function oauthLogin(appType){
	window.location.href=baselocation+"/app/authlogin?appType="+appType;
}