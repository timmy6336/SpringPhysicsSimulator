
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(function () {
	var gameEngine = new GameEngine();

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);
		
	new Scene(gameEngine);

	gameEngine.start();
});
