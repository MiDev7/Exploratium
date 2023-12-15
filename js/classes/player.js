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
    this.powerUp = false;
    this.invincible = false;
    this.invincibilitySpan = 0;

    this.frameRate;
    this.frameDelay; //* Calculate the delay for the desired frame rate
    this.frameCount = 0;
    this.frames = 0;

    this.state = "idle";
    this.direction = "right";
    this.opacity = 1;

    this.sprite;
    this.frameAmount = 7;
  }

  draw() {
    if (this.invincibilitySpan >= 0) this.invincibilitySpan--;
    this.ctx.save();
    this.ctx.globalAlpha = this.opacity;

    this.ctx.fillStyle = "rgba(255, 255, 255, 0.2)";

    const powerUp = this.image.Power;

    if (!this.powerUp) {
      if (this.state === "idle" && this.direction === "right") {
        this.sprite = this.image.idle;
        this.frameRate = 3;
        this.frameAmount = 4;
      } else if (this.state === "idle" && this.direction === "left") {
        this.sprite = this.image.idleLeft;
        this.frameRate = 3;
        this.frameAmount = 4;
      } else if (this.state === "walk" && this.direction === "right") {
        this.sprite = this.image.walk;
        this.frameAmount = 7;
        this.frameRate = 7;
      } else if (this.state === "walk" && this.direction === "left") {
        this.sprite = this.image.walkLeft;
        this.frameAmount = 7;
        this.frameRate = 7;
      } else if (this.state === "jump" && this.direction === "right") {
        this.sprite = this.image.jump;
        this.frameRate = 5;
        this.frameAmount = 7;
      } else if (this.state === "jump" && this.direction === "left") {
        this.sprite = this.image.jumpLeft;
        this.frameRate = 5;
        this.frameAmount = 7;
      }
    } else {
      if (this.state === "idle" && this.direction === "right") {
        this.sprite = powerUp.idle;
        this.frameRate = 3;
        this.frameAmount = 3;
      } else if (this.state === "idle" && this.direction === "left") {
        this.sprite = powerUp.idleLeft;
        this.frameRate = 3;
        this.frameAmount = 3;
      } else if (this.state === "walk" && this.direction === "right") {
        this.sprite = powerUp.walk;
        this.frameAmount = 7;
        this.frameRate = 7;
      } else if (this.state === "walk" && this.direction === "left") {
        this.sprite = powerUp.walkLeft;
        this.frameAmount = 7;
        this.frameRate = 7;
      } else if (this.state === "jump" && this.direction === "right") {
        this.sprite = powerUp.jump;
        this.frameRate = 5;
        this.frameAmount = 7;
      } else if (this.state === "jump" && this.direction === "left") {
        this.sprite = powerUp.jumpLeft;
        this.frameRate = 5;
        this.frameAmount = 7;
      } else if (this.state === "shoot" && this.direction === "right") {
        this.sprite = this.image.shoot;
        this.frameRate = 12;
        this.frameAmount = 13;
      }
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
    this.ctx.restore();
  }

  update() {
    this.frameCount++;
    this.frameDelay = 60 / this.frameRate;

    if (this.frameCount >= this.frameDelay) {
      this.frameCount = 0;

      if (this.state === "shoot" && this.frames === this.frameAmount) {
        // Stop the animation at the last frame when in "shoot" state
        this.frames = this.frameAmount;
      } else {
        this.frames++;
        if (this.frames > this.frameAmount) {
          // Reset frames to 0 unless in "shoot" state
          this.frames =
            this.state !== "shoot" || this.state !== "jump"
              ? 0
              : this.frameAmount;
        }
      }
    }

    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
      this.velocity.y += this.gravity;
    }

    if (this.invincible) {
      this.opacity = 1 - this.opacity; // Toggle opacity between 0 and 1
    } else {
      this.opacity = 1;
    }
  }
}
