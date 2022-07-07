class Flecha {
  constructor(top, left) {
    this.top = top + 35;
    this.left = left;
    this.height = 27;
    this.width = 27;
    this.speed = 5;
  }
  throwFlecha() {
    textSize(this.height);
    text("🏹", this.left, this.top, this.height, this.width);

    this.left += 10;
    this.CANVAS_WIDTH -= this.speed;
  }
}
