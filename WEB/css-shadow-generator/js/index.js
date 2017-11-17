(function($) {
	// 初始盒子声明
	var $box = {
		width: 0,
		height: 0,
		fillet:0,
		bg:"#fff",
		newDomCss: function(obj) {
			return $dom = $("<div>").css(obj);
		}
	};

	// 生成盒子
	var $contDom = $("#content");
	$("#createBox").click(function() {
		$box.width = $("#box_x").val() || 120;
		$box.height = $("#box_y").val() || 120;
		$box.fillet = ($("#box_radius").val() || 0) +"px";
		$box.bg = $("#bg_color").val() || "#fff";
		
		if($box.width > parseInt($contDom.css("width"))) {
			$box.width = parseInt($contDom.css("width")) - 100;
		}
		if($box.height > parseInt($contDom.css("height"))) {
			$box.height = parseInt($contDom.css("height")) - 100;
		}

		$contDom.html("");
		$contDom.append($box.newDomCss({
			"border": "1px red solid",
			"width": $box.height,
			"height": $box.height,
			"border-radius":$box.fillet,
			"background": $box.bg
		}));
	})
    $('#picker').farbtastic('#bg_color',function(res){
    	console.log(res);
    	$contDom.find("div").css({
    		"background":res
    	})
    });
})($)