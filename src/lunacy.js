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
			var obj, kids, $low, $lunacy, $center, $ci, $newLuna, count, assemble, $toChange, $toRemove, $correctClass, $buildDirection;

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
						$toChange = $center.next();
						$toRemove = $lunas.first();
						$correctClass = o.right;
						$buildDirection = 'a';
						$newLuna = (($ci + 3) >= count) ? ($ci + 3) - count : $ci + 3;
					} else {
						$toChange = $center.prev();
						$toRemove = $lunas.last();
						$correctClass = o.left;
						$buildDirection = 'p';
						$newLuna = (($ci - 3) < 0) ? count + ($ci - 3) : $ci - 3;
					}

					$center.removeClass(o.center);
					$toChange.addClass(o.center);
					$center = $toChange;
					$ci = $toChange.data("index");
					$lunacy.addClass($correctClass).one($trans, function(){
						if ($lunacy.hasClass($correctClass)) {
							$lunacy.removeClass($correctClass).addClass(o.still);
							$toRemove.remove();
							lunacyBuild($newLuna,$buildDirection);
						}
					});

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