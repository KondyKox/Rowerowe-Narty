// Faster player
function speed() {
  PLAYER_SPEED = ACCELERATED_SPEED;
}

// Shot with pistol
function pistol(direction) {
  if (ammunition > 0) {
    generateBullets(bulletList, gameBounds, direction);
    ammunition--;
    direction = null;

    if (bulletCollision && collidedObject != null)
      collidedObject.possibleCollision = false;
  } else PISTOL = false;
}

// // Multiple shots with shotgun
// function shotgun() {}

// More points
function multiplier() {
  MULTIPLIER = 2;
}

// Protect from 1 hit
function shield() {
  if (collidedObject != null) {
    collidedObject.possibleCollision = false;

    SHIELD = false;
    collidedObject = null;
  }
}
