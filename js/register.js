$(function() {
	//initValidate();
}); 
var isEmailVali=false;//定义全局唯一验证通过
var isMobileVali=false;//定义全局唯一验证通过
/**
 * 单独验证email
 */
function emailCheck(){
	var emailVal=$("#regEmail").val();
	if(!isNotEmpty(emailVal)){//验证邮箱是否为空
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入邮箱');
		$(".errorDiv").show();
		return;
	}
	var reg=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_])+(\.[a-zA-Z0-9_])+/; //验证邮箱正则
	if(reg.test(emailVal)==false){//格式不正确
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入正确的邮箱');
		$(".errorDiv").show();
		return;
	};
	//验证邮箱是否存在
	$.ajax({
		url: baselocation +"/checkEmail",
		type:"post",
		data:{"userForm.email":emailVal},
		dataType: "json",
		async:false,
		success:function(result){
			if(result==false){
				$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>邮箱已使用');
				$(".errorDiv").show();
				isEmailVali=false;
			}else{
				$(".emailError").html('<tt class="o-pass"><em class="icon18 vam disIb"></em></tt>');
				isEmailVali=true;
			};
		}
	});
}
/**
 * 单独验证密码
 * @param id
 * @returns {boolean}
 */
function passCheck(id){
	var passVal=$("#"+id).val();
	
	var pattern =/^(?!_)(?!_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
	if(pattern.test(passVal)==false){
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入正确的密码');
		$(".errorDiv").show();
		return false;
	}
	if(passVal.indexOf(" ")!=-1){
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>密码不能包含空格');
		$(".errorDiv").show();
		return false;
	}
	if(isNotEmpty(passVal)==false){//验证邮箱是否为空
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入密码');
		$(".errorDiv").show();
		return false;
	}else if(passVal.length<6){
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>密码不能少于六位');
		$(".errorDiv").show();
		return false;
	}else if(passVal.length>20){
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>密码不能多于二十位');
		$(".errorDiv").show();
		return false;
	}

	$("#"+id+"Error").html('<tt class="o-pass"><em class="icon18 vam disIb"></em></tt>');
	return true;
}
/**
 * 单独验证重复密码
 * @param id
 * @param pwdId
 * @returns {boolean}
 */
function passConfirmCheck(id,pwdId){
	var passConfirmVal=$("#"+id).val();
	var passVal=$("#"+pwdId).val();
	if(isNotEmpty(passConfirmVal)==false){//验证邮箱是否为空
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入重复密码');
		$(".errorDiv").show();
		return false;
	}
	if(passConfirmVal!=passVal){
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>两次密码输入不一致');
		$(".errorDiv").show();
		return false;
	}
	$("#"+id+"Error").html('<tt class="o-pass"><em class="icon18 vam disIb"></em></tt>');
	return true;
}
/**
 * 单独验证mobile
 */
function mobileCheck(){
	var mobileVal=$("#regMobile").val();
	if(isNotEmpty(mobileVal)==false){//验证手机是否为空
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入手机号');
		$(".errorDiv").show();
		return;
	}
	var reg=/^(13[0-9]|15[012356789]|18[012356789]|14[57]|17[012356789])[0-9]{8}$/; //验证手机正则
	if(reg.test(mobileVal)==false){//格式不正确
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入正确的手机号');
		$(".errorDiv").show();
		return;
	};
	//验证手机是否存在
	$.ajax({
		url: baselocation +"/checkRegMoblie",
		type:"post",
		data:{"mobile":mobileVal},
		dataType: "json",
		async:false,
		success:function(result){
			if(!result){
				$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>该手机已使用');
				$(".errorDiv").show();
				isMobileVali=false;
			}else{
				$("#regMobileError").html('<tt class="o-pass"><em class="icon18 vam disIb"></em></tt>');
				isMobileVali=true;
			};
		}
	});
}
/**
 * 错误提示位置
 * @param id
 */
function gohsData(){
	$(".errorMsg").html('');
	$(".errorDiv").hide();
}

/**
 * 邮箱手机号码注册菜单切换
 * @param menu
 * @param obj
 */
function toggleMenu(menu,obj){
	if($(obj).parent().hasClass("current")){
		return;
	}
	$(".errorMsg").html('');
	$(".errorDiv").hide();
	$(".register").addClass("undis");
	$("."+menu).removeClass("undis");
	$(obj).parent().siblings().removeClass("current");
	$(obj).parent().addClass("current");
}
/**
 * /邮箱验证码发送
 * @returns {boolean}
 */
function sendEmail(){
	var regEmail = $("#regEmail").val();
	if(regEmail==null || $.trim(regEmail)==''){
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入邮箱');
		$(".errorDiv").show();
		return false;
	}
	if(isEmailVali==true){
		$.ajax({
			url:baselocation+'/sendEmailCode',
			type:'post',
			dataType:'json',
			data:{'regEmail':regEmail},
			async:false,
			success:function(result){
				if(result.success==true){
					dialog('提示',result.message,4);
					$(".email-send-but").removeAttr("onclick");
					index=60;
					emailinter = setInterval("remainTime()",1000);
				}else{
					$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>'+result.message);
					$(".errorDiv").show();
				}
			}
		});
	}
}
/**
 * 邮件验证码倒计时
 */
function remainTime(){
	index--;
	$(".email-send-but").html('重新获取('+index+')');
	if(index<=0){
		$(".email-send-but").html('点击获取验证码');
		$(".email-send-but").attr("onclick","sendEmail()");
		clearInterval(emailinter);
		index=60;
	}
}
/**
 * 邮箱注册
 * @returns {boolean}
 */
function emailregister() {
	var emailVal=$("#regEmail").val();
	if(isNotEmpty(emailVal)==false){//验证邮箱是否为空
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入邮箱');
		$(".errorDiv").show();
		return;
	}
	var reg=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_])+(.[a-zA-Z0-9_])+/; //验证邮箱正则
	if(reg.test(emailVal)==false){//格式不正确
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入正确的邮箱');
		$(".errorDiv").show();
		return;
	};
	if(isNotEmpty($("#randomcode").val())==false){//验证 验证码是否为空
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入验证码');
		$(".errorDiv").show();
		return;
	}
	if(isNotEmpty($("#regPwd").val())==false){//验证密码是否为空
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入密码');
		$(".errorDiv").show();
		return;
	}
	if($("#regPwd").val().length<6){//验证密码长度
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>密码长度不能小于六位');
		$(".errorDiv").show();
		return;
	}
	if($("#regPwd").val().length>20){//验证密码长度
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>密码长度不能多于二十位');
		$(".errorDiv").show();
		return;
	}
	if(($("#regPwd").val()).indexOf(" ")!=-1){
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>密码不能包含空格');
		$(".errorDiv").show();
		return false;
	}
	if(isNotEmpty($("#cusPwdConfirm").val())==false){//验证确认密码是否为空
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入确认密码');
		$(".errorDiv").show();
		return;
	}
	if($("#cusPwdConfirm").val()!=$("#regPwd").val()){//验证确认密码是否相同
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>两次密码输入不一致');
		$(".errorDiv").show();
		return;
	}


	$.ajax({
		url : baselocation + "/doemailregister",
		data : {"userForm.email":$("#regEmail").val(),"userForm.password":$("#regPwd").val(),
			"userForm.confirmPassword":$("#cusPwdConfirm").val(),"randomCode":$("#randomcode").val()
		},
		type : "post",
		dataType : "json",
		cache : false,
		async : false,
		success : function(result) {
			if(result.success==true) {
				var forwordURL=getCookie("forward");
				if (typeof(forwordURL) != "undefined" && forwordURL) {
					DeleteCookie("forward");
					window.location.href = forwordURL.replaceAll('"','');
					return;
				}
				window.location.href = baselocation + "/uc/home";
			}else if(result.message == 'formDataIsNot'){
				dialog('注册提示','表单数据不为能为空',1);
			}else if(result.message == 'emailIsNot'){
				$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入邮箱');
				$(".errorDiv").show();
			}else if(result.message == 'emailFormatError'){
				$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入正确的邮箱');
				$(".errorDiv").show();
			}else if(result.message == 'pwdIsNull'){
				$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入密码');
				$(".errorDiv").show();
			}else if(result.message == 'pwdNotEqual'){
				$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>两次密码输入不一致');
				$(".errorDiv").show();
			}else if(result.message == "regEmailExist") {
				$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>该邮箱已使用');
				$(".errorDiv").show();
			}else if(result.message == "regDangerWord") {
				$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入正确的注册信息');
				$(".errorDiv").show();
			}else if(result.message == "邮箱验证码错误") {
				$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>邮箱验证码错误');
				$(".errorDiv").show();
			}else {
				dialog('注册提示',result.message,1);
			}
		},
		error : function(error) {
			$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>系统繁忙，请稍后再操作');
			$(".errorDiv").show();
		}
	});
}
/**
 * 发送短信之前的验证码
 */
