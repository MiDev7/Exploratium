/**
 * Represents a generic object in the game.
 * @class
 */
export default class GenericObject {
  /**
   * Creates a new instance of GenericObject.
   * @constructor
   * @param {HTMLCanvasElement} canvas - The canvas element.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   * @param {HTMLImageElement} image - The image of the object.
   * @param {number} x - The x-coordinate of the object's position.
   * @param {number} y - The y-coordinate of the object's position.
   * @param {number} [width=canvas.width] - The width of the object.
   * @param {number} [height=canvas.height] - The height of the object.
   */
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

  /**
   * Draws the object on the canvas.
   */
  draw() {
    this.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  /**
   * Updates the object's position and draws it on the canvas.
   */
  update() {
    this.draw();
    this.position.x += this.velocityX;
  }
}
