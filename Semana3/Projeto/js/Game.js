function Game() {
    this.tickInterval = 1000.0 / 64;
    this.time = 0;
    this.ctx = null;
    this.canvas = null;
    this.coinSprite = new Sprite("img/coin-sprite.png", 440, 40, 0.5, 10, 0, 5);
    this.mainPlayerSprite = new Sprite("img/main-player.png", 229, 144 / 2, 1, 7, 1, 20);
    this.zombieSprite = new Sprite("img/walkingdead.png", 2000, 312, 0.17, 10, 0, 20);
    this.entityList = [];
            
    this.staticSprites = [
         this.coinSprite,
    ];

    this.world = null;
}

var game = new Game();
