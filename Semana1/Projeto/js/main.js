
function createCanvas() {
	resizeCanvas();
	drawScene();
}

function resizeCanvas() {
	var c = document.getElementById("main-canvas");

	c.width = window.innerWidth - 6;
	c.height = window.innerHeight - 6;
}

function rgb2hex(red, green, blue) {
	var rgb = blue | (green << 8) | (red << 16);
	return '#' + (0x1000000 + rgb).toString(16).slice(1)
}

var fpsTimer = new Timer(1000);
var fixedTimeTimer = new Timer(game.tickInterval);
var mainPlayer = new Entity(0, new Vector(0, 0), game.mainPlayerSprite);
var mouseEntity = new Entity(new Vector(0, 0), null);

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

	game.staticSprites.forEach(function(element) {
		element.frame();
	}, this);

	for (var x = 0; x < c.width; x += 500) {
		for (var y = 0; y < c.height; y += 500) {
			game.coinSprite.draw(x, y);
		}	
	}

	mouseEntity.origin = input.mousePos.clone();

	mainPlayer.target = mouseEntity;
	mainPlayer.frame();
	mainPlayer.draw();	

	var last = null;

	enemyList.forEach(function(element) {
		element.target = mainPlayer;//last == null ? mainPlayer : last;
		element.frame();
		element.draw();
		last = element;
	}, this);


	ctx.font = "23px Arial";
	ctx.fillStyle = rgb2hex(255, 0, 0);

	ctx.fillStyle = rgb2hex(255, 0, 0);
	ctx.fillText(fps + " FPS (" + input.mousePos.x + ", " + input.mousePos.y + ")", 20, 30);

	draw.drawFilledRectangle("#000000", input.mousePos.x - 3, input.mousePos.y - 3, 6, 6);

	//ctx.strokeText(fps + " FPS", 20, 30);

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
	
	/*if (Math.floor(Math.random() * 10) == 0) 
	{
		x += 120 / (1000 / game.tickInterval); // 120px per second
		
		if (Math.floor(Math.random() * 10) == 0) 
			y += 70 / (1000 / game.tickInterval);		
		mainPlayer.move(new Vector(x % c.width, y % c.height));
	}*/

	game.entityList.forEach(function(e) {
		e.colliding = false;
	}, this);

	game.entityList.forEach(function(a) {
		game.entityList.forEach(function(b) {
			if (a.id != b.id && a.team != b.team) {
				if (a.checkCollision(b)) {
					a.colliding = true;
				}
			}
		}, this);
	}, this);

	enemyList.forEach(function(e) {
		//if (Math.floor(Math.random() * 80) == 0) 
			e.track();

		if (e.colliding ) {
			if (Math.floor(Math.random() * 10) == 0) {
				//e.velocity.x = 0;
				//e.velocity.y = 0;
				e.health = Math.floor(Math.random() * 100);
			}
		}

		e.tick();
	}, this);
}
