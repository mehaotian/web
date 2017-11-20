(function($) {
	var $box = {};
	var Box = function(el) {
		this.el = el;
		// 初始化盒子方法
		this.init();
		// 默认创建一个盒子
		this.buil();
		// 初始化颜色项目
		this.colorPicker({
			"bg": "background", // 背景色
			"border": "border-color" // 边框颜色
		});
	}

	Box.prototype.init = function() {
		var _self = this || $(this);
		var el = $(_self.el);
		// 获取内容父元素
		var $contDom = $("#content");
		// 点击按钮生成盒子
		el.click(function() {
			_self.buil();
			_self.resetRange();

		});
		$(".color-js").click(function(){
			var that = $(this).parent();
			that.find(".picker").show();
		})

		/**
		 * 创建元素病添加样式
		 * @param {Object} obj
		 */
		_self.newDomCss = function(obj) {
			return $dom = $("<div>").css(obj);
		};
		/**
		 * 生成盒子方法
		 */
		_self.buil = function() {
			// 初始盒子声明
			$box = {
				width: $("#box_width").val() || 120,
				height: $("#box_height").val() || 120,
				radius: ($("#box_radius").val() || 0) + "px",
				bg: $("#bg_color").val() || "#fff",
				isBorder: $("#box_border_check").is(":checked"), // 是否开启边框
				border: {
					style: $("#box_border_style").val() || "solid",
					color: $("#border_color").val() || "red",
					width: $("#box_border-width").val() || "1",
					border: ""
				}

			};
			// 设置边框颜色样式
			if(!$box.isBorder) {
				$box.border.border = "none";
			} else {
				$box.border.border = $box.border.width + "px " + $box.border.color + " " + $box.border.style;
			}
			// 判断是否超出边界
			if($box.width > parseInt($contDom.css("width"))) {
				$box.width = parseInt($contDom.css("width")) - 100;
				$("#box_width").val($box.width);
			}
			if($box.height > parseInt($contDom.css("height"))) {
				$box.height = parseInt($contDom.css("height")) - 100;
				$("#box_height").val($box.height);

			}

			// 判断盒子是否存在， 如果不存在加添加，存在则修改
			if($contDom.attr("data-type") == "0") {
				$contDom.append(_self.newDomCss({
					"border": $box.border.border,
					"width": $box.width,
					"height": $box.height,
					"border-radius": $box.radius,
					"background": $box.bg,
					"transition":"all 0.4s ease"
				}));
				$contDom.attr("data-type", "1");
			} else {
				$contDom.find("div").css({
					"border": $box.border.border,
					"width": $box.width,
					"height": $box.height,
					"border-radius": $box.radius,
					"background": $box.bg
				})
			}

			// 重置滑块
			_self.resetRange(['width', 'height',"radius",'border-width']);

		};
		/**
		 * 滑块方法
		 */
		_self.resetRange = function(obj) {
			for(var i in obj) {
				(function(i, obj) {
					var attr = obj[i];
					if(attr == "border-width"){
						$box[attr] = $box.border.width;
					}
					
					$(".slider-" + attr).html('<input class="single-' + attr + '" type="hidden">');
					$('.single-' + attr).jRange({
						from: parseInt($box[attr]) - 50,
						to: parseInt($box[attr]) + 50,
						scale: [parseInt($box[attr]) - 50, parseInt($box[attr]) + 50],
						onstatechange: function(val) {
							if(attr === "radius"){
								_self.reset("border-radius", val);
							}else if(attr === "border-width"){
								if(val<0){
									_self.reset("box-sizing", "border-box" );
									_self.reset("border-width", Math.abs(val));
									
								}else{
									_self.reset("box-sizing", "center-box" );
									_self.reset("border-width", val);
								}

								
							}else{
								_self.reset(attr.toString(), val);
							}
							$("#box_" + attr).val(val);
						}
					});
				})(i, obj)

			};

		};

		// 样式重置
		_self.reset = function(dom, val) {
			$contDom.find("div").css({
				[dom]: val
			});
		}

		// 颜色选择器
		_self.colorPicker = function(obj) {
			for(var i in obj) {
				// 背景颜色选择
				(function(i, obj) {
					$('#' + i + '_picker').farbtastic('#' + i + '_color', function(res) {
						_self.reset(obj[i], res);
					});
				})(i, obj)
			}

		};
	}

	var box = new Box("#createBox");

})($)