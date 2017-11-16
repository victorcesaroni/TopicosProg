function Input() {
	this.mousePos = new Vector(0, 0);
	this.initted = false;
	this.lastClickTime = +new Date();
}

var input = new Input();

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return new Vector(evt.clientX - rect.left, evt.clientY - rect.top);
}

function initInput(canvas) {
	if (!input.initted) {
		input.initted = true;
		canvas.addEventListener('mousemove',function(evt) {
			//input.mousePos = getMousePos(canvas, evt);
		}, false);

		canvas.addEventListener('click',function(evt) {
			input.mousePos = getMousePos(canvas, evt);
			input.lastClickTime = +new Date();
		}, false);
	}
}
