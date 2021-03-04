(function ($) {
					var timeoutMiliSecond = 6000;
					var t;
					$.fn.slideshowSlider = function (options) {
						var opts = $.extend({}, $.fn.slideshowSlider.defaults, options);

						return this.each(function () {

							var $slideshowContainer = $(this),
							o = $.meta ? $.extend({}, opts, $slideshowContainer.data()) : opts;

							//the main slider                                        
							var $slider = $(o.slider);

							//the pager container
							$slidePager = $(o.slidePager),
							$pager = $slidePager.children(),

							//automatic slideshow
							$autoSlideshow = $(o.autoSlideshow),

							//current slide
							currentSlideIndex = 0,
							$loading = $('.loading', $slideshowContainer);

							//first preload all the images
							var loaded = 0,
							$layers = $slider.find('.layer'),
							totalImages = $layers.length;

							$layers.each(function () {
								$('<img/>').load(function () {
									++loaded;

									//if (loaded == totalImages) {
									if (loaded == 3) {
										$loading.fadeOut(1000, function () {
											slide(0, o.slider, o.slidePager);
											$slidePager.show();
										});
									}
								}).attr('src', $(this).text()).prependTo($(this));
								
								$(this).find('span').remove();
							}); //each image

							$pager.each(function (index) {
								var $this = $(this);
								$this.bind('click', function () {
									clearTimeout(t);
									currentSlideIndex = index;
									//console.log(currentSlideIndex + " " + $pager.length);
									//$slidePager.find('a').removeClass('selected');
									slide(index, o.slider, o.slidePager, o.autoSlideshow);
								});
							}); //each pager

							//if autoSlideshow                                        
							if (o.autoSlideshow) {
								var nextSlideIndex = currentSlideIndex + 1;
								if (nextSlideIndex == $pager.length) { nextSlideIndex == 0; };
								t = setTimeout(function () {
									slide(nextSlideIndex, o.slider, o.slidePager, o.autoSlideshow);
								}, timeoutMiliSecond);
							}

						}); //each
					}; //end fn


					var slide = function (index, slider, slidePager, autoSlideshow) {
						
						var activeSlide = $(slider + ' .active');
						$(activeSlide).find('.layer2').stop().animate(
							{ left: '2100px' },
							{
								duration: 500,
								easing: 'easeInOutQuad',
								complete: function () { $(this).removeAttr('style'); }
							}
						);
						$(activeSlide).find('.layer1').stop().animate(
							{ left: '2100px' },
							{
								duration: 1000,
								easing: 'easeInOutQuad',
								complete: function () { $(this).removeAttr('style'); }
							}
						);
						$(activeSlide).find('.blurb').stop().animate(
							{ left: '2100px' },
							{
								duration: 1500,
								easing: 'easeInOutQuad',
								complete: function () { $(this).removeAttr('style'); }
							}
						);
						$(activeSlide).removeClass('active');

						var totalSlide = $(slidePager + ' li').length;
						$(slidePager + ' a').removeClass('selected');
						$(slidePager + ' li:eq(' + index + ') a').addClass('selected');
						var toSlide = $(slider + ' li:eq(' + index + ')');
						$(toSlide).find('.layer2').stop().animate(
							{ left: '1050px' },
							{
								duration: 1500,
								easing: 'easeInOutQuad',
								complete: function () { }
							}
						);
						$(toSlide).find('.layer1').stop().animate(
							{ left: '1050px' },
							{
								duration: 1750,
								easing: 'easeInOutQuad',
								complete: function () { }
							}
						);
						$(toSlide).find('.blurb').stop().animate(
							{ left: '1050px' },
							{
								duration: 2000,
								easing: 'easeInOutQuad',
								complete: function () { }
							}
						);
						$(toSlide).addClass('active');


						//if autoSlideshow                                        
						if (autoSlideshow) {
							var nextSlideIndex = index + 1;
							if (nextSlideIndex == totalSlide) { nextSlideIndex = 0; };
							//console.log(nextSlideIndex + " " + totalSlide);
							t = setTimeout(function () {
								slide(nextSlideIndex, slider, slidePager, autoSlideshow);
							}, timeoutMiliSecond);
						}
					};

					$.fn.slideshowSlider.defaults = {
						slider: '#slideshow',
						slidePager: '#clientLogos',
						autoSlideshow: true
					};

				})(jQuery);

				$(document).ready(function () {
					$('#slideshowWindow').slideshowSlider();
				});