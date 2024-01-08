import { loadImage } from "../utils/loadImage.js";

/**
 * Represents a Weapon in the game.
 * @class
 */
export default class Weapon {
  /**
   * Creates a new Weapon instance.
   * @constructor
   * @param {HTMLCanvasElement} canvas - The canvas element.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   * @param {number} gravity - The gravity value for the weapon.
   * @param {number} x - The initial x-coordinate of the weapon.
   * @param {number} y - The initial y-coordinate of the weapon.
   * @param {number} velocity - The initial velocity of the weapon.
   */
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

  /**
   * Draws the weapon on the canvas.
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
   * Updates the position and velocity of the weapon.
   */
  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
      this.velocity.y += this.gravity;
    }
  }
}
