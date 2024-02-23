import Sprite from "./Sprite.js";
import Generator from "./game_states/Generator.js";
import { game } from "../main.js";

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
    game.speedSfx.play();

    game.PLAYER_SPEED = game.ACCELERATED_SPEED;

    document.querySelector(".speed").style.display = "block";
  }

  // Shot with pistol
  static pistol(key) {
    switch (key) {
      case "ArrowUp":
        game.shootDirection = "up";
        break;
      case "ArrowDown":
        game.shootDirection = "down";
        break;
      case "ArrowLeft":
        game.shootDirection = "left";
        break;
      case "ArrowRight":
        game.shootDirection = "right";
        break;
    }

    const newShootSfx = game.shootSfx.cloneNode();
    newShootSfx.play();

    game.ammunition--;

    Generator.generateBullets(game);
    game.shootDirection = null;

    document.querySelector(".ammo").innerHTML = game.ammunition;

    if (game.ammunition <= 0) {
      game.PISTOL = false;

      game.bulletList.forEach((bullet) => bullet.destroy());

      document.querySelector(".pistol").style.display = "none";
      document.querySelector(".ammo").innerHTML = "";
    }
  }

  static objectShotDown() {
    game.collidedObject.possibleCollision = false;
    game.collidedObject.hide();
  }

  // // Multiple shots with shotgun
  // function shotgun() {}

  // More points
  static multiplier() {
    game.multiplierSfx.play();

    game.MULTIPLIER = 2;

    document.querySelector(".multi").style.display = "block";
  }

  // Protect from 1 hit
  static shield() {
    if (game.collidedObject != null) {
      game.shieldSfx.play();

      document.querySelector(".shield").style.display = "none";

      game.collidedObject.possibleCollision = false;
      game.collidedObject.hide();

      game.SHIELD = false;
      game.collidedObject = null;
    }
  }
}
