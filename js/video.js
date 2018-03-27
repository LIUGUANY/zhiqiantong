var setTimeoutflag;
var currentCourseId;//全局当前课程id
$(function() {
	initdiss();//样式初始化
	$(".fist").removeClass("current-1");
	$(".fist").eq(0).addClass("current-1");
	//默认播放
//	getKpointLink($("#playId").val())

	if(type!=null && type!=""){
	    var cTabTop = $(".c-i-content").offset().top;
		$("html,body").animate({"scrollTop":cTabTop}, 500);
		if(type=="note"){
			getProblem($(".c-m-content"),"note");
		}else if(type=="question"){
			getProblem($(".c-q-content"),"problem");
		}
	}

});


/**
 * 样式初始化
 */
function initdiss(){
    elePos();
    rMenu();
    oCheck();
    noJd();
    //选项卡公共方法
    cardChange("#sup-chageCard-title>li", "#sup-chageCard-cont>section", "current");
}

/**
 * 判断是否是苹果客户端
 */
function isApple(){
	if ((/iPhone|iPad|iPod/i).test(navigator.userAgent) || (/Mac68K|MacPPC|Macintosh|MacIntel/i).test(navigator.platform)){  
	    return true;
	}  
	return false;
}

/**
 * 验证是否可以观看
 */
function checkSellWayById(courseId,ipointId){
	var checkflag=false;
	return true;
}

/**
 * swf播放的方法
 * @param voUrl
 */
function playerSwf(voUrl){
	var loadHtmlContext='<embed src="'+voUrl+'" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="showAd=0&VideoIDS=XNTkwNDc5MTA0&isAutoPlay=true&winType=adshow&isDebug=false&playMovie=true&MMControl=false&MMout=false&isShowRelatedVideo=false&allowScriptAccess=never"  allowfullscreen="true" quality="high" bgcolor="#FFFFFF" type="application/x-shockwave-flash" allownetworking="internal" wmode="transparent" width="100%" height="100%"/>';
	$("#loadHtml").html(loadHtmlContext);
}


/**
 * 检测电脑是否安装了flash
 * @returns {___anonymous44316_44376}
 */
function flashChecker(){
    var hasFlash = 0; //是否安装了flash  
    var flashVersion = 0; //flash版本  
    if(document.all) {  
        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');  
        if(swf) {  
            hasFlash = 1;  
            VSwf = swf.GetVariable("$version");  
            flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);  
        }  
    }else{  
        if(navigator.plugins && navigator.plugins.length > 0) {  
            var swf = navigator.plugins["Shockwave Flash"];  
            if(swf) {  
                hasFlash = 1;  
                var words = swf.description.split(" ");  
                for(var i = 0; i < words.length; ++i) {  
                    if(isNaN(parseInt(words[i]))) continue;  
                    flashVersion = parseInt(words[i]);  
                }  
            }  
        }  
    }  
    return {  
        f: hasFlash,  
        v: flashVersion  
    };  
}

/**
 * 返回true表示已经安装了Flash
 * 返回flase表示没有安装Flash
 * @returns {Boolean}
 */
function testingFlash(){
	var fls = flashChecker();  
    if(fls.f) {
    	return true;
    }else{
    	return false;
    } 
}

var learn_pageSize=7;
var learn_pageNo=1;//当前页数
var learn_totalPage=0;//总页数
var learn_totalRecord=0;//总记录数
$(window).resize(function() {
	elePos();
});
/**
 * 兼容客户端
 */
function elePos() {
	var winW = parseInt(document.documentElement.clientHeight, 10) + parseInt(document.documentElement.scrollTop || document.body.scrollTop, 10);
	$("#viewerPlaceHolder,.lh-play-body,.lh-r-body").css("height" , winW-148 + "px");
	$(".lh-menu-wrap").css("height" , winW-200 + "px");
	$(".lh-bj-list").css("height" , winW-450 + "px");
	$(".noteTextArea").css({"height" : winW-223 + "px","overflow-y" : "auto","overflow-x" : "hidden"});//noteTextArea>textarea
};
/**
 * 显隐右侧方法
 */
function rMenu() {
	$("#o-c-btn").click(function(){
		if($(this).is('.ocb-current')){
			$(".lh-play-box").animate({"margin-right" : "435px"}, 400);
			$(".lh-right-wrap").animate({"right" : "35px"}, 400);
			$(this).removeClass("ocb-current");
			$(this).find("a").text("展开").attr("title","展开");
		}else{
			$(".lh-play-box").animate({"margin-right" : "0px"}, 400);
			$(".lh-right-wrap").animate({"right" : "-400px"}, 400);
			$(this).addClass("ocb-current");
			$(this).find("a").text("缩小").attr("title","缩小");
		}
	});


}
/**
 * 选项卡公共方法
 * @param oTitle
 * @param oCont
 * @param current
 */
