(function($) {
	$(document).ready(function(){
		var minHeight = 90,
			timeOut = 1000;
		$('.my-open-text').each(function(indx){
			var customMinHeight = $(this).attr('min-height');
			if(customMinHeight) minHeight = parseInt(customMinHeight, 10);
			$(this).attr('full-height', $(this).height());
			$(this).css('height', minHeight);
			var btn = $(this).parent('.slide-text-wrapper').find('.my-open-text-btn');
			if (btn.data('closebtnname')) btn.data('btnName', btn.text());
		});
		$('.my-open-text-btn').click(function(){
			var textCaption = $(this).parents('.slide-text-wrapper').find('.my-open-text');
			if(textCaption.height() <= minHeight){
				var fullHeight = textCaption.attr('full-height');
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
