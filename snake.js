// snake.js
const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');

const snakeSize = 20;
const gridSize = 20;

let snake = [
    { x: 40, y: 40 },
    { x: 60, y: 40 },
    // Add more initial segments if needed
];

let food = { x: 200, y: 200 };

let dx = gridSize;
let dy = 0;

function drawSnake() {
    snake.forEach((segment) => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        // Snake ate the food, generate new food
        food = {
            x: Math.floor(Math.random() * canvas.width / gridSize) * gridSize,
            y: Math.floor(Math.random() * canvas.height / gridSize) * gridSize,
        };
    } else {
        snake.pop(); // Remove the tail segment
    }
}

function checkCollision() {
    const head = snake[0];

    // Check if the snake hit the canvas boundaries or itself
    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height ||
        snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
        // Game over
        clearInterval(gameInterval);
        alert('Game over! You can play again.');
        resetGame();
    }
}

function resetGame() {
    snake = [
        { x: 40, y: 40 },
        { x: 60, y: 40 },
        // Add more initial segments if needed
    ];
    dx = gridSize;
    dy = 0;
    food = {
        x: Math.floor(Math.random() * canvas.width / gridSize) * gridSize,
        y: Math.floor(Math.random() * canvas.height / gridSize) * gridSize,
    };
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSnake();
    drawFood();
    moveSnake();
    checkCollision();
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (dy !== gridSize) {
                dx = 0;
                dy = -gridSize;
            }
            break;
        case 'ArrowDown':
            if (dy !== -gridSize) {
                dx = 0;
                dy = gridSize;
            }
            break;
        case 'ArrowLeft':
            if (dx !== gridSize) {
                dx = -gridSize;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx !== -gridSize) {
                dx = gridSize;
                dy = 0;
            }
            break;
    }
});

const gameInterval = setInterval(updateGame, 150);
