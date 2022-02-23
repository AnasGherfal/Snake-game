const canvas = document.getElementById("gameWorld");
const ctx = canvas.getContext("2d");

class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;

    }
}
let speed = 8;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeBodys = [];
let tail = 2;

let bananaX = 10;
let bananaY = 5;

let xv = 0;
let yv = 0;

let score = 0;

const eatSound = new Audio("eat.mp3");
const deathSound = new Audio("death.mp3");

function draw() {
    snakePosition();

    let result = gameOver();
    if (result) {
        return;
    }
    clearScreen();

    bananaCollision();
    drawBanana();
    drawSnake();

    drawScore();

    if (score > 5) {
        speed = 10;
    }
    if (score > 10) {
        speed = 12;
    }
    if (score > 15) {
        speed = 15;
    }
    if (score > 20) {
        speed = 20;
    }
    setTimeout(draw, 1000 / speed);
}

function gameOver() {
    let gOver = false;

    if (yv === 0 && xv === 0) {
        return false;
    }

    if (headX < 0) {
        deathSound.play();

        gOver = true;
    } else if (headX === tileCount) {
        deathSound.play();
        gOver = true;
    } else if (headY < 0) {
        deathSound.play();
        gOver = true;
    } else if (headY === tileCount) {
        deathSound.play();
        gOver = true;
    }

    for (let i = 0; i < snakeBodys.length; i++) {
        let part = snakeBodys[i];
        if (part.x === headX && part.y === headY) {
            gOver = true;
            deathSound.play();
            break;
        }
    }
    if (gOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", " yellow");
        gradient.addColorStop("0.5", "red");
        gradient.addColorStop("1.0", "black");
        // Fill with gradient
        ctx.fillStyle = gradient;

        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }
    return gOver;
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "12px Tahoma";
    ctx.fillText("Score " + score, canvas.width - 50, 10);
}

function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {


    ctx.fillStyle = "terquoise";
    for (let i = 0; i < snakeBodys.length; i++) {
        let part = snakeBodys[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeBodys.push(new Snake(headX, headY));
    if (snakeBodys.length > tail) {
        snakeBodys.shift();
    }
    ctx.fillStyle = "red";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function snakePosition() {
    headX += xv;
    headY += yv;
}

function drawBanana() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(bananaX * tileCount, bananaY * tileCount, tileSize, tileSize);
}

function bananaCollision() {
    if (bananaX === headX && bananaY == headY) {
        bananaX = Math.floor(Math.random() * tileCount);
        bananaY = Math.floor(Math.random() * tileCount);
        tail++;
        score++;
        eatSound.play();
    }
}

document.addEventListener('keydown', keydown);

function keydown(event) {
    if (event.keyCode == 87) {
        if (yv == 1)
            return;
        yv = -1;
        xv = 0;
    }
    if (event.keyCode == 83) {
        if (yv == -1)
            return;
        yv = 1;
        xv = 0;
    }

    if (event.keyCode == 68) {
        if (xv == -1)
            return;
        yv = 0;
        xv = 1;
    }
    if (event.keyCode == 65) {
        if (xv == 1)
            return;
        yv = 0;
        xv = -1;
    }
}

draw();