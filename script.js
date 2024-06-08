const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * canvas.width / gridSize) * gridSize, y: Math.floor(Math.random() * canvas.height / gridSize) * gridSize };

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const goingUp = direction.y === -gridSize;
    const goingDown = direction.y === gridSize;
    const goingRight = direction.x === gridSize;
    const goingLeft = direction.x === -gridSize;

    if (keyPressed === 37 && !goingRight) {
        direction = { x: -gridSize, y: 0 };
    }
    if (keyPressed === 38 && !goingDown) {
        direction = { x: 0, y: -gridSize };
    }
    if (keyPressed === 39 && !goingLeft) {
        direction = { x: gridSize, y: 0 };
    }
    if (keyPressed === 40 && !goingUp) {
        direction = { x: 0, y: gridSize };
    }
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Wrap snake position on edge
    if (head.x >= canvas.width) head.x = 0;
    if (head.x < 0) head.x = canvas.width - gridSize;
    if (head.y >= canvas.height) head.y = 0;
    if (head.y < 0) head.y = canvas.height - gridSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * canvas.width / gridSize) * gridSize, y: Math.floor(Math.random() * canvas.height / gridSize) * gridSize };
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'green';
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, gridSize, gridSize);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

gameLoop();