function cardChange(oTitle, oCont, current) {
	var oTitle = $(oTitle),
		oCont = $(oCont),
		_index;
	oTitle.click(function() {
		_index = oTitle.index(this);
		$(this).addClass(current).siblings().removeClass(current);
		oCont.eq(_index).show().siblings().hide();
	}).eq(0).click();
}
/**
 * checkbox控件
 */
function oCheck() {
	//checkbox控件
	$(".inpCb").click(function() {
		if (!$(".inpCb>input").is(":checked")) {
			$(this).addClass("unforget");
		} else {
			$(this).removeClass("unforget");
		};
	});
}

/**
 * 无三级节点
 */
function noJd() {
	$(".lh-menu-ol>li").each(function() {
		var _this = $(this);
		if (_this.children("dl").length <= 0) {
			_this.children("a").addClass("no-jd-play");
		};
	});
};
function aboutCourse(){
	getCourse('xxpj',2);
}
function getCourse(className,type){
	$("#lh-r-li-course").removeClass("current");
	$("#lh-r-li-about").addClass("current");
	if(className=='xxpj'){//课程笔记
		if(currentKpointId!=null&&currentKpointId!=0){
			queryNote(currentCourseId,currentKpointId);
		}
	}else if(className=='gsbr'){//课程评论
		$(".assessajaxHtml").html("");
		if(currentKpointId!=null&&currentKpointId!=0){
			assessPage(currentKpointId);
		}
	}else if(className=='gswd'){//课程问答
		$("#problemUlListId").html("");
		if(currentKpointId!=null&&currentKpointId!=0){
			if(type==1){//精华互动
				sugListPage(currentKpointId,'replycount');
				$("#hudongSapnId1").removeClass("current");
				$("#hudongSapnId2").addClass("current");
			}
			if(type==2){//互动答疑
				sugListPage(currentKpointId,'addTime');
				$("#hudongSapnId1").addClass("current");
				$("#hudongSapnId2").removeClass("current");
			}
		}
	}

}

/**
 * 目录切换方法
 */
function changeicurrent(){
	$("#lh-r-li-course").addClass("current");
	$("#lh-r-li-about").removeClass("current");
}
/**
 * 记录播放次数
 * @param courseId 课程id
 * @param kpointId 节点id
 */
function addPlayTimes(courseId,kpointId){
	$.ajax({
		url :  baselocation + "/course/playertimes",
		data : {
			"kpointId" : kpointId,
			"courseId" : courseId
		},
		type : "post",
		dataType : "text",
		async:false,
		success : function(result) {
		}
	});
}

/**
 * 获取节点链接
 * @param kpointId
 */
