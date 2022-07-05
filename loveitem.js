class LoveItem {
  constructor() {
    this.width = 30;
    this.height = 30;
    this.top = -this.height;
    this.left = random(this.width, CANVAS_WIDTH - this.width);
    this.speed = random(2, 5);
  }
  draw() {
    textSize(this.height);
    text("💘", this.left, this.top, this.width, this.height);
    //rect(this.left, this.top, this.width, this.height);
    // if (this.top <= CANVAS_FLOOR + this.height) {
    this.top += this.speed;
  }
}
