export default class MiTrash {
  constructor(
    canvas,
    ctx,
    gravity,
    x,
    y,
    image,
    velocity,
    distance = { limit: 50, traveled: 0 }
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

    this.distance = distance;
    this.width = 80;
    this.height = 55;
    this.frames = 0;
    this.frameRate = 3;
    this.frameDelay; //* Calculate the delay for the desired frame rate
    this.frameCount = 0;
    this.frames = 0;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      32 * this.frames,
      0,
      32,
      21,
      this.position.x,
      this.position.y,
      this.width * 1.5,
      this.height * 1.5
    );
  }

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
      this.velocity.y += this.gravity;
    }

    // walk the goomba back and forth
    this.distance.traveled += Math.abs(this.velocity.x);

    if (this.distance.traveled > this.distance.limit) {
      this.distance.traveled = 0;
      this.velocity.x = -this.velocity.x;
    }
  }
}
