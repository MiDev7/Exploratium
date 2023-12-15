export default class Platform {
  constructor(canvas, ctx, image, x, y, block = false, platformer = false) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.image = image;
    this.position = {
      x,
      y,
    };

    this.velocity = {
      x: 0,
    };
    this.width = this.image.width;
    this.height = this.image.height;
    this.block = block;
    this.platformer = platformer;
  }

  draw() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
  }
}
