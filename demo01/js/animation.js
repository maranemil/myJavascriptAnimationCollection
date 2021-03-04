//(function () {

	///////////////////////////////////////////////////////////////////////////////
	//
	//	AnimateShowItems
	//
	///////////////////////////////////////////////////////////////////////////////
	
	function AnimateShowItems(){
		
		$('.layer1')
		.animate(
		{
				left: '440px',
				top: '195px'

		},
		{
				duration: 1400,
				easing: 'easeInOutQuad',
				complete: function () { 

					$('.layer1').animate({ opacity: '0.4'},{duration: 200});
					$('.layer1').delay(200).stop().animate({ opacity: '1.0'},{duration: 300});
				}
		}
		).css({"position":"absolute"});


		$('.layer2')
		.animate({
			left: '990px',
			top: '195px'
		},
		{
			duration: 1400,
			easing: 'easeInOutQuad',
			complete: function () { 

				//$('.layer2').animate({ opacity: '0.4'},{duration: 100});
				//$('.layer2').delay(100).stop().animate({ opacity: '1.0'},{duration: 300});

			}
		}).css({"position":"absolute"});


		$('.layer3').animate({
			top: '130px'
		},
		{
			duration: 1400,
			easing: 'easeInOutQuad',
			complete: function () { 

			}
		}).css({"position":"absolute"});

		$('.layer4').animate({
			top: '130px'
		},
		{
			duration: 700,
			easing: 'easeInOutQuad',
			complete: function () { 

			}
		}).css({"position":"absolute"});


		setTimeout( // setTimeout
			function (){
				AnimateHideItems();
			},4500
		)

	}

	///////////////////////////////////////////////////////////////////////////////
	//
	//	AnimateHideItems
	//
	///////////////////////////////////////////////////////////////////////////////

	function AnimateHideItems(){

		$('.layer1')
		.animate({
			left: '-550px'
		},
		{
			duration: 1400,
			easing: 'easeInOutQuad',
			complete: function () { 

			}
		});

		$('.layer2')
		.animate({
			left: '2450px'
		},
		{
			duration: 1300,
			easing: 'easeInOutQuad',
			complete: function () { 

			}
		});


		$('.layer3')
		.stop()
		.animate({
			top: '-550px'
		},
		{
			duration: 700,
			easing: 'easeInOutQuad',
			complete: function () { 
		
			}
		});

		$('.layer4')
		.stop()
		.animate({
			top: '-550px'
		},
		{
			duration: 1700,
			easing: 'easeInOutQuad',
			complete: function () { 
		
			}
		});



		var MaxLoop = $('.blurbHolder').length; 
		var IdCur = parseInt($('#slide').find("div.animSel").attr("id").replace("holder",""));
		var IdNxt = IdCur+1;

		if(IdNxt > MaxLoop){
			IdNxt = 1;
		}

		//console.log(IdCur+'....'+IdNxt)

		setTimeout( // setTimeout
			function (){
				
				$('#holder'+IdCur).removeClass("animSel");
				$('#holder'+IdNxt).addClass("animSel");

				$('#holder'+IdCur).css("display","none");
				$('#holder'+IdNxt).css("display","block");

			},2200
		)

		setTimeout( // setTimeout
			function (){
				AnimateShowItems();
			},900
		)

	}


//}); 

	///////////////////////////////////////////////////////////////////////////////
	//
	//	InitAnimation
	//
	///////////////////////////////////////////////////////////////////////////////

	jQuery(document).ready(function(){
		//$('.blurbHolder:first').css("display","block");
		$('.blurbHolder:first').addClass("animSel");
		$('#holder1').css("display","block");
		AnimateShowItems();
	}); 

//setInterval("OnloadAnimate()",2500);