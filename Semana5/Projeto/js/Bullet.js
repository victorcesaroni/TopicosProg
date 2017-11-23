function Bullet(origin, sprite, velocity, liveTime) {
    Entity.call(this, origin, sprite);
    this.team = 2;
    this.velocity = velocity;
}

Bullet.prototype = Object.create(Entity.prototype);
Bullet.prototype.constructor = Entity;

Bullet.prototype.draw = function() {
    Entity.prototype.draw.apply(this, arguments);

    var width = this.bbMax.x - this.bbMin.x
    var height = this.bbMax.y - this.bbMin.y;

    if (this.colliding)
        draw.drawRectangle(this.colliding ? "#FF00FF" : "#000000", this.origin.x, this.origin.y, width, height, 1);
    
    //draw.drawRectangle("#000000", this.origin.x, this.origin.y - 3 - 5, width, 5, 1);
    //draw.drawFilledRectangle(draw.rgb2hex(255 - 255 * this.health / 100, 255 * this.health / 100, 0), this.origin.x, this.origin.y - 3 - 3, width * this.health / 100, 3);

    /*var vel = this.velocity.clone().normalize();
    var speed = this.velocity.clone().length() * 200;
    draw.drawLine("black", this.origin.x, this.origin.y, this.origin.x + vel.x * speed, this.origin.y + vel.y * speed, 1);*/

}