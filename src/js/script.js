var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var rightPressed = false;
var leftPressed = false;
var paddleX = (canvas.width - 75) / 2;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

const level = (skillLevel) => {
    let ballSpeed = 20;
    let paddleHeight = 10;
    let paddleWidth = 10;

    if (skillLevel === 'Master') {
        console.log("Master");
        return ({
            'paddle': 's',
            'ballSize': 5,
            'ballSpeed': ballSpeed - 19,
            paddleHeight,
            'paddleWidth': paddleWidth - 50,
        });
    } else if (skillLevel === 'Expert') {
        console.log("Expert");
        return ({
            'paddle': 'm',
            'ballSize': 10,
            'ballSpeed': ballSpeed / 2,
            paddleHeight,
            'paddleWidth': paddleWidth - 25,
        });
    } else {
        console.log("Beginner");
        return ({
            'paddle': 'l',
            'ballSize': 20,
            'ballSpeed': ballSpeed,
            paddleHeight,
            paddleWidth,
        });
    }
}

let currentLevel = level('Master');

const drawBall = (curLevel) => {
    let { ballSize } = curLevel;

    ctx.beginPath();
    ctx.arc(x, y, ballSize, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
var paddleX = (canvas.width - currentLevel.paddleWidth) / 2;

const drawPaddle = (curLevel) => {
    let { paddleHeight, paddleWidth } = curLevel;
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(currentLevel);
    drawPaddle(currentLevel);

    let { ballSize, paddleWidth } = currentLevel;

    if (x + dx > canvas.width - ballSize || x + dx < ballSize) {
        dx = -dx;
    }
    if (y + dy > canvas.height - ballSize || y + dy < ballSize) {
        dy = -dy;
    }

    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

    x += dx;
    y += dy;
}
setInterval(() => draw(currentLevel), currentLevel.ballSpeed);
