class Flecha {
  constructor(top, left) {
    this.top = top;
    this.left = left;
    this.speed = 5;
  }
  throwFlecha() {
    textSize(27);
    text("🏹", this.left, this.top);

    this.left += 2;
    this.CANVAS_WIDTH -= this.speed;
  }
}
