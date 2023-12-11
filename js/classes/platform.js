export default class Platform {
  constructor(canvas, ctx, image, x, y, width, height) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.image = image;
    this.position = {
      x,
      y,
    };
    this.width = this.image.width;
    this.height = this.image.height;
  }

  draw() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