//function getKpointLink(kpointId){
//	if(!isLogin()){
//		window.location.href="/front/couinfo/"+courseId;
//	}
//	//关闭上次的dialog弹窗
//	$(".dialog-shadow").remove();
//	//给当前课节点加上正在播放的样式
//	$(".couseKpoint").removeClass("current-2");
//	$("#kpoint"+kpointId).parent().addClass("current-2");
//
//	$.ajax({
//		url:"/front/ajax/checkKpoint",
//		data:{
//			"kpointId":kpointId,
//			"courseId":courseId
//		},
//		type:"post",
//		dataType:"json",
//		cache : false,
//		async:false,
//		success:function(result){
//			if(result.success){
//				$(".c-i-content").parent().removeClass("current");
//				var kpoint=result.entity.courseKpoint;
//				currentKpointId=kpoint.id;
//				$("#playId").val(currentKpointId);
//				currentCourseId=kpoint.courseId;
//				//获取上下节
//				nextAndPrev();
//
//				if(kpoint.fileType=="VIDEO"){
//					//视频播放
//					loadVideo(kpoint.id,kpoint.name);
//				}else{
//					//pdf加载
//					loadPdf(kpointId,kpoint.name);
//				}
//				//展开对应的课程目录(快刀斩乱麻  一层层关闭 展开)
//				$(".choose-point").removeClass("choose-point");
//				$("#kpoint"+currentKpointId).addClass("choose-point");
//				if($("#kpoint"+currentKpointId).hasClass("txtOf")){//第三级
//					$("#kpoint"+currentKpointId).parent().parent().parent().parent().children().first().addClass("current-1");
//					$("#kpoint"+currentKpointId).parent().parent().parent().parent().children().show();
//					$("#kpoint"+currentKpointId).parent().parent().parent().children().first().addClass("current-1");
//					$("#kpoint"+currentKpointId).parent().parent().parent().children().show();
//				}else{//第二级
//					$("#kpoint"+currentKpointId).parent().parent().children().show();
//					$("#kpoint"+currentKpointId).parent().parent().first().addClass("current-1");
//				}
//
//				//记录播放次数
//				var  id = null;
//				if(courseId !=currentCourseId ){//如果当前播放课程id 和 课程id 不相等  (即 当前课程为套餐 id 应为套餐id)
//					id = courseId;
//				}else{// 如果相等  （即当前为课程）
//					id =currentCourseId;
//				}
//				setTimeoutflag=setTimeout('addPlayTimes('+id+','+kpointId+')',Number(countPlayTimeOut)*1000);
//				//setTimeoutflag=setTimeout('addPlayTimes('+currentCourseId+','+kpointId+')',Number(countPlayTimeOut)*1000);
//
//				$("#kpointContent").html(kpoint.content);
//				getProblem($(".c-i-content"),"assess");
//
//
//				var isPraise = result.entity.courseProfile;
//				if(isPraise==null){
//					$("#dzanPraise").html("");
//					$("#dzanPraise").append('<a href="javascript:void(0)" onclick="addPraises()"><em></em><span id="praise" class="c-fff fsize12 ml10"></span></a>');
//					$("#praise").html(result.entity.courseKpointProfileNum);
//				}else{
//					$("#dzanPraise").html("");
//					$("#dzanPraise").append('<a href="javascript:void(0)"><em></em><span class="c-fff fsize12 ml10">已点赞</span></a>');
//				}
//
//				$("#studyhistoryNum").html(result.entity.studyhistoryNum);
//				$("#assessNum").html(result.entity.assessNum);
//
//
//			}else{
//				//未登录  将跳转课程详情页
//				if(result.message=="loginErr"){
//					window.location.href="/front/couinfo/"+courseId;
//				}else{
//					dialog('提示',result.message,1);
//				}
//			}
//		},
//		error : function(error) {
//			dialog('提示','系统繁忙，请稍后再操作',1);
//		}
//	});
//}

/**
 * 获取上下节
 */
//function nextAndPrev(){
//	var num=$("#kpoint"+currentKpointId).attr("num");
//	//当前展示的树的id
//	var upLast;
//	var downLast;
//	if($("#kpoint"+currentKpointId).hasClass("txtOf")) {//第三级
//		upLast=$(".kpointA"+(parseInt(num)-1));
//		downLast=$(".kpointA"+(parseInt(num)+1));
//	}else{//第二级
//		upLast=$(".kpointsA"+(parseInt(num)-1));
//		downLast=$(".kpointsA"+(parseInt(num)+1));
//	}
//
//	//上一节
//	if(isNotNull(upLast.attr("id"))){
//		var upId=upLast.attr("id").replace("kpoint", "");
//		$("#upLast").html('<span onclick="getKpointLink('+upId+')" title="'+upLast.attr("title")+'" href="javascript:void(0)">上一节课：'+upLast.attr("title")+'</span>');
//	}else{
//		$("#upLast").html('<span href="javascript:void(0)" title="前面没有了">上一节课：无</span>');
//	}
//
//	//下一节
//	if(isNotNull(downLast.attr("id"))){
//		var downId=downLast.attr("id").replace("kpoint", "");
//		$("#downLast").html('<span onclick="getKpointLink('+downId+')" title="'+downLast.attr("title")+'" href="javascript:void(0)">下一节课：'+downLast.attr("title")+'</span>');
//	}else{
//		$("#downLast").html('<span href="javascript:void(0)" title="已是最后课节">下一节课：无</span>');
//	}
//}


/**
 * 获得视频播放器的html
 * @param kpointId
 */
function loadVideo(kpointId,name) {
	$.ajax({
		url : "" + baselocation + "/front/ajax/loadVideo",
		data:{
			"kpointId":kpointId,
			"courseId":courseId,
			"flag":"COURSE"
		},
		type : "post",
		dataType : "text",
		success : function(result) {
			var initTitle = name;
			if(initTitle.indexOf('<b')>-1){
				initTitle = initTitle.substring(0,initTitle.indexOf('<b'));
			}
			$("#titleIdBig").html(initTitle);
			$("#loadHtml").html(result);
		}
	});
}
/**
 * 加载文档预览
 * @param kpointId
 * @param name
 */
