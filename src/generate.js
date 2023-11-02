// Generate obstacles
function generateObstacles(obstacleList, gameBounds, numberOfObstacles) {
  for (let i = 0; i < numberOfObstacles; i++) {
    const obstacleImg = "/enemy.png";

    const randomX =
      Math.random() * (gameBounds.right - gameBounds.left) + gameBounds.left;

    const newObstacle = new Obstacle(
      randomX,
      gameBounds.top - 10,
      obstacleImg,
      OBSTACLES_GRAVITY,
      150,
      110,
      gameBounds,
      obstacleList
    );

    obstacleList.push(newObstacle);
  }
}

// Generate puddles
function generatePuddles(puddlesList, gameBounds, numberOfObstacles) {
  for (let i = 0; i < numberOfObstacles; i++) {
    const number = Math.floor(Math.random() * 2) + 1;

    const puddleImg = `/puddle${number}.png`;

    const randomX =
      Math.random() * (gameBounds.right - gameBounds.left) + gameBounds.left;

    const newPuddle = new Obstacle(
      randomX,
      gameBounds.top - 10,
      puddleImg,
      2,
      150,
      110,
      gameBounds,
      puddlesList
    );

    puddlesList.push(newPuddle);
  }
}

// Generate police
function generatePolice(policeList, gameBounds, numberOfPolice) {
  for (let i = 0; i < numberOfPolice; i++) {
    const policeX = getX(gameBounds.left, gameBounds.right).x;
    const direction = getX(gameBounds.left, gameBounds.right).direction;

    const policeImg = "/police.png";

    const newPolice = new Police(
      policeX,
      player.position.y,
      policeImg,
      POLICE_SPEED,
      direction,
      150,
      110,
      gameBounds,
      policeList
    );

    policeList.push(newPolice);
  }
}

function getX(leftBound, rightBound) {
  if (Math.random() < 0.5) {
    return { x: leftBound, direction: "right" };
  }
  return { x: rightBound, direction: "left" };
}

// Generate boosts
function generateBoosts(boostsList, gameBounds, numberOfBoosts) {
  for (let i = 0; i < numberOfBoosts; i++) {
    const effects = ["speed", "pistol", "shotgun", "multiplier", "shield"];
    const effect = randomEffect(effects);

    const boostImg = `/${effect}.png`;

    const randomX =
      Math.random() * (gameBounds.right - gameBounds.left) + gameBounds.left;

    const newBoost = new BoostEffect(
      randomX,
      gameBounds.top - 10,
      boostImg,
      2,
      100,
      100,
      gameBounds,
      boostsList,
      effect
    );

    boostsList.push(newBoost);
  }
}

function randomEffect(effects) {
  const randomIndex = Math.floor(Math.random() * effects.length);
  return effects[randomIndex];
}

// Generating in time
setInterval(() => {
  generateObstacles(obstacleList, gameBounds, numberOfObstacles);
}, 2100);

setInterval(() => {
  generatePuddles(puddlesList, gameBounds, numberOfObstacles);
}, 2200);

setInterval(() => {
  generatePolice(policeList, gameBounds, numberOfPolice);
}, 2000);

setInterval(() => {
  generateBoosts(boostsList, gameBounds, numberOfBoosts);
}, 5000);
