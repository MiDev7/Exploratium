export default class Platform {
  constructor(
    canvas,
    ctx,
    image,
    x,
    y,
    block = false,
    platformer = false,
    text = "Platform"
  ) {
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
    this.text = text;
  }

  draw() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y);
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.fillText(this.text, this.position.x, this.position.y);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
  }
}