function sendMobileCode(){
	var regMobile = $("#regMobile").val();
	if(regMobile==null || $.trim(regMobile)==''){
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入手机号');
		$(".errorDiv").show();
		return;
	}
	var reg=/^(13[0-9]|15[012356789]|18[012356789]|14[57]|17[012356789])[0-9]{8}$/; //验证手机正则
	if(!reg.test(regMobile)){//格式不正确
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入正确的手机号');
		$(".errorDiv").show();
		return;
	};
	var imgrandomCode = $("#imgrandomcode").val();
	if(imgrandomCode==null || $.trim(imgrandomCode)==''){
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入图形验证码');
		$(".errorDiv").show();
		return;
	}
	if(isMobileVali){
		sendMobile();
	}else{
		mobileCheck();
	}
}
/**
 * 手机注册发送短信
 * @returns {boolean}
 */
function sendMobile(){
	var randomCode = $("#imgrandomcode").val();
	var regMobile = $("#regMobile").val();
	if(regMobile==null || $.trim(regMobile)==''){
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入手机号');
		$(".errorDiv").show();
		return false;
	}
	var reg=/^(13[0-9]|15[012356789]|18[012356789]|14[57]|17[012356789])[0-9]{8}$/; //验证手机正则
	if(!reg.test(regMobile)){//格式不正确
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入正确的手机号');
		$(".errorDiv").show();
		return;
	};		
	if(isMobileVali){
		$.ajax({
			url:baselocation+'/sendMobileCode',
			type:'post',
			dataType:'json',
			data:{'mobile':regMobile,'code':randomCode},
			async:false,
			success:function(result){
				if(result.success){
					$(".moblie-but").removeAttr("onclick");
					mobileindex=60;
					mobileinter = setInterval("remainMobileTime()",1000);
					$("#mobileCodeMsg>span").html(result.message);
					$("#mobileCodeMsg").show();
				}else{
					$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>'+result.message);
					$(".errorDiv").show();
				}
				
			}
		});
	}
}
/**
 * 手机短信验证码倒计时
 */
