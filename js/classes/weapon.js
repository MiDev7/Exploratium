import { loadImage } from "../utils/loadImage.js";

export default class Weapon {
  constructor(canvas, ctx, gravity, x, y, velocity) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.gravity = gravity;
    this.position = {
      x,
      y,
    };

    this.scale = 2;
    this.height = 3 * this.scale;
    this.width = 48 * this.scale;
    this.image = loadImage("../../assets/Arrow.png");
    this.velocity = {
      x: velocity,
      y: 0,
    };
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
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
      this.velocity.y += this.gravity;
    }
  }
}
