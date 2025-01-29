/* Constants for bricks */
const NUM_ROWS = 8;
const BRICK_TOP_OFFSET = 20;
const BRICK_SPACING = 2;
const NUM_BRICKS_PER_ROW = 10;
const BRICK_HEIGHT = 10;
const SPACE_FOR_BRICKS = getWidth() - (NUM_BRICKS_PER_ROW + 1) * BRICK_SPACING;
const BRICK_WIDTH = SPACE_FOR_BRICKS / NUM_BRICKS_PER_ROW;

/* Constants for ball and paddle */
const PADDLE_WIDTH = 80;
const PADDLE_HEIGHT = 15;
const PADDLE_OFFSET = 10;
const HALF_PADDLE = PADDLE_WIDTH/2;
const PADDLE_Y = getHeight()-PADDLE_OFFSET-PADDLE_HEIGHT;
const BALL_RADIUS = 10;
const BALL_PADDLE_COLOR = "#d6d6d6";

const CX = getWidth()/2;
const CY = getHeight()/2;
const RED = "#ff4040"
const YELLOW = "#d5e000"
const GREEN = "#269917"
const BLUE = "#4031cc"
const LOSE = "https://codehs.com/uploads/1494062736bc6b2d8754023e1ce9049d";
const BUTTON_WIDTH = 150;
const BUTTON_HEIGHT = 30;
const START_LIVES = 2;
const TEXT_BUFFER = 5;

//extra global variables
let numBricks = 0;
let numRows = 0;
let colorPick = 1;
let newColor = RED
let paddle;
let paddles = [];
let ball;
let dx = 5;
let dy = -5;
let score;
let lives;
let levelTxt;
let points = 0;
let life = START_LIVES;
let getReady;
let count=4;
let level = 1;


function main() {
    backGround();
    countDownText();
    score = scoreBar();
    lives = livesBar();
    levelTxt = levelBar();
	setTimer(drawBricks, 20);
	//paddle = makePaddle();
	makePaddle();
	restart();
	mouseMoveMethod(movePaddle);
}

function makePaddleSound(){
    let sound = new Sound("A#3", "amsawtooth");
    sound.setVolume(.05);
    sound.playFor(.05);
}

function makeBrickSound(){
    let sound = new Sound("A2", "fatsawtooth");
    sound.setVolume(.05);
    sound.playFor(.05);
}

function playAgain(){
    removeAll();
    resetCounts();
    backGround();
    countDownText();
    score = scoreBar();
    lives = livesBar();
    levelTxt = levelBar();
	setTimer(drawBricks, 20);
	paddle = makePaddle();
	restart();
	mouseMoveMethod(movePaddle);
}

function resetCounts(){
    life = START_LIVES;
    points = 0;
    numBricks = 0;
    numRows = 0;
    colorPick = 1;
    newColor = RED;
    count=4;
    level = 1;
}

function backGround(){
    let rect = new Rectangle(getWidth(),getHeight());
    add(rect);
}

function restart(){
    ball = initBall();
    setTimer(countDown,1000);
}

//score functions
function countDownText(){
    getReady = new Text(count, "80pt Arial");
    getReady.setPosition(CX -getReady.getWidth()/2,CY+getReady.getHeight()/2);
    getReady.setColor("red");
}

function countDown(){
    add(getReady);
    count--;
    getReady.setText(count);
    if (count == 0){
        remove(getReady);
        stopTimer(countDown);
        count = 4;
        let dir = Randomizer.nextInt(0,1);
        if(dir == 0){
            dx = -5;
        }
        if (dir == 1){
            dx = 5;
        }
        setTimer(ballMove, 20);
    }
}

function scoreBar(){
    let txt = new Text("Score: " + points, "10pt Courier");
    txt.setPosition(0,txt.getHeight() + TEXT_BUFFER);
    txt.setColor(BALL_PADDLE_COLOR);
    add(txt);
    return txt;
}

function livesBar(){
    let txt = new Text("Lives: " + life, "10pt Courier");
    txt.setPosition(getWidth()-txt.getWidth()-10, txt.getHeight() + TEXT_BUFFER);
    txt.setColor(BALL_PADDLE_COLOR);
    add(txt);
    return txt;
}

