export class Player {
  constructor(gravity, canvas, ctx, x, y, color) {
    this.position = {
      x,
      y,
    };
    this.height = 50;
    this.width = 50;
    this.color = color;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.ctx = ctx;
    this.canvas = canvas;
    this.gravity = gravity;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    this.velocity.y += this.gravity;
  }
}
