class Devil {
  constructor() {
    this.height = 28;
    this.width = width;
    this.top = random(100, CANVAS_HEIGHT - 25);
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
    //rect(this.left, this.top, this.width, this.height);

    this.left -= this.speed;
  }
}
