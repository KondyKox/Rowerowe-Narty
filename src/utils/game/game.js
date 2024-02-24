import { gameState, inputManager, gameCanvas } from "../../MainPlay.js";
import CollisionHandler from "../../classes/game_states/CollisionHandler.js";
import BoostEffect from "../../classes/BoostEffect.js";
import gameOverScreen from "../ui/gameOver.js";

// game loop function
function gameLoop() {
  gameCanvas.ctx.clearRect(
    0,
    0,
    gameCanvas.canvas.width,
    gameCanvas.canvas.height
  );

  // Player movement
  gameCanvas.player.velocity.x = 0;
  gameCanvas.player.velocity.y = 0;

  if (!CollisionHandler.collisionWithPuddles()) {
    if (inputManager.keys.w.pressed)
      gameCanvas.player.velocity.y = -gameState.PLAYER_SPEED;
    if (inputManager.keys.s.pressed)
      gameCanvas.player.velocity.y = gameState.PLAYER_SPEED;
    if (inputManager.keys.a.pressed)
      gameCanvas.player.velocity.x = -gameState.PLAYER_SPEED;
    if (inputManager.keys.d.pressed)
      gameCanvas.player.velocity.x = gameState.PLAYER_SPEED;
  } else {
    if (inputManager.keys.w.pressed)
      gameCanvas.player.velocity.y = -gameState.SLOWED_DOWN;
    if (inputManager.keys.s.pressed)
      gameCanvas.player.velocity.y = gameState.SLOWED_DOWN;
    if (inputManager.keys.a.pressed)
      gameCanvas.player.velocity.x = -gameState.SLOWED_DOWN;
    if (inputManager.keys.d.pressed)
      gameCanvas.player.velocity.x = gameState.SLOWED_DOWN;
  }

  // Shoot with pistol
  for (const bullet of gameState.bulletList) {
    bullet.draw(gameCanvas.ctx);
    bullet.update();
  }

  if (gameState.PISTOL && CollisionHandler.bulletCollision())
    BoostEffect.objectShotDown();

  if (CollisionHandler.checkCollisions()) {
    // Check for collision with obstacles
    if (!gameState.SHIELD) gameOver();
    else if (gameState.SHIELD) BoostEffect.shield();
  } else {
    // Creating obstacles
    for (const obstacle of gameState.obstacleList) {
      if (gameState.OBSTACLES_GRAVITY <= 7) {
        if (gameState.score >= gameState.checkpoint + 1000) {
          gameState.checkpoint = gameState.score;

          gameState.OBSTACLES_GRAVITY += 0.15;
        }
      }

      obstacle.draw(gameCanvas.ctx);
      obstacle.update();
    }

    // Creating puddles
    for (const puddle of gameState.puddlesList) {
      puddle.draw(gameCanvas.ctx);
      puddle.update();
    }

    // Creating police
    for (const police of gameState.policeList) {
      if (gameState.POLICE_SPEED <= 8) {
        if (gameState.score >= gameState.checkpoint + 1000) {
          gameState.checkpoint = gameState.score;

          gameState.POLICE_SPEED += 0.2;
        }
      }

      police.draw(gameCanvas.ctx);
      police.update();
    }

    // Creating boosts
    for (const boost of gameState.boostsList) {
      boost.draw(gameCanvas.ctx);
      boost.update();
    }

    // Counting score
    gameCanvas.scoreEl.textContent = gameState.score;

    if (gameState.score >= gameState.bestScore)
      gameCanvas.bestScoreEl.textContent = gameState.newBestScore;
    else gameCanvas.bestScoreEl.textContent = gameState.bestScore;

    gameState.score += gameState.MULTIPLIER;
    gameState.newBestScore = gameState.score;

    gameCanvas.coinEl.textContent = gameState.coins;

    // Creating player
    gameCanvas.player.draw(gameCanvas.ctx);
    gameCanvas.player.update();

    CollisionHandler.checkCollisions();
    CollisionHandler.boostEffects();
  }

  if (!gameState.isGameOver) requestAnimationFrame(gameLoop);
}

// Finish the gameState
function gameOver() {
  if (gameState.isGameOver) return;

  gameState.isGameOver = true;

  // game over screen
  gameOverScreen();

  // Update best score
  if (gameState.newBestScore > parseInt(gameState.bestScore))
    localStorage.setItem("bestScore", newBestScore.toString());

  document.querySelector(".score__over").textContent = gameState.score;
  document.querySelector(".best-score__over").textContent =
    localStorage.getItem("bestScore");

  // Update coins
  localStorage.setItem("coins", gameState.coins);

  // Start the game again
  document.addEventListener("click", () => {
    // Reload page to start again
    window.location.reload();
  });
}

// Start the game
requestAnimationFrame(gameLoop);