function loadPdf(kpointId,name) {
	$.ajax({
		url : baselocation + "/front/ajax/loadPdf",
		data:{
			"kpointId":kpointId,
			"courseId":courseId
		},
		type:"post",
		dataType:"text",
		success:function(result){
			var initTitle = name;
			if(initTitle.indexOf('<b')>-1){
				initTitle = initTitle.substring(0,initTitle.indexOf('<b'));
			}
			$("#titleIdBig").html(initTitle);
			$("#loadHtml").html(result);
		},error:function(){
			dialog('提示','系统繁忙，请稍后再操作',1);
		}
	});
}

/**
 * 执行播放的方法
 * @param id
 */
function player(id){
	var kpointName=$("#k"+id).attr("title");

	//判断是否登录
	if(!isLogin()){
		window.location.href=baselocation+"/login";
		return;
	}
	//把点击的节点数据放入全局变量
	currentKpointId=id;
	if(setTimeoutflag!=null){//上次如果未执行的先取消掉
		clearTimeout(setTimeoutflag);
	}
	if(checkSellWayById(courseId,id)){
		var initTitle = kpointName;
		if(initTitle.indexOf('<b')>-1){
			initTitle = initTitle.substring(0,initTitle.indexOf('<b'));
		}
		$("#titleIdBig").html(initTitle);

		loadVideo(id);
	}else{
		alert("您还未购买此课程，谢谢！");
		window.location.href=baselocation+"/front/couinfo/"+courseId;
	}
}



// 添加评论
function addAssess() {
	if(!isLogin){
		dialog('登录','',3,'','1');
		return;
	}
	var assessInofContext = $("#assessInofContextId").val();
	if (assessInofContext == null || assessInofContext.trim() == '') {
		$("#notAssessInfoId").show();
		$("#assessInofContextId").val('');
		//KindEditor.html("#assessInofContextId", "");
		return false;
	} else {
		var pointId =currentKpointId;// 视频节点ID
		$.ajax({
			url : baselocation + "/front/addassess",
			type : "post",
			dataType : "json",
			data : {
				"courseId" : currentCourseId,
				"kpointId" : pointId,
				"content" : assessInofContext
			},
			success : function(result) {
				if (result.success) {
					dialog('成功', '评论成功', 4);
					ajaxPage("/front/ajax/assesskpoint","&kpointId="+pointId,1,solveResult);
					$("#assessInofContextId").val('');
					var reCount = parseInt($("#assessNum").text(), 10);
					$("#assessNum").html(reCount + 1);
					//KindEditor.html("#assessInofContextId", "");
				} else {
					dialog('失败', '评论失败，请刷新重试', 4);
				}
			}
		});
	}
}
//进行笔记编辑
function doAddNote(){
	$("#noteInofContextId").prop("disabled","");
	$("#doAddNote").hide();
	$("#addNote").show();
}
// 添加笔记
function addNote() {
	if(!isLogin){
		dialog('登录','',3,'','1');
		return;
	}
	var noteInofContextId = $("#noteInofContextId").val();
	if (noteInofContextId == null || noteInofContextId.trim() == '') {
		$("#notAssessInfoId").show();
		$("#noteInofContextId").val('');
		//KindEditor.html("#assessInofContextId", "");
		return false;
	} else {
		var pointId =currentKpointId;// 视频节点ID
		var  id = null;
		if(courseId !=currentCourseId ){//如果当前播放课程id 和 课程id 不相等  (即 当前课程为套餐 id 应为套餐id)
			id = courseId;
		}else{// 如果相等  （即当前为课程）
			id =currentCourseId;
		}

		$.ajax({
			url : baselocation + "/front/addnote",
			type : "post",
			dataType : "json",
			data : {
				"courseId" : id,
				"kpointId" : pointId,
				"content" : noteInofContextId
			},
			success : function(result) {
				if (result.success) {
					dialog('成功', '记录成功', 4);
					$("#noteInofContextId").attr("disabled","disabled");
					$("#addNote").hide();
					$("#doAddNote").show();
				} else {
					dialog('失败', '记录失败，请刷新重试', 4);
				}
			}
		});
	}
}


