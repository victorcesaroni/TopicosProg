function Hud(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
}

Hud.prototype.draw = function() {
    if (this.player1) {
        var width = game.world.camWidth / 2;
        var height = 20;
        var x = 10;
        var y = game.world.camHeight - 10 - height;

        draw.drawRectangle("#000000", x, y, width, height, 1);
        draw.drawFilledRectangle(draw.rgb2hex(255 - 255 * this.player1.health / 100, 255 * this.player1.health / 100, 0), x, y, width * this.player1.health / 100, height);
        
        draw.strokeText("#000000", "Jogador", x, y + height - 30, 26, 4);
        draw.drawText("#FFFFFF", "Jogador", x, y + height - 30, 26);

        draw.strokeText("#000000", this.player1.health + "HP", x + 5, y + height - 5, 12, 4);
        draw.drawText("#FFFFFF", this.player1.health + "HP", x + 5, y + height - 5, 12);        
    }

    if (this.player2) {

    }
}
