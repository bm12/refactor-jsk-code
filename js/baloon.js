//const mq768 =  window.matchMedia( "(min-width:768px)" );
function baloonInit() {
	var baloonWidth = $('.sec-1-icn[data-for=1]')[0].getBoundingClientRect().width/2;
	$('.baloon').each(function() {
		var forIcn = $(this).attr('data-for');
		var $secIcn = $('.sec-1-icn[data-for='+forIcn+']');
		var offset = $secIcn.offset();

		var baloonTop = offset.top-40;
		var baloonleft = offset.left + baloonWidth;


		$(this).css({
			top: baloonTop+'px',
			left: baloonleft+'px'
		});
		$(this).fadeIn(250);
	});
}

var image = document.createElement('img');
image.src = $('.svg-wrap #main-svg-img').attr('xlink:href');
image.onload = function() {
	baloonInit();
}
$(window).on('resize', function() {
	if ($('.baloon:visible').length){
		baloonInit();
	}
});