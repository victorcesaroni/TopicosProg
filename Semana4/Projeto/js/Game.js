function Game() {
    this.tickInterval = 1000.0 / 64;
    this.time = 0;
    this.ctx = null;
    this.canvas = null;

    this.coinSprite = new Sprite("img/coin-sprite.png", 440, 40, 0.5, 10, 0, 5);
    this.mainPlayerSprite = new Sprite("img/main-player.png", 229, 144 / 2, 1, 7, 1, 20);
    this.zombieSprite = new Sprite("img/walkingdead.png", 2000, 312, 0.17, 10, 0, 20);
    this.bulletSprite = new Sprite("img/bullet.png", 512, 512, 0.17, 1, 0, 20);
    
    this.coinSprite.id = 0;
    this.mainPlayerSprite.id = 1;
    this.zombieSprite.id = 2;
    this.bulletSprite.id = 3;

    this.entityList = [];
    this.bulletList = [];
    this.enemyList = [];
            
    this.staticSprites = [
         this.coinSprite,
    ];

    this.mainPlayer = new Entity(new Vector(0, 0), this.mainPlayerSprite.clone());
    this.controllerEntity = new Entity(new Vector(0, 0), null);

    this.world = null;
}

var game = new Game();
