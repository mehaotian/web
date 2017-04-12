(function($, win) {
	var TOP = $(".box").offset().top;
	var LEFT = $(".box").offset().left;
	var boxTop = "";
	var boxLeft = "";
	var TOPFIRST;
	var isBack = true;
	var isCheck = false,
		a = 1;
	var isLeft = false;
	var isRight = false;
	var WITTIME = 1; // 下一个滑动，等待事件
	var RONUM = 9; //  旋转系数
	var that;
	var game = {

		init: function(fn) {
			that = this;
			this.moveStart();
			this.moveEnd(fn);
		},
		changeFn: {
			WAITTIME: 1, // 下一个滑动，等待事件
			RONUM: 9, //  旋转系数
			ENDTIME: ".5", // 结束运动事件
			RANGE: "200%", //移动距离
			RANGETIME: "1", //移动时间
			MOVERANGE: "120", // 触发移动的距离
		},
		/**
		 * 方向
		 */
		isDit: function() {

		},
		moveStart: function(fn) {
			console.log(that)
			$(".main").on("touchstart", ".box", function(e) {
				$(this).css({
					transform: 'translateX(0)',
					transition: 'transform 0s 0s'
				})
				if(isCheck) {
					return;
				}
				isCheck = true;
				if(isBack) {
					$(".main").prepend('<div class="box"><div class="side"></div></div>');
					isBack = false;
				}
				boxTop = event.targetTouches[0].pageY - this.offsetTop;
				boxLeft = event.targetTouches[0].pageX;

				TOPFIRST = event.targetTouches[0].pageY, LEFTFIRST = event.targetTouches[0].pageX;
				$(this).bind("touchmove", that.boxMove);
			})
		},
		moveEnd: function(fn) {
			$(".main").on("touchend", ".box", function(e) {
				if(fn) {

					fn({
						isLeft: isLeft,
						isRight: isRight,
						cont: $(".box:first-child").find(".side")
					})
				}

				if(isLeft == isRight) {
					$(this).css({
						transform: 'translateX(0)',
						transition: 'transform ' + that.changeFn.ENDTIME + 's 0s'
					})
					isCheck = false;
					return;
				}

				if(isLeft) {
					isBack = true;
					isLeft = false;
					console.log("我向左删除了”")
					$(this).unbind("touchmove", that.boxMove)
					$(this).css({
						transform: 'translateX(-' + that.changeFn.RANGE + ')',
						transition: 'transform ' + that.changeFn.RANGETIME + 's 0s',

					})
					setTimeout(function() {
						$(".box").each(function(index) {
							if(index != 0) {
								$(this).remove();

							}
						})

						isCheck = false;

					}, that.changeFn.WAITTIME * 1000)

				}
				if(isRight) {
					console.log("我向右删除了”")
					isBack = true;
					isRight = false;
					$(this).unbind("touchmove", that.boxMove)
					$(this).css({
						transform: 'translateX(' + that.changeFn.RANGE + ')',
						transition: 'transform ' + that.changeFn.RANGETIME + 's 0s'
					})
					setTimeout(function() {
						$(".box").each(function(index) {
							if(index != 0) {
								$(this).remove();
							}
						})
						isCheck = false;
					}, that.changeFn.WAITTIME * 1000)

				}

			})
		},
		boxMove: function(e) {
			e.preventDefault(); // 阻止浏览器默认事件，重要 
			var touch = event.targetTouches[0];
			var pagex = touch.pageX;
			var pagey = touch.pageY;
			$(this).css({
				transform: 'translateX(' + (pagex - boxLeft) + 'px) rotate(' + ((pagex - boxLeft) / that.changeFn.RONUM) + 'deg)'
			})
			isLeft = (LEFTFIRST - pagex) > that.changeFn.MOVERANGE;
			isRight = (LEFTFIRST - pagex) < -that.changeFn.MOVERANGE;

		}

	}

	window.game = game;
})($, window)