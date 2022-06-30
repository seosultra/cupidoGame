class Devil {
  constructor() {
    this.height = height;
    this.width = width;
    this.top = random(100, CANVAS_HEIGHT - 25);
    this.left = CANVAS_WIDTH + 10;
    this.speed = random(1, 5);
  }

  draw() {
    textSize(28);
    text("😈​​", this.left, this.top, this.width, this.height);
    //rect(this.left, this.top, this.width, this.height);

    this.left -= this.speed;
  }
  //colission between devil & player
  devilCollision(player) {
    return (
      player.left < loveitem.left + loveitem.width &&
      player.left + player.width > loveitem.left &&
      player.top < loveitem.top + loveitem.height &&
      player.height + player.top > loveitem.top
    );
  }
}
