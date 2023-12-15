export default class Stopwatch {
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

  start() {
    if (!this.isRunning) {
      this.startTime = Date.now() - this.elapsedTime;
      this.isRunning = true;
      this.update();
    }
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false;
      this.saveToLocalStorage();
    }
  }

  reset() {
    this.startTime = Date.now();
    this.elapsedTime = 0;
    this.draw();
  }

  update() {
    if (this.isRunning) {
      this.elapsedTime = Date.now() - this.startTime;
      this.draw();
      requestAnimationFrame(() => this.update());
    }
  }

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

  loadFromLocalStorage() {
    const data = localStorage.getItem("stopwatch");
    if (data) {
      const savedData = JSON.parse(data);
      this.startTime = savedData.startTime || 0;
      this.isRunning = savedData.isRunning || false;
      this.elapsedTime = savedData.elapsedTime || 0;
    }
  }

  getElapsedTime() {
    console.log(this.elapsedTime);
    return this.elapsedTime;
  }
}
