class Player {
  constructor(x, y, imageSrc) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width;
      this.height = this.image.height;
    };
    this.image.src = imageSrc;
    this.loaded = false;
  }

  draw() {
    if (!this.loaded) return;

    c.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}
