// Game context
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const game_over = document.querySelector(".game-over");

// Navbar height for top bound
const navHeight = document.querySelector(".navbar").offsetHeight;

// Score elements
const scoreEl = document.querySelectorAll(".score");
const bestScoreEl = document.querySelectorAll(".best-score");

const coinEl = document.querySelector(".coins");

// Canvas size
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

let coins = localStorage.getItem("coins");
if (coins === null) localStorage.setItem("coins", "0");

// Obstacles arrays
const obstacleList = [];
const puddlesList = [];
const policeList = [];
const boostsList = [];
const bulletList = [];

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
let ACCELERATED_SPEED = 9;

// Boost variables
let MULTIPLIER = 1;
let SHIELD = false;
let PISTOL = false;
let isShooting = false;
let ammunition = 10;
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

// Sound effects
const chickenSfx = new Audio("../sfx/chicken.mp3");
const policeSfx = new Audio("../sfx/police.mp3");
const puddleSfx = new Audio("../sfx/puddle.mp3");
const speedSfx = new Audio("../sfx/speed.mp3");
const pistolSfx = new Audio("../sfx/pistol.mp3");
const shootSfx = new Audio("../sfx/shoot.mp3");
const multiplierSfx = new Audio("../sfx/multiplier.mp3");
const shieldSfx = new Audio("../sfx/shield.mp3");
const coinSfx = new Audio("../sfx/coin.mp3");

// Start the game
gameLoopID = requestAnimationFrame(gameLoop);
