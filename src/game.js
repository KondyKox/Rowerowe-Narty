// Game loop function
let gameLoopID;

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player movement
  player.velocity.x = 0;
  player.velocity.y = 0;

  if (!collisionWithPuddles()) {
    if (keys.w.pressed) player.velocity.y = -PLAYER_SPEED;
    if (keys.s.pressed) player.velocity.y = PLAYER_SPEED;
    if (keys.a.pressed) player.velocity.x = -PLAYER_SPEED;
    if (keys.d.pressed) player.velocity.x = PLAYER_SPEED;
  } else {
    if (keys.w.pressed) player.velocity.y = -SLOWED_DOWN;
    if (keys.s.pressed) player.velocity.y = SLOWED_DOWN;
    if (keys.a.pressed) player.velocity.x = -SLOWED_DOWN;
    if (keys.d.pressed) player.velocity.x = SLOWED_DOWN;
  }

  // Shoot with pistol
  if (PISTOL) {
    for (const bullet of bulletList) {
      bullet.draw(ctx);
      bullet.update();
      console.log(bulletList);
    }
  }

  // Check for collision with obstacles
  if (checkCollisions()) {
    if (!SHIELD) gameOver();
    else if (SHIELD) shield();
  } else {
    // Creating obstacles
    for (const obstacle of obstacleList) {
      if (OBSTACLES_GRAVITY <= 7) {
        if (score >= checkpoint + 1000) {
          checkpoint = score;

          OBSTACLES_GRAVITY += 0.15;
        }
      }

      obstacle.draw(ctx);
      obstacle.update();
    }

    // Creating puddles
    for (const puddle of puddlesList) {
      puddle.draw(ctx);
      puddle.update();
    }

    // Creating police
    for (const police of policeList) {
      if (POLICE_SPEED <= 8) {
        if (score >= checkpoint + 1000) {
          checkpoint = score;

          POLICE_SPEED += 0.2;
        }
      }

      police.draw(ctx);
      police.update();
    }

    // Creating boosts
    for (const boost of boostsList) {
      boost.draw(ctx);
      boost.update();
    }

    // Counting score
    scoreEl[0].innerHTML = score;

    if (score >= bestScore) bestScoreEl[0].innerHTML = newBestScore;
    else bestScoreEl[0].innerHTML = bestScore;

    score += MULTIPLIER;
    newBestScore = score;

    // Creating player
    player.draw(ctx);
    player.update();

    checkCollisions();
    boostEffects();
  }

  if (!gameIsOver) gameLoopID = requestAnimationFrame(gameLoop);
}

// Finish the game
let gameIsOver = false;

function gameOver() {
  gameIsOver = true;

  // Game over screen
  canvas.style.display = "none";
  game_over.style.display = "flex";

  if (newBestScore > parseInt(bestScore))
    localStorage.setItem("bestScore", newBestScore.toString());

  scoreEl[1].innerHTML = score;
  bestScoreEl[1].innerHTML = localStorage.getItem("bestScore");

  // cancelAnimationFrame(gameLoopID); // Stop the game

  // Start the game again
  document.addEventListener("click", () => {
    // Reload page to start again
    window.location.reload();
  });
}
