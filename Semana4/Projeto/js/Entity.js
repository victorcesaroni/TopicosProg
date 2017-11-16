function Entity(origin, sprite) {
    this.team = 0;
    this.origin = origin;
    this.offset = new Vector(0, 0);
    this.sprite = sprite;
    this.health = 100;
    this.hungry = 0;
    this.thirst = 0;
    this.weapon = null;
    this.targetPos = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.target = null;
    this.trackSpeed = 30 / 1000;
    this.trackMinDistance = 10;    
    this.bbMin = sprite ? new Vector(-sprite.width * sprite.scale / 2, -sprite.height * sprite.scale / 2) : new Vector(0, 0);
    this.bbMax =  sprite ? new Vector(sprite.width * sprite.scale / 2, sprite.height * sprite.scale / 2) : new Vector(0, 0);
    this.colliding = false;
}

Entity.prototype.updateScale = function(scale) {
    this.scale = scale;
    this.sprite.scale = scale;    
    this.bbMin = this.sprite ? new Vector(-this.sprite.width * this.sprite.scale.x / 2, -this.sprite.height * this.sprite.scale.y / 2) : new Vector(0, 0);
    this.bbMax =  this.sprite ? new Vector(this.sprite.width * this.sprite.scale.x / 2, this.sprite.height * this.sprite.scale.y / 2) : new Vector(0, 0);
}

Entity.prototype.move = function(to) {
    this.origin = to.clone().multiply(game.world.scale);
}

Entity.prototype.frame = function() {
    this.sprite.frame();
}

Entity.prototype.draw = function() {
    if (this.sprite) {
        this.sprite.draw(this.origin.x + this.offset.x, this.origin.y + this.offset.y);
    }

    var width = this.bbMax.x - this.bbMin.x
    var height = this.bbMax.y - this.bbMin.y;
    
    //if (this.colliding)
        //draw.drawRectangle(this.colliding ? "#000000" : "#00FF00", this.origin.x, this.origin.y, width, height, 1);
    //draw.drawRectangle("#000000", this.origin.x, this.origin.y - 3 - 5, width, 5, 1);
    //draw.drawFilledRectangle(draw.rgb2hex(255 - 255 * this.health / 100, 255 * this.health / 100, 0), this.origin.x, this.origin.y - 3 - 5, width * this.health / 100, 5);

}

Entity.prototype.attack = function(entity) {
    entity.health -= this.weapon.damage;
}

Entity.prototype.track = function() {
    if (this.target) {
        var predictedOrigin = this.target.origin.clone().add(this.velocity.clone().multiply(game.tickInterval * 500));

        if (this.target.origin.clone().subtract(this.origin.clone()).length() > this.trackMinDistance) {
            this.velocity = (predictedOrigin.clone().subtract(this.origin)).normalize().multiply(this.trackSpeed);
        } else {
            this.velocity = new Vector(0, 0);
        }
    }
}

Entity.prototype.tick = function() {
    this.origin.add(this.velocity.clone().multiply(game.tickInterval).multiply(game.world.scale));
}

Entity.prototype.checkCollision = function(e) {
    var width = this.bbMax.x - this.bbMin.x
    var height = this.bbMax.y - this.bbMin.y;

    var widthE = e.bbMax.x - e.bbMin.x
    var heightE = e.bbMax.y - e.bbMin.y;

    return this.origin.x < e.origin.x + widthE &&
        this.origin.x + width > e.origin.x &&
        this.origin.y < e.origin.y + heightE &&
        height + this.origin.y > e.origin.y;
}