function remainMobileTime(){
	mobileindex--;
	$(".moblie-but").html("重新获取("+mobileindex+')');
	if(mobileindex<=0){
		$(".moblie-but").html('点击获取验证码');
		$(".moblie-but").attr("onclick","sendMobileCode()");
		$("#randCode").click();
		clearInterval(mobileinter);
		mobileindex=60;
		$("#mobileCodeMsg").hide();
	}
}
/**
 * 手机号注册
 * @returns {boolean}
 */
function mobileregister() {
	var mobileVal=$("#regMobile").val();
	if(isNotEmpty(mobileVal)==false){//验证手机是否为空
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入手机号');
		$(".errorDiv").show();
		return;
	}
	var reg=/^(13[0-9]|15[012356789]|18[012356789]|14[57]|17[012356789])[0-9]{8}$/; //验证手机正则
	if(reg.test(mobileVal)==false){//格式不正确
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入正确的手机号');
		$(".errorDiv").show();
		return;
	};
	if(!isNotEmpty($("#imgrandomcode").val())){
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入图形验证码');
		$(".errorDiv").show();
		return;
	}
	if(!isNotEmpty($("#mobilerandomcode").val())){//验证 验证码是否为空
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入短信验证码');
		$(".errorDiv").show();
		return;
	}
	if(isNotEmpty($("#regMobilePwd").val())==false){//验证密码是否为空
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入密码');
		$(".errorDiv").show();
		return;
	}
	if($("#regMobilePwd").val().length<6){//验证密码长度
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>密码长度不能小于六位');
		$(".errorDiv").show();
		return;
	}
	if($("#regMobilePwd").val().length>20){//验证密码长度
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>密码长度不能多于二十位');
		$(".errorDiv").show();
		return;
	}
	if(($("#regMobilePwd").val()).indexOf(" ")!=-1){
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>密码不能包含空格');
		$(".errorDiv").show();
		return false;
	}
	if(isNotEmpty($("#cusMobilePwdConfirm").val())==false){//验证确认密码是否为空
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入确认密码');
		$(".errorDiv").show();
		return;
	}
	if($("#cusMobilePwdConfirm").val()!=$("#regMobilePwd").val()){//验证确认密码是否相同
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>两次密码输入不一致');
		$(".errorDiv").show();
		return;
	}
	$.ajax({
		url : baselocation + "/domobileregister",
		data : {"userForm.mobile":mobileVal,"userForm.password":$("#regMobilePwd").val(),
			"userForm.confirmPassword":$("#cusMobilePwdConfirm").val(),"randomCode":$("#mobilerandomcode").val()
		},
		type : "post",
		dataType : "json",
		cache : false,
		async : false,
		success : function(result) {
			if(result.success==true) {
				var forwordURL=getCookie("forward");
				if (typeof(forwordURL) != "undefined" && forwordURL) {
					DeleteCookie("forward");
					window.location.href = forwordURL.replaceAll('"','');
					return;
				}
				window.location.href = baselocation + "/uc/home";
			}else if(result.message == 'formDataIsNot'){
				dialog('注册提示','表单数据不为能为空',1);
			}else if(result.message == "regMobileFormError") {
				$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>手机号码格式不正确');
				$(".errorDiv").show();
			}else if(result.message == "regMobileExist") {
				$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>手机号码已经注册');
				$(".errorDiv").show();
			}else if(result.message == 'pwdIsNull'){
				$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入密码');
				$(".errorDiv").show();
			}else if(result.message == 'pwdNotEqual'){
				$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>两次密码输入不一致');
				$(".errorDiv").show();
			}else if(result.message == "regDangerWord") {
				$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>请输入正确的注册信息');
				$(".errorDiv").show();
			}else if(result.message == "验证码错误") {
				$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>短信验证码错误');
				$(".errorDiv").show();
			}else {
				$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>'+result.message);
				$(".errorDiv").show();
			}
		},
		error : function(error) {
			dialog('注册提示','系统繁忙，请稍后再操作',1);
		}
	});
}
function reAgreement(obj,id){
	if($(obj).prop("checked")){
		$(".errorMsg").html('');
		$(".errorDiv").hide();
		$("."+id).attr("onclick","mobileregister()");
		$("."+id).parent().removeClass("norl-login-btn").addClass("rl-login-btn");

	}else{
		$(".errorMsg").html('<em class="icon18 vam disIb">&nbsp;</em>您还未接受职前通用户协议');
		$(".errorDiv").show();
		$("."+id).removeAttr("onclick");
		$("."+id).parent().removeClass("rl-login-btn").addClass("norl-login-btn");
	}
}