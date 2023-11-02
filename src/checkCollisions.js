function checkCollisions() {
  // Check for collision with game bounds
  if (player.position.y <= gameBounds.top) player.position.y = gameBounds.top;
  if (player.position.y + player.height >= gameBounds.bottom)
    player.position.y = gameBounds.bottom - player.height;
  if (player.position.x <= gameBounds.left) player.position.x = gameBounds.left;
  if (player.position.x + player.width >= gameBounds.right)
    player.position.x = gameBounds.right - player.width;

  // Check for collision with obstacles
  for (const obstacle of obstacleList) {
    if (
      player.position.y < obstacle.position.y + obstacle.height &&
      player.position.y + player.height > obstacle.position.y &&
      player.position.x < obstacle.position.x + obstacle.width &&
      player.position.x + player.width > obstacle.position.x
    ) {
      collidedObject = obstacle;

      return true;
    }
  }

  // Check for collision with police
  for (const police of policeList) {
    if (
      player.position.y < police.position.y + police.height &&
      player.position.y + player.height > police.position.y &&
      player.position.x < police.position.x + police.width &&
      player.position.x + player.width > police.position.x
    ) {
      collidedObject = police;

      return true;
    }
  }
}

// Check for collision with puddles
function collisionWithPuddles() {
  for (const puddle of puddlesList) {
    if (
      player.position.y < puddle.position.y + puddle.height &&
      player.position.y + player.height > puddle.position.y &&
      player.position.x < puddle.position.x + puddle.width &&
      player.position.x + player.width > puddle.position.x
    )
      return true;
  }
}

// Check for collision with boost effects
function boostEffects() {
  for (const boost of boostsList) {
    if (
      player.position.y < boost.position.y + boost.height &&
      player.position.y + player.height > boost.position.y &&
      player.position.x < boost.position.x + boost.width &&
      player.position.x + player.width > boost.position.x
    ) {
      const effect = boost.effect;

      switch (effect) {
        case "speed":
          setInterval(() => {
            speed();
          }, 5000);
          PLAYER_SPEED = DEFAULT_SPEED;
          boost.destroy();
          break;
        case "pistol":
          pistol();
          boost.destroy();
          break;
        case "shotgun":
          shotgun();
          boost.destroy();
          break;
        case "multiplier":
          setInterval(() => {
            multiplier();
          }, 5000);
          boost.destroy();
          break;
        case "shield":
          shield();
          boost.destroy();
          break;
        default:
          break;
      }
    }
  }
}
