export default class GameState {
  constructor() {
    this.isGameOver = false;

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
  }
}
