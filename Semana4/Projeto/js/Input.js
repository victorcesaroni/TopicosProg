function Input() {
	this.mousePos = new Vector(0, 0);
	this.initted = false;
	this.lastClickTime = +new Date();
	this.keyState = {};
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
			input.mousePos = getMousePos(canvas, evt);			
		}, false);

		canvas.addEventListener('mousedown',function(evt) {
			input.mousePos = getMousePos(canvas, evt);
			input.keyState['mouse1'] = 'keypress';

			input.lastClickTime = +new Date();		
		}, false);

		canvas.addEventListener('mouseup',function(evt) {
			input.mousePos = getMousePos(canvas, evt);
			input.keyState['mouse1'] = 'keyup';			
		}, false);

		document.addEventListener('keypress', (event) => {
			const keyName = event.key;
			input.keyState[keyName] = 'keypress';
		}, false);

		document.addEventListener('keyup', (event) => {
			const keyName = event.key;
			input.keyState[keyName] = 'keyup';			
		}, false);
	}
}
