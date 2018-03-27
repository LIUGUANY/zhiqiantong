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
	/*播放*/
	var baselocation = "${ctx}";
			var type = "${type}";
			var buyURL = baselocation + "/buy";
			var usercookiekey = "<%=usercookiekey%>";
			var mydomain = "<%=mydomain%>";
			var keImageUploadUrl = "<%=keImageUploadUrl%>"; //kindeditor中使用的路径需要2个参数来区分项目和模块
			var uploadSimpleUrl = "<%=uploadSimpleUrl%>"; //单独的上传按钮使用的路径
			var staticImageServer = "<%=staticImageServer%>"; //返回路径
			var courseId = "${course.id}"; //课程id
			var currentKpointId; //直接播放该节点
			var countPlayTimeOut = '15'; //播放后记录播放次数的延时
			$(function() {
				occFun(); //开关灯效果；
				sideNav(); //右侧悬浮滑动；
				cTabFun(); //评论等的定位
				wxinHover();
				ew();
			});
			//开关灯效果
			function occFun() {
				var bMask = $('<div class="bMask"></div>');
				bMask.css({
					"opacity": "0.8"
				});
				$(".dpBtn").click(function() {
					console.log("000");
					var _this = $(this);
					if (!_this.hasClass("dpOpen")) {
						$("body").prepend(bMask);
						_this.addClass("dpOpen");
						_this.children("a").text("开灯").attr("title", "开灯");
						$(".v-p-box").css("z-index", "99999");
					} else {
						bMask.remove();
						_this.removeClass("dpOpen");
						_this.children("a").text("关灯").attr("title", "关灯");
						$(".v-p-box").css("z-index", "28");
					};
				})
			};

			function sideNav() {
				var vBtn = $("#v-nav-first"),
					naxBox = $(".video-nav-wrap");
				vBtn.click(function() {
					if (!vBtn.hasClass("vBtnCurr")) {
						naxBox.stop().animate({
							"right": "0"
						}, 400);
						vBtn.addClass("vBtnCurr");
					} else {
						naxBox.stop().animate({
							"right": "-350px"
						}, 400);
						vBtn.removeClass("vBtnCurr");
					};
				});
			}

			function cTabFun() {
				var cTab = $("#v-nav-list>li>a");
				cTab.each(function() {
					var _this = $(this),
						_tName = _this.attr("name"),
						cTabTop = $(".c-i-content").offset().top;
					var _tPrentName = $("." + _tName + "-content").attr("name");
					console.log(_tPrentName);
					_this.click(function() {
						if (_tName != undefined) {
							$("." + _tName + "-content").parent().addClass("current").siblings().removeClass("current");
							$("html,body").animate({
								"scrollTop": cTabTop
							}, 500);
							getProblem(_this, _tPrentName);
						};
					})
				})
			}

			function wxinHover() {
				var vBtn = $(".wx-btn"),
					naxBox = $(".gf-tx-ewm");
				vBtn.hover(function() {
					naxBox.css({
						"display": "block"
					});
				}, function() {
					naxBox.css({
						"display": "none"
					});
				});
			}

			function ew() {
				$.ajax({
					url: baselocation + "/ajax/websiteProfile/online",
					data: {},
					dataType: "json",
					type: "post",
					success: function(result) {
						var websitemap = result.entity; //获得map
						if (websitemap != null && websitemap != '') {
							if (websitemap.online.onlineKeyWord == 'ON') {
								$("#onlineConsultBox").show();
							}
							$(".onlineC-item1").children("a").attr("href", websitemap.online.onlineUrl);
							$("#gf-tx-ewm").children().attr("src", staticImageServer + websitemap.online.appImageUrl);
						}
					}
				});
			}
		/*--默认播放节点-*/
		$(".share-box ").hover(function() {
				$(this).stop().animate({"width " : "265px "}, 200);
				$(this).children("#bdshare ").stop().animate({"right " : "0 "}, 200);
			}, function() {
				$(this).stop().animate({"width " : "63px "}, 200);
				$(this).children("#bdshare ").stop().animate({"right " : "-160px "}, 200);
			});
			/*评价*/
			$(".appr-discuss-item .test-answer").each(function(){
				if($(this).index()===4){
					$(".appr-discuss-item .test-answer:gt(4)").css('display',"none");
					$('.appr-discuss-item .more-appr-reply').slideDown();
				}
				$('.appr-discuss-item .more-appr .click').on('click',function(){
					$(".appr-discuss-item .test-answer:lt(9)").fadeIn();
				})
				$('.appr-discuss-item .click-appr').on('click',function(){
					$('.appr-discuss-item .reply-box').fadeIn();
				})
			})
			$('.appr-discuss-item .appr-discuss-icon1').each(function(){
				$(this).on('click',function(){
					$(".reply-box").slideDown();
				})
			})
			$('.appr-discuss-item .comment .appr-discuss-icon2').each(function(){
				$(this).on('click',function(){
					$(this).css({"background-position":"-50px -48px","cursor":'auto'});
				})
			})
			$('.appr-discuss-item .comment .appr-discuss-icon3').each(function(){
				$(this).on('click',function(){
					$(this).css({"background-position":'-80px -48px',"cursor":'auto'})
				})
			})
			/*右侧tabs*/
			$(".xf-u-j-title ul li").each(function(){
				var $index = $(this).index();
				$(this).on("click",function(){
					$(this).addClass('current').siblings().removeClass('current');
					$('.c-j-estra-info .toggle-tabs').hide();
					$('.c-j-estra-info .toggle-tabs').eq($index).show();
				})
			})
	
})
