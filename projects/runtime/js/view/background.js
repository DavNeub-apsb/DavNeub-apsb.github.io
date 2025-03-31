var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
      
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            
            
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'navy');
            background.addChild(backgroundFill);

            // TODO 2: - Add a moon and starfield
            
            function getRandomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
              }
            

            for(var i = 0; i <200;i++){
                var diameter = getRandomArbitrary(2,6);
                var circle = draw.circle(diameter, "white", "LightGray", 2);
                circle.x = canvasWidth * Math.random();
                circle.y = groundY * Math.random();
                background.addChild(circle);
            }

            var moon = draw.bitmap("img/moon.png");
            moon.x = 1000;
            moon.y = -100;
            moon.scaleX = 2.0;
            moon.scaleY = 2.0;
            background.addChild(moon);

            var uranus = draw.bitmap("img/uranus.png");
            uranus.x = 900;
            uranus.y = 40;
            uranus.scaleX = .25;
            uranus.scaleY = .25;
            background.addChild(uranus);

            var jupiter = draw.bitmap("img/jupiter.png");
            jupiter.x = 500;
            jupiter.y = 110;
            jupiter.scaleX = .125;
            jupiter.scaleY = .125;
            background.addChild(jupiter);


            var groundFill = draw.rect(canvasWidth,canvasHeight,'green');
            groundFill.x = 0;
            groundFill.y = groundY;
            background.addChild(groundFill);

            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for (var i = 0; i < 5; ++i) {
                var buildingHeight = Math.random()*350;
                if (buildingHeight< 50){
                    buildingHeight = 225;
                }
                var building = draw.rect(75, buildingHeight, "LightGray", "Black", 1);
                building.x = 200 * i;
                building.y = groundY - buildingHeight;
                background.addChild(building);
                buildings.push(building);
              }
            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png");
            tree.x = 500;
            tree.y = groundY-240;
            background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        var tree;
        var buildings = [];
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x = tree.x - 3;

            if (tree.x < -200) {
                tree.x = canvasWidth;
            }
            
            // TODO 4: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++) {
                var eachElement = buildings[i];
                eachElement.x = eachElement.x - 1;
                if (eachElement.x <-200){
                    eachElement.x = canvasWidth;
                }
                // code to do something with each element
              }

            
        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
