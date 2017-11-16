function createCanvas() {
	resizeCanvas();
	drawScene();
}

function resizeCanvas() {
	var c = document.getElementById("main-canvas");

	c.width = window.innerWidth - 6;
	c.height = window.innerHeight - 6;

	game.world = null;
}

function onClick() {

}

function rgb2hex(red, green, blue) {
	var rgb = blue | (green << 8) | (red << 16);
	return '#' + (0x1000000 + rgb).toString(16).slice(1)
}

var fpsTimer = new Timer(1000);
var fixedTimeTimer = new Timer(game.tickInterval);
var mainPlayer = new Entity(0, new Vector(0, 0), game.mainPlayerSprite);
var npc = new Entity(0,new Vector(500,220),game.npcSprite);
var mouseEntity = new Entity(-1, new Vector(0, 0), null);
var hud = new Hud(mainPlayer, null);

var enemyList = [
	new Enemy(1, new Vector(0, 0), game.zombieSprite),
	new Enemy(2, new Vector(10, 0), game.zombieSprite),
	new Enemy(3, new Vector(500, 300), game.zombieSprite),
	new Enemy(4, new Vector(200, 100), game.zombieSprite),
];





enemyList.forEach(function(element) {
	game.entityList.push(element);
}, this);

game.entityList.push(mainPlayer);

game.entityList.push(npc);

var fps = 0;
var frameCount = 0;

function drawScene() {
	var requestAnimationFrame = 
		window.requestAnimationFrame || 
		window.mozRequestAnimationFrame || 
		window.msRequestAnimationFrame;
	
	var c = document.getElementById("main-canvas");
	
	var ctx = c.getContext("2d");
	
	game.time = +new Date();    
	game.ctx = ctx;
	game.canvas = c;
	
	initInput(c);

	ctx.clearRect(0, 0, c.width, c.height);

	if (game.world == null) {
		game.world = new World(30, 30, 0, 0, c.width, c.height, 30, 30);
		game.world.readMap();
	}

	game.world.scale = 
		new Vector(game.world.camWidth / (game.world.tileSize * game.world.tilesPerScreenX), 
			game.world.camHeight / (game.world.tileSize * game.world.tilesPerScreenY));

	game.entityList.forEach(function(a) {
		if (a.health > 0) {
			if (a.sprite == game.zombieSprite) {
				a.updateScale(new Vector(0.05, 0.05).multiply(game.world.scale));
			}
			else if (a.sprite == game.mainPlayerSprite) {
				a.updateScale(new Vector(0.25, 0.25).multiply(game.world.scale));
			}

			else if (a.sprite == game.npcSprite){
				a.updateScale(new Vector(0.25,0.25).multiply(game.world.scale));
			}
		}
	}, this);

	game.world.draw();

	game.staticSprites.forEach(function(element) {
		element.frame();
	}, this);

	for (var x = 0; x < c.width; x += 500) {
		for (var y = 0; y < c.height; y += 500) {
			game.coinSprite.draw(x, y);
		}	
	}

	mouseEntity.origin = input.mousePos.clone();

	if (mainPlayer.health < 0)
		mainPlayer.health = 0;

	if (mainPlayer.health > 0) {
		mainPlayer.target = mouseEntity;
		mainPlayer.frame();
		mainPlayer.draw();	

		var last = null;

		enemyList.forEach(function(element) {
			if (element.health > 0) {
				element.target = mainPlayer;//last == null ? mainPlayer : last;
				element.frame();
				element.draw();
				last = element;
			}
		}, this);

		if(npc.health>0){
		npc.frame();
		npc.draw();
		npc.target = mainPlayer;
		npc.trackSpeed = (12 + Math.floor(Math.random() * 5)) / 1000;;


		}
	


	} else {
		draw.strokeText("#000000", "GAME OVER", c.width / 2 - 123, c.height / 2 + 8, 40, 5);
		draw.drawText("#FFFF00", "GAME OVER", c.width / 2 - 123, c.height / 2 + 8, 40);
	}

	hud.draw();

	draw.strokeText("#000000", fps + " FPS (" + input.mousePos.x + ", " + input.mousePos.y + ")", 20, 30, 23, 4);
	draw.drawText("#FFFFFF", fps + " FPS (" + input.mousePos.x + ", " + input.mousePos.y + ")", 20, 30, 23);

	if (input.lastClickTime + 500 >= +new Date()) {
		draw.drawFilledRectangle("#000000", input.mousePos.x - 6, input.mousePos.y - 6, 12, 12);
		draw.drawFilledRectangle("#FFFFFF", input.mousePos.x - 3, input.mousePos.y - 3, 6, 6);
	}

	frameCount++;

	if (fpsTimer.isReady()) {       
		fps = frameCount * 1;
		frameCount = 0;
	}

	if (fixedTimeTimer.isReady()) {
		fixedTimeTick();

		for (var i = 0; i < fixedTimeTimer.stuckCount(); i++)
			fixedTimeTick();       
	}

	fpsTimer.step();
	fixedTimeTimer.step();

	requestAnimationFrame(drawScene);
}

var x = 0;
var y = 0;

function fixedTimeTick() {
	var c = document.getElementById("main-canvas");
	
	mainPlayer.track();
	mainPlayer.tick();

	npc.track();	
	npc.tick();
	
	
	/*if (Math.floor(Math.random() * 10) == 0) 
	{
		x += 120 / (1000 / game.tickInterval); // 120px per second
		
		if (Math.floor(Math.random() * 10) == 0) 
			y += 70 / (1000 / game.tickInterval);		
		mainPlayer.move(new Vector(x % c.width, y % c.height));
	}*/


	if (Math.trunc(npc.origin.x) == Math.trunc(mainPlayer.origin.x) || Math.trunc(npc.origin.y) == Math.trunc(mainPlayer.origin.y)){
		if(mainPlayer.health<100){
			mainPlayer.health += Math.floor(Math.random() * 5);
		}
	}



	game.entityList.forEach(function(e) {
		e.colliding = false;
	}, this);

	game.entityList.forEach(function(a) {
		if (a.health > 0) {
			game.entityList.forEach(function(b) {
				if (b.health > 0) {
					if (a.id != b.id && a.team != b.team) {
						if (a.checkCollision(b)) {
							a.colliding = true;
						}
					}
				}
			}, this);
		}
	}, this);

	if(npc.colliding){
		npc.health -= Math.floor(Math.random() * 5);
	
	
	}

	enemyList.forEach(function(e) {
		if (e.health > 0) {
			//if (Math.floor(Math.random() * 80) == 0) 
				e.track();

			if (e.colliding ) {
				if (Math.floor(Math.random() * 10) == 0) {
					//e.velocity.x = 0;
					//e.velocity.y = 0;
					e.health -= Math.floor(Math.random() * 10);
					mainPlayer.health -= Math.floor(Math.random() * 5);
					
				
				}
				
			}

			e.tick();
		}
	}, this);



}
