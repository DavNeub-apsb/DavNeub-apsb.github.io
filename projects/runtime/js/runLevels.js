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
    game.setDebugMode(true);
    
    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x,y){
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/sawblade.png");
      sawBladeHitZone.addChild(obstacleImage);
      obstacleImage.x =  -25
      obstacleImage.y =  -25
      sawBladeHitZone.rotationalVelocity = -8;
      

      
    }

    createSawBlade(700,groundY-120);
    createSawBlade(1000,groundY-10);
    createSawBlade(1600,groundY-10);

    function createEnemy(x,y){
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "red");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);

      enemy.x = x;
      enemy.y = groundY - y;

      game.addGameItem(enemy);

      enemy.velocityX = -1;
      enemy.rotationalVelocity = 5;

      enemy.onPlayerCollision = function(){
        game.changeIntegrity(-10);
      }

      enemy.onProjectileCollision = function(){
        game.increaseScore(100);
        enemy.flyTo(900,-30);
      }
    }

    createEnemy(400,40);
    createEnemy(1200,20);
    createEnemy(2500,35);

    function createReward(x,y){
      var reward = game.createGameItem("reward",10);
      var yellowSquare = draw.rect(20,20,"yellow");
      yellowSquare.x = -10;
      yellowSquare.y = -10;
      reward.addChild(yellowSquare);

      reward.x = x;
      reward.y = groundY - y;
      
      game.addGameItem(reward)
      reward.velocityX = -3;

      reward.onPlayerCollision = function(){
        game.changeIntegrity(10);
        reward.fadeOut();
      }
    }

    createReward(2000,80);
    function startLevel() {
      // TODO 13 goes below here



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