function levelBar(){
    let txt = new Text("Level: " + level, "10pt Courier");
    txt.setPosition(getWidth()/2 - txt.getWidth()/2, txt.getHeight() + TEXT_BUFFER);
    txt.setColor(BALL_PADDLE_COLOR);
    add(txt);
    return txt;
}

//ball move and collisions
function ballMove(){
    ball.move(dx,dy);
    checkCollisions();
    checkPaddle();
    checkBricks();
}

function initBall(){
    let circ = new Circle(BALL_RADIUS);
    circ.setPosition(CX,CY);
    circ.setColor(BALL_PADDLE_COLOR);
    add(circ);
    return circ;
}



function levelSpeed(){
    if (level == 1){
        dy = 5;
    }
    if (level == 2){
        dy = 7;
    }
    if (level == 3){
        dy = 10;
    }
    if (level == 4){
        dy = 12;
    }
}

function checkBricks(){
    let ballTopLeft = getElementAt(ball.getX()-BALL_RADIUS + 1.8, ball.getY() - BALL_RADIUS + 1.8);
    let ballTopRight = getElementAt(ball.getX() + BALL_RADIUS - 1.8, ball.getY() - BALL_RADIUS + 1.8);
    let ballTopMid = getElementAt(ball.getX(), ball.getY()-BALL_RADIUS);
    let ballLeft = getElementAt(ball.getX() - BALL_RADIUS, ball.getY() -2);
    let ballRight = getElementAt(ball.getX() + BALL_RADIUS, ball.getY()-2);
    let ballBottom = getElementAt(ball.getX(), ball.getY() + BALL_RADIUS);
    if(ballTopLeft != null){
        let colorL = ballTopLeft.getColor();
        if (colorL == BLUE){
            makeBrickSound();
            levelSpeed();
            remove(ballTopLeft);
            points++;
            score.setText("Score: " + points);
        }
        if (colorL == GREEN){
            makeBrickSound();
            if (level < 2){
                level = 2;
                levelTxt.setText("Level: " + level);
            }
            levelSpeed();
            remove(ballTopLeft);
            points += 3;
            score.setText("Score: " + points);
        }
        if (colorL == YELLOW){
            makeBrickSound();
            if (level < 3){
                level = 3;
                levelTxt.setText("Level: " + level);
            }
            levelSpeed();
            remove(ballTopLeft);
            points += 5;
            score.setText("Score: " + points);
        }
        if (colorL == RED){
            makeBrickSound();
            if (level < 4){
                level = 4;
                levelTxt.setText("Level: " + level);
            }
            levelSpeed();
            remove(ballTopLeft);
            points += 7;
            score.setText("Score: " + points);
        }
    } else if(ballTopRight != null){
        let colorR = ballTopRight.getColor();
        if (colorR == BLUE){
            makeBrickSound();
            levelSpeed();
            remove(ballTopRight);
            points++;
            score.setText("Score: " + points);
        }
        if (colorR == GREEN){
            makeBrickSound();
            if (level < 2){
                level = 2;
                levelTxt.setText("Level: " + level);
            }
            levelSpeed();
            remove(ballTopRight);
            points += 3;
            score.setText("Score: " + points);
        }
        if (colorR == YELLOW){
            makeBrickSound();
            if (level < 3){
                level = 3;
                levelTxt.setText("Level: " + level);
            }
            levelSpeed();
            remove(ballTopRight);
            points += 5;
            score.setText("Score: " + points);
        }
        if (colorR == RED){
            makeBrickSound();
            if (level < 4){
                level = 4;
                levelTxt.setText("Level: " + level);
            }
            levelSpeed();
            remove(ballTopRight);
            points += 7;
            score.setText("Score: " + points);
        }
    } 
    if(ballLeft != null){
        let colorLt = ballLeft.getColor();
        if (colorLt == BLUE){
            makeBrickSound();
            levelSpeed();
            dx = -dx;
            remove(ballLeft);
            points++;
            score.setText("Score: " + points);
        }
        if (colorLt == GREEN){
            makeBrickSound();
            if (level < 2){
                level = 2;
                levelTxt.setText("Level: " + level);
            }
            levelSpeed();
            dx = -dx;
            remove(ballLeft);
            points += 3;
            score.setText("Score: " + points);
        }
        if (colorLt == YELLOW){
            makeBrickSound();
            if (level < 3){
                level = 3;
                levelTxt.setText("Level: " + level);
            }
            levelSpeed();
            dx = -dx;
            remove(ballLeft);
            points += 5;
            score.setText("Score: " + points);
        }
        if (colorLt == RED){
            makeBrickSound();
            if (level < 4){
                level = 4;
                levelTxt.setText("Level: " + level);
            }
            levelSpeed();
            dx = -dx;
            remove(ballLeft);
            points += 7;
            score.setText("Score: " + points);
        }
    }
    if(ballRight != null){
        let colorRt = ballRight.getColor();
        if (colorRt == BLUE){
            makeBrickSound();
            dx = -dx;
            remove(ballRight);
            points++;
            score.setText("Score: " + points);
        }
        if (colorRt == GREEN){
            makeBrickSound();
            if (level < 2){
                level = 2;
                levelTxt.setText("Level: " + level);
            }
            dx = -dx;
            remove(ballRight);
            points += 3;
            score.setText("Score: " + points);
        }
        if (colorRt == YELLOW){
            makeBrickSound();
            if (level < 3){
                level = 3;
                levelTxt.setText("Level: " + level);
            }
            dx = -dx;
            remove(ballRight);
            points += 5;
            score.setText("Score: " + points);
        }
        if (colorRt == RED){
            makeBrickSound();
            if (level < 4){
                level = 4;
                levelTxt.setText("Level: " + level);
            }
            dx = -dx;
            remove(ballRight);
            points += 7;
            score.setText("Score: " + points);
        }
    }
    if(ballBottom != null){
        if(ballBottom.getColor() == BLUE){
            dy = -dy;
            points++;
        }
        if(ballBottom.getColor() == GREEN){
            dy = -dy;
            points += 3;
        }
        if(ballBottom.getColor() == YELLOW){
            dy = -dy;
            points += 5;
        }
        if(ballBottom.getColor() == RED){
            dy = -dy;
            points += 7;
        }
    }
}

