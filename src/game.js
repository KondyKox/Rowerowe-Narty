const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const game_over = document.querySelector(".game-over");

// Navbar height for top bound
const navHeight = document.querySelector(".navbar").offsetHeight;

// Score elements
const scoreEl = document.querySelectorAll(".score");
const bestScoreEl = document.querySelectorAll(".best-score");

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
let checkpoint = 0;
let newBestScore = 0;

let bestScore = localStorage.getItem("bestScore");
if (bestScore === null) localStorage.setItem("bestScore", "0");

// Obstacles variables
const obstacleList = [];
let numberOfObstacles = 1;
let OBSTACLES_GRAVITY = 2;

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
let gameLoopID;

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player movement
  player.velocity.x = 0;
  player.velocity.y = 0;

  if (keys.w.pressed) player.velocity.y = -7;
  if (keys.s.pressed) player.velocity.y = 7;
  if (keys.a.pressed) player.velocity.x = -7;
  if (keys.d.pressed) player.velocity.x = 7;

  // Check for collision with obstacles
  if (collisionWithObstacles()) gameOver();
  else {
    // Creating obstacles
    for (const obstacle of obstacleList) {
      if (OBSTACLES_GRAVITY <= 7) {
        if (score >= checkpoint + 500) {
          checkpoint = score;

          OBSTACLES_GRAVITY += 0.15;
        }
      }

      obstacle.draw(ctx);
      obstacle.update();
    }

    // Counting score
    scoreEl[0].innerHTML = score;

    if (score >= bestScore) bestScoreEl[0].innerHTML = newBestScore;
    else bestScoreEl[0].innerHTML = bestScore;

    score++;
    newBestScore = score;
  }

  player.draw(ctx);
  player.update();

  gameBoundsCollision();

  gameLoopID = requestAnimationFrame(gameLoop);
}

// Finish the game
function gameOver() {
  // Game over screen
  canvas.style.display = "none";
  game_over.style.display = "flex";

  if (newBestScore > parseInt(bestScore))
    localStorage.setItem("bestScore", newBestScore.toString());

  scoreEl[1].innerHTML = score;
  bestScoreEl[1].innerHTML = localStorage.getItem("bestScore");

  // cancelAnimationFrame(gameLoopID); // Stop the game

  // Start the game again
  document.addEventListener("click", () => {
    // Reload page to start again
    window.location.reload();
  });
}

// Start the game
gameLoopID = requestAnimationFrame(gameLoop);
