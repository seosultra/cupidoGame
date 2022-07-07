class Devil {
  constructor() {
    this.height = 30;
    this.width = 30;
    this.top = random(100, CANVAS_HEIGHT - 50);
    this.left = CANVAS_WIDTH + 10;
    this.speed = random(1, 8);
    this.flechaCollisionDevil = false;
    this.hasHitPoorCupido = false;
    this.hasBeenHitByLove = false;
  }

  draw() {
    console.log(this.flechaCollisionDevil);
    let emoji = "😈​​";

    if (this.hasBeenHitByLove) {
      emoji = "😍";
    }
    textSize(this.height);
    text(emoji, this.left, this.top, this.width, this.height);

    this.left -= this.speed;
  }
}
