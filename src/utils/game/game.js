import { game } from "../../MainPlay.js";
import CollisionHandler from "../../game_states/CollisionHandler.js";
import BoostEffect from "../../classes/BoostEffect.js";
// import { saveUserStats } from "../../controllers/user.controller.js";

// Game loop function
let gameLoopID;

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
    game.scoreEl[0].innerHTML = game.score;

    if (game.score >= game.bestScore)
      game.bestScoreEl[0].innerHTML = game.newBestScore;
    else game.bestScoreEl[0].innerHTML = game.bestScore;

    game.score += game.MULTIPLIER;
    game.newBestScore = game.score;

    game.coinEl.innerHTML = game.coins;

    // Creating player
    game.player.draw(game.ctx);
    game.player.update();

    CollisionHandler.checkCollisions();
    CollisionHandler.boostEffects();
  }

  if (!gameIsOver) gameLoopID = requestAnimationFrame(gameLoop);
}

// Finish the game
let gameIsOver = false;

async function gameOver() {
  if (gameIsOver) return;

  gameIsOver = true;

  // Game over screen
  game.canvas.style.display = "none";
  game.game_over.style.display = "flex";

  // Update best score
  if (game.newBestScore > parseInt(game.bestScore))
    localStorage.setItem("bestScore", newBestScore.toString());

  game.scoreEl[1].innerHTML = game.score;
  game.bestScoreEl[1].innerHTML = localStorage.getItem("bestScore");

  // Update coins
  localStorage.setItem("coins", game.coins);

  // Save user stats to the server
  try {
    await saveUserStats({
      coins: game.coins,
      bestScore: game.newBestScore,
    });

    console.log("User stats saved successfully!");
  } catch (error) {
    console.error("Error saving user stats:", error);
  }

  // cancelAnimationFrame(gameLoopID); // Stop the game

  // Start the game again
  document.addEventListener("click", () => {
    // Reload page to start again
    window.location.reload();
  });
}

// Start the game
gameLoopID = requestAnimationFrame(gameLoop);
