export default class GenericObject {
  constructor(
    canvas,
    ctx,
    image,
    x,
    y,
    width = canvas.width,
    height = canvas.height
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.position = {
      x,
      y,
    };

    this.image = image;
    this.width = width;
    this.height = height;

    this.velocityX = 0;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    this.position.x += this.velocityX;
  }
}
