class Player {
  constructor(x, y, imageSrc) {
    this.position = {
      x: x,
      y: y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.image = new Image();
    this.image.src = imageSrc;
    this.width = 150;
    this.height = 110;
    this.direction = "left";

    this.sides = {
      bottom: this.position.y + this.height,
      top: this.position.y,
      right: this.position.x + this.width,
      left: this.position.x,
    };

    this.loaded = false;

    this.image.onload = () => {
      this.loaded = true;
    };
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
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
  }
}
