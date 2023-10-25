const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Navbar height for top bound
const navHeight = document.querySelector(".navbar").offsetHeight;

// Score elements
const scoreEl = document.querySelector(".score");
const bestScoreEl = document.querySelector(".best-score");

canvas.width = innerWidth;
canvas.height = innerHeight - navHeight;

// Game bounds
const gameBounds = {
  left: 0,
  top: 0,
  right: canvas.width,
  bottom: canvas.height,
};

// Player object
const playerX = canvas.width / 2;
const playerY = canvas.height / 1.5;
const playerImg = "/player.png";
const player = new Player(playerX, playerY, playerImg);

// Score
let score = 0;
let bestScore = 0;
let checkpoint = 0;

// Obstacles variables
const obstacleList = [];
let numberOfObstacles = 1;
let obstaclesGravity = 2;

// Keys to play
const keys = {
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

// Game loop function
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Creating obstacles
  for (const obstacle of obstacleList) {
    if (score >= checkpoint + 500) {
      checkpoint = score;

      obstaclesGravity += 0.25;
    }

    obstacle.draw(ctx);
    obstacle.update();
  }

  // Player movement
  player.velocity.x = 0;
  player.velocity.y = 0;

  if (keys.w.pressed) player.velocity.y = -5;
  else if (keys.s.pressed) player.velocity.y = 5;
  else if (keys.a.pressed) player.velocity.x = -5;
  else if (keys.d.pressed) player.velocity.x = 5;

  gameBoundsCollision();

  // Counting score
  scoreEl.innerHTML = score;
  bestScoreEl.innerHTML = bestScore;
  score++;

  player.draw(ctx);
  player.update();

  requestAnimationFrame(gameLoop);
}

// Check for collision with game bounds
function gameBoundsCollision() {
  if (player.position.y <= gameBounds.top) player.position.y = gameBounds.top;
  if (player.position.y + player.height >= gameBounds.bottom)
    player.position.y = gameBounds.bottom - player.height;
  if (player.position.x <= gameBounds.left) player.position.x = gameBounds.left;
  if (player.position.x + player.width >= gameBounds.right)
    player.position.x = gameBounds.right - player.width;
}

// Generate obstacles
function generateObstacles(obstacleList, gameBounds, numberOfObstacles) {
  for (let i = 0; i < numberOfObstacles; i++) {
    const obstacleImg = "/enemy.png";

    const randomX =
      Math.random() * (gameBounds.right - gameBounds.left) + gameBounds.left;

    const newObstacle = new Obstacle(
      randomX,
      gameBounds.top - 10,
      obstacleImg,
      obstaclesGravity,
      150,
      110,
      gameBounds,
      obstacleList
    );

    obstacleList.push(newObstacle);
  }
}

setInterval(() => {
  generateObstacles(obstacleList, gameBounds, numberOfObstacles);
}, 1000);

gameLoop();
