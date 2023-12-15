export default class Particle {
  constructor(
    canvas,
    ctx,
    gravity,
    x,
    y,
    velocity,
    radius,
    colour = "#265c42",
    fades = false
  ) {
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
    this.colour = colour;
    this.lifeSpan = 100;
    this.fades = fades;
    this.opacity = 1;
  }

  draw() {
    this.ctx.save();
    this.ctx.globalAlpha = this.opacity;
    this.lifeSpan--;

    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.colour;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.position.y + this.radius + this.velocity.y <= this.canvas.height) {
      this.velocity.y += this.gravity * 0.2;
    }

    if (this.fades && this.opacity > 0) {
      this.opacity -= 0.01;
    }

    if (this.opacity < 0) {
      this.opacity = 0;
    }
  }
}
