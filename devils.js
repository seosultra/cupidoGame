class Devil {
  constructor() {
    this.height = height;
    this.width = width;
    this.top = random(100, CANVAS_HEIGHT - 20);
    this.left = CANVAS_WIDTH + 5;
    this.speed = random(1, 5);
  }

  draw() {
    text("😈​​", this.left, this.top, this.width, this.height);
    //rect(this.left, this.top, this.width, this.height);

    this.left -= this.speed;
  }
}
