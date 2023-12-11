export default class Particle {
  constructor(canvas, ctx, gravity, x, y, velocity, radius) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.gravity = gravity;
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };
    this.radius = radius;

    this.lifeSpan = 100;
  }

  draw() {
    this.lifeSpan--;
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = "#265c42";
    this.ctx.fill();
    this.ctx.closePath();
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.position.y + this.radius + this.velocity.y <= this.canvas.height) {
      this.velocity.y += this.gravity * 0.2;
    }
  }
}
