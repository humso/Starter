window.onload = function() {
	console.log('JS is working');
};




// toggle grid overlay

$(function() {
	var toggle = function() {
		var on = false;
		return function() {
			if(!on) {
				on = true;
				// Do stuff if ON
				console.log("click on");
				$(".grid--overlay").addClass("hide");
				return;
			}
			// Do stuff if OFF
			console.log("click off");
			$(".grid--overlay").removeClass("hide");
			on = false;
		};
	}();

	toggle(); // Set OFF as default

	document.addEventListener('keydown', function(e) {
		var key = e.keycode || e.which;
		if (key === 71) {
			toggle();
		}
	}, false);

});
