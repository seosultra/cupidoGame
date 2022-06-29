class Lovestorm {
  constructor() {
    this.stormArray = [];
  }
  draw() {
    textSize(28);
    text("💘​", this.left, this.top, this.width, this.height);

    if (frameCount % 60 === 0) {
      this.createParticle();
    }

    this.stormArray = this.stormArray.filter((item) => {
      item.draw();
      return item.top <= CANVAS_HEIGHT;
    });
  }

  createParticle() {
    this.stormArray.push(new LoveItem());
  }

  loveCollision(devil) {
    return (
      devil.left < this.left + this.width &&
      devil.left + devil.width > this.left &&
      devil.top < this.top + this.height &&
      devil.height + devil.top > this.top
    );
  }
}
