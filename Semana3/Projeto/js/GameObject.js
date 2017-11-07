function GameObject(pos, size, scale, imageSrc) {
	this.pos = pos;
	this.image  = new Image(size, size);
	this.image.src = imageSrc;
	this.imageSrc = imageSrc;
	this.size = size;
	this.scale = scale;
}

GameObject.prototype.draw = function() {
	var a = this.size * this.scale.x;
	var b = this.size * this.scale.y;
	game.ctx.drawImage(this.image, this.pos.x * a, this.pos.y * b, a, b);
	//draw.drawRectangle("#000000", this.pos.x * a, this.pos.y * b, a, b, 1);
}

GameObject.prototype.copy = function() {
	return new GameObject(this.pos, this.size, this.scale, this.imageSrc);
}
