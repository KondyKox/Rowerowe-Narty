// Faster player
function speed() {
  PLAYER_SPEED = ACCELERATED_SPEED;
  console.log(PLAYER_SPEED);
}

// Shot with pistol
function pistol() {}

// Multipler shots with shotgun
function shotgun() {}

// More points
function multiplier() {
  MULTIPLIER = 2;
  console.log(MULTIPLIER);
}

// Protect from 1 hit
function shield() {
  SHIELD = true;

  if (checkCollisions()) {
    collidedObject.destroy();

    SHIELD = false;
  }
}
