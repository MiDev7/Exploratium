/**
 * Represents a PowerUp object.
 * @class
 */
export default class PowerUp {
  /**
   * Creates a new PowerUp object.
   * @constructor
   * @param {HTMLCanvasElement} canvas - The canvas element.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
   * @param {number} [gravity=0] - The gravity value.
   * @param {number} x - The x-coordinate of the PowerUp's position.
   * @param {number} y - The y-coordinate of the PowerUp's position.
   * @param {Image} image - The image of the PowerUp.
   * @param {Object} [velocity={ x: 0, y: 0 }] - The velocity of the PowerUp.
   */
  constructor(
    canvas,
    ctx,
    gravity = 0,
    x,
    y,
    image,
    velocity = { x: 0, y: 0 }
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.gravity = gravity;
    this.image = image;
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };
    this.scale = 1;
    this.width = 64 * this.scale;
    this.height = 64 * this.scale;

    // ! Animation settings
    this.frames = 0;
    this.frameRate = 3;
    this.frameDelay; //* Calculate the delay for the desired frame rate
    this.frameCount = 0;
    this.frames = 0;
  }

  /**
   * Draws the PowerUp on the canvas.
   */
  draw() {
    this.ctx.drawImage(
      this.image,
      64 * this.frames,
      0,
      64,
      64,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  /**
   * Updates the PowerUp's position and animation.
   */
  update() {
    this.frameCount++;
    this.frameDelay = 60 / this.frameRate;
    if (this.frameCount >= this.frameDelay) {
      this.frameCount = 0;
      this.frames++;
      if (this.frames > 3) {
        this.frames = 0;
      }
    }
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
      this.velocity.y += this.gravity * 0.2;
    }
  }
}
