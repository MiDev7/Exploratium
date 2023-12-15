/**
 * Represents a Garbage object.
 * @class
 */
export default class Garbage {
  /**
   * Creates a new Garbage object.
   * @constructor
   * @param {HTMLCanvasElement} canvas - The canvas element.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
   * @param {number} gravity - The gravity value.
   * @param {number} x - The initial x position.
   * @param {number} y - The initial y position.
   * @param {HTMLImageElement} image - The image of the garbage.
   */
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

  /**
   * Draws the garbage on the canvas.
   */
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

  /**
   * Updates the position of the garbage.
   */
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
      this.velocity.y += this.gravity;
    }
  }
}
