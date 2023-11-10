// Faster player
function speed() {
  speedSfx.play();

  PLAYER_SPEED = ACCELERATED_SPEED;

  document.querySelector(".speed").style.display = "block";
}

// Shot with pistol
function pistol(direction) {
  const newShootSfx = shootSfx.cloneNode();
  newShootSfx.play();

  ammunition--;

  generateBullets(bulletList, gameBounds, direction);
  direction = null;

  document.querySelector(".ammo").innerHTML = ammunition;

  if (bulletCollision && collidedObject != null)
    collidedObject.possibleCollision = false;
  if (ammunition <= 0) {
    PISTOL = false;

    document.querySelector(".pistol").style.display = "none";
    document.querySelector(".ammo").innerHTML = "";
  }
}

// // Multiple shots with shotgun
// function shotgun() {}

// More points
function multiplier() {
  multiplierSfx.play();

  MULTIPLIER = 2;

  document.querySelector(".multi").style.display = "block";
}

// Protect from 1 hit
function shield() {
  if (collidedObject != null) {
    shieldSfx.play();

    document.querySelector(".shield").style.display = "none";

    collidedObject.possibleCollision = false;

    SHIELD = false;
    collidedObject = null;
  }
}
