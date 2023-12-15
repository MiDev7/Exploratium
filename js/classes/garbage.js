export default class Garbage {
  constructor(canvas, ctx, gravity, x, y, image) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.gravity = gravity;
    this.image = image;
    this.position = {
      x,
      y,
    };

    this.width = this.image.width;
    this.height = this.image.height;

    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.position.x,
      this.position.y,
      this.width * 0.75,
      this.height * 0.75
    );
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
      this.velocity.y += this.gravity;
    }
  }
}