function checkPaddle(){
    let ballBottom = getElementAt(ball.getX(), ball.getY() + BALL_RADIUS);
    let ballBottomR = getElementAt(ball.getX()+BALL_RADIUS, ball.getY() + BALL_RADIUS);
    let ballBottomL = getElementAt(ball.getX()-BALL_RADIUS, ball.getY() + BALL_RADIUS);
    if (ballBottom == paddles[0]){
        makePaddleSound();
        dy = -dy;
        if(dx > 0){
            dx = 5;
            
        }
        if(dx < 0){
            dx = -5;
        }
    } 
    if (ballBottomL == paddles[1] || ballBottomL == paddles[2]){
        makePaddleSound();
        dy = -dy;
        dx = 1.2*dx;
    } 
    if (ballBottomR == paddles[1] || ballBottomL == paddles[2]){
        makePaddleSound();
        dy = -dy;
        dx = 1.2*dx;
    } 
}

function checkCollisions(){
    let ballTop = ball.getY() - BALL_RADIUS;
    let ballRight = ball.getX() + BALL_RADIUS;
    let ballLeft = ball.getX() - BALL_RADIUS;
    let ballBottom = ball.getY() + BALL_RADIUS;
    if (ballTop < 0){
        dy = -dy;
    }
    if (ballRight > getWidth()){
        dx = -dx;
    }
    if (ballLeft < 0){
        dx = -dx;
    }
    if (ballBottom > getHeight()){
        remove(ball);
        stopTimer(ballMove);
        livesDown();
    }
}

function livesDown(){
    life--;
    lives.setText("Lives: " + life);
    if(life > 0){
        restart();
    }else if(life == 0){
        gameOver();
    }
    
}
//paddle move and check
function movePaddle(e){
    let x = (e.getX());
    paddles[0].setPosition(x, PADDLE_Y);
    paddles[1].setPosition(x - PADDLE_WIDTH/4,PADDLE_Y);
    paddles[2].setPosition(x + PADDLE_WIDTH/4,PADDLE_Y);
    checkWalls();
}

