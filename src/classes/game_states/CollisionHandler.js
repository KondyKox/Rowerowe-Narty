import { game } from "../../MainPlay.js";
import BoostEffect from "../BoostEffect.js";

export default class CollisionHandler {
  static checkCollisions() {
    // Check for collision with game bounds
    if (game.player.position.y <= game.gameBounds.top)
      game.player.position.y = game.gameBounds.top;
    if (game.player.position.y + game.player.height >= game.gameBounds.bottom)
      game.player.position.y = game.gameBounds.bottom - game.player.height;
    if (game.player.position.x <= game.gameBounds.left)
      game.player.position.x = game.gameBounds.left;
    if (game.player.position.x + game.player.width >= game.gameBounds.right)
      game.player.position.x = game.gameBounds.right - game.player.width;

    // Check for collision with obstacles
    for (const obstacle of game.obstacleList) {
      if (
        game.player.position.y < obstacle.position.y + obstacle.height &&
        game.player.position.y + game.player.height > obstacle.position.y &&
        game.player.position.x < obstacle.position.x + obstacle.width &&
        game.player.position.x + game.player.width > obstacle.position.x
      )
        if (obstacle.possibleCollision) {
          game.collidedObject = obstacle;

          game.chickenSfx.play();

          return true;
        }
    }

    // Check for collision with police
    for (const police of game.policeList) {
      if (
        game.player.position.y < police.position.y + police.height &&
        game.player.position.y + game.player.height > police.position.y &&
        game.player.position.x < police.position.x + police.width &&
        game.player.position.x + game.player.width > police.position.x
      )
        if (police.possibleCollision) {
          game.collidedObject = police;

          game.policeSfx.play();

          return true;
        }
    }
  }

  // Check for collision with puddles
  static collisionWithPuddles() {
    for (const puddle of game.puddlesList) {
      if (
        game.player.position.y < puddle.position.y + puddle.height &&
        game.player.position.y + game.player.height > puddle.position.y &&
        game.player.position.x < puddle.position.x + puddle.width &&
        game.player.position.x + game.player.width > puddle.position.x
      ) {
        game.puddleSfx.play();

        return true;
      }
    }
  }

  // Check for collision with boost effects
  static boostEffects() {
    for (const boost of game.boostsList) {
      if (
        game.player.position.y < boost.position.y + boost.height &&
        game.player.position.y + game.player.height > boost.position.y &&
        game.player.position.x < boost.position.x + boost.width &&
        game.player.position.x + game.player.width > boost.position.x
      ) {
        const effect = boost.effect;

        switch (effect) {
          case "speed":
            BoostEffect.speed();
            boost.destroy();
            setTimeout(() => {
              game.PLAYER_SPEED = game.DEFAULT_SPEED;
              document.querySelector(".speed").style.display = "none";
            }, 5000);
            break;

          case "pistol":
            game.pistolSfx.play();

            game.ammunition = 10;
            game.PISTOL = true;

            document.querySelector(".pistol").style.display = "block";
            document.querySelector(".ammo").textContent = game.ammunition;
            boost.destroy();
            break;

          // case "shotgun":
          //   shotgun();
          //   boost.destroy();
          //   break;

          case "multiplier":
            BoostEffect.multiplier();
            boost.destroy();
            setTimeout(() => {
              game.MULTIPLIER = 1;
              document.querySelector(".multi").style.display = "none";
            }, 5000);
            break;

          case "shield":
            game.shieldSfx.play();

            game.SHIELD = true;
            document.querySelector(".shield").style.display = "block";
            boost.destroy();
            break;

          case "coin":
            game.coinSfx.play();

            game.coins++;
            boost.destroy();
            break;

          default:
            break;
        }
      }
    }
  }

  // Bullets collisions with objects
  static bulletCollision() {
    for (const bullet of game.bulletList) {
      // Check collisions with obstacles
      for (const obstacle of game.obstacleList) {
        if (
          bullet.position.y < obstacle.position.y + obstacle.height &&
          bullet.position.y + bullet.height > obstacle.position.y &&
          bullet.position.x < obstacle.position.x + obstacle.width &&
          bullet.position.x + bullet.width > obstacle.position.x
        ) {
          game.collidedObject = obstacle;
          bullet.hide();
          return true;
        }
      }

      // Check collisions with police
      for (const police of game.policeList) {
        if (
          bullet.position.y < police.position.y + police.height &&
          bullet.position.y + bullet.height > police.position.y &&
          bullet.position.x < police.position.x + police.width &&
          bullet.position.x + bullet.width > police.position.x
        ) {
          game.collidedObject = police;
          bullet.hide();
          return true;
        }
      }
    }

    return false;
  }
}
