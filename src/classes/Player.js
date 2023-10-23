class Player extends Sprite {
  constructor(x, y, imageSrc) {
    super(x, y, imageSrc, 150, 110);

    this.direction = "left";
  }

  // Draw a player
  draw(ctx) {
    if (!this.loaded) return;

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

  // Update player
  update() {
    super.update();
  }
}
