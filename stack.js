var DEFAULT_MARGIN_TOP = 50,
	DEFAULT_MARGIN_BOTTOM = 100,
	DEFAULT_SELECTED_SPACING = 400,
	DEFAULT_SELECTED_Z_FALLFOWARD = 250,
	DEFAULT_SELECTED_Z_FALLBACK = -100,
	DEFAULT_X_ROTATION = 80,
	DEFAULT_Z_ROTATION = 45;

function setPosition() {
	var $items = $('.item'),
		somethingSelected = $items.hasClass('selected'),
		spacing = ($(document).height() - DEFAULT_MARGIN_TOP - DEFAULT_MARGIN_BOTTOM - (somethingSelected ? DEFAULT_SELECTED_SPACING : 0)) / $items.length,
		fallback = (somethingSelected ? DEFAULT_SELECTED_Z_FALLBACK : 0),
		leftOffset = ($(document).width() - $items.width()) / 2;
	
	var currentSpacing = DEFAULT_MARGIN_TOP - $items.height() / 2;
	$items.each(function(index, el) {
		var $el = $(el);
		
		if ($el.hasClass('selected')) {
			currentSpacing += DEFAULT_SELECTED_SPACING * 3/8;
			$el.css({ '-webkit-transform': 'translate3d(' + leftOffset + 'px,' + currentSpacing + 'px,' + DEFAULT_SELECTED_Z_FALLFOWARD + 'px) rotateX(' + 0 + 'deg) rotateZ(' + 0 + 'deg)' });
			currentSpacing += DEFAULT_SELECTED_SPACING * 5/8;
		}
		else {
			$el.css({ '-webkit-transform': 'translate3d(' + leftOffset + 'px,' + currentSpacing + 'px,' + fallback + 'px) rotateX(' + DEFAULT_X_ROTATION + 'deg) rotateZ(' + DEFAULT_Z_ROTATION + 'deg)' });
			currentSpacing += spacing;
		}
	});
}

function setSelected(el) {
	$('.item').removeClass('selected');
	$(el).addClass('selected');
	setPosition();
}

$(document).ready(function() {
	var $items = $('.item');
	
	setPosition();
	
	$items.mouseover(function() {
		$(this).addClass('hover');
	});
	
	$items.mouseleave(function() {
		$(this).removeClass('hover');
	});
	
	$(document).click(function() {
		setSelected();
	});
	
	$items.click(function() {
		setSelected(this);
		return false;
	});
});