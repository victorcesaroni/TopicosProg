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
		new GameObject(new Vector(0,0), this.tileSize, this.scale, "img/grama.jpg"),
		new GameObject(new Vector(0,0), this.tileSize, this.scale, "img/cimento.png"),
	];
}

World.prototype.readMap = function() {
	for (var x = 0; x < this.sizeX; x++) {
		for (var y = 0; y < this.sizeY; y++) {
			this.addObject(0, x, y);
		}
	}

	for (var x = 5; x < 7; x++) {
		for (var y = 0; y < this.sizeY; y++) {
			this.addObject(1, x, y);
		}
	}
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
