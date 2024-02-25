// Generator.js
import { gameCanvas } from "../../MainPlay.js";
import Obstacle from "../Obstacle.js";
import BoostEffect from "../BoostEffect.js";
import Police from "../Police.js";
import Bullet from "../Bullet.js";

export default class Generator {
  // Generate obstacles
  static generateObstacles(game) {
    for (let i = 0; i < game.numberOfObstacles; i++) {
      const obstacleImg = "../public/img/enemy.png";

      const randomX =
        Math.random() *
          (gameCanvas.gameBounds.right - gameCanvas.gameBounds.left) +
        gameCanvas.gameBounds.left;

      const newObstacle = new Obstacle(
        randomX,
        gameCanvas.gameBounds.top - 10,
        obstacleImg,
        game.OBSTACLES_GRAVITY,
        150,
        110,
        gameCanvas.gameBounds,
        game.obstacleList
      );

      game.obstacleList.push(newObstacle);
    }
  }

  // Generate puddles
  static generatePuddles(game) {
    for (let i = 0; i < game.numberOfObstacles; i++) {
      const number = Math.floor(Math.random() * 2) + 1;

      const puddleImg = `../public/img/puddle${number}.png`;

      const randomX =
        Math.random() *
          (gameCanvas.gameBounds.right - gameCanvas.gameBounds.left) +
        gameCanvas.gameBounds.left;

      const newPuddle = new Obstacle(
        randomX,
        gameCanvas.gameBounds.top - 10,
        puddleImg,
        2,
        150,
        110,
        gameCanvas.gameBounds,
        game.puddlesList
      );

      game.puddlesList.push(newPuddle);
    }
  }

  // Generate police
  static generatePolice(game) {
    for (let i = 0; i < game.numberOfPolice; i++) {
      const policeX = this.getX(
        gameCanvas.gameBounds.left,
        gameCanvas.gameBounds.right
      ).x;
      const direction = this.getX(
        gameCanvas.gameBounds.left,
        gameCanvas.gameBounds.right
      ).direction;

      const policeImg = "../public/img/police.png";

      const newPolice = new Police(
        policeX,
        gameCanvas.player.position.y,
        policeImg,
        game.POLICE_SPEED,
        direction,
        150,
        110,
        gameCanvas.gameBounds,
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

      const boostImg = `../public/img/boosts/${effect}.png`;

      const randomX =
        Math.random() *
          (gameCanvas.gameBounds.right - gameCanvas.gameBounds.left) +
        gameCanvas.gameBounds.left;

      const newBoost = new BoostEffect(
        randomX,
        gameCanvas.gameBounds.top - 10,
        boostImg,
        2,
        100,
        100,
        gameCanvas.gameBounds,
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
    const bulletImg = `../public/img/boosts/bullet.png`;

    const newBullet = new Bullet(
      gameCanvas.player.position.x + gameCanvas.player.width / 2,
      gameCanvas.player.position.y + gameCanvas.player.height / 2,
      bulletImg,
      30,
      30,
      5,
      gameCanvas.gameBounds,
      game.bulletList,
      game.shootDirection
    );

    game.bulletList.push(newBullet);
  }
}