// 添加问答
function addProblemFun(){
	if(!isLogin){
		dialog('登录','',3,'','1');
		return;
	}
	var problemcontext = $("#problemContextTextareaId").val();
	if(problemcontext==null || problemcontext.trim()==''){
		$("#notProblemTTId").show();
		$("#problemContextTextareaId").val('');
		return false;
	}else{
		if(problemcontext.length>255){
			dialog('失败', '输入的内容不能超过255个字', 4);
			return;
		}
		var  id = null;
		if(courseId !=currentCourseId ){//如果当前播放课程id 和 课程id 不相等  (即 当前课程为套餐 id 应为套餐id)
			id = courseId;
		}else{// 如果相等  （即当前为课程）
			id =currentCourseId;
		}


		$.ajax({
			url:baselocation+'/front/addAnswerQuestion',
			type : "post",
			dataType : "json",
			async:false,
			data : {
				"answerQuestion.type":"course",
				"answerQuestion.content":problemcontext,
				"answerQuestion.parentId":id,
				"answerQuestion.sonId":currentKpointId
			},
			success:function (result){
				if (result.success) {
					$("#notProblemTTId").hide();
					dialog('成功', '发布成功', 4);
					ajaxPage("/front/ajax/answerList","&kpointId="+currentKpointId,1,solveResult);
					$("#problemContextTextareaId").val('');
				}else{
					dialog('失败', '发布失败', 4);
				}
			}
		});
	}
}

var replyid = null;
function problemReply(id,type){
	if(type==1){
		$("#reply"+id).show();
		replyid=id;
		ajaxPage("/front/ajax/answerReplyList","&answerId="+id,1,solveResults);
	}if(type==2){
		$("#reply"+id).hide();
	}
}
function solveResults(result){
	$(".reply"+replyid).html(result);
}

// 添加回复
function addReply(id){
	if(!isLogin){
		dialog('登录','',3,'','1');
		return;
	}
	var replycontext = $("#replyContextTextareaId"+id).val();
	if(replycontext==null || replycontext.trim()==''){
		$("#notRepoyTTId"+id).show();
		$("#replyContextTextareaId"+id).val('');
		return false;
	}else{
		if(replycontext.length>255){
			dialog('失败', '输入的内容不能超过255个字', 4);
			return;
		}
		$.ajax({
			url:baselocation+'/front/ajax/addAnswerReply',
			type:'post',
			dataType:'json',
			data:{"answerReply.content":replycontext,"answerReply.answerId":id},
			success:function (result){
				if(result.success){
					$("#replyContextTextareaId"+id).val('');
					var reCount = parseInt($("#reCount"+id).text(),10);
					$("#reCount"+id).html(reCount + 1);
					ajaxPage("/front/ajax/answerReplyList","&answerId="+id,1,solveResults);
				}
			}
		});
	}

}



// 添加点赞
function addPraises(){
	if(!isLogin){
		dialog('登录','',3,'','1');
		return;
	}
	$.ajax({
		url:baselocation+'/front/kopintProfile/add',
		type:'post',
		dataType:'json',
		data:{"kpointId":currentKpointId,"courseId":currentCourseId},
		success:function (result) {
			if (result.success) {
				//dialog("提示", result.message, 4);
				//var reCount = parseInt($("#praise").text(), 10);
				//$("#praise").html(reCount + 1);
				//$("#praise").html("已点赞");
				$("#dzanPraise").html("");
				$("#dzanPraise").append('<a href="javascript:void(0)"><em></em><span class="c-fff fsize12 ml10">已点赞</span></a>');
			} else {
				//dialog("提示", result.message, 1);
			}
		}
	});
}

function menuChange(obj){
	if($(obj).hasClass("current-1")){
		$(obj).removeClass("current-1")
		$(obj).siblings().hide();
	}else{
		$(obj).addClass("current-1")
		$(obj).siblings().show();
	}
}

function getProblem(obj,status){
	if($(obj).parent("li").hasClass("current")){
		return;
	}
	if(status=='assess'){
		ajaxPage("/front/ajax/assesskpoint","&kpointId="+$("#playId").val(),1,solveResult);
	}else if(status=='note'){
		ajaxPage("/front/ajax/querynote","&kpointId="+$("#playId").val(),1,solveResult);
	}else if(status=='problem'){
		ajaxPage("/front/ajax/answerList","&kpointId="+$("#playId").val(),1,solveResult);
	}
	$(obj).parent("li").siblings().removeClass("current");
	$(obj).parent("li").addClass("current");
}
function solveResult(result){
	$(".question").html(result);
}
function shareCourse(){
	$.ajax({
		url:'/front/share/integral',
		data:{"courseId":courseId},
		type:'post',
		dataType:'json',
		success:function(){

		}
	});
}