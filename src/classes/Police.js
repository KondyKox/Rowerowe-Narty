class Police extends Sprite {
  constructor(x, y, imageSrc, speed, direction, gameBounds, policeList) {
    super(x, y, imageSrc, 150, 110);

    this.speed = speed;
    this.direction = direction;
    this.gameBounds = gameBounds;
    this.policeList = policeList;
  }

  draw(ctx) {
    if (this.direction === "left")
      ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    else {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(
        this.image,
        -this.position.x - this.width,
        this.position.y,
        this.width,
        this.height
      );
      ctx.restore();
    }
  }

  update() {
    if (this.direction === "right") {
      this.position.x += this.speed;

      if (this.position.x >= this.gameBounds.right) this.destroy();
    } else if (this.direction === "left") {
      this.position.x -= this.speed;

      if (this.position.x + this.width <= this.gameBounds.left) this.destroy();
    }
  }

  destroy() {
    this.policeList.splice(this.policeList.indexOf(this), 1);
  }
}
