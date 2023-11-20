// GameState.js
import Player from "../classes/Player.js";

export default class GameState {
  constructor() {
    // Game context
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.game_over = document.querySelector(".game-over");

    // Navbar height for top bound
    const navHeight = document.querySelector(".navbar").offsetHeight;

    // Score elements
    this.scoreEl = document.querySelectorAll(".score");
    this.bestScoreEl = document.querySelectorAll(".best-score");

    this.coinEl = document.querySelector(".coins");

    // Canvas size
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight - navHeight;

    // Game bounds
    this.gameBounds = {
      left: 0,
      top: 0,
      right: this.canvas.width,
      bottom: this.canvas.height,
    };

    // Player object
    const playerX = this.canvas.width / 2;
    const playerY = this.canvas.height / 1.5;

    const playerSkin = localStorage.getItem("playerSkin");
    if (playerSkin === null) localStorage.setItem("playerSkin", "default");

    const playerImg = `./img/player/player-${playerSkin}.png`;
    this.player = new Player(playerX, playerY, playerImg);

    // Score
    this.score = 0;
    this.checkpoint = 0;
    this.newBestScore = 0;

    this.bestScore = localStorage.getItem("bestScore");
    if (this.bestScore === null) localStorage.setItem("bestScore", "0");

    this.coins = localStorage.getItem("coins");
    if (this.coins === null) localStorage.setItem("coins", "0");

    // Obstacles arrays
    this.obstacleList = [];
    this.puddlesList = [];
    this.policeList = [];
    this.boostsList = [];
    this.bulletList = [];

    // Amount of obstacles
    this.numberOfObstacles = 1;
    this.numberOfPolice = 1;
    this.numberOfBoosts = 1;

    // Speed variables
    this.OBSTACLES_GRAVITY = 2;
    this.POLICE_SPEED = 3;
    this.DEFAULT_SPEED = 7;
    this.PLAYER_SPEED = this.DEFAULT_SPEED;
    this.SLOWED_DOWN = 4;
    this.ACCELERATED_SPEED = 9;

    // Boost variables
    this.MULTIPLIER = 1;
    this.SHIELD = false;
    this.PISTOL = false;
    this.isShooting = false;
    this.shootDirection = null;
    this.ammunition = 10;
    this.collidedObject = null;

    // Keys to play
    this.keys = {
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
    this.chickenSfx = new Audio("./sfx/chicken.mp3");
    this.policeSfx = new Audio("./sfx/police.mp3");
    this.puddleSfx = new Audio("./sfx/puddle.mp3");
    this.speedSfx = new Audio("./sfx/speed.mp3");
    this.pistolSfx = new Audio("./sfx/pistol.mp3");
    this.shootSfx = new Audio("./sfx/shoot.mp3");
    this.multiplierSfx = new Audio("./sfx/multiplier.mp3");
    this.shieldSfx = new Audio("./sfx/shield.mp3");
    this.coinSfx = new Audio("./sfx/coin.mp3");
  }
}
