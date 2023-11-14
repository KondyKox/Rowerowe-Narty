import Sprite from './Sprite.js';

export default class Obstacle extends Sprite {
  constructor(x, y, imageSrc, gravity, gameBounds, obstacleList) {
    super(x, y, imageSrc, 150, 110);

    this.gravity = gravity;
    this.gameBounds = gameBounds;
    this.obstacleList = obstacleList;
    this.possibleCollision = true;
  }

  update() {
    this.position.y += this.gravity;

    if (this.position.y + this.height >= this.gameBounds.bottom) this.destroy();
  }

  destroy() {
    this.obstacleList.splice(this.obstacleList.indexOf(this), 1);
  }
}
