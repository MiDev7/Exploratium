export class Player {
  constructor(gravity, canvas, ctx, image, x, y) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.gravity = gravity;
    this.position = {
      x,
      y,
    };
    this.height = 150;
    this.width = 150;
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
  }

  draw() {
    if (this.state === "idle" && this.direction === "right") {
      this.sprite = this.image.idle;
      this.frameRate = 3;
    } else if (this.state === "idle" && this.direction === "left") {
      this.sprite = this.image.idleLeft;
      this.frameRate = 5;
    } else if (this.state === "walk" && this.direction === "right") {
      this.sprite = this.image.walk;
    } else if (this.state === "walk" && this.direction === "left") {
      this.sprite = this.image.walkLeft;
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
      if (this.frames > 5) {
        this.frames = 0;
      }
    }
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    this.velocity.y += this.gravity;
  }
}
