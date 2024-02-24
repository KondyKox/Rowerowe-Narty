import { gameState, soundManager, gameCanvas } from "../../MainPlay.js";
import BoostEffect from "../BoostEffect.js";

export default class CollisionHandler {
  static checkCollisions() {
    // Check for collision with game bounds
    if (gameCanvas.player.position.y <= gameCanvas.gameBounds.top)
      gameCanvas.player.position.y = gameCanvas.gameBounds.top;
    if (
      gameCanvas.player.position.y + gameCanvas.player.height >=
      gameCanvas.gameBounds.bottom
    )
      gameCanvas.player.position.y =
        gameCanvas.gameBounds.bottom - gameCanvas.player.height;
    if (gameCanvas.player.position.x <= gameCanvas.gameBounds.left)
      gameCanvas.player.position.x = gameCanvas.gameBounds.left;
    if (
      gameCanvas.player.position.x + gameCanvas.player.width >=
      gameCanvas.gameBounds.right
    )
      gameCanvas.player.position.x =
        gameCanvas.gameBounds.right - gameCanvas.player.width;

    // Check for collision with obstacles
    for (const obstacle of gameState.obstacleList) {
      if (
        gameCanvas.player.position.y < obstacle.position.y + obstacle.height &&
        gameCanvas.player.position.y + gameCanvas.player.height >
          obstacle.position.y &&
        gameCanvas.player.position.x < obstacle.position.x + obstacle.width &&
        gameCanvas.player.position.x + gameCanvas.player.width >
          obstacle.position.x
      )
        if (obstacle.possibleCollision) {
          gameState.collidedObject = obstacle;

          soundManager.chickenSfx.play();

          return true;
        }
    }

    // Check for collision with police
    for (const police of gameState.policeList) {
      if (
        gameCanvas.player.position.y < police.position.y + police.height &&
        gameCanvas.player.position.y + gameCanvas.player.height >
          police.position.y &&
        gameCanvas.player.position.x < police.position.x + police.width &&
        gameCanvas.player.position.x + gameCanvas.player.width >
          police.position.x
      )
        if (police.possibleCollision) {
          gameState.collidedObject = police;

          soundManager.policeSfx.play();

          return true;
        }
    }
  }

  // Check for collision with puddles
  static collisionWithPuddles() {
    for (const puddle of gameState.puddlesList) {
      if (
        gameCanvas.player.position.y < puddle.position.y + puddle.height &&
        gameCanvas.player.position.y + gameCanvas.player.height >
          puddle.position.y &&
        gameCanvas.player.position.x < puddle.position.x + puddle.width &&
        gameCanvas.player.position.x + gameCanvas.player.width >
          puddle.position.x
      ) {
        soundManager.puddleSfx.play();

        return true;
      }
    }
  }

  // Check for collision with boost effects
  static boostEffects() {
    for (const boost of gameState.boostsList) {
      if (
        gameCanvas.player.position.y < boost.position.y + boost.height &&
        gameCanvas.player.position.y + gameCanvas.player.height >
          boost.position.y &&
        gameCanvas.player.position.x < boost.position.x + boost.width &&
        gameCanvas.player.position.x + gameCanvas.player.width >
          boost.position.x
      ) {
        const effect = boost.effect;

        switch (effect) {
          case "speed":
            BoostEffect.speed();
            boost.destroy();
            setTimeout(() => {
              gameCanvas.PLAYER_SPEED = gameState.DEFAULT_SPEED;
              document.querySelector(".speed").classList.add("inactive");
            }, 5000);
            break;

          case "pistol":
            soundManager.pistolSfx.play();

            gameState.ammunition = 10;
            gameState.PISTOL = true;

            document.querySelector(".pistol").classList.remove("inactive");
            document.querySelector(".ammo").textContent = gameState.ammunition;
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
              gameState.MULTIPLIER = 1;
              document.querySelector(".multi").classList.add("inactive");
            }, 5000);
            break;

          case "shield":
            soundManager.shieldSfx.play();

            gameState.SHIELD = true;
            document.querySelector(".shield").classList.remove("inactive");
            boost.destroy();
            break;

          case "coin":
            soundManager.coinSfx.play();

            gameState.coins++;
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
    for (const bullet of gameState.bulletList) {
      // Check collisions with obstacles
      for (const obstacle of gameState.obstacleList) {
        if (
          bullet.position.y < obstacle.position.y + obstacle.height &&
          bullet.position.y + bullet.height > obstacle.position.y &&
          bullet.position.x < obstacle.position.x + obstacle.width &&
          bullet.position.x + bullet.width > obstacle.position.x
        ) {
          gameState.collidedObject = obstacle;
          bullet.hide();
          return true;
        }
      }

      // Check collisions with police
      for (const police of gameState.policeList) {
        if (
          bullet.position.y < police.position.y + police.height &&
          bullet.position.y + bullet.height > police.position.y &&
          bullet.position.x < police.position.x + police.width &&
          bullet.position.x + bullet.width > police.position.x
        ) {
          gameState.collidedObject = police;
          bullet.hide();
          return true;
        }
      }
    }

    return false;
  }
}
