var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx =  2;
var dy =  -2;

const level = (skillLevel) => {
    let ballSpeed = 20;
    let blockNumber = 10;
    if (skillLevel === 'Master') {
        console.log("Master");
        return ({
            'paddle': 's',
            'ballSize': 5,
            'ballSpeed': ballSpeed - 19,
            'blockNumber': blockNumber * 3,
        });
    } else if (skillLevel === 'Expert') {
        console.log("Expert");
        return ({
            'paddle': 'm',
            'ballSize': 10,
            'ballSpeed': ballSpeed / 2,
            'blockNumber': blockNumber * 2,
        });
    } else {
        console.log("Beginner");
        return ({
            'paddle': 'l',
            'ballSize': 20,
            'ballSpeed': ballSpeed,
            'blockNumber': blockNumber,
        });
    }
}

let currentLevel = level('Expert');

function drawBall(curLevel) {
    let { ballSize } = curLevel;

    ctx.beginPath();
    ctx.arc(x, y, ballSize, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(currentLevel);
    const { ballSize } = currentLevel;

    if(x + dx > canvas.width-ballSize || x + dx < ballSize) {
        dx = -dx;
    }
    if(y + dy > canvas.height-ballSize || y + dy < ballSize) {
        dy = -dy;
    }
    x += dx;
    y += dy;
}setInterval(() => draw(currentLevel), currentLevel.ballSpeed);
