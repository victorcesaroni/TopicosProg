function Sprite(imageSrc, width, height, scale, count, yIndex,  interval) {
    this.image  = new Image(width * count, height);
    this.image.src = imageSrc;
    this.count = count;
    this.interval = interval;
    this.height = height;
    this.width = width / count;
    this.xIndex = 0;
    this.yIndex = yIndex;
    this.frameCount = 0;
    this.scale = scale;   
}

Sprite.prototype.frame = function() {    
    this.xIndex = (Math.floor(this.frameCount / this.interval)) % this.count;
    this.frameCount++;
}

Sprite.prototype.draw = function(x, y) {
    //game.ctx.clearRect(x, y, this.width * this.scale, this.height * this.scale);
    game.ctx.drawImage(this.image, this.xIndex * this.width, this.yIndex * this.height, this.width, this.height, x, y, this.width * this.scale.x, this.height * this.scale.y);
}