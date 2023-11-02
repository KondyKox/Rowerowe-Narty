// Game context
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

// Obstacles arrays
const obstacleList = [];
const puddlesList = [];
const policeList = [];
const boostsList = [];

// Amount of obstacles
let numberOfObstacles = 1;
let numberOfPolice = 1;
let numberOfBoosts = 1;

// Speed variables
let OBSTACLES_GRAVITY = 2;
let POLICE_SPEED = 3;
let DEFAULT_SPEED = 7;
let PLAYER_SPEED = DEFAULT_SPEED;
let SLOWED_DOWN = 4;
let ACCELERATED_SPEED = 10;

// Other variables
let MULTIPLIER = 1;
let SHIELD = false;
let collidedObject = null;

// Keys to play
const keys = {
  // Movement
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

  // Shoot
  ArrowUp: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
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

  if (!collisionWithPuddles()) {
    if (keys.w.pressed) player.velocity.y = -PLAYER_SPEED;
    if (keys.s.pressed) player.velocity.y = PLAYER_SPEED;
    if (keys.a.pressed) player.velocity.x = -PLAYER_SPEED;
    if (keys.d.pressed) player.velocity.x = PLAYER_SPEED;
  } else {
    if (keys.w.pressed) player.velocity.y = -SLOWED_DOWN;
    if (keys.s.pressed) player.velocity.y = SLOWED_DOWN;
    if (keys.a.pressed) player.velocity.x = -SLOWED_DOWN;
    if (keys.d.pressed) player.velocity.x = SLOWED_DOWN;
  }

  // Check for collision with obstacles
  if (checkCollisions()) {
    if (!SHIELD) gameOver();
    // else if (SHIELD) SHIELD = false;
  } else {
    // Creating obstacles
    for (const obstacle of obstacleList) {
      if (OBSTACLES_GRAVITY <= 7) {
        if (score >= checkpoint + 1000) {
          checkpoint = score;

          OBSTACLES_GRAVITY += 0.15;
        }
      }

      obstacle.draw(ctx);
      obstacle.update();
    }

    // Creating puddles
    for (const puddle of puddlesList) {
      puddle.draw(ctx);
      puddle.update();
    }

    // Creating police
    for (const police of policeList) {
      if (POLICE_SPEED <= 8) {
        if (score >= checkpoint + 1000) {
          checkpoint = score;

          POLICE_SPEED += 0.2;
        }
      }

      police.draw(ctx);
      police.update();
    }

    // Creating boosts
    for (const boost of boostsList) {
      boost.draw(ctx);
      boost.update();
    }

    // Counting score
    scoreEl[0].innerHTML = score;

    if (score >= bestScore) bestScoreEl[0].innerHTML = newBestScore;
    else bestScoreEl[0].innerHTML = bestScore;

    score += MULTIPLIER;
    newBestScore = score;

    // Creating player
    player.draw(ctx);
    player.update();

    checkCollisions();
    boostEffects();
  }

  if (!gameIsOver) gameLoopID = requestAnimationFrame(gameLoop);
}

// Finish the game
let gameIsOver = false;

function gameOver() {
  gameIsOver = true;

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
