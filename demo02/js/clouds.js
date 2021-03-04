/*
Here are the clouds defined in array
-------------------------------------------------------------*/

$(function() {
	if (!$.browser.msie || $.browser.version > 5) {
		$("#cloud-holder").clouds({
			clouds: [
				{src:'cloud1.png',x:-10,y:60,speedX:-2},
				{src:'cloud4.png',x:160,y:70,speedX:-1},
				{src:'cloud4.png',x:360,y:20,speedX:-2},
				{src:'cloud5.png',x:560,y:10,speedX:-1},
				{src:'santa.png', x:160,y:60,speedX:-2},
				{src:'cloud1.png',x:400,y:70,speedX:-1}
				],
			folder: 'img/',
			speed: 100
			//fader: !$.browser.msie
		});
	}
});

/*
Here are the default general settings for clouds (opacityStep, speed, fader)
-------------------------------------------------------------*/
$.fn.clouds = function(settings) {
	
	settings = $.extend({
		clouds: [],
		folder: '/',
		speed: 1,
		opacityStep: 0.02,
		fader: true
	}, settings);

	return this.each(function(n, item) {
		
		var self = $(item);
		
		$.each(settings.clouds, function(c, cloud) {
			
			var cImg = new Image();
			
			$(cImg).load(function() {
				var cDiv = $('<div class="cloud"></div>');
				
				cDiv.css({
					top: cloud.y+"px",
					left: cloud.x+"px",
					width: cImg.width+"px",
					height: cImg.height+"px",
					backgroundImage: 'url('+this.src+')',
					zIndex: 2
				});

				self.append(cDiv);
				var o = settings.opacityStep;

				if(cloud.src=='santa.png'){
					o = '1.0';
				}
				else{
				
				}

				cloud.currentO = Math.random();
				cDiv.css({opacity: cloud.currentO});
				window.setInterval(function() {
					if (settings.fader) {

						if(cloud.src=='santa.png'){
							if (cloud.currentO > 0.9) o = +settings.opacityStep;
							if (cloud.currentO < 0.9) o = +settings.opacityStep;
						}
						else{
							if (cloud.currentO > 0.7) o = -settings.opacityStep;
							if (cloud.currentO < 0.4) o = +settings.opacityStep;
						}

						cloud.currentO += o;
						cDiv.css({opacity: cloud.currentO});
						

					}
					var currentLeft = parseInt(cDiv.css("left"));
					cDiv.css({left: (currentLeft - cloud.speedX)+'px'});
					if (cDiv.offset().left > $(document).width() - self.offset().left) {
						var s = -cImg.width;
						cDiv.css({left: s+"px"});
					}
				}, settings.speed);
			});
			cImg.src = settings.folder + cloud.src;
		});
	});
}


	

