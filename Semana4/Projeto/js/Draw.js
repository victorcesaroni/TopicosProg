function Draw() {
}

Draw.prototype.rgb2hex = function(red, green, blue) {
	var rgb = blue | (green << 8) | (red << 16);
	return '#' + (0x1000000 + rgb).toString(16).slice(1)
}

Draw.prototype.drawRectangle = function(color, x, y, h, w, weight) {
	game.ctx.beginPath();
	game.ctx.strokeStyle = color;
	game.ctx.lineWidth = weight;
	game.ctx.rect(x, y, h, w);
	game.ctx.stroke();
}

Draw.prototype.drawFilledRectangle = function(color, x, y, h, w) {	
	game.ctx.beginPath();
	game.ctx.fillStyle = color;
	game.ctx.rect(x, y, h, w);
	game.ctx.fill();
}

Draw.prototype.drawLine = function(color, x1, y1, x2, y2, weight) {
	game.ctx.beginPath();
	game.ctx.strokeStyle = color;
	game.ctx.lineWidth = weight;
	game.ctx.moveTo(x1, y1);
	game.ctx.lineTo(x2, y2);
	game.ctx.stroke();
}

Draw.prototype.drawText = function(color, text, x, y, size) {
	game.ctx.font = size + "px Arial";
	game.ctx.fillStyle = color;
	game.ctx.fillText(text, x, y);
}

Draw.prototype.strokeText = function(color, text, x, y, size, weight) {
	game.ctx.font = size + "px Arial";
	game.ctx.strokeStyle = color;
	game.ctx.lineWidth = weight;
	game.ctx.strokeText(text, x, y);
}


var draw = new Draw();
