const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');

const snakeSize = 20;
const gridSize = 20;

let snake = [
    { x: 40, y: 40 },
    { x: 60, y: 40 },
];

let food = { x: 200, y: 200 };
let score = 0; // Initialize score

let dx = gridSize;
let dy = 0;

let gameStarted = false; // Track if the game has started

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
        // Snake ate the food, generate new food and update the score
        food = {
            x: Math.floor(Math.random() * canvas.width / gridSize) * gridSize,
            y: Math.floor(Math.random() * canvas.height / gridSize) * gridSize,
        };
        score += 10; // Increase score by 10
        updateScore(); // Update the score display
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
        alert(`Game over! Your score: ${score}. You can play again.`);
        resetGame();
    }
}

function resetGame() {
    snake = [
        { x: 40, y: 40 },
        { x: 60, y: 40 },
    ];
    dx = gridSize;
    dy = 0;
    food = {
        x: Math.floor(Math.random() * canvas.width / gridSize) * gridSize,
        y: Math.floor(Math.random() * canvas.height / gridSize) * gridSize,
    };
    score = 0; // Reset the score
    updateScore(); // Update the score display
    gameStarted = false; // Reset gameStarted flag
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSnake();
    drawFood();
    moveSnake();
    checkCollision();
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
}

function startGame() {
    if (!gameStarted) {
        gameInterval = setInterval(updateGame, 150);
        gameStarted = true;
    }
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

let gameInterval; // Define gameInterval variable

// Initialize the score display
updateScore();
