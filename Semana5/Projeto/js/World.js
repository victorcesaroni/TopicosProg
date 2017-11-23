function World(sizeX, sizeY, camX, camY, camWidth, camHeight, tilesPerScreenX, tilesPerScreenY) {
	this.camWidth = camWidth;
	this.camHeight = camHeight;
	this.camPos = new Vector(camX, camY);
	this.objectList = [];
	this.tileSize = 10;
	this.tilesPerScreenX = tilesPerScreenX;
	this.tilesPerScreenY = tilesPerScreenY;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.camX = camX;
	this.camY = camY;

	this.scale = new Vector(1, 1);

	this.refreshObjects();
}

World.prototype.refreshObjects = function() {
	this.objectModels = [
		new GameObject(new Vector(0,0), this.tileSize, this.scale, "img/grass.png"),
		new GameObject(new Vector(0,0), this.tileSize, this.scale, "img/cimento.png"),
		new GameObject(new Vector(0,0), this.tileSize, this.scale, "img/rock.jpg"),
		new GameObject(new Vector(0,0), this.tileSize, this.scale, "img/sand.jpg"),
		new GameObject(new Vector(0,0), this.tileSize, this.scale, "img/wood.jpg"),
		new GameObject(new Vector(0,0), this.tileSize, this.scale, "img/brick.png"),
		new GameObject(new Vector(0,0), this.tileSize, this.scale, "img/stone.png"),
		
	];
}

var objectMap = [];
objectMap['G'] = 0;
objectMap['C'] = 1;
objectMap['R'] = 2;
objectMap['S'] = 3;
objectMap['W'] = 4;
objectMap['B'] = 5;
objectMap['P'] = 6;


World.prototype.readMap = function() {
	var map = 
	[ 
		"GGGGWCCWSSSSSSSSRSSSSSSSSSSSSSSS", 
		"GPGGWCCWSSSSSSSSSSSRSSSRSSSSSSSS", 
		"GGGGWCCWSSSSRSSSSSSRSSSSSSSSSRSS", 
		"GGGGWCCWSSSSSSSSSSSSSSSSSSSSSSSS", 
		"GGGGWCCWWWWWWWWWWWWWWWWWWWSSSSSS", 
		"GGGGWCCCCCCCCCCCCCCCCCCCCWSSSSSS", 
		"GGGGWCCCCCCCCCCCCCCCCCCCCWSSSSRS", 
		"GGGGWWWWWWWWWWWWWWWWWWWCCWSSSSSS", 
		"GGGGPGGGGGGGGGGGGGGGGGWCCWSSSSSS", 
		"GGGGGGGGGGGGGGGGGGGGGGWCCWSSRSSS", 
		"GGGGGGPGGGGGGGGGGGGGGGWCCWSSSSSS", 
		"GPGGGGGGGGGGGGGGGGGPGGWCCWSSSSRS", 
		"GGPGGGGGGGGGGGGGGGGGGGWCCWSSSSSS", 
		"GGGGGGGGGGGGGPGGGGGGGGWCCWSSSSSS", 
	]

	this.sizeX = map[0].length;
	this.sizeY = map.length;

	for (var x = 0; x < this.sizeX; x++) {
		for (var y = 0; y < this.sizeY; y++) {
			this.addObject(objectMap[map[y].charAt(x)], x, y);
		}
	}

	this.tilesPerScreenX = this.sizeX;
	this.tilesPerScreenY = this.sizeY;
}

World.prototype.addObject = function(objectModelIndex, x, y) {
	if (!this.objectList[x]) {
		this.objectList[x] = [];
	}

	var o = this.objectModels[objectModelIndex].copy();
	o.pos = new Vector(x, y);
	
	this.objectList[x][y] = o;
}

World.prototype.draw = function() {
	for (var x = this.camX; x < this.objectList.length; x++) {
		for (var y = this.camY; y <this.objectList[x].length; y++) {
			var e = this.objectList[x][y];			
			e.scale = this.scale;
			e.draw();			
		}
	}
}
