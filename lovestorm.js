class Lovestorm {
  constructor() {
    this.stormArray = [];
  }
  draw() {
    textSize(28);
    text("💘​", this.left, this.top, this.width, this.height);
    this.top += this.speed;

    if (frameCount % 20 === 0) {
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
  //collision between devil and lovestorm
  loveCollision(devil) {
    return (
      devil.left < loveItem.left + loveItem.width &&
      devil.left + devil.width > loveItem.left &&
      devil.top < loveItem.top + loveItem.height &&
      devil.height + devil.top > loveItem.top
    );
  }
}
