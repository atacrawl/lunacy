(function($){
	$.fn.extend({

		lunacy: function(options) {

			// default values
			var lunacyDefaults = {
				buttonLocation: 'outside',
				lazyLoad: false,
				buttons: true,
				right: 'lunacy-right',
				left: 'lunacy-left',
				still: 'lunacy-still',
				center: 'luna-center'
			}

			var o = $.extend(lunacyDefaults, options);
			var lunatics = new Array();
			var assemble = new Array();
			var $trans = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';
			var obj, kids, $low, $lunacy, $center, $ci, $new_luna, count, assemble;

			return this.each(function(){

				// initalizing
				obj = $(this);
				lunatics = [];
				assemble = [];
				kids = obj.children();

				// nothing will happen is there are no kids
				if (kids.length) {

					// .has-lunacy adds important things
					obj.addClass("has-lunacy");
					if (obj.parent().css("position") != 'absolute') {
						obj.parent().css("position","relative");
					}

					// establish buttons
					if (kids.length >= 3 && o.buttons == true) {
						obj.addClass('btn-'+o.buttonLocation).append('<button class="lunacy-btn btn-prev">Prev</button><button class="lunacy-btn btn-next">Next</button>');
						$("button", obj).click(function(){
							var $$ = $(this);
							if ($$.hasClass("btn-next")) {
								lunacyShift('r');
							} else if ($$.hasClass("btn-prev")) {
								lunacyShift('l');
							}
						});
					} else {
						o.buttons = false;
					}

					// assemble the kids into an array and remove them from the DOM
					kids.each(function(e){
						var $$ = $(this);
						if (o.lazyLoad == true) {
							$$.find("img").each(function(){
								var $$$ = $(this);
								$$$.attr("data-lazy",$$$.attr("src")).attr("src","");
							});
						}
						lunatics.push($$.addClass("luna").attr("data-index",e));
						$$.remove();
					});
					count = lunatics.length;

					// add wrapper divs
					obj.append('<div class="lunacy-outer"></div>');
					$low = $(".lunacy-outer", obj);
					$low.append('<div class="lunacy lunacy-has-'+count+' '+o.still+'"></div>');
					$lunacy = $(".lunacy", obj);

					// reassemble the first five items based on the number of kids
					switch (count) {
						case 1:
							lunacyBuild(0,'a');
							break;
						case 2:
							assemble = Array(0,1);
							break;
						default: // 3 or more
							assemble = Array(0,1,2,(count - 2),(count - 1));
							break;
					}

					// assemble the boxes
					for (var $i = 0; $i < assemble.length; $i++) {
						lunacyBuild(assemble[$i],'a');
					}

					// assign to get a new index
					$lunas = $(".luna", obj);

					if (count > 2) {

						// put the center class on the first luna
						$lunas.eq(0).addClass(o.center);
						$center = $("."+o.center);
						$ci = $center.data('index');

						// move #4 and #5 to the beginning
						$lunas.eq(4).detach().prependTo($lunacy);
						$lunas.eq(3).detach().prependTo($lunacy);

					} else {

						$lunas.addClass(o.center);

					}

					// assign to get a new index
					$lunas = $(".luna", obj);
					lunacyLazy();

				}

			});

			function lunacyBuild($i,$end) {
				var $luna = lunatics[$i];
				if ($end == 'a') {
					$lunacy.append($luna.clone());
				} else {
					$lunacy.prepend($luna.clone());
				}
			}

			function lunacyShift($dir) {
				if ($lunacy.hasClass(o.still) && ($dir == 'l' || $dir == 'r') && o.buttons == true) {
					$lunacy.removeClass(o.still);
					if ($dir == 'r') {
						$center.removeClass(o.center).next().addClass(o.center);
						$center = $("."+o.center);
						$ci = $center.data('index');
						$lunacy.addClass(o.right).one($trans, function(){
							if ($lunacy.hasClass(o.right)) {
								$lunacy.removeClass(o.right).addClass(o.still);
								$lunas.first().remove();
								$new_luna = (($ci + 2) >= count) ? ($ci + 2) - count : $ci + 2;
								lunacyBuild($new_luna,'a');
							}
						});
					} else {
						$center.removeClass(o.center).prev().addClass(o.center);
						$center = $("."+o.center);
						$ci = $center.data('index');
						$lunacy.addClass(o.left).one($trans, function(){
							if ($lunacy.hasClass(o.left)) {
								$lunacy.removeClass(o.left).addClass(o.still);
								$lunas.last().remove();
								$new_luna = (($ci - 2) < 0) ? count + ($ci - 2) : $ci - 2;
								lunacyBuild($new_luna,'p');
							}
						});
					}
					$lunas = $(".luna", obj);
					lunacyLazy();
				}
			}

			function lunacyLazy(){
				if (o.lazyLoad == true) {
					$lunas.find("img").each(function(){
						var $$$ = $(this);
						$$$.hide().attr("src",$$$.data("lazy")).show();
					});
				}
			}

		}

	});
})(jQuery);