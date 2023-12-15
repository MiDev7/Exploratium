/**
 * Represents a Stopwatch.
 * @class
 */
export default class Stopwatch {
  /**
   * Creates an instance of Stopwatch.
   * @constructor
   * @param {HTMLCanvasElement} canvas - The canvas element.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context.
   * @param {number} x - The x-coordinate of the stopwatch position.
   * @param {number} y - The y-coordinate of the stopwatch position.
   */
  constructor(canvas, ctx, x, y) {
    this.startTime = 0;
    this.isRunning = false;
    this.elapsedTime = 0;
    this.canvas = canvas;
    this.ctx = ctx;
    this.position = {
      x,
      y,
    };
    this.loadFromLocalStorage();
    this.draw();
  }

  /**
   * Starts the stopwatch.
   */
  start() {
    if (!this.isRunning) {
      this.startTime = Date.now() - this.elapsedTime;
      this.isRunning = true;
      this.update();
    }
  }

  /**
   * Stops the stopwatch.
   */
  stop() {
    if (this.isRunning) {
      this.isRunning = false;
      this.saveToLocalStorage();
    }
  }

  /**
   * Resets the stopwatch.
   */
  reset() {
    this.startTime = Date.now();
    this.elapsedTime = 0;
    this.draw();
  }

  /**
   * Updates the stopwatch.
   */
  update() {
    if (this.isRunning) {
      this.elapsedTime = Date.now() - this.startTime;
      this.draw();
      requestAnimationFrame(() => this.update());
    }
  }

  /**
   * Draws the stopwatch on the canvas.
   */
  draw() {
    const minutes = Math.floor(this.elapsedTime / 60000);
    const seconds = ((this.elapsedTime % 60000) / 1000).toFixed(2);

    this.ctx.font = "35px Arial black";
    this.ctx.fillText(
      `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(5, "0")}`,
      this.position.x,
      this.position.y
    );
  }

  /**
   * Saves the stopwatch data to local storage.
   */
  saveToLocalStorage() {
    localStorage.setItem(
      "stopwatch",
      JSON.stringify({
        startTime: this.startTime,
        isRunning: this.isRunning,
        elapsedTime: this.elapsedTime,
      })
    );
  }

  /**
   * Loads the stopwatch data from local storage.
   */
  loadFromLocalStorage() {
    const data = localStorage.getItem("stopwatch");
    if (data) {
      const savedData = JSON.parse(data);
      this.startTime = savedData.startTime || 0;
      this.isRunning = savedData.isRunning || false;
      this.elapsedTime = savedData.elapsedTime || 0;
    }
  }

  /**
   * Gets the elapsed time of the stopwatch.
   * @returns {number} The elapsed time in milliseconds.
   */
  getElapsedTime() {
    console.log(this.elapsedTime);
    return this.elapsedTime;
  }
}
