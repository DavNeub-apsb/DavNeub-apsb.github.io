var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;
  

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(false);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
function createGoblin(x,y){
  var enemy = game.createGameItem("enemy",25);
  var goblin = draw.bitmap("img/goblin.png");
  goblin.x = -60;
  goblin.y = -50;
  enemy.addChild(goblin);
  enemy.x = x;
  enemy.y = groundY - y;
  game.addGameItem(enemy);
  enemy.velocityX = -3;
  enemy.onProjectileCollision = function() {
    game.increaseScore(20);
    enemy.fadeOut();
    
  }
  enemy.onPlayerCollision = function() {
    game.changeIntegrity(-25);
  }

}
function createBomb(x,y){
  var hitZoneSize = 25;
  var damageFromObstacle = 10;
  var bombHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
  bombHitZone.x = x;
  bombHitZone.y = y;
  game.addGameItem(bombHitZone);
  var obstacleImage = draw.bitmap("img/bomb15.png");
  obstacleImage.x = -30;
  obstacleImage.y = -40;
  bombHitZone.addChild(obstacleImage);
}

function createMarker(x,y){
  var marker = game.createGameItem("marker",25);
  var yellowSquare = draw.rect(50, 50, "yellow");
  yellowSquare.x = -25;
  yellowSquare.y = -25;
  marker.addChild(yellowSquare);
  marker.x = x;
  marker.y = groundY - y;
  game.addGameItem(marker);
  marker.velocityX = -2;
  marker.onPlayerCollision = function() {
    startLevel();
    game.increaseScore(100);
    marker.fadeOut();
  }
  
}

    function startLevel() {
      // TODO 13 goes below here
    var level = levelData[currentLevel];
    var levelObjects = level.gameItems;
    for(var i = 0; i <levelObjects.length; i++){
    var gameItem = levelObjects[i];
    var gameItemType = gameItem.type;
    var itemX = gameItem.x;
    var itemY = gameItem.y;
    if(gameItemType === "goblin"){
      createGoblin(itemX, itemY);
    }
    if(gameItemType === "bomb"){
      createBomb(itemX, itemY);
    }
    if(gameItemType === "marker"){
      createMarker(itemX, itemY);
    }
  }


      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
