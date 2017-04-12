(function($, win) {
	var TOP = $(".box").offset().top;
	var LEFT = $(".box").offset().left;
	var boxTop = "";
	var boxLeft = "";
	var  TOPFIRST ;
	var isBack = false;
	var isCheck = false ,a=1;
	var isLeft = false;
	var isRight = false;
	var WITTIME = 1 ; // 下一个滑动，等待事件
	var RONUM = 9 ;//  旋转系数
	var game = {

		init: function() {
			this.moveStart();
			this.moveEnd();
		},
		moveStart: function() {
			var that = this ;
			$(".main").on("touchstart", ".box", function(e) {
				$(this).css({
					transform: 'translateX(0)',
					transition: 'transform 0s 0s'
				})
				if(isCheck) {
					return;
				}
				isCheck = true;
				console.log(1)
				if(!isBack) {
					$(".main").prepend('<div class="box"></div>');
				}
				isBack = true;
				boxTop = event.targetTouches[0].pageY - this.offsetTop;
				boxLeft = event.targetTouches[0].pageX;

				TOPFIRST = event.targetTouches[0].pageY, LEFTFIRST = event.targetTouches[0].pageX;
				console.log($(this))
				$(this).bind("touchmove", that.boxMove);
			})
		},
		moveEnd: function() {
			var that = this ;
			$(".main").on("touchend", ".box", function(e) {
				console.log(isLeft)
				console.log(isRight)
				
				if(isLeft == isRight ){
					console.log(1111)
					$(this).css({
						transform: 'translateX(0)',
						transition: 'transform .5s 0s'
					})
					isCheck = false;
					return ;
				}
				
				if(isLeft) {
				isBack = false;
				isLeft = false ;
				console.log("我向左删除了”")
				$(this).unbind("touchmove", that.boxMove)
				$(this).css({
					transform: 'translateX(-200%)',
					transition: 'transform 1s 0s',

				})
				setTimeout(function() {
					$(".box").each(function(index) {
						if(index != 0) {
							$(this).remove();
						}
					})

					isCheck = false;

				}, WITTIME * 1000)

			}
				if(isRight) {
					console.log("我向右删除了”")
					isBack = false;
					isRight = false ;
					$(this).unbind("touchmove", that.boxMove)
					$(this).css({
						transform: 'translateX(200%)',
						transition: 'transform 1s 0s'
					})
					setTimeout(function() {
						$(".box").each(function(index) {
							if(index != 0) {
								$(this).remove();
							}
						})
						isCheck = false;
					}, WITTIME * 1000)
	
				}
				

			})
		},
		boxMove: function(e) {
			var that = this ;
			e.preventDefault(); // 阻止浏览器默认事件，重要 
			var touch = event.targetTouches[0];
			var pagex = touch.pageX;
			var pagey = touch.pageY;
			$(this).css({
				transform: 'translateX(' + (pagex - boxLeft) + 'px) rotate(' + ((pagex - boxLeft) / RONUM) + 'deg)'
			})
			 isLeft = (LEFTFIRST - pagex) > 120;
			 isRight = (LEFTFIRST - pagex) < -120;

		}

	}

	window.game = game;
})($, window)