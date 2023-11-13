// Faster player
function speed() {
  speedSfx.play();

  PLAYER_SPEED = ACCELERATED_SPEED;

  document.querySelector(".speed").style.display = "block";
}

// Shot with pistol
let direction;

function pistol(key) {
  switch (key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }

  const newShootSfx = shootSfx.cloneNode();
  newShootSfx.play();

  ammunition--;

  generateBullets(bulletList, gameBounds, direction);
  direction = null;

  document.querySelector(".ammo").innerHTML = ammunition;

  if (ammunition <= 0) {
    PISTOL = false;

    bulletList.forEach((bullet) => bullet.destroy());

    document.querySelector(".pistol").style.display = "none";
    document.querySelector(".ammo").innerHTML = "";
  }
}

function objectShotDown() {
  collidedObject.possibleCollision = false;
  collidedObject.hide();
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
    collidedObject.hide();

    SHIELD = false;
    collidedObject = null;
  }
}
