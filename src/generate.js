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

setInterval(() => {
  generateObstacles(obstacleList, gameBounds, numberOfObstacles);
}, 1500);

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

setInterval(() => {
  generatePuddles(puddlesList, gameBounds, numberOfObstacles);
}, 2000);