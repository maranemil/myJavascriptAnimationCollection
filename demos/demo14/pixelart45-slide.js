
	(function($){

		$.fn.Pixelart45 = function(options){

			var element=$(this);

			// default values
			var defaults={
				AppName:     "PixelArt 45 jQuery Plugin",
				AppVersion:  "1.0",
				AppAuthor:   "Emil Maran",
				AppWebsite:  "maran-emil.de",
				AppTransition: "rotate",
				AppAngle: "45",
				AppTimerSlide: 6000,
				AppTimerFloor: 1500
			};

			var options=$.extend(defaults,options);

			///////////////////////////////////////////////////////////////////////////////////////////////
			//
			//	_initSlide
			//
			///////////////////////////////////////////////////////////////////////////////////////////////

			// create cookie if dosent exists
			$._initSlide = function(){

					//console.log( $.cookie("AutoLoop") );
					
					var CntMax = 0;
					$.each(arPos,function(key, value)
					{
						//console.log(key+'-'+value);
						CntMax++
					});
					
					var randLoop = Math.round(Math.random()*CntMax);

					if(randLoop==0){
						randLoop = 2;
					}

					//console.log(randLoop)

					setTimeout(function(){
					//setInterval(function(){
						$.loopAnimationIn(randLoop);
					},1190);

					var navHTML = "Slide "
					$.each(arPos,function(key, value)
					{
						//console.log( key +'...'+value)
						navHTML+= '<a class="ui-navi-content" href="javascript:void(0)" onclick="$.loopAnimationIn('+key+');$.cookie(\'AutoLoop\',\'false\')"> '+key+'</a> . ';
					});
					
					$('#navigation').html(navHTML);


				
			}

			$._initSlide();

			///////////////////////////////////////////////////////////////////////////////////////////////
			//
			//	fxAnim
			//
			///////////////////////////////////////////////////////////////////////////////////////////////


			$.fxAnim = function(effect){

				//console.log(effect)
			
				// rotate
				if(effect =="rotate"){
			 
					var bgEl = $('#bg .block');
					$.each(bgEl,function(key, value)
					{
						//console.log(key+'-'+value);
							$(this).css({
								"-moz-transform": "skew(0deg, -45deg)",
								"-webkit-transform": "skew(0deg, -45deg)",
								"background": "#fff000",
								"-webkit-transition": "all 0."+Math.floor((Math.random()*19)+1)+"s ease-out",
								"-moz-transition": "all 0."+Math.floor((Math.random()*19)+1)+"s ease-out"
							});
					});
					
					setTimeout(function(){

						var bgEl = $('#bg .block');
						$.each(bgEl,function(key, value)
						{
							//console.log(key+'-'+value);
							
							$(this).css({
								"-moz-transform": "skew(0deg, 0deg)",
								"-webkit-transform": "skew(0deg, 0deg)",
								"background": "#fff000",
								"-webkit-transition": "all 0."+Math.floor((Math.random()*19)+1)+"s ease-out",
								"-moz-transition": "all 0."+Math.floor((Math.random()*19)+1)+"s ease-out"
							});

						});

					},options.AppTimerFloor);

				}
				// scale
				else if(effect =="scale"){
			 
					var bgEl = $('#bg .block');
					$.each(bgEl,function(key, value)
					{
						//console.log(key+'-'+value);
							$(this).css({
								"-moz-transform": "translateZ(50px)  scale(0.6)",
								"-webkit-transform": " translateZ(50px)  scale(0.6)",
								"background": "#fff000",
								"-webkit-transition": "all 0."+Math.floor((Math.random()*19)+1)+"s ease-out",
								"-moz-transition": "all 0."+Math.floor((Math.random()*19)+1)+"s ease-out"
							});
					});
					
					setTimeout(function(){

						var bgEl = $('#bg .block');
						$.each(bgEl,function(key, value)
						{
							//console.log(key+'-'+value);
							
							$(this).css({
								"-moz-transform": "translateZ(-50px)  scale(1.0)",
								"-webkit-transform": "translateZ(-50px)  scale(1.0)",
								"background": "#fff000",
								"-webkit-transition": "all 0."+Math.floor((Math.random()*19)+1)+"s ease-out",
								"-moz-transition": "all 0."+Math.floor((Math.random()*19)+1)+"s ease-out"
							});

						});

					},options.AppTimerFloor);

				}
				// perspective
				else if(effect =="perspective"){
			 
					var bgEl = $('#bg .block');
					$.each(bgEl,function(key, value)
					{
						//console.log(key+'-'+value);
							$(this).css({
								"-moz-transform": "translateZ(5px) perspective(7px);",
								"-webkit-transform": "translateZ(5px) perspective(7px);",
								"transform": "translateZ(5px) perspective(7px);",
								"background": "#fff000",
								"-webkit-transition": "all 0."+Math.floor((Math.random()*19)+1)+"s ease-out",
								"-moz-transition": "all 0."+Math.floor((Math.random()*19)+1)+"s ease-out"
							});
					});
					
					setTimeout(function(){

						var bgEl = $('#bg .block');
						$.each(bgEl,function(key, value)
						{
							//console.log(key+'-'+value);
							
							$(this).css({
								"-moz-transform": "translateZ(0px) perspective(0px);",
								"-webkit-transform": "translateZ(0px) perspective(0px);",
								"transform": "translateZ(0px) perspective(0px);",
								"background": "#fff000",
								"-webkit-transition": "all 0."+Math.floor((Math.random()*19)+1)+"s ease-out",
								"-moz-transition": "all 0."+Math.floor((Math.random()*19)+1)+"s ease-out"
							});

						});

					},options.AppTimerFloor);
				}
				// default
				else{

					var bgEl = $('#bg .block');
					$.each(bgEl,function(key, value)
					{
						//console.log(key+'-'+value);
							$(this).css({
								"-moz-transform": "translateZ(50px)  scale(0.6)",
								"-webkit-transform": " translateZ(50px)  scale(0.6)",
								"background": "#fff000",
								"-webkit-transition": "all 0."+Math.floor((Math.random()*19)+1)+"s ease-out",
								"-moz-transition": "all 0."+Math.floor((Math.random()*19)+1)+"s ease-out"
							});
					});
					
					setTimeout(function(){

						var bgEl = $('#bg .block');
						$.each(bgEl,function(key, value)
						{
							//console.log(key+'-'+value);
							
							$(this).css({
								"-moz-transform": "translateZ(-50px)  scale(1.0)",
								"-webkit-transform": "translateZ(-50px)  scale(1.0)",
								"background": "#fff000",
								"-webkit-transition": "all 0."+Math.floor((Math.random()*19)+1)+"s ease-out",
								"-moz-transition": "all 0."+Math.floor((Math.random()*19)+1)+"s ease-out"
							});

						});

					},options.AppTimerFloor);
				}

			}

			///////////////////////////////////////////////////////////////////////////////////////////////
			//
			//	loopAnimationIn
			//
			///////////////////////////////////////////////////////////////////////////////////////////////

			$.loopAnimationIn = function(loop_id){

				$.loopAnimationClean();

				if( $.cookie("AutoLoop")=="false" ){
					$.loopAnimationOut("false");
				}

				//var effect = "perspective"; // rotate scale perspective
				//console.log(options.AppTransition)

				if(options.AppTransition){
					$.fxAnim(options.AppTransition);
				}
				else{
					$.fxAnim();
				}
			
				
				// random positions outside of view
				$.each(arPos[loop_id],function(key, value)
				{
					//console.log( 1900 *  (parseInt(Math.random()*2) - 1 | 1) )

					$("#draggable-"+loop_id+''+key).css({
							opacity: 0.0,
							"top":  0,
							"left": 1900 *  (parseInt(Math.random()*2) - 1 | 1)
					});

					if(options.AppAngle=="45"){
						$("#draggable-"+loop_id+''+key).css({
							"-moz-transform": "scale(1.0) rotateY(-40deg) rotateX(30deg) skew(25deg, 20deg)",
							"-webkit-transform": "scale(1.0) rotateY(-40deg) rotateX(30deg) skew(25deg, 20deg)"
						});
					}

				});

				setTimeout(function(){

					$.each(arPos[loop_id],function(key, value)
					{

						$("#draggable-"+loop_id+''+key).stop(false,true).animate({
								opacity: 1.0,
								left: ( centerX + (arPos[loop_id][key]["X"]) * -1 ), // 
								top:  ( centerY + (arPos[loop_id][key]["Y"]) * -1 )  // 
							},
							{
								duration: parseInt(key+"129"),
								specialEasing: {
								width: 'linear',
								height: 'easeOutBounce'
							},
							complete: function() {

							}
						});

					});

				},50);

				if( $.cookie("AutoLoop")=="true" ){

					setTimeout(function(){
						$.loopAnimationOut();
					},options.AppTimerSlide);

				}
				
			}

			///////////////////////////////////////////////////////////////////////////////////////////////
			//
			//	loopAnimationOut
			//
			///////////////////////////////////////////////////////////////////////////////////////////////

			$.loopAnimationOut = function(status){
			
				var obEl = $('.ui-widget-content');
				$.each(obEl,function(key, value)
				{
					$(this).stop(false,true).animate({
							opacity: 0.0
							//left: 1 *  (parseInt(Math.random()*2) - 1 | 1),
							//top: 0,
							//left: '+=50',
							//height: 'toggle'
						}, 1390, 'linear', function() {
							// Animation complete.
						}
					);
				});

				if(status!="false"){

					setTimeout(function(){
						$._initSlide();
					},500);
				}
			}

			///////////////////////////////////////////////////////////////////////////////////////////////
			//
			//	loopAnimationOut
			//
			///////////////////////////////////////////////////////////////////////////////////////////////

			$.loopAnimationClean = function(status){
			
				var obEl = $('.ui-widget-content');
				$.each(obEl,function(key, value)
				{
					$(this).stop(false,true).animate({
							opacity: 0.0
							//left: 1 *  (parseInt(Math.random()*2) - 1 | 1),
							//top: 0,
							//left: '+=50',
							//height: 'toggle'
						}, 10, 'linear', function() {
							// Animation complete.
						}
					);
				});
				
			}
			

			///////////////////////////////////////////////////////////////////////////////////////////////
			//
			//	Edit elements by drag & drop
			//
			///////////////////////////////////////////////////////////////////////////////////////////////

			$(function() {

				var infoHTML = '<div><hr /><br /> uncompressed source: <br /><a href="pixelart45-slide.js">pixelart45-slide.js</a></div> <br /><br />';

				$( "#status" ).html("<b>PixelArt45 <br /> jQuery Plugin</b> <br />");
				$( "#status" ).append(infoHTML);

				$( "#status" ).click( function(){
					$( ".ui-widget-content").css({ "border": "0px none","cursor":"pointer" });
				});

				$( ".ui-widget-content" ).click( function(){

					
					$.cookie("AutoLoop","false");
					
					var container = $(this).attr("id");
					$(this ).draggable();
					
					$( ".ui-widget-content").css({ "border": "1px solid red","cursor":"pointer" });

					// MOUSE POSITION 
					jQuery(document).mousemove(function(e) {
						
						//e.preventDefault();
						var p = jQuery("#"+container);
						//var p = $("#erdgeschoss");
						var position = p.position();
						var offset = p.offset();

						var statusHTML ="<b>PixelArt45 <br />jQuery Plugin</b> <br /><br />";
							
						//statusHTML = '#'+container+ '<br />__ e.pageY('+ Math.floor(e.pageY - offset.top) +') ___ e.pageX('+ Math.floor(e.pageX - offset.left)+ ')';
						//statusHTML+= '<br />__ e.clientY('+e.clientY+') ___ e.clientX('+ e.clientX+')';
						//statusHTML+= ' __ position.top('+Math.floor(position.top)+'), ___position.left('+ Math.floor(position.left)+')';
						//statusHTML+= '<br />__ position.top('+ parseInt(centerY - Math.round(position.top+20))*1 +'), ___position.left('+ parseInt(centerX - Math.round(position.left-25))*1+')';
						
						statusHTML+= '<hr />#'+container+ ' <br />  AutoLoop: '+$.cookie("AutoLoop")+'<br />';
						statusHTML+= '___position.left('+ parseInt(centerX - Math.round(position.left-25))*1+')';
						statusHTML+= '<br />__ position.top('+ parseInt(centerY - Math.round(position.top+20))*1 +')';
						
						/*console.clear();
						console.log( jQuery("#"+container).css("left") )
						console.log( jQuery("#"+container).css("top") )
						console.log( container )*/

						$.each(arPos,function(key, value)
						{
							//console.log( key +'...'+value)
							statusHTML+= '<br /><a href="javascript:void(0)" onclick="$.loopAnimationIn('+key+')">Edit Slide Loop '+key+'</a>';
						});

						$('#status').html(statusHTML);
						$( "#status" ).append(infoHTML);
						//$('#status').html( 'T'+  (e.pageY- offset.top) +'___ L'+ (e.pageX-offset.left)+ '..--..T.'+e.clientY+',L'+ e.clientX+'..' ); // STATUS
					});
				});


				$( ".ui-navi-content" ).click( function(){
					
				});

			});

		}

	})(jQuery);
