import { game } from "../../MainPlay.js";
import CollisionHandler from "../../classes/game_states/CollisionHandler.js";
import BoostEffect from "../../classes/BoostEffect.js";
import gameOverScreen from "../ui/gameOver.js";

let gameIsOver = false;

// Game loop function
function gameLoop() {
  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);

  // Player movement
  game.player.velocity.x = 0;
  game.player.velocity.y = 0;

  if (!CollisionHandler.collisionWithPuddles()) {
    if (game.keys.w.pressed) game.player.velocity.y = -game.PLAYER_SPEED;
    if (game.keys.s.pressed) game.player.velocity.y = game.PLAYER_SPEED;
    if (game.keys.a.pressed) game.player.velocity.x = -game.PLAYER_SPEED;
    if (game.keys.d.pressed) game.player.velocity.x = game.PLAYER_SPEED;
  } else {
    if (game.keys.w.pressed) game.player.velocity.y = -game.SLOWED_DOWN;
    if (game.keys.s.pressed) game.player.velocity.y = game.SLOWED_DOWN;
    if (game.keys.a.pressed) game.player.velocity.x = -game.SLOWED_DOWN;
    if (game.keys.d.pressed) game.player.velocity.x = game.SLOWED_DOWN;
  }

  // Shoot with pistol
  for (const bullet of game.bulletList) {
    bullet.draw(game.ctx);
    bullet.update();
  }

  if (game.PISTOL && CollisionHandler.bulletCollision())
    BoostEffect.objectShotDown();

  if (CollisionHandler.checkCollisions()) {
    // Check for collision with obstacles
    if (!game.SHIELD) gameOver();
    else if (game.SHIELD) BoostEffect.shield();
  } else {
    // Creating obstacles
    for (const obstacle of game.obstacleList) {
      if (game.OBSTACLES_GRAVITY <= 7) {
        if (game.score >= game.checkpoint + 1000) {
          game.checkpoint = game.score;

          game.OBSTACLES_GRAVITY += 0.15;
        }
      }

      obstacle.draw(game.ctx);
      obstacle.update();
    }

    // Creating puddles
    for (const puddle of game.puddlesList) {
      puddle.draw(game.ctx);
      puddle.update();
    }

    // Creating police
    for (const police of game.policeList) {
      if (game.POLICE_SPEED <= 8) {
        if (game.score >= game.checkpoint + 1000) {
          game.checkpoint = game.score;

          game.POLICE_SPEED += 0.2;
        }
      }

      police.draw(game.ctx);
      police.update();
    }

    // Creating boosts
    for (const boost of game.boostsList) {
      boost.draw(game.ctx);
      boost.update();
    }

    // Counting score
    game.scoreEl[0].textContent = game.score;

    if (game.score >= game.bestScore)
      game.bestScoreEl[0].textContent = game.newBestScore;
    else game.bestScoreEl[0].textContent = game.bestScore;

    game.score += game.MULTIPLIER;
    game.newBestScore = game.score;

    game.coinEl.textContent = game.coins;

    // Creating player
    game.player.draw(game.ctx);
    game.player.update();

    CollisionHandler.checkCollisions();
    CollisionHandler.boostEffects();
  }

  if (!gameIsOver) requestAnimationFrame(gameLoop);
}

// Finish the game
function gameOver() {
  if (gameIsOver) return;

  gameIsOver = true;

  // Game over screen
  gameOverScreen();

  // Update best score
  if (game.newBestScore > parseInt(game.bestScore))
    localStorage.setItem("bestScore", newBestScore.toString());

  document.querySelector(".score__over").textContent = game.score;
  document.querySelector(".best-score__over").textContent =
    localStorage.getItem("bestScore");

  // Update coins
  localStorage.setItem("coins", game.coins);

  // Start the game again
  document.addEventListener("click", () => {
    // Reload page to start again
    window.location.reload();
  });
}

// Start the game
requestAnimationFrame(gameLoop);
