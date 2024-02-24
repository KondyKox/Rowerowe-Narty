import Player from "../Player.js";

export default class GameCanvas {
  constructor() {
    // Game context
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.game_over = document.querySelector(".game-over");

    // Navbar height for top bound
    const navHeight = document.querySelector(".navbar").offsetHeight;

    // UI elements
    this.scoreEl = document.querySelector(".score");
    this.bestScoreEl = document.querySelector(".best-score");
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

    const playerImg = `./img/player/${playerSkin}.png`;
    this.player = new Player(playerX, playerY, playerImg);
  }
}
