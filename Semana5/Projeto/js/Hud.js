function Hud(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
}

Hud.prototype.draw = function() {
    if (game.started == false) {
        if (this.player1) {
            var width = game.world.camWidth / 2 - 10;
            var height = 20;        
            var x = 10;
            var y = game.world.camHeight - 10 - height;

            draw.strokeText("#000000", "Inimigos Eliminados: "+ this.player1.point, x, y + height - 60, 26, 4);
            draw.drawText("#FFFFFF", "Inimigos Eliminados: "+ this.player1.point, x, y + height - 60, 26);
        }
    } else {
        if (this.player1) {
            var width = game.world.camWidth / 2 - 10;
            var height = 20;        
            var x = 10;
            var y = game.world.camHeight - 10 - height;

            draw.drawRectangle("#000000", x, y, width, height, 1);
            draw.drawFilledRectangle("#00000050", x, y, width, height, 1);
            draw.drawFilledRectangle(draw.rgb2hex(255 - 255 * this.player1.health / 100, 255 * this.player1.health / 100, 0), x, y, width * this.player1.health / 100, height);
            
            draw.strokeText("#000000", "Jogador", x, y + height - 30, 26, 4);
            draw.drawText("#FFFFFF", "Jogador", x, y + height - 30, 26);

            draw.strokeText("#000000", "Inimigos Eliminados: "+ this.player1.point, x, y + height - 60, 26, 4);
            draw.drawText("#FFFFFF", "Inimigos Eliminados: "+ this.player1.point, x, y + height - 60, 26);

            draw.strokeText("#000000", Math.floor(this.player1.health) + "HP", x + 5, y + height - 5, 12, 4);
            draw.drawText("#FFFFFF", Math.floor(this.player1.health) + "HP", x + 5, y + height - 5, 12);   
            
            height = 20;
            x = game.world.camWidth / 4 + 5;
            y = game.world.camHeight - 10 - 40 - 1 - 13;
        
            draw.drawRectangle("#000000", x, y, width / 2, height, 1);
            draw.drawFilledRectangle("#00000050", x, y, width / 2, height, 1);
            draw.drawFilledRectangle(draw.rgb2hex(50, 50, 255 * this.player1.thirst / 100), x, y, width / 2 * this.player1.thirst / 100, height);

            height = 20;
            x = game.world.camWidth / 4 + 5;
            y = game.world.camHeight - 10 - 60 - 1 - 13;
    
            draw.drawRectangle("#000000", x, y, width / 2, height, 1);
            draw.drawFilledRectangle("#00000050", x, y, width / 2, height, 1);
            draw.drawFilledRectangle(draw.rgb2hex(255 * this.player1.hungry / 100, 255 * this.player1.hungry / 100, 50), x, y, width / 2 * this.player1.hungry / 100, height);
            
            height = 20;
            x = game.world.camWidth / 4 + 5;
            y = game.world.camHeight - 10 - 40 - 1 - 13;

            draw.strokeText("#000000", "Sede " + Math.floor(this.player1.hungry) + "%", x + 5, y + 15, 12, 3);
            draw.drawText("#FFFFFF", "Sede " + Math.floor(this.player1.thirst) + "%", x + 5, y + 15, 12); 

            height = 20;
            x = game.world.camWidth / 4 + 5;
            y = game.world.camHeight - 10 - 60 - 1 - 13;

            draw.strokeText("#000000", "Fome " + Math.floor(this.player1.hungry) + "%", x + 5, y + 15, 12, 3);
            draw.drawText("#FFFFFF", "Fome " + Math.floor(this.player1.hungry) + "%", x + 5, y + 15, 12);
        }

        if (this.player2) {

        }
    }
}
