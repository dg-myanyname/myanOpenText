(function($) {
	$(document).ready(function(){
		var minHeight = 90,
			timeOut = 1000,
			$body = $("html, body");;
		setTimeout(function() {
			$('.my-open-text').each(function(indx){
				var customMinHeight = $(this).attr('min-height');
				if(customMinHeight) minHeight = parseInt(customMinHeight, 10);
				$(this).attr('full-height', $(this).height());
				$(this).css('height', minHeight);
				var btn = $(this).parent('.slide-text-wrapper').find('.my-open-text-btn');
				if (btn.data('closebtnname')) btn.data('btnName', btn.text());
			});
		}, 100);
		$('.my-open-text-btn').click(function(){
			var textCaption = $(this).parents('.slide-text-wrapper').find('.my-open-text'),
				fullHeight = textCaption.attr('full-height');
			if(textCaption.height() <= minHeight){
				textCaption.animate({height: fullHeight}, timeOut);
				textCaption.addClass('open-text-show');
				if ($(this).data('closebtnname')) {
					$that = $(this);
					setTimeout(function(){
						$that.text($that.data('closebtnname'))
					}, timeOut);
				}
			} else {
				textCaption.animate({height: minHeight}, timeOut);
				textCaption.removeClass('open-text-show');
				var scrollTo = textCaption.offset().top;
				$body.stop().animate({scrollTop:scrollTo}, timeOut);
				if ($(this).data('closebtnname')) {
					$that = $(this);
					setTimeout(function(){
						$that.text($that.data('btnName'));
					}, timeOut)
				}
			}
		});
	});
})(jQuery);