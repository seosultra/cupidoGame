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

  devilCollision(player) {
    return (
      player.left < this.left + this.width &&
      player.left + player.width > this.left &&
      player.top < this.top + this.height &&
      player.height + player.top > this.top
    );
  }
}
