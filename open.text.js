(function($) {
	$(document).ready(function(){
		var minHeight = 90;
		$('.my-open-text').each(function(indx){
			var customMinHeight = $(this).attr('min-height');
			if(customMinHeight) minHeight = parseInt(customMinHeight, 10);
			$(this).attr('full-height', $(this).height());
			$(this).css('height', minHeight);
		});
		$('.my-open-text-btn').click(function(){
			var textCaption = $(this).parents('.slide-text-wrapper').find('.my-open-text');
			if(textCaption.height() <= minHeight){
				var fullHeight = textCaption.attr('full-height');
				textCaption.animate({height: fullHeight}, 1000);
				textCaption.addClass('open-text-show');
			} else {
				textCaption.animate({height: minHeight}, 1000);
			}
		});
	});
})(jQuery);	
