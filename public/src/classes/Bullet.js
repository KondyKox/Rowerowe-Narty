class Bullet extends Sprite {
  constructor(
    x,
    y,
    imageSrc,
    width,
    height,
    velocity,
    gameBounds,
    bulletList,
    direction
  ) {
    super(x, y, imageSrc, width, height);

    this.velocity = velocity;
    this.gameBounds = gameBounds;
    this.bulletList = bulletList;
    this.direction = direction;
  }

  draw(ctx) {
    if (!this.loaded) return;

    switch (this.direction) {
      case "up":
        ctx.drawImage(
          this.image,
          this.position.x - this.width,
          this.position.y,
          this.width,
          this.height
        );
        break;

      case "down":
        ctx.save();
        ctx.scale(1, -1);
        ctx.drawImage(
          this.image,
          this.position.x,
          -this.position.y,
          this.width,
          this.height
        );
        ctx.restore();
        break;

      case "left":
        ctx.save();
        ctx.rotate(-Math.PI / 2);
        ctx.drawImage(
          this.image,
          -this.position.y - this.height,
          this.position.x,
          this.height,
          this.width
        );
        ctx.restore();
        break;

      case "right":
        ctx.save();
        ctx.rotate(Math.PI / 2);
        ctx.drawImage(
          this.image,
          this.position.y,
          -this.position.x - this.height,
          this.height,
          this.width
        );
        ctx.restore();
        break;

      default:
        break;
    }
  }

  update() {
    switch (this.direction) {
      case "up":
        this.position.y -= this.velocity;
        if (this.position.y + this.height < this.gameBounds.top) this.destroy();
        break;

      case "down":
        this.position.y += this.velocity;
        if (this.position.y > this.gameBounds.bottom) this.destroy();
        break;

      case "left":
        this.position.x -= this.velocity;
        if (this.position.x + this.width < this.gameBounds.left) this.destroy();
        break;

      case "right":
        this.position.x += this.velocity;
        if (this.position.x > this.gameBounds.right) this.destroy();
        break;

      default:
        break;
    }
  }

  destroy() {
    this.bulletList.splice(this.bulletList.indexOf(this), 1);
  }
}
