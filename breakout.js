var canvas =document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;

var scoreIndicator = document.getElementById("score");
var gameScore = 0;

//to move

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var numRows = 3;
var numCols = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var bricks = [];
for (var col = 0; col < numCols; col++) {
    bricks[col] = [];
    for (var row = 0; row < numRows; row++) {
        bricks[col][row] = { x: 0, y: 0, status: 1 };
    }
}

function keyDownHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = true;
    }
    else if (event.keyCode == 37) {
        leftPressed = true;
    }
}
    
function keyUpHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = false;
    }
    else if (event.keyCode == 37) {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#0033FF";
    ctx.fillStroke = "#0033FF";
    ctx.Stroke = "10"
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillstyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (var col = 0; col < numCols; col++) {
        for (row = 0; row < numRows; row++) {
            if (bricks[col][row].status == 1) {
                var brickX = (col * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[col][row].x = brickX;
                bricks[col][row].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (var col = 0; col < numCols; col++) {
        for (var row = 0; row < numRows; row++) {
            var brick = bricks[col][row];
            if (brick.status == 1) {
                if (x > brick.x && x < (brick.x + brickWidth) && y > brick.y && y < (brick.y + brickHeight)) {
                    dy = -dy;
                    brick.status = 0;
                    gameScore += 100;
                    gameIndicator.innerHTML = "<strong>Score: </strong>" + gameScore;
                }
            }
        }
    }
}

// Our main function that will be repeated every 10 ms
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
 
    // Change directions
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            if (y = y - paddleHeight) {
                dy = -dy;
            }
        }
        else {
            //alert("GAME OVER");
            document.location.reload();
        }
    }
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0 ){
        paddleX -= 7;
    }
         
    x = x + dx;
    y = y + dy;
}

setInterval(draw, 10);
