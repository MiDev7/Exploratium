export default class Player {
  constructor(gravity, canvas, ctx, image, x, y) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.gravity = gravity;
    this.position = {
      x,
      y,
    };

    this.scale = 1.2;
    this.height = 150 * this.scale;
    this.width = 150 * this.scale;
    this.image = image;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.frameRate;
    this.frameDelay; //* Calculate the delay for the desired frame rate
    this.frameCount = 0;
    this.frames = 0;
    this.state = "idle";
    this.direction = "right";
    this.sprite;
    this.frameAmount = 4;
  }

  draw() {
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    if (this.state === "idle" && this.direction === "right") {
      this.sprite = this.image.idle;
      this.frameRate = 3;
      this.frameAmount = 3;
    } else if (this.state === "idle" && this.direction === "left") {
      this.sprite = this.image.idleLeft;
      this.frameAmount = 3;
    } else if (this.state === "walk" && this.direction === "right") {
      this.sprite = this.image.walk;
      this.frameRate = 5;
    } else if (this.state === "walk" && this.direction === "left") {
      this.sprite = this.image.walkLeft;
      this.frameRate = 5;
    } else if (this.state === "jump" && this.direction === "right") {
      this.sprite = this.image.jump;
      this.frameRate = 20;
      this.frameAmount = 9;
    } else if (this.state === "jump" && this.direction === "left") {
      this.sprite = this.image.jumpLeft;
      this.frameRate = 20;
      this.frameAmount = 9;
    }
    this.ctx.drawImage(
      this.sprite,
      128 * this.frames,
      0,
      128,
      128,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.frameCount++;
    this.frameDelay = 60 / this.frameRate;
    if (this.frameCount >= this.frameDelay) {
      this.frameCount = 0;
      this.frames++;
      if (this.frames > this.frameAmount) {
        this.frames = 0;
      }
    }
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
      this.velocity.y += this.gravity;
    }
  }
}
