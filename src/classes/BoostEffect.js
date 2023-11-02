class BoostEffect extends Sprite {
  constructor(
    x,
    y,
    imageSrc,
    gravity,
    width,
    height,
    gameBounds,
    boostsList,
    effect
  ) {
    super(x, y, imageSrc, width, height);

    this.gravity = gravity;
    this.gameBounds = gameBounds;
    this.boostsList = boostsList;
    this.effect = effect;
  }

  update() {
    this.position.y += this.gravity;

    if (this.position.y>= this.gameBounds.bottom) this.destroy();
  }

  destroy() {
    this.boostsList.splice(this.boostsList.indexOf(this), 1);
  }
}
