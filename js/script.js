history.pushState(null, "", " ");
$(document).ready(function() {
	let headerH = $('header.header').height();
	let offset = $('#fixed').offset();
	
	
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
        let myMap;
        ymaps.ready(init); // Ожидание загрузки API с сервера Яндекса
        function init () {
            myMap = new ymaps.Map("map", {
              center: [x, y], // Координаты центра карты
              zoom: 16 // Zoom
            });
            let myPlacemark = new ymaps.GeoObject({
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
	
	/*
	*
	* checking for a match to the current page
	* проверка на совпадение с текущей страницей
	*
	*/
	function isCurrentPage(pageName) {
		return $('.other_page').attr('data-curr-page') === pageName;
	}
	
	/*
	*
	*
	* запись перехода в историю
	*
	*/
	function updateState(page, pageName) {
		var stateObj = {
			page: page,
			pageName: pageName 
		};
		history.pushState(stateObj, "", '/page/'+pageName);
	}
	
	
	/*
	*
	*
	*загрузка страниц меню
	*
	*/
	function loadPage(page, pageName) {
		$.ajax({
			type: 'GET',
			url: '/page/'+page,
			beforeSend: function() {
				$('body').addClass('other');
				$('.wrap-main').fadeOut(400);
				$('body').append('<img class="preloader" src="/slick-1.6.0/slick/ajax-loader.gif">');
			},
			success: function(data) {
				$('.preloader').remove();
				setTimeout(function() {
					$('.other_page').remove();
					$('body').append(data);
					svgView()
					$('.other_page').fadeIn(300).attr('data-curr-page', pageName);
				}, 0)
			}
		});
	}
	
	function showMainPage() {
		$('.other_page, .preloader').remove();
		$('.wrap-main').fadeIn(400);
	}
	$(window).on('popstate', function(event) {
		console.log(event.originalEvent);
		let state = event.originalEvent.state;
		
		if ( state != null ){
			loadPage(state.page, state.pageName);
		}else{
			showMainPage();
			console.log(state);
		}
	});
	
	$('.page-load').click(function(e) {
		let page = $(this).data('page');
		let pageName = $(this).data('page-name');
		
		
		if ( !isCurrentPage(pageName) ) {
			loadPage(page, pageName);
			updateState(page, pageName);
		}
		
		e.preventDefault();
	});
	
	$('.nav_a').click(function(e) {
		var elementClick = $(this).attr("href");
		e.preventDefault();
		if ( $('.other_page').length ) {
			$('.other_page').fadeOut(300,function() {
				$('.other_page, .preloader').remove();
				$('body').removeClass('other');
				$('.wrap-main').fadeIn(400);
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