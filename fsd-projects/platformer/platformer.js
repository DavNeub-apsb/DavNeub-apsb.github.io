$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "#07ed39"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    //toggleGrid();


    // TODO 2 - Create Platforms
  
    createPlatform(0,700,100,10,"#07ed39");
    createPlatform(300,600,100,10,"#07ed39");
    createPlatform(400,600,10,150,"#07ed39");
    createPlatform(400,700,110,50,"#07ed39");
    createPlatform(500,710,10,-60,"#07ed39");
    createPlatform(500,640,100,10,"#07ed39");
    createPlatform(600,510,100,10,"#07ed39");
    createPlatform(700,510,10,230,"#07ed39");
    createPlatform(900,600,150,10,"#07ed39");
    createPlatform(1300,650,100,10,"#07ed39", 1000,1300,1);
    createPlatform(1050,530,10,80,"#07ed39");
    createPlatform(850,400,100,10,"#07ed39",850,850,0,200,600,2);
    createPlatform(1100,300,200,10,"#07ed39");
    createPlatform(1100,300,10,100,"#07ed39");
    createPlatform(1300,190,100,10,"#07ed39");
    createPlatform(500,150,550,10,"#07ed39");
    createPlatform(1150,190,50,10,"#07ed39",1000,1300,1);
    createPlatform(1050,130,10,30,"#07ed39");
    createPlatform(500,150,10,150,"#07ed39");
    createPlatform(300,300,210,10,"#07ed39");
    createPlatform(100,150,100,10,"#07ed39");
    createFakePlatform(200,220,150,10,"#06c12f");
    createPlatform(260,220,10,10,"#07ed39");

    //bad platforms
    createBadPlatform(0,730,400,10);
    createBadPlatform(410,690,90,10);
    createBadPlatform(1100,390,300,10);
    createBadPlatform(380,300,50,10);
    

    // TODO 3 - Create Collectables
    createCollectable("walle",535,680);
    createCollectable("eva",950,530);
    createCollectable("ron",1330,120);
    createCollectable("database",120,80);

    
    // TODO 4 - Create Cannons
    createCannon("left",710,700,1500,470,650,2);
    createCannon("bottom",550,200,1000);
    createCannon("bottom",670,200,1000);
    createCannon("bottom",790,200,1000);
    createCannon("bottom",910,200,1000);
    
    
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});