import Sprite from "./Sprite.js";
import Generator from "./game_states/Generator.js";
import { gameState, soundManager } from "../MainPlay.js";

export default class BoostEffect extends Sprite {
  constructor(
    x,
    y,
    imageSrc,
    gravity,
    width,
    height,
    gameBounds,
    boostsList,
    effect
  ) {
    super(x, y, imageSrc, width, height);

    this.gravity = gravity;
    this.gameBounds = gameBounds;
    this.boostsList = boostsList;
    this.effect = effect;
  }

  update() {
    this.position.y += this.gravity;

    if (this.position.y >= this.gameBounds.bottom) this.destroy();
  }

  destroy() {
    this.boostsList.splice(this.boostsList.indexOf(this), 1);
  }

  // Faster player
  static speed() {
    soundManager.speedSfx.play();

    gameState.PLAYER_SPEED = gameState.ACCELERATED_SPEED;

    document.querySelector(".speed").style.display = "block";
  }

  // Shot with pistol
  static pistol(key) {
    switch (key) {
      case "ArrowUp":
        gameState.shootDirection = "up";
        break;
      case "ArrowDown":
        gameState.shootDirection = "down";
        break;
      case "ArrowLeft":
        gameState.shootDirection = "left";
        break;
      case "ArrowRight":
        gameState.shootDirection = "right";
        break;
    }

    const newShootSfx = soundManager.shootSfx.cloneNode();
    newShootSfx.play();

    gameState.ammunition--;

    Generator.generateBullets(gameState);
    gameState.shootDirection = null;

    document.querySelector(".ammo").textContent = gameState.ammunition;

    if (gameState.ammunition <= 0) {
      gameState.PISTOL = false;

      gameState.bulletList.forEach((bullet) => bullet.destroy());

      document.querySelector(".pistol").style.display = "none";
      document.querySelector(".ammo").textContent = "";
    }
  }

  static objectShotDown() {
    gameState.collidedObject.possibleCollision = false;
    gameState.collidedObject.hide();
  }

  // // Multiple shots with shotgun
  // function shotgun() {}

  // More points
  static multiplier() {
    soundManager.multiplierSfx.play();

    gameState.MULTIPLIER = 2;

    document.querySelector(".multi").style.display = "block";
  }

  // Protect from 1 hit
  static shield() {
    if (gameState.collidedObject != null) {
      soundManager.shieldSfx.play();

      document.querySelector(".shield").style.display = "none";

      gameState.collidedObject.possibleCollision = false;
      gameState.collidedObject.hide();

      gameState.SHIELD = false;
      gameState.collidedObject = null;
    }
  }
}
