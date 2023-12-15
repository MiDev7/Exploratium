/**
 * Represents a particle in a canvas.
 * @class
 */
export default class Particle {
  /**
   * Creates a new Particle object.
   * @constructor
   * @param {HTMLCanvasElement} canvas - The canvas element.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   * @param {number} gravity - The gravity value for the particle.
   * @param {number} x - The x-coordinate of the particle's initial position.
   * @param {number} y - The y-coordinate of the particle's initial position.
   * @param {Object} velocity - The velocity of the particle.
   * @param {number} velocity.x - The x-component of the particle's velocity.
   * @param {number} velocity.y - The y-component of the particle's velocity.
   * @param {number} radius - The radius of the particle.
   * @param {string} [colour="#265c42"] - The color of the particle.
   * @param {boolean} [fades=false] - Indicates whether the particle fades over time.
   */
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

  /**
   * Draws the particle on the canvas.
   */
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

  /**
   * Updates the particle's position and properties.
   */
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
