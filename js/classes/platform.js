/**
 * Represents a platform in the game.
 * @class
 */
export default class Platform {
  /**
   * Creates a new Platform object.
   * @constructor
   * @param {HTMLCanvasElement} canvas - The canvas element.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
   * @param {HTMLImageElement} image - The image of the platform.
   * @param {number} x - The x-coordinate of the platform's position.
   * @param {number} y - The y-coordinate of the platform's position.
   * @param {boolean} [block=false] - Indicates if the platform is a blocking object.
   * @param {boolean} [platformer=false] - Indicates if the platform is a platformer object.
   */
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

  /**
   * Draws the platform on the canvas.
   */
  draw() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y);
  }

  /**
   * Updates the platform's position and draws it on the canvas.
   */
  update() {
    this.draw();
    this.position.x += this.velocity.x;
  }
}
