const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Score elements
const scoreEl = document.querySelector(".score");
const bestScoreEl = document.querySelector(".best-score");

canvas.width = innerWidth;
canvas.height = innerHeight;

// Player object
const playerX = canvas.width / 2;
const playerY = canvas.height / 1.5;
const playerImg = "/player.png";
const player = new Player(playerX, playerY, playerImg);

let score = 0;
let bestScore = 0;

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

  // Counting score
  scoreEl.innerHTML = score;
  bestScoreEl.innerHTML = bestScore;
  score++;

  // Player movement
  player.velocity.x = 0;
  player.velocity.y = 0;

  if (keys.w.pressed) player.velocity.y = -5;
  else if (keys.s.pressed) player.velocity.y = 5;
  else if (keys.a.pressed) player.velocity.x = -5;
  else if (keys.d.pressed) player.velocity.x = 5;

  player.draw(ctx);
  player.update();

  requestAnimationFrame(gameLoop);
}

gameLoop();