function checkWalls(){
    if(paddles[0].getX()+HALF_PADDLE > getWidth()){
        paddles[0].setPosition(getWidth()-HALF_PADDLE, PADDLE_Y);
        paddles[1].setPosition(getWidth()-HALF_PADDLE - PADDLE_WIDTH/4,PADDLE_Y);
        paddles[2].setPosition(getWidth()-HALF_PADDLE + PADDLE_WIDTH/4,PADDLE_Y);
    }
    if (paddles[0].getX()-HALF_PADDLE < 0){
        paddles[0].setPosition(HALF_PADDLE, PADDLE_Y);
        paddles[1].setPosition(HALF_PADDLE - PADDLE_WIDTH/4,PADDLE_Y);
        paddles[2].setPosition(HALF_PADDLE + PADDLE_WIDTH/4,PADDLE_Y);
    }
}

function makePaddle(){
    let rect = new Rectangle(PADDLE_WIDTH/2,PADDLE_HEIGHT);
    rect.setAnchor({horizontal: .5, vertical: 0});
    rect.setPosition(CX,PADDLE_Y);
    rect.setColor(BALL_PADDLE_COLOR);
    add(rect);
    paddles.push(rect);
    let rectL = new Rectangle(PADDLE_WIDTH/4,PADDLE_HEIGHT);
    rectL.setAnchor({horizontal: 1, vertical: 0});
    rectL.setPosition(CX-PADDLE_WIDTH/4,PADDLE_Y);
    rectL.setColor(BALL_PADDLE_COLOR);
    add(rectL);
    paddles.push(rectL);
    let rectR = new Rectangle(PADDLE_WIDTH/4,PADDLE_HEIGHT);
    rectR.setAnchor({horizontal:0,vertical:0});
    rectR.setPosition(CX+PADDLE_WIDTH/4,PADDLE_Y);
    rectR.setColor(BALL_PADDLE_COLOR);
    add(rectR);
    paddles.push(rectR);
}
//make and color bricks
function drawBricks(){
    brickRow();
    if(numBricks == NUM_BRICKS_PER_ROW){
        numBricks=0;
        numRows++;
        if(numRows % 2 == 0){
        newColor = checkColor();
        }
    }
    if(numRows == NUM_ROWS){
        stopTimer(drawBricks);
    }
}

function brickRow(){
    let nextX = (BRICK_WIDTH + BRICK_SPACING)* (numBricks);
    let nextY = (BRICK_HEIGHT+BRICK_SPACING) * (numRows);
    let rect = new Rectangle(BRICK_WIDTH, BRICK_HEIGHT);
    rect.setPosition(BRICK_SPACING + nextX, BRICK_TOP_OFFSET + nextY);
    rect.setColor(newColor);
    add(rect);
    numBricks++;
}

function checkColor(){
    let color;
    colorPick++
    if(colorPick == 1){
         color = RED;
    } else if(colorPick == 2){
         color = YELLOW;
    } else if(colorPick == 3){
         color = GREEN;
    } else if(colorPick == 4 ){
         color = BLUE;
    }
    return color;
}

function gameOver(){
    stopAllTimers();
    removeAll();
    let rect = new Rectangle(getWidth(),getHeight());
    rect.setColor("black");
    add(rect);
    let img = new WebImage(LOSE);
    img.setSize(getWidth(), getHeight()/2);
    img.setPosition(0, CY-img.getHeight()/2);
    add(img);
    let scoreEnd = new Text("Score: " + points, "20pt Courier");
    scoreEnd.setColor(BALL_PADDLE_COLOR);
    scoreEnd.setPosition(getWidth()/2 - scoreEnd.getWidth()/2,CY-img.getHeight()/2);
    add(scoreEnd);
    let button = new Rectangle(BUTTON_WIDTH, BUTTON_HEIGHT);
    button.setColor(BALL_PADDLE_COLOR);
    button.setPosition(CX-BUTTON_WIDTH/2, CY + CY/2);
    add(button);
    let txt = new Text("PLAY AGAIN?", "15pt Courier");
    txt.setColor("black");
    txt.setPosition(button.getX() + BUTTON_WIDTH/2 - txt.getWidth()/2, button.getY()+txt.getHeight()+5);
    add(txt);
    mouseClickMethod(playAgain);
}
main();