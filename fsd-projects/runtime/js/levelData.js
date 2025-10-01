var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "goblin", x: 800, y: -125 },
          {type: "bomb", x: 400, y: 600},
          { type: "goblin", x: 1600, y: -125 },
          {type: "bomb", x: 700, y: 600},
          {type: "bomb", x: 900, y: 600},
          {type: "bomb", x: 1100, y: 600},
          { type: "goblin", x: 2400, y: -125 },
          {type: "bomb", x: 2800, y: 600},
          { type: "goblin", x: 3000, y: -125 },
          {type: "bomb", x: 3200, y: 600},
          { type: "goblin", x: 3400, y: -125 },
          { type: "goblin", x: 3900, y: -125 },
          {type: "bomb", x: 4000, y: 600},
          {type: "bomb", x: 4200, y: 600},
          {type: "marker", x:4500, y:-125}
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "goblin", x: 800, y: -125 },
          {type: "bomb", x: 400, y: 600},
          { type: "goblin", x: 1600, y: -125 },
          {type: "bomb", x: 700, y: 600},
          {type: "bomb", x: 900, y: 600},
          {type: "bomb", x: 1100, y: 600},
          { type: "goblin", x: 2400, y: -125 },
          {type: "bomb", x: 2800, y: 600},
          { type: "goblin", x: 3000, y: -125 },
          {type: "bomb", x: 3200, y: 600},
          { type: "goblin", x: 3400, y: -125 },
          { type: "goblin", x: 3900, y: -125 },
          {type: "bomb", x: 4000, y: 600},
          {type: "bomb", x: 4200, y: 600},
          {type: "marker", x:4500, y:-125}
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
