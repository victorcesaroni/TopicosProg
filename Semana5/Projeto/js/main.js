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
var hud = new Hud(game.mainPlayer, null);
var entitiIndex = 0;



game.entityList.push(game.mainPlayer);

var fired = false;

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
	
	if (game.enemyList.length == 0) {
		for (var i = 0; i < 30; i++) {

			var e = new Enemy(new Vector(Math.floor(Math.random() * game.world.camWidth),Math.floor(Math.random() * game.world.camHeight)), game.zombieSprite.clone());

			game.enemyList.push(e);
			game.entityList.push(e);
			
		}
	}


	

	if (game.npcList.length == 0) {
		for (var i = 0; i < 1; i++) {

			var e = new Npc(new Vector(Math.floor(Math.random() * game.world.camWidth),Math.floor(Math.random() * game.world.camHeight)), game.npcSprite.clone());

			game.npcList.push(e);
			game.entityList.push(e);
			
		}
	}


	if (game.foodList.length == 0) {
		for (var i = 0; i < 1; i++) {

			var e = new Enemy(new Vector(Math.floor(Math.random() * game.world.camWidth),Math.floor(Math.random() * game.world.camHeight)), game.foodSprite.clone());

			game.foodList.push(e);
			game.entityList.push(e);
			
		}
	}


	if (game.drinkList.length == 0) {
		for (var i = 0; i < 1; i++) {

			var e = new Enemy(new Vector(Math.floor(Math.random() * game.world.camWidth),Math.floor(Math.random() * game.world.camHeight)), game.drinkSprite.clone());

			game.drinkList.push(e);
			game.entityList.push(e);
			
		}
	}

	

	game.world.scale = 
		new Vector(game.world.camWidth / (game.world.tileSize * game.world.tilesPerScreenX), 
			game.world.camHeight / (game.world.tileSize * game.world.tilesPerScreenY));

	game.entityList.forEach(function(a) {
		if (a.health > 0) {
			if (a.sprite.id == game.zombieSprite.id) {
				a.updateScale(new Vector(0.05, 0.05).multiply(game.world.scale));
			}
			else if (a.sprite.id == game.mainPlayerSprite.id) {
				a.updateScale(new Vector(0.25, 0.25).multiply(game.world.scale));
			}


			else if (a.sprite.id == game.npcSprite.id) {
				a.updateScale(new Vector(0.25, 0.25).multiply(game.world.scale));
			}

			else if (a.sprite.id == game.foodSprite.id) {
				a.updateScale(new Vector(0.15, 0.15).multiply(game.world.scale));
			}

			else if (a.sprite.id == game.drinkSprite.id) {
				a.updateScale(new Vector(0.15, 0.15).multiply(game.world.scale));
			}
		}
	}, this);

	game.bulletList.forEach(function(e) {
		e.updateScale(new Vector(0.003, 0.003).multiply(game.world.scale));
	}, this);

	game.world.draw();

	game.staticSprites.forEach(function(element) {
		element.frame();
	}, this);

	game.bulletList.forEach(function(e) {
		e.frame();
		e.draw();
	}, this);

	if (game.mainPlayer.health < 0)
		game.mainPlayer.health = 0;

	if (game.mainPlayer.health > 0 && game.mainPlayer.hungry > 0 && game.mainPlayer.thirst > 0 ) {
		game.mainPlayer.target = game.controllerEntity;
		game.mainPlayer.frame();
		game.mainPlayer.draw();	

	
		var last = null;


		game.foodList.forEach(function(element){


			if(element.health > 0) {

			element.frame();
			element.draw();
				last = element;
			}


		},this);


		game.drinkList.forEach(function(element){
			
			
						if(element.health > 0) {
			
						element.frame();
						element.draw();
							last = element;
						}
			
			
					},this);




		game.enemyList.forEach(function(element) {
			if (element.health > 0) {
				element.target = game.mainPlayer;//last == null ? mainPlayer : last;
				element.frame();
				element.draw();
				last = element;
			}
		}, this);



		game.npcList.forEach(function(element) {
			if (element.health > 0) {
				element.target = game.mainPlayer;//last == null ? mainPlayer : last;
				element.frame();
				element.draw();
				last = element;
			}
		}, this);



	} else {
		draw.strokeText("#000000", "GAME OVER", c.width / 2 - 123, c.height / 2 + 8, 40, 5);
		draw.drawText("#FFFF00", "GAME OVER", c.width / 2 - 123, c.height / 2 + 8, 40);
		game.started = false;
	}

	hud.draw();

	draw.strokeText("#000000", fps + " FPS (" + Math.floor(input.mousePos.x) + ", " + Math.floor(input.mousePos.y) + ")", 20, 30, 23, 4);
	draw.drawText("#FFFFFF", fps + " FPS (" + Math.floor(input.mousePos.x) + ", " + Math.floor(input.mousePos.y) + ")", 20, 30, 23);

	if (input.lastClickTime + 500 >= +new Date()) {
		//draw.drawFilledRectangle("#000000", game.controllerEntity.origin.x - 6, game.controllerEntity.origin.y - 6, 12, 12);
		//draw.drawFilledRectangle("#FFFFFF", game.controllerEntity.origin.x - 3, game.controllerEntity.origin.y - 3, 6, 6);
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

var lastFireTime = +new Date();

var firing = false;

function fixedTimeTick() {
	if (!game.started)
		return;

	var c = document.getElementById("main-canvas");
	
	var move = game.mainPlayer.origin.clone();

	if (input.keyState['w'] === 'keypress') {
		move.add(new Vector(0, -100));	
	}
	if (input.keyState['s'] === 'keypress') {
		move.add(new Vector(0, 100));
	}
	if (input.keyState['d'] === 'keypress') {
		move.add(new Vector(100, 0));
	}
	if (input.keyState['a'] === 'keypress') {
		move.add(new Vector(-100, 0));									
	}

	if (input.keyState['mouse1'] === 'keypress') {
		firing = !firing;
	}

	// TODO: fazer classe Weapon e colocar isso la
	var fireDelay = input.keyState[' '] === 'keypress' ?  0 : 120;
	if (lastFireTime + fireDelay < +new Date()) {
		if (firing) {
			var bulletsPerShoot = input.keyState[' '] === 'keypress' ? 5 : 1;

			for (var i = 0; i < bulletsPerShoot; i++) {

				// cheat: aimbot
				if (input.keyState[' '] === 'keypress') {				
					var target = null;
					var dist = Infinity;

					game.enemyList.forEach(function(e) {
						var d = game.mainPlayer.origin.clone().subtract(e.origin).length();
						if (d < dist) {
							dist = d;
							target = e;
						}
					}, this);

					if (target) {
						input.mousePos = target.origin.clone().add(target.bbMax.clone().divide(2));
					}
				}

				var vel = input.mousePos.clone().subtract(game.mainPlayer.origin.clone().add(new Vector(20, 10))).divide(game.world.scale).normalize();
				
				vel.add(new Vector(Math.floor(Math.random() * 2) / 30, Math.floor(Math.random() * 2) / 30));

				vel.multiply((4 + Math.floor(Math.random() * 10)) / (1000 / game.tickInterval));
				game.bulletList.push(new Bullet(game.mainPlayer.origin.clone().add(new Vector(20, 10)), game.bulletSprite.clone(), vel));
			}
		}

		lastFireTime = +new Date();
	}

	game.controllerEntity.origin = move.clone();


	

	game.mainPlayer.track();
	game.mainPlayer.tick();
	
	/*if (Math.floor(Math.random() * 10) == 0) 
	{
		x += 120 / (1000 / game.tickInterval); // 120px per second
		
		if (Math.floor(Math.random() * 10) == 0) 
			y += 70 / (1000 / game.tickInterval);		
		mainPlayer.move(new Vector(x % c.width, y % c.height));
	}*/



	if(game.mainPlayer.hungry > 0 || game.mainPlayer.thirst>0){
		game.mainPlayer.hungry = game.mainPlayer.hungry - 0.05 ;
		game.mainPlayer.thirst =  game.mainPlayer.thirst - 0.05 ;
		
	}



	game.bulletList.forEach(function(e) {
		e.health -= 0.5;
		if (e.health <= 0) {
			  game.bulletList.splice(game.bulletList.indexOf(e), 1);
		}
	}, this);





	game.entityList.forEach(function(a) {
		if (a.health <= 0 ) {
			 game.entityList.splice(game.entityList.indexOf(a), 1);
			 
			 if (game.enemyList.indexOf(a) !== -1) {
				 game.enemyList.splice(game.enemyList.indexOf(a), 1);
				 game.mainPlayer.point++;
			 }

			 if (game.foodList.indexOf(a) !== -1) {
				game.foodList.splice(game.foodList.indexOf(a), 1);
				
			}


			if (game.drinkList.indexOf(a) !== -1) {
				game.drinkList.splice(game.drinkList.indexOf(a), 1);
				
			}

			if (game.npcList.indexOf(a) !== -1) {
				game.npcList.splice(game.npcList.indexOf(a), 1);
				
			}



		}
	}, this);





	game.bulletList.forEach(function(e) {
		e.tick();	
	}, this);

	game.enemyList.forEach(function(e) {
		//if (Math.floor(Math.random() * 80) == 0) 
			e.track();
		e.tick();
	}, this);


	game.npcList.forEach(function(e) {
			e.track();
		e.tick();
	}, this);

	game.entityList.forEach(function(e) {
		e.colliding = false;
	}, this);

	game.entityList.forEach(function(a) {
		game.entityList.forEach(function(b) {
			if (a != b && a.team != b.team) {
				if (a.checkCollision(b)) {
					a.colliding = true;
				}
			}
		}, this);
	}, this);



	game.entityList.forEach(function(a) {
		game.foodList.forEach(function(b) {
			if (a != b) {
				if (a.checkCollision(b)) {
					a.colliding = true;
					a.hungry = 100;
					b.health = 0;
					
				}
			}
		}, this);
	}, this);


	game.entityList.forEach(function(a) {
		game.drinkList.forEach(function(b) {
			if (a != b) {
				if (a.checkCollision(b)) {
					a.colliding = true;
					a.thirst = 100;
					b.health = 0;
					
				}
			}
		}, this);
	}, this);


	game.entityList.forEach(function(a) {
		game.npcList.forEach(function(b) {
			if (a != b) {
				if (a.checkCollision(b)) {
					a.colliding = true;

					if (b.healType == 0) {
						if(a.health <100)
						a.health += 0.08;
						else a.health = 100;
					} else {
						if(a.health <100)
						a.health -= 0.08;
						else a.health = 100;
						b.health -= 0.4;
					}					
				}
			}
		}, this);
	}, this);

	

	game.enemyList.forEach(function(a) {
		game.bulletList.forEach(function(b) {
			if (a != b) {
				if (a.checkCollision(b)) {
					a.colliding = true;
					a.health -= Math.floor(Math.random() * 10) * 0.1;
					b.health -= 10;
				}
			}
		}, this);
	}, this);

	game.entityList.forEach(function(a) {
		if (game.mainPlayer != a) {
			if (a.checkCollision(game.mainPlayer)) {
				game.mainPlayer.colliding = true;
				game.mainPlayer.health -= Math.floor(Math.random() * 10) * 0.01;
			}
		}
	}, this);



	game.npcList.forEach(function(a) {
		game.enemyList.forEach(function(b) {
			if (a != b) {
				if (a.checkCollision(b)) {
					a.colliding = true;
					a.health -= Math.floor(Math.random() * 10) * 0.1;
					
				}
			}
		}, this);
	}, this);






}
