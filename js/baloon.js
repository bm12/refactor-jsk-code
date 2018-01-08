//const mq768 =  window.matchMedia( "(min-width:768px)" );
function baloonInit() {
	const baloonWidth = $('.sec-1-icn[data-for=1]')[0].getBoundingClientRect().width/2;
	$('.baloon').each(function() {
		const forIcn = $(this).attr('data-for');
		const $secIcn = $('.sec-1-icn[data-for='+forIcn+']');
		const offset = $secIcn.offset();

		const baloonTop = offset.top-40;
		const baloonleft = offset.left + baloonWidth;


		$(this).css({
			top: baloonTop+'px',
			left: baloonleft+'px'
		});
		$(this).fadeIn(250);
	});
}

const image = document.createElement('img');
image.src = $('.svg-wrap #main-svg-img').attr('xlink:href');
image.onload = function() {
	baloonInit();
}
$(window).on('resize', function() {
	if ($('.baloon:visible').length){
		baloonInit();
	}
});