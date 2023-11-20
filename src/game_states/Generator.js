// Generator.js
import Obstacle from "../classes/Obstacle.js";
import BoostEffect from "../classes/BoostEffect.js";
import Police from "../classes/Police.js";
import Bullet from "../classes/Bullet.js";

export default class Generator {
  // Generate obstacles
  static generateObstacles(game) {
    for (let i = 0; i < game.numberOfObstacles; i++) {
      const obstacleImg = "./img/enemy.png";

      const randomX =
        Math.random() * (game.gameBounds.right - game.gameBounds.left) +
        game.gameBounds.left;

      const newObstacle = new Obstacle(
        randomX,
        game.gameBounds.top - 10,
        obstacleImg,
        game.OBSTACLES_GRAVITY,
        150,
        110,
        game.gameBounds,
        game.obstacleList
      );

      game.obstacleList.push(newObstacle);
    }
  }

  // Generate puddles
  static generatePuddles(game) {
    for (let i = 0; i < game.numberOfObstacles; i++) {
      const number = Math.floor(Math.random() * 2) + 1;

      const puddleImg = `./img/puddle${number}.png`;

      const randomX =
        Math.random() * (game.gameBounds.right - game.gameBounds.left) +
        game.gameBounds.left;

      const newPuddle = new Obstacle(
        randomX,
        game.gameBounds.top - 10,
        puddleImg,
        2,
        150,
        110,
        game.gameBounds,
        game.puddlesList
      );

      game.puddlesList.push(newPuddle);
    }
  }

  // Generate police
  static generatePolice(game) {
    for (let i = 0; i < game.numberOfPolice; i++) {
      const policeX = this.getX(game.gameBounds.left, game.gameBounds.right).x;
      const direction = this.getX(
        game.gameBounds.left,
        game.gameBounds.right
      ).direction;

      const policeImg = "./img/police.png";

      const newPolice = new Police(
        policeX,
        game.player.position.y,
        policeImg,
        game.POLICE_SPEED,
        direction,
        150,
        110,
        game.gameBounds,
        game.policeList
      );

      game.policeList.push(newPolice);
    }
  }

  static getX(leftBound, rightBound) {
    if (Math.random() < 0.5) {
      return { x: leftBound, direction: "right" };
    }
    return { x: rightBound, direction: "left" };
  }

  // Generate boosts
  static generateBoosts(game) {
    for (let i = 0; i < game.numberOfBoosts; i++) {
      const effects = [
        "speed",
        "pistol" /* "shotgun", */,
        "multiplier",
        "shield",
        "coin",
      ];
      const effect = this.randomEffect(effects);

      const boostImg = `./img/boosts/${effect}.png`;

      const randomX =
        Math.random() * (game.gameBounds.right - game.gameBounds.left) +
        game.gameBounds.left;

      const newBoost = new BoostEffect(
        randomX,
        game.gameBounds.top - 10,
        boostImg,
        2,
        100,
        100,
        game.gameBounds,
        game.boostsList,
        effect
      );

      game.boostsList.push(newBoost);
    }
  }

  static randomEffect(effects) {
    const randomIndex = Math.floor(Math.random() * effects.length);
    return effects[randomIndex];
  }

  // Generate bullets on shoot
  static generateBullets(game) {
    const bulletImg = `./img/boosts/bullet.png`;

    const newBullet = new Bullet(
      game.player.position.x + game.player.width / 2,
      game.player.position.y + game.player.height / 2,
      bulletImg,
      30,
      30,
      5,
      game.gameBounds,
      game.bulletList,
      game.shootDirection
    );

    game.bulletList.push(newBullet);
  }
}
