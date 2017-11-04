window.onpopstate = function(event) {
	if ( event.state != null ){
		switch(event.state.page){
			case 'plan':
				$('body').attr('data-toplan','1');
				$('.header__nav .plan').trigger('click');
				console.log(event.state.page);
				break;
			case 'news':
				$('body').attr('data-toplan','1');
				$('.header__nav .news_a').trigger('click');
				console.log(event.state.page);
				break;
			case 'hod':
				$('body').attr('data-toplan','1');
				$('.header__nav .hod_build').trigger('click');
				console.log(event.state.page);
				break;
			case 'about':
				$('body').attr('data-toplan','1');
				$('.header__nav .about-us').trigger('click');
				console.log(event.state.page);
				break;
		}
	}else{
		if ( location.hash.match('#votcallback') === null){
			$('.header__nav .nav_a:first-child').click();
		}
		console.log(event.state);
	}
};
history.pushState(null, "", " ");
$(document).ready(function() {
	var headerH = $('header.header').height();
	var offset = $('#fixed').offset();
	
	
	$('.slick-slider').slick({
		lazyLoad: 'ondemand',
		prevArrow: '<button type="button" class="slick-prev"></button>',
		nextArrow: '<button type="button" class="slick-next"></button>',
		dots: true
	});
	
	$(".lazyload").lazyload({
		threshold : 355
	});
	
	function RunMaps(x,y) {
        var myMap;
        ymaps.ready(init); // Ожидание загрузки API с сервера Яндекса
        function init () {
            myMap = new ymaps.Map("map", {
              center: [x, y], // Координаты центра карты
              zoom: 16 // Zoom
            });
            var myPlacemark = new ymaps.GeoObject({
                geometry: {
                type: "Point",
                coordinates: [x, y]
            }});
            myMap.controls.add('zoomControl');
            myMap.geoObjects.add(myPlacemark);
        }
    }
	RunMaps(42.957352, 47.517645);
	
	$('body').on('mouseover','.plan_svg polygon.cls-14:not(.cls-cokol)',function(){
		var floor = $(this).attr('data-floor');
		
		$('.floor_current').html(floor);
		if (floor >= 10) {
			$('.floor_current').attr('transform', 'translate(749.47 578)');
		} else {
			$('.floor_current').attr('transform', 'translate(789.47 578)');
		}
		$('.choose_floor, .descr_choose_floor, .floor_cokol').css({display:'none'});
		$('.floor_current, .floor_curr_text, .arr_choose_floor').fadeIn(300);
	});
	$('body').on('mouseover','.plan_svg polygon.cls-cokol',function(){
		$('.choose_floor, .descr_choose_floor, .floor_current').css({display:'none'});
		$('.floor_cokol, .floor_curr_text, .arr_choose_floor').fadeIn(300);
	});
	
	
	$('body').on('click','.plan_svg polygon.cls-14',function() {
		var floor = $(this).attr('data-floor');
		
		$('.floor_info_wrapper').removeClass('cokol-choose');
		if (floor == 0){
			$('.floor_info_wrapper').addClass('cokol-choose');
		}else{
			$('.sel-floor').html(floor+'-ом');
		}
		
		$('.sel-floor-main').html(floor);
		$('.floor_info_wrapper').fadeIn(400);
		
	});
	
	
	$('body').on('click','.floor_info_close',function() {
		$('.floor_info_wrapper').fadeOut(400);
	});
	$('body').on('click','.floor_flats',function(e) {
		e.preventDefault();
		const mq1190 = window.matchMedia( "(max-width: 1190px)" );
		
		var rooms = $(this).attr('data-rooms');
		var square = $(this).attr('data-square');
		
		$('.flats_descr_room_count').html( rooms == 1 ? rooms+'-но' : rooms+'-ух' );
		$('.flats_descr_square').html( square+' м<sup>2</sup>' );
		
		var destination = $('.flats_descr').offset().top;
		if (mq1190.matches) {
			$('body, html').animate( { scrollTop: destination-headerH }, 300 );
		}
	});
	
	$('.plan').click(function(e) {
		if ($('.planirovka_wrap').length){
			e.preventDefault();
		}else{
			e.preventDefault();
			$.ajax({
				type: 'GET',
				url: 'php/plan.php',
				beforeSend: function() {
					$('body').addClass('other');
					$('body>section, body>div, body>footer')
						.not('.c4s-modal, .c4s-widget-btn-coral, .dont-touch, [id*=c4s]').fadeOut(400);
					$('body').append('<img class="preloader" src="/slick-1.6.0/slick/ajax-loader.gif">');
				},
				success: function(data) {
					
					if ( !$('body').attr('data-toplan') ){
						var stateObj = { page: "plan" };
						history.pushState(stateObj, "", "");
					}else{
						$('body').removeAttr('data-toplan');
					}
					
					
					$('.preloader').remove();
					setTimeout(function() {
						$('.other_page').remove();
						$('body').append(data);
						svgView()
						$('.planirovka_wrap').fadeIn(300);
					}, 0)
				}
			});
		}
	});
	$('.news_a').click(function(e) {
		if ($('.news').length){
			e.preventDefault();
		}else{
			e.preventDefault();
			$.ajax({
				type: 'GET',
				url: 'php/news.php',
				beforeSend: function() {
					$('body').addClass('other');
					$('body>section, body>div, body>footer')
						.not('.c4s-modal, .c4s-widget-btn-coral, .dont-touch, [id*=c4s]').fadeOut(400);
					$('body').append('<img class="preloader" src="/slick-1.6.0/slick/ajax-loader.gif">');
				},
				success: function(data) {
					if ( !$('body').attr('data-toplan') ){
						var stateObj = { page: "news" };
						history.pushState(stateObj, "", "");
					}else{
						$('body').removeAttr('data-toplan');
					}
					
					
					$('.preloader').remove();
					setTimeout(function() {
						$('.other_page').remove();
						$('body').append(data);
						$('.news').fadeIn(300);
					}, 0)
				}
			});
		}
	});
	$('.hod_build').click(function(e) {
		if ($('.building-wrap').length){
			e.preventDefault();
		}else{
			e.preventDefault();
			$.ajax({
				type: 'GET',
				url: 'php/building.php',
				beforeSend: function() {
					$('body').addClass('other');
					$('body>section, body>div, body>footer')
					.not('.c4s-modal, .c4s-widget-btn-coral, .dont-touch, [id*=c4s]').fadeOut(400);
					$('body').append('<img class="preloader" src="/slick-1.6.0/slick/ajax-loader.gif">');
				},
				success: function(data) {
					if ( !$('body').attr('data-toplan') ){
						var stateObj = { page: "hod" };
						history.pushState(stateObj, "", "");
					}else{
						$('body').removeAttr('data-toplan');
					}
					
					
					$('.preloader').remove();
					setTimeout(function() {
						$('.other_page').remove();
						$('body').append(data);
						$('.building-wrap').fadeIn(300);
					}, 0)
				}
			});
		}
	});
	$('.about-us').click(function(e) {
		if ($('.about').length){
			e.preventDefault();
		}else{
			e.preventDefault();
			$.ajax({
				type: 'GET',
				url: 'php/about.php',
				beforeSend: function() {
					$('body').addClass('other');
					$('body>section, body>div, body>footer')
					.not('.c4s-modal, .c4s-widget-btn-coral, .dont-touch, [id*=c4s]').fadeOut(400);
					$('body').append('<img class="preloader" src="/slick-1.6.0/slick/ajax-loader.gif">');
				},
				success: function(data) {
					if ( !$('body').attr('data-toplan') ){
						var stateObj = { page: "about" };
						history.pushState(stateObj, "", "");
					}else{
						$('body').removeAttr('data-toplan');
					}
					
					
					$('.preloader').remove();
					setTimeout(function() {
						$('.other_page').remove();
						$('body').append(data);
						$('.about').fadeIn(300);
					}, 0)
				}
			});
		}
	});
	
	$('.nav_a').click(function(e) {
		var elementClick = $(this).attr("href");
		e.preventDefault();
		if ( $('.other_page').length ) {
			$('.other_page').fadeOut(300,function() {
				$('.other_page, .preloader').remove();
				$('body').removeClass('other');
				$('body>section, body>div, body>footer')
					.not('.c4s-modal, .c4s-widget-btn-coral, .dont-touch, [id*=c4s]')
					.fadeIn(300);
				setTimeout(function() {
					baloonInit();
					var destination = $(elementClick).offset().top;
					$('body, html').animate( { scrollTop: destination-headerH }, 1000 );
				}, 301)
			})
		}else{
			var destination = $(elementClick).offset().top;
			$('body, html').animate( { scrollTop: destination-headerH }, 1000 );
		}
	});
	
	$('#mob_menu').click(function() {
		$('.mob_nav').addClass('active');
	});
	$('.mob_nav, .gumb').click(function(e) {
		e.preventDefault();
		$('.mob_nav').removeClass('active');
	});
	
	const mq900 = window.matchMedia( "(max-width:900px)" );
	
//	function swipe() {
		
		if (mq900.matches){
			$('.sec-7-img-wrap').on('mousedown touchstart', function(){
				console.log(1);
				$('.swipe-right').addClass('pressed');
			});
			$('.sec-7-img-wrap').on('mouseup touchend', function(){
				$('.swipe-right').removeClass('pressed');
			});
		}
//	}
//	mq900.addListener(swipe);
	
	function svgView() {
		if (mq900.matches){
			if ($('.plan_svg').length) {
				$('.plan_svg')[0].setAttribute("viewBox", '650 0 800 1081');
			}
		}else{
			if ($('.plan_svg').length) {
				$('.plan_svg')[0].setAttribute("viewBox", '0 0 1920 1081');
			}
		}
	}
	mq900.addListener(svgView);
	
	
	$('header.header').attr('id', 'fixed');
	$('body').css({paddingTop:headerH-1+'px'});
	//var topPadding = 0;
	function slickHead() {
		if ($(window).scrollTop() > 0) {
			//$('#fixed').stop().animate({marginTop: $(window).scrollTop() - offset.top + topPadding});
			$('body').addClass('scroll');
		}
		else {
			//$('#fixed').stop().animate({marginTop: 0});
			$('body').removeClass('scroll');
		}
	}
	slickHead();
	$(window).scroll(slickHead);
	
});
$('body').on('click', '.consultation', function(e) {
	e.preventDefault();
	$('.btn-call-onmain').trigger('click');
});