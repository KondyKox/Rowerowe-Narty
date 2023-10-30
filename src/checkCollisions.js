// Check for collision with game bounds
function gameBoundsCollision() {
  if (player.position.y <= gameBounds.top) player.position.y = gameBounds.top;
  if (player.position.y + player.height >= gameBounds.bottom)
    player.position.y = gameBounds.bottom - player.height;
  if (player.position.x <= gameBounds.left) player.position.x = gameBounds.left;
  if (player.position.x + player.width >= gameBounds.right)
    player.position.x = gameBounds.right - player.width;
}

// Check for collision with obstacles
function collisionWithObstacles() {
  for (const obstacle of obstacleList) {
    if (
      player.position.y < obstacle.position.y + obstacle.height &&
      player.position.y + player.height > obstacle.position.y &&
      player.position.x < obstacle.position.x + obstacle.width &&
      player.position.x + player.width > obstacle.position.x
    )
      return true;
  }
}
