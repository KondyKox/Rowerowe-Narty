class Sprite {
  constructor(x, y, imageSrc, width, height) {
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
    this.width = width;
    this.height = height;

    this.loaded = false;

    this.image.onload = () => {
      this.loaded = true;
    };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
  }
}
